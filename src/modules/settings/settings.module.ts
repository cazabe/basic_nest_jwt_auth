import { Module } from '@nestjs/common';
import { SettingsController } from './controllers/settings.controller';
import { SettingsService } from './services/settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
