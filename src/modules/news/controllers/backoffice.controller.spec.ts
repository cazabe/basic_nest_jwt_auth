import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeController } from './backoffice.controller';
import { NewsEntity } from '../entities/news.entity';
import { NewsService } from '../services/news.service';
import { UsersService } from '../../users/services/users.service';
import { RolesGuard } from '../../../guards';
import { UsersEntity } from '../../users/entities/users.entity';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';

describe('BackofficeController', () => {
  let controller: BackofficeController;

  const mockBlogsServices = {
    createBlogs: jest
      .fn()
      .mockImplementation((users: UsersEntity, news: NewsEntity) => {
        return {
          ...news,
          users,
        };
      }),
  };

  const mockUserService = {};
  const mockTermService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeController],
      providers: [
        NewsService,
        { provide: UsersService, useValue: mockUserService },
        { provide: TermsTaxonomyService, useValue: mockTermService },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(NewsService)
      .useValue(mockBlogsServices)
      .compile();

    controller = module.get<BackofficeController>(BackofficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
