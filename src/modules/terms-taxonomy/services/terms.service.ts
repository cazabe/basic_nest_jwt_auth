import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { messages } from '../../../constants';
import { TermsEntity } from '../entities/terms.entity';
import { TermDto } from '../dtos';

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(TermsEntity)
    private readonly termsRepository: Repository<TermsEntity>,
  ) {}

  public async createTerm(
    body: TermDto,
  ): Promise<DefaultResponse<TermsEntity>> {
    try {
      const result = await this.termsRepository.save(body);
      return {
        message: messages['terms.success.create'],
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['terms.error.create']);
    }
  }
}
