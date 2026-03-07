import { z } from '@hono/zod-openapi';

export const paginationQuerySchema = z.object({
  limit: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val > 0 && val <= 1000, {
      message: 'Limit must be between 1 and 100',
    })
    .optional()
    .default(100)
    .openapi({
      param: {
        name: 'limit',
        in: 'query',
      },
      type: 'integer',
      description: 'Number of items per page (max 1000)',
      example: 100,
    }),
  offset: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val >= 0, {
      message: 'Offset must be greater than or equal to 0',
    })
    .optional()
    .default(0)
    .openapi({
      param: {
        name: 'offset',
        in: 'query',
      },
      type: 'integer',
      description: 'Number of items to skip',
      example: 0,
    }),
});
