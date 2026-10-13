import type { Metadata } from "next";
import type { ElementType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  CircleCheck,
  KeyRound,
  Radio,
  Server,
  SquareTerminal,
  TriangleAlert,
  Webhook,
} from "lucide-react";
import { CodeBlock, type Snippet } from "@/components/ui/code-block";
import { DocsToc, type TocItem } from "@/components/docs-toc";
import { ButtonLink } from "@/components/ui/button";
import { RELEASE } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Agent API Documentation",
  description:
    "Connect external AI agents and scripts to Kinetix Studio over its local REST API and Model Context Protocol server.",
};

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "quickstart", label: "Quickstart" },
  { id: "auth", label: "Authentication" },
  { id: "endpoints", label: "Endpoint reference" },
  { id: "automation", label: "Automation examples" },
  { id: "mcp", label: "MCP server" },
  { id: "webhooks", label: "Webhooks & events" },
  { id: "errors", label: "Errors" },
];

const ENDPOINTS = [
  {
    method: "GET",
    path: "/v1/health",
    desc: "Bridge status, app version, GPU, and bound port.",
  },
  {
    method: "GET",
    path: "/v1/projects",
    desc: "List open projects and their timeline summaries.",
  },
  {
    method: "POST",
    path: "/v1/projects",
    desc: "Create a project directly from local media paths.",
  },
  {
    method: "POST",
    path: "/v1/analyze/bpm",
    desc: "Reverse-engineer BPM, beat grid, and transient drops.",
  },
  {
    method: "POST",
    path: "/v1/timeline/autocut",
    desc: "Cut source clips onto a beat-aligned timeline.",
  },
  {
    method: "PATCH",
    path: "/v1/timeline/{id}",
    desc: "Mutate clips, tracks, effects, and keyframes.",
  },
  {
    method: "POST",
    path: "/v1/reframe",
    desc: "Smart auto-reframe to 9:16, 16:9, or a custom ratio.",
  },
  {
    method: "POST",
    path: "/v1/render/export",
    desc: "Queue a watermark-free export with a named preset.",
  },
  {
    method: "GET",
    path: "/v1/jobs/{id}",
    desc: "Poll render progress, stage, and output path.",
  },
  {
    method: "GET",
    path: "/v1/events",
    desc: "Server-sent event stream for job lifecycle updates.",
  },
] as const;

const METHOD_TONE: Record<string, string> = {
  GET: "text-flux-bright border-flux/30 bg-flux/10",
  POST: "text-volt-bright border-volt/30 bg-volt/10",
  PATCH: "text-signal border-signal/30 bg-signal/10",
};

const quickstart: Snippet[] = [
  {
    id: "qs-shell",
    label: "Shell",
    lang: "bash",
    code: `# 1. Launch Kinetix Studio — the local agent bridge starts automatically
open -a "Kinetix Studio"              # macOS
# Kinetix-Studio-Setup.exe           # Windows
# ./Kinetix-Studio-2.4.1.AppImage    # Linux

# 2. Confirm the bridge is listening on loopback
curl -s http://127.0.0.1:4721/v1/health | jq

# 3. Mint a token for your agent: Settings → Agent Bridge → Authorize
export KINETIX_TOKEN="kx_live_9f3a2c81d4b7e60a5f19"`,
  },
  {
    id: "qs-response",
    label: "Response",
    lang: "json",
    code: `{
  "status": "ok",
  "version": "2.4.1",
  "codename": "Spectra",
  "port": 4721,
  "bind": "127.0.0.1",
  "gpu": { "name": "RTX 4070", "vram_mb": 12288, "accel": "cuda" },
  "mcp": { "enabled": true, "transport": "stdio" },
  "scopes": ["timeline.read", "timeline.write", "render"]
}`,
  },
];

