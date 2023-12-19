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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_1 = require("../../../common/pagination");
const constants_1 = require("../../../constants");
const services_1 = require("../../terms-taxonomy/services");
const news_entity_1 = require("../entities/news.entity");
const users_service_1 = require("../../users/services/users.service");
const util_1 = require("../../../util");
const providers_1 = require("../../../providers");
let NewsService = exports.NewsService = class NewsService {
    constructor(newsRepository, usersServices, termsTaxonomyServices, slugProvider) {
        this.newsRepository = newsRepository;
        this.usersServices = usersServices;
        this.termsTaxonomyServices = termsTaxonomyServices;
        this.slugProvider = slugProvider;
    }
    async createNews(body, userId) {
        const { categories, title } = body;
        const userFound = await this.usersServices.findUserById(userId);
        try {
            const slug = await this.uniqueSlug(title);
            const listCategory = [];
            await Promise.all(categories.map(async (id) => {
                const termTaxonomy = await this.termsTaxonomyServices.findById(id);
                if (!termTaxonomy)
                    return;
                listCategory.push(termTaxonomy);
            }));
            await this.newsRepository.save({
                ...body,
                users: userFound,
                termTaxonomy: listCategory,
                slug,
            });
            return {
                message: constants_1.messages['news.success.create'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['news.error.create']);
        }
    }
    async getNewsPublic(pageOptionsDto, newsFilter) {
        const { search_pattern, category_id } = newsFilter;
        try {
            const queryBuilder = this.newsRepository.createQueryBuilder('news');
            queryBuilder
                .innerJoinAndSelect('news.users', 'user')
                .leftJoinAndSelect('news.termTaxonomy', 'category')
                .leftJoinAndSelect('category.terms', 'terms')
                .orderBy('news.createdAt', pageOptionsDto.order)
                .andWhere('news.status = :status', {
                status: constants_1.STATUS.ACTIVE,
            })
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take);
            if (search_pattern) {
                queryBuilder.andWhere('news.title LIKE :name', {
                    name: '%' + search_pattern + '%',
                });
            }
            if (category_id) {
                queryBuilder.andWhere('category.id = :id', {
                    id: category_id,
                });
            }
            const itemCount = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();
            const pageMetaDto = new pagination_1.PageMetaDto({ itemCount, pageOptionsDto });
            return new pagination_1.PageDto(entities, pageMetaDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['news.error.get']);
        }
    }
    async getNews(pageOptionsDto, newsFilter) {
        const { search_pattern, start_date, end_date, status, user_id, category_id, } = newsFilter;
        try {
            const queryBuilder = this.newsRepository.createQueryBuilder('news');
            queryBuilder
                .innerJoinAndSelect('news.users', 'user')
                .leftJoinAndSelect('news.termTaxonomy', 'category')
                .leftJoinAndSelect('category.terms', 'terms')
                .orderBy('news.createdAt', pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take);
            if (search_pattern) {
                queryBuilder.andWhere('news.title LIKE :name', {
                    name: '%' + search_pattern + '%',
                });
            }
            if (start_date) {
                const endDate = end_date ? end_date : (0, util_1.getNowDate)();
                queryBuilder.andWhere(`news.createdAt BETWEEN '${start_date} 00:00:00' AND '${endDate} 23:59:59'`);
            }
            if (status) {
                queryBuilder.andWhere('news.status = :status', {
                    status,
                });
            }
            if (user_id) {
                queryBuilder.andWhere('user.id = :id', {
                    id: user_id,
                });
            }
            if (category_id) {
                queryBuilder.andWhere('category.id = :id', {
                    id: category_id,
                });
            }
            const itemCount = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();
            const pageMetaDto = new pagination_1.PageMetaDto({ itemCount, pageOptionsDto });
            return new pagination_1.PageDto(entities, pageMetaDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['news.error.get']);
        }
    }
    async getNewsById(slug, onlyActive = false) {
        const queryBuilder = this.newsRepository.createQueryBuilder('news');
        queryBuilder
            .innerJoinAndSelect('news.users', 'user')
            .leftJoinAndSelect('news.termTaxonomy', 'category')
            .leftJoinAndSelect('category.terms', 'terms')
            .where({ slug });
        if (onlyActive) {
            queryBuilder.andWhere('news.status = :status', {
                status: constants_1.STATUS.ACTIVE,
            });
        }
        const foundNews = await queryBuilder.getOne();
        if (!foundNews)
            throw new common_1.NotFoundException(constants_1.messages['news.error.noFound']);
        return foundNews;
    }
    async updateNews(body, id) {
        const { categories } = body;
        try {
            const listCategory = [];
            await Promise.all(categories.map(async (id) => {
                const termTaxonomy = await this.termsTaxonomyServices.findById(id);
                if (!termTaxonomy)
                    return;
                listCategory.push(termTaxonomy);
            }));
            await this.newsRepository.save({
                ...body,
                id,
                termTaxonomy: listCategory,
            });
            return { message: constants_1.messages['news.success.update'] };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['news.error.update']);
        }
    }
    async deleteNews(id) {
        try {
            await this.newsRepository.delete(id);
            return {
                message: constants_1.messages['news.success.delete'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['news.error.delete']);
        }
    }
    async findBySlug(slug) {
        return await this.newsRepository.findOne({
            where: {
                slug,
            },
        });
    }
    async uniqueSlug(title) {
        const slug = this.slugProvider.slugify(title);
        const exists = await this.findSlugs(slug);
        if (!exists || exists.length === 0) {
            return slug;
        }
        return slug + this.slugProvider.replacement() + exists.length;
    }
    async findSlugs(slug) {
        return await this.newsRepository
            .createQueryBuilder('blog')
            .where('slug like :slug', { slug: `${slug}%` })
            .getMany();
    }
};
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.NewsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        services_1.TermsTaxonomyService,
        providers_1.SlugProvider])
], NewsService);
//# sourceMappingURL=news.service.js.map