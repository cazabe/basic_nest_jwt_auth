"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const morgan_1 = __importDefault(require("morgan"));
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const util_1 = require("./util");
const constants_1 = require("./constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, morgan_1.default)('dev'));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const reflector = app.get(core_1.Reflector);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('v1');
    app.enableCors(constants_1.CORS);
    (0, util_1.setupSwagger)(app);
    await app.listen(configService.get('PORT'));
    console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map