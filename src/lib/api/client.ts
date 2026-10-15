import { apiBaseUrl } from "@/lib/config";
import { signOutToLogin } from "@/lib/auth/session";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  formData?: FormData;
  token?: string;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, formData, token, headers, ...rest } = options;
  const url = `${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const payload = formData ?? (body !== undefined ? JSON.stringify(body) : undefined);

  const response = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && formData === undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: payload,
  });

  const text = await response.text();
  const data = text.length > 0 ? parseJson(text) : null;

  if (!response.ok) {
    // Authenticated call rejected — token expired / invalid. Kick to sign in.
    if (response.status === 401 && token) {
      signOutToLogin("expired");
    }
    const message = readErrorMessage(data) ?? (response.statusText || "Request failed");
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

function readErrorMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;

  if ("message" in data && typeof data.message === "string") return data.message;

  if (!("detail" in data)) return null;
  const detail = data.detail;
  if (typeof detail === "string") return detail;
  if (!Array.isArray(detail)) return null;

  const messages = detail.flatMap((item) => {
    if (typeof item !== "object" || item === null || !("msg" in item)) return [];
    return typeof item.msg === "string" ? [item.msg] : [];
  });
  return messages.length > 0 ? messages.join(" ") : null;
}
