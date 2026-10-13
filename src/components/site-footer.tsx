import Link from "next/link";
import { RELEASE } from "@/lib/downloads";
import { KinetixMark, GithubIcon } from "@/components/icons";

const CURRENT_YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#demo", label: "Live Demo" },
      { href: "/downloads", label: "Download Center" },
      { href: "/#engine", label: "FX Engine" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/docs", label: "API Overview" },
      { href: "/docs#quickstart", label: "Quickstart" },
      { href: "/docs#endpoints", label: "Endpoints" },
      { href: "/docs#mcp", label: "MCP Server" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "https://github.com/kinetix-studio/kinetix", label: "GitHub" },
      { href: "https://github.com/kinetix-studio/kinetix/issues", label: "Issue Tracker" },
      { href: "https://github.com/kinetix-studio/kinetix/blob/main/LICENSE", label: "MIT License" },
      { href: "https://github.com/kinetix-studio/kinetix/releases", label: "Changelog" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-hair bg-pit">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-volt/50 to-transparent" />

      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2.5">
            <KinetixMark className="size-8" />
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-bright">
              Kinetix Studio
            </span>
          </Link>
          <p className="mt-5 text-[14px] leading-relaxed text-mute">
            The open-source, AI-powered desktop video editor. Local-first automation,
            beat-accurate timing, and a public API your agents can drive.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-soft">
              <span className="size-1.5 rounded-full bg-flux shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
              v{RELEASE.version} · {RELEASE.codename}
            </span>
            <a
              href="https://github.com/kinetix-studio/kinetix"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-soft transition-colors hover:border-hair-strong hover:text-bright"
            >
              <GithubIcon className="size-3.5" />
              Star on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-mute">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="text-[14px] text-soft transition-colors hover:text-bright"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-hair">
        <div className="shell flex flex-col gap-3 py-6 text-[12.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {CURRENT_YEAR} Kinetix Studio contributors. MIT licensed.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">
            Built local-first · No account · No watermark
          </p>
        </div>
      </div>
    </footer>
  );
}
