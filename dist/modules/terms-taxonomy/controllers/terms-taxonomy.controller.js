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
exports.TermsTaxonomyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const constants_1 = require("../../../constants");
const guards_1 = require("../../../guards");
const decorators_1 = require("../../../decorators");
const services_1 = require("../services");
const dtos_1 = require("../dtos");
let TermsTaxonomyController = exports.TermsTaxonomyController = class TermsTaxonomyController {
    constructor(termsTaxonomyService) {
        this.termsTaxonomyService = termsTaxonomyService;
    }
    async createTermTaxonomy(body) {
        return await this.termsTaxonomyService.createTermTaxonomy(body);
    }
    async getTermTaxonomy(filter) {
        return this.termsTaxonomyService.getTermTaxonomy(filter);
    }
    async updateTermTaxonomy(body, id) {
        return await this.termsTaxonomyService.updateTermTaxonomy(body, id);
    }
    async deleteTermTaxonomy(id) {
        return this.termsTaxonomyService.deleteTermTaxonomy(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['terms.success.create']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['terms.error.create']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TermTaxonomyDto]),
    __metadata("design:returntype", Promise)
], TermsTaxonomyController.prototype, "createTermTaxonomy", null);
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['news.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TermTaxonomyFilterDto]),
    __metadata("design:returntype", Promise)
], TermsTaxonomyController.prototype, "getTermTaxonomy", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['terms.success.update']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['terms.error.update']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.TermTaxonomyUpdateDto, String]),
    __metadata("design:returntype", Promise)
], TermsTaxonomyController.prototype, "updateTermTaxonomy", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['terms.success.delete']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['terms.error.delete']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TermsTaxonomyController.prototype, "deleteTermTaxonomy", null);
exports.TermsTaxonomyController = TermsTaxonomyController = __decorate([
    (0, swagger_1.ApiTags)('Terms taxonomy'),
    (0, common_1.Controller)('terms-taxonomy'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [services_1.TermsTaxonomyService])
], TermsTaxonomyController);
//# sourceMappingURL=terms-taxonomy.controller.js.map