const authSnippets: Snippet[] = [
  {
    id: "auth-curl",
    label: "cURL",
    lang: "bash",
    code: `curl http://127.0.0.1:4721/v1/projects \\
  -H "Authorization: Bearer $KINETIX_TOKEN" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "auth-ts",
    label: "TypeScript",
    lang: "typescript",
    code: `import { Kinetix } from "@kinetix-studio/sdk";

const kinetix = new Kinetix({
  baseUrl: "http://127.0.0.1:4721",
  token: process.env.KINETIX_TOKEN!,
});

const projects = await kinetix.projects.list();`,
  },
];

const automation: Snippet[] = [
  {
    id: "auto-curl",
    label: "cURL",
    lang: "bash",
    code: `# Reverse-engineer the reference track, then cut a timeline to the grid
curl -X POST http://127.0.0.1:4721/v1/analyze/bpm \\
  -H "Authorization: Bearer $KINETIX_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "audio": "/footage/tracks/midnight_rush.wav",
    "sensitivity": 0.82,
    "detect_drops": true
  }'
# → { "bpm": 174.0, "beats": 128, "drops": [12.4, 27.8, 41.2] }

curl -X POST http://127.0.0.1:4721/v1/timeline/autocut \\
  -H "Authorization: Bearer $KINETIX_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project": "midnight_rush_amv",
    "audio": "/footage/tracks/midnight_rush.wav",
    "sources": ["/footage/amv/sakuga_01.mp4", "/footage/amv/sakuga_02.mp4"],
    "grid": "1/16",
    "max_shot_ms": 900,
    "flash_on_downbeat": true,
    "reframe": { "aspect": "9:16", "track_subject": true }
  }'`,
  },
  {
    id: "auto-py",
    label: "Python",
    lang: "python",
    code: `import os
import httpx

BASE = "http://127.0.0.1:4721/v1"
HEADERS = {
    "Authorization": f"Bearer {os.environ['KINETIX_TOKEN']}",
    "Content-Type": "application/json",
}


def analyse_and_cut(sources: list[str], reference: str) -> dict:
    """Reverse-engineer a reference track, then cut to its beat grid."""
    with httpx.Client(base_url=BASE, headers=HEADERS, timeout=30.0) as client:
        analysis = client.post(
            "/analyze/bpm",
            json={"audio": reference, "sensitivity": 0.82, "detect_drops": True},
        ).json()

        cut = client.post(
            "/timeline/autocut",
            json={
                "project": "midnight_rush_amv",
                "audio": reference,
                "sources": sources,
                "grid": "1/16",
                "max_shot_ms": 900,
                "flash_on_downbeat": True,
                "reframe": {"aspect": "9:16", "track_subject": True},
            },
        ).json()

    return {"bpm": analysis["bpm"], "cuts": cut["cut_count"], "job": cut["id"]}


result = analyse_and_cut(
    sources=["/footage/amv/sakuga_01.mp4", "/footage/amv/sakuga_02.mp4"],
    reference="/footage/tracks/midnight_rush.wav",
)

print(result)  # {'bpm': 174.0, 'cuts': 41, 'job': 'job_8fa21'}`,
  },
  {
    id: "auto-ts",
    label: "TypeScript",
    lang: "typescript",
    code: `import { Kinetix } from "@kinetix-studio/sdk";

const kinetix = new Kinetix({
  baseUrl: "http://127.0.0.1:4721",
  token: process.env.KINETIX_TOKEN!,
});

const analysis = await kinetix.analyze.bpm({
  audio: "/footage/tracks/midnight_rush.wav",
  sensitivity: 0.82,
  detectDrops: true,
});

const job = await kinetix.timeline.autoCut({
  project: "midnight_rush_amv",
  audio: "/footage/tracks/midnight_rush.wav",
  sources: ["/footage/amv/sakuga_01.mp4", "/footage/amv/sakuga_02.mp4"],
  grid: "1/16",
  maxShotMs: 900,
  flashOnDownbeat: true,
  reframe: { aspect: "9:16", trackSubject: true },
});

const rendered = await kinetix.render.export({
  jobId: job.id,
  preset: "midnight_rush",
  watermark: false,
});

console.log(\`\${analysis.bpm} BPM · \${job.cutCount} cuts → \${rendered.output}\`);`,
  },
];

