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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const constants_1 = require("../../../constants");
const entities_1 = require("../entities");
let SettingsService = exports.SettingsService = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async createSettings(body) {
        try {
            await this.settingsRepository.save(body);
            return {
                message: constants_1.messages['blogs.success.create'],
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(constants_1.messages['users.conflict.unique']);
            }
            throw new common_1.InternalServerErrorException(constants_1.messages['blogs.error.create']);
        }
    }
    async getSettings() {
        try {
            return this.settingsRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['blogs.error.get']);
        }
    }
    async updateSettings(body, id) {
        try {
            await this.settingsRepository.save({
                ...body,
                id,
            });
            return { message: constants_1.messages['blogs.success.update'] };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['blogs.error.get']);
        }
    }
};
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.SettingsEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map