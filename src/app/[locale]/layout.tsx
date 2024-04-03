import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Navigation from "@/components/Navigation";

import theme from "@/lib/theme";

import "@/app/globals.css";
import { ModalProvider } from "@/context/modalContext";
import type { PropsWithChildren } from "react";
import { locales } from "@/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type Props = PropsWithChildren<{
  params: { locale: string };
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function RootLayout({
  params: { locale },
  children,
}: Readonly<Props>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="bg-grey-dark text-white">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <CssBaseline />
              <Navigation />
              {children}
            </ModalProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
