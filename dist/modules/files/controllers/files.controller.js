"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const messages_1 = require("../../../constants/messages");
const constants_1 = require("../../../constants");
const decorators_1 = require("../../../decorators");
const pipes_1 = require("../../../pipes");
const guards_1 = require("../../../guards");
const get_file_dto_1 = require("../dtos/get-file.dto");
let FilesController = exports.FilesController = class FilesController {
    async uploadedFileBlogs(file) {
        try {
            const response = {
                originalname: file.originalname,
                filename: file.filename,
                path_img: `${constants_1.DIRECTORY.BLOGS}/${file.filename}`,
                link_img: `${process.env.URL_BACKEND}/files/${constants_1.DIRECTORY.BLOGS}/${file.filename}`,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(messages_1.messages['file.error.upload']);
        }
    }
    async uploadedFileNews(file) {
        try {
            const response = {
                originalname: file.originalname,
                filename: file.filename,
                path_img: `${constants_1.DIRECTORY.NEWS}/${file.filename}`,
                link_img: `${process.env.URL_BACKEND}/files/${constants_1.DIRECTORY.NEWS}/${file.filename}`,
            };
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(messages_1.messages['file.error.upload']);
        }
    }
    seeUploadedFile(getFile, res) {
        try {
            const { img_path, directory } = getFile;
            return res.sendFile(img_path, { root: `./upload/${directory}` });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(messages_1.messages['file.error.get']);
        }
    }
};
__decorate([
    (0, common_1.Post)('/blogs'),
    (0, decorators_1.ApiFile)('image', constants_1.DIRECTORY.BLOGS),
    (0, api_response_swagger_1.ApiInternalServerResponse)(messages_1.messages['file.error.upload']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.UploadedFile)(pipes_1.ParseFile)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadedFileBlogs", null);
__decorate([
    (0, common_1.Post)('/news'),
    (0, decorators_1.ApiFile)('image', constants_1.DIRECTORY.NEWS),
    (0, api_response_swagger_1.ApiInternalServerResponse)(messages_1.messages['file.error.upload']),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.UploadedFile)(pipes_1.ParseFile)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadedFileNews", null);
__decorate([
    (0, common_1.Get)('/:directory/:img_path'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(messages_1.messages['file.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_file_dto_1.GetFileDto, Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "seeUploadedFile", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    (0, common_1.UseGuards)(guards_1.RolesGuard)
], FilesController);
//# sourceMappingURL=files.controller.js.map