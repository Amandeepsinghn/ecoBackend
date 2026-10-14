import type { TokenResponse } from "@/lib/api/types";
import { useSyncExternalStore } from "react";

const storageKey = "eco.session";
export const sessionEvent = "eco-session";

export type Session = {
  accessToken: string;
  tokenType: string;
  role: string;
};

let sessionCache: Session | null = null;
let sessionLoaded = false;

function readSession(): Session | null {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Session;
    return parsed.accessToken ? parsed : null;
  } catch {
    return null;
  }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  if (!sessionLoaded) {
    sessionLoaded = true;
    sessionCache = readSession();
  }
  return sessionCache;
}

export function setSession(token: TokenResponse) {
  sessionCache = {
    accessToken: token.access_token,
    tokenType: token.token_type,
    role: token.role,
  };
  sessionLoaded = true;
  window.localStorage.setItem(storageKey, JSON.stringify(sessionCache));
  window.dispatchEvent(new Event(sessionEvent));
}

export function clearSession() {
  sessionCache = null;
  sessionLoaded = true;
  window.localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(sessionEvent));
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    sessionCache = readSession();
    sessionLoaded = true;
    onStoreChange();
  };
  window.addEventListener(sessionEvent, onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(sessionEvent, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSession() {
  return useSyncExternalStore(subscribe, getSession, () => null);
}

export function isAdmin(session: Session | null) {
  return session?.role.toLowerCase() === "admin";
}

export function requireToken() {
  const session = getSession();
  if (!session) {
    throw new Error("Sign in required.");
  }
  return session.accessToken;
}
