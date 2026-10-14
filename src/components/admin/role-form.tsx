"use client";

import { errorMessage, updateUserRole } from "@/lib/api";
import type { AdminUser } from "@/lib/api/types";
import { inputClass, labelClass, primaryButton } from "@/components/ui";
import { useState } from "react";

export function RoleForm() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    setUser(null);
    try {
      const updated = await updateUserRole(Number(form.get("user_id")), {
        is_admin: form.get("is_admin") === "on",
      });
      setUser(updated);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4 rounded-[28px] bg-soft p-6 sm:p-8">
      <label className={labelClass}>
        <span>User id</span>
        <input required type="number" name="user_id" min={1} step={1} className={inputClass} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_admin" />
        Admin
      </label>
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Saving…" : "Update role"}
      </button>
      {user ? (
        <p className="text-sm text-muted">
          {user.user_name} is {user.is_admin ? "an admin" : "not an admin"}.
        </p>
      ) : null}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </form>
  );
}
