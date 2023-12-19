import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../config';
import { IUser } from '../../../interfaces';
import { ROLES } from '../../../constants';
import { NewsEntity } from '../../news/entities/news.entity';
import { BlogsEntity } from '../../blogs/entities/blogs.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: 150 })
  names: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.BASIC })
  role: ROLES;

  @OneToMany(() => NewsEntity, (news) => news.users)
  news: NewsEntity[];

  @OneToMany(() => BlogsEntity, (blogs) => blogs.users)
  blogs: BlogsEntity[];
}
