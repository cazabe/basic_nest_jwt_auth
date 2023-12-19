import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { UsersEntity } from '../entities/users.entity';
import { UserDto, UserUpdateDto, UsersResponseDto, UpdatePassDto, UserFilterDto } from '../dtos';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    createUser(body: UserDto): Promise<DefaultResponse>;
    getUsers(pageOptionsDto: PageOptionsDto, userFilter: UserFilterDto): Promise<PageDto<UsersResponseDto>>;
    findUserById(id: string): Promise<UsersEntity>;
    findBy({ key, value, }: {
        key: keyof UserDto;
        value: any;
    }): Promise<UsersEntity>;
    updateUser(id: string, body: UserUpdateDto): Promise<DefaultResponse>;
    updatePassword(id: string, updatePassDto: UpdatePassDto): Promise<DefaultResponse>;
    updatePasswordMe(id: string, updatePassDto: UpdatePassDto): Promise<DefaultResponse>;
    deleteUser(id: string): Promise<DefaultResponse>;
    hashPassword(password: string, salt: number): Promise<string>;
}
