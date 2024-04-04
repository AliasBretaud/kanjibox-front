"use client";

import useModal from "@/hooks/useModal";
import BaseModal from "@/components/ui/BaseModal";
import KanjiCard from "@/components/kanji/KanjiCard";
import { useLocale } from "next-intl";
import type { $Kanji } from "@/types/models";
import type { MKanji } from "@/types/modals";

const KanjiDetailsModal = () => {
  const { modalOptions } = useModal();
  const kanji = modalOptions.kanji as $Kanji;
  const locale = useLocale();

  return (
    <BaseModal<MKanji> name="kanji-details">
      <KanjiCard {...kanji} locale={locale} />
    </BaseModal>
  );
};

export default KanjiDetailsModal;
