/**
 * Clickable regions positioned over the doors as they actually appear in
 * public/images/hall-of-opportunity-interior.png (measured directly from
 * the image via a percent-grid overlay, so they scale with the rendered
 * image size).
 *
 * This image's 11 painted doors don't map 1:1 onto our pathways:
 * - 6 line up exactly by name: Merchant Marine, Longshoremen, Police
 *   Officer, Military, Firefighter, Truck Driver.
 * - Real Estate → Construction & Skilled Trades is a thematic fit, not a
 *   literal match.
 * - Technology Innovation, Attorney/Stock Investments, and Business
 *   Acquisition each cover MORE than one pathway, so they lead to a
 *   `href` (a /lobbies/[slug] chooser — src/lib/lobbies.ts) instead of a
 *   single pathway directly:
 *     - Technology Innovation → the Technology lobby (Cybersecurity, Web
 *       Development & Programming, AI Architect)
 *     - Attorney and Stock Investments both → the Professional Careers
 *       lobby (Attorney, Medical, Accounting, Advertiser) — two doors,
 *       one lobby, which also fixes the old "Attorney door leads to
 *       Cybersecurity" mismatch
 *     - Business Acquisition → the Business Acquisition & Stock Trading
 *       lobby (Business Acquisition, Stock Trading)
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
  { href: "/lobbies/professional-careers", imageLabel: "Stock Investments", top: 8, left: 2, width: 15, height: 30 },
  { href: "/lobbies/professional-careers", imageLabel: "Attorney", top: 8, left: 19, width: 14, height: 30 },
  { href: "/pathways/construction-skilled-trades", imageLabel: "Real Estate", top: 8, left: 68, width: 14, height: 30 },
  { href: "/lobbies/business-acquisition-stock-trading", imageLabel: "Business Acquisition", top: 8, left: 84, width: 14, height: 30 },

  // Lower gallery
  { href: "/pathways/merchant-marine", imageLabel: "Merchant Marine", top: 44, left: 5, width: 12, height: 24 },
  { href: "/pathways/longshoremen", imageLabel: "Longshoremen", top: 44, left: 19, width: 12, height: 24 },
  { href: "/pathways/police-officer", imageLabel: "Police Officer", top: 44, left: 32, width: 10, height: 24 },
  { href: "/pathways/military", imageLabel: "Military", top: 44, left: 45, width: 10, height: 24 },
  { href: "/pathways/firefighter", imageLabel: "Fire Fighter", top: 44, left: 60, width: 11, height: 24 },
  { href: "/pathways/truck-driver", imageLabel: "Truck Driver", top: 44, left: 73, width: 9, height: 24 },
  { href: "/lobbies/technology", imageLabel: "Technology Innovation", top: 44, left: 86, width: 10, height: 24 },
];
