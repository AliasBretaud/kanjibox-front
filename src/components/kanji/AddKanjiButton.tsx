"use client";

import useModal from "@/hooks/useModal";
import type { MKanji } from "@/types/modals";
import AddButton from "@/components/ui/AddButton";
import { useTranslations } from "next-intl";

const AddKanjiButton = () => {
  const t = useTranslations("buttons");
  const { openModal } = useModal();

  const handleClickOpen = () => {
    openModal<MKanji>("add-kanji");
  };

  return <AddButton onClick={handleClickOpen}>{t("addKanji")}</AddButton>;
};

export default AddKanjiButton;
