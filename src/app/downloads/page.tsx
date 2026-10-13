import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  GitBranch,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { DownloadCenter } from "@/components/download-center";
import { ButtonLink } from "@/components/ui/button";
import { RELEASE } from "@/lib/downloads";
import { GithubIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Download Center",
  description:
    "Download Kinetix Studio for Windows, macOS, and Linux. Signed builds, SHA-256 checksums, no watermarks.",
};

const HIGHLIGHTS = [
  {
    icon: Lock,
    title: "No watermark, ever",
    body: "Free builds export at full resolution with no burn-in, no outro card, and no subscription.",
  },
  {
    icon: Zap,
    title: "Offline by default",
    body: "Every build runs fully local. The API binds to loopback and nothing phones home.",
  },
  {
    icon: GitBranch,
    title: "Built from source",
    body: "Each release is reproducible from the public tag. Check the workflow logs yourself.",
  },
  {
    icon: CircleCheck,
    title: "Signed artifacts",
    body: "Windows Authenticode, Apple notarization, and detached GPG signatures for Linux.",
  },
];

const RELEASES = [
  {
    version: "2.4.1",
    codename: "Spectra",
    date: RELEASE.releasedAt,
    channel: "stable",
    summary:
      "MCP stdio transport, subject-aware auto-reframe, 12 new FX presets, and a 3.1× faster beat analyzer.",
  },
  {
    version: "2.3.6",
    codename: "Prism",
    date: "2026-08-14",
    channel: "stable",
    summary:
      "Signed webhooks, timeline PATCH endpoint, and macOS Apple Silicon performance rewrite.",
  },
  {
    version: "2.3.0",
    codename: "Ember",
    date: "2026-07-02",
    channel: "stable",
    summary:
      "Initial public Agent Bridge, GPU-accelerated preview, and the dark aesthetic FX engine.",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-hair pt-32 pb-14 lg:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 grid-back h-[480px]" />
        <div className="pointer-events-none absolute -top-32 right-1/4 -z-10 h-[400px] w-[560px] translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.24),transparent)] blur-3xl" />
        <div className="pointer-events-none absolute -top-40 left-1/4 -z-10 h-[420px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.36),transparent)] blur-3xl" />

        <div className="shell">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-flux-bright">03</span>
            <span className="h-px w-8 bg-gradient-to-r from-flux/70 to-transparent" />
            <span className="eyebrow text-mute">Download Center</span>
          </div>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-balance text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-gradient">
                Get Kinetix Studio{" "}
                <span className="text-neon">v{RELEASE.version}</span>
              </h1>
              <p className="mt-5 text-pretty text-[16px] leading-relaxed text-soft">
                Signed builds for every platform, each with a published SHA-256 digest.
                Pick your OS — the recommended artifact is already selected for you.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-hair bg-white/[0.03] px-3.5 py-2.5 font-mono text-[11.5px] text-soft">
                <Sparkles className="size-3.5 text-volt-bright" />
                {RELEASE.codename} · {RELEASE.channel}
              </span>
              <a
                href={RELEASE.notesUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-hair-strong bg-white/[0.03] px-3.5 py-2.5 text-[13.5px] text-bright transition-colors hover:bg-white/[0.07]"
              >
                <GithubIcon className="size-4" />
                Release notes
                <ArrowRight className="size-3.5 text-mute" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <DownloadCenter />
      </section>

      <section className="shell pb-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card p-6">
              <Icon className="size-4 text-volt-bright" />
              <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-bright">
                {title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-mute">Release history</span>
            <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.025em] text-bright">
              Every previous build
            </h2>
          </div>
          <Link
            href="https://github.com/kinetix-studio/kinetix/releases"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-2 text-[13.5px] text-soft transition-colors hover:text-bright sm:flex"
          >
            View all tags
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-hair">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hair bg-white/[0.02]">
                  <th className="eyebrow px-5 py-3 text-mute">Version</th>
                  <th className="eyebrow px-5 py-3 text-mute">Released</th>
                  <th className="eyebrow px-5 py-3 text-mute">Channel</th>
                  <th className="eyebrow px-5 py-3 text-mute">Highlights</th>
                </tr>
              </thead>
              <tbody>
                {RELEASES.map((r) => (
                  <tr
                    key={r.version}
                    className="border-b border-hair last:border-0 transition-colors hover:bg-white/[0.025]"
                  >
                    <td className="px-5 py-4 align-top">
                      <span className="font-mono text-[13.5px] text-bright">
                        {r.version}
                      </span>
                      <span className="ml-2 text-[12.5px] text-mute">{r.codename}</span>
                    </td>
                    <td className="px-5 py-4 align-top font-mono text-[12.5px] text-soft">
                      {r.date}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <span className="rounded-md border border-hair bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-soft">
                        {r.channel}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top text-[13.5px] text-soft">
                      {r.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-hair bg-white/[0.02] p-7 sm:flex-row">
          <div>
            <h3 className="text-[16px] font-semibold text-bright">
              Prefer to build it yourself?
            </h3>
            <p className="mt-1 text-[14px] text-soft">
              The entire editor is MIT licensed. Clone the tag and run{" "}
              <code className="font-mono text-flux-bright">pnpm build</code>.
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonLink
              href="https://github.com/kinetix-studio/kinetix"
              variant="outline"
              size="md"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubIcon className="size-4" />
              Source
            </ButtonLink>
            <ButtonLink href="/docs" size="md">
              API docs
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
