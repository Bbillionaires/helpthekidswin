"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CareerPathway } from "@/lib/pathways";

export function DoorCard({
  pathway,
  index,
  size = "lg",
}: {
  pathway: CareerPathway;
  index: number;
  size?: "lg" | "sm";
}) {
  const isSmall = size === "sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/pathways/${pathway.slug}`} className="group flex flex-col items-center">
        {/* Gold-framed arched alcove */}
        <div
          className={`relative overflow-hidden rounded-t-3xl border-2 border-hallway-gold/50 bg-gradient-to-b ${pathway.gradient} shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl ${pathway.glow} ${
            isSmall ? "h-32 w-20" : "h-48 w-32"
          }`}
        >
          {/* Inner gold hairline frame */}
          <div className="pointer-events-none absolute inset-1 rounded-t-2xl ring-1 ring-inset ring-hallway-gold/30" />

          {/* Icon */}
          <div className="flex h-full flex-col items-center justify-center gap-1 px-2 text-center">
            <span className={isSmall ? "text-xl" : "text-3xl"}>{pathway.icon}</span>
          </div>

          {/* Ambient flicker */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 animate-flicker bg-gradient-to-b from-white/15 to-transparent" />
        </div>

        {/* Nameplate */}
        <div className={`mt-2 max-w-[9rem] text-center ${isSmall ? "max-w-[6rem]" : ""}`}>
          <h3
            className={`font-display font-semibold uppercase tracking-wide text-hallway-gold ${
              isSmall ? "text-[10px]" : "text-xs"
            }`}
          >
            {pathway.name}
          </h3>
          {!isSmall && (
            <p className="mt-0.5 text-[11px] leading-snug text-white/50">
              {pathway.shortDescription}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
