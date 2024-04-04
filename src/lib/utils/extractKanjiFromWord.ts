import type { $Kanji } from "@/types/models";
import { isKanji } from "wanakana";

export const extractKanjiFromWord = (char: string, wordKanjis?: $Kanji[]) =>
  isKanji(char) && wordKanjis?.length
    ? wordKanjis.find((k) => k.value === char)
    : null;
