import { z } from "zod";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const ingredientSchema = z.object({
  name: z.string().min(1).openapi({
    description: "Ingredient name",
    example: "Mozzarella",
  }),
});

export const ingredientIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/).openapi({
    description: "Ingredient ID parameter in the URL",
    example: 5,
  }),
});

const registry = new OpenAPIRegistry();

const IngredientRequestSchema = registry.register(
  "IngredientRequest",
  ingredientSchema
);
const IngredientParamsSchema = registry.register(
  "IngredientParams",
  ingredientIdParamSchema
);
const IngredientResponseSchema = registry.register(
  "IngredientResponse",
  ingredientSchema
);

// GET /ingredients
registry.registerPath({
  method: "get",
  path: "/api/ingredients",
  summary: "GET /ingredients",
  description: "Get all ingredients",
  responses: {
    200: {
      description: "List of ingredients",
      content: {
        "application/json": {
          schema: z.array(IngredientResponseSchema),
        },
      },
    },
  },
});

// POST /ingredients
registry.registerPath({
  method: "post",
  path: "/api/ingredients",
  summary: "POST /ingredients",
  description: "Create new ingredient",
  request: {
    body: {
      content: {
        "application/json": {
          schema: IngredientRequestSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Ingredient created",
      content: {
        "application/json": {
          schema: IngredientResponseSchema,
        },
      },
    },
    400: {
      description: "Validation errors",
    },
  },
});

// GET /ingredients/{id}
registry.registerPath({
  method: "get",
  path: "/api/ingredients/{id}",
  summary: "GET /ingredients/{id}",
  description: "Get ingredient by ID",
  request: {
    params: IngredientParamsSchema,
  },
  responses: {
    200: {
      description: "Ingredient found",
      content: {
        "application/json": {
          schema: IngredientResponseSchema,
        },
      },
    },
    404: {
      description: "Ingredient not found",
    },
  },
});

// PUT /ingredients/{id}
registry.registerPath({
  method: "put",
  path: "/api/ingredients/{id}",
  summary: "PUT /ingredients/{id}",
  description: "Update ingredient",
  request: {
    params: IngredientParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: IngredientRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Ingredient updated",
      content: {
        "application/json": {
          schema: IngredientResponseSchema,
        },
      },
    },
    400: {
      description: "Validation errors",
    },
    404: {
      description: "Ingredient not found",
    },
  },
});

// DELETE /ingredients/{id}
registry.registerPath({
  method: "delete",
  path: "/api/ingredients/{id}",
  summary: "DELETE /ingredients/{id}",
  description: "Delete ingredient by ID",
  request: {
    params: IngredientParamsSchema,
  },
  responses: {
    204: {
      description: "Ingredient deleted",
    },
    404: {
      description: "Ingredient not found",
    },
  },
});

export {
  registry,
  IngredientRequestSchema,
  IngredientParamsSchema,
  IngredientResponseSchema,
};