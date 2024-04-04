import { Suspense } from "react";

import AddKanjiForm from "@/components/kanji/AddKanjiForm";
import KanjiList from "@/components/kanji/KanjiList";
import { LoadingState } from "@/components/ui/LoadingState";
import Pagination from "@/components/ui/Pagination";

import { getKanjis } from "@/lib/actions/kanji";
import type { PageParams } from "@/types/utils";
import AddKanjiButton from "@/components/kanji/AddKanjiButton";
import SnackBarProvider from "@/components/ui/SnackBarProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash.pick";

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
      <Pagination pagesCount={kanjis.totalPages} sx={{ paddingTop: "40px" }} />
      <NextIntlClientProvider messages={messages}>
        <AddKanjiButton />
        <AddKanjiForm />
      </NextIntlClientProvider>

      <KanjiList data={kanjis.content} />
    </div>
  );
};

export default function KanjisPage({
  params: { locale },
  searchParams,
}: PageParams<{ locale: string }, { page?: number }>) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = useMessages();
  const page = searchParams?.page || 1;
  return (
    <>
      <Suspense key={page} fallback={<LoadingState text="Loading Kanjis..." />}>
        <KanjiContainer
          page={page}
          messages={pick(messages, ["modals", "buttons"])}
        />
      </Suspense>
      <SnackBarProvider />
    </>
  );
}
