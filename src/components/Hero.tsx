import { BuyButton } from "./BuyButton";
import { Tape } from "./Tape";
import { Chip } from "./ui/Chip";
import { siteConfig } from "@/lib/site-config";
import { ROBINHOOD_CHAIN_ID } from "@/lib/chain";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 scanlines opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-phos/[0.07] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="rise flex flex-wrap items-center gap-2">
          <Chip tone="muted">Robinhood Chain · {ROBINHOOD_CHAIN_ID}</Chip>
          <Chip tone="pending" dot>
            Pre-launch
          </Chip>
        </div>

        <h1
          className="rise mt-8 text-[clamp(3rem,11vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-fg"
          style={{ animationDelay: "60ms" }}
        >
          {siteConfig.name}
          <span aria-hidden className="ml-1 text-phos animate-blink">
            _
          </span>
        </h1>

        <p
          className="rise mt-6 max-w-[46ch] text-[clamp(0.95rem,2.4vw,1.35rem)] font-medium uppercase leading-tight tracking-[0.02em] text-phos"
          style={{ animationDelay: "120ms" }}
        >
          {siteConfig.tagline}
        </p>

        <p
          className="rise prose-sans mt-6 max-w-[62ch] text-balance text-[15px] leading-relaxed text-fg-dim"
          style={{ animationDelay: "180ms" }}
        >
          {siteConfig.description}
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-start gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <BuyButton />
          <a
            href="#payout"
            className="inline-flex items-center gap-2 rounded-[3px] border border-rule-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg transition hover:border-phos/50 hover:text-phos"
          >
            Pick your payout
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <Tape />
    </section>
  );
}
