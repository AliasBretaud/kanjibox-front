"use server";

import { revalidateTag } from "next/cache";

import getFormDataField from "@/lib/utils/getFormDataField";
import { get, post } from "./api";
import { cookies } from "next/headers";
import formatInputList from "@/lib/utils/formatInputList";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { kanjiSchema } from "@/lib/validation/schemas/kanji";
import validateSchema from "@/lib/validation/validateSchema";
import { getLocaleFromCookiesOrDefault } from "@/lib/utils/getLocaleFromCookiesOrDefault";
import type { Page } from "@/types/api";
import type { $Kanji } from "@/types/models";
import type { FormState } from "@/types/form";
import type { RequiredProps } from "@/types/utils";

const KANJI_ENDPOINT = `${process.env.BACKEND_API_URL}/kanjis`;

export const getKanjis = async (
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
  const res = await get(KANJI_ENDPOINT, params, ["kanjis"]);

  return (await res.json()) as Page<$Kanji>;
};

export const getKanji = async (id: number) => {
  const res = await get(`${KANJI_ENDPOINT}/${id}`);
  return await res.json();
};

export const addKanji = async (
  _: unknown,
  data: FormData,
): Promise<FormState<KanjiFormType>> => {
  const parsedKanji = parseKanjiFormData(data);
  const { autoDetectReadings } = parsedKanji;

  const validation = validateSchema<KanjiFormType>(kanjiSchema, parsedKanji);
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  const locale = getLocaleFromCookiesOrDefault(cookies());
  const kanji = buildKanji(parsedKanji, locale);
  try {
    const params = new URLSearchParams({
      autoDetectReadings: autoDetectReadings.toString(),
    });
    const response = await post(KANJI_ENDPOINT, kanji, params);
    if (response.ok) {
      revalidateTag("kanjis");
      return { apiResponse: { isSuccess: true } };
    }
    throw new Error("API request error", { cause: await response.json() });
  } catch (error) {
    console.error(error);
    return { apiResponse: { isError: true } };
  }
};

const parseKanjiFormData = (data: FormData): RequiredProps<KanjiFormType> => ({
  value: getFormDataField(data, "value"),
  autoDetectReadings: data.get("autoDetectReadings") === "on",
  onYomi: getFormDataField(data, "onYomi"),
  kunYomi: getFormDataField(data, "kunYomi"),
  translations: getFormDataField(data, "translations"),
});

const buildKanji = (
  {
    autoDetectReadings,
    value,
    onYomi,
    kunYomi,
    translations,
  }: RequiredProps<KanjiFormType>,
  locale: string,
): $Kanji => {
  const kanji: $Kanji = { value };
  if (!autoDetectReadings) {
    const translationsFormat = formatInputList(translations);
    kanji.kunYomi = formatInputList(onYomi);
    kanji.onYomi = formatInputList(kunYomi);
    kanji.translations = { [locale]: translationsFormat };
  }

  return kanji;
};
