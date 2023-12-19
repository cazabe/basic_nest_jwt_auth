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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../guards");
const services_1 = require("../services");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const constants_1 = require("../../../constants");
const decorators_1 = require("../../../decorators");
let CategoryController = exports.CategoryController = class CategoryController {
    constructor(termsTaxonomyService) {
        this.termsTaxonomyService = termsTaxonomyService;
    }
    async getTermTaxonomy() {
        return this.termsTaxonomyService.getCategory();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Public' }),
    (0, decorators_1.PublicAccess)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getTermTaxonomy", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('Category'),
    (0, common_1.Controller)('category'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    __metadata("design:paramtypes", [services_1.TermsTaxonomyService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map