"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Terminal, Download, BookOpen } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { KinetixMark, GithubIcon } from "@/components/icons";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/#features", label: "Features" },
  { href: "/#demo", label: "Live Demo" },
  { href: "/docs", label: "API Docs" },
  { href: "/downloads", label: "Downloads" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-hair bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <KinetixMark className="size-8 transition-transform duration-300 group-hover:rotate-[-8deg]" />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-bright">
                Kinetix Studio
              </span>
              <span className="mt-1 hidden font-mono text-[9.5px] uppercase tracking-[0.24em] text-mute sm:block">
                Open Source · v2.4.1
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2 text-[13.5px] font-medium tracking-tight transition-colors ${
                  isActive(item.href)
                    ? "text-bright"
                    : "text-soft hover:bg-white/[0.04] hover:text-bright"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-volt to-transparent"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/kinetix-studio/kinetix"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Kinetix Studio on GitHub"
              className="hidden size-9 items-center justify-center rounded-lg border border-hair text-soft transition-colors hover:border-hair-strong hover:text-bright sm:flex"
            >
              <GithubIcon className="size-[17px]" />
            </a>
            <ButtonLink
              href="/downloads"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => setOpen(false)}
            >
              <Download className="size-4" />
              Get the app
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-9 items-center justify-center rounded-lg border border-hair text-soft transition-colors hover:text-bright lg:hidden"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-hair bg-void lg:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.24 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-soft transition-colors hover:bg-white/[0.05] hover:text-bright"
                  >
                    {item.label}
                    {item.href === "/docs" ? (
                      <Terminal className="size-4 text-mute" />
                    ) : item.href === "/downloads" ? (
                      <Download className="size-4 text-mute" />
                    ) : item.href === "/#demo" ? (
                      <Menu className="size-4 text-mute" />
                    ) : (
                      <BookOpen className="size-4 text-mute" />
                    )}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex gap-2">
                <ButtonLink href="/downloads" size="md" className="flex-1">
                  <Download className="size-4" />
                  Download
                </ButtonLink>
                <a
                  href="https://github.com/kinetix-studio/kinetix"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-hair text-soft"
                  aria-label="GitHub repository"
                >
                  <GithubIcon className="size-[18px]" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
