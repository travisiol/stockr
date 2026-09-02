/**
 * EVERY number in this file is zero, and that is the product requirement,
 * not an oversight.
 *
 * The site must never present a fabricated figure as a blockchain
 * statistic. Until the token, the router and an indexer exist, stats stay at
 * 0 / null and the UI renders "AWAITING LAUNCH" instead of a value. When
 * real reads exist, wire them here and flip `LIVE_DATA_ENABLED` — do not
 * seed this file with plausible-looking numbers to make screenshots nicer.
 */
export const LIVE_DATA_ENABLED = false;

export interface TerminalStats {
  distributedUsd: number;
  pendingEpochUsd: number;
  feesCollectedUsd: number;
  volumeUsd: number;
  holders: number;
  routedWallets: number;
}

export const terminalStats: TerminalStats = {
  distributedUsd: 0,
  pendingEpochUsd: 0,
  feesCollectedUsd: 0,
  volumeUsd: 0,
  holders: 0,
  routedWallets: 0,
};

export interface FillEvent {
  id: string;
  symbol: string;
  shares: string;
  amountUsd: number;
}

/**
 * Sample fills used ONLY to preview the notification component. They are
 * labelled PREVIEW in the UI itself and are not derived from any
 * transaction. Do not remove that label when reusing the component.
 */
export const previewFills: FillEvent[] = [
  { id: "preview-1", symbol: "SPY", shares: "0.0412", amountUsd: 24.18 },
  { id: "preview-2", symbol: "NVDA", shares: "0.0067", amountUsd: 8.42 },
  { id: "preview-3", symbol: "BASKET", shares: "—", amountUsd: 112.5 },
];
