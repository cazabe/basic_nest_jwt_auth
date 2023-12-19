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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_1 = require("../../../common/pagination");
const api_response_swagger_1 = require("../../../common/api-response-swagger");
const decorators_1 = require("../../../decorators");
const guards_1 = require("../../../guards");
const constants_1 = require("../../../constants");
const users_service_1 = require("../services/users.service");
const dtos_1 = require("../dtos");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    registerUser(body) {
        return this.usersService.createUser(body);
    }
    async getUser(pageOptionsDto, userFilter) {
        return this.usersService.getUsers(pageOptionsDto, userFilter);
    }
    userMe(userId) {
        return this.usersService.findUserById(userId);
    }
    updateUser(id, body) {
        return this.usersService.updateUser(id, body);
    }
    updatePassMe(userId, passUserDto) {
        return this.usersService.updatePasswordMe(userId, passUserDto);
    }
    updatePass(id, passUserDto) {
        return this.usersService.updatePassword(id, passUserDto);
    }
    async deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['users.success.create']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.create']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, api_response_swagger_1.ApiPaginatedResponse)(dtos_1.UsersResponseDto),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_1.PageOptionsDto,
        dtos_1.UserFilterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.get']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, decorators_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userMe", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['users.success.update']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.update']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UserUpdateDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)('/pass'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['users.success.update.password']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.update.password']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, decorators_1.GetUserId)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdatePassDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updatePassMe", null);
__decorate([
    (0, common_1.Patch)('/pass/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['users.success.update.password']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.update.password']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdatePassDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updatePass", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_response_swagger_1.ApiDefaultResponse)(constants_1.messages['users.success.delete']),
    (0, api_response_swagger_1.ApiInternalServerResponse)(constants_1.messages['users.error.delete']),
    (0, swagger_1.ApiOperation)({ summary: 'Access for admin only' }),
    (0, decorators_1.AdminAccess)(),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(guards_1.RolesGuard),
    (0, api_response_swagger_1.ApiUnauthorizedErrorResponse)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map