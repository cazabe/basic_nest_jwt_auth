import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from '../../../constants';
import { DefaultResponse } from '../../../common/schemas';
import { SettingsDto, SettingsUpdateDto } from '../dtos';
import { SettingsEntity } from '../entities';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
  ) {}

  public async createSettings(body: SettingsDto): Promise<DefaultResponse> {
    try {
      await this.settingsRepository.save(body);
      return {
        message: messages['blogs.success.create'],
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(messages['users.conflict.unique']);
      }
      throw new InternalServerErrorException(messages['blogs.error.create']);
    }
  }

  public async getSettings(): Promise<SettingsEntity[]> {
    try {
      return this.settingsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.get']);
    }
  }

  public async updateSettings(
    body: SettingsUpdateDto,
    id: string,
  ): Promise<DefaultResponse> {
    try {
      await this.settingsRepository.save({
        ...body,
        id,
      });
      return { message: messages['blogs.success.update'] };
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.get']);
    }
  }
}
