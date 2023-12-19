import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiDefaultResponse,
  ApiInternalServerResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedErrorResponse,
} from '../../../common/api-response-swagger';
import { GetUserId, Roles } from '../../../decorators';
import { ROLES, messages } from '../../../constants';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { RolesGuard } from '../../../guards';
import { DefaultResponse } from '../../../common/schemas';
import { NewsDto, NewsFilterDto, NewsUpdateDto } from '../dtos';
import { NewsService } from '../services/news.service';

@ApiTags('Backoffice News')
@Controller('backoffice/news')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class BackofficeController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiDefaultResponse(messages['news.success.create'])
  @ApiInternalServerResponse(messages['news.error.create'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  public async createNews(
    @Body() body: NewsDto,
    @GetUserId() userId: string,
  ): Promise<DefaultResponse> {
    return await this.newsService.createNews(body, userId);
  }

  @Get()
  @ApiPaginatedResponse(NewsDto)
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async getNews(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() newsFilter: NewsFilterDto,
  ): Promise<PageDto<NewsDto>> {
    return this.newsService.getNews(pageOptionsDto, newsFilter);
  }

  @Get('/:id')
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async getNewsById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.newsService.getNewsById(id);
  }

  @Patch('/:id')
  @ApiDefaultResponse(messages['news.success.update'])
  @ApiInternalServerResponse(messages['news.error.update'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  public async updateNews(
    @Body() body: NewsUpdateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.newsService.updateNews(body, id);
  }

  @Delete('/:id')
  @ApiDefaultResponse(messages['news.success.delete'])
  @ApiInternalServerResponse(messages['news.error.delete'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async deleteNews(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.newsService.deleteNews(id);
  }
}
