import type {
  SearchProductsInput,
  ShopeeProduct,
  ShopeeProvider,
} from "@/server/services/marketplace/shopee-provider";

const mockProducts: ShopeeProduct[] = [
  {
    id: "mock-iphone-15-case",
    externalId: "shopee-10001",
    name: "Shockproof clear case for iPhone 15",
    imageUrl:
      "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=800&q=80",
    productUrl: "https://shopee.vn/mock-iphone-15-case",
    currentPrice: 69000,
    originalPrice: 129000,
    currency: "VND",
    rating: 4.8,
    reviewCount: 1240,
    soldCount: 8200,
    voucherLabel: "Extra 12% off",
    shop: {
      id: "shop-accessory-pro",
      name: "Accessory Pro",
      rating: 4.9,
      isPreferred: true,
    },
  },
  {
    id: "mock-wireless-mouse",
    externalId: "shopee-10002",
    name: "Silent wireless mouse with rechargeable battery",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    productUrl: "https://shopee.vn/mock-wireless-mouse",
    currentPrice: 159000,
    originalPrice: 249000,
    currency: "VND",
    rating: 4.7,
    reviewCount: 860,
    soldCount: 5400,
    voucherLabel: "Free shipping",
    shop: {
      id: "shop-tech-daily",
      name: "Tech Daily",
      rating: 4.8,
      isPreferred: true,
    },
  },
  {
    id: "mock-kitchen-scale",
    externalId: "shopee-10003",
    name: "Digital kitchen scale with stainless tray",
    imageUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    productUrl: "https://shopee.vn/mock-kitchen-scale",
    currentPrice: 99000,
    originalPrice: 149000,
    currency: "VND",
    rating: 4.6,
    reviewCount: 430,
    soldCount: 2300,
    voucherLabel: "Save 20K",
    shop: {
      id: "shop-home-smart",
      name: "Home Smart",
      rating: 4.7,
    },
  },
  {
    id: "mock-sunscreen",
    externalId: "shopee-10004",
    name: "Lightweight daily sunscreen SPF50 PA++++",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    productUrl: "https://shopee.vn/mock-sunscreen",
    currentPrice: 219000,
    originalPrice: 260000,
    currency: "VND",
    rating: 4.9,
    reviewCount: 2100,
    soldCount: 11200,
    shop: {
      id: "shop-beauty-lab",
      name: "Beauty Lab Official",
      rating: 4.9,
      isPreferred: true,
    },
  },
];

export class MockShopeeProvider implements ShopeeProvider {
  async searchProducts(input: SearchProductsInput) {
    const normalizedQuery = input.query.trim().toLowerCase();

    if (!normalizedQuery) {
      return mockProducts;
    }

    const matchedProducts = mockProducts.filter((product) => {
      const searchableText = [
        product.name,
        product.shop.name,
        product.voucherLabel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    return matchedProducts.length > 0 ? matchedProducts : mockProducts;
  }

  async getProductById(productId: string) {
    return mockProducts.find((product) => product.id === productId) ?? null;
  }
}

export const mockShopeeProvider = new MockShopeeProvider();