const mcpSnippets: Snippet[] = [
  {
    id: "mcp-config",
    label: "claude_desktop_config.json",
    lang: "json",
    code: `{
  "mcpServers": {
    "kinetix-studio": {
      "command": "kinetix",
      "args": ["mcp", "serve", "--transport", "stdio"],
      "env": {
        "KINETIX_TOKEN": "kx_live_9f3a2c81d4b7e60a5f19"
      }
    }
  }
}`,
  },
  {
    id: "mcp-tools",
    label: "Exposed tools",
    lang: "bash",
    code: `$ kinetix mcp tools

  analyze_bpm       Reverse-engineer BPM, beats, and drop positions
  auto_cut          Cut sources onto a beat-aligned timeline
  apply_preset      Apply a grade / aberration / flash preset by name
  reframe           Rebuild the timeline for a target aspect ratio
  export_render     Queue a watermark-free export
  subscribe_events  Stream job progress over server-sent events`,
  },
];

const webhookSnippets: Snippet[] = [
  {
    id: "wh-register",
    label: "Register",
    lang: "bash",
    code: `curl -X POST http://127.0.0.1:4721/v1/webhooks \\
  -H "Authorization: Bearer $KINETIX_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://agent.example.com/hooks/kinetix",
    "events": ["job.queued", "job.progress", "job.completed", "job.failed"],
    "signing_secret": "whsec_7c21a9e04b"
  }'`,
  },
  {
    id: "wh-sse",
    label: "SSE stream",
    lang: "bash",
    code: `curl -N http://127.0.0.1:4721/v1/events \\
  -H "Authorization: Bearer $KINETIX_TOKEN"

event: job.progress
data: {"job_id":"job_8fa21","pct":62,"eta_s":11,"stage":"encoding"}

event: job.completed
data: {"job_id":"job_8fa21","output":"/renders/midnight_rush_9x16.mp4","watermark":false}`,
  },
];

const errorSnippets: Snippet[] = [
  {
    id: "err-json",
    label: "Error shape",
    lang: "json",
    code: `{
  "error": {
    "type": "beat_grid_conflict",
    "message": "Shot length 40ms is below the 1/16 grid resolution at 174 BPM.",
    "param": "max_shot_ms",
    "request_id": "req_0c71b9",
    "docs": "https://kinetix.studio/docs#errors"
  }
}`,
  },
];

function Heading({
  id,
  icon: Icon,
  kicker,
  title,
}: {
  id: string;
  icon: ElementType;
  kicker: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 pt-14 first:pt-0">
      <div className="flex items-center gap-2.5">
        <Icon className="size-4 text-volt-bright" />
        <span className="eyebrow text-mute">{kicker}</span>
      </div>
      <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.025em] text-bright sm:text-[30px]">
        {title}
      </h2>
    </div>
  );
}

