import { ProductCard } from "@/components/product/product-card";
import { ProductSearchForm } from "@/components/product/product-search-form";
import { productService } from "@/server/services/product-service";

type HomeProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const result = await productService.searchProducts(query);

  return (
    <div className="space-y-8">
      <section className="space-y-5">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-orange-600">
            Deal search
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Find Shopee products worth buying.
          </h1>
          <p className="text-base leading-7 text-zinc-600">
            Compare price, rating, sales volume, shop signal, and voucher hints
            before opening Shopee.
          </p>
        </div>
        <ProductSearchForm defaultQuery={query} />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {query ? `Results for "${query}"` : "Suggested deals"}
            </h2>
            <p className="text-sm text-zinc-500">
              Mock data is used until a compliant Shopee data source is ready.
            </p>
          </div>
          <p className="text-sm text-zinc-500">
            {result.products.length} products
          </p>
        </div>

        <div className="grid gap-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
