import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { TermTaxonomyEntity, TermsEntity } from '../entities';
import { TermTaxonomyFilterDto, TermTaxonomyUpdateDto, TermTaxonomyDto } from '../dtos';
import { TermsService } from './terms.service';
export declare class TermsTaxonomyService {
    private readonly termTaxonomyRepository;
    private readonly termsRepository;
    private readonly termsService;
    constructor(termTaxonomyRepository: Repository<TermTaxonomyEntity>, termsRepository: Repository<TermsEntity>, termsService: TermsService);
    createTermTaxonomy(body: TermTaxonomyDto): Promise<DefaultResponse>;
    getTermTaxonomy(filter: TermTaxonomyFilterDto): Promise<TermTaxonomyEntity[]>;
    getCategory(): Promise<TermTaxonomyEntity[]>;
    findById(id: string): Promise<TermTaxonomyEntity>;
    updateTermTaxonomy(body: TermTaxonomyUpdateDto, id: string): Promise<DefaultResponse>;
    deleteTermTaxonomy(id: string): Promise<DefaultResponse>;
}
