"use client";

import { useSyncExternalStore } from "react";
import { detectOs, type OsKey } from "@/lib/downloads";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("pageshow", onStoreChange);
  return () => window.removeEventListener("pageshow", onStoreChange);
}

function getSnapshot(): OsKey {
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  return detectOs(navigator.userAgent, platform);
}

function getServerSnapshot(): OsKey {
  return "windows";
}

export function useDetectedOs(): OsKey {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
