"use server";

import { revalidatePath } from "next/cache";

import getFormDataField from "@/lib/utils/getFormDataField";
import type { $Kanji, FormState, Page } from "@/types";
import { get, post } from "./api";

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
  const res = await get(KANJI_ENDPOINT, params);

  return (await res.json()) as Page<$Kanji>;
};

export const getKanji = async (id: number) => {
  const res = await get(`${KANJI_ENDPOINT}/${id}`);
  return await res.json();
};

export const addKanji = async (
  _: FormState,
  data: FormData,
): Promise<FormState> => {
  const kanji: $Kanji = { value: getFormDataField<$Kanji>(data, "value") };
  const autoDetectReadings = data.get("autoDetectReadings") === "on";

  if (!autoDetectReadings) {
    kanji.kunYomi = getFormDataField<$Kanji>(data, "kunYomi").split(";");
    kanji.onYomi = getFormDataField<$Kanji>(data, "onYomi").split(";");
    const translations = getFormDataField<$Kanji>(data, "translations").split(
      ";",
    );
    kanji.translations = { en: translations };
  }

  try {
    const params = new URLSearchParams({
      autoDetectReadings: autoDetectReadings.toString(),
    });
    const response = await post(KANJI_ENDPOINT, kanji, params);
    if (response.ok) {
      revalidatePath("/kanjis");
      revalidatePath("/");
      return { isSuccess: true };
    }
    throw new Error("API request error", { cause: await response.json() });
  } catch (error) {
    console.error(error);
    return { isError: true };
  }
};
