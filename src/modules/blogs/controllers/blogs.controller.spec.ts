import { Test, TestingModule } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';
import { UsersEntity } from '../../users/entities/users.entity';
import { BlogsEntity } from '../entities/blogs.entity';
import { BlogsService } from '../services/blogs.service';
import { BlogsController } from './blogs.controller';
import { UsersService } from '../../users/services/users.service';
import { RolesGuard } from '../../../guards';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';

describe('BlogsController', () => {
  let blogsController: BlogsController;

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
      controllers: [BlogsController],
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

    blogsController = module.get<BlogsController>(BlogsController);
  });

  describe('Initialize module', () => {
    it('should initialize module', () => {
      expect(blogsController).toBeDefined();
    });
  });
});
