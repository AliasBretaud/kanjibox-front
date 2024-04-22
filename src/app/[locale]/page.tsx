import { Suspense } from "react";

import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import SearchBar from "@/components/home/SearchBar";
import WelcomeMessage from "@/components/home/WelcomeMessage";

import { getKanjis } from "@/lib/actions/kanji";
import { unstable_setRequestLocale } from "next-intl/server";
import type { PageParams } from "@/types/utils";
import { useTranslations } from "next-intl";

const KanjiContainer = async ({ search }: { search?: string }) => {
  const kanjis = await getKanjis(8, 0, search);
  return <KanjiList data={kanjis.content} />;
};

export default function Home({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { query?: string }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("loading");
  const query = searchParams?.query || "";
  return (
    <main>
      <SearchBar />
      {!query ? <WelcomeMessage /> : null}
      <Suspense key={query} fallback={<LoadingState text={t("kanjis")} />}>
        <KanjiContainer search={query} />
      </Suspense>
    </main>
  );
}
