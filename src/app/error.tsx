"use client";

/**
 * Same reason as not-found: the framework's fallback renders dark text on a
 * dark layout, so a crash would look like a blank page rather than an error.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start px-4 py-32 sm:px-6">
      <p className="label text-down">Error</p>
      <h1 className="mt-4 text-[clamp(2rem,7vw,4rem)] font-bold uppercase leading-none tracking-[-0.02em] text-fg">
        Something broke
      </h1>
      <p className="prose-sans mt-5 max-w-[52ch] text-[14px] leading-relaxed text-fg-dim">
        This page failed to render. Nothing was signed, sent or stored — this
        site holds no funds and writes nothing onchain.
      </p>
      {error.digest && (
        <p className="num mt-3 text-[11px] text-fg-faint">
          digest {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-rule-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg transition hover:border-phos/50 hover:text-phos"
      >
        Try again
      </button>
    </div>
  );
}
