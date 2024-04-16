import { z } from "zod";
import { isHiragana, isJapanese } from "wanakana";
import { validateListValues } from "@/lib/validation/validateListValues";

export const wordSchema = z
  .object({
    value: z
      .string()
      .min(2, "value")
      .refine((s) => isJapanese(s), "value"),
    furiganaValue: z
      .string()
      .min(2, "furiganaValue")
      .refine((s) => isHiragana(s), "furiganaValue"),
    translations: z.string().array().optional(),
  })
  .superRefine(({ translations }, ctx) =>
    validateListValues({
      path: "translations",
      values: translations,
      checkFct: (s) => !isJapanese(s),
      ctx,
      required: true,
    }),
  );

export type WordFormType = z.infer<typeof wordSchema>;
