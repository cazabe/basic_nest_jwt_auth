import { TermsTaxonomyService } from '../services';
import { TermTaxonomyEntity } from '../entities';
export declare class CategoryController {
    private readonly termsTaxonomyService;
    constructor(termsTaxonomyService: TermsTaxonomyService);
    getTermTaxonomy(): Promise<TermTaxonomyEntity[]>;
}
