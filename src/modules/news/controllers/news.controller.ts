import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiInternalServerResponse,
  ApiPaginatedResponse,
} from '../../../common/api-response-swagger';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { PublicAccess } from '../../../decorators';
import { messages } from '../../../constants';
import { NewsService } from '../services/news.service';
import { NewsDto, NewsFilterPublicDto } from '../dtos';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiPaginatedResponse(NewsDto)
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async getNewsPublic(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() newsFilter: NewsFilterPublicDto,
  ): Promise<PageDto<NewsDto>> {
    return this.newsService.getNewsPublic(pageOptionsDto, newsFilter);
  }

  @Get('/:slug')
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async getNewsPublicById(@Param('slug') slug: string) {
    return this.newsService.getNewsById(slug, true);
  }
}
