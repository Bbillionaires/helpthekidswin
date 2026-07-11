/**
 * Per-pathway room art. Most images (public/images/room-*.png) were
 * generated with a wall of blank picture frames plus one mirror, in the
 * same 1536x1024 canvas as the hallway/exterior art. Coordinates below
 * are measured the same way as hallwayHotspots.ts / exteriorHotspots.ts
 * — percent of the image, so they scale with the rendered size.
 *
 * `ai-architect`'s source art doesn't follow the blank-frame pattern (it's
 * a sci-fi command-room render with wall monitors instead of frames), so
 * its coordinates are a best-effort adaptation, not a measured match.
 * `cybersecurity` and `web-development-programming` deliberately reuse
 * that same image (see the comment above `PATHWAY_ROOM_ART` below) rather
 * than getting unique art.
 */

export interface RoomSlot {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface PathwayRoomArt {
  image: string;
  /** Real pixel dimensions of `image`, only needed when it isn't the standard 1536x1024 canvas — otherwise the page defaults to that. */
  imageWidth?: number;
  imageHeight?: number;
  mentorFrames: RoomSlot[];
  practiceTestFrame: RoomSlot;
  applicationFrame: RoomSlot;
  referFrame: RoomSlot;
  mirror: RoomSlot;
  /** Hover label for the primary `mirror` — defaults to "Begin Interview" when omitted. Override when a room has more than one distinct interview landmark and they need to read differently from one another (e.g. the Technology room). */
  mirrorLabel?: string;
  /** A handful of rooms render more than one literal mirror (e.g. flanking a central display) — each is an equally valid "begin interview" click, leading to *this* pathway's own intake. Each slot can carry its own hover label (defaults to "Begin Interview"). */
  additionalMirrors?: Array<RoomSlot & { label?: string }>;
  /** For rooms shared by more than one pathway (e.g. the Technology lobby's three careers): the OTHER pathways' own gateways, rendered on this page too so every gateway is visible no matter which of the shared pathways you're on — each leads straight to that specific pathwaySlug's own intake, not to another room page. */
  crossPathwayMirrors?: Array<RoomSlot & { pathwaySlug: string }>;
  /** Some art bakes in its own "return to hall" graphic — overlay a real link on it when present. */
  returnToHallway?: RoomSlot;
}

function evenRow(left: number, right: number, count: number, top: number, height: number): RoomSlot[] {
  const totalWidth = right - left;
  const gap = totalWidth * 0.03;
  const width = (totalWidth - gap * (count - 1)) / count;
  return Array.from({ length: count }, (_, i) => ({
    top,
    left: left + i * (width + gap),
    width,
    height,
  }));
}

const NO_FRAME: RoomSlot = { top: 0, left: 0, width: 0, height: 0 };

// The desk globe in room-ai-architect.png — a fourth, always-present
// "Interview" gateway shared by all three Technology-lobby pathways, on
// top of each one's own dedicated landmark below. Labeled plainly
// "Interview" (rather than the default "Begin Interview") so it reads
// distinctly from the pathway's own landmark sitting right next to it.
const TECH_ROOM_GLOBE: RoomSlot & { label: string } = { top: 45, left: 67.5, width: 7, height: 13, label: "Interview" };

// Each Technology-lobby pathway's own dedicated gateway landmark in the
// shared room render — the floor console, the wall of screens, the
// standing side panel. Every one of the three pathway entries below
// renders its OWN landmark as `mirror`, the globe as an `additionalMirrors`
// entry, and the *other two* landmarks as `crossPathwayMirrors` (each
// explicitly linked to its own pathway's intake) — so all four gateways
// are visible and clickable no matter which of the three doors got you
// into this room.
const TECH_GATEWAY_POSITIONS: Record<"cybersecurity" | "web-development-programming" | "ai-architect", RoomSlot> = {
  cybersecurity: { top: 70, left: 31, width: 37, height: 22 },
  "web-development-programming": { top: 16, left: 27, width: 46, height: 33 },
  "ai-architect": { top: 28, left: 78, width: 14, height: 55 },
};

function techCrossPathwayMirrors(currentSlug: string): Array<RoomSlot & { pathwaySlug: string }> {
  return Object.entries(TECH_GATEWAY_POSITIONS)
    .filter(([slug]) => slug !== currentSlug)
    .map(([pathwaySlug, slot]) => ({ ...slot, pathwaySlug }));
}

export const PATHWAY_ROOM_ART: Record<string, PathwayRoomArt> = {
  // Cybersecurity, Web Development & Programming, and AI Architect all
  // share the one "Technology Operations" room image — reached via the
  // /lobbies/technology chooser, not its own door. All four gateways
  // (the three pathways' own landmarks plus the shared desk globe) are
  // visible and clickable no matter which of the three you're on — see
  // TECH_GATEWAY_POSITIONS/techCrossPathwayMirrors above. No blank frames
  // exist for mentors/practice-test/application/refer in this shared
  // context, so those are zeroed out for the two new ones.
  cybersecurity: {
    image: "/images/room-ai-architect.png",
    mentorFrames: [],
    practiceTestFrame: NO_FRAME,
    applicationFrame: NO_FRAME,
    referFrame: NO_FRAME,
    mirror: TECH_GATEWAY_POSITIONS.cybersecurity,
    additionalMirrors: [TECH_ROOM_GLOBE],
    crossPathwayMirrors: techCrossPathwayMirrors("cybersecurity"),
  },
  "web-development-programming": {
    image: "/images/room-ai-architect.png",
    mentorFrames: [],
    practiceTestFrame: NO_FRAME,
    applicationFrame: NO_FRAME,
    referFrame: NO_FRAME,
    mirror: TECH_GATEWAY_POSITIONS["web-development-programming"],
    mirrorLabel: "Web Development & Programming",
    additionalMirrors: [TECH_ROOM_GLOBE],
    crossPathwayMirrors: techCrossPathwayMirrors("web-development-programming"),
  },
  firefighter: {
    image: "/images/room-firefighter.png",
    mentorFrames: evenRow(18, 82, 6, 16, 19),
    ...threeBottomFrames(27.5, 73, 38, 18),
    mirror: { top: 26, left: 79, width: 14, height: 58 },
  },
  healthcare: {
    image: "/images/room-healthcare.png",
    mentorFrames: evenRow(17.5, 81.5, 5, 16.5, 20),
    ...threeBottomFrames(26.5, 73.5, 39, 16.5),
    mirror: { top: 28, left: 78, width: 15, height: 55 },
  },
  "construction-skilled-trades": {
    image: "/images/room-construction-skilled-trades.png",
    mentorFrames: evenRow(18, 81, 5, 16, 20.5),
    ...threeBottomFrames(27, 74, 39.5, 16.5),
    mirror: { top: 32, left: 79, width: 13, height: 54 },
  },
  longshoremen: {
    image: "/images/room-longshoremen.png",
    mentorFrames: evenRow(26, 79, 4, 16, 22),
    ...threeBottomFrames(30, 74, 40, 18),
    mirror: { top: 27, left: 78, width: 14, height: 63 },
  },
  "merchant-marine": {
    image: "/images/room-merchant-marine.png",
    mentorFrames: evenRow(18, 81, 5, 17, 20),
    ...threeBottomFrames(27, 74, 40, 16.5),
    mirror: { top: 30, left: 76, width: 14, height: 55 },
  },
  military: {
    image: "/images/room-military.png",
    mentorFrames: evenRow(18, 81, 5, 16.5, 20),
    ...threeBottomFrames(27.5, 74, 40, 16.5),
    mirror: { top: 28, left: 76, width: 15, height: 58 },
  },
  "police-officer": {
    image: "/images/room-police-officer.png",
    mentorFrames: evenRow(18, 82, 6, 15.5, 19.5),
    ...threeBottomFrames(27, 73, 38.5, 17.5),
    mirror: { top: 26, left: 80, width: 13, height: 57 },
  },
  "truck-driver": {
    image: "/images/room-truck-driver.png",
    mentorFrames: evenRow(15.5, 83, 5, 15.5, 20),
    ...threeBottomFrames(27.5, 73, 38.5, 16.5),
    mirror: { top: 27, left: 80, width: 13, height: 58 },
  },
  "ai-architect": {
    image: "/images/room-ai-architect.png",
    mentorFrames: [
      ...evenRow(27, 91, 3, 16, 17),
      ...evenRow(27, 91, 3, 34, 13),
    ],
    practiceTestFrame: { top: 72, left: 33, width: 11, height: 18 },
    applicationFrame: { top: 72, left: 45, width: 11, height: 18 },
    referFrame: { top: 72, left: 57, width: 11, height: 18 },
    mirror: TECH_GATEWAY_POSITIONS["ai-architect"],
    additionalMirrors: [TECH_ROOM_GLOBE],
    crossPathwayMirrors: techCrossPathwayMirrors("ai-architect"),
  },
  // These are the Accounting and Business Acquisition PATHWAY rooms
  // (final destination, reached via a lobby item — see
  // src/lib/lobbies.ts) — not the lobby itself, and not to be confused
  // with the lobby's plain card-grid page. Each is a fully-rendered
  // scene (no blank frames), so mentors/practice-test/application/refer
  // are zeroed out here the same way as the shared tech room, and only
  // the mirror (the round gold mirror already in each render) is wired
  // up. Both were supplied at 1402x1122, not the usual 1536x1024 canvas.
  accounting: {
    image: "/images/room-accounting.png",
    imageWidth: 1402,
    imageHeight: 1122,
    mentorFrames: [],
    practiceTestFrame: NO_FRAME,
    applicationFrame: NO_FRAME,
    referFrame: NO_FRAME,
    mirror: { top: 18, left: 40, width: 22, height: 30 },
  },
  "business-acquisition": {
    image: "/images/room-business-acquisition.png",
    imageWidth: 1402,
    imageHeight: 1122,
    mentorFrames: [],
    practiceTestFrame: NO_FRAME,
    applicationFrame: NO_FRAME,
    referFrame: NO_FRAME,
    mirror: { top: 23, left: 40, width: 22, height: 25 },
    returnToHallway: { top: 65, left: 43, width: 13, height: 4 },
  },
  // Attorney (reached via its own door, no lobby) and Stock Trading
  // (reached via the Business Acquisition & Stock Trading lobby) both
  // follow the standard blank-frame pattern for mentors, unlike the two
  // above — measured the same way as the original 10 rooms.
  attorney: {
    image: "/images/room-attorney.png",
    mentorFrames: [...evenRow(71.5, 97, 3, 11, 12), ...evenRow(71.5, 97, 3, 23.5, 12)],
    // The three book-related set pieces in the room, each doing double
    // duty as a labeled action: the "CIVIL PROCEDURE / CONSTITUTIONAL LAW
    // / ..." named stack (right side) reads as exam prep → Practice Test;
    // the flat stack with the gavel (desk, bottom-left) reads as taking
    // action → Application; the standalone shelf row (left-middle, under
    // "Practice Areas") → Refer a Recruit.
    practiceTestFrame: { top: 52, left: 79, width: 14, height: 18 },
    applicationFrame: { top: 51, left: 11, width: 16, height: 11 },
    referFrame: { top: 40, left: 12, width: 16, height: 9 },
    mirror: { top: 19, left: 31, width: 34, height: 35 },
  },
  // Two symmetric mirrors flank the central NYSE display — either is a
  // valid "begin interview" click, so both are wired (see
  // `additionalMirrors`).
  "stock-trading": {
    image: "/images/room-stock-trading.png",
    mentorFrames: [...evenRow(1, 24, 3, 26, 24), ...evenRow(77, 99, 3, 26, 24)],
    practiceTestFrame: NO_FRAME,
    applicationFrame: NO_FRAME,
    referFrame: NO_FRAME,
    mirror: { top: 11.5, left: 25.3, width: 7.3, height: 37 },
    additionalMirrors: [{ top: 11.5, left: 68, width: 7.3, height: 37 }],
  },
};

function threeBottomFrames(left: number, right: number, top: number, height: number) {
  const [practiceTestFrame, applicationFrame, referFrame] = evenRow(left, right, 3, top, height) as [
    RoomSlot,
    RoomSlot,
    RoomSlot,
  ];
  return { practiceTestFrame, applicationFrame, referFrame };
}

export function getRoomArt(slug: string): PathwayRoomArt | undefined {
  return PATHWAY_ROOM_ART[slug];
}
