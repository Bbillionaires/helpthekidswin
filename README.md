# Help the Kids Win

*"Powered by Help the World Win"*

An immersive career-discovery platform. Instead of a traditional website,
visitors walk through **The Hall of Opportunity** — an animated hallway of
cinematic doors, each one a different career pathway — guided by an AI that
helps them find the door that fits.

## Organization structure

**Help the World Win** is the parent organization. Its mission:

> Help people discover opportunities, develop skills, connect with mentors,
> and build successful futures throughout every stage of life.

It does not ship products directly — every user-facing platform belongs to
an *initiative*. **Help the Kids Win** (this repo) is the flagship
initiative, focused on youth, students, apprentices, career changers, and
young adults preparing for careers. Planned initiatives share the same
mission and the same underlying architecture:

- Help the Kids Win (flagship — this repo)
- Help Veterans Win
- Help Families Win
- Help Entrepreneurs Win
- Help Communities Win

See `src/lib/organization.ts` for the initiative registry and
`ARCHITECTURE.md` for how a new initiative gets added without forking the
codebase.

## The Hall of Opportunity

Ten pathways currently have doors: Merchant Marine, Longshoremen, Military,
Police Officer, Firefighter, Truck Driver, Construction & Skilled Trades,
Healthcare (CNA/LPN/RN), Cybersecurity, and AI Architect. Each has its own
color palette, icon, atmosphere copy, and mood — defined in
`src/lib/pathways.ts`. Adding an eleventh pathway is a data change, not a
rewrite.

## User journey

1. Visitor enters `/hall-of-opportunity`; an AI guide delivers the welcome
   script and the hallway of doors appears.
2. Choosing a door leads to `/pathways/[slug]`, then a short intake
   interview at `/pathways/[slug]/intake`.
3. The recommendation engine (`src/lib/ai/recommend.ts`) analyzes the
   answers and returns three ranked, explained pathway suggestions —
   **advisory only**. The applicant can "Lock This Door" or "Explore
   Another Door."

## Applicant, mentor, and workspace flows

- `/apply/profile` — full applicant profile (career profile, personality,
  skills, interests, goals, education, certifications, accomplishments,
  availability, physical requirements, transportation, location, resume).
- `/mentor/profile` — mentor profile and verification submission.
- `/mentor/browse` — mentors browse qualified applicants and request
  apprentices; administrators approve every match.
- `/workspace/[matchId]` — the shared workspace for an approved
  applicant/mentor pair: dashboard, tasks, roadmap, calendar, messages,
  notes, files, quiz results, milestones, progress, and certificates.
- `/admin` — administrator dashboard: approvals, applicant review, pathway
  statistics, and communication/safety audit.

## Minor Protection Policy

No mentor, educator, recruiter, volunteer, contractor, or employer may
communicate directly with a minor until **all** of the following are true:
guardian consent, administrator approval, mentor verification, a cleared
background review, and explicit communication authorization. This is
enforced in code at `src/lib/safety/minorProtection.ts` and modeled at the
data layer in `prisma/schema.prisma` (`Match` model) — see
`ARCHITECTURE.md` for the full policy and audit design.

## Tech stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Framer Motion for the hallway/door animations
- Prisma schema modeling the full data model (applicants, mentors,
  matches, workspaces, messages, assessments, audit log, email aliases)
- A provider-agnostic seam for the LLM-powered guide and recommendation
  engine (`src/lib/ai/`)

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and, when ready, ANTHROPIC_API_KEY
npm run dev
```

Open `http://localhost:3000` to see the homepage, then click through to
the Hall of Opportunity.

## Roadmap

See `ARCHITECTURE.md` for the long-term vision: additional initiatives,
scholarships, apprenticeships, financial literacy, leadership development,
and the Stage 1 → Stage 2 communication rollout (internal messaging →
platform-managed email aliases via ImprovMX or equivalent).
