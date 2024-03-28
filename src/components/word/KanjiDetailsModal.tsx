"use client";

import useModal from "@/hooks/useModal";
import BaseModal from "@/components/ui/BaseModal";
import type { $Kanji, MKanji } from "@/types";
import KanjiCard from "@/components/kanji/KanjiCard";

const KanjiDetailsModal = () => {
  const { modalOptions } = useModal();
  const kanji = modalOptions.kanji as $Kanji;

  return (
    <BaseModal<MKanji> name="kanjiDetails">
      <KanjiCard {...kanji} />
    </BaseModal>
  );
};

export default KanjiDetailsModal;
