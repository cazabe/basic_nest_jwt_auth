import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class NewsFilterPublicDto {
  @ApiPropertyOptional({
    description: 'Search by news title',
    default: '',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly search_pattern?: string = '';

  @ApiPropertyOptional({
    description: 'Category id',
    type: String,
    format: 'uuid',
  })
  @Type(() => String)
  @IsOptional()
  @IsUUID()
  readonly category_id?: string;
}
