import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';
import { TermTaxonomyEntity, TermsEntity } from '../../terms-taxonomy/entities';
import {
  TermsService,
  TermsTaxonomyService,
} from '../../terms-taxonomy/services';
import { SlugProvider } from '../../../providers';
import { NewsEntity } from '../entities/news.entity';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;
  let usersService: UsersService;
  let termsTaxonomyService: TermsTaxonomyService;
  let termsService: TermsService;
  let slugService: SlugProvider;
  let newsRepository: Repository<NewsEntity>;

  const NEWS_REPOSITORY_TOKEN = getRepositoryToken(NewsEntity);
  const USERS_REPOSITORY_TOKEN = getRepositoryToken(UsersEntity);
  const TERMS_TAXONOMY_REPOSITORY_TOKEN =
    getRepositoryToken(TermTaxonomyEntity);
  const TERMS_REPOSITORY_TOKEN = getRepositoryToken(TermsEntity);

  const mockBlogsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUsersRepository = {};
  const mockTermsTaxonomyRepository = {};
  const mockTermsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        UsersService,
        TermsTaxonomyService,
        TermsService,
        SlugProvider,
        {
          provide: NEWS_REPOSITORY_TOKEN,
          useValue: mockBlogsRepository,
        },
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: mockUsersRepository,
        },
        {
          provide: TERMS_TAXONOMY_REPOSITORY_TOKEN,
          useValue: mockTermsTaxonomyRepository,
        },
        {
          provide: TERMS_REPOSITORY_TOKEN,
          useValue: mockTermsRepository,
        },
      ],
    }).compile();

    newsService = module.get<NewsService>(NewsService);
    usersService = module.get<UsersService>(UsersService);
    termsTaxonomyService =
      module.get<TermsTaxonomyService>(TermsTaxonomyService);
    termsService = module.get<TermsService>(TermsService);
    slugService = module.get<SlugProvider>(SlugProvider);
    newsRepository = module.get<Repository<NewsEntity>>(NEWS_REPOSITORY_TOKEN);
  });

  describe('Initialize module', () => {
    it('should be defined news services', () => {
      expect(newsService).toBeDefined();
    });

    it('should be defined slugService', () => {
      expect(slugService).toBeDefined();
    });

    it('should be defined users services', () => {
      expect(usersService).toBeDefined();
    });

    it('should be defined terms taxonomy services', () => {
      expect(termsTaxonomyService).toBeDefined();
    });

    it('should be defined terms services', () => {
      expect(termsService).toBeDefined();
    });

    it('newsRespository should be defined', () => {
      expect(newsRepository).toBeDefined();
    });
  });
});
