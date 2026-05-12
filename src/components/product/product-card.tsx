import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";

import { DealScoreBadge } from "@/components/deal/deal-score-badge";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { ProductDeal } from "@/types/product";

type ProductCardProps = {
  product: ProductDeal;
};

export function ProductCard({ product }: ProductCardProps) {
  const affiliateHref = `/api/affiliate-clicks?productId=${encodeURIComponent(
    product.id,
  )}&productUrl=${encodeURIComponent(product.productUrl)}`;

  return (
    <article className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:grid-cols-[160px_1fr]">
      <div className="aspect-square overflow-hidden rounded-md bg-zinc-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={320}
          height={320}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="line-clamp-2 text-base font-semibold text-zinc-950">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">{product.shop.name}</p>
          </div>
          <DealScoreBadge dealScore={product.dealScore} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xl font-semibold text-orange-600">
            {formatCurrency(product.currentPrice, product.currency)}
          </span>
          {product.originalPrice ? (
            <span className="text-sm text-zinc-400 line-through">
              {formatCurrency(product.originalPrice, product.currency)}
            </span>
          ) : null}
          {product.voucherLabel ? (
            <Badge tone="warning">{product.voucherLabel}</Badge>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-zinc-600">
          <span className="inline-flex items-center gap-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
          <span>{product.soldCount.toLocaleString("vi-VN")} sold</span>
          {product.shop.isPreferred ? <Badge tone="success">Preferred</Badge> : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {product.dealScore.reasons.slice(0, 3).map((reason) => (
            <Badge key={reason}>{reason}</Badge>
          ))}
        </div>

        <div className="mt-auto flex justify-end">
          <ButtonLink href={affiliateHref} target="_blank" rel="noreferrer">
            Buy on Shopee
            <ExternalLink className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
