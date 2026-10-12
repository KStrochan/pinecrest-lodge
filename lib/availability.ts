export type Cabin = {
  id: string;
  name: string;
  sleeps: number;
  nightly: number;
  cleaning: number;
  photo: string;
  alt: string;
  text: string;
};

export const cabins: Cabin[] = [
  { id: "fern", name: "Fern cabin", sleeps: 2, nightly: 140, cleaning: 60, photo: "1727706572437-4fcda0cbd66f", alt: "Cabin bedroom with two beds under a wooden ceiling", text: "A one-room cabin under the pines with a wood stove and a window seat." },
  { id: "ridge", name: "Ridge cabin", sleeps: 4, nightly: 210, cleaning: 80, photo: "1680703486830-1b5af60635d7", alt: "Cabin living room with a stone fireplace and wooden walls", text: "Two bedrooms, a stone fireplace and a deck facing the valley." },
  { id: "lodge", name: "Lodge room", sleeps: 2, nightly: 110, cleaning: 40, photo: "1631630259742-c0f0b17c6c10", alt: "Room with a black wood stove, a chair and a large window", text: "A room in the main lodge, steps from breakfast and the sauna." },
  { id: "family", name: "Family house", sleeps: 6, nightly: 320, cleaning: 120, photo: "1663770260249-8c596c3ae71c", alt: "Wooden house on a rocky slope with trees around it", text: "Three bedrooms, a full kitchen and a fenced garden on the forest edge." },
];

const DAY_MS = 86_400_000;
const toMs = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** Monday-first weeks for a calendar month; days outside the month are null. */
export function monthGrid(year: number, month: number): (string | null)[][] {
  const first = Date.UTC(year, month - 1, 1);
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lead = (new Date(first).getUTCDay() + 6) % 7;
  const cells: (string | null)[] = [...Array<null>(lead).fill(null)];
  for (let d = 0; d < days; d++) cells.push(toIso(first + d * DAY_MS));
  while (cells.length % 7) cells.push(null);
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Demo occupancy: stable for each cabin and night, busier at weekends. */
export function isBooked(cabin: Cabin, night: string): boolean {
  let h = 2166136261;
  const key = `${cabin.id}|${night.slice(0, 8)}|${Math.floor(Number(night.slice(8)) / 3)}`;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  const weekend = [5, 6].includes(new Date(toMs(night)).getUTCDay());
  return (h >>> 0) % 100 < (weekend ? 45 : 25);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  return Math.round((toMs(checkOut) - toMs(checkIn)) / DAY_MS);
}

export function rangeIsFree(cabin: Cabin, checkIn: string, checkOut: string): boolean {
  for (let ms = toMs(checkIn); ms < toMs(checkOut); ms += DAY_MS) {
    if (isBooked(cabin, toIso(ms))) return false;
  }
  return true;
}

export function quoteStay(cabin: Cabin, nights: number) {
  const lodging = cabin.nightly * nights;
  return { nights, lodging, cleaning: cabin.cleaning, total: lodging + cabin.cleaning };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}
