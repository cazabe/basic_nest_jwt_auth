"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = process.env.PORT || configService.get('PORT');
    await app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map