import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { DefaultResponse } from '../../../common/schemas';
import { NewsDto, NewsFilterDto, NewsUpdateDto } from '../dtos';
import { NewsService } from '../services/news.service';
export declare class BackofficeController {
    private readonly newsService;
    constructor(newsService: NewsService);
    createNews(body: NewsDto, userId: string): Promise<DefaultResponse>;
    getNews(pageOptionsDto: PageOptionsDto, newsFilter: NewsFilterDto): Promise<PageDto<NewsDto>>;
    getNewsById(id: string): Promise<NewsDto>;
    updateNews(body: NewsUpdateDto, id: string): Promise<DefaultResponse<any>>;
    deleteNews(id: string): Promise<DefaultResponse<any>>;
}
