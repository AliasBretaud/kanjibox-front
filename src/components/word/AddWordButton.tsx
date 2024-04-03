"use client";

import useModal from "@/hooks/useModal";
import type { MWord } from "@/types";
import AddButton from "@/components/ui/AddButton";
import { useTranslations } from "next-intl";

const AddWordButton = () => {
  const t = useTranslations("buttons");
  const { openModal } = useModal();

  const handleClickOpen = () => {
    openModal<MWord>("add-word");
  };

  return <AddButton onClick={handleClickOpen}>{t("addWord")}</AddButton>;
};

export default AddWordButton;
