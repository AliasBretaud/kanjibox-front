import { z } from "zod";
import { isHiragana, isJapanese, isKanji, isKatakana } from "wanakana";
import isEmpty from "@/lib/utils/isEmpty";
import { validateListValues } from "@/lib/validation/validateListValues";

export const kanjiSchema = z.object({
  value: z.string().refine((s) => s.length === 1 && isKanji(s), "value"),
  onYomi: z.string().array().optional(),
  kunYomi: z.string().array().optional(),
  translations: z.record(z.array(z.string())).optional(),
});

export const kanjiFormSchema = z
  .object({
    value: z.string().refine((s) => s.length === 1 && isKanji(s), "value"),
    autoDetectReadings: z.boolean(),
    onYomi: z.string().array().nullish(),
    kunYomi: z.string().array().nullish(),
    translations: z.string().array().nullish(),
  })
  .superRefine(({ autoDetectReadings, onYomi, kunYomi, translations }, ctx) => {
    if (!autoDetectReadings) {
      validateListValues({
        path: "translations",
        values: translations,
        checkFct: (s) => !isJapanese(s),
        ctx,
        required: true,
      });
      checkReadings(onYomi, kunYomi, ctx);
    }
  });

const checkReadings = (
  onYomi: KanjiFormType["onYomi"],
  kunYomi: KanjiFormType["kunYomi"],
  ctx: z.RefinementCtx,
) => {
  if (isEmpty(kunYomi) && isEmpty(onYomi)) {
    ctx.addIssue({
      message: "readingRequired",
      path: ["onYomi", "kunYomi"],
      code: "custom",
      params: { indexes: [0] },
    });
  } else {
    validateListValues({
      path: "onYomi",
      values: onYomi,
      checkFct: isKatakana,
      ctx,
    });
    validateListValues({
      path: "kunYomi",
      values: kunYomi,
      checkFct: isHiragana,
      ctx,
    });
  }
};

export type KanjiFormType = z.infer<typeof kanjiFormSchema>;
