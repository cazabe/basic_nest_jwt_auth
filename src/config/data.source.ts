import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: configService.get('DB_PORT') || 5432,
  username: configService.get('DB_USER') || 'corpaya',
  password: configService.get('DB_PASSWORD') || 'secret1234',
  database: configService.get('DB_NAME') || 'corpayadb',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: configService.get('DB_SYNCHRONIZE'),
  migrationsRun: configService.get('DB_MIGRATIONS_RUN'),
  logging: false,
};

export const AppDS = new DataSource(DataSourceConfig);
