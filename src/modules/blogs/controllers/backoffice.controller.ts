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
import { ROLES, messages } from '../../../constants';
import { RolesGuard } from '../../../guards';
import { GetUserId, Roles } from '../../../decorators';
import { DefaultResponse } from '../../../common/schemas';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { BlogsService } from '../services/blogs.service';
import { BlogsDto, BlogsFilterDto, BlogsUpdateDto } from '../dtos';

@ApiTags('Backoffice Blogs')
@Controller('backoffice/blogs')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class BackofficeController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiDefaultResponse(messages['blogs.success.create'])
  @ApiInternalServerResponse(messages['blogs.error.create'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  public async create(
    @Body() body: BlogsDto,
    @GetUserId() userId: string,
  ): Promise<DefaultResponse> {
    return await this.blogsService.createPost(body, userId);
  }

  @Get()
  @ApiPaginatedResponse(BlogsDto)
  @ApiInternalServerResponse(messages['blogs.error.get'])
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async getPost(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() blogsFilter: BlogsFilterDto,
  ): Promise<PageDto<BlogsDto>> {
    return this.blogsService.getPost(pageOptionsDto, blogsFilter);
  }

  @Get('/:id')
  @ApiInternalServerResponse(messages['blogs.error.get'])
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async getNewsById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.blogsService.getPostById(id);
  }

  @Patch('/:id')
  @ApiDefaultResponse(messages['blogs.success.update'])
  @ApiInternalServerResponse(messages['blogs.error.update'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  public async updatePost(
    @Body() body: BlogsUpdateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.blogsService.updatePost(body, id);
  }

  @Delete('/:id')
  @ApiDefaultResponse(messages['blogs.success.delete'])
  @ApiInternalServerResponse(messages['blogs.error.delete'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async deletePost(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.blogsService.deletePost(id);
  }
}
