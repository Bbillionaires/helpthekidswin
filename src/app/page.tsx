"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoorCard } from "@/components/DoorCard";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { PATHWAYS } from "@/lib/pathways";
import { GUIDE_WELCOME_MESSAGE } from "@/lib/ai/guide";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export default function HomePage() {
  const [welcomed, setWelcomed] = useState(false);
  const leftDoors = PATHWAYS.filter((_, i) => i % 2 === 0);
  const rightDoors = PATHWAYS.filter((_, i) => i % 2 === 1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-6 py-10">
      <HallwayBackdrop />

      <div className="relative z-10 mx-auto mb-10 flex max-w-6xl flex-col items-center gap-1 text-center">
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
            className="relative z-10 mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center gap-6 text-center"
          >
            <span className="text-4xl">✨</span>
            <div className="space-y-2">
              {GUIDE_WELCOME_MESSAGE.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.6, duration: 0.6 }}
                  className="font-display text-xl text-white/90 sm:text-2xl"
                >
                  {line}
                </motion.p>
              ))}
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
            className="relative z-10 mx-auto max-w-6xl"
          >
            <h2 className="mb-2 text-center font-display text-3xl font-bold text-white">
              The Hall of Opportunity
            </h2>
            <p className="mb-10 text-center text-white/60">
              Choose a door. Each one leads to a different pathway, a different atmosphere,
              a different future.
            </p>
            <div className="mx-auto flex max-w-6xl items-start justify-between gap-6 px-2 sm:px-6">
              <div className="flex flex-1 flex-col items-center gap-12 sm:items-start">
                {leftDoors.map((pathway, index) => (
                  <DoorCard key={pathway.slug} pathway={pathway} index={index * 2} />
                ))}
              </div>
              <div className="flex flex-1 flex-col items-center gap-12 sm:items-end">
                {rightDoors.map((pathway, index) => (
                  <DoorCard key={pathway.slug} pathway={pathway} index={index * 2 + 1} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
