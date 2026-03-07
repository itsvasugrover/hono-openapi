import type { Hook } from '@hono/zod-openapi';
import { codes } from '@vasugrover/http-status';
import type { Env } from 'hono';

const defaultHook: Hook<unknown, Env, string, Response | undefined> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: {
          name: result.error.name,
          issues: result.error.issues,
        },
      },
      codes.UNPROCESSABLE_ENTITY,
    );
  }
};

export default defaultHook;
