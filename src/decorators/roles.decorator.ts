import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants';
import { ROLES } from '../constants';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
