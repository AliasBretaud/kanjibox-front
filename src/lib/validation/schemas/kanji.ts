import { z } from "zod";
import { isHiragana, isJapanese, isKanji, isKatakana } from "wanakana";
import isEmpty from "@/lib/utils/isEmpty";

type ValidationOptions = {
  path: keyof KanjiFormType;
  values: string[] | undefined | null;
  checkFct: (s: string) => boolean;
  ctx: z.RefinementCtx;
  required?: boolean;
};

export const kanjiSchema = z
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

const validateListValues = ({
  path,
  values,
  checkFct,
  ctx,
  required = false,
}: ValidationOptions) => {
  const valuesErrorIdx = values?.reduce((acc, s, i) => {
    if (isEmpty(s) && !required) return acc;
    if (isEmpty(s) || !checkFct(s)) acc.push(i);
    return acc;
  }, [] as number[]);

  if ((required && !values?.length) || valuesErrorIdx?.length) {
    ctx.addIssue({
      message: path,
      path: [path],
      code: "custom",
      params: { indexes: valuesErrorIdx },
    });
  }
};

export type KanjiFormType = z.infer<typeof kanjiSchema>;
