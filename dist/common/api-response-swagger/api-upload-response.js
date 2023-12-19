"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUploadResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../schemas");
const ApiUploadResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(schemas_1.UploadResponse), (0, swagger_1.ApiOkResponse)({
        description: 'Successful Response',
        schema: {
            allOf: [{ $ref: (0, swagger_1.getSchemaPath)(schemas_1.UploadResponse) }],
        },
    }));
};
exports.ApiUploadResponse = ApiUploadResponse;
//# sourceMappingURL=api-upload-response.js.map