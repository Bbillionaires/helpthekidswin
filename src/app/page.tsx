"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { Emblem } from "@/components/Emblem";
import { HALLWAY_HOTSPOTS } from "@/lib/hallwayHotspots";
import { GUIDE_WELCOME_MESSAGE } from "@/lib/ai/guide";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export default function HomePage() {
  const [welcomed, setWelcomed] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-3 py-6">
      <HallwayBackdrop />

      <div className="relative z-10 mx-auto mb-4 flex max-w-6xl flex-col items-center gap-1 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          {PARENT_ORGANIZATION.name}
        </p>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {FLAGSHIP_INITIATIVE.name}
        </h1>
        <p className="font-display text-sm italic text-hallway-gold">
          &ldquo;{FLAGSHIP_INITIATIVE.tagline}&rdquo;
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!welcomed ? (
          <motion.div
            key="guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 text-center"
          >
            <Emblem />
            <div className="space-y-1">
              {GUIDE_WELCOME_MESSAGE.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.6, duration: 0.6 }}
                  className="font-display text-lg text-white/90 sm:text-xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Full, uncropped reference art. The front door itself is a
                clickable hotspot (same action as the button below it). */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
              <Image
                src="/images/mansion-exterior.png"
                alt="Hall of Opportunity mansion entrance"
                width={1536}
                height={1024}
                className="h-auto w-full"
                priority
              />
              <button
                onClick={() => setWelcomed(true)}
                title="Enter the Hall of Opportunity"
                className="group absolute rounded-md transition"
                style={{ top: "32%", left: "41%", width: "18%", height: "45%" }}
              >
                <span className="block h-full w-full rounded-md ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
              </button>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: GUIDE_WELCOME_MESSAGE.length * 0.6 + 0.4 }}
              onClick={() => setWelcomed(true)}
              className="mt-4 rounded-full bg-hallway-gold px-8 py-3 font-semibold text-hallway-void transition hover:brightness-110"
            >
              Step Into the Hallway
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="hallway"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mx-auto w-full max-w-7xl"
          >
            <div className="mb-4 flex flex-col items-center gap-1 text-center">
              <Emblem size={48} />
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-hallway-gold sm:text-3xl">
                The Hall of Opportunity
              </h2>
              <p className="max-w-xl text-sm text-white/60">
                Choose a door below. Each one leads to a different pathway, a different
                atmosphere, a different future.
              </p>
            </div>

            {/* Full, uncropped reference art with clickable regions over each
                painted door. See src/lib/hallwayHotspots.ts for the pathway
                mapping and why it isn't a 1:1 label match. */}
            <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
              <Image
                src="/images/hall-of-opportunity-interior.png"
                alt="Inside the Hall of Opportunity"
                width={1536}
                height={1024}
                className="h-auto w-full"
                priority
              />

              {HALLWAY_HOTSPOTS.map((hotspot) => (
                <Link
                  key={hotspot.pathwaySlug}
                  href={`/pathways/${hotspot.pathwaySlug}`}
                  title={hotspot.imageLabel}
                  className="group absolute rounded-md transition"
                  style={{
                    top: `${hotspot.top}%`,
                    left: `${hotspot.left}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`,
                  }}
                >
                  <span className="block h-full w-full rounded-md ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
