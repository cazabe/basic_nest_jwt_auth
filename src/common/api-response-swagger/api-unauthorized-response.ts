import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiUnauthorizedErrorResponse = (
  message = 'No tienes permisos para esta operación',
) => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        example: `{
          "statusCode": 401,
          "message": "${message}",
          "error": "Unauthorized"
        }`,
      },
    }),
  );
};
