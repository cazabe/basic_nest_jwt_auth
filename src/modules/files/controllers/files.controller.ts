import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiInternalServerResponse } from '../../../common/api-response-swagger';
import { messages } from '../../../constants/messages';
import { DIRECTORY, ROLES } from '../../../constants';
import { ApiFile, PublicAccess, Roles } from '../../../decorators';
import { ParseFile } from '../../../pipes';
import { RolesGuard } from '../../../guards';
import { GetFileDto } from '../dtos/get-file.dto';

@ApiTags('Files')
@Controller('files')
@UseGuards(RolesGuard)
export class FilesController {
  @Post('/blogs')
  @ApiFile('image', DIRECTORY.BLOGS)
  @ApiInternalServerResponse(messages['file.error.upload'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async uploadedFileBlogs(@UploadedFile(ParseFile) file: Express.Multer.File) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
        path_img: `${DIRECTORY.BLOGS}/${file.filename}`,
        link_img: `${process.env.URL_BACKEND}/files/${DIRECTORY.BLOGS}/${file.filename}`,
      };
      return response;
    } catch (error) {
      throw new InternalServerErrorException(messages['file.error.upload']);
    }
  }

  @Post('/news')
  @ApiFile('image', DIRECTORY.NEWS)
  @ApiInternalServerResponse(messages['file.error.upload'])
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async uploadedFileNews(@UploadedFile(ParseFile) file: Express.Multer.File) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
        path_img: `${DIRECTORY.NEWS}/${file.filename}`,
        link_img: `${process.env.URL_BACKEND}/files/${DIRECTORY.NEWS}/${file.filename}`,
      };
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(messages['file.error.upload']);
    }
  }

  @Get('/:directory/:img_path')
  @ApiInternalServerResponse(messages['file.error.get'])
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  seeUploadedFile(@Param() getFile: GetFileDto, @Res() res: Response) {
    try {
      const { img_path, directory } = getFile;
      return res.sendFile(img_path, { root: `./upload/${directory}` });
    } catch (error) {
      throw new InternalServerErrorException(messages['file.error.get']);
    }
  }
}
