"use client";

import useModal from "@/hooks/useModal";
import BaseModal from "@/components/ui/BaseModal";
import type { $Kanji, MKanji } from "@/types";
import KanjiCard from "@/components/kanji/KanjiCard";
import { useLocale } from "next-intl";

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
