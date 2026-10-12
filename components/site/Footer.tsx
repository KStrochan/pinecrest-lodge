import Link from "next/link";
import { PhotoCredits } from "@/components/PhotoCredits";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="font-display text-3xl italic">{site.name}</p>
          <p className="max-w-sm text-muted">{site.description}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Find us</p>
          <p className="text-muted">{site.contact.address}</p>
          <p className="text-muted">{site.contact.hours}</p>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Explore</p>
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-2 px-4 py-5 text-xs text-muted sm:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Demo project by{" "}
            <a href="https://github.com/KStrochan">Konstantyn Strochan</a>; the lodge is fictional.
          </p>
          <PhotoCredits credits={site.photoCredits} />
        </div>
      </div>
    </footer>
  );
}
