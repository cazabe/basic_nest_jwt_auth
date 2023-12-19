import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { Order, TAXONOMY, messages } from '../../../constants';
import { TermTaxonomyEntity, TermsEntity } from '../entities';
import {
  TermTaxonomyFilterDto,
  TermTaxonomyUpdateDto,
  TermTaxonomyDto,
} from '../dtos';
import { TermsService } from './terms.service';

@Injectable()
export class TermsTaxonomyService {
  constructor(
    @InjectRepository(TermTaxonomyEntity)
    private readonly termTaxonomyRepository: Repository<TermTaxonomyEntity>,
    @InjectRepository(TermsEntity)
    private readonly termsRepository: Repository<TermsEntity>,
    private readonly termsService: TermsService,
  ) {}

  public async createTermTaxonomy(
    body: TermTaxonomyDto,
  ): Promise<DefaultResponse> {
    const { name, slug, description, taxonomy } = body;
    try {
      const { data } = await this.termsService.createTerm({ name, slug });
      await this.termTaxonomyRepository.save({
        description,
        taxonomy,
        terms: data,
      });
      return {
        message: messages['terms.success.create'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['terms.error.create']);
    }
  }

  public async getTermTaxonomy(
    filter: TermTaxonomyFilterDto,
  ): Promise<TermTaxonomyEntity[]> {
    const { taxonomy, search_pattern } = filter;
    const queryBuilder = this.termTaxonomyRepository
      .createQueryBuilder('term_taxonomy')
      .innerJoinAndSelect('term_taxonomy.terms', 'terms')
      .orderBy('term_taxonomy.createdAt', Order.DESC);

    if (taxonomy) {
      queryBuilder.where('term_taxonomy.taxonomy = :taxonomy', { taxonomy });
    }

    if (search_pattern) {
      queryBuilder.andWhere('terms.name LIKE :name', {
        name: '%' + search_pattern + '%',
      });
    }

    const termTaxonomyAll = await queryBuilder.getMany();

    return termTaxonomyAll;
  }

  public async getCategory(): Promise<TermTaxonomyEntity[]> {
    const queryBuilder = this.termTaxonomyRepository
      .createQueryBuilder('term_taxonomy')
      .innerJoinAndSelect('term_taxonomy.terms', 'terms')
      .where('term_taxonomy.taxonomy = :taxonomy', {
        taxonomy: TAXONOMY.CATEGOTY,
      })
      .orderBy('term_taxonomy.createdAt', Order.DESC);
    const termTaxonomyAll = await queryBuilder.getMany();
    return termTaxonomyAll;
  }

  public async findById(id: string): Promise<TermTaxonomyEntity> {
    const result = await this.termTaxonomyRepository
      .createQueryBuilder('term_taxonomy')
      .innerJoinAndSelect('term_taxonomy.terms', 'terms')
      .where('term_taxonomy.id = :id', { id })
      .getOne();
    return result;
  }

  public async updateTermTaxonomy(
    body: TermTaxonomyUpdateDto,
    id: string,
  ): Promise<DefaultResponse> {
    const termTaxonomy = await this.findById(id);
    if (!termTaxonomy)
      throw new NotFoundException(messages['terms.error.noFound']);
    try {
      const { description, name, slug } = body;
      await this.termTaxonomyRepository.update(id, { description });
      await this.termsRepository.update(termTaxonomy.terms.id, { name, slug });
      return { message: messages['terms.success.update'] };
    } catch (error) {
      throw new InternalServerErrorException(messages['terms.error.update']);
    }
  }

  public async deleteTermTaxonomy(id: string): Promise<DefaultResponse> {
    const termTaxonomy = await this.findById(id);
    if (!termTaxonomy)
      throw new NotFoundException(messages['terms.error.noFound']);
    try {
      await this.termTaxonomyRepository.delete(id);
      await this.termsRepository.delete(termTaxonomy.terms.id);
      return {
        message: messages['terms.success.delete'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['terms.error.delete']);
    }
  }
}
