export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 6h2l1.4 9.2a1.5 1.5 0 0 0 1.5 1.3h7.8a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19.5" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="19.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 20s-6.5-4.1-8.7-8A4.8 4.8 0 0 1 12 6.4 4.8 4.8 0 0 1 20.7 12c-2.2 3.9-8.7 8-8.7 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 7h11v8H3V7zm11 2h4l3 3v3h-7V9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6.5A3 3 0 0 1 15 6.5V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
