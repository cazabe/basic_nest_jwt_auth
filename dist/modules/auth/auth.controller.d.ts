import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    auth(user: AuthDto): Promise<{}>;
    verification(code: string): Promise<{
        message: string;
    }>;
}
