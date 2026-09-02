import { ChainReadout } from "./ChainReadout";
import { Chip } from "./ui/Chip";
import { PanelHead, Section, SectionHead } from "./ui/Section";
import { LIVE_DATA_ENABLED, terminalStats } from "@/lib/data";

function usd(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

const cells = [
  { label: "Distributed to holders", value: usd(terminalStats.distributedUsd) },
  { label: "Pending this epoch", value: usd(terminalStats.pendingEpochUsd) },
  { label: "Fees collected", value: usd(terminalStats.feesCollectedUsd) },
  { label: "Volume", value: usd(terminalStats.volumeUsd) },
  { label: "Holders", value: terminalStats.holders.toLocaleString("en-US") },
  {
    label: "Wallets with a payout set",
    value: terminalStats.routedWallets.toLocaleString("en-US"),
  },
];

/**
 * Pre-launch, a stat is a shimmering bar and the word AWAITING — never a
 * number. It reads as a live panel waiting on its feed, which is exactly
 * what it is, without ever claiming a figure that isn't true.
 */
function Pending() {
  return (
    <>
      <div className="mt-3 h-7 w-24 animate-sweep rounded-[3px] bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_25%,rgba(242,179,56,0.16)_50%,rgba(255,255,255,0.03)_75%)] bg-[length:200%_100%]" />
      <p className="mt-2 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-amber/80">
        <span aria-hidden className="h-1 w-1 rounded-full bg-amber animate-blink" />
        Awaiting launch
      </p>
    </>
  );
}

export function Terminal() {
  return (
    <Section id="terminal">
      <SectionHead
        index="04"
        title="Terminal"
        aside={
          <Chip tone={LIVE_DATA_ENABLED ? "live" : "pending"} dot>
            {LIVE_DATA_ENABLED ? "Project feed live" : "No project feed yet"}
          </Chip>
        }
      />

      {/* Real data first, so the empty half below is unmistakably empty
          rather than broken. */}
      <div data-reveal>
        <ChainReadout />
      </div>

      <div className="mt-4 panel overflow-hidden" data-reveal>
        <PanelHead
          title="This project's numbers"
          aside={<span>src: indexer — not connected</span>}
        />
        <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell) => (
            <div key={cell.label} className="bg-panel p-5">
              <p className="label">{cell.label}</p>
              {LIVE_DATA_ENABLED ? (
                <p className="num mt-3 text-[26px] leading-none text-phos">
                  {cell.value}
                </p>
              ) : (
                <Pending />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="prose-sans mt-4 max-w-[76ch] text-[12px] leading-relaxed text-fg-faint">
        The top panel is real: your own browser reads it from the Robinhood
        Chain RPC every six seconds, and you can check it against any
        explorer. The chain produces blocks faster than that, so the height
        shown is the last one read rather than the current head — which is
        why the second cell reports the age of the read, not of the block.
        Everything below is zero because nothing has happened yet. Those
        panels fill in from onchain reads once the token and the router
        exist, and stay empty until then: no placeholder numbers, nothing you
        could screenshot and mistake for a result.
      </p>
    </Section>
  );
}
