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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../../../guards");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const constants_1 = require("../../../constants");
const decorators_1 = require("../../../decorators");
const services_1 = require("../services");
const dtos_1 = require("../dtos");
let SettingsController = exports.SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async create(body) {
        return await this.settingsService.createSettings(body);
    }
    async getSettings() {
        return this.settingsService.getSettings();
    }
    async updatePost(body, id) {
        return await this.settingsService.updateSettings(body, id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['blogs.success.create']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.create']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SettingsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Allowed roles [Admin - Basic].' }),
    (0, decorators_1.Roles)(constants_1.ROLES.BASIC),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['blogs.success.update']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['blogs.error.update']),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SettingsUpdateDto, String]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "updatePost", null);
exports.SettingsController = SettingsController = __decorate([
    (0, swagger_1.ApiTags)('Settings'),
    (0, common_1.Controller)('settings'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [services_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map