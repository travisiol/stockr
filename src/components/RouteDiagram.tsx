import { clsx } from "clsx";
import type { PayoutId } from "@/lib/assets";

const LANES: { id: PayoutId; label: string; y: number }[] = [
  { id: "SPY", label: "SPY", y: 30 },
  { id: "NVDA", label: "NVDA", y: 114 },
  { id: "BASKET", label: "BASKET", y: 198 },
];

function Box({
  x,
  y,
  w,
  label,
  sub,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  sub?: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={sub ? 40 : 32}
        rx={3}
        className="fill-panel-2 stroke-rule-2"
        strokeWidth={1}
      />
      <text
        x={x + w / 2}
        y={sub ? y + 17 : y + 20}
        textAnchor="middle"
        className="fill-fg text-[10px] uppercase"
        style={{ letterSpacing: "0.14em" }}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + 30}
          textAnchor="middle"
          className="fill-fg-faint text-[8px] uppercase"
          style={{ letterSpacing: "0.12em" }}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/**
 * The mechanism as a wiring diagram: a trade pays a fee, the router swaps it
 * into whichever asset the holder selected, the tokens land in their wallet.
 * The selected lane is the only lit one — that is the entire idea of the
 * product in one picture.
 */
export function RouteDiagram({ selected }: { selected: PayoutId }) {
  return (
    <svg
      viewBox="0 0 440 272"
      role="img"
      aria-label={`Trade fees are routed into ${selected} and sent to holder wallets`}
      className="mx-auto h-auto w-full max-w-[460px]"
    >
      <Box x={4} y={110} w={82} label="Trade" sub={`$STOCKR`} />
      <Box x={116} y={110} w={82} label="Fee" sub="on each trade" />
      <Box x={228} y={110} w={82} label="Router" sub="swap + send" />

      <line
        x1={86}
        y1={130}
        x2={116}
        y2={130}
        className="stroke-rule-2"
        strokeWidth={1}
      />
      <line
        x1={198}
        y1={130}
        x2={228}
        y2={130}
        className="stroke-rule-2"
        strokeWidth={1}
      />

      {LANES.map((lane) => {
        const active = lane.id === selected;
        const path = `M310 130 C 340 130, 340 ${lane.y + 16}, 366 ${lane.y + 16}`;
        return (
          <g key={lane.id}>
            <path
              d={path}
              fill="none"
              strokeWidth={active ? 1.5 : 1}
              className={clsx(active ? "stroke-phos" : "stroke-rule")}
            />
            {active && (
              <path
                d={path}
                fill="none"
                strokeWidth={2.5}
                strokeDasharray="5 11"
                className="animate-flow stroke-phos"
              />
            )}
            <rect
              x={366}
              y={lane.y}
              width={70}
              height={32}
              rx={3}
              strokeWidth={1}
              className={clsx(
                active
                  ? "fill-phos-soft stroke-phos/50"
                  : "fill-panel-2 stroke-rule",
              )}
            />
            <text
              x={401}
              y={lane.y + 20}
              textAnchor="middle"
              className={clsx(
                "text-[10px] uppercase",
                active ? "fill-phos" : "fill-fg-faint",
              )}
              style={{ letterSpacing: "0.12em" }}
            >
              {lane.label}
            </text>
          </g>
        );
      })}

      <text
        x={401}
        y={262}
        textAnchor="middle"
        className="fill-fg-faint text-[8px] uppercase"
        style={{ letterSpacing: "0.14em" }}
      >
        to your wallet
      </text>
    </svg>
  );
}
