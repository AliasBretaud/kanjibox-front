export const buildUrl = (baseUrl: string, params?: URLSearchParams) => {
  const url = new URL(baseUrl);
  if (params) {
    params.forEach((v, k) => url.searchParams.append(k, v));
  }
  return url;
};
