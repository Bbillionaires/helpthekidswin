"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoorCard } from "@/components/DoorCard";
import { PATHWAYS } from "@/lib/pathways";
import { GUIDE_WELCOME_MESSAGE } from "@/lib/ai/guide";

export default function HallOfOpportunityPage() {
  const [welcomed, setWelcomed] = useState(false);

  return (
    <main className="relative min-h-screen bg-hallway-void px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-hallway-floor" />

      <AnimatePresence mode="wait">
        {!welcomed ? (
          <motion.div
            key="guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 text-center"
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
            <h1 className="mb-2 text-center font-display text-3xl font-bold text-white">
              The Hall of Opportunity
            </h1>
            <p className="mb-10 text-center text-white/60">
              Choose a door. Each one leads to a different pathway, a different atmosphere,
              a different future.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PATHWAYS.map((pathway, index) => (
                <DoorCard key={pathway.slug} pathway={pathway} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
