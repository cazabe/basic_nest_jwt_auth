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
exports.NewsEntity = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const constants_1 = require("../../../constants");
const users_entity_1 = require("../../users/entities/users.entity");
const entities_1 = require("../../terms-taxonomy/entities");
let NewsEntity = exports.NewsEntity = class NewsEntity extends config_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], NewsEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 150 }),
    __metadata("design:type", String)
], NewsEntity.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NewsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 150 }),
    __metadata("design:type", String)
], NewsEntity.prototype, "reference_link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.STATUS }),
    __metadata("design:type", String)
], NewsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (users) => users.news, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.UsersEntity)
], NewsEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.TermTaxonomyEntity, (termTaxonomy) => termTaxonomy.news, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'term_news',
        joinColumn: {
            name: 'news_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'term_taxonomy_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], NewsEntity.prototype, "termTaxonomy", void 0);
exports.NewsEntity = NewsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'news' })
], NewsEntity);
//# sourceMappingURL=news.entity.js.map