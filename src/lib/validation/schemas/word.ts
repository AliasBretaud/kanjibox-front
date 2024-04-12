import { z } from "zod";
import { isHiragana, isJapanese } from "wanakana";
import { validateSplitValue } from "@/lib/validation/validateSplitValue";

export const wordSchema = z.object({
  value: z
    .string()
    .min(2, "value")
    .refine((s) => isJapanese(s), "value"),
  furiganaValue: z
    .string()
    .min(2, "furiganaValue")
    .refine((s) => isHiragana(s), "furiganaValue"),
  translations: z
    .string()
    .refine((translations) =>
      validateSplitValue(translations, (s) => !isJapanese(s)),
    ),
});

export type WordFormType = z.infer<typeof wordSchema>;
