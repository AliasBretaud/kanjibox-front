import type { Pathnames } from "next-intl/navigation";

export const locales = ["en", "fr", "ja"] as const;

export const pathnames = {
  "/": "/",
  "/kanjis": "/kanjis",
  "/words": {
    en: "/words",
    fr: "/mots",
    ja: "/words",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
