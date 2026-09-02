import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { WalletConnect } from "./WalletConnect";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-void/85 backdrop-blur-md">
      <nav className="relative mx-auto flex h-14 w-full max-w-[1180px] items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-fg"
        >
          {siteConfig.name}
          <span className="text-[10px] tracking-[0.16em] text-phos">
            {siteConfig.ticker}
          </span>
        </Link>

        <NavLinks />

        <WalletConnect />
      </nav>
    </header>
  );
}
