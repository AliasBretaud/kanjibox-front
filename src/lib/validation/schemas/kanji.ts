import { z } from "zod";
import { isHiragana, isJapanese, isKanji, isKatakana } from "wanakana";
import { validateSplitValue } from "@/lib/validation/validateSplitValue";

export const kanjiSchema = z
  .object({
    value: z.string().refine((s) => s.length === 1 && isKanji(s), "value"),
    autoDetectReadings: z.boolean(),
    onYomi: z.string().nullish(),
    kunYomi: z.string().nullish(),
    translations: z.string().nullish(),
  })
  .superRefine(({ autoDetectReadings, onYomi, kunYomi, translations }, ctx) => {
    if (!autoDetectReadings) {
      if (!onYomi || !validateSplitValue(onYomi, isKatakana)) {
        ctx.addIssue({
          message: "onYomi",
          path: ["onYomi"],
          code: "custom",
        });
      }
      if (!kunYomi || !validateSplitValue(kunYomi, isHiragana)) {
        ctx.addIssue({
          message: "kunYomi",
          path: ["kunYomi"],
          code: "custom",
        });
      }
      if (
        !translations ||
        !validateSplitValue(translations, (s) => !isJapanese(s))
      ) {
        ctx.addIssue({
          message: "translations",
          path: ["translations"],
          code: "custom",
        });
      }
    }
  });

export type KanjiFormType = z.infer<typeof kanjiSchema>;
