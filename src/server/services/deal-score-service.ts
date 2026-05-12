import type { DealScore, DealScoreLevel } from "@/types/deal";
import type { ShopeeProduct } from "@/server/services/marketplace/shopee-provider";

function clampScore(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)));
}

function getLevel(value: number): DealScoreLevel {
  if (value >= 85) {
    return "excellent";
  }

  if (value >= 70) {
    return "good";
  }

  if (value >= 50) {
    return "fair";
  }

  return "risky";
}

function getLabel(level: DealScoreLevel) {
  const labels: Record<DealScoreLevel, string> = {
    excellent: "Great deal",
    good: "Good deal",
    fair: "Worth checking",
    risky: "Needs review",
  };

  return labels[level];
}

export function calculateDealScore(product: ShopeeProduct): DealScore {
  const discountRate = product.originalPrice
    ? (product.originalPrice - product.currentPrice) / product.originalPrice
    : 0;
  const ratingScore = (product.rating / 5) * 25;
  const salesScore = Math.min(product.soldCount / 400, 20);
  const discountScore = Math.max(0, discountRate) * 35;
  const voucherScore = product.voucherLabel ? 10 : 0;
  const preferredShopScore = product.shop.isPreferred ? 10 : 0;

  const value = clampScore(
    ratingScore + salesScore + discountScore + voucherScore + preferredShopScore,
  );
  const level = getLevel(value);
  const reasons = [
    product.originalPrice && discountRate > 0.1
      ? `${Math.round(discountRate * 100)}% lower than original price`
      : undefined,
    product.rating >= 4.7 ? "Strong rating" : undefined,
    product.soldCount >= 2000 ? "High sales volume" : undefined,
    product.voucherLabel ? product.voucherLabel : undefined,
    product.shop.isPreferred ? "Preferred shop" : undefined,
  ].filter((reason): reason is string => Boolean(reason));

  return {
    value,
    level,
    label: getLabel(level),
    reasons,
  };
}
