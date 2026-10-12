"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { unsplash } from "@/lib/unsplash";

type Photo = { id: string; alt: string };

export function Gallery({ photos }: { photos: Photo[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <li key={photo.id} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => open(i)} className="block w-full" aria-label={`Open photo: ${photo.alt}`}>
              <Image
                src={unsplash(photo.id, 900)}
                alt={photo.alt}
                width={900}
                height={i % 3 === 0 ? 1200 : 640}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className={`h-auto w-full bg-[var(--surface)] object-cover transition-opacity hover:opacity-85 ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label="Photo viewer"
        className="m-auto max-h-[95vh] w-[min(1200px,95vw)] bg-transparent p-0 text-[var(--fg)]"
      >
        {current ? (
          <figure className="grid gap-3">
            <Image
              src={unsplash(current.id, 2000)}
              alt={current.alt}
              width={2000}
              height={1333}
              sizes="95vw"
              className="max-h-[80vh] w-full object-contain"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span>
                {current.alt} <span className="text-muted">({(index ?? 0) + 1} of {photos.length})</span>
              </span>
              <span className="flex gap-2">
                <button type="button" className="btn-line px-4 py-2" onClick={() => step(-1)}>
                  Previous
                </button>
                <button type="button" className="btn-line px-4 py-2" onClick={() => step(1)}>
                  Next
                </button>
                <button type="button" className="btn-sand px-4 py-2" onClick={close} autoFocus>
                  Close
                </button>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </dialog>
    </>
  );
}
