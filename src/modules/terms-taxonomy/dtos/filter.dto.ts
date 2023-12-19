import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TAXONOMY } from '../../../constants';

export class TermTaxonomyFilterDto {
  @ApiPropertyOptional({
    title: 'Taxonomy',
    enum: TAXONOMY,
  })
  @IsOptional()
  @IsEnum(TAXONOMY)
  taxonomy: TAXONOMY;

  @ApiPropertyOptional({
    description: 'Search by users names',
    default: '',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly search_pattern?: string = '';
}
