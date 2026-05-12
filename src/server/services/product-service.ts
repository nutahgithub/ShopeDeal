import type { ProductDeal, ProductSearchResult } from "@/types/product";
import { calculateDealScore } from "@/server/services/deal-score-service";
import { mockShopeeProvider } from "@/server/services/marketplace/mock-shopee-provider";
import type {
  ShopeeProduct,
  ShopeeProvider,
} from "@/server/services/marketplace/shopee-provider";

function toProductDeal(product: ShopeeProduct): ProductDeal {
  return {
    ...product,
    dealScore: calculateDealScore(product),
  };
}

export class ProductService {
  constructor(private readonly shopeeProvider: ShopeeProvider) {}

  async searchProducts(query: string): Promise<ProductSearchResult> {
    const products = await this.shopeeProvider.searchProducts({ query });

    return {
      query,
      products: products.map(toProductDeal),
    };
  }

  async getProductById(productId: string) {
    const product = await this.shopeeProvider.getProductById(productId);

    return product ? toProductDeal(product) : null;
  }
}

export const productService = new ProductService(mockShopeeProvider);
