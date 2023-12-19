"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const config_2 = require("./config");
const users_module_1 = require("./modules/users/users.module");
const blogs_module_1 = require("./modules/blogs/blogs.module");
const news_module_1 = require("./modules/news/news.module");
const auth_module_1 = require("./modules/auth/auth.module");
const files_module_1 = require("./modules/files/files.module");
const util_1 = require("./util");
const terms_taxonomy_module_1 = require("./modules/terms-taxonomy/terms-taxonomy.module");
const settings_module_1 = require("./modules/settings/settings.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({ ...config_2.DataSourceConfig }),
            users_module_1.UsersModule,
            blogs_module_1.BlogsModule,
            news_module_1.NewsModule,
            auth_module_1.AuthModule,
            files_module_1.FilesModule,
            terms_taxonomy_module_1.TermsTaxonomyModule,
            settings_module_1.SettingsModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: util_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map