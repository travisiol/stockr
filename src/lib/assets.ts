import { envOrNull } from "./site-config";

/**
 * The payout assets a holder can route their share into.
 *
 * These are TOKENIZED equities issued on Robinhood Chain — that is the whole
 * point of the design: the reward asset already lives on the chain the token
 * trades on, so a payout is one transfer, not a bridge.
 *
 * Contract addresses are NOT hardcoded. I could not verify the canonical
 * token addresses for any tokenized equity on Robinhood Chain from this
 * environment, and a wrong address here would send real fees to the wrong
 * contract. They come from env or they stay null and the UI says so.
 */
export type PayoutId = "SPY" | "NVDA" | "BASKET";

export interface PayoutAsset {
  id: PayoutId;
  symbol: string;
  name: string;
  kind: string;
  /** One line, holder-facing: what you actually end up holding. */
  blurb: string;
  /** Token contract on Robinhood Chain, or null until confirmed. */
  address: string | null;
}

export const BASKET_WEIGHTS_ENV = "NEXT_PUBLIC_STOCKR_BASKET_WEIGHTS";

export interface BasketLeg {
  symbol: string;
  weight: number;
}

/**
 * Parses `SPY:50,NVDA:30,QQQ:20` into legs. Returns null unless the string
 * parses cleanly AND the weights total 100 — a basket that doesn't add up is
 * a bug the holder would pay for, so it is treated as "not configured"
 * rather than rendered as-is.
 */
export function parseBasketWeights(raw: string | null): BasketLeg[] | null {
  if (!raw) return null;

  const legs: BasketLeg[] = [];
  for (const part of raw.split(",")) {
    const [symbol, weight] = part.split(":").map((s) => s?.trim());
    const value = Number(weight);
    if (!symbol || !Number.isFinite(value) || value <= 0) return null;
    legs.push({ symbol: symbol.toUpperCase(), weight: value });
  }

  if (legs.length === 0) return null;
  const total = legs.reduce((sum, leg) => sum + leg.weight, 0);
  return Math.abs(total - 100) < 0.001 ? legs : null;
}

export const basketWeights = parseBasketWeights(
  envOrNull(process.env.NEXT_PUBLIC_STOCKR_BASKET_WEIGHTS),
);

export const payoutAssets: PayoutAsset[] = [
  {
    id: "SPY",
    symbol: "SPY",
    name: "S&P 500 index",
    kind: "Tokenized index",
    blurb:
      "The broad-market default. Your share of fees is swapped into the tokenized index and sent to your wallet.",
    address: envOrNull(process.env.NEXT_PUBLIC_STOCKR_ASSET_SPY),
  },
  {
    id: "NVDA",
    symbol: "NVDA",
    name: "NVIDIA",
    kind: "Tokenized single equity",
    blurb:
      "One name, full concentration. Same routing, no diversification — the payout moves with a single company.",
    address: envOrNull(process.env.NEXT_PUBLIC_STOCKR_ASSET_NVDA),
  },
  {
    id: "BASKET",
    symbol: "BASKET",
    name: "Weighted basket",
    kind: "Multi-asset",
    blurb:
      "A fixed split across several tokenized equities, distributed pro rata in one transaction.",
    address: null, // A basket is several transfers, not one contract.
  },
];

export const DEFAULT_PAYOUT: PayoutId = "SPY";

export function getAsset(id: PayoutId): PayoutAsset {
  const asset = payoutAssets.find((a) => a.id === id);
  if (!asset) throw new Error(`Unknown payout asset: ${id}`);
  return asset;
}
