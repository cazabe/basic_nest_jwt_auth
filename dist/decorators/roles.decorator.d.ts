import { ROLES } from '../constants';
export declare const Roles: (...roles: Array<keyof typeof ROLES>) => import("@nestjs/common").CustomDecorator<string>;
