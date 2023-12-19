import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { messages } from '../constants';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(
    files: Express.Multer.File | Express.Multer.File[],
  ): Express.Multer.File | Express.Multer.File[] {
    if (files === undefined || files === null) {
      throw new BadRequestException(messages['file.error.enpty']);
    }

    if (Array.isArray(files) && files.length === 0) {
      throw new BadRequestException(messages['file.error.enpty']);
    }

    return files;
  }
}
