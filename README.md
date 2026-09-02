# STOCKR

**HOLD THE TOKEN. GET PAID IN STOCK.**

A Robinhood Chain token whose trading fees buy tokenized equities and route
them to holders — in the asset each holder picks: `SPY`, `NVDA`, or a
weighted basket. The payout asset is issued on the same chain the token
trades on, so the payout leg has no bridge and no wrapper in it.

Same shape as GOLDR (trade → fee → reward asset → holder), with the reward
asset swapped for something that already lives on Robinhood Chain.

## Status: pre-launch

There is no token, no router, no fee, no distribution and no treasury.
Nothing on the site claims otherwise:

- the Buy button is disabled and says why;
- every terminal stat is a shimmering "awaiting launch" bar, never a number;
- every address and parameter in `[06] VERIFY` renders as `—`;
- the three preview payout cards carry a PREVIEW label **inside the card**,
  so a cropped screenshot still says so;
- the basket weights are blank dashed chips, because the split has not been
  decided.

`isLive` requires `NEXT_PUBLIC_STOCKR_LIVE=true` **and** a token address
**and** a router address. A "live" flag with no contracts behind it cannot
flip this site on.

**One panel on the site is real**, and it is labelled as such: `[04]` reads
the block height, gas price and RPC status from Robinhood Chain in the
visitor's own browser, every six seconds. It sits directly above this
project's own numbers, which are all zero. The chain is real; the project is
not live; the page shows both at once rather than borrowing the credibility
of the first for the second. That panel also reports the age of *the read*
rather than of the block — the chain produces blocks far faster than the poll
interval, so calling it "last block" would have been quietly false.

## Decisions still open

These are product decisions, not missing code. Nothing on the site pretends
any of them is settled.

1. **Basket weights.** `NEXT_PUBLIC_STOCKR_BASKET_WEIGHTS` takes
   `SPY:50,NVDA:30,QQQ:20`. The parser rejects anything that doesn't total
   100 and treats it as unconfigured — a basket that doesn't add up would be
   paid out wrong.
2. **Fee size.** One line, `NEXT_PUBLIC_STOCKR_FEE_DESCRIPTION`.
3. **Distribution cadence.** One line,
   `NEXT_PUBLIC_STOCKR_EPOCH_DESCRIPTION`.
4. **Push or claim.** Pushing tokens to every holder costs gas that scales
   with the holder count; claiming doesn't, but leaves value unclaimed. The
   site says this is undecided rather than picking one in the copy.
5. **Tokenized equity contract addresses.** Not hardcoded anywhere. I could
   not verify the canonical `SPY` / `NVDA` token addresses on Robinhood
   Chain from this environment, and a wrong address there routes real fees
   into the wrong contract. Confirm each from the issuer, then set
   `NEXT_PUBLIC_STOCKR_ASSET_*`.
6. **The regulatory question.** A token that pays holders in tokenized
   equities is distributing securities exposure to whoever holds it. That is
   a different conversation from a token that pays in gold, and it is the
   one thing here that a compliance read has to happen on before launch, not
   after. The site states the risk plainly (`[03]`, `[06]`) and makes no
   claim about eligibility, jurisdiction, or tax treatment.

## What is on the page

```
[01] PAYOUT ROUTER   pick SPY / NVDA / basket; the wiring diagram lights the
                     selected lane. Remembered in localStorage, because there
                     is no contract to write it to — and the copy says so.
[02] MECHANISM       trade → fee → swap → credit, plus the two decisions in
                     it that are not settled.
[03] NO BRIDGE       what removing the bridge buys, and the four risks it
                     does not touch.
[04] TERMINAL        live chain readout (real), then this project's stats
                     (all zero).
[05] MATH            a calculator over numbers the visitor types. The fields
                     start empty on purpose: a pre-filled "example" volume
                     would be a forecast wearing a calculator's clothes.
[06] FILL            what a payout notification looks like, labelled PREVIEW
                     inside the card.
[07] VERIFY          every address and parameter, each one currently an em
                     dash, plus the counted "n of m unset" chip.
[08] QUESTIONS       ten questions including the ones that argue against the
                     project. Native <details>, works with JS disabled.
```

## The name

`stockr.com`, `stockr.xyz`, `stockr.app` and `stockr.trade` were all
**registered** when checked by RDAP on 2026-09-02. `stockr.fun` and
`stockr.finance` had no record — free at that moment, worth re-checking
before anyone commits.

The whole brand is three strings in `src/lib/site-config.ts` (`name`,
`wordmark`, `ticker`) plus the `NEXT_PUBLIC_STOCKR_*` env prefix. Nothing
else spells the name out, so a rename is those three strings and the prefix
— never a grep-and-replace through components.

## Verify before trusting anything here

- **Robinhood Chain** — chain ID `4663` and
  `https://rpc.mainnet.chain.robinhood.com` were probed live from this
  machine on 2026-09-02: `eth_chainId` returned `0x1237` and
  `eth_blockNumber` answered. The **explorer URL is unverified** third-party
  research. Re-confirm against `docs.robinhood.com/chain`.
