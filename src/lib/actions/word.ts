"use server";

import { get, post } from "./api";
import { getFormDataField } from "@/lib/utils/getFormDataField";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { type WordFormType, wordSchema } from "@/lib/validation/schemas/word";
import { getCookiesLocaleOrDefault } from "@/lib/utils/getCookiesLocaleOrDefault";
import validateSchema from "@/lib/validation/validateSchema";
import type { FormState } from "@/types/form";
import type { $Word } from "@/types/models";
import type { Page } from "@/types/api";
import { getFormDataFieldList } from "@/lib/utils/getFormDataFieldList";

const WORD_ENDPOINT = `${process.env.BACKEND_API_URL}/words`;

export const getWords = async (
  limit?: number,
  page?: number,
  search?: string,
) => {
  const params = new URLSearchParams();
  if (limit) {
    params.append("size", limit.toString());
  }
  if (page) {
    params.append("page", (page - 1).toString());
  }
  if (search) {
    params.append("search", search);
  }
  const res = await get(WORD_ENDPOINT, params, ["words"]);

  return (await res.json()) as Page<$Word>;
};

export const addWord = async (
  _: unknown,
  data: FormData,
): Promise<FormState<WordFormType>> => {
  const parsedWord = parseWordFormData(data);

  const validation = validateSchema<WordFormType>(wordSchema, parsedWord);
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  const locale = getCookiesLocaleOrDefault(cookies());
  const word = buildWord(parsedWord, locale);

  try {
    const response = await post(WORD_ENDPOINT, word);
    if (response.ok) {
      const createdWord: $Word = await response.json();
      revalidateTag("words");
      if (createdWord.kanjis?.length) {
        revalidateTag("kanjis");
      }
      return { apiResponse: { isSuccess: true } };
    }
    throw new Error("API request error", { cause: await response.json() });
  } catch (error) {
    console.error(error);
    return { apiResponse: { isError: true } };
  }
};

const parseWordFormData = (data: FormData): Required<WordFormType> => ({
  value: getFormDataField<$Word>(data, "value"),
  furiganaValue: getFormDataField<$Word>(data, "furiganaValue"),
  translations: getFormDataFieldList<$Word>(data, "translations"),
});

const buildWord = (
  { value, furiganaValue, translations }: Required<WordFormType>,
  locale: string,
): $Word => ({
  value,
  furiganaValue,
  translations: { [locale]: translations },
});
