import Link from "next/link";

/**
 * Next's default 404 renders black text; on a black layout that is an
 * invisible page and a dead-looking link. Always ship one of these.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start px-4 py-32 sm:px-6">
      <p className="label text-amber">404</p>
      <h1 className="mt-4 text-[clamp(2rem,7vw,4rem)] font-bold uppercase leading-none tracking-[-0.02em] text-fg">
        No such route
        <span aria-hidden className="ml-1 text-phos animate-blink">
          _
        </span>
      </h1>
      <p className="prose-sans mt-5 max-w-[52ch] text-[14px] leading-relaxed text-fg-dim">
        That page does not exist on this site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-rule-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg transition hover:border-phos/50 hover:text-phos"
      >
        <span aria-hidden>←</span> Back to the terminal
      </Link>
    </div>
  );
}
