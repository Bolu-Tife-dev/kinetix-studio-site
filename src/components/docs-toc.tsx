"use client";

import { useEffect, useState } from "react";
import { Hash } from "lucide-react";

export type TocItem = { id: string; label: string };

export function DocsToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -64% 0px", threshold: [0, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Documentation sections" className="sticky top-24">
      <p className="eyebrow text-mute">On this page</p>
      <ul className="mt-4 space-y-0.5 border-l border-hair">
        {items.map((item) => {
          const on = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px flex items-center gap-2 border-l py-2 pl-4 text-[13.5px] transition-colors ${
                  on
                    ? "border-volt text-bright"
                    : "border-transparent text-mute hover:border-hair-strong hover:text-soft"
                }`}
              >
                <Hash
                  className={`size-3.5 shrink-0 ${on ? "text-volt-bright" : "text-mute/50"}`}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 rounded-xl border border-hair bg-white/[0.02] p-4">
        <p className="eyebrow text-flux-bright">Base URL</p>
        <code className="mt-2.5 block break-all font-mono text-[12px] text-soft">
          http://127.0.0.1:4721
        </code>
        <p className="mt-3 text-[12.5px] leading-relaxed text-mute">
          The API only binds to loopback. Remote agents must tunnel or run on the same
          machine.
        </p>
      </div>
    </nav>
  );
}
