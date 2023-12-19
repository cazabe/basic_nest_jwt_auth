"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDefaultResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiDefaultResponse = (message = 'string') => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        description: 'Successful Response',
        schema: {
            example: `{
          "message": "${message}"
        }`,
        },
    }));
};
exports.ApiDefaultResponse = ApiDefaultResponse;
//# sourceMappingURL=api-default-response.js.map