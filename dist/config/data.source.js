"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDS = exports.DataSourceConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
config_1.ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
});
const configService = new config_1.ConfigService();
exports.DataSourceConfig = {
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
exports.AppDS = new typeorm_1.DataSource(exports.DataSourceConfig);
//# sourceMappingURL=data.source.js.map