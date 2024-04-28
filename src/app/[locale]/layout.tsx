import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Navigation from "@/components/navigation/Navigation";

import theme from "@/lib/theme";

import "@/app/globals.css";
import { ModalProvider } from "@/context/modalContext";
import type { PropsWithChildren } from "react";
import { locales } from "@/locale-config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NextIntlClientProvider, useMessages } from "next-intl";

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

  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className="bg-grey-dark text-white">
        <UserProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ModalProvider>
                <CssBaseline />
                <NextIntlClientProvider locale={locale} messages={messages}>
                  <Navigation />
                  {children}
                </NextIntlClientProvider>
              </ModalProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </UserProvider>
      </body>
    </html>
  );
}
