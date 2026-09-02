import { Section, SectionHead } from "./ui/Section";
import { Chip } from "./ui/Chip";

const rows = [
  {
    label: "Where the reward asset lives",
    offchain: "Another chain, or off it entirely",
    here: "Issued on Robinhood Chain",
  },
  {
    label: "Steps to reach your wallet",
    offchain: "Swap, bridge, wrap, then transfer",
    here: "Swap, then transfer",
  },
  {
    label: "Extra contracts trusted on the payout leg",
    offchain: "Bridge and wrapper",
    here: "None",
  },
  {
    label: "What a bridge outage does to a payout",
    offchain: "Stops it",
    here: "Nothing — there is no bridge",
  },
];

export function NoBridge() {
  return (
    <Section id="no-bridge">
      <SectionHead
        index="03"
        title="Why there is no bridge"
        aside={<Chip tone="live">0 bridges</Chip>}
      />

      <div
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
        data-reveal
      >
        <p className="prose-sans max-w-[52ch] text-[14px] leading-relaxed text-fg-dim">
          A reward token that pays out in gold has to reach the gold: it lives
          somewhere else, so the payout leg picks up a bridge, a wrapper, and
          two more contracts that can fail while your reward is inside them.
          <br />
          <br />
          So the condition every payout asset here has to meet is simple: it
          is issued on Robinhood Chain itself. Meet it, and the asset being
          paid out and the token being traded sit on the same chain — the
          router swaps and sends, and that is the end of the path. Each
          asset&rsquo;s contract is published in [06] before it can be
          selected, which is how you check the condition rather than take
          our word for it.
        </p>

        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-px bg-rule">
            <div className="bg-panel-2 p-3 text-[10px] uppercase tracking-[0.14em] text-fg-faint">
              &nbsp;
            </div>
            <div className="bg-panel-2 p-3 text-[10px] uppercase tracking-[0.14em] text-fg-faint">
              Off-chain asset
            </div>
            <div className="bg-panel-2 p-3 text-[10px] uppercase tracking-[0.14em] text-phos">
              This design
            </div>

            {rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="bg-panel p-3 text-[11px] leading-snug text-fg-dim">
                  {row.label}
                </div>
                <div className="bg-panel p-3 text-[11px] leading-snug text-fg-faint">
                  {row.offchain}
                </div>
                <div className="bg-panel p-3 text-[11px] leading-snug text-fg">
                  {row.here}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-l-2 border-amber/50 bg-amber-soft/40 px-5 py-4">
        <p className="label text-amber">What this does not remove</p>
        <p className="prose-sans mt-2 max-w-[80ch] text-[13px] leading-relaxed text-fg-dim">
          A tokenized equity is a claim on a share, not a share. Removing the
          bridge removes bridge risk and nothing else: the issuer still holds
          the underlying, redemption still runs on their terms, the price still
          follows a market that keeps its own hours, and holding a token that
          pays out securities exposure is treated differently in different
          places. Those risks belong to the asset, not to the route, and this
          design does not touch them.
        </p>
      </div>
    </Section>
  );
}
