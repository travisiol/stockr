import { clsx } from "clsx";

type Tone = "pending" | "live" | "muted" | "down";

const tones: Record<Tone, string> = {
  // Amber is the "nothing real behind this yet" colour and it is used a lot
  // on purpose: pre-launch, most of this site is pending.
  pending: "border-amber/30 bg-amber-soft text-amber",
  live: "border-phos/30 bg-phos-soft text-phos",
  muted: "border-rule bg-white/[0.03] text-fg-faint",
  down: "border-down/30 bg-down/10 text-down",
};

export function Chip({
  children,
  tone = "muted",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className={clsx(
            "h-1 w-1 rounded-full",
            tone === "live" && "bg-phos",
            tone === "pending" && "bg-amber animate-blink",
            tone === "muted" && "bg-fg-faint",
            tone === "down" && "bg-down",
          )}
        />
      )}
      {children}
    </span>
  );
}
