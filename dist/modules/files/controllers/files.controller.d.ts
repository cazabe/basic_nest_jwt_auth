/// <reference types="multer" />
import { Response } from 'express';
import { GetFileDto } from '../dtos/get-file.dto';
export declare class FilesController {
    uploadedFileBlogs(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
        path_img: string;
        link_img: string;
    }>;
    uploadedFileNews(file: Express.Multer.File): Promise<{
        originalname: string;
        filename: string;
        path_img: string;
        link_img: string;
    }>;
    seeUploadedFile(getFile: GetFileDto, res: Response): void;
}
