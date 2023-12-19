import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiDefaultResponse = (message = 'string') => {
  return applyDecorators(
    ApiOkResponse({
      description: 'Successful Response',
      schema: {
        example: `{
          "message": "${message}"
        }`,
      },
    }),
  );
};
