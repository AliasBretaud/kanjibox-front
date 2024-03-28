"use client";

import useModal from "@/hooks/useModal";
import type { MKanji } from "@/types";
import AddButton from "@/components/ui/AddButton";

const AddKanjiButton = () => {
  const { openModal } = useModal();

  const handleClickOpen = () => {
    openModal<MKanji>("addKanji");
  };

  return <AddButton onClick={handleClickOpen}>Ajouter un Kanji</AddButton>;
};

export default AddKanjiButton;
