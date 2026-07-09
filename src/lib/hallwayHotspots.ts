/**
 * Clickable regions positioned over the doors as they actually appear in
 * public/images/hall-of-opportunity-interior.png (measured directly from
 * the image via a percent-grid overlay, so they scale with the rendered
 * image size).
 *
 * This image's 11 painted doors don't map 1:1 onto our pathways:
 * - 6 line up exactly by name: Merchant Marine, Longshoremen, Police
 *   Officer, Military, Firefighter, Truck Driver.
 * - Real Estate → Construction & Skilled Trades and Technology
 *   Innovation → AI Architect are thematic fits, not literal matches.
 * - Attorney and Stock Investments both point at the new Professional
 *   Careers pathway (Attorney/Medical/Accounting/Advertiser) — two doors,
 *   one room, which also fixes the old "Attorney door leads to
 *   Cybersecurity" mismatch.
 * - Business Acquisition points at the new Business Acquisition & Stock
 *   Trading pathway (a rename/repurpose of what used to be an arbitrary
 *   Business Acquisition → Healthcare mapping).
 *
 * Freeing Attorney/Business Acquisition from their old arbitrary targets
 * leaves Cybersecurity and Healthcare without a hallway door — there are
 * only 11 painted doors for what's now 12 pathways. They keep their full
 * rooms, mentors, and content; they're just not reachable from a door
 * right now, the same way "Stock Investments" had no hotspot before this
 * change. Revisit if/when new art adds doors for them (as happened for
 * Military), or if they should be folded into one of the doors above.
 */

export interface HallwayHotspot {
  pathwaySlug: string;
  imageLabel: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

export const HALLWAY_HOTSPOTS: HallwayHotspot[] = [
  // Upper gallery
  { pathwaySlug: "professional-careers", imageLabel: "Stock Investments", top: 8, left: 2, width: 15, height: 30 },
  { pathwaySlug: "professional-careers", imageLabel: "Attorney", top: 8, left: 19, width: 14, height: 30 },
  { pathwaySlug: "construction-skilled-trades", imageLabel: "Real Estate", top: 8, left: 68, width: 14, height: 30 },
  { pathwaySlug: "business-acquisition-stock-trading", imageLabel: "Business Acquisition", top: 8, left: 84, width: 14, height: 30 },

  // Lower gallery
  { pathwaySlug: "merchant-marine", imageLabel: "Merchant Marine", top: 44, left: 5, width: 12, height: 24 },
  { pathwaySlug: "longshoremen", imageLabel: "Longshoremen", top: 44, left: 19, width: 12, height: 24 },
  { pathwaySlug: "police-officer", imageLabel: "Police Officer", top: 44, left: 32, width: 10, height: 24 },
  { pathwaySlug: "military", imageLabel: "Military", top: 44, left: 45, width: 10, height: 24 },
  { pathwaySlug: "firefighter", imageLabel: "Fire Fighter", top: 44, left: 60, width: 11, height: 24 },
  { pathwaySlug: "truck-driver", imageLabel: "Truck Driver", top: 44, left: 73, width: 9, height: 24 },
  { pathwaySlug: "ai-architect", imageLabel: "Technology Innovation", top: 44, left: 86, width: 10, height: 24 },
];
