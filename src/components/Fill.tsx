import { Chip } from "./ui/Chip";
import { Section, SectionHead } from "./ui/Section";
import { previewFills } from "@/lib/data";

/**
 * The notification a holder gets when a payout lands. It is the one piece of
 * this site people will screenshot, so it carries its PREVIEW label inside
 * the card itself — a crop of the card is still labelled.
 */
function FillCard({
  symbol,
  shares,
  amountUsd,
}: {
  symbol: string;
  shares: string;
  amountUsd: number;
}) {
  return (
    <div className="panel overflow-hidden">
      <div className="panel-head">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1 w-1 rounded-full bg-phos" />
          Payout
        </span>
        <Chip tone="muted">Preview</Chip>
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-fg">
            {symbol}
          </p>
          <p className="num mt-1 whitespace-nowrap text-[11px] text-fg-faint">
            {shares} {symbol === "BASKET" ? "pro rata" : "tokens"}
          </p>
        </div>
        <p className="num text-[22px] leading-none text-phos sm:text-[26px]">
          ${amountUsd.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export function Fill() {
  return (
    <Section id="fill">
      <SectionHead
        index="06"
        title="What a payout looks like"
        aside={<Chip tone="muted">Not real events</Chip>}
      />

      <div className="grid gap-4 sm:grid-cols-3" data-reveal>
        {previewFills.map((fill) => (
          <FillCard key={fill.id} {...fill} />
        ))}
      </div>

      <p className="prose-sans mt-4 max-w-[76ch] text-[12px] leading-relaxed text-fg-faint">
        Three sample cards, drawn from nothing. They exist to show the shape of
        the notification, and they keep the PREVIEW label inside the frame so a
        cropped screenshot still says so.
      </p>
    </Section>
  );
}
