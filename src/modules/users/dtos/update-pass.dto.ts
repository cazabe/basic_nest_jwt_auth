import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePassDto {
  @ApiProperty()
  @IsOptional()
  password_old?: string;

  @ApiProperty()
  @IsNotEmpty()
  password_new: string;
}
