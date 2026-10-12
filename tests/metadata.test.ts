import { describe, expect, test } from "vitest";
import { site } from "@/content/site";
import { buildMetadata, buildRootMetadata } from "@/lib/metadata";

describe("buildRootMetadata", () => {
  test("uses a title template so every page title ends with the site name", () => {
    expect(buildRootMetadata(site).title).toEqual({ default: "Pinecrest Lodge", template: "%s | Pinecrest Lodge" });
  });

  test("sets no canonical url, so child pages never inherit the home page's", () => {
    const meta = buildRootMetadata(site);
    expect(meta.alternates?.canonical).toBeUndefined();
    expect(meta.openGraph).not.toHaveProperty("url");
  });

  test("openGraph locale is en_US", () => {
    expect(buildRootMetadata(site).openGraph).toMatchObject({ locale: "en_US", siteName: "Pinecrest Lodge" });
  });
});

describe("buildMetadata", () => {
  test("passes the page title through for the root template", () => {
    expect(buildMetadata(site, { title: "Pricing", path: "/pricing" }).title).toBe("Pricing");
  });

  test("leaves the title out when none is given, so the default applies", () => {
    expect(buildMetadata(site, { path: "/" })).not.toHaveProperty("title");
  });

  test("canonical and og:url are absolute and page specific", () => {
    const meta = buildMetadata(site, { path: "/pricing" });
    expect(meta.alternates?.canonical).toBe("https://pinecrest-lodge.vercel.app/pricing");
    expect(meta.openGraph).toMatchObject({ url: "https://pinecrest-lodge.vercel.app/pricing" });
  });
});
