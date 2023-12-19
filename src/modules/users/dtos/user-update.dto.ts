import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @ApiPropertyOptional({
    title: 'Names',
    maxLength: 80,
  })
  @IsOptional()
  @IsString()
  names?: string;

  @ApiPropertyOptional({
    title: 'Username',
    maxLength: 80,
  })
  @IsOptional()
  @IsString()
  username?: string;
}
