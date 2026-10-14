const fallbackApiUrl = "/backend";

export const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL ?? fallbackApiUrl
).replace(/\/$/, "");
