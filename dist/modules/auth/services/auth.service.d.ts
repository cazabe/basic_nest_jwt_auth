import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../../../modules/users/entities/users.entity';
import { UsersService } from '../../../modules/users/services/users.service';
import { AuthResponse } from '../interfaces';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UsersEntity | null>;
    generateJWT(user: UsersEntity): Promise<AuthResponse>;
}
