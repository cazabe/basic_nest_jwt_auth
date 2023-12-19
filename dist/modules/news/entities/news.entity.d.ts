import { BaseEntity } from '../../../config';
import { STATUS } from '../../../constants';
import { UsersEntity } from '../../users/entities/users.entity';
import { TermTaxonomyEntity } from '../../terms-taxonomy/entities';
import { INews } from '../interfaces/news.interface';
export declare class NewsEntity extends BaseEntity implements INews {
    title: string;
    slug: string;
    image_url: string;
    content: string;
    reference_link: string;
    status: STATUS;
    users: UsersEntity;
    termTaxonomy?: TermTaxonomyEntity[];
}
