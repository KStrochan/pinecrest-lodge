import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { activities, photos } from "@/content/lodge";
import { site } from "@/content/site";
import { cabins, formatUsd } from "@/lib/availability";
import { buildMetadata } from "@/lib/metadata";
import { unsplash } from "@/lib/unsplash";

export const metadata: Metadata = buildMetadata(site, { path: "/" });

export default function HomePage() {
  return (
    <main id="main">
      <section className="relative isolate grid min-h-[100svh] items-end overflow-hidden">
        <Image
          src={unsplash(photos.hero, 2400)}
          alt="Log cabin among tall trees in the forest"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="hero-photo -z-20 bg-[var(--surface)] object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/40 to-bg/30" />
        <div className="hero-copy mx-auto grid w-full max-w-7xl gap-6 px-4 pb-20 sm:px-8 sm:pb-28">
          <h1 className="max-w-4xl font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
            Four cabins, one sauna, and nothing on the schedule.
          </h1>
          <p className="max-w-xl text-lg text-[var(--fg)]/85">
            A small lodge at 1,200 metres, forty minutes past the last town. Trails start at the door and the nearest
            neighbour is a stand of hundred-year-old pines.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn-sand">
              Check availability
            </Link>
            <Link href="/#stay" className="btn-line">
              See the cabins
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <p className="font-display text-3xl leading-snug sm:text-4xl">
          Breakfast is bread from the lodge oven. Dinner is whatever you cook on the stove. Wi-Fi works in the main
          house, and most guests stop asking for it by the second day.
        </p>
        <Image
          src={unsplash(photos.mist, 1400)}
          alt="Dark pine forest in thick fog"
          width={1400}
          height={933}
          sizes="(min-width: 768px) 640px, 100vw"
          className="aspect-[3/2] h-auto w-full bg-[var(--surface)] object-cover"
        />
      </section>

      <section id="stay" className="scroll-mt-8 bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl">Where you sleep</h2>
            <p className="max-w-md text-muted">Every cabin has its own bathroom, a stove and linen made from flax grown in the valley.</p>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {cabins.map((cabin, index) => (
              <li key={cabin.id} className={`grid gap-5 ${index % 2 === 1 ? "md:mt-20" : ""}`}>
                <Image
                  src={unsplash(cabin.photo, 1200)}
                  alt={cabin.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="aspect-[4/3] h-auto w-full bg-bg object-cover"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl">{cabin.name}</h3>
                  <p className="text-muted">
                    Sleeps {cabin.sleeps}, from <span className="text-[var(--fg)]">{formatUsd(cabin.nightly)}</span> a night
                  </p>
                </div>
                <p className="max-w-lg text-muted">{cabin.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="do" className="mx-auto max-w-7xl scroll-mt-8 px-4 py-24 sm:px-8">
        <h2 className="font-display text-5xl">Things to do</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {activities.map((a) => (
            <li key={a.title} className="grid content-start gap-4">
              <Image
                src={unsplash(a.photo, 900)}
                alt={a.alt}
                width={900}
                height={1200}
                sizes="(min-width: 768px) 400px, 100vw"
                className="aspect-[3/4] h-auto w-full bg-[var(--surface)] object-cover"
              />
              <h3 className="font-display text-2xl">{a.title}</h3>
              <p className="text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image src={unsplash(photos.valley, 2400)} alt="" fill sizes="100vw" className="-z-20 bg-[var(--surface)] object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-bg/60" />
        <div className="mx-auto grid max-w-7xl justify-items-start gap-6 px-4 py-32 sm:px-8">
          <h2 className="max-w-2xl font-display text-5xl leading-tight">Weekends go first. Weekdays are quieter and 20% cheaper.</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn-sand">
              Find free dates
            </Link>
            <Link href="/gallery" className="btn-line">
              Open the gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
