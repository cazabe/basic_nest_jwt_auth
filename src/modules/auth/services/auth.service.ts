import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../../../modules/users/entities/users.entity';
import { UsersService } from '../../../modules/users/services/users.service';
import { AuthResponse, PayloadToken } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UsersEntity | null> {
    const userByUsername = await this.usersService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmial = await this.usersService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmial) {
      const match = await bcrypt.compare(password, userByEmial.password);
      if (match) return userByEmial;
    }

    return null;
  }

  public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
    const getUser = await this.usersService.findUserById(user.id);

    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    const tokensAndUser = {
      access_token: await this.jwtService.signAsync(payload),
      user: getUser,
    };

    return tokensAndUser;
  }
}
