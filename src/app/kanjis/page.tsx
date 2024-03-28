import { Suspense } from "react";

import AddKanjiForm from "@/components/kanji/AddKanjiForm";
import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getKanjis } from "@/lib/actions/kanji";
import type { PageParams } from "@/types";
import AddKanjiButton from "@/components/kanji/AddKanjiButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";

const KanjiContainer = async ({ page }: { page: number }) => {
  const kanjis = await getKanjis(12, page);
  return (
    <div className="flex flex-col items-center">
      <Pagination pagesCount={kanjis.totalPages} sx={{ paddingTop: "40px" }} />
      <AddKanjiButton />
      <KanjiList data={kanjis.content} />
    </div>
  );
};

export default function KanjisPage({
  searchParams,
}: PageParams<{ page?: number }>) {
  const page = searchParams?.page || 1;
  return (
    <>
      <Suspense key={page} fallback={<LoadingState text="Loading Kanjis..." />}>
        <KanjiContainer page={page} />
      </Suspense>
      <AddKanjiForm />
      <SnackBarProvider />
    </>
  );
}
