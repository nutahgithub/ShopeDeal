import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { affiliateService } from "@/server/services/affiliate-service";

const affiliateClickSchema = z.object({
  productId: z.string().optional(),
  productUrl: z.url(),
});

function getRequestContext(request: NextRequest) {
  return {
    referrer: request.headers.get("referer") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ipAddress:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined,
  };
}

export async function GET(request: NextRequest) {
  const parsedInput = affiliateClickSchema.parse({
    productId: request.nextUrl.searchParams.get("productId") ?? undefined,
    productUrl: request.nextUrl.searchParams.get("productUrl") ?? "",
  });

  const { affiliateUrl } = await affiliateService.trackClick({
    ...parsedInput,
    ...getRequestContext(request),
  });

  return NextResponse.redirect(affiliateUrl);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedInput = affiliateClickSchema.parse(body);
  const result = await affiliateService.trackClick({
    ...parsedInput,
    ...getRequestContext(request),
  });

  return NextResponse.json(result);
}
