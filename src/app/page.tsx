import { Suspense } from "react";

import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import SearchBar from "@/components/home/SearchBar";
import WelcomeMessage from "@/components/home/WelcomeMessage";

import { getKanjis } from "@/lib/actions/kanji";
import type { PageParams } from "@/types";

const KanjiContainer = async ({ search }: { search: string }) => {
  const kanjis = await getKanjis(8, 0, search);
  return <KanjiList data={kanjis.content} />;
};

export default function Home({ searchParams }: PageParams<{ query?: string }>) {
  const query = searchParams?.query || "";
  return (
    <main>
      <SearchBar />
      {!query && <WelcomeMessage />}
      <Suspense
        key={query}
        fallback={<LoadingState text="Loading Kanjis..." />}
      >
        <KanjiContainer search={query} />
      </Suspense>
    </main>
  );
}
