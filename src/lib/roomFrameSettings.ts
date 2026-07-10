/**
 * Admin-configurable overrides for a pathway room's mentor picture
 * frames — which real mentor (if any) fills a given frame index, and
 * whether that frame is clickable at all. In-memory only, same
 * limitation as everything else in src/data/mock.ts (see ARCHITECTURE.md
 * §8): it resets on restart and doesn't survive multiple server
 * instances.
 *
 * Without an override, a frame falls back to the positional default
 * (the Nth mentor matched to that pathway by career specialty) and is
 * clickable by default — every frame should always be *something* you
 * can click, even a generic "Meet Our Mentors" link, never a dead div.
 */

export interface FrameOverride {
  /** null = no mentor override, defer to the positional default. The string "NONE" explicitly clears the slot even if a positional default exists. */
  mentorId: string | "NONE" | null;
  clickable: boolean;
}

const ROOM_FRAME_OVERRIDES: Record<string, Record<number, FrameOverride>> = {};

function getOverride(pathwaySlug: string, index: number): FrameOverride | undefined {
  return ROOM_FRAME_OVERRIDES[pathwaySlug]?.[index];
}

export function setFrameMentor(pathwaySlug: string, index: number, mentorId: string | "NONE" | null): void {
  ROOM_FRAME_OVERRIDES[pathwaySlug] ??= {};
  const existing = ROOM_FRAME_OVERRIDES[pathwaySlug][index];
  ROOM_FRAME_OVERRIDES[pathwaySlug][index] = { mentorId, clickable: existing?.clickable ?? true };
}

export function setFrameClickable(pathwaySlug: string, index: number, clickable: boolean): void {
  ROOM_FRAME_OVERRIDES[pathwaySlug] ??= {};
  const existing = ROOM_FRAME_OVERRIDES[pathwaySlug][index];
  ROOM_FRAME_OVERRIDES[pathwaySlug][index] = { mentorId: existing?.mentorId ?? null, clickable };
}

export function isFrameClickable(pathwaySlug: string, index: number): boolean {
  return getOverride(pathwaySlug, index)?.clickable ?? true;
}

/** Resolves the mentor-id to display in a frame: explicit override wins, "NONE" clears it, otherwise the positional default. */
export function resolveFrameMentorId(pathwaySlug: string, index: number, defaultMentorId: string | undefined): string | undefined {
  const override = getOverride(pathwaySlug, index);
  if (!override || override.mentorId === null) return defaultMentorId;
  if (override.mentorId === "NONE") return undefined;
  return override.mentorId;
}

export function getFrameOverrideValue(pathwaySlug: string, index: number): string | "NONE" | null {
  return getOverride(pathwaySlug, index)?.mentorId ?? null;
}
