/**
 * Per-pathway room art. Each image (public/images/room-*.png) was
 * generated with a wall of blank picture frames plus one mirror, in the
 * same 1536x1024 canvas as the hallway/exterior art. Coordinates below
 * are measured the same way as hallwayHotspots.ts / exteriorHotspots.ts
 * — percent of the image, so they scale with the rendered size.
 *
 * `ai-architect`'s source art doesn't follow the blank-frame pattern (it's
 * a sci-fi command-room render with wall monitors instead of frames), so
 * its coordinates are a best-effort adaptation, not a measured match —
 * regenerate that one to match the other 9 if pixel-perfect alignment
 * matters here.
 */

export interface RoomSlot {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface PathwayRoomArt {
  image: string;
  mentorFrames: RoomSlot[];
  practiceTestFrame: RoomSlot;
  applicationFrame: RoomSlot;
  referFrame: RoomSlot;
  mirror: RoomSlot;
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

export const PATHWAY_ROOM_ART: Record<string, PathwayRoomArt> = {
  cybersecurity: {
    image: "/images/room-cybersecurity.png",
    mentorFrames: evenRow(18.5, 81, 5, 16.5, 20.5),
    ...threeBottomFrames(27, 74, 39, 16),
    mirror: { top: 30, left: 75, width: 16, height: 56 },
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
    mirror: { top: 28, left: 78, width: 14, height: 55 },
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
