import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsEntity } from './entities/blogs.entity';
import { BlogsController } from './controllers/blogs.controller';
import { BlogsService } from './services/blogs.service';
import { BackofficeController } from './controllers/backoffice.controller';
import { SlugProvider } from '../../providers';

@Module({
  imports: [TypeOrmModule.forFeature([BlogsEntity])],
  providers: [BlogsService, SlugProvider],
  controllers: [BlogsController, BackofficeController],
})
export class BlogsModule {}
