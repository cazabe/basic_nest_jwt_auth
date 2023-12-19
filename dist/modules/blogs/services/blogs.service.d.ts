import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { UsersService } from '../../users/services/users.service';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';
import { BlogsEntity } from '../entities/blogs.entity';
import { BlogsDto, BlogsFilterDto, BlogsFilterPublicDto, BlogsUpdateDto } from '../dtos';
import { SlugProvider } from '../../../providers';
export declare class BlogsService {
    private readonly blogsRepository;
    private readonly usersServices;
    private readonly termsTaxonomyServices;
    private readonly slugProvider;
    constructor(blogsRepository: Repository<BlogsEntity>, usersServices: UsersService, termsTaxonomyServices: TermsTaxonomyService, slugProvider: SlugProvider);
    createPost(body: BlogsDto, userId: string): Promise<DefaultResponse>;
    getPostPublic(pageOptionsDto: PageOptionsDto, blogsFilter: BlogsFilterPublicDto): Promise<PageDto<BlogsDto>>;
    getPost(pageOptionsDto: PageOptionsDto, blogsFilter: BlogsFilterDto): Promise<PageDto<BlogsDto>>;
    getPostById(slug: string, onlyActive?: boolean): Promise<BlogsDto>;
    updatePost(body: BlogsUpdateDto, id: string): Promise<DefaultResponse>;
    deletePost(id: string): Promise<DefaultResponse>;
    findBySlug(slug: string): Promise<BlogsEntity | null>;
    uniqueSlug(title: string): Promise<string>;
    private findSlugs;
}
