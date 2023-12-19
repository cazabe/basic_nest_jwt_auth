import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DIRECTORY } from '../../../constants';

export class GetFileDto {
  @ApiProperty({
    title: 'Directory',
    enum: DIRECTORY,
    description: 'Directory to save the file',
  })
  @IsNotEmpty()
  @IsEnum(DIRECTORY)
  directory: DIRECTORY;

  @ApiProperty({
    title: 'Img path',
  })
  @IsNotEmpty()
  @IsString()
  img_path: string;
}
