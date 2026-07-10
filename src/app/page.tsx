"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HallwayBackdrop } from "@/components/HallwayBackdrop";
import { Emblem } from "@/components/Emblem";
import { HALLWAY_HOTSPOTS } from "@/lib/hallwayHotspots";
import {
  EXTERIOR_NAV_LINKS,
  EXTERIOR_OPPORTUNITIES_HOTSPOT,
  EXTERIOR_ENTER_BUTTON_HOTSPOT,
} from "@/lib/exteriorHotspots";
import { GUIDE_WELCOME_MESSAGE } from "@/lib/ai/guide";
import { FLAGSHIP_INITIATIVE } from "@/lib/organization";

export default function HomePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-hallway-void" />}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  // "Back to the Hallway" links (from a pathway room, etc.) point at
  // /?entered=1 so returning here re-enters the interior hallway instead
  // of resetting to the exterior welcome screen. useSearchParams reflects
  // the destination URL synchronously as part of the client-side
  // navigation itself, so the interior renders on the very first paint —
  // no useEffect+setState round trip, which used to show a visible flash
  // of the exterior "guide" screen before flipping over.
  const searchParams = useSearchParams();
  const [enteredManually, setEnteredManually] = useState(false);
  const welcomed = enteredManually || searchParams.get("entered") === "1";
  const setWelcomed = (value: boolean) => setEnteredManually(value);

  return (
    <main className="relative min-h-screen overflow-hidden bg-hallway-void px-3 py-6">
      <HallwayBackdrop />

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
                className="group absolute flex items-center justify-center rounded-md transition"
                style={{ top: "32%", left: "41%", width: "18%", height: "45%" }}
              >
                <span className="absolute inset-0 rounded-md ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
                <span className="relative font-display text-sm font-semibold uppercase tracking-widest text-hallway-gold opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition group-hover:opacity-100 sm:text-base">
                  Enter
                </span>
              </button>

              {/* Nav bar painted into the image, made clickable */}
              {EXTERIOR_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  className="group absolute rounded transition"
                  style={{
                    top: `${link.top}%`,
                    left: `${link.left}%`,
                    width: `${link.width}%`,
                    height: `${link.height}%`,
                  }}
                >
                  <span className="block h-full w-full rounded ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-1 group-hover:ring-hallway-gold/70" />
                </Link>
              ))}
              <button
                onClick={() => setWelcomed(true)}
                title="Opportunities"
                className="group absolute rounded transition"
                style={{
                  top: `${EXTERIOR_OPPORTUNITIES_HOTSPOT.top}%`,
                  left: `${EXTERIOR_OPPORTUNITIES_HOTSPOT.left}%`,
                  width: `${EXTERIOR_OPPORTUNITIES_HOTSPOT.width}%`,
                  height: `${EXTERIOR_OPPORTUNITIES_HOTSPOT.height}%`,
                }}
              >
                <span className="block h-full w-full rounded ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-1 group-hover:ring-hallway-gold/70" />
              </button>
              <button
                onClick={() => setWelcomed(true)}
                title="Enter Your Future"
                className="group absolute rounded transition"
                style={{
                  top: `${EXTERIOR_ENTER_BUTTON_HOTSPOT.top}%`,
                  left: `${EXTERIOR_ENTER_BUTTON_HOTSPOT.left}%`,
                  width: `${EXTERIOR_ENTER_BUTTON_HOTSPOT.width}%`,
                  height: `${EXTERIOR_ENTER_BUTTON_HOTSPOT.height}%`,
                }}
              >
                <span className="block h-full w-full rounded ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-1 group-hover:ring-hallway-gold/70" />
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hallway-void/90 to-transparent py-3 text-center">
                <p className="font-display text-sm italic text-hallway-gold sm:text-base">
                  Powered by {FLAGSHIP_INITIATIVE.name}
                </p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: GUIDE_WELCOME_MESSAGE.length * 0.6 + 0.4 }}
              onClick={() => setWelcomed(true)}
              className="mt-4 rounded-full bg-hallway-gold px-8 py-3 font-semibold text-hallway-void transition hover:brightness-110"
            >
              Enter a New Career
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
                  key={hotspot.imageLabel}
                  href={hotspot.href}
                  title={hotspot.imageLabel}
                  className="group absolute flex items-center justify-center rounded-md transition"
                  style={{
                    top: `${hotspot.top}%`,
                    left: `${hotspot.left}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`,
                  }}
                >
                  <span className="absolute inset-0 rounded-md ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
                  <span className="relative font-display text-xs font-semibold uppercase tracking-widest text-hallway-gold opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] transition group-hover:opacity-100 sm:text-sm">
                    Enter
                  </span>
                </Link>
              ))}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-hallway-void/90 to-transparent py-3 text-center">
                <p className="font-display text-sm italic text-hallway-gold sm:text-base">
                  Powered by {FLAGSHIP_INITIATIVE.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
