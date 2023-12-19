import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

export const ApiInternalServerResponse = (message = 'Internal Server') => {
  return applyDecorators(
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      schema: {
        example: `{
          "statusCode": 500,
          "message": "${message}",
          "error": "Internal Server Error"
        }`,
      },
    }),
  );
};
