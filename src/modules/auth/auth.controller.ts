import { Controller, Body, Post, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async auth(@Body() user: AuthDto): Promise<{}> {
        return this.authService.singIn(user.username, user.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('account-verification/:code')
    async verification(@Param('code') code: string): Promise<{ message: string }> {
        return this.authService.veriFyAccount(code);
    }
}
