"use client";

import Link from "next/link";
import { ArrowRight, Check, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { DownloadButton } from "@/components/download-button";
import { EditorMockup } from "@/components/editor-mockup";
import { ButtonLink } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";
import { RELEASE } from "@/lib/downloads";

const PROMISES = [
  "Beat-synced AMV & gaming edits",
  "Local REST + MCP API for agents",
  "Zero subscription watermarks",
];

const STATS = [
  { value: "MIT", label: "License, forever" },
  { value: "0", label: "Watermarks, ever" },
  { value: "4721", label: "Local API port" },
  { value: "60", label: "FPS GPU preview" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 grid-back h-[720px]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.4),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute -top-10 right-[-10%] -z-10 h-[380px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.24),transparent)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 noise opacity-[0.035]" />

      <div className="shell">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-hair bg-white/[0.03] py-1.5 pl-1.5 pr-4 backdrop-blur"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-volt/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-volt-bright">
              <span className="size-1.5 animate-beat rounded-full bg-volt-bright" />
              v{RELEASE.version}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">
              {RELEASE.codename} release · open source
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-7 text-balance text-[clamp(2.35rem,6.4vw,4.3rem)] font-semibold leading-[1.0] tracking-[-0.045em]"
          >
            <span className="text-gradient">Automate High-Impact Edits</span>
            <br />
            <span className="text-gradient">with </span>
            <span className="relative inline-block text-neon">
              AI Precision.
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.75, ease }}
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-[linear-gradient(90deg,#c084fc,#a855f7,#22d3ee)] shadow-[0_0_22px_3px_rgba(168,85,247,0.6)]"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-soft sm:text-lg"
          >
            Kinetix Studio reverse-engineers the BPM and transient drops of any reference
            track, then cuts beat-accurate{" "}
            <span className="text-bright">AMV and gaming edits</span> automatically.
            Drive the whole editor from your own scripts or AI agents over a{" "}
            <span className="text-bright">local API and MCP server</span> — with{" "}
            <span className="text-bright">zero subscription watermarks</span>, ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <DownloadButton />
            <ButtonLink href="/docs" variant="outline" size="lg">
              Read the API docs
              <ArrowRight className="size-4" />
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-[13px] text-mute">
                <Check className="size-3.5 text-flux" strokeWidth={3} />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="mt-16 sm:mt-20"
        >
          <EditorMockup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-y border-hair py-6"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5 px-2">
              <span className="font-mono text-xl font-medium tabular-nums text-neon">
                {s.value}
              </span>
              <span className="text-[12.5px] text-mute">{s.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-2">
            <a
              href="https://github.com/kinetix-studio/kinetix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-mute transition-colors hover:text-bright"
            >
              <GithubIcon className="size-4" />
              <Star className="size-3.5 fill-volt-bright text-volt-bright" />
              12.4k stars
            </a>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-1.5 text-[12.5px] text-mute transition-colors hover:text-bright"
            >
              <Play className="size-3.5 fill-flux text-flux" />
              See it edit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
