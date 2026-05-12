import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductSearchFormProps = {
  defaultQuery?: string;
};

export function ProductSearchForm({ defaultQuery = "" }: ProductSearchFormProps) {
  return (
    <form className="flex w-full flex-col gap-3 sm:flex-row" action="/">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
          aria-hidden="true"
        />
        <Input
          className="pl-9"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search products or paste a Shopee keyword"
        />
      </div>
      <Button type="submit" className="sm:w-32">
        Search
      </Button>
    </form>
  );
}
