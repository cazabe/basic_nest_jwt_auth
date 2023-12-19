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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const config_1 = require("../../../config");
const constants_1 = require("../../../constants");
const news_entity_1 = require("../../news/entities/news.entity");
const blogs_entity_1 = require("../../blogs/entities/blogs.entity");
let UsersEntity = exports.UsersEntity = class UsersEntity extends config_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "names", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UsersEntity.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.ROLES, default: constants_1.ROLES.BASIC }),
    __metadata("design:type", String)
], UsersEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.NewsEntity, (news) => news.users),
    __metadata("design:type", Array)
], UsersEntity.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blogs_entity_1.BlogsEntity, (blogs) => blogs.users),
    __metadata("design:type", Array)
], UsersEntity.prototype, "blogs", void 0);
exports.UsersEntity = UsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UsersEntity);
//# sourceMappingURL=users.entity.js.map