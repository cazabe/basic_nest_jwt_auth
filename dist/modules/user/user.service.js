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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = require("bcrypt");
const dates_util_1 = require("../../common/utils/dates.util");
const mailer_service_1 = require("../mailer/mailer.service");
const uuid_1 = require("uuid");
let UserService = exports.UserService = class UserService {
    constructor(userRepository, mailServer) {
        this.userRepository = userRepository;
        this.mailServer = mailServer;
    }
    async create(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.created = (0, dates_util_1.getTodayDate)();
            user.account_verify_code = (0, uuid_1.v4)();
            await this.userRepository.save(user);
            const emailResp = await this.mailServer.sendUserConfirmation(user.username, user.account_verify_code);
            return { "message": 'User created succesfully', "email": emailResp };
        }
        catch (e) {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(userName) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username: userName
                }
            });
            return user;
        }
        catch (e) {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateCode(verifyCode) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    account_verify_code: verifyCode
                }
            });
            if (!user) {
                return false;
            }
            return true;
        }
        catch (e) {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUserAccount(verifyCode) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    account_verify_code: verifyCode
                }
            });
            user.status = 'A';
            await this.userRepository.save(user);
            return { message: "Account validated" };
        }
        catch (e) {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_service_1.MaileService])
], UserService);
//# sourceMappingURL=user.service.js.map