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
import { RELEASE, SOURCE_REPO } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Agent API Documentation",
  description:
    "Connect external AI agents and scripts to Kinetix Studio over its local REST API on 127.0.0.1:4815.",
};

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "quickstart", label: "Quickstart" },
  { id: "auth", label: "Authentication" },
  { id: "endpoints", label: "Endpoint reference" },
  { id: "automation", label: "Automation examples" },
  { id: "render", label: "Render jobs" },
  { id: "errors", label: "Errors" },
];

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/health",
    desc: "Bridge status, app name, and version. The only route that needs no key.",
  },
  {
    method: "GET",
    path: "/api/v1/timeline",
    desc: "Current project: assets, clips, aspect ratio, and duration.",
  },
  {
    method: "PUT",
    path: "/api/v1/timeline",
    desc: "Replace the project name, aspect ratio, or the full clip list.",
  },
  {
    method: "POST",
    path: "/api/v1/timeline/build-sequence",
    desc: "Cut source clips onto a beat-aligned timeline from beat timestamps.",
  },
  {
    method: "POST",
    path: "/api/v1/audio/extract-and-analyze",
    desc: "Extract audio and detect tempo, beats, and onsets from a local file.",
  },
  {
    method: "POST",
    path: "/api/v1/assets/import",
    desc: "Register a local media file and probe its metadata with ffprobe.",
  },
  {
    method: "POST",
    path: "/api/v1/render",
    desc: "Queue a watermark-free MP4 export of the current timeline.",
  },
  {
    method: "GET",
    path: "/api/v1/render/status",
    desc: "Poll a render job: state, progress, and output path.",
  },
] as const;

const METHOD_TONE: Record<string, string> = {
  GET: "text-flux-bright border-flux/30 bg-flux/10",
  POST: "text-volt-bright border-volt/30 bg-volt/10",
  PUT: "text-signal border-signal/30 bg-signal/10",
  PATCH: "text-signal border-signal/30 bg-signal/10",
};

const quickstart: Snippet[] = [
  {
    id: "qs-shell",
    label: "Shell",
    lang: "bash",
    code: `# 1. Launch Kinetix Studio — the local API starts with the app
# Kinetix-Studio-Setup-1.0.0.exe      # Windows
# ./Kinetix-Studio-1.0.0.AppImage     # Linux

# 2. Confirm the bridge is listening on loopback (no key required)
curl -s http://127.0.0.1:4815/api/v1/health

# 3. Copy your key from Settings → API, then export it
export KINETIX_KEY="kx_..."`,
  },
  {
    id: "qs-response",
    label: "Response",
    lang: "json",
    code: `{
  "ok": true,
  "data": {
    "status": "up",
    "app": "kinetix-studio",
    "version": "1.0.0"
  }
}`,
  },
];

const authSnippets: Snippet[] = [
  {
    id: "auth-curl",
    label: "cURL",
    lang: "bash",
    code: `# Either header style works
curl http://127.0.0.1:4815/api/v1/timeline \\
  -H "X-API-Key: $KINETIX_KEY"

curl http://127.0.0.1:4815/api/v1/timeline \\
  -H "Authorization: Bearer $KINETIX_KEY"

# EventSource-friendly fallback: ?api_key=$KINETIX_KEY`,
  },
  {
    id: "auth-py",
    label: "Python",
    lang: "python",
    code: `import os
import httpx

BASE = "http://127.0.0.1:4815/api/v1"
HEADERS = {"X-API-Key": os.environ["KINETIX_KEY"]}

with httpx.Client(base_url=BASE, headers=HEADERS, timeout=30.0) as client:
    health = client.get("/health").json()
    timeline = client.get("/timeline").json()

print(health["data"]["version"], timeline["data"]["durationSec"])`,
  },
];

