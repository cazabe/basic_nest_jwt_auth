import { Repository } from 'typeorm';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { DefaultResponse } from '../../../common/schemas';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';
import { NewsEntity } from '../entities/news.entity';
import { NewsDto, NewsFilterDto, NewsFilterPublicDto, NewsUpdateDto } from '../dtos';
import { UsersService } from '../../users/services/users.service';
import { SlugProvider } from '../../../providers';
export declare class NewsService {
    private readonly newsRepository;
    private readonly usersServices;
    private readonly termsTaxonomyServices;
    private readonly slugProvider;
    constructor(newsRepository: Repository<NewsEntity>, usersServices: UsersService, termsTaxonomyServices: TermsTaxonomyService, slugProvider: SlugProvider);
    createNews(body: NewsDto, userId: string): Promise<DefaultResponse<NewsEntity>>;
    getNewsPublic(pageOptionsDto: PageOptionsDto, newsFilter: NewsFilterPublicDto): Promise<PageDto<NewsDto>>;
    getNews(pageOptionsDto: PageOptionsDto, newsFilter: NewsFilterDto): Promise<PageDto<NewsDto>>;
    getNewsById(slug: string, onlyActive?: boolean): Promise<NewsDto>;
    updateNews(body: NewsUpdateDto, id: string): Promise<DefaultResponse>;
    deleteNews(id: string): Promise<DefaultResponse>;
    findBySlug(slug: string): Promise<NewsEntity | null>;
    uniqueSlug(title: string): Promise<string>;
    private findSlugs;
}
