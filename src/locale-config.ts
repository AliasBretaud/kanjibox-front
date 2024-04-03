import type { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr"] as const;

export const pathnames = {
  "/": "/",
  "/kanjis": {
    en: "/kanjis",
    fr: "/kanjis",
  },
  "/words": {
    en: "/words",
    fr: "/words",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
