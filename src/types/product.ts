import type { DealScore } from "@/types/deal";

export type ProductShop = {
  id: string;
  name: string;
  rating?: number;
  isPreferred?: boolean;
};

export type ProductDeal = {
  id: string;
  externalId?: string;
  name: string;
  imageUrl: string;
  productUrl: string;
  affiliateUrl?: string;
  currentPrice: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  voucherLabel?: string;
  shop: ProductShop;
  dealScore: DealScore;
};

export type ProductSearchResult = {
  query: string;
  products: ProductDeal[];
};
