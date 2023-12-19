import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TermTaxonomyUpdateDto {
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
}
