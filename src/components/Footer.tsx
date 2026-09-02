import { StatusLine } from "./StatusLine";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-8">
      <StatusLine />
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-fg">
            {siteConfig.name}
            <span className="ml-2 text-[10px] tracking-[0.16em] text-phos">
              {siteConfig.ticker}
            </span>
          </p>
          <p className="prose-sans mt-2 max-w-[52ch] text-[12px] leading-relaxed text-fg-faint">
            Pre-launch. No token, no contract, no distribution. Tokenized
            equities are claims issued by a third party, not shares, and
            nothing here is investment advice.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.16em] text-fg-dim">
          <a href="#payout" className="transition hover:text-phos">
            Payout
          </a>
          <a href="#mechanism" className="transition hover:text-phos">
            Mechanism
          </a>
          <a href="#no-bridge" className="transition hover:text-phos">
            No bridge
          </a>
          <a href="#math" className="transition hover:text-phos">
            Math
          </a>
          <a href="#verify" className="transition hover:text-phos">
            Verify
          </a>
          <a href="#questions" className="transition hover:text-phos">
            Questions
          </a>
          <a
            href={siteConfig.x}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-phos"
          >
            X ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
