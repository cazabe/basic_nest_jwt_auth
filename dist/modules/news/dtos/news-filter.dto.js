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
exports.NewsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../constants");
class NewsFilterDto {
    constructor() {
        this.search_pattern = '';
    }
}
exports.NewsFilterDto = NewsFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search by news title',
        default: '',
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "search_pattern", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date (format: YYYY-MM-DD)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date (format: YYYY-MM-DD)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "end_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: constants_1.STATUS }),
    (0, class_validator_1.IsEnum)(constants_1.STATUS),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User id',
        type: String,
        format: 'uuid',
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Category id',
        type: String,
        format: 'uuid',
    }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], NewsFilterDto.prototype, "category_id", void 0);
//# sourceMappingURL=news-filter.dto.js.map