import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from '../../../common/pagination';
import { DefaultResponse } from '../../../common/schemas';
import { STATUS, messages } from '../../../constants';
import { TermsTaxonomyService } from '../../terms-taxonomy/services';
import { NewsEntity } from '../entities/news.entity';
import {
  NewsDto,
  NewsFilterDto,
  NewsFilterPublicDto,
  NewsUpdateDto,
} from '../dtos';
import { UsersService } from '../../users/services/users.service';
import { getNowDate } from '../../../util';
import { SlugProvider } from '../../../providers';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    private readonly usersServices: UsersService,
    private readonly termsTaxonomyServices: TermsTaxonomyService,
    private readonly slugProvider: SlugProvider,
  ) {}

  public async createNews(
    body: NewsDto,
    userId: string,
  ): Promise<DefaultResponse<NewsEntity>> {
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
      await this.newsRepository.save({
        ...body,
        users: userFound,
        termTaxonomy: listCategory,
        slug,
      });

      return {
        message: messages['news.success.create'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['news.error.create']);
    }
  }

  public async getNewsPublic(
    pageOptionsDto: PageOptionsDto,
    newsFilter: NewsFilterPublicDto,
  ): Promise<PageDto<NewsDto>> {
    const { search_pattern, category_id } = newsFilter;
    try {
      const queryBuilder = this.newsRepository.createQueryBuilder('news');
      queryBuilder
        .innerJoinAndSelect('news.users', 'user')
        .leftJoinAndSelect('news.termTaxonomy', 'category')
        .leftJoinAndSelect('category.terms', 'terms')
        .orderBy('news.createdAt', pageOptionsDto.order)
        .andWhere('news.status = :status', {
          status: STATUS.ACTIVE,
        })
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      if (search_pattern) {
        queryBuilder.andWhere('news.title LIKE :name', {
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
      throw new InternalServerErrorException(messages['news.error.get']);
    }
  }

  public async getNews(
    pageOptionsDto: PageOptionsDto,
    newsFilter: NewsFilterDto,
  ): Promise<PageDto<NewsDto>> {
    const {
      search_pattern,
      start_date,
      end_date,
      status,
      user_id,
      category_id,
    } = newsFilter;
    try {
      const queryBuilder = this.newsRepository.createQueryBuilder('news');
      queryBuilder
        .innerJoinAndSelect('news.users', 'user')
        .leftJoinAndSelect('news.termTaxonomy', 'category')
        .leftJoinAndSelect('category.terms', 'terms')
        .orderBy('news.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      if (search_pattern) {
        queryBuilder.andWhere('news.title LIKE :name', {
          name: '%' + search_pattern + '%',
        });
      }

      if (start_date) {
        const endDate = end_date ? end_date : getNowDate();
        queryBuilder.andWhere(
          `news.createdAt BETWEEN '${start_date} 00:00:00' AND '${endDate} 23:59:59'`,
        );
      }

      if (status) {
        queryBuilder.andWhere('news.status = :status', {
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
      throw new InternalServerErrorException(messages['news.error.get']);
    }
  }

  public async getNewsById(slug: string, onlyActive = false): Promise<NewsDto> {
    const queryBuilder = this.newsRepository.createQueryBuilder('news');

    queryBuilder
      .innerJoinAndSelect('news.users', 'user')
      .leftJoinAndSelect('news.termTaxonomy', 'category')
      .leftJoinAndSelect('category.terms', 'terms')
      .where({ slug });

    if (onlyActive) {
      queryBuilder.andWhere('news.status = :status', {
        status: STATUS.ACTIVE,
      });
    }
    const foundNews = await queryBuilder.getOne();
    if (!foundNews) throw new NotFoundException(messages['news.error.noFound']);
    return foundNews;
  }

  public async updateNews(
    body: NewsUpdateDto,
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

      await this.newsRepository.save({
        ...body,
        id,
        termTaxonomy: listCategory,
      });
      return { message: messages['news.success.update'] };
    } catch (error) {
      throw new InternalServerErrorException(messages['news.error.update']);
    }
  }

  public async deleteNews(id: string): Promise<DefaultResponse> {
    try {
      await this.newsRepository.delete(id);
      return {
        message: messages['news.success.delete'],
      };
    } catch (error) {
      throw new InternalServerErrorException(messages['news.error.delete']);
    }
  }

  async findBySlug(slug: string): Promise<NewsEntity | null> {
    return await this.newsRepository.findOne({
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

  private async findSlugs(slug: string): Promise<NewsEntity[]> {
    return await this.newsRepository
      .createQueryBuilder('blog')
      .where('slug like :slug', { slug: `${slug}%` })
      .getMany();
  }
}
