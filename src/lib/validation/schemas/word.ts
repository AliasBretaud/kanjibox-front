import { z } from "zod";
import { isHiragana, isJapanese, isKana } from "wanakana";
import { validateListValues } from "@/lib/validation/validateListValues";
import isEmpty from "@/lib/utils/isEmpty";

export const wordSchema = z
  .object({
    value: z
      .string()
      .min(2, "value")
      .refine((s) => isJapanese(s), "value"),
    furiganaValue: z.string().optional().nullable(),
    translations: z.string().array().optional(),
  })
  .superRefine(({ furiganaValue, translations, value }, ctx) => {
    validateFuriganaValue(value, furiganaValue, ctx);
    validateListValues({
      path: "translations",
      values: translations,
      checkFct: (s) => !isJapanese(s),
      ctx,
      required: true,
    });
  });

const validateFuriganaValue = (
  value: WordFormType["value"],
  furiganaValue: WordFormType["furiganaValue"],
  ctx: z.RefinementCtx,
) => {
  if (
    !isKana(value) &&
    (isEmpty(furiganaValue) || !isHiragana(furiganaValue || undefined))
  ) {
    ctx.addIssue({
      path: ["furiganaValue"],
      message: "furiganaValue",
      code: "custom",
    });
  }
};

export type WordFormType = z.infer<typeof wordSchema>;
