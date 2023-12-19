"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../modules/users/dtos");
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backoffice Corpaya API')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [dtos_1.UsersResponseDto],
    });
    swagger_1.SwaggerModule.setup('docs', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map