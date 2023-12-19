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
exports.TermsEntity = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../../../config");
const terms_taxonomy_entity_1 = require("./terms-taxonomy.entity");
let TermsEntity = exports.TermsEntity = class TermsEntity extends config_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], TermsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], TermsEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => terms_taxonomy_entity_1.TermTaxonomyEntity, (termTaxonomy) => termTaxonomy.terms),
    __metadata("design:type", Array)
], TermsEntity.prototype, "termTaxonomy", void 0);
exports.TermsEntity = TermsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'terms' })
], TermsEntity);
//# sourceMappingURL=terms.entity.js.map