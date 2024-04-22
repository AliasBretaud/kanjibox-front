"use server";

import { revalidateTag } from "next/cache";

export const handleApiResponse = async (
  response: Response,
  params?: Record<string, unknown>,
  tags?: string[],
) => {
  const body = await response.json();
  if (response.ok) {
    if (tags?.length) {
      tags.forEach(revalidateTag);
    }
    return {
      apiResponse: {
        status: { isSuccess: true },
        data: body,
        params,
      },
    };
  }
  console.error(body);
  return {
    apiResponse: { status: { isError: true } },
  };
};

export const handleApiCallError = (cause: unknown) => {
  console.error(cause);
  throw new Error("API request error", { cause });
};
