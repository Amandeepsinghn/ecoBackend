import { api } from "@/lib/api/client";
import { paths } from "@/lib/api/paths";
import type { Order, OrderCreate } from "@/lib/api/types";
import { requireToken } from "@/lib/auth/session";

export async function checkout(body: OrderCreate) {
  return api<Order>(paths.orders.checkout, {
    method: "POST",
    body,
    token: requireToken(),
  });
}
