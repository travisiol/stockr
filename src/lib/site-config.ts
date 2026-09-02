/**
 * The whole brand lives in the three strings at the top of `siteConfig`
 * (`name`, `wordmark`, `ticker`) plus the `NEXT_PUBLIC_STOCKR_*` env prefix.
 * Nothing else in the codebase spells the name out, so a rename is those
 * strings and the prefix — never a grep-and-replace through components.
 */
export const siteConfig = {
  // Placeholder name — stockr.com / .xyz / .app / .trade were all registered
  // when checked by RDAP on 2026-09-02; stockr.fun and stockr.finance were not.
  name: "STOCKR",
  wordmark: "Stockr",
  ticker: "$STOCKR",

  tagline: "HOLD THE TOKEN. GET PAID IN STOCK.",
  description:
    "A Robinhood Chain token whose trading fees buy tokenized equities and route them to holders — in the asset each holder picks. The payout asset is native to the same chain, so nothing is bridged, wrapped, or held for you.",
  seoDescription:
    "Trading fees buy tokenized equities on Robinhood Chain and route them to holders, in the asset each holder picks. No bridge.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stockr.example",
  x: "https://x.com/stockr_onchain",
} as const;

/** Treats both "unset" and "" the same way: not configured yet. */
export function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * Launch surface. Every value here is deliberately env-driven and unset by
 * default: an address that isn't real must never be able to reach a build.
 * `isLive` is the single switch the rest of the app reads — it requires the
 * token AND the router to exist, because either one missing means the
 * mechanism described on this page does not yet run.
 */
const tokenAddress = envOrNull(process.env.NEXT_PUBLIC_STOCKR_TOKEN_ADDRESS);
const routerAddress = envOrNull(process.env.NEXT_PUBLIC_STOCKR_ROUTER_ADDRESS);

export const launchConfig = {
  isLive:
    process.env.NEXT_PUBLIC_STOCKR_LIVE === "true" &&
    tokenAddress !== null &&
    routerAddress !== null,
  tokenAddress,
  /** Contract that swaps collected fees into the payout assets and distributes. */
  routerAddress,
  treasuryAddress: envOrNull(process.env.NEXT_PUBLIC_STOCKR_TREASURY_ADDRESS),
  buyUrl: envOrNull(process.env.NEXT_PUBLIC_STOCKR_BUY_URL),
  launchpadUrl: envOrNull(process.env.NEXT_PUBLIC_STOCKR_LAUNCHPAD_URL),
  /** e.g. "1.5% of every trade" — one line, only once it is actually set. */
  feeDescription: envOrNull(process.env.NEXT_PUBLIC_STOCKR_FEE_DESCRIPTION),
  /** e.g. "every 6 hours" — the distribution cadence, once decided. */
  epochDescription: envOrNull(process.env.NEXT_PUBLIC_STOCKR_EPOCH_DESCRIPTION),
} as const;

export const explorer = {
  base:
    process.env.NEXT_PUBLIC_ROBINHOOD_EXPLORER_URL ??
    "https://robinhoodchain.blockscout.com",
  address(addr: string) {
    return `${this.base}/address/${addr}`;
  },
} as const;
