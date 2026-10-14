import { useSyncExternalStore } from "react";

const storageKey = "eco.cart";
export const cartEvent = "eco-cart";
const emptyCart: CartItem[] = [];

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

let cartCache: CartItem[] = emptyCart;
let cartLoaded = false;

function readCart(): CartItem[] {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return emptyCart;

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : emptyCart;
  } catch {
    return emptyCart;
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return emptyCart;
  if (!cartLoaded) {
    cartLoaded = true;
    cartCache = readCart();
  }
  return cartCache;
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity: number) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.productId === item.productId);
  if (existing) {
    existing.quantity += quantity;
    existing.name = item.name;
    existing.price = item.price;
  } else {
    cart.push({ ...item, quantity });
  }
  saveCart(cart);
}

export function setCartQuantity(productId: number, quantity: number) {
  const cart =
    quantity < 1
      ? getCart().filter((item) => item.productId !== productId)
      : getCart().map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        );
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

function saveCart(cart: CartItem[]) {
  cartCache = [...cart];
  cartLoaded = true;
  window.localStorage.setItem(storageKey, JSON.stringify(cart));
  window.dispatchEvent(new Event(cartEvent));
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    cartCache = readCart();
    cartLoaded = true;
    onStoreChange();
  };
  window.addEventListener(cartEvent, onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(cartEvent, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, getCart, () => emptyCart);
}
