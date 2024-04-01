import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";

import Navigation from "@/components/Navigation";

import theme from "@/lib/theme";

import "./globals.css";
import { ModalProvider } from "@/context/modalContext";

export const metadata: Metadata = {
  title: "Kanjibox",
  description: "A simple Japanese learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
