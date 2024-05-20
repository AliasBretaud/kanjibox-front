"use server";

import { buildUrl } from "@/lib/utils/buildUrl";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { cleanObject } from "@/lib/utils/cleanObject";

const withAuth = async (url: string | URL, request: RequestInit = {}) => {
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
  return await withAuth(urlWithParams, {
    cache: tags?.length ? "force-cache" : "no-store",
    next: { tags },
  });
};

const save = async (
  url: string,
  method: "POST" | "PATCH",
  body?: Record<string, unknown>,
  params?: URLSearchParams,
) => {
  const urlWithParams = buildUrl(url, params);
  return await withAuth(urlWithParams, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
};

export const post = async (
  url: string,
  body?: Record<string, unknown>,
  params?: URLSearchParams,
) => save(url, "POST", body, params);

export const patch = async (
  url: string,
  body: Record<string, unknown>,
  params?: URLSearchParams,
) => {
  const patch = cleanObject(body);
  return save(url, "PATCH", patch, params);
};

export const fetchDelete = async (url: string, params?: URLSearchParams) => {
  const urlWithParams = buildUrl(url, params);
  return await withAuth(urlWithParams, { method: "DELETE" });
};
