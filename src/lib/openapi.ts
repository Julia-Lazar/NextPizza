import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry as productRegistry } from "@/schemas/product.schema";
import { registry as ingredientRegistry } from "@/schemas/ingredient.schema";
import { registry as orderRegistry } from "@/schemas/order.schema";

// ...existing code...
// Generate OpenAPI document
export function generateOpenApi() {
  const generator = new OpenApiGeneratorV3([
  ...productRegistry.definitions,
  ...ingredientRegistry.definitions,
  ...orderRegistry.definitions,
]);
  const openApiDoc = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "NextPizza API",
      version: "1.0.0",
    },
    });
  return openApiDoc;
}
