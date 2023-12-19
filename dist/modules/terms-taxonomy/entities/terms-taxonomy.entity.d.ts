import { BaseEntity } from '../../../config';
import { TAXONOMY } from '../../../constants';
import { NewsEntity } from '../../news/entities/news.entity';
import { BlogsEntity } from '../../blogs/entities/blogs.entity';
import { ITermsTaxonomy } from '../interfaces';
import { TermsEntity } from './terms.entity';
export declare class TermTaxonomyEntity extends BaseEntity implements ITermsTaxonomy {
    taxonomy: TAXONOMY;
    description?: string;
    terms: TermsEntity;
    news?: NewsEntity[];
    blogs?: BlogsEntity[];
}
