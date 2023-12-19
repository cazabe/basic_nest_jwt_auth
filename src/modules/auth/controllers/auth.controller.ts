import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from '../../../decorators';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  @ApiOperation({ summary: 'Public' })
  @PublicAccess()
  async login(@Body() { username, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );
    if (!userValidate) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
