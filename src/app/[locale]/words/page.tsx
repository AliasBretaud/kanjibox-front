import { Suspense } from "react";

import WordList from "@/components/word/WordList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getWords } from "@/lib/actions/word";
import type { PageParams } from "@/types/utils";
import AddWordButton from "@/components/word/AddWordButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import KanjiDetailsModal from "@/components/word/KanjiDetailsModal";
import AddWordModal from "@/components/word/modals/AddWord/AddWordModal";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/ui/EmptyState";
import { EditWordModal } from "@/components/word/modals/EditWord";

const WordsEmptyState = () => {
  const t = useTranslations("modals.addWord.emptyState");
  return (
    <EmptyState
      title={t("title")}
      description={t.rich("description", {
        br: () => <br />,
      })}
    />
  );
};

const WordsContainer = async ({ page }: { page: number }) => {
  const words = await getWords(12, page);
  return (
    <div className="flex flex-col items-center">
      {words.totalPages > 1 && (
        <Pagination pagesCount={words.totalPages} sx={{ paddingTop: "40px" }} />
      )}
      <AddWordButton />
      <AddWordModal />
      <EditWordModal />
      {words.totalElements > 0 ? (
        <WordList data={words.content} />
      ) : (
        <WordsEmptyState />
      )}
      <KanjiDetailsModal />
      <SnackBarProvider />
    </div>
  );
};

export default function WordsPage({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { page?: number }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const t = useTranslations("loading");
  const page = searchParams?.page || 1;
  return (
    <Suspense key={page} fallback={<LoadingState text={t("words")} />}>
      <WordsContainer page={page} />
    </Suspense>
  );
}
