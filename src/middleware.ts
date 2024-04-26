import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "./locale-config";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { pathToRegexp } from "path-to-regexp";

const publicPages = ["/", "/(fr|en|ja)", "/api/auth/:path*"];

const intlPages = [
  "/",
  "/(fr|en|ja)/:path*",
  "/((?!api|_next/static|_next/image|favicon.ico).*)",
];

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
  localePrefix,
});

const authMiddleware = withMiddlewareAuthRequired((req) => intlMiddleware(req));

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  const isPublicPage = publicPages.some((p) => pathToRegexp(p).test(pathname));

  if (isPublicPage && intlPages.some((p) => pathToRegexp(p).test(pathname))) {
    return intlMiddleware(req);
  } else if (!isPublicPage) {
    return authMiddleware(req, event);
  }
  return NextResponse.next();
}
