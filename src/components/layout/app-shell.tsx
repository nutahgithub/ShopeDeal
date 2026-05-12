import type { ReactNode } from "react";
import Link from "next/link";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-semibold text-orange-600">
            ShopeDeal
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-600">
            <Link className="hover:text-zinc-950" href="/">
              Deals
            </Link>
            <Link className="hover:text-zinc-950" href="/watchlist">
              Watchlist
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
