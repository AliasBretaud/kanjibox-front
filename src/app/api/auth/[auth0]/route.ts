import { getCookiesLocaleOrDefault } from "@/lib/utils/getCookiesLocaleOrDefault";
import type { HandlerError, Session } from "@auth0/nextjs-auth0";
import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

const USERS_ENDPOINT = `${process.env.BACKEND_API_URL}/users`;

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
  })),
  signup: handleLogin((req) => ({
    authorizationParams: {
      screen_hint: "signup",
      ui_locales: getLocale(req.cookies),
    },
  })),
  callback: handleCallback(() => ({
    afterCallback: async (_: NextRequest, session: Session) => {
      await updateAccount(session.accessToken);
      return session;
    },
  })),
  onError: (_: NextRequest, error: HandlerError) => {
    console.error("auth error", error);
    redirect("/api/auth/logout");
  },
});

const updateAccount = async (accessToken: string | undefined) => {
  if (accessToken) {
    await fetch(USERS_ENDPOINT, {
      method: "POST",
      headers: {
        ["Authorization"]: `Bearer ${accessToken}`,
      },
    });
  } else {
    throw new Error("Invalid session");
  }
};
