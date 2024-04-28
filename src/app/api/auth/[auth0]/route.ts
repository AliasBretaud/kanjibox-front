import { getCookiesLocaleOrDefault } from "@/lib/utils/getCookiesLocaleOrDefault";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const getLocale = (
  cookies:
    | RequestCookies
    | Partial<{
        [key: string]: string;
      }>,
) => {
  const locale = getCookiesLocaleOrDefault(cookies);
  return locale === "fr" ? "fr-FR" : locale;
};

export const GET = handleAuth({
  login: handleLogin((req) => ({
    authorizationParams: {
      ui_locales: getLocale(req.cookies),
    },
    returnTo: "/api/auth/success/callback",
  })),
  signup: handleLogin((req) => ({
    authorizationParams: {
      screen_hint: "signup",
      ui_locales: getLocale(req.cookies),
    },
    returnTo: "/api/auth/success/callback",
  })),
});
