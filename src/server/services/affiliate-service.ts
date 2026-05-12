import { env } from "@/lib/env";
import { affiliateClickRepository } from "@/server/repositories/affiliate-click-repository";

export type TrackAffiliateClickInput = {
  productId?: string;
  productUrl: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
};

function buildAffiliateUrl(productUrl: string) {
  if (!env.SHOPEE_AFFILIATE_BASE_URL) {
    const url = new URL(productUrl);
    url.searchParams.set("utm_source", "shopedeal");
    url.searchParams.set("utm_medium", "affiliate_mock");
    return url.toString();
  }

  const url = new URL(env.SHOPEE_AFFILIATE_BASE_URL);
  url.searchParams.set("target", productUrl);

  if (env.SHOPEE_AFFILIATE_ID) {
    url.searchParams.set("affiliate_id", env.SHOPEE_AFFILIATE_ID);
  }

  return url.toString();
}

export const affiliateService = {
  async trackClick(input: TrackAffiliateClickInput) {
    const affiliateUrl = buildAffiliateUrl(input.productUrl);

    try {
      await affiliateClickRepository.create({
        productId: input.productId,
        productUrl: input.productUrl,
        affiliateUrl,
        referrer: input.referrer,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
      });
    } catch (error) {
      console.warn("Affiliate click was not persisted", error);
    }

    return {
      affiliateUrl,
    };
  },
};
