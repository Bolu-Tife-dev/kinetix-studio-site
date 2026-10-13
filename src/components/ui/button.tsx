"use client";

import { motion } from "framer-motion";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

type Variant = "primary" | "ghost" | "outline" | "flux";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight whitespace-nowrap transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px] rounded-2xl",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(180deg,#a855f7_0%,#7c3aed_100%)] shadow-[0_10px_34px_-12px_rgba(168,85,247,0.9),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[linear-gradient(180deg,#b56bfa_0%,#8b46f0_100%)]",
  flux: "text-void bg-[linear-gradient(180deg,#67e8f9_0%,#22d3ee_100%)] shadow-[0_10px_34px_-12px_rgba(34,211,238,0.85),inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-110",
  outline:
    "text-bright border border-hair-strong bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25",
  ghost: "text-soft hover:text-bright hover:bg-white/[0.05]",
} as const;

type ButtonLinkProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & Omit<LinkProps, "className"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <motion.span
      className="inline-flex"
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
    >
      <Link
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
        {...rest}
      >
        {children}
      </Link>
    </motion.span>
  );
}
