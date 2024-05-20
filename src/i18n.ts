import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "./locale-config";
import { locales } from "./locale-config";

export default getRequestConfig(async ({ locale }) => {
  const lang = locale as Locale;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(lang)) notFound();

  return {
    messages: (await import(`../messages/${lang}.json`)).default,
  };
});
