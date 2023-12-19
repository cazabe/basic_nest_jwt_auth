import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiInternalServerResponse,
  ApiPaginatedResponse,
} from '../../../common/api-response-swagger';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { messages } from '../../../constants';
import { PublicAccess } from '../../../decorators';
import { BlogsService } from '../services/blogs.service';
import { BlogsDto, BlogsFilterPublicDto } from '../dtos';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiPaginatedResponse(BlogsDto)
  @ApiInternalServerResponse(messages['blogs.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async getPostPublic(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() blogsFilter: BlogsFilterPublicDto,
  ): Promise<PageDto<BlogsDto>> {
    return this.blogsService.getPostPublic(pageOptionsDto, blogsFilter);
  }

  @Get('/:slug')
  @ApiInternalServerResponse(messages['blogs.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async getNewsById(@Param('slug') slug: string) {
    return this.blogsService.getPostById(slug, true);
  }
}
