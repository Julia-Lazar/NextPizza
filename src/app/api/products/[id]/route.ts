import { prisma } from "@/lib/prisma";
import {
  productUpdateSchema,
  idParamSchema,
} from "@/schemas/product.schema";

// Helper to get ingredient IDs
async function getIngredientIds(ingredients: string[]) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) return [];
  const records = await prisma.ingredient.findMany({
    where: { name: { in: ingredients } },
    select: { id: true },
  });
  return records.map((r) => r.id);
}

// --- GET ---
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    // Walidacja id przez Zod
    const idCheck = idParamSchema.safeParse({ id: String(id) });
    if (!idCheck.success) {
      return Response.json({ error: idCheck.error.issues }, { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        productIngredient: { include: { ingredient: true } },
        productSize: true,
      },
    });
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    return Response.json(product);
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to fetch product" }, { status: 500 });
  }
}

// --- PUT ---
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const idValidation = idParamSchema.safeParse({ id: String(id) });
    if (!idValidation.success) {
      return Response.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues }, { status: 400 });
    }

    const { name, imageUrl, category, description, ingredients, sizes } =
      parsed.data;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (category) updateData.category = category;
    if (description) updateData.description = description;

    if (Array.isArray(ingredients)) {
      const ingredientIds = await getIngredientIds(ingredients);
      updateData.productIngredient = {
        deleteMany: {},
        create: ingredientIds.map((ingredientId) => ({ ingredientId })),
      };
    }

    if (Array.isArray(sizes)) {
      updateData.productSize = {
        deleteMany: {},
        create: sizes.map((size) => ({
          sizeName: size.sizeName,
          price: size.price,
        })),
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        productIngredient: { include: { ingredient: true } },
        productSize: true,
      },
    });

    return Response.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// --- DELETE ---
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const idCheck = idParamSchema.safeParse({ id: String(id) });
    if (!idCheck.success) {
      return Response.json({ error: `Invalid product ID: ${id}` }, { status: 400 });
    }

    const productId = Number(id);

    await prisma.productIngredient.deleteMany({ where: { productId } });
    await prisma.productSize.deleteMany({ where: { productId } });
    await prisma.product.delete({ where: { id: productId } });

    return Response.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { error: error?.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}