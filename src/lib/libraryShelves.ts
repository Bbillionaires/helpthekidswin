/**
 * Clickable shelf regions over public/images/hall of opportunity library.png
 * (measured via percent-grid overlay, same technique as
 * hallwayHotspots.ts). Each shelf is one or more real pathway slugs — a
 * shelf covering more than one pathway (Business Acquisition & Stocks,
 * Technology) routes to that grouping's lobby (src/lib/lobbies.ts)
 * instead of a single pathway, same convention as the hallway doors.
 *
 * The painted image only covers 10 of the 16 pathways — Attorney,
 * Accounting, and Advertiser aren't depicted on any shelf, so the
 * Library page renders those three as a plain card row below the image
 * rather than inventing a hotspot where there's no real set piece.
 */

export interface LibraryShelf {
  label: string;
  href: string;
  /** Pathway slugs this shelf represents, for "is this the applicant's own pathway" highlighting. */
  pathwaySlugs: string[];
  top: number;
  left: number;
  width: number;
  height: number;
}

export const LIBRARY_SHELVES: LibraryShelf[] = [
  { label: "Military", href: "/pathways/military/practice-test", pathwaySlugs: ["military"], top: 8, left: 2, width: 18, height: 37 },
  { label: "Merchant Marine", href: "/pathways/merchant-marine/practice-test", pathwaySlugs: ["merchant-marine"], top: 8, left: 20, width: 18.5, height: 37 },
  { label: "Longshoremen", href: "/pathways/longshoremen/practice-test", pathwaySlugs: ["longshoremen"], top: 8, left: 38.5, width: 18.5, height: 37 },
  { label: "Truck Driver", href: "/pathways/truck-driver/practice-test", pathwaySlugs: ["truck-driver"], top: 8, left: 57, width: 19, height: 37 },
  {
    label: "Business Acquisition & Stocks",
    href: "/lobbies/business-acquisition-stock-trading",
    pathwaySlugs: ["business-acquisition", "stock-trading"],
    top: 8,
    left: 76,
    width: 20,
    height: 37,
  },
  { label: "Police Officer", href: "/pathways/police-officer/practice-test", pathwaySlugs: ["police-officer"], top: 52, left: 2, width: 18, height: 37 },
  { label: "Medical", href: "/pathways/healthcare/practice-test", pathwaySlugs: ["healthcare"], top: 52, left: 20, width: 18.5, height: 37 },
  {
    label: "Technology",
    href: "/lobbies/technology",
    pathwaySlugs: ["cybersecurity", "web-development-programming", "ai-architect"],
    top: 52,
    left: 38.5,
    width: 18.5,
    height: 37,
  },
  {
    label: "Real Estate",
    href: "/pathways/construction-skilled-trades/practice-test",
    pathwaySlugs: ["construction-skilled-trades"],
    top: 52,
    left: 57,
    width: 19,
    height: 37,
  },
  { label: "Fire Fighter", href: "/pathways/firefighter/practice-test", pathwaySlugs: ["firefighter"], top: 52, left: 76, width: 20, height: 37 },
];

/** Pathways with no shelf in the painted image — rendered as a plain card row instead. */
export const UNSHELVED_PATHWAY_SLUGS = ["attorney", "accounting", "advertiser"];
