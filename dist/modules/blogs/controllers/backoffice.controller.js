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
const constants_1 = require("../../../constants");
const guards_1 = require("../../../guards");
const decorators_1 = require("../../../decorators");
const pagination_1 = require("../../../common/pagination");
const blogs_service_1 = require("../services/blogs.service");
const dtos_1 = require("../dtos");
let BackofficeController = exports.BackofficeController = class BackofficeController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async create(body, userId) {
        return await this.blogsService.createPost(body, userId);
    }
    async getPost(pageOptionsDto, blogsFilter) {
        return this.blogsService.getPost(pageOptionsDto, blogsFilter);
    }
    async getNewsById(id) {
        return this.blogsService.getPostById(id);
    }
    async updatePost(body, id) {
        return await this.blogsService.updatePost(body, id);
    }
    async deletePost(id) {
        return this.blogsService.deletePost(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['blogs.success.create']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.create']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.BlogsDto, String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiPaginatedResponse)(dtos_1.BlogsDto),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_1.PageOptionsDto,
        dtos_1.BlogsFilterDto]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "getPost", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "getNewsById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['blogs.success.update']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.update']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.BlogsUpdateDto, String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['blogs.success.delete']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.delete']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BackofficeController.prototype, "deletePost", null);
exports.BackofficeController = BackofficeController = __decorate([
    (0, swagger_1.ApiTags)('Backoffice Blogs'),
    (0, common_1.Controller)('backoffice/blogs'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BackofficeController);
//# sourceMappingURL=backoffice.controller.js.map