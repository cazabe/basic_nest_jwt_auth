"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsTaxonomyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const terms_taxonomy_service_1 = require("./services/terms-taxonomy.service");
const terms_taxonomy_controller_1 = require("./controllers/terms-taxonomy.controller");
const entities_1 = require("./entities");
const services_1 = require("./services");
const category_controller_1 = require("./controllers/category.controller");
let TermsTaxonomyModule = exports.TermsTaxonomyModule = class TermsTaxonomyModule {
};
exports.TermsTaxonomyModule = TermsTaxonomyModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.TermsEntity, entities_1.TermTaxonomyEntity])],
        providers: [terms_taxonomy_service_1.TermsTaxonomyService, services_1.TermsService],
        controllers: [terms_taxonomy_controller_1.TermsTaxonomyController, category_controller_1.CategoryController],
        exports: [terms_taxonomy_service_1.TermsTaxonomyService, services_1.TermsService, typeorm_1.TypeOrmModule],
    })
], TermsTaxonomyModule);
//# sourceMappingURL=terms-taxonomy.module.js.map