"use client";

import { clsx } from "clsx";
import { launchConfig, siteConfig } from "@/lib/site-config";

/**
 * Disabled until the token exists, and the reason is on the button rather
 * than hidden in a tooltip. A dead-but-pretty Buy button is how a
 * pre-launch site starts lying.
 */
export function BuyButton({ className }: { className?: string }) {
  if (launchConfig.isLive && launchConfig.buyUrl) {
    return (
      <a
        href={launchConfig.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-[3px] bg-phos px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-void transition hover:bg-phos/85",
          className,
        )}
      >
        Buy {siteConfig.ticker}
      </a>
    );
  }

  return (
    <span className={clsx("inline-flex flex-col gap-1.5", className)}>
      <button
        type="button"
        disabled
        aria-describedby="buy-reason"
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-[3px] border border-rule-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-faint"
      >
        <span aria-hidden className="h-1 w-1 rounded-full bg-amber" />
        {siteConfig.ticker} not live
      </button>
      <span id="buy-reason" className="text-[10px] text-fg-faint">
        No token contract yet — this routes to the pair once one exists.
      </span>
    </span>
  );
}
