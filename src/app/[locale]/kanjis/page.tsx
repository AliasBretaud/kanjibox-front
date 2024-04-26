import { Suspense } from "react";

import AddKanjiForm from "@/components/kanji/AddForm/AddKanjiForm";
import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getKanjis } from "@/lib/actions/kanji";
import AddKanjiButton from "@/components/kanji/AddKanjiButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { pick } from "@/lib/utils/pick";
import type { PageParams } from "@/types/utils";
import EmptyState from "@/components/ui/EmptyState";

const AddKanjiBlock = ({ messages }: { messages?: AbstractIntlMessages }) => (
  <NextIntlClientProvider messages={messages}>
    <AddKanjiButton />
    <AddKanjiForm />
  </NextIntlClientProvider>
);

const KanjiContainer = async ({
  messages,
  page,
}: {
  messages: AbstractIntlMessages;
  page: number;
}) => {
  const kanjis = await getKanjis(12, page);
  return (
    <div className="flex flex-col items-center">
      {kanjis.totalPages > 0 && (
        <Pagination
          pagesCount={kanjis.totalPages}
          sx={{ paddingTop: "40px" }}
        />
      )}
      <AddKanjiBlock messages={messages} />
      {kanjis.totalElements > 0 ? (
        <KanjiList data={kanjis.content} />
      ) : (
        <EmptyState
          title={"Welcome !"}
          description={
            "This is where all your kanji will be recorded\nStart adding kanjis by clicking on the button above"
          }
        />
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
  const messages = useMessages();
  const page = searchParams?.page || 1;
  return (
    <>
      <Suspense key={page} fallback={<LoadingState text={t("kanjis")} />}>
        <KanjiContainer
          page={page}
          messages={pick(messages, ["modals", "buttons"])}
        />
      </Suspense>
      <SnackBarProvider />
    </>
  );
}
