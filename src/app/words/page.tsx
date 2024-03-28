import { Suspense } from "react";

//import AddWordForm from "@/components/word/AddWordForm";
import WordList from "@/components/word/WordList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getWords } from "@/lib/actions/word";
import type { PageParams } from "@/types";
import AddWordButton from "@/components/word/AddWordButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import KanjiDetailsModal from "@/components/word/KanjiDetailsModal";
import AddWordForm from "@/components/word/AddWordForm";

const WordsContainer = async ({ page }: { page: number }) => {
  const words = await getWords(12, page);
  return (
    <div className="flex flex-col items-center">
      <Pagination pagesCount={words.totalPages} sx={{ paddingTop: "40px" }} />
      <AddWordButton />
      <AddWordForm />
      <WordList data={words.content} />
      <KanjiDetailsModal />
      <SnackBarProvider />
    </div>
  );
};

export default function WordsPage({
  searchParams,
}: PageParams<{ page?: number }>) {
  const page = searchParams?.page || 1;
  return (
    <Suspense key={page} fallback={<LoadingState text="Loading Words..." />}>
      <WordsContainer page={page} />
    </Suspense>
  );
}
