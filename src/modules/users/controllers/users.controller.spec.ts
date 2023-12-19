import { Test, TestingModule } from '@nestjs/testing';
import { PageOptionsDto } from '../../../common/pagination';
import { Order, messages } from '../../../constants';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { UserDto, UserFilterDto, UserUpdateDto } from '../dtos';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUser = {
    id: 'd67017bc-f5cb-4e9c-b406-2e5f468c4dab',
    names: 'Test',
    email: 'test11@gmail.com',
    username: 'test',
    role: 'ADMIN',
  };

  const mockAllUsers = {
    data: [mockUser],
    meta: {
      page: '1',
      take: '10',
      itemCount: 10,
      pageCount: 1,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  };

  const mockUsersServices = {
    createUser: jest.fn(() => {
      return {
        message: messages['users.success.create'],
      };
    }),
    getUsers: jest.fn().mockImplementation(() => {
      return mockAllUsers;
    }),
    findUserById: jest.fn().mockImplementation(() => {
      return mockUser;
    }),
    updateUser: jest.fn().mockImplementation(() => {
      return {
        message: messages['users.success.update'],
      };
    }),
    deleteUser: jest.fn().mockImplementation(() => {
      return {
        message: messages['users.success.delete'],
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersServices)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const userDto: UserDto = {
    email: 'test@gmail.com',
    names: 'Test',
    password: 'password_1234',
    username: 'test',
  };
  it('should create a user', () => {
    expect(controller.registerUser(userDto)).toEqual({
      message: messages['users.success.create'],
    });
    expect(mockUsersServices.createUser).toHaveBeenCalledWith(userDto);
  });

  it('should get all users', async () => {
    const pageOptions: PageOptionsDto = {
      order: Order.DESC,
      page: 1,
      take: 10,
      skip: 0,
    };
    const userFilter: UserFilterDto = {};
    const allUsers = await controller.getUser(pageOptions, userFilter);
    expect(allUsers).toEqual(mockAllUsers);
    expect(allUsers.data).toHaveLength(mockAllUsers.data.length);
    expect(allUsers.meta.page).toBe(pageOptions.page.toString());
    expect(mockUsersServices.getUsers).toHaveBeenCalled();
  });

  it('should get a user by id', () => {
    const userUuid = 'd67017bc-f5cb-4e9c-b406-2e5f468c4dab';
    expect(controller.userMe(userUuid)).toEqual(mockUser);
    expect(mockUsersServices.findUserById).toHaveBeenCalledWith(userUuid);
  });

  it('should update a user', () => {
    const userDto: UserUpdateDto = {
      names: 'Test',
      username: 'test',
    };
    expect(controller.updateUser('1', userDto)).toEqual({
      message: messages['users.success.update'],
    });
    expect(mockUsersServices.updateUser).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const userUuid = 'd67017bc-f5cb-4e9c-b406-2e5f468c4dab';
    expect(await controller.deleteUser(userUuid)).toEqual({
      message: messages['users.success.delete'],
    });
    expect(mockUsersServices.deleteUser).toHaveBeenCalledWith(userUuid);
  });
});
