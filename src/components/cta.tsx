import { ArrowRight, Check } from "lucide-react";
import { DownloadButton } from "@/components/download-button";
import { ButtonLink } from "@/components/ui/button";

const POINTS = [
  "MIT licensed, forever free",
  "Runs 100% offline",
  "Full local REST API",
];

export function Cta() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[420px] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(124,58,237,0.32),transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 grid-back h-[380px] [mask-image:radial-gradient(ellipse_70%_90%_at_50%_100%,#000,transparent)]" />

      <div className="shell">
        <div className="relative overflow-hidden rounded-3xl border border-hair bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_38%),#0c0c11] px-6 py-14 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.4),transparent)] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.24),transparent)] blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow text-volt-bright">Start editing</span>
            <h2 className="mt-5 text-balance text-[clamp(1.9rem,4.6vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-gradient">
              Your next edit should take{" "}
              <span className="text-neon">minutes, not weekends.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[15.5px] leading-relaxed text-soft">
              Download Kinetix Studio, point it at a reference track, and let the beat
              analyzer do the cut. Then hand the whole timeline to your agent over the
              local API.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <DownloadButton />
              <ButtonLink href="/docs" variant="outline" size="lg">
                Explore the API
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-[13px] text-mute">
                  <Check className="size-3.5 text-flux" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
