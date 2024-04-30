"use server";

import { fetchDelete, get, post } from "./api";
import { getFormDataField } from "@/lib/utils/getFormDataField";
import { cookies } from "next/headers";
import {
  type WordFormType,
  wordFormSchema,
  wordSchema,
} from "@/lib/validation/schemas/word";
import { getCookiesLocaleOrDefault } from "@/lib/utils/getCookiesLocaleOrDefault";
import validateSchema from "@/lib/validation/validateSchema";
import type { FormState } from "@/types/form";
import type { $Word } from "@/types/models";
import type { Page } from "@/types/api";
import { getFormDataFieldList } from "@/lib/utils/getFormDataFieldList";
import { isKana } from "wanakana";
import { handleApiCallError, handleApiResponse } from "@/lib/utils/apiUtils";
import { stringToBoolean } from "@/lib/utils/stringToBoolean";
import { revalidateTag } from "next/cache";

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

export const addWordForm = async (
  _: unknown,
  data: FormData,
): Promise<FormState<WordFormType, $Word>> => {
  const parsedWord = parseWordFormData(data);

  const validation = validateSchema<WordFormType>(wordFormSchema, parsedWord);
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  const locale = getCookiesLocaleOrDefault(cookies());
  const word = buildWord(parsedWord, locale === "ja" ? "en" : locale);
  const preview = stringToBoolean(data.get("preview")?.toString());

  try {
    const params = new URLSearchParams({
      preview: preview.toString(),
    });
    const response = await post(WORD_ENDPOINT, word, params);
    const tags = preview ? undefined : await getRevalidationTags(response);
    return await handleApiResponse(response, { preview }, tags);
  } catch (error) {
    return handleApiCallError(error);
  }
};

export const addWord = async (
  word: $Word,
): Promise<FormState<never, $Word>> => {
  const validation = validateSchema(wordSchema, word);
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  try {
    const response = await post(WORD_ENDPOINT, word);
    const tags = await getRevalidationTags(response);
    return await handleApiResponse(response, undefined, tags);
  } catch (error) {
    return handleApiCallError(error);
  }
};

export const deleteWord = async (word: $Word) => {
  try {
    await fetchDelete(`${WORD_ENDPOINT}/${word.id}`);
    revalidateTag("words");
    if (word.kanjis?.length) {
      revalidateTag("kanjis");
    }
  } catch (e) {
    throw new Error("Couldn't delete word");
  }
};

const getRevalidationTags = async (response: Response) => {
  const createdWord: $Word = await response.clone().json();
  const tags = ["words"];
  if (createdWord.kanjis?.length) {
    tags.push("kanjis");
  }
  return tags;
};

const parseWordFormData = (data: FormData): Required<WordFormType> => ({
  value: getFormDataField<WordFormType>(data, "value"),
  autoDetect: getFormDataField<WordFormType>(data, "autoDetect") === "on",
  furiganaValue: getFormDataField<WordFormType>(data, "furiganaValue"),
  translations: getFormDataFieldList<WordFormType>(data, "translations"),
});

const buildWord = (
  { value, furiganaValue, translations }: Required<WordFormType>,
  locale: string,
): $Word => ({
  value,
  furiganaValue: isKana(value) ? undefined : furiganaValue || undefined,
  translations: { [locale]: translations },
});
