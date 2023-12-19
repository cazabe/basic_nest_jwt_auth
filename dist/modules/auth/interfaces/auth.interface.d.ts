import { ROLES } from '../../../constants';
import { UsersEntity } from '../../users/entities/users.entity';
export interface PayloadToken {
    sub: string;
    role: ROLES;
}
export interface AuthBody {
    username: string;
    password: string;
}
export interface AuthResponse {
    access_token: string;
    user: UsersEntity;
}
export interface AuthTokenResult {
    role: string;
    sub: string;
    iat: number;
    exp: number;
}
export interface IUseToken {
    role: string;
    sub: string;
    isExpired: boolean;
}