"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PictureFrame } from "@/components/PictureFrame";
import { MENTOR_CATEGORIES, VIEW_ALL_MENTORS_HOTSPOT, MENTOR_SEARCH_HOTSPOT } from "@/lib/mentorCategories";
import type { MentorProfile } from "@/types";

export function MentorsGalleryClient({ mentors }: { mentors: MentorProfile[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = mentors;
    if (category) {
      const specialties = MENTOR_CATEGORIES.find((c) => c.label === category)?.specialties ?? [];
      list = list.filter((mentor) => mentor.careerSpecialties.some((s) => specialties.includes(s)));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((mentor) =>
        [mentor.displayName, mentor.biography, mentor.employer ?? "", ...mentor.careerSpecialties, ...mentor.teachingSpecialties]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return list;
  }, [mentors, category, query]);

  return (
    <>
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
        <Image
          src="/images/mentor-gallery.png"
          alt="Mentor Hall"
          width={1536}
          height={1024}
          className="h-auto w-full"
          priority
        />

        {MENTOR_CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setCategory(category === cat.label ? null : cat.label)}
            title={`Browse ${cat.label} mentors`}
            className={`group absolute rounded-sm transition ${
              category === cat.label ? "ring-2 ring-hallway-gold" : ""
            }`}
            style={{ top: `${cat.top}%`, left: `${cat.left}%`, width: `${cat.width}%`, height: `${cat.height}%` }}
          >
            <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            setCategory(null);
            setQuery("");
          }}
          title="View all mentors"
          className="group absolute rounded-sm transition"
          style={{
            top: `${VIEW_ALL_MENTORS_HOTSPOT.top}%`,
            left: `${VIEW_ALL_MENTORS_HOTSPOT.left}%`,
            width: `${VIEW_ALL_MENTORS_HOTSPOT.width}%`,
            height: `${VIEW_ALL_MENTORS_HOTSPOT.height}%`,
          }}
        >
          <span className="absolute inset-0 rounded-sm ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or keyword..."
          className="absolute rounded border border-hallway-gold/40 bg-black/60 px-2 text-xs text-white placeholder:text-white/40 focus:border-hallway-gold focus:outline-none"
          style={{
            top: `${MENTOR_SEARCH_HOTSPOT.top}%`,
            left: `${MENTOR_SEARCH_HOTSPOT.left}%`,
            width: `${MENTOR_SEARCH_HOTSPOT.width}%`,
            height: `${MENTOR_SEARCH_HOTSPOT.height}%`,
          }}
        />
      </div>

      {(category || query) && (
        <div className="relative z-10 mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-2 text-sm text-white/60">
          <span>
            Showing {filtered.length} mentor{filtered.length === 1 ? "" : "s"}
            {category ? ` in ${category}` : ""}
            {query ? ` matching "${query}"` : ""}
          </span>
          <button
            type="button"
            onClick={() => {
              setCategory(null);
              setQuery("");
            }}
            className="rounded-full border border-white/20 px-3 py-0.5 text-xs hover:bg-white/10"
          >
            Clear
          </button>
        </div>
      )}

      <div className="relative z-10 mx-auto mt-10 grid max-w-5xl grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
        {filtered.length > 0 ? (
          filtered.map((mentor) => (
            <PictureFrame
              key={mentor.id}
              href={`/mentors/${mentor.id}`}
              label={mentor.displayName}
              sublabel={mentor.careerSpecialties[0]}
              initials={mentor.displayName
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-sm text-white/50">
            No mentors match yet — check back soon, or{" "}
            <Link href="/mentor/signup" className="text-hallway-gold hover:underline">
              become one
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
