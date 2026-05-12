import { prisma } from "@/lib/prisma";

export const productRepository = {
  findById(productId: string) {
    return prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        shop: true,
      },
    });
  },
};
