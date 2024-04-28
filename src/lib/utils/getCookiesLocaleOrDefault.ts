import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getCookiesLocaleOrDefault = (
  cookies:
    | ReadonlyRequestCookies
    | RequestCookies
    | Partial<{
        [key: string]: string;
      }>,
) => {
  if (cookies && typeof cookies.get === "function") {
    return cookies.get("NEXT_LOCALE")?.value || "en";
  }
  return "en";
};
