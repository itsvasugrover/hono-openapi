import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import type { ZodSchema } from './types';

function oneOf<T extends ZodSchema>(schemas: T[]): unknown[] {
  const registry = new OpenAPIRegistry();

  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema);
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const components = generator.generateComponents();
  const schemaMap = components.components?.schemas;

  return schemaMap ? Object.values(schemaMap) : [];
}

export default oneOf;
