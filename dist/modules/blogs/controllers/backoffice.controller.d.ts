import { DefaultResponse } from '../../../common/schemas';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { BlogsService } from '../services/blogs.service';
import { BlogsDto, BlogsFilterDto, BlogsUpdateDto } from '../dtos';
export declare class BackofficeController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(body: BlogsDto, userId: string): Promise<DefaultResponse>;
    getPost(pageOptionsDto: PageOptionsDto, blogsFilter: BlogsFilterDto): Promise<PageDto<BlogsDto>>;
    getNewsById(id: string): Promise<BlogsDto>;
    updatePost(body: BlogsUpdateDto, id: string): Promise<DefaultResponse<any>>;
    deletePost(id: string): Promise<DefaultResponse<any>>;
}
