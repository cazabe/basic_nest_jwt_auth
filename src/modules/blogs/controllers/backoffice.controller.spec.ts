import { Test, TestingModule } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';
import { UsersEntity } from '../../users/entities/users.entity';
import { BackofficeController } from './backoffice.controller';
import { BlogsEntity } from '../entities/blogs.entity';
import { BlogsService } from '../services/blogs.service';
import { UsersService } from '../../users/services/users.service';
import { RolesGuard } from '../../../guards';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';

describe('BackofficeController', () => {
  let controller: BackofficeController;

  const mockRequest = httpMocks.createRequest();
  mockRequest.users = new UsersEntity();

  const mockBlogsServices = {
    createBlogs: jest
      .fn()
      .mockImplementation((users: UsersEntity, blogs: BlogsEntity) => {
        return {
          ...blogs,
          users,
        };
      }),
    save: jest
      .fn()
      .mockImplementation((blogs: BlogsEntity) =>
        Promise.resolve({ id: 'ashsd-sddf', ...blogs }),
      ),
  };

  const mockUserService = {};
  const mockTermService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeController],
      providers: [
        BlogsService,
        { provide: UsersService, useValue: mockUserService },
        { provide: TermsTaxonomyService, useValue: mockTermService },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(BlogsService)
      .useValue(mockBlogsServices)
      .compile();

    controller = module.get<BackofficeController>(BackofficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
