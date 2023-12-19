import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }
    async singIn(userName: string, passwd: string): Promise<{}> {
        try {
            const user = await this.userService.findOne(userName);
            const passCompare = await bcrypt.compare(passwd, user.password)
            if (!passCompare) {
                throw new UnauthorizedException();
            }
            const { password, ...result } = user;
            const payload = { id: result.id, username: result.username };
            const access_token = await this.jwtService.signAsync(payload);
            return { "token": access_token };
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async veriFyAccount(verifyCode: string): Promise<{ message: string }> {
        try {
            const res = await this.userService.validateCode(verifyCode);
            if (!res) {
                return { 'message': 'Account validation failed' };
            }
            await this.userService.validateUserAccount(verifyCode);
            return { 'message': 'Account validated' };
        } catch (e) {
            throw new HttpException('Bad request', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
