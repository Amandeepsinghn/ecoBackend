"use client";

import { inputClass, labelClass, primaryButton, secondaryButton } from "@/components/ui";
import { errorMessage, getProfile, updateProfile } from "@/lib/api";
import type { UserProfile } from "@/lib/api/types";
import { clearSession, useSession } from "@/lib/auth/session";
import { formatCredit } from "@/lib/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProfileView() {
  const session = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    getProfile()
      .then((data) => {
        if (!ignore) setProfile(data);
      })
      .catch((caught) => {
        if (!ignore) setError(errorMessage(caught));
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>{" "}
        to view your profile.
      </div>
    );
  }

  if (error && !profile) return <p className="text-sm text-accent">{error}</p>;
  if (!profile) return <p className="text-sm text-muted">Loading profile…</p>;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const userName = String(form.get("user_name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const currentPassword = String(form.get("current_password") ?? "");
    const newPassword = String(form.get("new_password") ?? "");
    setPending(true);
    setNotice(null);
    setError(null);

    try {
      const updated = await updateProfile({
        user_name: userName || null,
        email: email || null,
        current_password: newPassword ? currentPassword : null,
        new_password: newPassword || null,
      });
      setProfile(updated);
      setNotice("Profile updated.");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-lg min-w-0 space-y-5">
      <div className="rounded-[24px] bg-sand px-5 py-5 sm:rounded-[28px] sm:px-8 sm:py-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-muted">Available credit</p>
            <p className="mt-2 break-words text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
              {profile.credit === null ? "—" : formatCredit(profile.credit)}
            </p>
            <p className="mt-2 text-sm text-muted">
              Used for purchases at checkout and Buy now.
            </p>
          </div>
          {profile.is_admin ? (
            <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold">
              Admin
            </span>
          ) : null}
        </div>
      </div>

      <div className="rounded-[24px] bg-soft p-5 sm:rounded-[28px] sm:p-8">
        <p className="break-words text-base font-semibold tracking-tight">{profile.user_name}</p>
        <p className="mt-1 break-all text-sm text-muted">{profile.email}</p>
        <form
          key={`${profile.user_name}-${profile.email}`}
          onSubmit={onSubmit}
          className="mt-8 flex flex-col gap-4"
        >
          <label className={labelClass}>
            <span>Username</span>
            <input name="user_name" defaultValue={profile.user_name} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span>Email</span>
            <input type="email" name="email" defaultValue={profile.email} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span>Current password</span>
            <input
              type="password"
              name="current_password"
              autoComplete="current-password"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            <span>New password</span>
            <input
              type="password"
              name="new_password"
              autoComplete="new-password"
              className={inputClass}
            />
          </label>
          <button type="submit" disabled={pending} className={primaryButton}>
            {pending ? "Saving…" : "Save profile"}
          </button>
          <button
            type="button"
            onClick={() => {
              clearSession();
              router.push("/login");
            }}
            className={secondaryButton}
          >
            Sign out
          </button>
        </form>
        {notice ? <p className="mt-3 text-sm text-muted">{notice}</p> : null}
        {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
      </div>
    </div>
  );
}
