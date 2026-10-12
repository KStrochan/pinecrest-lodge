import { describe, expect, test } from "vitest";
import { cabins, isBooked, monthGrid, nightsBetween, quoteStay, rangeIsFree } from "@/lib/availability";

describe("monthGrid", () => {
  test("lays out a month in Monday-first weeks", () => {
    const weeks = monthGrid(2026, 10);
    expect(weeks[0]).toEqual([null, null, null, "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04"]);
    expect(weeks.flat().filter(Boolean)).toHaveLength(31);
    for (const week of weeks) expect(week).toHaveLength(7);
  });
});

describe("nights and prices", () => {
  test("counts nights between check-in and check-out", () => {
    expect(nightsBetween("2026-10-30", "2026-11-02")).toBe(3);
  });

  test("adds a cleaning fee once per stay", () => {
    const fern = cabins.find((c) => c.id === "fern")!;
    expect(quoteStay(fern, 3)).toEqual({ nights: 3, lodging: 420, cleaning: 60, total: 480 });
  });
});

describe("availability", () => {
  const fern = cabins.find((c) => c.id === "fern")!;

  test("is deterministic per cabin and date", () => {
    expect(isBooked(fern, "2026-11-14")).toBe(isBooked(fern, "2026-11-14"));
  });

  test("a range is free only if every night in it is free", () => {
    const days = Array.from({ length: 60 }, (_, i) => new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10));
    const booked = days.find((d) => isBooked(fern, d))!;
    const before = new Date(Date.parse(booked) - 86400000).toISOString().slice(0, 10);
    const after = new Date(Date.parse(booked) + 86400000).toISOString().slice(0, 10);
    expect(rangeIsFree(fern, before, after)).toBe(false);
  });

  test("checking out on a booked day is fine", () => {
    const days = Array.from({ length: 60 }, (_, i) => new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10));
    const i = days.findIndex((d, idx) => idx > 0 && isBooked(fern, d) && !isBooked(fern, days[idx - 1]!));
    expect(rangeIsFree(fern, days[i - 1]!, days[i]!)).toBe(true);
  });
});
