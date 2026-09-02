"use client";

import { useState } from "react";
import { PanelHead, Section, SectionHead } from "./ui/Section";
import { Chip } from "./ui/Chip";

/**
 * Arithmetic on numbers the visitor types, and nothing else.
 *
 * The fields start EMPTY on purpose. A pre-filled "example" volume would be
 * a forecast wearing a calculator's clothes: whatever number sat in that box
 * would read as what the project expects to do. Nothing is computed until
 * the visitor has supplied every input themselves.
 */
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function parse(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function Field({
  id,
  label,
  suffix,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  suffix: string;
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          className="field"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="label shrink-0">{suffix}</span>
      </div>
    </div>
  );
}

function Result({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="bg-panel p-4">
      <p className="label">{label}</p>
      <p
        className={
          strong
            ? "num mt-2 text-[22px] leading-none text-phos"
            : "num mt-2 text-[16px] leading-none text-fg"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function Estimator() {
  const [volume, setVolume] = useState("");
  const [fee, setFee] = useState("");
  const [share, setShare] = useState("");

  const dailyVolume = parse(volume);
  const feePercent = parse(fee);
  const sharePercent = parse(share);

  const complete =
    dailyVolume !== null && feePercent !== null && sharePercent !== null;

  const poolPerDay = complete ? dailyVolume * (feePercent / 100) : null;
  const yoursPerDay =
    poolPerDay !== null && sharePercent !== null
      ? poolPerDay * (sharePercent / 100)
      : null;

  const show = (value: number | null) => (value === null ? "—" : usd.format(value));

  return (
    <Section id="math">
      <SectionHead
        index="05"
        title="Do the arithmetic yourself"
        aside={<Chip tone="muted">Your numbers, not ours</Chip>}
      />

      <div className="panel overflow-hidden">
        <PanelHead
          title="Payout arithmetic"
          aside={<span>{complete ? "computed" : "awaiting input"}</span>}
        />

        <div className="grid gap-px bg-rule lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="grid gap-5 bg-panel p-5 sm:p-6">
            <Field
              id="est-volume"
              label="Traded volume per day"
              suffix="USD"
              placeholder="0"
              value={volume}
              onChange={setVolume}
            />
            <Field
              id="est-fee"
              label="Fee taken from each trade"
              suffix="%"
              placeholder="0"
              value={fee}
              onChange={setFee}
            />
            <Field
              id="est-share"
              label="Your share of supply"
              suffix="%"
              placeholder="0"
              value={share}
              onChange={setShare}
            />
          </div>

          <div className="flex flex-col bg-panel-2/60">
            <div className="grid flex-1 gap-px bg-rule sm:grid-cols-2">
              <Result label="To all holders / day" value={show(poolPerDay)} />
              <Result label="To you / day" value={show(yoursPerDay)} strong />
              <Result
                label="To you / 30 days"
                value={show(yoursPerDay === null ? null : yoursPerDay * 30)}
              />
              <Result
                label="To you / 365 days"
                value={show(yoursPerDay === null ? null : yoursPerDay * 365)}
              />
            </div>
            <p className="prose-sans border-t border-rule p-5 text-[12px] leading-relaxed text-fg-faint">
              volume &times; fee &times; your share. It assumes the whole fee is
              distributed, that you hold the same share for the whole period,
              and that the volume you typed repeats every day. None of those
              hold in reality, and none of these numbers are a projection by
              this project — the fee itself has not even been decided.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
