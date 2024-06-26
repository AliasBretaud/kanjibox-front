"use server";

import { getFormDataField } from "@/lib/utils/getFormDataField";
import { fetchDelete, get, patch, post } from "./api";
import { cookies } from "next/headers";
import type { KanjiFormType } from "@/lib/validation/schemas/kanji";
import { kanjiFormSchema, kanjiSchema } from "@/lib/validation/schemas/kanji";
import validateSchema from "@/lib/validation/validateSchema";
import { getCookiesLocaleOrDefault } from "@/lib/utils/getCookiesLocaleOrDefault";
import type { Page } from "@/types/api";
import type { $Kanji } from "@/types/models";
import type { FormState } from "@/types/form";
import type { RequiredProps } from "@/types/utils";
import { getFormDataFieldList } from "@/lib/utils/getFormDataFieldList";
import { handleApiCallError, handleApiResponse } from "@/lib/utils/apiUtils";
import { stringToBoolean } from "@/lib/utils/stringToBoolean";
import { revalidateTag } from "next/cache";

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
  const res = await get(`${KANJI_ENDPOINT}/${id}`, undefined, ["kanjis"]);
  return await res.json();
};

export const addKanjiForm = async (
  _: unknown,
  data: FormData,
): Promise<FormState<KanjiFormType, $Kanji>> => {
  const parsedKanji = parseKanjiFormData(data);
  const validation = validateSchema<KanjiFormType>(
    kanjiFormSchema,
    parsedKanji,
  );
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  const locale = getCookiesLocaleOrDefault(cookies());
  const kanji = buildKanji(parsedKanji, locale === "ja" ? "en" : locale);
  const autoDetect = parsedKanji.autoDetect.toString();
  const preview = stringToBoolean(data.get("preview")?.toString());
  const kanjiId = data.get("id")?.toString();

  try {
    const params = new URLSearchParams({
      autoDetect,
      preview: preview.toString(),
    });
    const response = kanjiId
      ? await patch(`${KANJI_ENDPOINT}/${kanjiId}`, kanji, params)
      : await post(KANJI_ENDPOINT, kanji, params);
    return await handleApiResponse(
      response,
      { preview },
      preview ? undefined : ["kanjis"],
    );
  } catch (error) {
    return handleApiCallError(error);
  }
};

export const addKanji = async (
  kanji: $Kanji,
): Promise<FormState<never, $Kanji>> => {
  const validation = validateSchema(kanjiSchema, kanji);
  if (!validation.success) {
    return { validationErrors: validation.errors };
  }

  try {
    const response = await post(KANJI_ENDPOINT, kanji);
    return await handleApiResponse(response, undefined, ["kanjis"]);
  } catch (error) {
    return handleApiCallError(error);
  }
};

export const deleteKanji = async (kanjiId: number) => {
  try {
    const res = await fetchDelete(`${KANJI_ENDPOINT}/${kanjiId}`);
    if (!res.ok) {
      throw new Error();
    }
    revalidateTag("kanjis");
  } catch (e) {
    throw new Error("Couldn't delete kanji");
  }
};

const parseKanjiFormData = (data: FormData): RequiredProps<KanjiFormType> => ({
  value: getFormDataField<KanjiFormType>(data, "value"),
  autoDetect: getFormDataField<KanjiFormType>(data, "autoDetect") === "on",
  onYomi: getFormDataFieldList<KanjiFormType>(data, "onYomi"),
  kunYomi: getFormDataFieldList<KanjiFormType>(data, "kunYomi"),
  translations: getFormDataFieldList<KanjiFormType>(data, "translations"),
});

const buildKanji = (
  {
    autoDetect,
    value,
    onYomi,
    kunYomi,
    translations,
  }: RequiredProps<KanjiFormType>,
  locale: string,
) => {
  const kanji: $Kanji = { value, onYomi, kunYomi };
  if (!autoDetect) {
    kanji.translations = { [locale]: translations };
  }
  return kanji;
};
