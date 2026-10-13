import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { KinetixMark } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-40 pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 grid-back h-[520px]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.32),transparent)] blur-3xl" />

      <div className="shell flex flex-col items-center text-center">
        <KinetixMark className="size-12" />
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-mute">
          Render error · 404
        </p>
        <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-gradient">
          This clip is{" "}
          <span className="text-neon">not on the timeline.</span>
        </h1>
        <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-soft">
          The page you requested was cut out. Head back to the overview or grab the
          latest build from the download center.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="size-4" />
            Back to overview
          </ButtonLink>
          <ButtonLink href="/downloads" variant="outline" size="lg">
            <Search className="size-4" />
            Download center
          </ButtonLink>
        </div>

        <p className="mt-10 font-mono text-[11.5px] text-mute/70">
          Looking for the API?{" "}
          <Link
            href="/docs"
            className="text-soft underline decoration-hair-strong underline-offset-4 transition-colors hover:text-bright"
          >
            /docs
          </Link>
        </p>
      </div>
    </section>
  );
}
