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
  ApiUnauthorizedErrorResponse,
} from '../../../common/api-response-swagger';
import { ROLES, messages } from '../../../constants';
import { DefaultResponse } from '../../../common/schemas';
import { RolesGuard } from '../../../guards';
import { AdminAccess, Roles } from '../../../decorators';
import { TermsTaxonomyService } from '../services';
import { TermTaxonomyEntity } from '../entities';
import {
  TermTaxonomyDto,
  TermTaxonomyFilterDto,
  TermTaxonomyUpdateDto,
} from '../dtos';

@ApiTags('Terms taxonomy')
@Controller('terms-taxonomy')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class TermsTaxonomyController {
  constructor(private readonly termsTaxonomyService: TermsTaxonomyService) {}

  @Post()
  @ApiDefaultResponse(messages['terms.success.create'])
  @ApiInternalServerResponse(messages['terms.error.create'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public async createTermTaxonomy(
    @Body() body: TermTaxonomyDto,
  ): Promise<DefaultResponse> {
    return await this.termsTaxonomyService.createTermTaxonomy(body);
  }

  @Get()
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Access for admin only' })
  @Roles(ROLES.BASIC)
  async getTermTaxonomy(
    @Query() filter: TermTaxonomyFilterDto,
  ): Promise<TermTaxonomyEntity[]> {
    return this.termsTaxonomyService.getTermTaxonomy(filter);
  }

  @Patch('/:id')
  @ApiDefaultResponse(messages['terms.success.update'])
  @ApiInternalServerResponse(messages['terms.error.update'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public async updateTermTaxonomy(
    @Body() body: TermTaxonomyUpdateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.termsTaxonomyService.updateTermTaxonomy(body, id);
  }

  @Delete('/:id')
  @ApiDefaultResponse(messages['terms.success.delete'])
  @ApiInternalServerResponse(messages['terms.error.delete'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  async deleteTermTaxonomy(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.termsTaxonomyService.deleteTermTaxonomy(id);
  }
}
