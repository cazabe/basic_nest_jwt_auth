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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const pagination_1 = require("../../../common/pagination");
const constants_1 = require("../../../constants");
const decorators_1 = require("../../../decorators");
const blogs_service_1 = require("../services/blogs.service");
const dtos_1 = require("../dtos");
let BlogsController = exports.BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async getPostPublic(pageOptionsDto, blogsFilter) {
        return this.blogsService.getPostPublic(pageOptionsDto, blogsFilter);
    }
    async getNewsById(slug) {
        return this.blogsService.getPostById(slug, true);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiPaginatedResponse)(dtos_1.BlogsDto),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_1.PageOptionsDto,
        dtos_1.BlogsFilterPublicDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getPostPublic", null);
__decorate([
    (0, common_1.Get)('/:slug'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getNewsById", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map