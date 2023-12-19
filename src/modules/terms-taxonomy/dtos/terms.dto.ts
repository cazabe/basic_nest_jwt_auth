import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TermDto {
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
}
