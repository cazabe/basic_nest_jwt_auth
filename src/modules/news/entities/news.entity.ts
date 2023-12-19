import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../../config';
import { STATUS } from '../../../constants';
import { UsersEntity } from '../../users/entities/users.entity';
import { TermTaxonomyEntity } from '../../terms-taxonomy/entities';
import { INews } from '../interfaces/news.interface';

@Entity({ name: 'news' })
export class NewsEntity extends BaseEntity implements INews {
  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  image_url: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', nullable: true, length: 150 })
  reference_link: string;

  @Column({ type: 'enum', enum: STATUS })
  status: STATUS;

  @ManyToOne(() => UsersEntity, (users) => users.news, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: UsersEntity;

  @ManyToMany(() => TermTaxonomyEntity, (termTaxonomy) => termTaxonomy.news, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'term_news',
    joinColumn: {
      name: 'news_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'term_taxonomy_id',
      referencedColumnName: 'id',
    },
  })
  termTaxonomy?: TermTaxonomyEntity[];
}
