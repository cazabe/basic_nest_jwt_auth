import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsTaxonomyService } from './services/terms-taxonomy.service';
import { TermsTaxonomyController } from './controllers/terms-taxonomy.controller';
import { TermsEntity, TermTaxonomyEntity } from './entities';
import { TermsService } from './services';
import { CategoryController } from './controllers/category.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TermsEntity, TermTaxonomyEntity])],
  providers: [TermsTaxonomyService, TermsService],
  controllers: [TermsTaxonomyController, CategoryController],
  exports: [TermsTaxonomyService, TermsService, TypeOrmModule],
})
export class TermsTaxonomyModule {}
