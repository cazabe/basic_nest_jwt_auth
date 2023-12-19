import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { STATUS } from '../../../constants';

export class NewsFilterDto {
  @ApiPropertyOptional({
    description: 'Search by news title',
    default: '',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly search_pattern?: string = '';

  @ApiPropertyOptional({
    description: 'Start date (format: YYYY-MM-DD)',
  })
  @IsOptional()
  readonly start_date?: string;

  @ApiPropertyOptional({
    description: 'End date (format: YYYY-MM-DD)',
  })
  @IsOptional()
  readonly end_date?: string;

  @ApiPropertyOptional({ enum: STATUS })
  @IsEnum(STATUS)
  @IsOptional()
  readonly status?: STATUS;

  @ApiPropertyOptional({
    description: 'User id',
    type: String,
    format: 'uuid',
  })
  @Type(() => String)
  @IsOptional()
  @IsUUID()
  readonly user_id?: string;

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
