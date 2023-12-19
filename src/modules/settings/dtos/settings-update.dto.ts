import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SettingsUpdateDto {
  @ApiProperty({
    title: 'Value',
    maxLength: 150,
  })
  @IsOptional()
  @IsString()
  value: string;
}
