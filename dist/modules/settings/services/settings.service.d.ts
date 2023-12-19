import { Repository } from 'typeorm';
import { DefaultResponse } from '../../../common/schemas';
import { SettingsDto, SettingsUpdateDto } from '../dtos';
import { SettingsEntity } from '../entities';
export declare class SettingsService {
    private readonly settingsRepository;
    constructor(settingsRepository: Repository<SettingsEntity>);
    createSettings(body: SettingsDto): Promise<DefaultResponse>;
    getSettings(): Promise<SettingsEntity[]>;
    updateSettings(body: SettingsUpdateDto, id: string): Promise<DefaultResponse>;
}
