import { BaseEntity } from '../../../config';
import { ISettings } from '../interfaces';
export declare class SettingsEntity extends BaseEntity implements ISettings {
    name: string;
    value: string;
}
