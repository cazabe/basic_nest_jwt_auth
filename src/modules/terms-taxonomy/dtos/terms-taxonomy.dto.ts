import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TAXONOMY } from '../../../constants';

export class TermTaxonomyDto {
  @ApiProperty({
    title: 'Name',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    title: 'Slug',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  slug: string;

  @ApiPropertyOptional({
    title: 'Description',
    maxLength: 250,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'Status',
  })
  @IsEnum(TAXONOMY)
  taxonomy: TAXONOMY;
}
