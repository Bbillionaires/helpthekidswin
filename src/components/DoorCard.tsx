"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CareerPathway } from "@/lib/pathways";

export function DoorCard({ pathway, index }: { pathway: CareerPathway; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/pathways/${pathway.slug}`}
        className={`group relative block h-72 w-full overflow-hidden rounded-t-full rounded-b-lg border border-white/10 bg-gradient-to-b ${pathway.gradient} p-6 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${pathway.glow}`}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-0" />
        <div className="flex h-full flex-col items-center justify-end gap-3 text-center">
          <span className="animate-drift text-5xl drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
            {pathway.icon}
          </span>
          <h3 className="font-display text-lg font-semibold tracking-wide">
            {pathway.name}
          </h3>
          <p className="text-xs text-white/70">{pathway.shortDescription}</p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-flicker bg-gradient-to-b from-white/20 to-transparent" />
      </Link>
    </motion.div>
  );
}
