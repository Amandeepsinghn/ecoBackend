"use client";

import { primaryButton, shell } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-24`}>
      <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-3 max-w-lg text-sm text-muted">
        {error.message || "The page failed to load."}
      </p>
      <button type="button" onClick={reset} className={`${primaryButton} mt-6 w-fit`}>
        Try again
      </button>
    </section>
  );
}
