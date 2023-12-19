import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES,
  ROLES_ALL,
  ROLES_KEY,
} from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const all = this.reflector.get<string>(ROLES_ALL, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser } = req;

    if (all) {
      return true;
    }

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new ForbiddenException('No tienes permisos para esta operacion');
      }
    }

    if (roleUser === ROLES.ADMIN) {
      return true;
    }

    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) {
      throw new ForbiddenException('No tienes permisos para esta operacion');
    }
    return true;
  }
}
