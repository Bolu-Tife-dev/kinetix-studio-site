"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export type Snippet = {
  id: string;
  label: string;
  lang: "bash" | "python" | "typescript" | "json" | "mcp";
  code: string;
};

const KEYWORDS = new Set([
  "import",
  "from",
  "def",
  "return",
  "async",
  "await",
  "const",
  "let",
  "var",
  "function",
  "export",
  "type",
  "interface",
  "class",
  "new",
  "if",
  "else",
  "for",
  "in",
  "of",
  "try",
  "except",
  "catch",
  "throw",
  "as",
  "true",
  "false",
  "null",
  "undefined",
  "None",
  "True",
  "False",
  "self",
  "print",
]);

const TOKEN_RE =
  /(?<comment>#[^\n]*|\/\/[^\n]*)|(?<str>"""[\s\S]*?"""|'''[\s\S]*?'''|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<num>\b\d+(?:\.\d+)*\b)|(?<bool>\b(?:true|false|null|undefined|None|True|False)\b)|(?<flag>(?<=\s)--?[A-Za-z][\w-]*)|(?<fn>\b[A-Za-z_][\w]*(?=\s*\())|(?<kw>\b\w+\b)/g;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlight(code: string): string {
  const escaped = escapeHtml(code);

  return escaped.replace(TOKEN_RE, (...args) => {
    const match = args[0] as string;
    const groups = args.at(-1) as Record<string, string | undefined> | undefined;

    if (groups?.comment) return `<span class="text-mute/70 italic">${match}</span>`;
    if (groups?.str) return `<span class="text-flux-bright">${match}</span>`;
    if (groups?.num || groups?.bool)
      return `<span class="text-volt-bright">${match}</span>`;
    if (groups?.flag) return `<span class="text-signal/90">${match}</span>`;
    if (groups?.fn) return `<span class="text-[#e9d5ff]">${match}</span>`;
    if (groups?.kw && KEYWORDS.has(match))
      return `<span class="text-volt font-medium">${match}</span>`;

    return match;
  });
}

export function CodeBlock({
  snippets,
  title,
  className = "",
}: {
  snippets: Snippet[];
  title?: string;
  className?: string;
}) {
  const [activeId, setActiveId] = useState(snippets[0]?.id);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = useMemo(
    () => snippets.find((s) => s.id === activeId) ?? snippets[0],
    [snippets, activeId],
  );

  const html = useMemo(() => highlight(active?.code ?? ""), [active]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-hair bg-pit ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-hair bg-white/[0.02] px-3 py-2">
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {snippets.length > 1
            ? snippets.map((s) => {
                const on = s.id === active?.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className={`eyebrow shrink-0 rounded-lg px-3 py-1.5 transition-colors ${
                      on
                        ? "bg-volt/15 text-volt-bright"
                        : "text-mute hover:bg-white/[0.05] hover:text-soft"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })
            : null}
          {title ? (
            <span className="ml-1 truncate font-mono text-[11px] text-mute/80">
              {snippets.length > 1 ? "" : title}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5 text-[11px] font-medium text-mute transition-colors hover:border-hair hover:bg-white/[0.05] hover:text-bright"
        >
          {copied ? (
            <Check className="size-3.5 text-flux" strokeWidth={2.5} />
          ) : (
            <Copy className="size-3.5" strokeWidth={2} />
          )}
          <span className="font-mono uppercase tracking-widest">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      <div className="relative">
        <pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13px]">
          <code
            className="font-mono text-[#d4d4dd]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-pit to-transparent" />
      </div>
    </div>
  );
}
