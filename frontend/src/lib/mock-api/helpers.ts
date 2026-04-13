import type { Bilingual } from "@/types/api";

/** Seeded pseudo-random for reproducible mock data */
export function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rng = seededRandom(42);

export function rand(min: number, max: number): number {
  return Math.round((rng() * (max - min) + min) * 100) / 100;
}

export function randInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => rng() - 0.5);
  return shuffled.slice(0, n);
}

export function bi(en: string, zh: string): Bilingual {
  return { en, zh };
}

/** Generate a date string offset from a base date */
export function dateOffset(base: string, daysDelta: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + daysDelta);
  return d.toISOString().slice(0, 10);
}

export function dateTimeOffset(base: string, daysDelta: number, hours = 0, mins = 0): string {
  const d = new Date(base);
  d.setDate(d.getDate() + daysDelta);
  d.setHours(hours, mins, 0, 0);
  return d.toISOString().slice(0, 16).replace("T", " ");
}

/** Format number with commas */
export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

export function pct(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

export const BASE_DATE = "2025-03-09"; // current "today" for mock data
