/**
 * Clickable regions positioned over the doors as they actually appear in
 * public/images/hall-of-opportunity-interior.png (measured directly from
 * the image via a percent-grid overlay, so they scale with the rendered
 * image size).
 *
 * This is the second version of this image — the first painted "Stock
 * Investments" and "Attorney" as separate doors with no home for a
 * combined professional-careers concept; this one repaints the upper
 * gallery to say "PROFESSIONAL CAREERS" (with a Medical/Accounting
 * breakdown baked into the art itself) and "BUSINESS ACQUISITION &
 * STOCK TRADING" directly, and keeps "ATTORNEY" as its own separate
 * door. Door positions are unchanged from the previous version — only
 * the labels/targets below changed to match the new painted text:
 * - 6 doors line up exactly by name: Merchant Marine, Longshoremen,
 *   Police Officer, Military, Firefighter, Truck Driver.
 * - Real Estate → Construction & Skilled Trades is a thematic fit.
 * - Attorney now leads straight to its own pathway (no lobby detour,
 *   since the art itself gives it a dedicated door).
 * - Professional Careers, Business Acquisition & Stock Trading, and
 *   Technology Innovation each cover more than one career, so they lead
 *   to a `href` (a /lobbies/[slug] chooser — src/lib/lobbies.ts):
 *     - Professional Careers → Medical, Accounting (the art's own
 *       bottom banner lists exactly these two — Attorney split off into
 *       its own door, and Advertiser isn't painted anywhere in this
 *       version, so it currently has no hallway door at all; see
 *       ARCHITECTURE.md)
 *     - Business Acquisition & Stock Trading → Business Acquisition,
 *       Stock Trading
 *     - Technology Innovation → Cybersecurity, Web Development &
 *       Programming, AI Architect
 */

export interface HallwayHotspot {
  href: string;
  imageLabel: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

export const HALLWAY_HOTSPOTS: HallwayHotspot[] = [
  // Upper gallery
  { href: "/lobbies/professional-careers", imageLabel: "Professional Careers", top: 8, left: 2, width: 15, height: 30 },
  { href: "/pathways/attorney", imageLabel: "Attorney", top: 8, left: 19, width: 14, height: 30 },
  { href: "/pathways/construction-skilled-trades", imageLabel: "Real Estate", top: 8, left: 68, width: 14, height: 30 },
  { href: "/lobbies/business-acquisition-stock-trading", imageLabel: "Business Acquisition & Stock Trading", top: 8, left: 84, width: 14, height: 30 },

  // Lower gallery
  { href: "/pathways/merchant-marine", imageLabel: "Merchant Marine", top: 44, left: 5, width: 12, height: 24 },
  { href: "/pathways/longshoremen", imageLabel: "Longshoremen", top: 44, left: 19, width: 12, height: 24 },
  { href: "/pathways/police-officer", imageLabel: "Police Officer", top: 44, left: 32, width: 10, height: 24 },
  { href: "/pathways/military", imageLabel: "Military", top: 44, left: 45, width: 10, height: 24 },
  { href: "/pathways/firefighter", imageLabel: "Fire Fighter", top: 44, left: 60, width: 11, height: 24 },
  { href: "/pathways/truck-driver", imageLabel: "Truck Driver", top: 44, left: 73, width: 9, height: 24 },
  { href: "/lobbies/technology", imageLabel: "Technology Innovation", top: 44, left: 86, width: 10, height: 24 },
];
