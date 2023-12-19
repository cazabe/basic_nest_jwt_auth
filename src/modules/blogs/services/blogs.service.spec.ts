import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/services/users.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { TermTaxonomyEntity, TermsEntity } from '../../terms-taxonomy/entities';
import {
  TermsService,
  TermsTaxonomyService,
} from '../../terms-taxonomy/services';
import { SlugProvider } from '../../../providers';
import { BlogsEntity } from '../entities/blogs.entity';
import { BlogsService } from './blogs.service';

describe('BlogsService', () => {
  let service: BlogsService;
  let usersService: UsersService;
  let termsTaxonomyService: TermsTaxonomyService;
  let termsService: TermsService;
  let slugService: SlugProvider;
  let blogsRepository: Repository<BlogsEntity>;

  const BLOGS_REPOSITORY_TOKEN = getRepositoryToken(BlogsEntity);
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
        BlogsService,
        UsersService,
        TermsTaxonomyService,
        TermsService,
        SlugProvider,
        {
          provide: BLOGS_REPOSITORY_TOKEN,
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

    service = module.get<BlogsService>(BlogsService);
    usersService = module.get<UsersService>(UsersService);
    termsTaxonomyService =
      module.get<TermsTaxonomyService>(TermsTaxonomyService);
    termsService = module.get<TermsService>(TermsService);
    slugService = module.get<SlugProvider>(SlugProvider);
    blogsRepository = module.get<Repository<BlogsEntity>>(
      BLOGS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    expect(blogsRepository).toBeDefined();
  });
});
