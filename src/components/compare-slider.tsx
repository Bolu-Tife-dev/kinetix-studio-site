"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { useAnimationFrame } from "framer-motion";
import { MoveHorizontal, Pause, Play, RotateCcw, Sparkles, Video } from "lucide-react";

const BPM = 174;
const DURATION = 8;
const BEATS_PER_BAR = 4;

const WAVE = [
  20, 44, 62, 28, 80, 40, 92, 34, 56, 24, 86, 48, 32, 74, 22, 60, 88, 38, 68, 26, 90,
  36, 54, 76, 18, 66, 44, 94, 30, 58, 80, 23, 42, 96, 38, 70, 25, 84, 46, 56, 72, 31,
  59, 90, 21, 48, 78, 34, 64, 27, 92, 40, 55, 74, 29, 61, 86, 36, 52, 68, 24, 46, 88,
  33, 58, 76, 20, 50, 82, 37, 63, 28, 94, 43, 56, 70, 32, 47, 89,
];

function formatTimecode(seconds: number): string {
  const s = Math.floor(seconds % DURATION);
  const f = Math.floor((seconds % 1) * 60);
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

function Scene({ variant }: { variant: "raw" | "edit" }) {
  const edit = variant === "edit";

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        filter: edit
          ? "saturate(1.35) contrast(1.22) brightness(0.94)"
          : "saturate(0.28) contrast(0.82) brightness(1.16)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: edit
            ? "radial-gradient(48% 60% at 24% 30%, rgba(168,85,247,0.72), transparent 62%), radial-gradient(42% 52% at 76% 20%, rgba(34,211,238,0.5), transparent 60%), radial-gradient(58% 68% at 58% 94%, rgba(244,63,94,0.5), transparent 66%), linear-gradient(158deg,#160a26 0%,#05050b 52%,#04141c 100%)"
            : "radial-gradient(48% 60% at 24% 30%, rgba(150,140,170,0.35), transparent 62%), radial-gradient(42% 52% at 76% 20%, rgba(140,170,180,0.3), transparent 60%), radial-gradient(58% 68% at 58% 94%, rgba(170,150,155,0.3), transparent 66%), linear-gradient(158deg,#2a2733 0%,#26252c 52%,#242c30 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(112deg, transparent 0 26px, rgba(255,255,255,0.045) 26px 27px)",
          opacity: edit ? 0.9 : 0.35,
        }}
      />

      <div
        className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "38%",
          height: "72%",
          background: edit
            ? "conic-gradient(from 210deg, rgba(34,211,238,0.0), rgba(192,132,252,0.85), rgba(244,63,94,0.7), rgba(34,211,238,0.0))"
            : "conic-gradient(from 210deg, rgba(180,180,190,0), rgba(190,185,200,0.55), rgba(185,180,185,0.45), rgba(180,180,190,0))",
          filter: "blur(26px)",
          opacity: 0.85,
        }}
      />

      <div
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(46%, 340px)",
          aspectRatio: "3 / 4",
          background: edit
            ? "linear-gradient(170deg, rgba(10,10,18,0.05) 0%, rgba(6,6,12,0.88) 78%)"
            : "linear-gradient(170deg, rgba(90,88,100,0.15) 0%, rgba(60,58,68,0.72) 78%)",
          clipPath:
            "polygon(46% 0%, 62% 4%, 68% 16%, 66% 30%, 78% 44%, 84% 70%, 74% 100%, 26% 100%, 16% 70%, 22% 44%, 34% 30%, 32% 16%, 38% 4%)",
          boxShadow: edit
            ? "0 0 90px 24px rgba(124,58,237,0.45)"
            : "0 0 50px 12px rgba(120,120,130,0.2)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative text-center">
          <span
            aria-hidden
            className="absolute inset-0 select-none text-[clamp(1.6rem,5.4vw,3.4rem)] font-semibold uppercase leading-none tracking-[-0.03em] mix-blend-screen"
            style={{
              color: edit ? "#ff2d55" : "#8a8a92",
              transform: edit ? "translate(-3px, 1px)" : "none",
              opacity: edit ? 0.85 : 0,
            }}
          >
            Midnight Rush
          </span>
          <span
            aria-hidden
            className="absolute inset-0 select-none text-[clamp(1.6rem,5.4vw,3.4rem)] font-semibold uppercase leading-none tracking-[-0.03em] mix-blend-screen"
            style={{
              color: edit ? "#22d3ee" : "#8a8a92",
              transform: edit ? "translate(3px, -1px)" : "none",
              opacity: edit ? 0.85 : 0,
            }}
          >
            Midnight Rush
          </span>
          <span
            className="relative select-none text-[clamp(1.6rem,5.4vw,3.4rem)] font-semibold uppercase leading-none tracking-[-0.03em]"
            style={{ color: edit ? "#fafafa" : "#9a9aa2" }}
          >
            Midnight Rush
          </span>
        </div>
      </div>

      {edit ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 3px)",
            opacity: 0.1,
            mixBlendMode: "overlay",
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 72% at 50% 50%, transparent 34%, rgba(0,0,0,0.72) 100%)",
          opacity: edit ? 1 : 0.22,
        }}
      />
    </div>
  );
}

