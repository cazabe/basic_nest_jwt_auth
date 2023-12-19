import { DefaultResponse } from '../../../common/schemas';
import { SettingsService } from '../services';
import { SettingsEntity } from '../entities';
import { SettingsDto, SettingsUpdateDto } from '../dtos';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(body: SettingsDto): Promise<DefaultResponse>;
    getSettings(): Promise<SettingsEntity[]>;
    updatePost(body: SettingsUpdateDto, id: string): Promise<DefaultResponse<any>>;
}
