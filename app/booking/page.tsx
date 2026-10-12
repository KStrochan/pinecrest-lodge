import type { Metadata } from "next";
import { BookingCalendar } from "@/components/site/BookingCalendar";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(site, {
  title: "Book a stay",
  description: "Check free dates for each cabin and send a booking request.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-8">
      <h1 className="font-display text-6xl">Book a stay</h1>
      <p className="mb-12 mt-4 max-w-xl text-lg text-muted">
        Choose a cabin, then tap the day you arrive and the day you leave. Check-in from 15:00, check-out by 11:00.
      </p>
      <BookingCalendar />
    </main>
  );
}
