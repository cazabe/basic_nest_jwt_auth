import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { BlogsService } from '../services/blogs.service';
import { BlogsDto, BlogsFilterPublicDto } from '../dtos';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    getPostPublic(pageOptionsDto: PageOptionsDto, blogsFilter: BlogsFilterPublicDto): Promise<PageDto<BlogsDto>>;
    getNewsById(slug: string): Promise<BlogsDto>;
}
