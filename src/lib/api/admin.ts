import { api } from "@/lib/api/client";
import { paths } from "@/lib/api/paths";
import type {
  AdminProductCreate,
  AdminProductUpdate,
  AdminRoleUpdate,
  AdminStockUpdate,
  AdminUser,
  Product,
} from "@/lib/api/types";
import { requireToken } from "@/lib/auth/session";

export async function updateUserRole(userId: number, body: AdminRoleUpdate) {
  return api<AdminUser>(paths.admin.userRole(userId), {
    method: "PATCH",
    body,
    token: requireToken(),
  });
}

export async function getAdminProducts() {
  return api<Product[]>(paths.admin.products, { token: requireToken() });
}

export async function createProduct(body: AdminProductCreate) {
  return api<Product>(paths.admin.products, {
    method: "POST",
    body,
    token: requireToken(),
  });
}

export async function getAdminProduct(productId: number) {
  return api<Product>(paths.admin.product(productId), { token: requireToken() });
}

export async function updateProduct(productId: number, body: AdminProductUpdate) {
  return api<Product>(paths.admin.product(productId), {
    method: "PATCH",
    body,
    token: requireToken(),
  });
}

export async function deleteProduct(productId: number) {
  return api<void>(paths.admin.product(productId), {
    method: "DELETE",
    token: requireToken(),
  });
}

export async function updateStock(productId: number, body: AdminStockUpdate) {
  return api<Product>(paths.admin.stock(productId), {
    method: "PATCH",
    body,
    token: requireToken(),
  });
}

export async function uploadProductPhotos(productId: number, files: File[]) {
  const formData = new FormData();
  for (const file of files) formData.append("files", file);
  return api<Product>(paths.admin.photos(productId), {
    method: "POST",
    formData,
    token: requireToken(),
  });
}

export async function deleteProductPhoto(productId: number, photoId: number) {
  return api<void>(paths.admin.photo(productId, photoId), {
    method: "DELETE",
    token: requireToken(),
  });
}
