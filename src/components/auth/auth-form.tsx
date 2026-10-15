"use client";

import { inputClass, labelClass, primaryButton } from "@/components/ui";
import { errorMessage, login, register } from "@/lib/api";
import { setSession } from "@/lib/auth/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthMode = "login" | "register";

function initialLoginNotice(mode: AuthMode) {
  if (mode !== "login" || typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("expired") === "1"
    ? "Session expired. Sign in again."
    : null;
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [notice, setNotice] = useState<string | null>(() => initialLoginNotice(mode));
  const [pending, setPending] = useState(false);
  const isRegister = mode === "register";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setPending(true);
    setNotice(null);

    try {
      if (isRegister) {
        await register({
          user_name: String(form.get("user_name") ?? ""),
          email,
          password,
        });
      }

      const token = await login({ email, password });
      setSession(token);
      router.push(token.role.toLowerCase() === "admin" ? "/admin" : "/");
    } catch (error) {
      setNotice(errorMessage(error));
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-4 rounded-[24px] bg-soft p-5 sm:rounded-[28px] sm:p-8"
    >
      {isRegister ? (
        <label className={labelClass}>
          <span>Username</span>
          <input required name="user_name" autoComplete="username" className={inputClass} />
        </label>
      ) : null}
      <label className={labelClass}>
        <span>Email</span>
        <input required type="email" name="email" autoComplete="email" className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Password</span>
        <input
          required
          type="password"
          name="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          className={inputClass}
        />
      </label>
      <button type="submit" disabled={pending} className={`${primaryButton} sm:w-full`}>
        {pending ? "Please wait…" : isRegister ? "Create account" : "Sign in"}
      </button>
      {notice ? <p className="text-sm text-muted">{notice}</p> : null}
      <p className="text-sm text-muted">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/register" className="font-medium text-foreground underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
