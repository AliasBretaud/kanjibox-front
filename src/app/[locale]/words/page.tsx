import { Suspense } from "react";

import WordList from "@/components/word/WordList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getWords } from "@/lib/actions/word";
import type { PageParams } from "@/types/utils";
import AddWordButton from "@/components/word/AddWordButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import KanjiDetailsModal from "@/components/word/KanjiDetailsModal";
import AddWordForm from "@/components/word/AddWord/AddWordForm";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { pick } from "@/lib/utils/pick";
import EmptyState from "@/components/ui/EmptyState";

const AddWordBlock = ({ messages }: { messages?: AbstractIntlMessages }) => (
  <NextIntlClientProvider messages={messages}>
    <AddWordButton />
    <AddWordForm />
  </NextIntlClientProvider>
);

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
      {words.totalPages > 1 && (
        <Pagination pagesCount={words.totalPages} sx={{ paddingTop: "40px" }} />
      )}
      <AddWordBlock messages={messages} />
      {words.totalElements > 0 ? (
        <WordList data={words.content} />
      ) : (
        <EmptyState
          title={"Welcome !"}
          description={
            "This is where all your kanji will be recorded\nStart adding kanjis by clicking on the button above"
          }
        />
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
  const messages = useMessages();
  const messageF = pick(messages, ["modals", "buttons"]);
  const page = searchParams?.page || 1;
  return (
    <Suspense key={page} fallback={<LoadingState text={t("words")} />}>
      <WordsContainer page={page} messages={messageF} />
    </Suspense>
  );
}
