import isEmpty from "@/lib/utils/isEmpty";
import type { KanjiFormType } from "./schemas/kanji";
import type { z } from "zod";

type ValidationOptions = {
  path: keyof KanjiFormType;
  values: string[] | undefined | null;
  checkFct: (s: string) => boolean;
  ctx: z.RefinementCtx;
  required?: boolean;
};

export const validateListValues = ({
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
      params: { indexes: valuesErrorIdx?.length ? valuesErrorIdx : [0] },
    });
  }
};
