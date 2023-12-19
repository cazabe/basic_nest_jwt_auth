"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const api_response_swagger_1 = require("../common/api-response-swagger");
const util_1 = require("../util");
function ApiFile(fieldName, directory) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(fieldName, {
        storage: (0, multer_1.diskStorage)({
            destination: `./upload/${directory}`,
            filename: util_1.editFileName,
        }),
        fileFilter: util_1.imageFileFilter,
    })), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
        required: true,
        schema: {
            type: 'object',
            properties: {
                [fieldName]: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }), (0, api_response_swagger_1.ApiUploadResponse)());
}
exports.ApiFile = ApiFile;
//# sourceMappingURL=api-file.decorator.js.map