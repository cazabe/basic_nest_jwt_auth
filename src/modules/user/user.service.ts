import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, ReadUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { getTodayDate } from 'src/common/utils/dates.util';
import { MaileService } from '../mailer/mailer.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private mailServer: MaileService
    ) { }

    async create(user: CreateUserDto): Promise<{ message: string, email: string }> {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            user.created = getTodayDate();
            user.account_verify_code = uuidv4();
            await this.userRepository.save(user)
            const emailResp = await this.mailServer.sendUserConfirmation(
                user.username,
                user.account_verify_code
            );
            return { "message": 'User created succesfully', "email": emailResp };
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(userName: string): Promise<ReadUserDto> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username: userName
                }
            });
            return user;
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateCode(verifyCode: string): Promise<boolean> {
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
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateUserAccount(verifyCode: string): Promise<{ message: string }> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    account_verify_code: verifyCode
                }
            });
            user.status = 'A';
            await this.userRepository.save(user);
            return { message: "Account validated" };
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
