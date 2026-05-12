import { prisma } from "@/lib/prisma";

export type CreateAffiliateClickInput = {
  userId?: string;
  productId?: string;
  productUrl: string;
  affiliateUrl: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
};

export const affiliateClickRepository = {
  create(input: CreateAffiliateClickInput) {
    return prisma.affiliateClick.create({
      data: input,
    });
  },
};