const automation: Snippet[] = [
  {
    id: "auto-curl",
    label: "cURL",
    lang: "bash",
    code: `# 1. Detect tempo and the beat grid from a reference track
curl -X POST http://127.0.0.1:4815/api/v1/audio/extract-and-analyze \\
  -H "X-API-Key: $KINETIX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "path": "C:/footage/tracks/midnight_rush.wav" }'
# → { "ok": true, "data": { "tempoBpm": 174.0, "beatsMs": [0, 172, 344, ...] } }

# 2. Cut sources onto the beat grid (beats are millisecond timestamps)
curl -X POST http://127.0.0.1:4815/api/v1/timeline/build-sequence \\
  -H "X-API-Key: $KINETIX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "clips": [
      { "path": "C:/footage/amv/sakuga_01.mp4" },
      { "path": "C:/footage/amv/sakuga_02.mp4" }
    ],
    "beats": [0, 172, 344, 517, 689],
    "tempoBpm": 174.0,
    "aspectRatio": "9:16",
    "transition": "flash",
    "grouping": "bar",
    "textEveryNBeats": 8,
    "textTemplate": "DROP {n}"
  }'
# → { "ok": true, "data": { "clips": [...], "durationSec": 12.4 } }`,
  },
  {
    id: "auto-py",
    label: "Python",
    lang: "python",
    code: `import os
import httpx

BASE = "http://127.0.0.1:4815/api/v1"
HEADERS = {
    "X-API-Key": os.environ["KINETIX_KEY"],
    "Content-Type": "application/json",
}


def analyse_and_cut(sources: list[str], reference: str) -> dict:
    """Reverse-engineer a reference track, then cut to its beat grid."""
    with httpx.Client(base_url=BASE, headers=HEADERS, timeout=60.0) as client:
        analysis = client.post(
            "/audio/extract-and-analyze",
            json={"path": reference},
        ).json()["data"]

        project = client.post(
            "/timeline/build-sequence",
            json={
                "clips": [{"path": p} for p in sources],
                "beats": analysis["beatsMs"],
                "tempoBpm": analysis["tempoBpm"],
                "aspectRatio": "9:16",
                "transition": "flash",
                "grouping": "bar",
            },
        ).json()["data"]

    return {"bpm": analysis["tempoBpm"], "clips": len(project["clips"])}


result = analyse_and_cut(
    sources=["C:/footage/amv/sakuga_01.mp4", "C:/footage/amv/sakuga_02.mp4"],
    reference="C:/footage/tracks/midnight_rush.wav",
)

print(result)  # {'bpm': 174.0, 'clips': 42}`,
  },
  {
    id: "auto-ts",
    label: "TypeScript",
    lang: "typescript",
    code: `const BASE = "http://127.0.0.1:4815/api/v1";
const headers = {
  "X-API-Key": process.env.KINETIX_KEY!,
  "Content-Type": "application/json",
};

const analysis = await fetch(\`\${BASE}/audio/extract-and-analyze\`, {
  method: "POST",
  headers,
  body: JSON.stringify({ path: "C:/footage/tracks/midnight_rush.wav" }),
}).then((r) => r.json());

const project = await fetch(\`\${BASE}/timeline/build-sequence\`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    clips: [{ path: "C:/footage/amv/sakuga_01.mp4" }],
    beats: analysis.data.beatsMs,
    tempoBpm: analysis.data.tempoBpm,
    aspectRatio: "9:16",
    transition: "flash",
  }),
}).then((r) => r.json());

console.log(
  \`\${analysis.data.tempoBpm} BPM · \${project.data.clips.length} clips\`,
);`,
  },
];

const renderSnippets: Snippet[] = [
  {
    id: "render-queue",
    label: "Queue + poll",
    lang: "bash",
    code: `# Queue an export — output follows the project's aspect ratio and clips
curl -X POST http://127.0.0.1:4815/api/v1/render \\
  -H "X-API-Key: $KINETIX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "outPath": "C:/renders/midnight_rush_9x16.mp4" }'
# → { "ok": true, "data": { "jobId": "…", "statusUrl": "/api/v1/render/status?jobId=…" } }

# Poll until the job leaves the queue and finishes
JOB="<jobId>"
while true; do
  curl -s "http://127.0.0.1:4815/api/v1/render/status?jobId=$JOB" \\
    -H "X-API-Key: $KINETIX_KEY" | jq -r '.data.state'
  sleep 2
done
# queued → running → done | error`,
  },
  {
    id: "render-status",
    label: "Status response",
    lang: "json",
    code: `{
  "ok": true,
  "data": {
    "jobId": "9f1b2c3d-…",
    "state": "running",
    "progress": 0.62,
    "frames": 744,
    "fps": 96.4,
    "speed": "3.2x",
    "startedAt": 1760332800000
  }
}

// state: "queued" | "running" | "done" | "error"
// done adds  "outPath": "C:/renders/midnight_rush_9x16.mp4"
// error adds "error": "<ffmpeg message>"`,
  },
];

