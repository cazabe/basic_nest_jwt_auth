import { UsersEntity } from '../../../modules/users/entities/users.entity';
import { TermTaxonomyEntity } from '../../terms-taxonomy/entities';
import { BaseEntity } from '../../../config';
import { STATUS } from '../../../constants';
import { IBlogs } from '../interfaces/blogs.interface';
export declare class BlogsEntity extends BaseEntity implements IBlogs {
    title: string;
    slug: string;
    image_url: string;
    content: string;
    reference_link: string;
    status: STATUS;
    users: UsersEntity;
    termTaxonomy?: TermTaxonomyEntity[];
}
