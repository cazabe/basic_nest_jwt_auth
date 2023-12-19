import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './entities/news.entity';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';
import { BackofficeController } from './controllers/backoffice.controller';
import { SlugProvider } from '../../providers';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [NewsService, SlugProvider],
  controllers: [NewsController, BackofficeController],
})
export class NewsModule {}
