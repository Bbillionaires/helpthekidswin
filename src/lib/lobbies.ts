/**
 * A lobby is a shared entry room behind one hallway door that leads to
 * several distinct pathways instead of just one — e.g. one "Technology"
 * door covers Cybersecurity, Web Development & Programming, and AI
 * Architect. Lobbies never have their own intake/mirror; every item in
 * one links straight to a real pathway (src/lib/pathways.ts), which is
 * where the mirror and interview live.
 *
 * `image` + percent-based `top`/`left`/`width`/`height` on each item is
 * for lobbies that reuse an existing room image with real set pieces to
 * click (see "technology" below). Lobbies without unique art omit
 * `image`/coordinates and render as a plain labeled card list instead.
 */

export interface LobbyItem {
  label: string;
  href: string;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export interface Lobby {
  slug: string;
  name: string;
  atmosphere: string;
  icon: string;
  image?: string;
  items: LobbyItem[];
}

export const LOBBIES: Record<string, Lobby> = {
  technology: {
    slug: "technology",
    name: "Technology",
    atmosphere: "One command center, three paths through it — pick your focus.",
    icon: "💻",
    image: "/images/room-ai-architect.png",
    items: [
      {
        label: "Cybersecurity",
        href: "/pathways/cybersecurity",
        top: 70,
        left: 31,
        width: 37,
        height: 22,
      },
      {
        label: "Web Development & Programming",
        href: "/pathways/web-development-programming",
        top: 16,
        left: 27,
        width: 46,
        height: 33,
      },
      {
        label: "AI Development",
        href: "/pathways/ai-architect",
        top: 28,
        left: 78,
        width: 14,
        height: 55,
      },
    ],
  },
  "professional-careers": {
    slug: "professional-careers",
    name: "Professional Careers",
    atmosphere: "Choose a path. Build a skill. Make an impact.",
    icon: "⚖️",
    items: [
      { label: "Medical", href: "/pathways/healthcare" },
      { label: "Accounting", href: "/pathways/accounting" },
    ],
  },
  "business-acquisition-stock-trading": {
    slug: "business-acquisition-stock-trading",
    name: "Business Acquisition & Stock Trading",
    atmosphere: "Two ways to build wealth — acquiring businesses or trading markets.",
    icon: "🤝",
    items: [
      { label: "Business Acquisition", href: "/pathways/business-acquisition" },
      { label: "Stock Trading", href: "/pathways/stock-trading" },
    ],
  },
};

export function getLobby(slug: string): Lobby | undefined {
  return LOBBIES[slug];
}
