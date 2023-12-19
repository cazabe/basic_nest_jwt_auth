import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { NewsService } from '../services/news.service';
import { NewsDto, NewsFilterPublicDto } from '../dtos';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getNewsPublic(pageOptionsDto: PageOptionsDto, newsFilter: NewsFilterPublicDto): Promise<PageDto<NewsDto>>;
    getNewsPublicById(slug: string): Promise<NewsDto>;
}
