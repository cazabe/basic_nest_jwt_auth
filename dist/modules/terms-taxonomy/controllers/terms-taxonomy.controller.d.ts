import { DefaultResponse } from '../../../common/schemas';
import { TermsTaxonomyService } from '../services';
import { TermTaxonomyEntity } from '../entities';
import { TermTaxonomyDto, TermTaxonomyFilterDto, TermTaxonomyUpdateDto } from '../dtos';
export declare class TermsTaxonomyController {
    private readonly termsTaxonomyService;
    constructor(termsTaxonomyService: TermsTaxonomyService);
    createTermTaxonomy(body: TermTaxonomyDto): Promise<DefaultResponse>;
    getTermTaxonomy(filter: TermTaxonomyFilterDto): Promise<TermTaxonomyEntity[]>;
    updateTermTaxonomy(body: TermTaxonomyUpdateDto, id: string): Promise<DefaultResponse<any>>;
    deleteTermTaxonomy(id: string): Promise<DefaultResponse<any>>;
}
