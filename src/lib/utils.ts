import type { $Kanji } from "@/types";

export const isEmpty = (str: string) =>
  str === undefined || str === null || str.trim().length === 0;

export const getKanjiFormDataField = (
  formData: FormData,
  field: keyof $Kanji,
) => formData.get(field) as string;
