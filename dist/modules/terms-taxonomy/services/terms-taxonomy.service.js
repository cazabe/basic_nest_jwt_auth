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
exports.TermsTaxonomyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../constants");
const entities_1 = require("../entities");
const terms_service_1 = require("./terms.service");
let TermsTaxonomyService = exports.TermsTaxonomyService = class TermsTaxonomyService {
    constructor(termTaxonomyRepository, termsRepository, termsService) {
        this.termTaxonomyRepository = termTaxonomyRepository;
        this.termsRepository = termsRepository;
        this.termsService = termsService;
    }
    async createTermTaxonomy(body) {
        const { name, slug, description, taxonomy } = body;
        try {
            const { data } = await this.termsService.createTerm({ name, slug });
            await this.termTaxonomyRepository.save({
                description,
                taxonomy,
                terms: data,
            });
            return {
                message: constants_1.messages['terms.success.create'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['terms.error.create']);
        }
    }
    async getTermTaxonomy(filter) {
        const { taxonomy, search_pattern } = filter;
        const queryBuilder = this.termTaxonomyRepository
            .createQueryBuilder('term_taxonomy')
            .innerJoinAndSelect('term_taxonomy.terms', 'terms')
            .orderBy('term_taxonomy.createdAt', constants_1.Order.DESC);
        if (taxonomy) {
            queryBuilder.where('term_taxonomy.taxonomy = :taxonomy', { taxonomy });
        }
        if (search_pattern) {
            queryBuilder.andWhere('terms.name LIKE :name', {
                name: '%' + search_pattern + '%',
            });
        }
        const termTaxonomyAll = await queryBuilder.getMany();
        return termTaxonomyAll;
    }
    async getCategory() {
        const queryBuilder = this.termTaxonomyRepository
            .createQueryBuilder('term_taxonomy')
            .innerJoinAndSelect('term_taxonomy.terms', 'terms')
            .where('term_taxonomy.taxonomy = :taxonomy', {
            taxonomy: constants_1.TAXONOMY.CATEGOTY,
        })
            .orderBy('term_taxonomy.createdAt', constants_1.Order.DESC);
        const termTaxonomyAll = await queryBuilder.getMany();
        return termTaxonomyAll;
    }
    async findById(id) {
        const result = await this.termTaxonomyRepository
            .createQueryBuilder('term_taxonomy')
            .innerJoinAndSelect('term_taxonomy.terms', 'terms')
            .where('term_taxonomy.id = :id', { id })
            .getOne();
        return result;
    }
    async updateTermTaxonomy(body, id) {
        const termTaxonomy = await this.findById(id);
        if (!termTaxonomy)
            throw new common_1.NotFoundException(constants_1.messages['terms.error.noFound']);
        try {
            const { description, name, slug } = body;
            await this.termTaxonomyRepository.update(id, { description });
            await this.termsRepository.update(termTaxonomy.terms.id, { name, slug });
            return { message: constants_1.messages['terms.success.update'] };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['terms.error.update']);
        }
    }
    async deleteTermTaxonomy(id) {
        const termTaxonomy = await this.findById(id);
        if (!termTaxonomy)
            throw new common_1.NotFoundException(constants_1.messages['terms.error.noFound']);
        try {
            await this.termTaxonomyRepository.delete(id);
            await this.termsRepository.delete(termTaxonomy.terms.id);
            return {
                message: constants_1.messages['terms.success.delete'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['terms.error.delete']);
        }
    }
};
exports.TermsTaxonomyService = TermsTaxonomyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.TermTaxonomyEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.TermsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        terms_service_1.TermsService])
], TermsTaxonomyService);
//# sourceMappingURL=terms-taxonomy.service.js.map