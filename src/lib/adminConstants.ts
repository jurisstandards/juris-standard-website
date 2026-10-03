/**
 * Single source of truth for Divisions and Categories.
 *
 * These strings MUST match exactly what the public Index pages filter on:
 *  - `division` is matched with `.eq('division', '<Name>\u2122')` in each page
 *  - `category` is matched with `l.category === band.title`
 * If they drift apart, an approved record is saved but never shows up publicly.
 */
const TM = "\u2122";

export interface DivisionConfig {
  /** Exact value stored in DB (`juris_records.division`) */
  value: string;
  /** Clean label to show in the UI (no trademark symbol) */
  label: string;
  /** Exact band titles used on the public page, in display order (1st = principal) */
  categories: string[];
}

export const DIVISION_CONFIG: DivisionConfig[] = [
  {
    value: `Law Firm Excellence${TM}`,
    label: "Law Firm Excellence",
    categories: ["Principal Record", "Distinguished Law Firms", "Rising Law Firms"],
  },
  {
    value: `Litigation Masters${TM}`,
    label: "Litigation Masters",
    categories: ["Litigation Masters 2027", "Distinguished Litigators", "Next Generation"],
  },
  {
    value: `Corporate Elite${TM}`,
    label: "Corporate Elite",
    categories: [
      `CORPORATE & M&A COUNSEL${TM}`,
      `PRIVATE CAPITAL COUNSEL${TM}`,
      `FINANCE & MARKETS COUNSEL${TM}`,
      `IN-HOUSE CORPORATE COUNSEL${TM}`,
    ],
  },
  {
    value: `Women Leaders${TM}`,
    label: "Women Leaders",
    categories: ["Women Leaders 2027", "Distinguished Women", "Next Generation"],
  },
  {
    value: `Future Leaders${TM}`,
    label: "Future Leaders",
    categories: ["Future Leaders 2027", "Distinguished Future Leaders", "Next Generation"],
  },
  {
    value: `Legal Innovation Excellence${TM}`,
    label: "Legal Innovation Excellence",
    categories: ["Legal Innovation 2027", "Distinguished Innovators", "Pioneers"],
  },
];

export const DIVISIONS: string[] = DIVISION_CONFIG.map((d) => d.value);

export const CATEGORIES: Record<string, string[]> = Object.fromEntries(
  DIVISION_CONFIG.map((d) => [d.value, d.categories])
);

/** Strip the trademark symbol for display. */
export function stripTM(s: string | undefined | null): string {
  return (s ?? "").replace(/\u2122/g, "");
}

/**
 * Map any incoming division string (with/without TM, any casing) to the exact
 * canonical DB value. Returns null if it is not a known division.
 */
export function normalizeDivision(input: string | undefined | null): string | null {
  const key = stripTM(input).trim().toLowerCase();
  if (!key) return null;
  return DIVISION_CONFIG.find((d) => d.label.toLowerCase() === key)?.value ?? null;
}

/** Tier ("01" | "02" | "03" ...) is simply the category's position in its division. */
export function tierForCategory(division: string, category: string): string {
  const idx = (CATEGORIES[division] ?? []).indexOf(category);
  return String((idx < 0 ? 0 : idx) + 1).padStart(2, "0");
}
