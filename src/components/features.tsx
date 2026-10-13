"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AudioWaveform,
  Bot,
  Cpu,
  Frame,
  Ratio,
  Server,
  Sparkles,
  Webhook,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const ease = [0.22, 1, 0.36, 1] as const;

const WAVE = [
  22, 48, 66, 30, 84, 42, 96, 36, 58, 26, 88, 50, 34, 78, 24, 62, 90, 40, 70, 28, 94,
  38, 56, 80, 20, 68, 46, 92, 32, 60, 82, 25, 44, 98, 40, 72, 27, 86, 48, 58,
];

const PRESETS = [
  { name: "CRIMSON PUNCH", a: "#f43f5e", b: "#7c3aed" },
  { name: "CYBER FLASH", a: "#22d3ee", b: "#a855f7" },
  { name: "VOID CONTRAST", a: "#a1a1aa", b: "#18181b" },
  { name: "NEON ABERRATION", a: "#c084fc", b: "#38bdf8" },
];

export function Features() {
  const [ratio, setRatio] = useState<"16:9" | "9:16">("16:9");
  const [preset, setPreset] = useState(0);

  return (
    <section id="features" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="Capability Matrix"
          title={
            <>
              Four systems that replace an{" "}
              <span className="text-neon">entire editing workflow.</span>
            </>
          }
          lead="Kinetix is not a template pack. It is a deterministic automation engine with a public surface your scripts and agents can drive end to end."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, ease }}
            className="card group card-hover overflow-hidden lg:col-span-4"
          >
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.32),transparent)] blur-2xl" />
            <div className="relative grid gap-6 p-7 sm:p-8 md:grid-cols-[1.05fr_1fr] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-volt/30 bg-volt/10">
                    <Bot className="size-5 text-volt-bright" />
                  </span>
                  <span className="eyebrow text-volt-bright">Native AI Agent Bridge</span>
                </div>
                <h3 className="mt-5 text-[22px] font-semibold leading-tight tracking-[-0.02em] text-bright">
                  Expose the entire editor to your agents.
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-soft">
                  A local HTTP server binds to <code className="font-mono text-flux-bright">127.0.0.1:4721</code> on
                  launch, plus a first-class Model Context Protocol server. Point Claude,
                  Cursor, or your own orchestrator at it and let agents cut, grade, and
                  render without a human in the loop.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { icon: Server, label: "REST /v1" },
                    { icon: Webhook, label: "Webhooks" },
                    { icon: Cpu, label: "MCP stdio" },
                    { icon: Frame, label: "Typed TS SDK" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-hair bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-soft"
                    >
                      <Icon className="size-3.5 text-volt-bright" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-hair bg-pit">
                <div className="flex items-center gap-2 border-b border-hair px-3 py-2">
                  <span className="size-1.5 rounded-full bg-flux shadow-[0_0_8px_1px_rgba(34,211,238,0.8)]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                    agent session
                  </span>
                </div>
                <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-[1.7] text-soft">
                  <code>
                    {`$ kinetix agent authorize
  scope: timeline.read timeline.write render
  transport: mcp + rest
  status: bound

claude> cut this AMV to the drop
  → POST /v1/analyze/bpm
  → 174.0 BPM · 42 transients
  → POST /v1/timeline/autocut
  → 41 cuts snapped to beat grid
  ✓ rendered 00:42 · no watermark`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="card group card-hover overflow-hidden lg:col-span-2"
          >
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-flux/30 bg-flux/10">
                  <AudioWaveform className="size-5 text-flux" />
                </span>
                <span className="eyebrow text-flux-bright">Automated Beat-Syncing</span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-bright">
                Reverse-engineers the track, not your patience.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-soft">
                Drop in a reference. Kinetix solves the BPM, maps every transient and drop,
                then snaps cuts, flashes, and speed ramps to the grid with sample-accurate
                timing.
              </p>

              <div className="mt-auto pt-6">
                <div className="rounded-xl border border-hair bg-pit p-3">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-mute">
                    <span className="tabular-nums text-flux-bright">174.00 BPM</span>
                    <span>GRID 1/16 · LOCKED</span>
                  </div>
                  <div className="flex h-14 items-center gap-px">
                    {WAVE.map((h, i) => {
                      const on = i % 8 === 0;
                      return (
                        <span
                          key={i}
                          className="flex-1 rounded-[1px] transition-all duration-300"
                          style={{
                            height: `${h}%`,
                            background: on
                              ? "linear-gradient(180deg,#67e8f9,#0891b2)"
                              : "rgba(148,148,160,0.35)",
                            boxShadow: on
                              ? "0 0 10px 1px rgba(34,211,238,0.55)"
                              : "none",
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9.5px] text-mute/70">
                    <span>VERSE</span>
                    <span className="text-volt-bright">▼ DROP</span>
                    <span>OUTRO</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.04, ease }}
            className="card group card-hover overflow-hidden lg:col-span-3"
          >
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-volt/30 bg-volt/10">
                  <Ratio className="size-5 text-volt-bright" />
                </span>
                <span className="eyebrow text-volt-bright">Smart Auto-Reframe</span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-bright">
                One timeline, every aspect ratio.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-soft">
                Subject-aware tracking re-frames a single edit to 9:16 for TikTok and Reels
                or 16:9 for YouTube in one pass — no re-cutting, no manual keyframes.
              </p>

              <div className="mt-auto flex items-end gap-4 pt-6">
                <div className="flex items-end gap-3">
                  {(["16:9", "9:16"] as const).map((r) => {
                    const on = ratio === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRatio(r)}
                        aria-pressed={on}
                        className="rounded-xl p-1.5 transition-colors"
                        style={{
                          background: on ? "rgba(168,85,247,0.12)" : "transparent",
                          border: on
                            ? "1px solid rgba(168,85,247,0.4)"
                            : "1px solid transparent",
                        }}
                      >
                        <div
                          className="relative overflow-hidden rounded-md border border-hair-strong transition-all duration-500"
                          style={{
                            width: on ? (r === "16:9" ? 118 : 66) : r === "16:9" ? 92 : 52,
                            height: on ? (r === "16:9" ? 66 : 118) : r === "16:9" ? 52 : 92,
                            background:
                              "linear-gradient(150deg,#4c1d95 0%,#0e7490 55%,#881337 100%)",
                          }}
                        >
                          <span
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-flux transition-all duration-500"
                            style={{
                              width: r === "9:16" ? 22 : 34,
                              height: r === "9:16" ? 30 : 22,
                              boxShadow: "0 0 14px 2px rgba(34,211,238,0.6)",
                            }}
                          />
                          {on ? (
                            <span className="absolute inset-0 animate-flicker bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.14)_50%,transparent_70%)]" />
                          ) : null}
                        </div>
                        <span
                          className={`mt-2 block text-center font-mono text-[10px] ${on ? "text-volt-bright" : "text-mute"}`}
                        >
                          {r}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="pb-4 font-mono text-[10.5px] leading-relaxed text-mute">
                  subject: locked
                  <br />
                  <span className="text-flux-bright">rebuild: 1.4s</span>
                </p>
              </div>
            </div>
          </motion.article>

          <motion.article
            id="engine"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="card group card-hover scroll-mt-24 overflow-hidden lg:col-span-3"
          >
            <div className="flex h-full flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl border border-signal/30 bg-signal/10">
                  <Sparkles className="size-5 text-signal" />
                </span>
                <span className="eyebrow text-signal">Dark Aesthetic &amp; FX Engine</span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold leading-tight tracking-[-0.02em] text-bright">
                Built-in grade, aberration, and flash presets.
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-soft">
                High-contrast filmic curves, chromatic aberration, beat-locked flashes, and
                shake come tuned out of the box. Every preset is a plain JSON node your
                agent can rewrite.
              </p>

              <div className="mt-auto pt-6">
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((p, i) => {
                    const on = preset === i;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setPreset(i)}
                        aria-pressed={on}
                        className={`group/preset relative overflow-hidden rounded-xl border p-3 text-left transition-all duration-300 ${
                          on
                            ? "border-hair-strong bg-white/[0.06]"
                            : "border-hair bg-white/[0.02] hover:bg-white/[0.05]"
                        }`}
                      >
                        <div
                          className="mb-2.5 h-9 rounded-lg"
                          style={{
                            background: `linear-gradient(115deg, ${p.a} 0%, ${p.b} 100%)`,
                            filter: on ? "saturate(1.25)" : "saturate(0.85)",
                          }}
                        />
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-soft">
                          {p.name}
                        </span>
                        {on ? (
                          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-flux shadow-[0_0_8px_1px_rgba(34,211,238,0.9)]" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
