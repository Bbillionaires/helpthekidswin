# Architecture

## 1. Organization → Initiative → Pathway

Help the World Win is modeled as a three-level hierarchy so new initiatives
never require a fork or a rewrite:

```
Organization  (Help the World Win)
 └─ Initiative (Help the Kids Win, Help Veterans Win, ...)
     └─ Pathway (Merchant Marine, Cybersecurity, ...)
```

- `src/lib/organization.ts` is the single source of truth for the parent
  org and its initiatives (code-level registry, used by static/marketing
  surfaces).
- `prisma/schema.prisma`'s `Organization` / `Initiative` / `Pathway` models
  are the same hierarchy at the data layer, so a future admin UI can create
  initiatives and pathways without a deploy.
- Every initiative shares one mission statement
  (`PARENT_ORGANIZATION.sharedInitiativeMission`) and, by design, the same
  codebase: the door/hallway UI, the intake→recommendation flow, the
  mentor/apprentice matching model, the shared workspace, and the admin
  dashboard are all generic over "pathway," not hard-coded to Help the Kids
  Win's ten doors. Launching Help Veterans Win means adding an `Initiative`
  row and a new set of `Pathway` rows (e.g. "Transition to Logistics
  Management"), not new page components.

## 2. The Hall of Opportunity experience

The homepage (`src/app/page.tsx`, at `/`) *is* the hallway — there is no
separate marketing splash page in front of it, matching the brief's
"instead of a traditional website" framing. It renders the AI guide's
welcome script over the full exterior reference photo
(`public/images/mansion-exterior.png`), then the full interior reference
photo (`public/images/hall-of-opportunity-interior.png`) with clickable
regions layered over each painted door.

`src/lib/hallwayHotspots.ts` maps each door's on-image position (measured
in percent, so it scales with the rendered image) to a pathway slug. The
reference art's painted door labels don't all match our 10 real pathways
— see that file's comment for which 5 line up by name and how the other
5 are assigned. `PATHWAYS` (`src/lib/pathways.ts`) still defines the
gradient/icon/atmosphere metadata used on each pathway's own page; it's
no longer used to render doors directly on the homepage. `/pathways/[slug]`
requires a working image at `public/images/` — if a different/updated
reference image is dropped in, `hallwayHotspots.ts` coordinates will need
re-measuring to match. `/hall-of-opportunity` is kept as a redirect to
`/` for any old links.

The exterior image's painted nav bar (Home / About / Opportunities /
Mentorship / Resources / Contact / "Enter Your Future") is made
clickable the same way — `src/lib/exteriorHotspots.ts` holds those
coordinates. "Opportunities" and "Enter Your Future" both just trigger
entering the hallway; the rest route to real pages (`/about`,
`/mentors`, `/resources`, `/contact`).

## 2a. Pathway rooms

`/pathways/[slug]` renders a real per-pathway reference image
(`public/images/room-*.png`, one per pathway) rather than a CSS mockup.
Each image was generated with a wall of blank picture frames (for
mentors) plus a second wall of three frames labeled "Practice Test" /
"Application" / "Refer a Recruit" plus one mirror — `src/lib/pathwayRooms.ts`
holds the measured on-image coordinates (percent, like
`hallwayHotspots.ts`/`exteriorHotspots.ts`) for all of it. The page then
overlays real content into those blank frames: mentors matched to that
pathway (`getMentorsForPathway` in `src/data/mock.ts`, matched loosely on
`MentorProfile.careerSpecialties` so a suffix like "Healthcare (CNA, LPN,
RN)" still matches a mentor tagged just "Healthcare"), and clickable
regions over the practice-test/application/refer frames and the mirror
(which leads into the intake flow).

`ai-architect`'s source art doesn't follow this pattern — it's a sci-fi
command-room render with wall monitors instead of blank frames, so its
coordinates in `pathwayRooms.ts` are a best-effort adaptation (monitors
double as mentor slots, a floor console splits into three for practice
test/application/refer, a standing digital panel stands in for the
mirror). Regenerate that one to match the other 9 for pixel-perfect
alignment and consistent affordances (the other rooms show "Begin
Interview" on mirror hover; this one doesn't have equivalent hover text
for its three floor-console frames since they have no baked labels to
match against).

Any pathway without a `pathwayRooms.ts` entry falls back to a plain
CSS info page (icon, atmosphere copy, intake link) — this is dead code
today since all 10 pathways have art, but keeps the page from crashing
if a new pathway is added before its room art exists.

`/mentors` is the analogous "gallery" for the Mentorship nav tab —
currently a CSS grid of every `MOCK_MENTORS` entry as a frame, linking
to `/mentors/[id]`. A reference image was supplied for this
(`mentor-gallery.png`) but isn't wired in: it's a fully-rendered mockup
with 20 baked-in fictional mentors (different names, different industry
categories) rather than blank frames, so — same problem as the original
hallway art's door labels — there's no clean way to overlay our actual
mentor data into it. It'd need to be regenerated with blank frames, like
the pathway rooms, before it can replace the CSS version.

## 3. Intake → AI recommendation → decision

1. `/pathways/[slug]/intake` walks the applicant through
   `INTAKE_QUESTIONS` (`src/lib/ai/guide.ts`) and stores raw answers in
   `sessionStorage` (a placeholder for a real server-side session — see
   §7).
2. `/pathways/[slug]/recommendation` calls
   `generatePathwayRecommendations()` (`src/lib/ai/recommend.ts`), which
   currently scores pathways by tag overlap so the flow works without an
   API key. **This is the one function to replace with a real LLM call**
   (e.g. the Claude Messages API): keep the same
   `(IntakeResponse[]) => PathwayRecommendation[]` signature, prompt the
   model with the applicant's answers plus `PATHWAYS`, and parse its reply.