export function CompareSlider() {
  const [position, setPosition] = useState(52);
  const [playing, setPlaying] = useState(true);
  const [beat, setBeat] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef(0);
  const lastBeatRef = useRef(-1);
  const draggingRef = useRef(false);

  const beatsPerSecond = BPM / 60;

  const applyPosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (draggingRef.current) applyPosition(e.clientX);
    }
    function onUp() {
      draggingRef.current = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [applyPosition]);

  useAnimationFrame((_t, delta) => {
    const step = Math.min(delta, 64) / 1000;

    if (playing) {
      timeRef.current = (timeRef.current + step) % DURATION;
    }

    const progress = timeRef.current / DURATION;
    const beatIndex = Math.floor(timeRef.current * beatsPerSecond);
    const phase = (timeRef.current * beatsPerSecond) % 1;
    const hit = Math.max(0, 1 - phase * 7);
    const isDownbeat = beatIndex % BEATS_PER_BAR === 0;

    if (playheadRef.current) {
      playheadRef.current.style.left = `${progress * 100}%`;
    }
    if (flashRef.current) {
      flashRef.current.style.opacity = `${hit * (isDownbeat ? 0.34 : 0.16)}`;
    }
    if (driftRef.current) {
      const x = Math.sin(progress * Math.PI * 2) * 2.4;
      const y = Math.cos(progress * Math.PI * 3) * 1.4;
      driftRef.current.style.transform = `translate3d(${x}%, ${y}%, 0) scale(1.06)`;
    }
    if (timecodeRef.current) {
      timecodeRef.current.textContent = formatTimecode(timeRef.current);
    }

    if (beatIndex !== lastBeatRef.current) {
      lastBeatRef.current = beatIndex;
      setBeat(beatIndex);
    }
  });

  function onScrub(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const next = ((e.clientX - rect.left) / rect.width) * DURATION;
    timeRef.current = Math.min(DURATION, Math.max(0, next));
  }

  const totalBeats = Math.round(DURATION * beatsPerSecond);

  return (
    <section id="demo" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[420px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,58,237,0.16),transparent_70%)] blur-2xl" />

      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-flux-bright">02</span>
              <span className="h-px w-8 bg-gradient-to-r from-flux/70 to-transparent" />
              <span className="eyebrow text-mute">Interactive Preview</span>
            </div>
            <h2 className="mt-5 text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-gradient">
              Drag the slider. Watch flat footage become{" "}
              <span className="text-neon">a beat edit.</span>
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-soft">
              This is the same clip before and after Kinetix&apos;s automation pass: grade,
              chromatic aberration, beat-locked flash, and shake applied on the 174&nbsp;BPM
              grid. Scrub the timeline, pause the transport, or grab the handle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { icon: Video, label: "Source: amv_opener_04.mp4" },
              { icon: Sparkles, label: "Preset: midnight_rush" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-lg border border-hair bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-soft"
              >
                <Icon className="size-3.5 text-volt-bright" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-hair bg-surface shadow-[0_50px_120px_-45px_rgba(0,0,0,0.95)]">
          <div className="flex items-center justify-between border-b border-hair bg-white/[0.02] px-4 py-2.5">
            <div className="flex items-center gap-2 font-mono text-[11px] text-mute">
              <span className="size-1.5 animate-beat rounded-full bg-signal shadow-[0_0_8px_1px_rgba(244,63,94,0.9)]" />
              <span className="tabular-nums" ref={timecodeRef}>
                00:00:00:00
              </span>
              <span className="hidden text-mute/60 sm:inline">· 3840×2160 · 60fps</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-flux-bright tabular-nums">{BPM.toFixed(2)} BPM</span>
              <span className="hidden text-mute sm:inline">
                BEAT {(beat % totalBeats) + 1}/{totalBeats}
              </span>
              <span className="text-mute tabular-nums">
                BAR {Math.floor(beat / BEATS_PER_BAR) + 1}
              </span>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative aspect-video w-full touch-none select-none overflow-hidden bg-pit"
            onPointerDown={(e) => {
              draggingRef.current = true;
              applyPosition(e.clientX);
            }}
          >
            <div ref={driftRef} className="absolute inset-0 will-change-transform">
              <Scene variant="edit" />
            </div>

            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${Math.max(0, 100 - position)}% 0 0)`,
              }}
            >
              <Scene variant="raw" />
            </div>

            <div
              ref={flashRef}
              className="pointer-events-none absolute inset-0 bg-white mix-blend-screen"
              style={{ opacity: 0 }}
            />

            <span className="pointer-events-none absolute left-4 top-4 rounded-md border border-white/10 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              Raw · Log
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-md border border-volt/30 bg-volt/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-volt-bright backdrop-blur">
              Kinetix · Applied
            </span>

            <div
              className="absolute inset-y-0 z-20 w-px bg-[linear-gradient(180deg,transparent,#ffffff_12%,#ffffff_88%,transparent)] shadow-[0_0_18px_3px_rgba(255,255,255,0.55)]"
              style={{ left: `${position}%` }}
            >
              <div
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(position)}
                aria-valuetext={`${Math.round(position)}% raw`}
                onKeyDown={(e) => {
                  const bump = e.shiftKey ? 10 : 3;
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setPosition((p) => Math.max(0, p - bump));
                  }
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setPosition((p) => Math.min(100, p + bump));
                  }
                  if (e.key === "Home") setPosition(0);
                  if (e.key === "End") setPosition(100);
                }}
                className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/25 bg-black/55 backdrop-blur-md transition-transform duration-200 hover:scale-110 focus-visible:scale-110"
              >
                <MoveHorizontal className="size-4.5 text-white" strokeWidth={2.2} />
              </div>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                Drag
              </span>
            </div>
          </div>

          <div className="border-t border-hair bg-pit px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause preview" : "Play preview"}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-hair-strong bg-white/[0.04] text-bright transition-colors hover:border-volt/40 hover:bg-volt/10"
              >
                {playing ? (
                  <Pause className="size-4 fill-current" />
                ) : (
                  <Play className="size-4 fill-current" />
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  timeRef.current = 0;
                  setPlaying(true);
                }}
                aria-label="Restart preview"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-hair text-soft transition-colors hover:border-hair-strong hover:text-bright"
              >
                <RotateCcw className="size-4" />
              </button>

              <div
                role="presentation"
                onClick={onScrub}
                className="relative h-12 flex-1 cursor-pointer overflow-hidden rounded-lg border border-hair bg-black/40 px-1.5"
              >
                <div className="flex h-full items-center gap-px py-1">
                  {WAVE.map((h, i) => {
                    const isBar = i % BEATS_PER_BAR === 0;
                    return (
                      <span
                        key={i}
                        className="flex-1 rounded-[1px]"
                        style={{
                          height: `${h}%`,
                          background: isBar
                            ? "linear-gradient(180deg,#c084fc,#7c3aed)"
                            : "rgba(148,148,160,0.3)",
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  ref={playheadRef}
                  className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.85)]"
                  style={{ left: "0%" }}
                >
                  <span className="absolute -top-px left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white" />
                </div>
              </div>

              <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-mute sm:inline">
                00:0{DURATION}
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
              <span className="text-volt-bright">Snap: beat grid 1/16</span>
              <span className="hidden sm:inline">Transient map: 128 hits</span>
              <span className="hidden md:inline">Grade: filmic · aberration 0.6 · flash 12%</span>
              <span className="ml-auto text-flux-bright">Rendered locally · no watermark</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] text-mute/70">
          Tip: use ← → to nudge the comparison handle · Shift for larger steps
        </p>
      </div>
    </section>
  );
}
