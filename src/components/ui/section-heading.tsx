"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        {index ? (
          <span className="eyebrow text-volt-bright/90 tabular-nums">{index}</span>
        ) : null}
        <span className="h-px w-8 bg-gradient-to-r from-volt/70 to-transparent" />
        <span className="eyebrow text-mute">{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-gradient"
      >
        {title}
      </motion.h2>

      {lead ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-pretty text-[15px] leading-relaxed text-soft sm:text-base"
        >
          {lead}
        </motion.p>
      ) : null}

      {children}
    </div>
  );
}