export default function DocsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-hair pt-32 pb-16 lg:pt-40">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 grid-back h-[520px]" />
        <div className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.34),transparent)] blur-3xl" />

        <div className="shell">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-volt/30 bg-volt/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-volt-bright">
              API v1
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-hair bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-soft">
              Ships with Studio {RELEASE.version}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-flux/30 bg-flux/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-flux-bright">
              MCP compatible
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-gradient">
            Drive the editor from{" "}
            <span className="text-neon">your own agents.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-soft">
            Kinetix Studio exposes a versioned REST API and a Model Context Protocol
            server on <code className="font-mono text-flux-bright">127.0.0.1:4721</code>.
            Nothing leaves your machine, nothing is rate-limited, and every operation the
            UI can perform is scriptable.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/downloads" size="md">
              Get Studio {RELEASE.version}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#quickstart" variant="outline" size="md">
              <SquareTerminal className="size-4" />
              Jump to quickstart
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="shell grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        <div className="min-w-0">
          <section>
            <Heading
              id="overview"
              icon={Server}
              kicker="01 — Foundations"
              title="Overview"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              The Agent Bridge is a loopback-only HTTP server that starts with the desktop
              app. It mirrors the editor&apos;s internal command bus, so an agent can open
              projects, analyse audio, mutate the timeline, apply presets, reframe, and
              render — with the same undo stack and validation the UI uses.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Server,
                  title: "Local REST",
                  body: "Versioned JSON API on 127.0.0.1:4721. CORS-restricted, token-gated.",
                },
                {
                  icon: Radio,
                  title: "MCP server",
                  body: "First-class stdio transport with typed tools for every command.",
                },
                {
                  icon: Webhook,
                  title: "Events",
                  body: "Signed webhooks and an SSE stream for long-running render jobs.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="card p-5">
                  <Icon className="size-4 text-volt-bright" />
                  <h3 className="mt-3 text-[15px] font-semibold text-bright">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Heading
              id="quickstart"
              icon={CircleCheck}
              kicker="02 — Get running"
              title="Quickstart"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Launch the app, verify the bridge, and mint a scoped token. That is the whole
              setup — there is no cloud account, OAuth dance, or API key dashboard.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={quickstart} />
            </div>
          </section>

          <section>
            <Heading
              id="auth"
              icon={KeyRound}
              kicker="03 — Security"
              title="Authentication"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Every request requires a bearer token. Tokens are scoped, revocable from the
              app, and stored in the OS keychain. The bridge refuses any request whose
              <code className="mx-1 font-mono text-flux-bright">Host</code> header is not a
              loopback address, which blocks drive-by browser calls from other sites.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={authSnippets} />
            </div>
          </section>

          <section>
            <Heading
              id="endpoints"
              icon={Braces}
              kicker="04 — Reference"
              title="Endpoint reference"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              All routes are prefixed with <code className="font-mono text-flux-bright">/v1</code>.
              Request and response bodies are JSON. Binary media is referenced by absolute
              filesystem path, never uploaded.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-hair">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-hair bg-white/[0.02]">
                      <th className="eyebrow px-4 py-3 text-mute">Method</th>
                      <th className="eyebrow px-4 py-3 text-mute">Path</th>
                      <th className="eyebrow px-4 py-3 text-mute">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ENDPOINTS.map((e) => (
                      <tr
                        key={e.path}
                        className="border-b border-hair last:border-0 transition-colors hover:bg-white/[0.025]"
                      >
                        <td className="px-4 py-3 align-top">
                          <span
                            className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-medium ${METHOD_TONE[e.method]}`}
                          >
                            {e.method}
                          </span>
                        </td>
                        <td className="px-4 py-3 align-top font-mono text-[13px] text-bright">
                          {e.path}
                        </td>
                        <td className="px-4 py-3 align-top text-[13.5px] text-soft">
                          {e.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <Heading
              id="automation"
              icon={SquareTerminal}
              kicker="05 — Workflows"
              title="Automation examples"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              A complete AMV pipeline in three calls: analyse the reference, cut to the
              beat grid while auto-reframing to 9:16, then export without a watermark.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={automation} />
            </div>
          </section>

          <section>
            <Heading id="mcp" icon={Radio} kicker="06 — Agents" title="MCP server" />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Register Studio as an MCP server and any MCP-capable client — Claude Desktop,
              Cursor, or your own orchestrator — gains typed tools for the full editing
              surface. The server speaks stdio and proxies to the local REST bridge.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={mcpSnippets} />
            </div>
          </section>

          <section>
            <Heading
              id="webhooks"
              icon={Webhook}
              kicker="07 — Long jobs"
              title="Webhooks &amp; events"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Renders can take minutes. Subscribe to signed webhooks or open the SSE stream
              and let your agent do something else until the file lands.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={webhookSnippets} />
            </div>
          </section>

          <section>
            <Heading
              id="errors"
              icon={TriangleAlert}
              kicker="08 — Failures"
              title="Errors"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Errors share one envelope. The{" "}
              <code className="font-mono text-flux-bright">type</code> field is stable and
              safe to branch on; the human-readable{" "}
              <code className="font-mono text-flux-bright">message</code> is not.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={errorSnippets} />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-volt/25 bg-volt/[0.06] p-6">
              <div>
                <h3 className="text-[16px] font-semibold text-bright">
                  Ready to wire up an agent?
                </h3>
                <p className="mt-1 text-[14px] text-soft">
                  Download Studio, enable the Agent Bridge, and ship in minutes.
                </p>
              </div>
              <ButtonLink href="/downloads" size="md">
                Download Studio
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>

            <p className="mt-6 text-[13px] text-mute">
              Something missing?{" "}
              <Link
                href="https://github.com/kinetix-studio/kinetix/issues"
                target="_blank"
                rel="noreferrer noopener"
                className="text-soft underline decoration-hair-strong underline-offset-4 transition-colors hover:text-bright"
              >
                Open an API request on GitHub
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="hidden lg:block">
          <DocsToc items={TOC} />
        </aside>
      </div>
    </>
  );
}