3. The UI always frames results as advisory ("Lock This Door" / "Explore
   Another Door") — the recommendation engine must never auto-select a
   pathway for the applicant.

## 4. Data model

`prisma/schema.prisma` models:

- **Identity**: `User` (role: APPLICANT / MENTOR / ADMIN / GUARDIAN),
  `ApplicantProfile`, `MentorProfile`, `GuardianLink`.
- **Discovery**: `PathwayRecommendation`, `Assessment` /
  `AssessmentResult` (pre-tests, quizzes, skills assessments — all scores
  stored, feeding `ApplicantProfile.readinessScore`).
- **Matching**: `Match`, gated by the five minor-protection booleans
  directly on the model (not inferred elsewhere).
- **Collaboration**: `Workspace`, `Task`, `Milestone`, `Message`, `Note`,
  `WorkspaceFile`, `Certificate`.
- **Safety & governance**: `AuditLogEntry`, `EmailAlias`,
  `MisconductReport`.

## 5. Minor Protection Policy (enforcement, not just UI copy)

`src/lib/safety/minorProtection.ts` exports `evaluateMinorProtection()`,
the single gate that must be checked before:

- rendering a messaging UI in the shared workspace,
- revealing any contact detail,
- activating a Stage 2 email alias.

For a minor applicant, all five flags are required: guardian consent,
admin approval, mentor verification, cleared background review, and
explicit communication authorization. For an adult applicant, guardian
consent is not required but the other four still are. The check must be
re-run on every message send server-side (not cached from match-approval
time), because any flag can be revoked later — e.g. a background review
that later comes back flagged must immediately cut off communication.

The admin communications view (`/admin/communications`) surfaces the same
gate so administrators can see exactly which requirement is outstanding
for every match, and can review full message history (`Message` rows are
never deleted; `flagged` supports misconduct triage via
`MisconductReport`).

## 6. Communication rollout: Stage 1 → Stage 2

- **Stage 1 (current)**: internal platform messaging only
  (`Workspace.messages`), no personal contact info ever exposed. Every
  message is persisted for audit.
- **Stage 2**: `EmailAlias` model + an ImprovMX (or equivalent) integration
  issues platform-managed aliases per user. Personal addresses stay hidden
  by default; alias traffic should also be logged for audit wherever the
  provider's API allows it. This is additive — Stage 1 messaging keeps
  working after Stage 2 ships.

## 7. Authentication & route gating

`src/auth.ts` wires up Auth.js (NextAuth v5) with a JWT session strategy
and a single Credentials provider. The session's `role` field
(`UserRole`) is set in the `jwt`/`session` callbacks and drives
`src/middleware.ts`, which redirects unauthenticated requests to
`/login?callbackUrl=...` and wrong-role requests to `/unauthorized` for
every path under `/admin`, `/mentor`, `/apply`, and `/workspace`.

**This is demo-grade, not production-grade.** `src/lib/auth/users.ts` is a
hardcoded list of four demo accounts (one per role) because there is no
persisted `User` table yet (see §8). Before this touches any real
applicant or mentor data — and especially before it touches anything a
minor interacts with — replace it with: real password hashing (or drop
Credentials entirely in favor of an OAuth/SSO provider), a Prisma-backed
user lookup, and email verification. The middleware's role-gating logic
itself (the `ROLE_GATES` table) is the part that should carry forward
unchanged once the identity layer is real.

## 8. Known scaffolding gaps (intentional, documented here rather than hidden)

- **Identity**: see §7 — the demo credential store is the main thing
  standing between this scaffold and a real login system.
- **Persistence**: pages currently read `src/data/mock.ts`. Swap in Prisma
  queries once `DATABASE_URL` points at a real Postgres instance; the
  shapes in `src/types/index.ts` already mirror the Prisma models. This
  also unblocks per-user authorization (e.g. a mentor should only see
  their own matches, not just any role-gated route).
- **Intake session**: `sessionStorage` is a placeholder for passing intake
  answers to the recommendation page; move this server-side once
  persistence exists so recommendations can be tied to a persisted
  `ApplicantProfile`.
- **LLM integration**: see §3 — `generatePathwayRecommendations` and the
  AI guide's conversational turns beyond the fixed welcome script are the
  two seams intended for a real model call.
- **Practice test / refer-a-recruit are UI-only stubs**: `/pathways/[slug]/practice-test`
  scores client-side and shows nothing to a mentor or admin;
  `/pathways/[slug]/refer` shows a confirmation but sends nothing. Both
  need a real submission target once one exists.
- **Intake intended to become a Google Form → Sheet → LLM pipeline**: the
  requested design is: the mirror leads to a Google Form, responses land
  in a Google Sheet, and a server-side job calls an LLM against that
  sheet's rows to produce the pathway recommendation (replacing the
  client-side tag-matching stub in `generatePathwayRecommendations`).
  This needs two things only the org can provide: (1) the Google Form
  itself, or a service-account credential with Sheets API access, and
  (2) an LLM API key set as an environment variable. Until those exist,
  `/pathways/[slug]/intake` stays on the current sessionStorage +
  tag-matching implementation as the interim mirror destination.

## 9. Long-term vision

Help the World Win is designed to grow into a global opportunity platform:
career discovery, workforce development, apprenticeships, mentorship,
scholarships, entrepreneurship, military preparation, skilled trades,
healthcare careers, technology careers, financial literacy, leadership
development, community service, and lifelong learning — all sharing one
mission and, wherever the domain allows, one codebase.
