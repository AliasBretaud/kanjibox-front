"use server";

import { buildUrl } from "@/lib/utils/buildUrl";
import { getAccessToken } from "@auth0/nextjs-auth0";

const withAuth = async (url: string | URL, request: RequestInit) => {
  const { accessToken } = await getAccessToken();
  if (!accessToken) {
    throw new Error(`Requires authorization`);
  }
  const initHeaders = request.headers || {};
  const headers = {
    ...initHeaders,
    ["Authorization"]: `Bearer ${accessToken}`,
  };
  return await fetch(url, { ...request, headers });
};

export const get = async (
  url: string,
  params?: URLSearchParams,
  tags?: string[],
) => {
  const urlWithParams = buildUrl(url, params);
  return await withAuth(urlWithParams, { next: { tags } });
};

export const post = async (
  url: string,
  body: unknown,
  params?: URLSearchParams,
) => {
  const urlWithParams = buildUrl(url, params);
  return await withAuth(urlWithParams, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
