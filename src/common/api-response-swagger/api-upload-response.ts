import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UploadResponse } from '../schemas';

export const ApiUploadResponse = () => {
  return applyDecorators(
    ApiExtraModels(UploadResponse),
    ApiOkResponse({
      description: 'Successful Response',
      schema: {
        allOf: [{ $ref: getSchemaPath(UploadResponse) }],
      },
    }),
  );
};
