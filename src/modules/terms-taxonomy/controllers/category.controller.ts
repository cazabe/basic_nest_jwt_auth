import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards';
import { TermsTaxonomyService } from '../services';
import { ApiInternalServerResponse } from 'src/common/api-response-swagger';
import { messages } from 'src/constants';
import { PublicAccess } from 'src/decorators';
import { TermTaxonomyEntity } from '../entities';

@ApiTags('Category')
@Controller('category')
@UseGuards(RolesGuard)
export class CategoryController {
  constructor(private readonly termsTaxonomyService: TermsTaxonomyService) {}

  @Get()
  @ApiInternalServerResponse(messages['news.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async getTermTaxonomy(): Promise<TermTaxonomyEntity[]> {
    return this.termsTaxonomyService.getCategory();
  }
}
