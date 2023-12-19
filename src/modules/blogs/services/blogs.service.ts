import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultResponse } from '../../../common/schemas';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../common/pagination';
import { STATUS, messages } from '../../../constants';
import { getNowDate } from '../../../util';
import { UsersService } from '../../users/services/users.service';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';
import { BlogsEntity } from '../entities/blogs.entity';
import {
  BlogsDto,
  BlogsFilterDto,
  BlogsFilterPublicDto,
  BlogsUpdateDto,
} from '../dtos';
import { SlugProvider } from '../../../providers';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogsEntity)
    private readonly blogsRepository: Repository<BlogsEntity>,
    private readonly usersServices: UsersService,
    private readonly termsTaxonomyServices: TermsTaxonomyService,
    private readonly slugProvider: SlugProvider,
  ) {}

  public async createPost(
    body: BlogsDto,
    userId: string,
  ): Promise<DefaultResponse> {
    const { categories, title } = body;
    const userFound = await this.usersServices.findUserById(userId);
    try {
      const slug = await this.uniqueSlug(title);
      const listCategory = [];
      await Promise.all(
        categories.map(async (id: string) => {
          const termTaxonomy = await this.termsTaxonomyServices.findById(id);
          if (!termTaxonomy) return;
          listCategory.push(termTaxonomy);
        }),
      );
      await this.blogsRepository.save({
        ...body,
        users: userFound,
        termTaxonomy: listCategory,
        slug,
      });
      return {
        message: messages['blogs.success.create'],
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(messages['blogs.error.create']);
    }
  }

  public async getPostPublic(
    pageOptionsDto: PageOptionsDto,
    blogsFilter: BlogsFilterPublicDto,
  ): Promise<PageDto<BlogsDto>> {
    const { search_pattern, category_id } = blogsFilter;
    try {
      const queryBuilder = this.blogsRepository.createQueryBuilder('blogs');
      queryBuilder
        .innerJoinAndSelect('blogs.users', 'user')
        .leftJoinAndSelect('blogs.termTaxonomy', 'category')
        .leftJoinAndSelect('category.terms', 'terms')
        .orderBy('blogs.createdAt', pageOptionsDto.order)
        .andWhere('blogs.status = :status', {
          status: STATUS.ACTIVE,
        })
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      if (search_pattern) {
        queryBuilder.andWhere('blogs.title LIKE :name', {
          name: '%' + search_pattern + '%',
        });
      }

      if (category_id) {
        queryBuilder.andWhere('category.id = :id', {
          id: category_id,
        });
      }

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.get']);
    }
  }

  public async getPost(
    pageOptionsDto: PageOptionsDto,
    blogsFilter: BlogsFilterDto,
  ): Promise<PageDto<BlogsDto>> {
    const {
      search_pattern,
      start_date,
      end_date,
      status,
      user_id,
      category_id,
    } = blogsFilter;
    try {
      const queryBuilder = this.blogsRepository.createQueryBuilder('blogs');
      queryBuilder
        .innerJoinAndSelect('blogs.users', 'user')
        .leftJoinAndSelect('blogs.termTaxonomy', 'category')
        .leftJoinAndSelect('category.terms', 'terms')
        .orderBy('blogs.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      if (search_pattern) {
        queryBuilder.andWhere('blogs.title LIKE :name', {
          name: '%' + search_pattern + '%',
        });
      }

      if (start_date) {
        const endDate = end_date ? end_date : getNowDate();
        queryBuilder.andWhere(
          `blogs.createdAt BETWEEN '${start_date} 00:00:00' AND '${endDate} 23:59:59'`,
        );
      }

      if (status) {
        queryBuilder.andWhere('blogs.status = :status', {
          status,
        });
      }

      if (user_id) {
        queryBuilder.andWhere('user.id = :id', {
          id: user_id,
        });
      }

      if (category_id) {
        queryBuilder.andWhere('category.id = :id', {
          id: category_id,
        });
      }

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.get']);
    }
  }

  public async getPostById(
    slug: string,
    onlyActive = false,
  ): Promise<BlogsDto> {
    const queryBuilder = this.blogsRepository.createQueryBuilder('blogs');

    queryBuilder
      .innerJoinAndSelect('blogs.users', 'user')
      .leftJoinAndSelect('blogs.termTaxonomy', 'category')
      .leftJoinAndSelect('category.terms', 'terms')
      .where({ slug });

    if (onlyActive) {
      queryBuilder.andWhere('blogs.status = :status', {
        status: STATUS.ACTIVE,
      });
    }
    const foundNews = await queryBuilder.getOne();

    if (!foundNews)
      throw new NotFoundException(messages['blogs.error.noFound']);
    return foundNews;
  }

  public async updatePost(
    body: BlogsUpdateDto,
    id: string,
  ): Promise<DefaultResponse> {
    const { categories } = body;
    try {
      const listCategory = [];
      await Promise.all(
        categories.map(async (id: string) => {
          const termTaxonomy = await this.termsTaxonomyServices.findById(id);
          if (!termTaxonomy) return;
          listCategory.push(termTaxonomy);
        }),
      );
      await this.blogsRepository.save({
        ...body,
        id,
        termTaxonomy: listCategory,
      });
      return { message: messages['blogs.success.update'] };
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.get']);
    }
  }

  public async deletePost(id: string): Promise<DefaultResponse> {
    try {
      await this.blogsRepository.delete(id);
      return {
        message: messages['blogs.success.delete'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['blogs.error.delete']);
    }
  }

  async findBySlug(slug: string): Promise<BlogsEntity | null> {
    return await this.blogsRepository.findOne({
      where: {
        slug,
      },
    });
  }

  async uniqueSlug(title: string): Promise<string> {
    const slug = this.slugProvider.slugify(title);
    const exists = await this.findSlugs(slug);

    if (!exists || exists.length === 0) {
      return slug;
    }

    return slug + this.slugProvider.replacement() + exists.length;
  }

  private async findSlugs(slug: string): Promise<BlogsEntity[]> {
    return await this.blogsRepository
      .createQueryBuilder('blog')
      .where('slug like :slug', { slug: `${slug}%` })
      .getMany();
  }
}
