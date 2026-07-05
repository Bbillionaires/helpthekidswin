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
      className="flex flex-col items-center"
    >
      <Link href={`/pathways/${pathway.slug}`} className="group flex flex-col items-center">
        {/* Wall sconce / pathway icon glowing above the door */}
        <span
          className={`mb-1 text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:-translate-y-1`}
        >
          {pathway.icon}
        </span>

        {/* The door itself */}
        <div
          className={`relative h-56 w-36 overflow-hidden rounded-t-[3rem] border-[3px] border-black/50 bg-gradient-to-b ${pathway.gradient} shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl ${pathway.glow}`}
        >
          {/* Fanlight window */}
          <div className="absolute inset-x-3 top-2 h-8 rounded-t-full border border-white/25 bg-white/10 backdrop-blur-sm" />

          {/* Raised panels */}
          <div className="absolute inset-x-3 top-14 bottom-10 grid grid-rows-2 gap-2">
            <div className="rounded-sm border border-black/40 bg-black/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
            <div className="rounded-sm border border-black/40 bg-black/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Door frame edge highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-t-[3rem] ring-1 ring-inset ring-white/10" />

          {/* Ambient flicker */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-flicker bg-gradient-to-b from-white/20 to-transparent" />

          {/* Knob */}
          <div className="absolute right-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-hallway-gold shadow-[0_0_6px_2px_rgba(232,184,109,0.6)]" />
        </div>

        {/* Threshold shadow grounding the door on the floor */}
        <div className="-mt-1 h-2 w-28 rounded-full bg-black/50 blur-sm" />

        {/* Nameplate */}
        <div className="mt-3 max-w-[9rem] text-center">
          <h3 className="font-display text-sm font-semibold tracking-wide text-white">
            {pathway.name}
          </h3>
          <p className="mt-0.5 text-[11px] leading-snug text-white/50">
            {pathway.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
