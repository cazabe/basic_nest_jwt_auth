import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DefaultResponse } from '../../../common/schemas';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../common/pagination';
import { messages } from '../../../constants';
import { UsersEntity } from '../entities/users.entity';
import {
  UserDto,
  UserUpdateDto,
  UsersResponseDto,
  UpdatePassDto,
  UserFilterDto,
} from '../dtos';
import { getNowDate } from '../../../util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDto): Promise<DefaultResponse> {
    const userByUsername = await this.findBy({
      key: 'username',
      value: body.username,
    });
    const userByEmail = await this.findBy({
      key: 'email',
      value: body.email,
    });

    if (userByUsername) {
      throw new ConflictException(messages['users.conflict.credentials']);
    }
    if (userByEmail) {
      throw new ConflictException(messages['users.conflict.credentials']);
    }
    try {
      body.password = await this.hashPassword(
        body.password,
        +process.env.HASH_SALT,
      );
      await this.usersRepository.save(body);
      return {
        message: messages['users.success.create'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['users.error.create']);
    }
  }

  public async getUsers(
    pageOptionsDto: PageOptionsDto,
    userFilter: UserFilterDto,
  ): Promise<PageDto<UsersResponseDto>> {
    const { search_pattern, start_date, end_date } = userFilter;
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder('users');
      queryBuilder
        .orderBy('users.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      if (search_pattern) {
        queryBuilder.andWhere('users.names LIKE :name', {
          name: '%' + search_pattern + '%',
        });
      }

      if (start_date) {
        console.log(start_date);
        console.log(end_date);
        const endDate = end_date ? end_date : getNowDate();
        queryBuilder.andWhere(
          `users.createdAt BETWEEN '${start_date} 00:00:00' AND '${endDate} 23:59:59'`,
        );
      }

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(messages['users.error.get']);
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    const result = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!result) throw new NotFoundException(messages['users.error.noFound']);
    return result;
  }

  public async findBy({
    key,
    value,
  }: {
    key: keyof UserDto;
    value: any;
  }): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.usersRepository.findOne({
        where: {
          [key]: value,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(messages['users.error.get']);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDto,
  ): Promise<DefaultResponse> {
    await this.findUserById(id);
    try {
      await this.usersRepository.update(id, body);
      return { message: messages['users.success.update'] };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(messages['users.conflict.unique']);
      }
      throw new InternalServerErrorException(messages['users.error.update']);
    }
  }

  async updatePassword(
    id: string,
    updatePassDto: UpdatePassDto,
  ): Promise<DefaultResponse> {
    const { password_new } = updatePassDto;

    const found: UsersEntity = await this.findUserById(id);

    try {
      found.password = await this.hashPassword(
        password_new,
        +process.env.HASH_SALT,
      );
      await this.usersRepository.update(id, found);
      return { message: messages['users.success.update.password'] };
    } catch (error) {
      throw new InternalServerErrorException(
        messages['users.error.update.password'],
      );
    }
  }

  async updatePasswordMe(
    id: string,
    updatePassDto: UpdatePassDto,
  ): Promise<DefaultResponse> {
    const { password_new, password_old } = updatePassDto;

    const found: UsersEntity = await this.findUserById(id);
    if (!bcrypt.compareSync(password_old, found.password)) {
      throw new ConflictException(messages['users.error.notMatch']);
    }

    try {
      found.password = await this.hashPassword(
        password_new,
        +process.env.HASH_SALT,
      );
      await this.usersRepository.update(id, found);
      return { message: messages['users.success.update.password'] };
    } catch (error) {
      throw new InternalServerErrorException(
        messages['users.error.update.password'],
      );
    }
  }

  public async deleteUser(id: string): Promise<DefaultResponse> {
    await this.findUserById(id);
    try {
      await this.usersRepository.delete(id);
      return {
        message: messages['users.success.delete'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['users.error.delete']);
    }
  }

  async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
