"use client";

import { clsx } from "clsx";
import { useConnection } from "wagmi";
import { RouteDiagram } from "./RouteDiagram";
import { Chip } from "./ui/Chip";
import { PanelHead, Section, SectionHead } from "./ui/Section";
import { basketWeights, getAsset, payoutAssets } from "@/lib/assets";
import { usePersistedPayout } from "@/lib/payout-storage";
import { launchConfig } from "@/lib/site-config";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function BasketLegs() {
  if (!basketWeights) {
    return (
      <div className="mt-4">
        <p className="label">Weights</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {/* Deliberately blank. The split has not been decided, and
              inventing one here would put a number on the site that nobody
              agreed to. Set NEXT_PUBLIC_STOCKR_BASKET_WEIGHTS to fill it. */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rounded-[3px] border border-dashed border-amber/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-amber"
            >
              — / —
            </span>
          ))}
        </div>
        <p className="prose-sans mt-2 text-[12px] leading-relaxed text-fg-faint">
          The split has not been set. It will be published here, and in the
          contract, before the basket can be selected.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="label">Weights</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {basketWeights.map((leg) => (
          <span
            key={leg.symbol}
            className="num rounded-[3px] border border-rule-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-fg"
          >
            {leg.symbol} / {leg.weight}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function PayoutRouter() {
  // Persisted in this browser, not on a chain — there is nothing to write to
  // yet, and pretending otherwise would be the one dishonest control here.
  const [selected, select] = usePersistedPayout();
  const { address } = useConnection();
  const asset = getAsset(selected);

  // Arrow keys move between options, as a radiogroup should — and they move
  // the focus with the selection, otherwise the next Tab leaves from the old
  // option and a screen reader never hears about the new one.
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const current = payoutAssets.findIndex((a) => a.id === selected);
    const index = (current + step + payoutAssets.length) % payoutAssets.length;
    select(payoutAssets[index].id);

    const options =
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    options[index]?.focus();
  }

  return (
    <Section id="payout">
      <SectionHead
        index="01"
        title="Payout router"
        aside={
          <Chip tone="pending" dot>
            Router not deployed
          </Chip>
        }
      />

      <div className="panel overflow-hidden" data-reveal>
        <PanelHead
          title="Select payout asset"
          aside={
            <span className={address ? "num normal-case" : undefined}>
              {address ? short(address) : "no wallet"}
            </span>
          }
        />

        <div className="grid gap-px bg-rule lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* ---- options ---- */}
          <div className="bg-panel p-4 sm:p-6">
            <div
              role="radiogroup"
              aria-label="Payout asset"
              onKeyDown={onKeyDown}
              className="flex flex-col gap-2"
            >
              {payoutAssets.map((option) => {
                const active = option.id === selected;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(option.id)}
                    className={clsx(
                      "group flex items-center gap-4 rounded-[3px] border px-4 py-3.5 text-left transition",
                      active
                        ? "border-phos/50 bg-phos-soft"
                        : "border-rule bg-white/[0.015] hover:border-rule-2",
                    )}
                  >
                    <span
                      aria-hidden
                      className={clsx(
                        "flex h-3 w-3 shrink-0 items-center justify-center rounded-full border",
                        active ? "border-phos" : "border-rule-2",
                      )}
                    >
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-phos" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={clsx(
                          "block text-[13px] font-semibold uppercase tracking-[0.14em]",
                          active ? "text-phos" : "text-fg",
                        )}
                      >
                        {option.symbol}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] uppercase tracking-[0.12em] text-fg-faint">
                        {option.name} · {option.kind}
                      </span>
                    </span>

                    <Chip
                      tone={option.address ? "live" : "pending"}
                      className="hidden sm:inline-flex"
                    >
                      {option.address
                        ? `${option.address.slice(0, 6)}…`
                        : option.id === "BASKET"
                          ? "multi-leg"
                          : "no contract"}
                    </Chip>
                  </button>
                );
              })}
            </div>

            <p className="prose-sans mt-5 text-[13px] leading-relaxed text-fg-dim">
              {asset.blurb}
            </p>

            {selected === "BASKET" && <BasketLegs />}

            <div className="mt-6 border-t border-rule pt-5">
              <button
                type="button"
                disabled
                aria-describedby="write-reason"
                className="w-full cursor-not-allowed rounded-[3px] border border-rule-2 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-faint"
              >
                Set payout asset
              </button>
              <p
                id="write-reason"
                className="prose-sans mt-2 text-[12px] leading-relaxed text-fg-faint"
              >
                {launchConfig.routerAddress
                  ? "Connect a wallet on Robinhood Chain to write your choice."
                  : "There is no router contract to write to yet, so your choice is remembered in this browser and nowhere else. Nothing is signed, and nothing leaves the tab."}
              </p>
            </div>
          </div>

          {/* ---- diagram ---- */}
          <div className="flex flex-col justify-between gap-6 bg-panel-2/60 p-4 sm:p-6">
            <RouteDiagram selected={selected} />

            <dl className="grid grid-cols-2 gap-px border border-rule bg-rule text-[10px] uppercase tracking-[0.12em]">
              <div className="bg-panel p-3">
                <dt className="text-fg-faint">Fee taken</dt>
                <dd className="num mt-1 text-fg">
                  {launchConfig.feeDescription ?? (
                    <span className="text-amber">not set</span>
                  )}
                </dd>
              </div>
              <div className="bg-panel p-3">
                <dt className="text-fg-faint">Distribution</dt>
                <dd className="num mt-1 text-fg">
                  {launchConfig.epochDescription ?? (
                    <span className="text-amber">not set</span>
                  )}
                </dd>
              </div>
              <div className="bg-panel p-3">
                <dt className="text-fg-faint">Hops to your wallet</dt>
                <dd className="num mt-1 text-phos">1</dd>
              </div>
              <div className="bg-panel p-3">
                <dt className="text-fg-faint">Bridges crossed</dt>
                <dd className="num mt-1 text-phos">0</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
