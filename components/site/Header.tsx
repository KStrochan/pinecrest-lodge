import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-[var(--fg)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-8">
        <Link href="/" className="font-display text-2xl italic text-[var(--fg)] no-underline">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) =>
            item.href === "/booking" ? (
              <Link key={item.href} href={item.href} className="btn-sand">
                Book a stay
              </Link>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm tracking-wide text-[var(--fg)] no-underline hover:underline">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none border border-[var(--fg)]/50 px-3 py-1.5 text-sm">Menu</summary>
          <nav aria-label="Mobile" className="absolute right-0 mt-2 grid w-56 gap-1 bg-[var(--surface)] p-2 shadow-2xl">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 text-[var(--fg)] no-underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
