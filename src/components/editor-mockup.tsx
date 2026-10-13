import { Bot, Cpu, Film, Scissors, Sparkles } from "lucide-react";

const WAVE = [
  18, 34, 52, 26, 71, 44, 88, 39, 62, 28, 95, 47, 33, 76, 24, 58, 82, 41, 67, 29, 91,
  36, 54, 73, 22, 64, 48, 86, 31, 59, 77, 25, 43, 93, 37, 68, 27, 81, 46, 55, 72, 32,
  61, 89, 23, 50, 79, 35, 66, 28, 94, 42, 57, 74, 30, 63, 85, 38, 53, 70, 26, 47, 88,
  34, 60, 76, 21, 52, 83, 39, 65, 29, 90, 44, 58, 71, 33, 49, 87, 27, 62, 78, 36, 55,
];

const TRACK_A = [
  { left: 0, width: 17, tone: "volt" },
  { left: 17.6, width: 11, tone: "flux" },
  { left: 29.2, width: 22, tone: "volt" },
  { left: 51.8, width: 9, tone: "dim" },
  { left: 61.4, width: 26, tone: "flux" },
  { left: 88, width: 12, tone: "volt" },
] as const;

const CLIPS = [
  "amv_opener_04.mp4",
  "sakuga_impact_12.mp4",
  "boss_phase2_01.mp4",
  "ui_glitch_sting.mov",
];

const TONE: Record<string, string> = {
  volt: "linear-gradient(90deg,#7c3aed,#a855f7)",
  flux: "linear-gradient(90deg,#0891b2,#22d3ee)",
  dim: "linear-gradient(90deg,#3f3f46,#52525b)",
};

