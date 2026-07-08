"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoorCard } from "@/components/DoorCard";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { Emblem } from "@/components/Emblem";
import { FloorMedallion } from "@/components/FloorMedallion";
import { PATHWAYS } from "@/lib/pathways";
import { GUIDE_WELCOME_MESSAGE } from "@/lib/ai/guide";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export default function HomePage() {
  const [welcomed, setWelcomed] = useState(false);
  const upperGallery = PATHWAYS.slice(0, 4);
  const lowerGallery = PATHWAYS.slice(4, 10);

  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-6 py-10">
      <HallwayBackdrop />

      {!welcomed && (
        /* Cropped to the clean facade/door/statues band of the reference art,
           excluding its baked-in nav bar, side text panels, and footer.
           Kept as a top-level sibling (not nested in a motion.div) because
           framer-motion sets a transform style on animated elements, which
           would make a `position: fixed` descendant relative to that
           transformed ancestor instead of the viewport. */
        <div className="pointer-events-none fixed inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/mansion-exterior.png)",
              backgroundSize: "220% auto",
              backgroundPosition: "50% 32%",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-hallway-void/40 via-hallway-void/70 to-hallway-void" />
        </div>
      )}

      <div className="relative z-10 mx-auto mb-6 flex max-w-6xl flex-col items-center gap-1 text-center">
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
            <Emblem />
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
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
              {/* Cropped to just the dome/eagle emblem of the reference art,
                  excluding its baked-in door labels and title text. */}
              <div className="relative mb-2 aspect-[9/4] w-full max-w-md overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url(/images/hall-of-opportunity-interior.png)",
                    backgroundSize: "333% auto",
                    backgroundPosition: "50% 0%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hallway-void" />
                <div className="absolute inset-0 bg-gradient-to-r from-hallway-void via-transparent to-hallway-void" />
              </div>
              <Emblem size={56} />
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-hallway-gold sm:text-4xl">
                The Hall of Opportunity
              </h2>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-hallway-gold/60 to-transparent" />
              <p className="max-w-xl text-white/60">
                Choose a door. Each one leads to a different pathway, a different
                atmosphere, a different future.
              </p>
            </div>

            {/* Upper gallery */}
            <div className="mb-6 flex flex-wrap justify-center gap-x-8 gap-y-8 sm:gap-x-14">
              {upperGallery.map((pathway, index) => (
                <DoorCard key={pathway.slug} pathway={pathway} index={index} size="sm" />
              ))}
            </div>

            <div className="mx-auto mb-6 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-hallway-gold/30 to-transparent" />

            {/* Lower gallery */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 sm:gap-x-8">
              {lowerGallery.map((pathway, index) => (
                <DoorCard
                  key={pathway.slug}
                  pathway={pathway}
                  index={upperGallery.length + index}
                  size="lg"
                />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <FloorMedallion />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
