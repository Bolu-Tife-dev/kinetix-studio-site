import { AudioWaveform, Bot, Scissors, Upload } from "lucide-react";

const MARQUEE = [
  "Beat-synced AMV cuts",
  "MCP-compatible agent bridge",
  "Subject-aware auto-reframe",
  "Chromatic aberration FX",
  "GPU-accelerated preview",
  "Loopback-only REST API",
  "Zero watermarks",
  "MIT licensed",
  "Transient drop mapping",
  "Dark aesthetic presets",
];

const STEPS = [
  {
    icon: Upload,
    kicker: "Import",
    title: "Drop in media and a reference track",
    body:
      "Point Kinetix at your footage and the song you want to edit to. Nothing is uploaded — the analyzer runs on your GPU.",
  },
  {
    icon: AudioWaveform,
    kicker: "Analyze",
    title: "It solves the BPM and every drop",
    body:
      "The beat analyzer reverse-engineers tempo, the full beat grid, and transient drops, then maps a shot-length curve across the track.",
  },
  {
    icon: Scissors,
    kicker: "Cut",
    title: "Cuts snap to the grid automatically",
    body:
      "Sources are sliced onto the 1/16 grid with flash, aberration, and shake applied on downbeats. Reframe to 9:16 or 16:9 in the same pass.",
  },
  {
    icon: Bot,
    kicker: "Automate",
    title: "Hand the timeline to your agent",
    body:
      "Every operation is a REST call or MCP tool. Have your agent tweak shots, swap presets, and queue a watermark-free render.",
  },
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-hair bg-pit py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-pit to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-pit to-transparent" />
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {MARQUEE.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-3 whitespace-nowrap px-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute"
              >
                <span className="size-1 rounded-full bg-volt/70" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-volt-bright">03</span>
            <span className="h-px w-8 bg-gradient-to-r from-volt/70 to-transparent" />
            <span className="eyebrow text-mute">Workflow</span>
          </div>
          <h2 className="mt-5 text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-gradient">
            From raw footage to a finished edit{" "}
            <span className="text-neon">in four moves.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="group relative bg-surface p-7 transition-colors duration-300 hover:bg-panel"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl border border-volt/25 bg-volt/10 transition-colors duration-300 group-hover:border-volt/45 group-hover:bg-volt/15">
                  <step.icon className="size-5 text-volt-bright" />
                </span>
                <span className="font-mono text-[11px] tabular-nums text-mute/60">
                  0{i + 1}
                </span>
              </div>
              <span className="eyebrow mt-6 block text-flux-bright">{step.kicker}</span>
              <h3 className="mt-3 text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-bright">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-mute">{step.body}</p>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,#a855f7,#22d3ee)] transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
