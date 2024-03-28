"use server";

import type { $Word, Page } from "@/types";
import { get } from "./api";

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
