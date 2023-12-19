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
exports.TermTaxonomyEntity = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const constants_1 = require("../../../constants");
const news_entity_1 = require("../../news/entities/news.entity");
const blogs_entity_1 = require("../../blogs/entities/blogs.entity");
const terms_entity_1 = require("./terms.entity");
let TermTaxonomyEntity = exports.TermTaxonomyEntity = class TermTaxonomyEntity extends config_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: constants_1.TAXONOMY }),
    __metadata("design:type", String)
], TermTaxonomyEntity.prototype, "taxonomy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 250 }),
    __metadata("design:type", String)
], TermTaxonomyEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => terms_entity_1.TermsEntity, (terms) => terms.termTaxonomy, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'term_id' }),
    __metadata("design:type", terms_entity_1.TermsEntity)
], TermTaxonomyEntity.prototype, "terms", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => news_entity_1.NewsEntity, (news) => news.termTaxonomy, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Array)
], TermTaxonomyEntity.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => blogs_entity_1.BlogsEntity, (blogs) => blogs.termTaxonomy, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    __metadata("design:type", Array)
], TermTaxonomyEntity.prototype, "blogs", void 0);
exports.TermTaxonomyEntity = TermTaxonomyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'term_taxonomy' })
], TermTaxonomyEntity);
//# sourceMappingURL=terms-taxonomy.entity.js.map