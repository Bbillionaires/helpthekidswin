/**
 * Clickable regions positioned over the doors as they actually appear in
 * public/images/hall-of-opportunity-interior.png (measured directly from
 * the image, in percent so they scale with the rendered image size).
 *
 * This image's 11 painted doors don't all match our 10 real pathways —
 * 6 line up exactly (Merchant Marine, Longshoremen, Police Officer,
 * Military, Firefighter, Truck Driver). Of the remaining 5 image doors
 * (Stock Investments, Attorney, Real Estate, Business Acquisition,
 * Technology Innovation), 4 are assigned to our remaining 4 real
 * pathways — picking the closest thematic fit where one exists
 * (Real Estate → Construction & Skilled Trades; Technology Innovation →
 * AI Architect) and otherwise arbitrarily (Attorney → Cybersecurity;
 * Business Acquisition → Healthcare). "Stock Investments" has no
 * pathway left to assign and is intentionally left without a hotspot —
 * clicking it does nothing, rather than sending someone to an
 * unrelated pathway.
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
  { pathwaySlug: "cybersecurity", imageLabel: "Attorney", top: 10, left: 19, width: 12, height: 24 },
  { pathwaySlug: "construction-skilled-trades", imageLabel: "Real Estate", top: 10, left: 70, width: 10, height: 24 },
  { pathwaySlug: "healthcare", imageLabel: "Business Acquisition", top: 10, left: 84, width: 12, height: 24 },

  // Lower gallery
  { pathwaySlug: "merchant-marine", imageLabel: "Merchant Marine", top: 44, left: 5, width: 12, height: 24 },
  { pathwaySlug: "longshoremen", imageLabel: "Longshoremen", top: 44, left: 19, width: 12, height: 24 },
  { pathwaySlug: "police-officer", imageLabel: "Police Officer", top: 44, left: 32, width: 10, height: 24 },
  { pathwaySlug: "military", imageLabel: "Military", top: 44, left: 45, width: 10, height: 24 },
  { pathwaySlug: "firefighter", imageLabel: "Fire Fighter", top: 44, left: 60, width: 11, height: 24 },
  { pathwaySlug: "truck-driver", imageLabel: "Truck Driver", top: 44, left: 73, width: 9, height: 24 },
  { pathwaySlug: "ai-architect", imageLabel: "Technology Innovation", top: 44, left: 86, width: 10, height: 24 },
];
