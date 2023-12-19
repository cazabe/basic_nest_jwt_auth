import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from '../../../modules/users/entities/users.entity';
import { TermTaxonomyEntity } from '../../terms-taxonomy/entities';
import { BaseEntity } from '../../../config';
import { STATUS } from '../../../constants';
import { IBlogs } from '../interfaces/blogs.interface';

@Entity({ name: 'blogs' })
export class BlogsEntity extends BaseEntity implements IBlogs {
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

  @ManyToOne(() => UsersEntity, (users) => users.blogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: UsersEntity;

  @ManyToMany(() => TermTaxonomyEntity, (termTaxonomy) => termTaxonomy.blogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'term_blogs',
    joinColumn: {
      name: 'blogs_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'term_taxonomy_id',
      referencedColumnName: 'id',
    },
  })
  termTaxonomy?: TermTaxonomyEntity[];
}
