"use client";

import { useConnect, useConnection, useDisconnect, useSwitchChain } from "wagmi";
import { clsx } from "clsx";
import { robinhoodChain } from "@/lib/chain";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/**
 * Injected connector only — no WalletConnect project id, no wallet library.
 * wagmi's `ssr: true` keeps the server render and the first client render
 * both "disconnected", so no hydration gate is needed here.
 */
export function WalletConnect({ className }: { className?: string }) {
  const { address, isConnected, chainId } = useConnection();
  const {
    connect,
    connectors,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { mutate: switchChain, isPending: isSwitching } = useSwitchChain();

  const wrongNetwork = isConnected && chainId !== robinhoodChain.id;

  if (isConnected && address) {
    if (wrongNetwork) {
      return (
        <button
          type="button"
          onClick={() => switchChain({ chainId: robinhoodChain.id })}
          disabled={isSwitching}
          className={clsx(
            "rounded-[3px] border border-amber/40 bg-amber-soft px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-amber transition hover:bg-amber/20 disabled:opacity-60",
            className,
          )}
        >
          {isSwitching ? "Switching…" : "Wrong network — switch"}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Disconnect wallet"
        className={clsx(
          "flex items-center gap-2 rounded-[3px] border border-rule bg-white/[0.03] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-fg transition hover:border-rule-2",
          className,
        )}
      >
        <span aria-hidden className="h-1 w-1 rounded-full bg-phos" />
        {/* normal-case: an address must keep its EIP-55 casing */}
        <span className="num normal-case">{short(address)}</span>
      </button>
    );
  }

  const injectedConnector = connectors[0];

  return (
    <div className={clsx("flex flex-col items-end gap-1", className)}>
      <button
        type="button"
        disabled={!injectedConnector || isConnecting}
        onClick={() =>
          injectedConnector && connect({ connector: injectedConnector })
        }
        className="rounded-[3px] border border-phos/40 bg-phos-soft px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-phos transition hover:bg-phos/20 disabled:cursor-not-allowed disabled:border-rule disabled:bg-transparent disabled:text-fg-faint"
      >
        {isConnecting
          ? "Connecting…"
          : injectedConnector
            ? "Connect wallet"
            : "No wallet found"}
      </button>
      {connectError && (
        <span className="max-w-[220px] text-right text-[10px] leading-tight text-down">
          {connectError.message}
        </span>
      )}
    </div>
  );
}
