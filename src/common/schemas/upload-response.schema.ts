import { ApiProperty } from '@nestjs/swagger';

export class UploadResponse {
  @ApiProperty()
  originalname: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  path_img: string;

  @ApiProperty()
  link_img: string;
}
