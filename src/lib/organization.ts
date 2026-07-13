/**
 * Organization registry.
 *
 * "Help the World Win" is the parent organization. It never ships a product
 * directly — every user-facing platform belongs to one of its initiatives.
 * Adding a new initiative (e.g. "Help Veterans Win") means adding one entry
 * here plus, when it's ready to launch, an `active: true` flag. No other
 * part of the codebase should hard-code initiative names.
 */

export type InitiativeStatus = "flagship" | "active" | "planned";

export interface Initiative {
  slug: string;
  name: string;
  tagline: string;
  status: InitiativeStatus;
  focus: string;
}

export const PARENT_ORGANIZATION = {
  name: "Help the World Win",
  mission:
    "Help people discover opportunities, develop skills, connect with mentors, and build successful futures throughout every stage of life.",
  sharedInitiativeMission:
    "Help people discover opportunity, build meaningful skills, and win in life through education, mentorship, and service.",
} as const;

export const INITIATIVES: Initiative[] = [
  {
    slug: "hall-of-opportunity",
    name: "Hall of Opportunity",
    tagline: "Powered by Help the World Win",
    status: "flagship",
    focus:
      "Youth, students, apprentices, career changers, and young adults preparing for careers.",
  },
  {
    slug: "help-veterans-win",
    name: "Help Veterans Win",
    tagline: "Powered by Help the World Win",
    status: "planned",
    focus: "Transitioning service members and veterans building civilian careers.",
  },
  {
    slug: "help-families-win",
    name: "Help Families Win",
    tagline: "Powered by Help the World Win",
    status: "planned",
    focus: "Family financial literacy, stability, and generational opportunity.",
  },
  {
    slug: "help-entrepreneurs-win",
    name: "Help Entrepreneurs Win",
    tagline: "Powered by Help the World Win",
    status: "planned",
    focus: "Founders and small-business owners building sustainable ventures.",
  },
  {
    slug: "help-communities-win",
    name: "Help Communities Win",
    tagline: "Powered by Help the World Win",
    status: "planned",
    focus: "Community organizations coordinating local opportunity and service.",
  },
];

export function getInitiative(slug: string): Initiative | undefined {
  return INITIATIVES.find((initiative) => initiative.slug === slug);
}

export const FLAGSHIP_INITIATIVE = INITIATIVES.find(
  (initiative) => initiative.status === "flagship",
)!;
