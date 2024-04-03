const buildUrl = (baseUrl: string, params?: URLSearchParams) => {
  const url = new URL(baseUrl);
  if (params) {
    params.forEach((v, k) => url.searchParams.append(k, v));
  }
  return url;
};

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
