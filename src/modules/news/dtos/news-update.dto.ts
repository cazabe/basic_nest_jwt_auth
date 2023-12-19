import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { STATUS } from '../../../constants';

export class NewsUpdateDto {
  @ApiProperty({
    title: 'Title',
    maxLength: 150,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    title: 'Image url',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty({
    title: 'Content',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    title: 'Reference link',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  reference_link: string;

  @ApiPropertyOptional({
    title: 'Status',
  })
  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;

  @ApiPropertyOptional({
    title: 'Categories',
  })
  @IsOptional()
  @IsArray()
  categories?: string[];
}
