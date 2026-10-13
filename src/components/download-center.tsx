"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Download,
  FileBraces,
  HardDrive,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import {
  ARTIFACTS,
  OS_META,
  SHA256SUMS_URL,
  artifactsFor,
  downloadUrl,
  type OsKey,
} from "@/lib/downloads";
import { useDetectedOs } from "@/lib/use-detected-os";
import { AppleIcon, LinuxIcon, WindowsIcon } from "@/components/icons";

type Tab = OsKey | "all";

const ease = [0.22, 1, 0.36, 1] as const;

const TABS: { id: Tab; label: string }[] = [
  { id: "windows", label: "Windows" },
  { id: "macos", label: "macOS" },
  { id: "linux", label: "Linux" },
  { id: "all", label: "All builds" },
];

function OsGlyph({ os, className }: { os: OsKey; className?: string }) {
  if (os === "windows") return <WindowsIcon className={className} />;
  if (os === "macos") return <AppleIcon className={className} />;
  return <LinuxIcon className={className} />;
}

function fileFor(id: string): string {
  return ARTIFACTS.find((a) => a.id === id)?.file ?? "";
}

const VERIFY: Record<OsKey, { label: string; command: string }> = {
  windows: {
    label: "PowerShell",
    command: `Get-FileHash .\\${fileFor("win-x64-setup")} -Algorithm SHA256`,
  },
  macos: {
    label: "Terminal",
    command: `shasum -a 256 ${fileFor("mac-universal")}`,
  },
  linux: {
    label: "Terminal",
    command: `sha256sum ${fileFor("linux-appimage")}`,
  },
};

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${label}`}
      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-hair bg-white/[0.03] px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mute transition-colors hover:border-hair-strong hover:text-bright"
    >
      {copied ? (
        <Check className="size-3 text-flux" strokeWidth={3} />
      ) : (
        <Copy className="size-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function DownloadCenter() {
  const detected = useDetectedOs();
  const [chosen, setChosen] = useState<Tab | null>(null);
  const tab: Tab = chosen ?? detected;

  const visible = useMemo(
    () => (tab === "all" ? ARTIFACTS : artifactsFor(tab)),
    [tab],
  );

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Operating system"
          className="inline-flex flex-wrap gap-1 rounded-2xl border border-hair bg-white/[0.02] p-1"
        >
          {TABS.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setChosen(t.id)}
                className={`relative rounded-xl px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                  on ? "text-bright" : "text-mute hover:text-soft"
                }`}
              >
                {on ? (
                  <motion.span
                    layoutId="dl-tab"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-xl border border-volt/30 bg-volt/12"
                  />
                ) : null}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <p className="flex items-center gap-2 font-mono text-[11.5px] text-mute">
          <span className="size-1.5 rounded-full bg-flux shadow-[0_0_8px_1px_rgba(34,211,238,0.85)]" />
          {chosen && chosen !== detected
            ? tab === "all"
              ? `Detected ${OS_META[detected].name} — showing every build`
              : `Showing ${OS_META[tab].name} — your machine is ${OS_META[detected].name}`
            : `Detected ${OS_META[detected].name} — showing the recommended build first`}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease }}
          className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {visible.map((a) => (
            <article
              key={a.id}
              className={`card group flex flex-col p-6 ${
                a.recommended ? "card-hover" : "hover:border-hair-strong"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-hair bg-white/[0.03] text-bright">
                  <OsGlyph os={a.os} className="size-5" />
                </span>
                {a.recommended ? (
                  <span className="rounded-full border border-flux/30 bg-flux/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-flux-bright">
                    Recommended
                  </span>
                ) : a.comingSoon ? (
                  <span className="rounded-full border border-hair px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">
                    Coming soon
                  </span>
                ) : (
                  <span className="rounded-full border border-hair px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">
                    {a.arch}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em] text-bright">
                {a.label}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">{a.detail}</p>

              <div className="mt-5 rounded-xl border border-hair bg-pit p-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-soft">
                  <FileBraces className="size-3.5 shrink-0 text-volt-bright" />
                  <span className="min-w-0 break-all">{a.file}</span>
                </div>
                <div className="mt-2.5 flex items-center gap-2 border-t border-hair pt-2.5">
                  <span className="font-mono text-[10.5px] text-mute">
                    .{a.format} · {a.size}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[10.5px] text-mute">
                    <ShieldCheck className="size-3 text-flux" />
                    SHA-256
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-mute/80">
                  {a.sha256 || "—"}
                </code>
                {a.sha256 ? (
                  <CopyButton value={a.sha256} label="checksum" />
                ) : null}
              </div>

              {a.comingSoon ? (
                <span className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-hair-strong bg-white/[0.03] text-[14px] font-medium tracking-tight text-mute">
                  Coming soon
                </span>
              ) : (
                <a
                  href={downloadUrl(a)}
                  download
                  className={`mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl text-[14px] font-medium tracking-tight transition-all duration-200 ${
                    a.recommended
                      ? "text-white bg-[linear-gradient(180deg,#a855f7_0%,#6d28d9_100%)] shadow-[0_12px_34px_-14px_rgba(168,85,247,0.95)] hover:-translate-y-0.5"
                      : "border border-hair-strong bg-white/[0.03] text-bright hover:-translate-y-0.5 hover:bg-white/[0.07]"
                  }`}
                >
                  <Download className="size-4" />
                  Download .{a.format}
                </a>
              )}
            </article>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-16 grid gap-4 lg:grid-cols-3">
        <div className="card p-7 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Terminal className="size-4 text-volt-bright" />
            <h3 className="eyebrow text-mute">Verify your download</h3>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-soft">
            Every artifact is published with a SHA-256 digest. Confirm the file
            before you run it — if the hash does not match, re-download.
          </p>
          <p className="mt-2 text-[13.5px] text-mute">
            All digests in{" "}
            <a
              href={SHA256SUMS_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-soft underline decoration-hair-strong underline-offset-4 transition-colors hover:text-bright"
            >
              SHA256SUMS.txt
            </a>
            .
          </p>
          <div className="mt-5 space-y-3">
            {(["windows", "macos", "linux"] as OsKey[]).map((os) => (
              <div key={os} className="overflow-hidden rounded-xl border border-hair bg-pit">
                <div className="flex items-center gap-2 border-b border-hair px-3 py-2">
                  <OsGlyph os={os} className="size-3.5 text-mute" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    {VERIFY[os].label}
                  </span>
                  <span className="ml-auto">
                    <CopyButton value={VERIFY[os].command} label="command" />
                  </span>
                </div>
                <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[11.5px] leading-relaxed text-soft">
                  <code>{VERIFY[os].command}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-7">
          <div className="flex items-center gap-2.5">
            <HardDrive className="size-4 text-flux" />
            <h3 className="eyebrow text-mute">Requirements</h3>
          </div>
          <dl className="mt-5 space-y-3.5 text-[13.5px]">
            {[
              ["OS", "Windows 10/11 · macOS 13+ · glibc 2.31+"],
              ["CPU", "x86_64 or Apple Silicon · 4 cores"],
              ["RAM", "8 GB minimum · 16 GB recommended"],
              ["GPU", "H.264 encode (NVENC / VideoToolbox / VAAPI) or software"],
              ["Disk", "2.5 GB app · + cache for proxies"],
              ["Network", "None required · fully offline"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 border-b border-hair pb-3.5 last:border-0 last:pb-0">
                <dt className="w-14 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
                  {k}
                </dt>
                <dd className="text-soft">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
