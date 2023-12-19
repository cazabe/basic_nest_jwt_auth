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
exports.BackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const decorators_1 = require("../../../decorators");
const constants_1 = require("../../../constants");
const pagination_1 = require("../../../common/pagination");
const guards_1 = require("../../../guards");
const dtos_1 = require("../dtos");
const news_service_1 = require("../services/news.service");
let BackofficeController = exports.BackofficeController = class BackofficeController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async createNews(body, userId) {
        return await this.newsService.createNews(body, userId);
    }
    async getNews(pageOptionsDto, newsFilter) {
        return this.newsService.getNews(pageOptionsDto, newsFilter);
    }
    async getNewsById(id) {
        return this.newsService.getNewsById(id);
    }
    async updateNews(body, id) {
        return await this.newsService.updateNews(body, id);
    }
    async deleteNews(id) {
        return this.newsService.deleteNews(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['news.success.create']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.create']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.NewsDto, String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "createNews", null);
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiPaginatedResponse)(dtos_1.NewsDto),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_1.PageOptionsDto,
        dtos_1.NewsFilterDto]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "getNews", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "getNewsById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['news.success.update']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.update']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.NewsUpdateDto, String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['news.success.delete']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.delete']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "deleteNews", null);
exports.BackofficeController = BackofficeController = __decorate([
    (0, swagger_1.ApiTags)('Backoffice News'),
    (0, common_1.Controller)('backoffice/news'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], BackofficeController);
//# sourceMappingURL=backoffice.controller.js.map