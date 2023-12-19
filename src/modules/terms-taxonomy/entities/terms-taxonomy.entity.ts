import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../config';
import { TAXONOMY } from '../../../constants';
import { NewsEntity } from '../../news/entities/news.entity';
import { BlogsEntity } from '../../blogs/entities/blogs.entity';
import { ITermsTaxonomy } from '../interfaces';
import { TermsEntity } from './terms.entity';

@Entity({ name: 'term_taxonomy' })
export class TermTaxonomyEntity extends BaseEntity implements ITermsTaxonomy {
  @Column({ type: 'enum', enum: TAXONOMY })
  taxonomy: TAXONOMY;

  @Column({ type: 'varchar', length: 250 })
  description?: string;

  @ManyToOne(() => TermsEntity, (terms) => terms.termTaxonomy, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'term_id' })
  terms: TermsEntity;

  @ManyToMany(() => NewsEntity, (news) => news.termTaxonomy, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  news?: NewsEntity[];

  @ManyToMany(() => BlogsEntity, (blogs) => blogs.termTaxonomy, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  blogs?: BlogsEntity[];
}
