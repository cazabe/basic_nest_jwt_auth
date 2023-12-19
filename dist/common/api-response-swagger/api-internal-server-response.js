"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiInternalServerResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiInternalServerResponse = (message = 'Internal Server') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiInternalServerErrorResponse)({
        description: 'Internal Server Error',
        schema: {
            example: `{
          "statusCode": 500,
          "message": "${message}",
          "error": "Internal Server Error"
        }`,
        },
    }));
};
exports.ApiInternalServerResponse = ApiInternalServerResponse;
//# sourceMappingURL=api-internal-server-response.js.map