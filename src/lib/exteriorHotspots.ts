/**
 * Clickable regions over the nav bar painted into
 * public/images/mansion-exterior.png, measured the same way as
 * hallwayHotspots.ts. "Opportunities" and the "Enter Your Future" button
 * both trigger entering the hallway rather than linking anywhere, so
 * they're handled separately in page.tsx.
 */

export interface ExteriorNavLink {
  label: string;
  href: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

export const EXTERIOR_NAV_LINKS: ExteriorNavLink[] = [
  { label: "Home", href: "/", top: 1.5, left: 26.5, width: 5, height: 5.5 },
  { label: "About", href: "/about", top: 1.5, left: 32, width: 6, height: 5.5 },
  { label: "Mentorship", href: "/mentors", top: 1.5, left: 48.5, width: 10, height: 5.5 },
  { label: "Resources", href: "/resources", top: 1.5, left: 58.5, width: 8, height: 5.5 },
  { label: "Contact", href: "/contact", top: 1.5, left: 67, width: 6, height: 5.5 },
];

export const EXTERIOR_OPPORTUNITIES_HOTSPOT = {
  top: 1.5,
  left: 37.5,
  width: 11,
  height: 5.5,
};

export const EXTERIOR_ENTER_BUTTON_HOTSPOT = {
  top: 1,
  left: 85.5,
  width: 14,
  height: 7,
};
