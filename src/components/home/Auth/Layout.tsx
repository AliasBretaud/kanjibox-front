import { getKanjis } from "@/lib/actions/kanji";
import KanjiList from "@/components/kanji/KanjiList";
import { useTranslations } from "next-intl";
import SearchBar from "./SearchBar";
import WelcomeMessage from "./WelcomeMessage";
import { Suspense } from "react";
import { LoadingState } from "@/components/ui/LoadingState";
import { EditKanjiModal } from "@/components/kanji/modals/EditKanjiModal";

const KanjiContainer = async ({ search }: { search?: string }) => {
  const kanjis = await getKanjis(8, 0, search);
  return <KanjiList data={kanjis.content} />;
};

const AuthLayout = ({ query }: { query: string }) => {
  const t = useTranslations("loading");
  return (
    <>
      <SearchBar />
      {!query ? <WelcomeMessage /> : null}
      <Suspense key={query} fallback={<LoadingState text={t("kanjis")} />}>
        <KanjiContainer search={query} />
      </Suspense>
      <EditKanjiModal />
    </>
  );
};

export default AuthLayout;
