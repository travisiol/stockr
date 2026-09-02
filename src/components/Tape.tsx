import { siteConfig } from "@/lib/site-config";

/**
 * A ticker tape carrying the mechanism, NOT prices.
 *
 * A scrolling tape of symbols with green and red percentages is the obvious
 * thing to build here and it would be fabricated market data on a site whose
 * whole claim is that it doesn't fabricate data. So the tape says what the
 * product does; prices show up when there is an oracle to read them from.
 */
const items = [
  "FEES → BUY → HOLDERS",
  "PAYOUT: SPY · NVDA · BASKET",
  "SAME CHAIN — NO BRIDGE",
  `${siteConfig.ticker} ON ROBINHOOD CHAIN`,
  "YOU PICK THE ASSET",
  "PRE-LAUNCH — NO CONTRACT YET",
];

export function Tape() {
  return (
    <div className="relative overflow-hidden border-y border-rule bg-panel/70">
      <div className="flex w-max animate-tape">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 px-6 py-2.5 text-[10px] uppercase tracking-[0.22em] text-fg-faint"
          >
            {item}
            <span aria-hidden className="text-phos/40">
              {"///"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
