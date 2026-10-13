"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import {
  ARTIFACTS,
  OS_META,
  RELEASE,
  downloadUrl,
  primaryArtifactFor,
  type OsKey,
} from "@/lib/downloads";
import { useDetectedOs } from "@/lib/use-detected-os";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/icons";

const OS_ICON = {
  windows: WindowsIcon,
  macos: AppleIcon,
  linux: LinuxIcon,
} as const;

export function OsIcon({ os, className }: { os: OsKey; className?: string }) {
  const Icon = OS_ICON[os];
  return <Icon className={className} />;
}

export function DownloadButton({
  size = "lg",
  showMenu = true,
  className = "",
}: {
  size?: "md" | "lg";
  showMenu?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const os = useDetectedOs();

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest("[data-os-menu]")) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const detected = os;
  const primary = primaryArtifactFor(detected);
  const height = size === "lg" ? "h-[54px] px-6 text-[15px]" : "h-11 px-4 text-sm";

  function track(id: string) {
    setPending(id);
    if (typeof window !== "undefined" && "gtag" in window) {
      (
        window as unknown as {
          gtag: (...args: unknown[]) => void;
        }
      ).gtag("event", "download", {
        artifact_id: id,
        os: detected,
        release: RELEASE.version,
      });
    }
  }

  return (
    <div className={`relative inline-flex items-stretch gap-2 ${className}`} data-os-menu>
      <motion.a
        href={downloadUrl(primary)}
        download
        onClick={() => track(primary.id)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0, scale: 0.985 }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
        className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl font-medium tracking-tight text-white shadow-[0_18px_50px_-18px_rgba(168,85,247,0.95),inset_0_1px_0_rgba(255,255,255,0.3)] ${height} bg-[linear-gradient(180deg,#a855f7_0%,#6d28d9_100%)]`}
      >
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 blur-md animate-sweep" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={detected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="relative flex items-center gap-3"
          >
            <OsIcon os={detected} className="size-[18px]" />
            {pending === primary.id ? (
              <span>Starting download…</span>
            ) : (
              <span>
                Download for {OS_META[detected].name}
              </span>
            )}
            <Download className="size-[17px] opacity-80 transition-transform duration-200 group-hover:translate-y-0.5" />
          </motion.span>
        </AnimatePresence>
      </motion.a>

      {showMenu ? (
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Choose another platform"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 520, damping: 30 }}
          className="flex w-12 items-center justify-center rounded-2xl border border-hair-strong bg-white/[0.03] text-soft backdrop-blur transition-colors hover:border-volt/40 hover:text-bright"
        >
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </motion.button>
      ) : null}

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-hair bg-surface/95 p-1.5 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="px-3 pb-2 pt-2.5">
              <p className="eyebrow text-mute">All platforms</p>
            </div>
            {(["windows", "macos", "linux"] as OsKey[]).map((key) => {
              const items = ARTIFACTS.filter((a) => a.os === key);
              return (
                <div key={key} className="mb-1 last:mb-0">
                  <div className="flex items-center gap-2 px-3 py-1.5">
                    <OsIcon os={key} className="size-3.5 text-mute" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-mute">
                      {OS_META[key].name}
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-mute/60">
                      {OS_META[key].note}
                    </span>
                  </div>
                  {items.map((a) => (
                    <a
                      key={a.id}
                      role="menuitem"
                      href={downloadUrl(a)}
                      download
                      onClick={() => track(a.id)}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-[13px] text-soft transition-colors hover:bg-volt/10 hover:text-bright"
                    >
                      <span className="truncate">{a.label}</span>
                      <span className="shrink-0 font-mono text-[11px] uppercase text-mute">
                        .{a.format} · {a.size}
                      </span>
                    </a>
                  ))}
                </div>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
