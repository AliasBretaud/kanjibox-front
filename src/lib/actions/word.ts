"use server";

import type { $Word, FormState, Page } from "@/types";
import { get, post } from "./api";
import { getFormDataField } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
  const res = await get(WORD_ENDPOINT, params);

  return (await res.json()) as Page<$Word>;
};

export const addWord = async (
  _: FormState,
  data: FormData,
): Promise<FormState> => {
  const value = getFormDataField<$Word>(data, "value");
  const furiganaValue = getFormDataField<$Word>(data, "furiganaValue");
  const translations = {
    en: getFormDataField<$Word>(data, "translations").split(";"),
  };
  const word: $Word = { value, furiganaValue, translations };

  try {
    const response = await post(WORD_ENDPOINT, word);
    if (response.ok) {
      revalidatePath("/words");
      return { isSuccess: true };
    }
    throw new Error("API request error", { cause: await response.json() });
  } catch (error) {
    console.error(error);
    return { isError: true };
  }
};
