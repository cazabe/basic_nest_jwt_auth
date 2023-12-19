import { decode } from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from '../modules/auth/interfaces';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decodeToken = decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decodeToken.exp);

    return {
      sub: decodeToken.sub,
      role: decodeToken.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