export function EditorMockup() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,0.35),transparent_70%)] blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-hair bg-surface shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="flex items-center gap-3 border-b border-hair bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex items-center gap-2 font-mono text-[11px] text-mute">
            <Film className="size-3 text-volt-bright" />
            <span>kinetix — midnight_rush_amv.kpx</span>
            <span className="hidden text-mute/50 sm:inline">· 4K 60fps · HDR</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-flux/30 bg-flux/10 px-2 py-0.5">
            <Cpu className="size-3 text-flux" />
            <span className="font-mono text-[10px] text-flux-bright">GPU 78%</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_236px]">
          <div className="relative aspect-video overflow-hidden bg-pit">
            <div
              className="absolute inset-0 animate-drift"
              style={{
                background:
                  "radial-gradient(50% 60% at 22% 28%, rgba(168,85,247,0.55), transparent 62%), radial-gradient(45% 55% at 78% 22%, rgba(34,211,238,0.42), transparent 60%), radial-gradient(60% 70% at 55% 92%, rgba(244,63,94,0.38), transparent 65%), linear-gradient(160deg,#12081f 0%,#05050a 55%,#04141a 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_50px_rgba(0,0,0,0.75)]" />

            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              <span className="eyebrow rounded-md border border-white/10 bg-black/50 px-2 py-1 text-[9.5px] text-volt-bright backdrop-blur">
                Beat-locked · 128.00 BPM
              </span>
              <span className="eyebrow rounded-md border border-white/10 bg-black/50 px-2 py-1 text-[9.5px] text-flux-bright backdrop-blur">
                Reframe 9:16 · subject tracked
              </span>
            </div>

            <div className="absolute right-4 top-4 rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white/90 backdrop-blur">
              00:01:14:08
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-white/10 bg-black/55 px-1.5 py-1.5 backdrop-blur">
              {["CUT", "FLASH", "RGB", "SHAKE"].map((fx, i) => (
                <span
                  key={fx}
                  className="eyebrow rounded-lg px-2 py-1 text-[9px]"
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(168,85,247,0.22)"
                        : "rgba(34,211,238,0.18)",
                    color: i % 2 === 0 ? "#e9d5ff" : "#a5f3fc",
                  }}
                >
                  {fx}
                </span>
              ))}
            </div>

            <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-2 sm:flex">
              {[
                { icon: Sparkles, label: "Auto-cut", on: true },
                { icon: Scissors, label: "Beat snap", on: true },
                { icon: Film, label: "Motion blur", on: false },
              ].map(({ icon: Icon, label, on }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur"
                >
                  <Icon
                    className={`size-3 ${on ? "text-flux" : "text-mute"}`}
                  />
                  <span className="font-mono text-[10px] text-white/75">{label}</span>
                  <span
                    className={`ml-auto size-1.5 rounded-full ${
                      on ? "bg-flux shadow-[0_0_8px_1px_rgba(34,211,238,0.9)]" : "bg-zinc-600"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="hidden flex-col border-l border-hair bg-surface lg:flex">
            <div className="border-b border-hair px-4 py-3">
              <p className="eyebrow text-mute">Media Pool</p>
            </div>
            <div className="flex-1 space-y-1.5 p-3">
              {CLIPS.map((clip, i) => (
                <div
                  key={clip}
                  className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors ${
                    i === 1
                      ? "border-volt/40 bg-volt/10"
                      : "border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="h-6 w-9 shrink-0 rounded"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg,#4c1d95,#7c3aed)"
                          : "linear-gradient(135deg,#155e75,#22d3ee)",
                    }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[10.5px] text-soft">
                      {clip}
                    </span>
                    <span className="block font-mono text-[9.5px] text-mute/70">
                      {["00:06", "00:03", "00:11", "00:01"][i]} · 4K
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-hair p-3">
              <div className="rounded-xl border border-flux/25 bg-flux/[0.06] p-3">
                <div className="flex items-center gap-2">
                  <Bot className="size-3.5 text-flux" />
                  <span className="eyebrow text-flux-bright">Agent Bridge</span>
                </div>
                <p className="mt-2 font-mono text-[10px] leading-relaxed text-soft">
                  POST /v1/timeline/autocut
                  <br />
                  <span className="text-flux-bright">200 OK · 41 cuts · 1.9s</span>
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t border-hair bg-pit px-4 py-3">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-mute">
            <span className="eyebrow">Timeline · 3 tracks</span>
            <span className="tabular-nums">SNAP: BEAT · GRID 1/4</span>
          </div>

          <div className="relative space-y-1.5">
            <div className="flex h-3 items-end gap-px overflow-hidden rounded-md border border-hair bg-black/40 px-1">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[1px]"
                  style={{
                    height: `${h}%`,
                    background:
                      i % 8 === 0
                        ? "linear-gradient(180deg,#c084fc,#7c3aed)"
                        : "rgba(148,148,160,0.45)",
                  }}
                />
              ))}
            </div>

            <div className="relative h-9 overflow-hidden rounded-md border border-hair bg-black/40">
              {TRACK_A.map((seg) => (
                <span
                  key={seg.left}
                  className="absolute inset-y-1 rounded"
                  style={{
                    left: `${seg.left}%`,
                    width: `${seg.width}%`,
                    background: TONE[seg.tone],
                    opacity: 0.85,
                  }}
                />
              ))}
              <span
                className="absolute inset-y-0 w-px bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
                style={{ left: "38%" }}
              />
              <span
                className="absolute inset-y-0 w-6 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.55),transparent)] animate-beat"
                style={{ left: "38%" }}
              />
            </div>

            <div className="relative h-5 overflow-hidden rounded-md border border-hair bg-black/40">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute top-0 h-full w-px"
                  style={{
                    left: `${(i / 32) * 100}%`,
                    background:
                      i % 4 === 0
                        ? "rgba(168,85,247,0.75)"
                        : "rgba(255,255,255,0.09)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-6 -left-4 hidden w-64 rounded-2xl border border-hair bg-surface/95 p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:block lg:-left-10">
        <div className="flex items-center gap-2">
          <span className="size-1.5 animate-beat rounded-full bg-flux shadow-[0_0_10px_2px_rgba(34,211,238,0.85)]" />
          <span className="eyebrow text-mute">Local API · :4815</span>
        </div>
        <pre className="mt-2 overflow-hidden font-mono text-[10px] leading-relaxed text-soft">
          <code>
            {`> POST /api/v1/render
{ "preset": "amv_beat_hammer",
  "aspect": "9:16" }
< 202 accepted · job_8fa21`}
          </code>
        </pre>
      </div>
    </div>
  );
}
