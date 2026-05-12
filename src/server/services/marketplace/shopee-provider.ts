export type ShopeeProduct = {
  id: string;
  externalId?: string;
  name: string;
  imageUrl: string;
  productUrl: string;
  currentPrice: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  voucherLabel?: string;
  shop: {
    id: string;
    name: string;
    rating?: number;
    isPreferred?: boolean;
  };
};

export type SearchProductsInput = {
  query: string;
};

export interface ShopeeProvider {
  searchProducts(input: SearchProductsInput): Promise<ShopeeProduct[]>;
  getProductById(productId: string): Promise<ShopeeProduct | null>;
}
