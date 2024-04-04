"use server";

import { buildUrl } from "@/lib/utils/buildUrl";

export async function get(
  url: string,
  params?: URLSearchParams,
  tags?: string[],
) {
  const urlWithParams = buildUrl(url, params);
  return await fetch(urlWithParams, { next: { tags } });
}

export async function post(
  url: string,
  body: unknown,
  params?: URLSearchParams,
) {
  const urlWithParams = buildUrl(url, params);
  return await fetch(urlWithParams, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
