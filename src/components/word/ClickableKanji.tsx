"use client";

import useModal from "@/hooks/useModal";
import type { MKanji } from "@/types/modals";
import type { $Kanji } from "@/types/models";
import { Typography } from "@mui/material";

export const ClickableKanji = (kanji: $Kanji) => {
  const { openModal } = useModal();

  const showKanjiDetails = () => openModal<MKanji>("kanji-details", { kanji });

  return (
    <Typography
      component="span"
      className="!font-kanji"
      fontSize="inherit"
      sx={{ "&:hover": { color: "blue", cursor: "pointer" } }}
      onClick={showKanjiDetails}
    >
      {kanji.value}
    </Typography>
  );
};
