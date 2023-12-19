import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    singIn(userName: string, passwd: string): Promise<{}>;
    veriFyAccount(verifyCode: string): Promise<{
        message: string;
    }>;
}
