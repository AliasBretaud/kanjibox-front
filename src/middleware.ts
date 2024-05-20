import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "./locale-config";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import {
  AccessTokenError,
  getAccessToken,
  touchSession,
  updateSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { pathToRegexp } from "path-to-regexp";

const publicPages = ["/", "/(fr|en|ja)", "/api/auth/:path*"];

const intlPages = [
  "/",
  "/(fr|en|ja)/:path*",
  "/((?!api|_next/static|_next/image|favicon.ico).*)",
];

const authorized = (req: NextRequest, res?: NextResponse) => {
  const withIntl = intlPages.some((p) =>
    pathToRegexp(p).test(req.nextUrl.pathname),
  );
  return withIntl ? intlMiddleware(req) : res || NextResponse.next();
};

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
  localePrefix,
});

const authMiddleware = withMiddlewareAuthRequired({
  middleware: async function middleware(req) {
    try {
      await getAccessToken();
      const res = NextResponse.next();
      await touchSession(req, res);
      return authorized(req, res);
    } catch (err) {
      if (err instanceof AccessTokenError) {
        const res = NextResponse.redirect(
          `${req.nextUrl.basePath}/api/auth/logout`,
        );

        return updateSession(req, res, {
          user: [],
          accessToken: undefined,
          idToken: undefined,
          refreshToken: undefined,
          accessTokenExpiresAt: 0,
        });
      }

      throw err;
    }
  },
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const isPublicPage = publicPages.some((p) =>
    pathToRegexp(p).test(req.nextUrl.pathname),
  );
  if (isPublicPage) {
    return authorized(req);
  }
  return authMiddleware(req, event);
}
