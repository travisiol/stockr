import { payoutAssets } from "@/lib/assets";
import { ROBINHOOD_CHAIN_ID } from "@/lib/chain";
import { launchConfig } from "@/lib/site-config";
import { LIVE_DATA_ENABLED } from "@/lib/data";

function state(value: string | null) {
  return value ? "SET" : "—";
}

/**
 * The bottom line of the terminal: the machine state, in one row. Every
 * field is derived from config or from the asset list, so it cannot drift
 * from what the rest of the page shows — including the asset count, which
 * follows `payoutAssets` rather than a number typed here.
 */
export function StatusLine() {
  // The basket is several legs rather than one contract, so it is not part
  // of the "assets with an address" count.
  const withContract = payoutAssets.filter((asset) => asset.id !== "BASKET");
  const configured = withContract.filter((asset) => asset.address !== null);

  const fields = [
    { key: "chain", value: `RH ${ROBINHOOD_CHAIN_ID}`, pending: false },
    {
      key: "token",
      value: state(launchConfig.tokenAddress),
      pending: launchConfig.tokenAddress === null,
    },
    {
      key: "router",
      value: state(launchConfig.routerAddress),
      pending: launchConfig.routerAddress === null,
    },
    {
      key: "assets",
      value: `${configured.length}/${withContract.length}`,
      pending: configured.length < withContract.length,
    },
    {
      key: "feed",
      value: LIVE_DATA_ENABLED ? "LIVE" : "OFF",
      pending: !LIVE_DATA_ENABLED,
    },
    {
      key: "mode",
      value: launchConfig.isLive ? "LIVE" : "PRE-LAUNCH",
      pending: false,
    },
  ];

  return (
    <div className="border-y border-rule bg-panel/60">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6">
        {fields.map((field) => (
          <span
            key={field.key}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]"
          >
            <span className="text-fg-faint">{field.key}</span>
            <span className={field.pending ? "num text-amber" : "num text-fg"}>
              {field.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
