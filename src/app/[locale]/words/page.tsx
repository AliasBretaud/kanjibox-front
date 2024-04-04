import { Suspense } from "react";

import WordList from "@/components/word/WordList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getWords } from "@/lib/actions/word";
import type { PageParams } from "@/types/utils";
import AddWordButton from "@/components/word/AddWordButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import KanjiDetailsModal from "@/components/word/KanjiDetailsModal";
import AddWordForm from "@/components/word/AddWordForm";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
} from "next-intl";
import pick from "lodash.pick";

const WordsContainer = async ({
  page,
  messages,
}: {
  page: number;
  messages: AbstractIntlMessages;
}) => {
  const words = await getWords(12, page);
  return (
    <div className="flex flex-col items-center">
      <Pagination pagesCount={words.totalPages} sx={{ paddingTop: "40px" }} />
      <NextIntlClientProvider messages={messages}>
        <AddWordButton />
        <AddWordForm />
      </NextIntlClientProvider>
      <WordList data={words.content} />
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

  const messages = useMessages();
  const page = searchParams?.page || 1;
  return (
    <Suspense key={page} fallback={<LoadingState text="Loading Words..." />}>
      <WordsContainer
        page={page}
        messages={pick(messages, ["modals", "buttons"])}
      />
    </Suspense>
  );
}
