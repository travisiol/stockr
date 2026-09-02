"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_PAYOUT, payoutAssets, type PayoutId } from "./assets";

/**
 * The holder's payout choice, kept in this browser.
 *
 * There is no router contract to write it to yet, so persisting it locally is
 * the honest version of "remembering your selection": it never leaves the
 * tab, and the UI says exactly that. Reads go through useSyncExternalStore
 * rather than an effect, both because the React Compiler lint rules reject
 * setState-in-effect and because it keeps the server render and the
 * hydration render agreed on the same value (the default).
 */
const KEY = "stockr.payout.v1";

let cached: PayoutId = DEFAULT_PAYOUT;
let loaded = false;
const listeners = new Set<() => void>();

function isPayoutId(value: string): value is PayoutId {
  return payoutAssets.some((asset) => asset.id === value);
}

function readStorage(): PayoutId {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw && isPayoutId(raw) ? raw : DEFAULT_PAYOUT;
  } catch {
    // Private mode, blocked storage, embedded contexts: not an error here.
    return DEFAULT_PAYOUT;
  }
}

function getSnapshot(): PayoutId {
  if (!loaded) {
    cached = readStorage();
    loaded = true;
  }
  return cached;
}

function onStorageEvent(event: StorageEvent) {
  if (event.key !== null && event.key !== KEY) return;
  cached = readStorage();
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorageEvent);
  }
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorageEvent);
    }
  };
}

export function usePersistedPayout(): [PayoutId, (next: PayoutId) => void] {
  const selected = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => DEFAULT_PAYOUT,
  );

  const select = useCallback((next: PayoutId) => {
    cached = next;
    loaded = true;
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Selection still works for this session if storage is unavailable.
    }
    for (const listener of listeners) listener();
  }, []);

  return [selected, select];
}
