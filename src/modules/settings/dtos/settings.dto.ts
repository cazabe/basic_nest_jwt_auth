import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { SETTINGS } from '../../../constants';

export class SettingsDto {
  @ApiProperty({
    title: 'Name option',
  })
  @IsOptional()
  @IsEnum(SETTINGS)
  name: SETTINGS;

  @ApiProperty({
    title: 'Value',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  value: string;
}
