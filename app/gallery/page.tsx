import type { Metadata } from "next";
import { Gallery } from "@/components/site/Gallery";
import { gallery } from "@/content/lodge";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Gallery",
  description: "Cabins, the sauna, the trails and the forest around Pinecrest Lodge.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-8">
      <h1 className="font-display text-6xl">Gallery</h1>
      <p className="mb-12 mt-4 max-w-xl text-lg text-muted">Select a photo to see it full size. Use the arrow keys to move between them.</p>
      <Gallery photos={gallery} />
    </main>
  );
}
