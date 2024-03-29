"use client";

import useModal from "@/hooks/useModal";
import type { MWord } from "@/types";
import AddButton from "@/components/ui/AddButton";

const AddWordButton = () => {
  const { openModal } = useModal();

  const handleClickOpen = () => {
    openModal<MWord>("add-word");
  };

  return <AddButton onClick={handleClickOpen}>Ajouter un mot</AddButton>;
};

export default AddWordButton;
