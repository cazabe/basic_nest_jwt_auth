"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const pagination_1 = require("../../../common/pagination");
const constants_1 = require("../../../constants");
const users_entity_1 = require("../entities/users.entity");
const util_1 = require("../../../util");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(body) {
        const userByUsername = await this.findBy({
            key: 'username',
            value: body.username,
        });
        const userByEmail = await this.findBy({
            key: 'email',
            value: body.email,
        });
        if (userByUsername) {
            throw new common_1.ConflictException(constants_1.messages['users.conflict.credentials']);
        }
        if (userByEmail) {
            throw new common_1.ConflictException(constants_1.messages['users.conflict.credentials']);
        }
        try {
            body.password = await this.hashPassword(body.password, +process.env.HASH_SALT);
            await this.usersRepository.save(body);
            return {
                message: constants_1.messages['users.success.create'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.create']);
        }
    }
    async getUsers(pageOptionsDto, userFilter) {
        const { search_pattern, start_date, end_date } = userFilter;
        try {
            const queryBuilder = this.usersRepository.createQueryBuilder('users');
            queryBuilder
                .orderBy('users.createdAt', pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take);
            if (search_pattern) {
                queryBuilder.andWhere('users.names LIKE :name', {
                    name: '%' + search_pattern + '%',
                });
            }
            if (start_date) {
                console.log(start_date);
                console.log(end_date);
                const endDate = end_date ? end_date : (0, util_1.getNowDate)();
                queryBuilder.andWhere(`users.createdAt BETWEEN '${start_date} 00:00:00' AND '${endDate} 23:59:59'`);
            }
            const itemCount = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();
            const pageMetaDto = new pagination_1.PageMetaDto({ itemCount, pageOptionsDto });
            return new pagination_1.PageDto(entities, pageMetaDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.get']);
        }
    }
    async findUserById(id) {
        const result = await this.usersRepository.findOne({
            where: {
                id,
            },
        });
        if (!result)
            throw new common_1.NotFoundException(constants_1.messages['users.error.noFound']);
        return result;
    }
    async findBy({ key, value, }) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    [key]: value,
                },
            });
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.get']);
        }
    }
    async updateUser(id, body) {
        await this.findUserById(id);
        try {
            await this.usersRepository.update(id, body);
            return { message: constants_1.messages['users.success.update'] };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException(constants_1.messages['users.conflict.unique']);
            }
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.update']);
        }
    }
    async updatePassword(id, updatePassDto) {
        const { password_new } = updatePassDto;
        const found = await this.findUserById(id);
        try {
            found.password = await this.hashPassword(password_new, +process.env.HASH_SALT);
            await this.usersRepository.update(id, found);
            return { message: constants_1.messages['users.success.update.password'] };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.update.password']);
        }
    }
    async updatePasswordMe(id, updatePassDto) {
        const { password_new, password_old } = updatePassDto;
        const found = await this.findUserById(id);
        if (!bcrypt.compareSync(password_old, found.password)) {
            throw new common_1.ConflictException(constants_1.messages['users.error.notMatch']);
        }
        try {
            found.password = await this.hashPassword(password_new, +process.env.HASH_SALT);
            await this.usersRepository.update(id, found);
            return { message: constants_1.messages['users.success.update.password'] };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.update.password']);
        }
    }
    async deleteUser(id) {
        await this.findUserById(id);
        try {
            await this.usersRepository.delete(id);
            return {
                message: constants_1.messages['users.success.delete'],
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(constants_1.messages['users.error.delete']);
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map