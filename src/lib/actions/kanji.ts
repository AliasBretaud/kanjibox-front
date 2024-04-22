"use server";

import { getFormDataField } from "@/lib/utils/getFormDataField";
import { get, post } from "./api";
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
  const kanji = buildKanji(parsedKanji, locale);
  const autoDetectReadings = parsedKanji.autoDetectReadings.toString();
  const preview = stringToBoolean(data.get("preview")?.toString());

  try {
    const params = new URLSearchParams({
      autoDetectReadings,
      preview: preview.toString(),
    });
    const response = await post(KANJI_ENDPOINT, kanji, params);
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
  const validation = validateSchema(kanjiSchema, {
    ...kanji,
  });
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

const parseKanjiFormData = (data: FormData): RequiredProps<KanjiFormType> => ({
  value: getFormDataField<KanjiFormType>(data, "value"),
  autoDetectReadings:
    getFormDataField<KanjiFormType>(data, "autoDetectReadings") === "on",
  onYomi: getFormDataFieldList<KanjiFormType>(data, "onYomi"),
  kunYomi: getFormDataFieldList<KanjiFormType>(data, "kunYomi"),
  translations: getFormDataFieldList<KanjiFormType>(data, "translations"),
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
) => {
  const kanji: $Kanji = { value, onYomi, kunYomi };
  if (!autoDetectReadings) {
    kanji.translations = { [locale]: translations };
  }
  return kanji;
};
