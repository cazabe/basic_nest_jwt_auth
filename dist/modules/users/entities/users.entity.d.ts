import { BaseEntity } from '../../../config';
import { IUser } from '../../../interfaces';
import { ROLES } from '../../../constants';
import { NewsEntity } from '../../news/entities/news.entity';
import { BlogsEntity } from '../../blogs/entities/blogs.entity';
export declare class UsersEntity extends BaseEntity implements IUser {
    names: string;
    email: string;
    username: string;
    password: string;
    role: ROLES;
    news: NewsEntity[];
    blogs: BlogsEntity[];
}
