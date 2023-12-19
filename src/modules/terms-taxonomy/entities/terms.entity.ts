import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config';
import { ITerms } from '../interfaces';
import { TermTaxonomyEntity } from './terms-taxonomy.entity';

@Entity({ name: 'terms' })
export class TermsEntity extends BaseEntity implements ITerms {
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  slug: string;

  @OneToMany(() => TermTaxonomyEntity, (termTaxonomy) => termTaxonomy.terms)
  termTaxonomy: TermTaxonomyEntity[];
}
