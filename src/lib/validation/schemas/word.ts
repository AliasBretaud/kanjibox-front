import { z } from "zod";
import { isHiragana, isJapanese, isKana } from "wanakana";
import { validateListValues } from "@/lib/validation/validateListValues";
import isEmpty from "@/lib/utils/isEmpty";

const valueValidation = z
  .string()
  .min(2, "value")
  .refine((s) => isJapanese(s), "value");

export const wordSchema = z.object({
  value: valueValidation,
  furiganaValue: z
    .string()
    .refine((val) => isHiragana(val))
    .optional(),
  translations: z.record(z.array(z.string())),
});

export const wordFormSchema = z
  .object({
    value: valueValidation,
    autoDetect: z.boolean(),
    furiganaValue: z.string().optional().nullable(),
    translations: z.string().array().optional(),
  })
  .superRefine(({ autoDetect, furiganaValue, translations, value }, ctx) => {
    if (!autoDetect) {
      validateFuriganaValue(value, furiganaValue, ctx);
      validateListValues({
        path: "translations",
        values: translations,
        checkFct: (s) => !isJapanese(s),
        ctx,
        required: true,
      });
    }
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

export type WordFormType = z.infer<typeof wordFormSchema>;
