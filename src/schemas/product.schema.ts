import { z } from "zod";
import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const productSizeSchema = z.object({
  sizeName: z.string().min(1).openapi({
    description: "The product size name",
    example: "medium",
  }),
  price: z.number().nonnegative().openapi({ description: "The product size price in zloty", example: 10 }),
});

export const productSchema = z.object({
  name: z.string().min(1).openapi({
    description: "product name",
    example: "Margherita",
  }),
  imageUrl: z.string().max(191).refine(
  (val) =>
    /^https?:\/\//.test(val) || /^\/?[\w\-./]+$/.test(val),
    { message: "Invalid image URL" }
  ).openapi({
    description: "The product image URL",
    example: "https://example.com/images/margherita.jpg",
}),
  category: z.string().min(1).openapi({
    description: "The product category",
    example: "Pizza",
  }),
  price: z.number().nonnegative().optional().openapi({
    description: "The product price in zloty",
    example: 20,
  }),
  description: z.string().optional().openapi({
    description: "The product description",
    example: "A classic Italian pizza with tomatoes, mozzarella cheese, and fresh basil.",
  }),
  ingredients: z.array(z.string()).optional().openapi({
    description: "The product ingredients",
    example: ["tomatoes", "mozzarella cheese", "fresh basil"],
  }),
  sizes: z.array(productSizeSchema).optional().openapi({
    description: "The product sizes",
    example: [
      { sizeName: "small", price: 25 },
      { sizeName: "medium", price: 45 },
      { sizeName: "large", price: 65 },
    ],
  }),
});

export const productUpdateSchema = productSchema.partial().extend({
  id: z.number().optional().openapi({
    description: "The product ID",
    example: 11,
  }),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/).openapi({
    description: "The product ID parameter in the URL",
    example: 20,
  }),
});

export const getQuerySchema = z.object({
  name: z.string().optional().openapi({
    description: "The product name",
    example: "Margherita",
  }),
  category: z.string().optional().openapi({
    description: "The product category",
    example: "Sauces",
  }),
  page: z.string().regex(/^\d+$/).optional().openapi({
    description: "The page number for pagination",
    example: 20,
  }),
  pageSize: z.string().regex(/^\d+$/).optional().openapi({
    description: "The number of items per page for pagination",
    example: 10,
  }),
});


const registry = new OpenAPIRegistry();

const UpdateProductRequestSchema = registry.register(
  "UpdateProductRequest",
  productUpdateSchema
);
const UpdateProductParamsSchema = registry.register(
  "UpdateProductParams",
  idParamSchema
);
const UpdateProductQueryParamsSchema = registry.register(
  "UpdateProductQueryParams",
  getQuerySchema
);
const UpdateProductResponseSchema = registry.register(
  "UpdateProductResponse",
  productSchema
);

// GET /products/{id}
registry.registerPath({
  method: "get",
  path: "/api/products/{id}",
  summary: "GET /products/{id}",
  description: "Get product by ID",
  request: {
    params: UpdateProductParamsSchema,
  },
  responses: {
    200: {
      description: "Product found",
      content: {
        "application/json": {
          schema: UpdateProductResponseSchema,
        },
      },
    },
    404: {
      description: "Product not found",
    },
  },
});

// GET /products/{id}
registry.registerPath({
  method: "get",
  path: "/api/products",
  summary: "GET /products",
  description: "Get all products with optional filters",
  request: {
    params: UpdateProductParamsSchema,
  },
  responses: {
    200: {
      description: "Product found",
      content: {
        "application/json": {
          schema: UpdateProductResponseSchema,
        },
      },
    },
    404: {
      description: "Product not found",
    },
  },
});

// POST /products
registry.registerPath({
  method: "post",
  path: "/api/products",
  summary: "POST /products",
  description: "Create new product",
  request: {
    body: {
      content: {
        "application/json": {
          schema: UpdateProductRequestSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Product created",
      content: {
        "application/json": {
          schema: UpdateProductResponseSchema,
        },
      },
    },
    400: {
      description: "Validation errors",
    },
  },
});

// PUT /products/{id}
registry.registerPath({
  method: "put",
  path: "/api/products/{id}",
  summary: "PUT /products/{id}",
  description: "Update product",
  request: {
    params: UpdateProductParamsSchema,
    query: UpdateProductQueryParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateProductRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Product updated",
      content: {
        "application/json": {
          schema: UpdateProductResponseSchema,
        },
      },
    },
    400: {
      description: "Validation errors",
    },
  },
});

// DELETE /products/{id}
registry.registerPath({
  method: "delete",
  path: "/api/products/{id}",
  summary: "DELETE /products/{id}",
  description: "Delete product by ID",
  request: {
    params: UpdateProductParamsSchema,
  },
  responses: {
    204: {
      description: "Product deleted",
    },
    404: {
      description: "Product not found",
    },
  },
});

export {
  registry,
  UpdateProductRequestSchema,
  UpdateProductParamsSchema,
  UpdateProductQueryParamsSchema,
  UpdateProductResponseSchema,
};