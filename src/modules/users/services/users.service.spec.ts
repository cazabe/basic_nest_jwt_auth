import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ROLES, messages } from '../../../constants';
import { UsersEntity } from '../entities/users.entity';
import { UpdatePassDto, UserDto, UserUpdateDto } from '../dtos';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let testingModule: TestingModule;
  let service: UsersService;
  let spyRepository: Repository<UsersEntity>;

  const USERS_REPOSITORY_TOKEN = getRepositoryToken(UsersEntity);

  const userEntity: UsersEntity = {
    names: 'Brangy Castro',
    email: 'brangy@gmail.com',
    username: 'brangy12343333',
    password: '$2b$10$68lzm5i1zrpAsaieDssSi.2hOxyVn.Wwi/FStGLOBX483C69ayX92',
    role: ROLES.ADMIN,
    news: [],
    blogs: [],
    id: '28b7b4ff-68ab-4263-9e0d-dec9d65516c9',
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
  };

  const mockUsersRepository = {
    findOne: jest.fn(() => null),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockReturnThis(),
      getRawAndEntities: jest.fn().mockReturnThis(),
    }),
  };

  const userMock: UserDto = {
    names: 'Brangy Castro',
    email: 'brangy@gmail.com',
    username: 'brangy12343333',
    password: 'password_12345',
  };

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = testingModule.get<UsersService>(UsersService);
    spyRepository = testingModule.get<Repository<UsersEntity>>(
      USERS_REPOSITORY_TOKEN,
    );
  });

  describe('Initialize module', () => {
    it('should initialize module', () => {
      expect(service).toBeDefined();
    });
    it('should initialize module', () => {
      expect(spyRepository).toBeDefined();
    });
  });

  describe('Create users', () => {
    it('should save an user in the database', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      const { message } = await service.createUser(userMock);
      expect(spyRepository.save).toHaveBeenCalledWith(
        Object.assign(new UsersEntity(), userMock),
      );
      expect(message).toBe(messages['users.success.create']);
    });
    it('should return error when username is found', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(async () => {
        await service.createUser(userMock);
      }).rejects.toThrowError(messages['users.conflict.credentials']);
    });
    it('should return error when  email is found', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(async () => {
        await service.createUser(userMock);
      }).rejects.toThrowError(messages['users.conflict.credentials']);
    });
  });

  describe('Get users', () => {
    const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
    it('should get a user by id', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(await service.findUserById(userUuid)).toEqual(userEntity);
    });
    it('should return an error when the user by id does not exist.', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await service.findUserById(userUuid);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(messages['users.error.noFound']);
      }
    });
    it('it should call createQueryBuilder if order exist', async () => {
      expect(spyRepository.createQueryBuilder).toHaveBeenCalledTimes(0);
    });
  });

  describe('Update users', () => {
    const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
    const userDto: UserUpdateDto = {
      names: 'Test',
      username: 'test',
    };
    it('should update user', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(await service.updateUser(userUuid, userDto)).toEqual({
        message: messages['users.success.update'],
      });
    });
    it('should return error when the user to update is not found', async () => {
      const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await service.updateUser(userUuid, userDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(messages['users.error.noFound']);
      }
    });
  });

  describe('Update password', () => {
    const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
    const updatePassDto: UpdatePassDto = {
      password_old: 'password_12345',
      password_new: 'Password_1234',
    };
    it('should update the password', async () => {
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(await service.updatePassword(userUuid, updatePassDto)).toEqual({
        message: messages['users.success.update.password'],
      });
    });
    it('should return an error when the passwords do not match.', async () => {
      jest
        .spyOn(spyRepository, 'findOne')
        .mockResolvedValueOnce({ ...userEntity, password: 'ssdsddfd' });
      try {
        await service.updatePassword(userUuid, updatePassDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe(messages['users.error.notMatch']);
      }
    });
    it('should return error when the user to update password is not found', async () => {
      const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await service.updatePassword(userUuid, updatePassDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(messages['users.error.noFound']);
      }
    });
  });

  describe('Delete users', () => {
    it('should delete user', async () => {
      const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(userEntity);
      expect(await service.deleteUser(userUuid)).toEqual({
        message: messages['users.success.delete'],
      });
    });
    it('should return error when the user to delete is not found', async () => {
      const userUuid = '28b7b4ff-68ab-4263-9e0d-dec9d65516c9';
      jest.spyOn(spyRepository, 'findOne').mockResolvedValueOnce(null);
      try {
        await service.deleteUser(userUuid);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(messages['users.error.noFound']);
      }
    });
  });
});
