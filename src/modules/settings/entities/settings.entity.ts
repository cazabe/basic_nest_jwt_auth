import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../config';
import { ISettings } from '../interfaces';
import { SETTINGS } from 'src/constants';

@Entity({ name: 'settings' })
export class SettingsEntity extends BaseEntity implements ISettings {
  @Column({ type: 'enum', enum: SETTINGS, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  value: string;
}
