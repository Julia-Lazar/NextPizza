import { prisma } from "@/lib/prisma";
import { ingredientSchema } from "@/schemas/ingredient.schema";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return new Response(JSON.stringify(ingredients), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || "Failed to fetch ingredients" }), { status: 500 });
  }
}

// --- POST ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Walidacja body przez Zod
    const validation = ingredientSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify({ error: validation.error.issues }), { status: 400 });
    }
    const ingredient = await prisma.ingredient.create({
      data: { name: validation.data.name },
    });
    return new Response(JSON.stringify(ingredient), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to add ingredient" }), { status: 500 });
  }
}