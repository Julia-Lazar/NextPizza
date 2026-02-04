import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";

// Helper to get ingredient IDs
async function getIngredientIds(ingredients: string[]) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) return [];
  const records = await prisma.ingredient.findMany({
    where: { name: { in: ingredients } },
    select: { id: true },
  });
  return records.map((r) => r.id);
}

// --- POST --- (Create a new product)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues }, { status: 400 });
    }
    const { name, imageUrl, category, ingredients, sizes, description } = parsed.data;
    const ingredientIds = await getIngredientIds(ingredients || []);
    const product = await prisma.product.create({
      data: {
        name,
        imageUrl,
        category: category as any,
        description,
        productIngredient: {
          create: ingredientIds.map((id) => ({ ingredientId: id })),
        },
        productSize: {
          create: Array.isArray(sizes)
            ? sizes.map((s) => ({
                sizeName: s.sizeName,
                price: s.price,
              }))
            : [],
        },
      },
      include: {
        productIngredient: { include: { ingredient: true } },
        productSize: true,
      },
    });
    return Response.json(product, { status: 201 });
  } catch (error: any) {
    console.log("error:", error);
    return Response.json({ error: error?.message || "Failed to create product" }, { status: 500 });
  }
}

// --- GET --- (Fetch all products)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        productIngredient: { include: { ingredient: true } },
        productSize: true,
      },
    });
    return Response.json(products);
  } catch (error: any) {
    return Response.json({ error: error?.message || "Failed to fetch products" }, { status: 500 });
  }
}