"use server";

import { revalidateTag } from "next/cache";

import getFormDataField from "@/lib/utils/getFormDataField";
import type { $Kanji, FormState, Page } from "@/types";
import { get, post } from "./api";
import { cookies } from "next/headers";
import formatInputList from "@/lib/utils/formatInputList";

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
  _: FormState,
  data: FormData,
): Promise<FormState> => {
  const kanji: $Kanji = { value: getFormDataField<$Kanji>(data, "value") };
  const autoDetectReadings = data.get("autoDetectReadings") === "on";
  const locale = cookies().get("NEXT_LOCALE")?.value || "en";

  if (!autoDetectReadings) {
    kanji.kunYomi = formatInputList(getFormDataField<$Kanji>(data, "kunYomi"));
    kanji.onYomi = formatInputList(getFormDataField<$Kanji>(data, "onYomi"));
    const translations = formatInputList(
      getFormDataField<$Kanji>(data, "translations"),
    );
    kanji.translations = { [locale]: translations };
  }

  try {
    const params = new URLSearchParams({
      autoDetectReadings: autoDetectReadings.toString(),
    });
    const response = await post(KANJI_ENDPOINT, kanji, params);
    if (response.ok) {
      revalidateTag("kanjis");
      return { isSuccess: true };
    }
    throw new Error("API request error", { cause: await response.json() });
  } catch (error) {
    console.error(error);
    return { isError: true };
  }
};
