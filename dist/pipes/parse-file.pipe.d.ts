/// <reference types="multer" />
import { PipeTransform } from '@nestjs/common';
export declare class ParseFile implements PipeTransform {
    transform(files: Express.Multer.File | Express.Multer.File[]): Express.Multer.File | Express.Multer.File[];
}
