"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { MOCK_MATCHES, MOCK_APPLICANTS, MOCK_MENTORS } from "@/data/mock";
import { getPathway } from "@/lib/pathways";
import { evaluateMinorProtection, FLAG_LABELS } from "@/lib/safety/minorProtection";

const TABS = [
  "Dashboard",
  "Tasks",
  "Roadmap",
  "Calendar",
  "Messages",
  "Notes",
  "Files",
  "Quiz Results",
  "Milestones",
  "Certificates",
] as const;

export default function WorkspacePage({ params }: { params: { matchId: string } }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Dashboard");

  const match = MOCK_MATCHES.find((m) => m.id === params.matchId);
  if (!match) notFound();

  const applicant = MOCK_APPLICANTS.find((a) => a.id === match.applicantId);
  const mentor = MOCK_MENTORS.find((m) => m.id === match.mentorId);
  const pathway = getPathway(match.pathwaySlug);
  const protection = evaluateMinorProtection(match.minorProtection, applicant?.isMinor ?? false);

  const progress = 42;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-hallway-gold">
              {pathway?.name}
            </p>
            <h1 className="font-display text-2xl font-bold text-white">
              {applicant?.displayName} &amp; {mentor?.displayName}
            </h1>
          </div>
          <div className="w-40">
            <div className="mb-1 flex justify-between text-xs text-white/60">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-hallway-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                tab === t
                  ? "bg-hallway-gold text-hallway-void"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Dashboard" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Milestones completed" value="3 / 8" />
            <StatCard label="Quiz average" value="87%" />
            <StatCard label="Readiness score" value={`${applicant?.readinessScore ?? "—"}`} />
          </div>
        )}

        {tab === "Tasks" && (
          <TaskList
            items={["Complete safety orientation quiz", "Shadow mentor for one shift", "Submit weekly reflection"]}
          />
        )}

        {tab === "Roadmap" && (
          <TaskList
            items={[
              "Stage 1: Foundations & safety",
              "Stage 2: Guided practice with mentor",
              "Stage 3: Independent assessment",
              "Stage 4: Certification pathway",
            ]}
          />
        )}

        {tab === "Calendar" && (
          <EmptyState text="No upcoming sessions scheduled yet." />
        )}

        {tab === "Messages" && (
          <div className="space-y-4">
            {!protection.authorized ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6">
                <p className="mb-2 font-semibold text-amber-300">
                  Messaging is locked until every safety requirement is met.
                </p>
                <ul className="list-inside list-disc space-y-1 text-sm text-amber-200/80">
                  {protection.missing.map((flag) => (
                    <li key={flag}>{FLAG_LABELS[flag]} — pending</li>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyState text="All messages are logged and available to administrators for audit." />
            )}
          </div>
        )}

        {tab === "Notes" && <EmptyState text="No shared notes yet." />}
        {tab === "Files" && <EmptyState text="No files uploaded yet." />}
        {tab === "Quiz Results" && (
          <TaskList items={["Safety Fundamentals — 92%", "Pathway Readiness Quiz — 84%"]} />
        )}
        {tab === "Milestones" && (
          <TaskList
            items={[
              "✅ Profile completed",
              "✅ Matched with mentor",
              "✅ Orientation scheduled",
              "⬜ First shadow shift",
            ]}
          />
        )}
        {tab === "Certificates" && (
          <EmptyState text="No certificates issued yet — they'll appear here as milestones are completed." />
        )}
      </main>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-widest text-white/40">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function TaskList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-sm text-white/50">
      {text}
    </div>
  );
}
