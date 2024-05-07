import { Suspense } from "react";

import AddKanjiModal from "@/components/kanji/modals/AddKanji/AddKanjiModal";
import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getKanjis } from "@/lib/actions/kanji";
import AddKanjiButton from "@/components/kanji/AddKanjiButton";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { PageParams } from "@/types/utils";
import EmptyState from "@/components/ui/EmptyState";
import { EditKanjiModal } from "@/components/kanji/modals/EditKanjiModal";

const KanjisEmptyState = () => {
  const t = useTranslations("modals.addKanji.emptyState");
  return (
    <EmptyState
      title={t("title")}
      description={t.rich("description", {
        br: () => <br />,
      })}
    />
  );
};

const KanjiContainer = async ({ page }: { page: number }) => {
  const kanjis = await getKanjis(12, page);
  return (
    <div className="flex flex-col items-center">
      {kanjis.totalPages > 1 && (
        <Pagination
          pagesCount={kanjis.totalPages}
          sx={{ paddingTop: "40px" }}
        />
      )}
      <AddKanjiButton />
      <AddKanjiModal />
      <EditKanjiModal />
      {kanjis.totalElements > 0 ? (
        <KanjiList data={kanjis.content} />
      ) : (
        <KanjisEmptyState />
      )}
    </div>
  );
};

export default function KanjisPage({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { page?: number }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("loading");
  const page = searchParams?.page || 1;
  return (
    <Suspense key={page} fallback={<LoadingState text={t("kanjis")} />}>
      <KanjiContainer page={page} />
    </Suspense>
  );
}
