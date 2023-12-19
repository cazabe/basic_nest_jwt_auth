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
exports.TermsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../constants");
const terms_entity_1 = require("../entities/terms.entity");
let TermsService = exports.TermsService = class TermsService {
    constructor(termsRepository) {
        this.termsRepository = termsRepository;
    }
    async createTerm(body) {
        try {
            const result = await this.termsRepository.save(body);
            return {
                message: constants_1.messages['terms.success.create'],
                data: result,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['terms.error.create']);
        }
    }
};
exports.TermsService = TermsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(terms_entity_1.TermsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TermsService);
//# sourceMappingURL=terms.service.js.map