import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponse<T = any> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  data?: T;
}
