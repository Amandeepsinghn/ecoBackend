import { api } from "@/lib/api/client";
import { paths } from "@/lib/api/paths";
import type { Product, ProfileUpdate, UserProfile } from "@/lib/api/types";
import { requireToken } from "@/lib/auth/session";

export async function getProfile() {
  return api<UserProfile>(paths.users.profile, { token: requireToken() });
}

export async function updateProfile(body: ProfileUpdate) {
  return api<UserProfile>(paths.users.profile, {
    method: "PATCH",
    body,
    token: requireToken(),
  });
}

export async function getProducts() {
  return api<Product[]>(paths.users.products, { token: requireToken() });
}

export async function getProduct(productId: number) {
  return api<Product>(paths.users.product(productId), { token: requireToken() });
}
