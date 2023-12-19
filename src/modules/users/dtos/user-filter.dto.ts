import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @ApiPropertyOptional({
    description: 'Search by users names',
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
}
