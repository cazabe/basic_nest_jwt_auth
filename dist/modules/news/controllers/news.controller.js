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
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const pagination_1 = require("../../../common/pagination");
const decorators_1 = require("../../../decorators");
const constants_1 = require("../../../constants");
const news_service_1 = require("../services/news.service");
const dtos_1 = require("../dtos");
let NewsController = exports.NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async getNewsPublic(pageOptionsDto, newsFilter) {
        return this.newsService.getNewsPublic(pageOptionsDto, newsFilter);
    }
    async getNewsPublicById(slug) {
        return this.newsService.getNewsById(slug, true);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiPaginatedResponse)(dtos_1.NewsDto),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_1.PageOptionsDto,
        dtos_1.NewsFilterPublicDto]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsPublic", null);
__decorate([
    (0, common_1.Get)('/:slug'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNewsPublicById", null);
exports.NewsController = NewsController = __decorate([
    (0, swagger_1.ApiTags)('News'),
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
//# sourceMappingURL=news.controller.js.map