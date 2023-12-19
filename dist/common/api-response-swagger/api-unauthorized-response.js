"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUnauthorizedErrorResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiUnauthorizedErrorResponse = (message = 'No tienes permisos para esta operación') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Unauthorized',
        schema: {
            example: `{
          "statusCode": 401,
          "message": "${message}",
          "error": "Unauthorized"
        }`,
        },
    }));
};
exports.ApiUnauthorizedErrorResponse = ApiUnauthorizedErrorResponse;
//# sourceMappingURL=api-unauthorized-response.js.map