import { BaseEntity } from '../../../config';
import { ITerms } from '../interfaces';
import { TermTaxonomyEntity } from './terms-taxonomy.entity';
export declare class TermsEntity extends BaseEntity implements ITerms {
    name: string;
    slug: string;
    termTaxonomy: TermTaxonomyEntity[];
}
