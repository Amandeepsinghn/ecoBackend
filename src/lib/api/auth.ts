import { api } from "@/lib/api/client";
import { paths } from "@/lib/api/paths";
import type { TokenResponse, UserCreate, UserLogin, UserResponse } from "@/lib/api/types";
import { requireToken } from "@/lib/auth/session";

export async function register(body: UserCreate) {
  return api<UserResponse>(paths.auth.register, { method: "POST", body });
}

export async function login(body: UserLogin) {
  return api<TokenResponse>(paths.auth.login, { method: "POST", body });
}

export async function getMe() {
  return api<UserResponse>(paths.auth.me, { token: requireToken() });
}
