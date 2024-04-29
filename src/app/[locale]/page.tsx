import type { PageParams } from "@/types/utils";
import AuthLayout from "@/components/home/Auth/Layout";
import UnAuthLayout from "@/components/home/UnAuthLayout";
import { unstable_setRequestLocale } from "next-intl/server";
import { isAuth } from "@/lib/actions/auth";

export default async function Home({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { query?: string }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const login = await isAuth();
  return (
    <main>
      {login ? (
        <AuthLayout query={searchParams?.query || ""} />
      ) : (
        <UnAuthLayout />
      )}
    </main>
  );
}