const errorSnippets: Snippet[] = [
  {
    id: "err-auth",
    label: "Runtime error",
    lang: "json",
    code: `HTTP/1.1 401 Unauthorized

{
  "ok": false,
  "error": "Missing or invalid API key. Pass it via the X-API-Key header or Authorization: Bearer <key>."
}`,
  },
  {
    id: "err-validation",
    label: "Validation error (400)",
    lang: "json",
    code: `{
  "ok": false,
  "error": {
    "formErrors": [],
    "fieldErrors": {
      "beats": ["Expected array, received undefined"]
    }
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
              Loopback only
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-gradient">
            Drive the editor from{" "}
            <span className="text-neon">your own agents.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-soft">
            Kinetix Studio exposes a versioned REST API on{" "}
            <code className="font-mono text-flux-bright">127.0.0.1:4815</code>.
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
              app. It reads and writes the same project state the editor is watching, so
              an agent can open media, analyse audio, build beat-synced sequences, and
              render — and every change appears in the UI live.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Server,
                  title: "Local REST",
                  body: "Versioned JSON API on 127.0.0.1:4815. Bound to loopback, never exposed.",
                },
                {
                  icon: Radio,
                  title: "API-key auth",
                  body: "One scoped key, sent as X-API-Key or Bearer. Rotate it from Settings.",
                },
                {
                  icon: Webhook,
                  title: "Job polling",
                  body: "Queue exports, then poll state, progress, and the output path.",
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
              Launch the app, verify the bridge, and export your key. That is the whole
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
              Every route except{" "}
              <code className="font-mono text-flux-bright">/api/v1/health</code> requires
              the key. It is generated on first launch, stored in{" "}
              <code className="mx-1 font-mono text-flux-bright">settings.json</code>, shown
              and rotatable in Settings → API, and checked with a constant-time compare.
              The server binds to <code className="mx-1 font-mono text-flux-bright">127.0.0.1</code>
              , so other machines on your network cannot reach it at all.
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
              All routes are prefixed with{" "}
              <code className="font-mono text-flux-bright">/api/v1</code>. Request and
              response bodies are JSON. Media is referenced by absolute filesystem path,
              never uploaded — the one exception is{" "}
              <code className="font-mono text-flux-bright">wavBase64</code> on the analyse
              endpoint, which accepts an inline WAV of up to 50&nbsp;MB.
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
              A complete AMV pipeline in two calls: analyse the reference track for its
              tempo and beat grid, then cut your sources onto that grid while reframing
              to 9:16. Paths are absolute and local — they are read by the desktop
              machine, never uploaded.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={automation} />
            </div>
          </section>

          <section>
            <Heading
              id="render"
              icon={Webhook}
              kicker="06 — Long jobs"
              title="Render jobs"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Renders can take minutes. POST to queue one, then poll the status route —
              jobs are serialized, so extra submissions wait their turn. There are no
              webhooks or sockets; polling is the whole protocol.
            </p>
            <div className="mt-6">
              <CodeBlock snippets={renderSnippets} />
            </div>
          </section>

          <section>
            <Heading
              id="errors"
              icon={TriangleAlert}
              kicker="07 — Failures"
              title="Errors"
            />
            <p className="mt-4 text-[15px] leading-relaxed text-soft">
              Every failure wraps the same envelope:{" "}
              <code className="font-mono text-flux-bright">{"{ ok: false, error }"}</code>.
              For 401, 403, 404, and 422 responses{" "}
              <code className="mx-1 font-mono text-flux-bright">error</code> is a
              human-readable string. For 400 validation failures it is a flattened object
              with per-field messages — branch on the HTTP status first.
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
                  Download Studio, copy your key from Settings, and ship in minutes.
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
                href={`${SOURCE_REPO}/issues`}
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
