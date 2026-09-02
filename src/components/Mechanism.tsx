import { Section, SectionHead } from "./ui/Section";
import { siteConfig } from "@/lib/site-config";

const steps = [
  {
    index: "01",
    title: "Trade",
    body: `Someone buys or sells ${siteConfig.ticker}. That is the only event the mechanism needs.`,
  },
  {
    index: "02",
    title: "Fee",
    body: "A fixed cut of the trade goes to the router contract instead of to a person.",
  },
  {
    index: "03",
    title: "Swap",
    body: "The router buys the tokenized equity each holder selected — on the same chain, in the same transaction path.",
  },
  {
    index: "04",
    title: "Credit",
    body: "Holders are credited pro rata to their balance, in the asset they picked. No staking, no lockup, no vote.",
  },
];

export function Mechanism() {
  return (
    <Section id="mechanism">
      <SectionHead index="02" title="Mechanism" />

      <div
        className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4"
        data-reveal
      >
        {steps.map((step) => (
          <div key={step.index} className="bg-panel p-5 sm:p-6">
            <span className="label text-phos">{step.index}</span>
            <h3 className="mt-3 text-[15px] font-semibold uppercase tracking-[0.16em] text-fg">
              {step.title}
            </h3>
            <p className="prose-sans mt-2.5 text-[13px] leading-relaxed text-fg-dim">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <p className="prose-sans mt-5 max-w-[72ch] text-[12px] leading-relaxed text-fg-faint">
        That is the whole design. Two things in it are still contract decisions
        and are written nowhere on this site as if they were settled: the size
        of the fee, and whether a credit is pushed to every holder or claimed
        by them. Pushing to every wallet costs gas that scales with the holder
        count; claiming does not, but it leaves value unclaimed. Whichever is
        chosen will be visible in the contract before launch.
      </p>
    </Section>
  );
}
