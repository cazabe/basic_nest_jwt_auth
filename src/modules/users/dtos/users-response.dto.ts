import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ROLES } from '../../../constants';

export class UsersResponseDto {
  @ApiProperty()
  @IsString()
  names: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  role: ROLES;
}
