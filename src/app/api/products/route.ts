import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { productService } from "@/server/services/product-service";

const searchParamsSchema = z.object({
  q: z.string().optional().default(""),
});

export async function GET(request: NextRequest) {
  const parsedParams = searchParamsSchema.parse({
    q: request.nextUrl.searchParams.get("q") ?? "",
  });
  const result = await productService.searchProducts(parsedParams.q);

  return NextResponse.json(result);
}
