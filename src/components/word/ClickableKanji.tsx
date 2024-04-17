"use client";

import useModal from "@/hooks/useModal";
import type { MKanji } from "@/types/modals";
import type { $Kanji } from "@/types/models";
import { useState } from "react";

export const ClickableKanji = (kanji: $Kanji) => {
  const { openModal } = useModal();
  const [hover, setHover] = useState(false);

  const showKanjiDetails = () => openModal<MKanji>("kanji-details", { kanji });
  const toggleHover = () => setHover(!hover);

  return (
    <span
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={showKanjiDetails}
      style={{
        color: hover ? "blue" : "inherit",
        cursor: hover ? "pointer" : "inherit",
        fontSize: "inherit",
      }}
    >
      {kanji.value}
    </span>
  );
};
