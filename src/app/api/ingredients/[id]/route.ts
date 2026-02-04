import { prisma } from "@/lib/prisma";
import { ingredientIdParamSchema, ingredientSchema } from "@/schemas/ingredient.schema";

// --- GET ---
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Walidacja id przez Zod
  const idValidation = ingredientIdParamSchema.safeParse({ id });
  if (!idValidation.success) {
    return new Response(JSON.stringify({ error: "Invalid ingredient id" }), { status: 400 });
  }

  try {
    const ingredient = await prisma.ingredient.findUnique({ where: { id: Number(id) } });
    if (!ingredient) {
      return new Response(JSON.stringify({ error: "Ingredient not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(ingredient), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch ingredient" }), { status: 500 });
  }
}

// --- DELETE ---
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Walidacja id przez Zod
  const idValidation = ingredientIdParamSchema.safeParse({ id });
  if (!idValidation.success) {
    return new Response(JSON.stringify({ error: "Invalid ingredient id" }), { status: 400 });
  }

  try {
    await prisma.productIngredient.deleteMany({ where: { ingredientId: Number(id) } });
    const deleted = await prisma.ingredient.delete({ where: { id: Number(id) } });
    return new Response(JSON.stringify(deleted), { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: "Ingredient not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Failed to delete ingredient" }), { status: 500 });
  }
}

// --- PUT ---
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // Walidacja id przez Zod
  const idValidation = ingredientIdParamSchema.safeParse({ id });
  if (!idValidation.success) {
    return new Response(JSON.stringify({ error: "Invalid ingredient id" }), { status: 400 });
  }

  try {
    const body = await request.json();
    // Walidacja body przez Zod
    const bodyValidation = ingredientSchema.safeParse(body);
    if (!bodyValidation.success) {
      return new Response(JSON.stringify({ error: bodyValidation.error.issues }), { status: 400 });
    }

    const updated = await prisma.ingredient.update({
      where: { id: Number(id) },
      data: { name: bodyValidation.data.name },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: "Ingredient not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Failed to update ingredient" }), { status: 500 });
  }
}