import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { TermsEntity } from '../entities/terms.entity';
import { TermDto } from '../dtos';
export declare class TermsService {
    private readonly termsRepository;
    constructor(termsRepository: Repository<TermsEntity>);
    createTerm(body: TermDto): Promise<DefaultResponse<TermsEntity>>;
}
