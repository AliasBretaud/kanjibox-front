import createNextIntlPlugin from "next-intl/plugin";
import NextBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
