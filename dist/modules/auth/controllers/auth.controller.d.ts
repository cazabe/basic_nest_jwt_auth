import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ username, password }: AuthDTO): Promise<import("../interfaces").AuthResponse>;
}
