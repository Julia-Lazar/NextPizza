import { generateOpenApi } from "@/lib/openapi"; // adjust path as needed

export async function GET() {
  return new Response(JSON.stringify(generateOpenApi()), {
    headers: { "Content-Type": "application/json" },
  });
}