import { PanelHead, Section, SectionHead } from "./ui/Section";
import { Chip } from "./ui/Chip";
import { basketWeights, getAsset } from "@/lib/assets";
import { explorer, launchConfig, siteConfig } from "@/lib/site-config";

const UNSET = "—";

interface VerifyRow {
  label: string;
  value: string | null;
  href?: string | null;
}

function addressRow(label: string, value: string | null): VerifyRow {
  return { label, value, href: value ? explorer.address(value) : null };
}

function Row({ label, value, href }: VerifyRow) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-rule px-4 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="label">{label}</span>
      {value === null ? (
        <span className="num text-[12px] text-amber">{UNSET}</span>
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="num break-all text-[12px] text-phos underline decoration-phos/30 underline-offset-4 hover:decoration-phos"
        >
          {value}
        </a>
      ) : (
        <span className="num break-all text-[12px] text-fg">{value}</span>
      )}
    </div>
  );
}

export function Verify() {
  const spy = getAsset("SPY");
  const nvda = getAsset("NVDA");

  const rows: VerifyRow[] = [
    addressRow("Token contract", launchConfig.tokenAddress),
    addressRow("Payout router", launchConfig.routerAddress),
    addressRow("Treasury", launchConfig.treasuryAddress),
    { label: "Fee taken per trade", value: launchConfig.feeDescription },
    { label: "Distribution cadence", value: launchConfig.epochDescription },
    addressRow("SPY token contract", spy.address),
    addressRow("NVDA token contract", nvda.address),
    {
      label: "Basket weights",
      value: basketWeights
        ? basketWeights.map((leg) => `${leg.symbol} ${leg.weight}%`).join(" · ")
        : null,
    },
    {
      label: "Launchpad",
      value: launchConfig.launchpadUrl ? "Open" : null,
      href: launchConfig.launchpadUrl,
    },
  ];

  // Counted, not typed by hand: the chip has to stay true as values fill in.
  const unset = rows.filter((row) => row.value === null).length;

  return (
    <Section id="verify">
      <SectionHead
        index="07"
        title="Verify"
        aside={
          unset > 0 ? (
            <Chip tone="pending">
              {unset} of {rows.length} unset
            </Chip>
          ) : (
            <Chip tone="live">All set</Chip>
          )
        }
      />

      <div className="panel overflow-hidden" data-reveal>
        <PanelHead
          title="Addresses and parameters"
          aside={<span>read-only</span>}
        />
        {rows.map((row) => (
          <Row key={row.label} {...row} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal>
        <div className="panel p-5">
          <p className="label text-phos">Before you trust an address</p>
          <p className="prose-sans mt-2.5 text-[13px] leading-relaxed text-fg-dim">
            No contract address is hardcoded anywhere in this codebase — every
            one comes from configuration and renders as {UNSET} until it is
            filled in. When they do fill in, check them against a second source
            before sending anything. An address on a website is a claim, and
            this one is no more trustworthy than any other.
          </p>
        </div>
        <div className="panel p-5">
          <p className="label text-amber">Status of {siteConfig.name}</p>
          <p className="prose-sans mt-2.5 text-[13px] leading-relaxed text-fg-dim">
            Pre-launch. There is no token, no router, no fee, no distribution
            and no treasury. Anything currently claiming to be{" "}
            {siteConfig.ticker} is not this project. Nothing here is investment
            advice, and a payout funded by trading fees pays nothing when there
            is no trading.
          </p>
        </div>
      </div>
    </Section>
  );
}
