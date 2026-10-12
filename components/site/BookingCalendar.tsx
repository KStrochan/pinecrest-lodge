"use client";

import { useState, useSyncExternalStore } from "react";
import { submitLead } from "@/app/actions";
import { LeadForm } from "@/components/LeadForm";
import { cabins, formatUsd, isBooked, monthGrid, nightsBetween, quoteStay, rangeIsFree } from "@/lib/availability";

const noop = () => () => {};
const todayIso = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
};
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthLabel = (y: number, m: number) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)));
const longDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

export function BookingCalendar() {
  const today = useSyncExternalStore(noop, todayIso, () => null);
  const [cabinId, setCabinId] = useState(cabins[0]!.id);
  const [offset, setOffset] = useState(0);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const cabin = cabins.find((c) => c.id === cabinId)!;

  if (!today) return <p className="text-muted">Loading the calendar…</p>;

  const [ty, tm] = today.split("-").map(Number) as [number, number];
  const base = new Date(Date.UTC(ty, tm - 1 + offset, 1));
  const year = base.getUTCFullYear();
  const month = base.getUTCMonth() + 1;
  const weeks = monthGrid(year, month);

  const pick = (day: string) => {
    setNotice("");
    if (!checkIn || checkOut || day <= checkIn) {
      if (isBooked(cabin, day)) return setNotice("That night is taken. Choose a free night to arrive.");
      setCheckIn(day);
      setCheckOut(null);
      return;
    }
    if (!rangeIsFree(cabin, checkIn, day)) {
      setNotice("Some nights in that range are taken. Pick an earlier check-out or another cabin.");
      return;
    }
    setCheckOut(day);
  };

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const quote = nights ? quoteStay(cabin, nights) : null;
  const summary =
    checkIn && checkOut && quote
      ? `Booking request: ${cabin.name}, ${longDate(checkIn)} to ${longDate(checkOut)} (${nights} ${nights === 1 ? "night" : "nights"}), total ${formatUsd(quote.total)}.`
      : undefined;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="grid content-start gap-8">
        <fieldset>
          <legend className="mb-3 font-display text-2xl">Choose a cabin</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {cabins.map((c) => (
              <label key={c.id} className="flex cursor-pointer justify-between gap-3 border border-border p-4 has-[:checked]:border-[var(--fg)] has-[:checked]:bg-[var(--surface)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2">
                <input type="radio" name="cabin" value={c.id} checked={cabinId === c.id} onChange={() => { setCabinId(c.id); setCheckIn(null); setCheckOut(null); setNotice(""); }} className="sr-only" />
                <span>
                  <span className="block font-display text-xl">{c.name}</span>
                  <span className="text-sm text-muted">Sleeps {c.sleeps}</span>
                </span>
                <span className="text-sm">{formatUsd(c.nightly)} / night</span>
              </label>
            ))}
          </div>
        </fieldset>

        <section aria-labelledby="cal-heading" className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 id="cal-heading" className="font-display text-2xl" aria-live="polite">
              {monthLabel(year, month)}
            </h2>
            <div className="flex gap-2">
              <button type="button" className="btn-line px-3 py-1.5 text-sm disabled:opacity-40" onClick={() => setOffset((o) => o - 1)} disabled={offset === 0}>
                Previous month
              </button>
              <button type="button" className="btn-line px-3 py-1.5 text-sm disabled:opacity-40" onClick={() => setOffset((o) => o + 1)} disabled={offset >= 5}>
                Next month
              </button>
            </div>
          </div>
          <p className="text-sm text-muted">
            {checkIn && !checkOut ? "Now choose your check-out day." : "Choose the day you arrive."}
          </p>
          <table className="w-full table-fixed border-collapse text-center">
            <thead>
              <tr>
                {WEEKDAYS.map((d) => (
                  <th key={d} scope="col" className="pb-2 text-xs font-normal text-muted">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, wi) => (
                <tr key={wi}>
                  {week.map((day, di) => {
                    if (!day) return <td key={di} />;
                    const past = day <= today;
                    const booked = isBooked(cabin, day);
                    const inRange = checkIn && checkOut && day > checkIn && day < checkOut;
                    const edge = day === checkIn || day === checkOut;
                    const disabled = past || (booked && !(checkIn && !checkOut && day > checkIn));
                    return (
                      <td key={di} className="p-0.5">
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => pick(day)}
                          aria-pressed={Boolean(edge)}
                          aria-label={`${longDate(day)}${booked ? ", booked" : ", free"}`}
                          className={`aspect-square w-full text-sm tabular-nums transition-colors ${
                            edge
                              ? "bg-[var(--fg)] font-semibold text-[var(--bg)]"
                              : inRange
                                ? "bg-[var(--fg)]/25"
                                : booked
                                  ? "text-muted line-through"
                                  : past
                                    ? "text-muted/50"
                                    : "bg-[var(--surface)] hover:bg-[var(--fg)]/20"
                          } disabled:cursor-not-allowed`}
                        >
                          {Number(day.slice(8))}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="flex flex-wrap gap-5 text-xs text-muted">
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[var(--surface)]" /> Free</span>
            <span className="flex items-center gap-2"><span className="line-through">12</span> Booked</span>
            <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[var(--fg)]" /> Your dates</span>
          </p>
          {notice ? (
            <p role="alert" className="border-l-2 border-[var(--fg)] pl-3 text-sm">
              {notice}
            </p>
          ) : null}
        </section>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="grid gap-5 bg-[var(--surface)] p-6">
          <h2 className="font-display text-2xl">Your stay</h2>
          {quote && checkIn && checkOut ? (
            <dl className="grid gap-2 text-sm" aria-live="polite">
              <div className="flex justify-between"><dt className="text-muted">{cabin.name}</dt><dd>{longDate(checkIn)} to {longDate(checkOut)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">{nights} {nights === 1 ? "night" : "nights"} × {formatUsd(cabin.nightly)}</dt><dd>{formatUsd(quote.lodging)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Cleaning</dt><dd>{formatUsd(quote.cleaning)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-xl"><dt>Total</dt><dd>{formatUsd(quote.total)}</dd></div>
            </dl>
          ) : (
            <p className="text-sm text-muted" aria-live="polite">Pick your dates and the price appears here.</p>
          )}
          <LeadForm key={summary ?? "none"} action={submitLead} defaultMessage={summary} submitLabel="Send booking request" />
          <p className="text-xs text-muted">Demo availability. We confirm every request within a few hours.</p>
        </div>
      </aside>
    </div>
  );
}
