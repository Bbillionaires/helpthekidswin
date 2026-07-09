/**
 * Clickable regions positioned over the doors as they actually appear in
 * public/images/hall-of-opportunity-interior.png (measured directly from
 * the image, in percent so they scale with the rendered image size).
 *
 * The reference art's 10 painted door labels don't all match our 10 real
 * pathways — 5 line up exactly (Merchant Marine, Longshoremen, Police
 * Officer, Firefighter, Truck Driver); the other 5 image doors (Stock
 * Investments, Attorney, Real Estate, Business Acquisition, Technology
 * Innovation) have no equivalent in our list, and Military, Construction
 * & Skilled Trades, Healthcare, and Cybersecurity have no door in the
 * image. Rather than inventing new pathways to match the art, the
 * remaining 5 slots are assigned to our remaining 5 real pathways so
 * every pathway stays reachable — the clicked label just won't always
 * match the image's painted text.
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
  { pathwaySlug: "military", imageLabel: "Stock Investments", top: 11, left: 4, width: 11, height: 21 },
  { pathwaySlug: "construction-skilled-trades", imageLabel: "Attorney", top: 11, left: 20, width: 9, height: 21 },
  { pathwaySlug: "healthcare", imageLabel: "Real Estate", top: 11, left: 71, width: 9, height: 21 },
  { pathwaySlug: "cybersecurity", imageLabel: "Business Acquisition", top: 11, left: 85, width: 11, height: 21 },

  // Lower gallery
  { pathwaySlug: "merchant-marine", imageLabel: "Merchant Marine", top: 42, left: 4, width: 11, height: 25 },
  { pathwaySlug: "longshoremen", imageLabel: "Longshoremen", top: 42, left: 20, width: 9, height: 25 },
  { pathwaySlug: "police-officer", imageLabel: "Police Officer", top: 42, left: 33, width: 8, height: 25 },
  { pathwaySlug: "firefighter", imageLabel: "Fire Fighter", top: 42, left: 59, width: 9, height: 25 },
  { pathwaySlug: "truck-driver", imageLabel: "Truck Driver", top: 42, left: 71, width: 9, height: 25 },
  { pathwaySlug: "ai-architect", imageLabel: "Technology Innovation", top: 42, left: 85, width: 12, height: 25 },
];
