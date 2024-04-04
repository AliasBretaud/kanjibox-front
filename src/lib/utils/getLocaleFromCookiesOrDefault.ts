import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getLocaleFromCookiesOrDefault = (
  cookies: ReadonlyRequestCookies,
) => {
  const cookiesLocale = cookies.get("NEXT_LOCALE")?.value || "en";
  return cookiesLocale === "ja" ? "en" : cookiesLocale;
};