- Robinhood Chain reportedly has **no native gas token** — gas is paid in
  ETH, and there is no official Robinhood Chain airdrop token. Treat any
  token claiming otherwise as suspicious.
- **No contract address is hardcoded in this repo.** Every one comes from
  env and renders as `—` when unset.
- **That tokenized `SPY` / `NVDA` are issued on Robinhood Chain is the
  premise of this design, not something verified here.** The whole "no
  bridge" argument depends on it. `[03]` states it as the condition each
  payout asset must meet — with its contract published in `[06]` — rather
  than asserting it as fact. If an asset turns out to live elsewhere, it
  does not belong in `payoutAssets`, because routing to it would put back
  exactly the bridge this design removes.

## Art direction

Terminal, not brokerage-glossy: graphite ground (`#08090a`), hairline rules,
4px radii, JetBrains Mono for everything structural and Inter only for
paragraphs. Colour is a semantic and is rationed accordingly:

| token   | meaning                            |
| ------- | ---------------------------------- |
| `phos`  | active, positive, confirmed onchain |
| `amber` | pending, unset, awaiting launch    |
| `down`  | negative values only               |

Pre-launch, most of the site is amber. That is the point.

Motion is CSS-only. The hero rises on load; sections below reveal on scroll
through `animation-timeline: view()`, gated behind `@supports` so browsers
without scroll-driven animation simply render the content. There is no
observer, no class toggling and no inline script — an earlier version armed
the reveal with a `<head>` script, which React 19 does not execute inside
components and which desynchronised hydration by mutating `<html>`.

Two things were deliberately **not** built, because both would be fabricated
market data on a site whose whole argument is that it doesn't fabricate
anything: a scrolling price tape (the tape carries the mechanism instead)
and a hero price chart (the hero carries a routing diagram instead —
`src/components/RouteDiagram.tsx`, which lights only the selected lane).

## Stack

Next.js 16 (App Router, TypeScript, Turbopack) + Tailwind CSS v4 + wagmi v3
/ viem, injected connector only. No backend, no wallet library, no chart
library, seven runtime dependencies. Fonts load from a runtime `<link>`
rather than `next/font`, which would need outbound access to
fonts.googleapis.com at build time.

```
src/
  app/          routes, metadata, OG image, icon, robots/sitemap, 404
  app/          + not-found.tsx and error.tsx, because the framework
                defaults render dark text on a dark layout
  components/   Hero, Tape, PayoutRouter (+ RouteDiagram), Mechanism,
                NoBridge, Terminal (+ ChainReadout), Estimator, Fill,
                Verify, Questions, Navbar (+ NavLinks), Footer,
                StatusLine, WalletConnect, BuyButton
    ui/         Chip, Section/SectionHead/PanelHead
  lib/
    chain.ts          Robinhood Chain viem definition
    wagmiConfig.ts    wagmi config (injected only)
    site-config.ts    brand + launch surface, all env-driven
    assets.ts         payout assets, basket parsing
    data.ts           stats (all zero) + labelled preview fills
    clock.ts          one-second tick as an external store
    payout-storage.ts the holder's choice, in this browser only
```

### Traps worth knowing

- **Tailwind v4.** Custom classes must live inside `@layer components` or
  they are emitted after the utility layer and silently beat every utility
  touching the same property. `globals.css` follows that.
- **React 19 / Next 16.** Reading `Date.now()` during render and calling
  setState inside an effect body are both rejected by the shipped React
  Compiler lint rules — hence `clock.ts` and `payout-storage.ts` going
  through `useSyncExternalStore`.
- **Nothing runs in a page that is not being rendered.** Neither
  `requestAnimationFrame` nor IntersectionObserver delivery fires while a tab
  or preview pane is hidden, so the section highlight in `NavLinks.tsx` is
  throttled with a timer instead. A collapsed IntersectionObserver root
  (`rootMargin` insets summing to 100%) never fires at all — a zero-height
  root intersects nothing.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

```bash
npm run build   # verified passing
npm run lint    # verified clean
```

Deploys as a standard Next.js app: connect the repo, set the env vars from
`.env.example`, deploy.

## Wallet

`injected()` only (MetaMask, Rabby, Coinbase extension) — no WalletConnect
project id. The connect → wrong-network → switch → connected path was
verified against a stubbed EIP-1193 provider on 2026-09-02, including
`wallet_switchEthereumChain` arriving with `0x1237`. It has never been run
against a real extension or a real contract, because there is no contract.

Also verified on 2026-09-02, by measuring the DOM rather than by screenshot:
the payout radiogroup (click and arrow keys, with focus following the
selection), persistence of the choice across a reload, the section highlight
at every scroll position, the mobile menu, the arithmetic in `[05]`
(1,000,000 × 1.5% × 0.5% = $75/day), and the live chain readout advancing.
