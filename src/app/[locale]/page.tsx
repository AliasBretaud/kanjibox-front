import type { PageParams } from "@/types/utils";
import { getSession } from "@auth0/nextjs-auth0";
import AuthLayout from "@/components/home/Auth/Layout";
import UnAuthLayout from "@/components/home/UnAuthLayout";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Home({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { query?: string }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const session = await getSession();
  return (
    <main>
      {session?.user ? (
        <AuthLayout query={searchParams?.query || ""} />
      ) : (
        <UnAuthLayout />
      )}
    </main>
  );
}
