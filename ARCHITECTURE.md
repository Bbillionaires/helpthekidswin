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
in percent via a grid overlay, so it scales with the rendered image) to
a target `href`. The interior image has gone through three revisions
now — the first painted "Stock Investments" and "Attorney" as separate
doors with no combined professional-careers door; the second repainted
the upper gallery to say "PROFESSIONAL CAREERS" and "BUSINESS
ACQUISITION & STOCK TRADING" directly, with "ATTORNEY" kept as its own
door and a Medical/Accounting breakdown baked into a bottom banner; the
third (current) is the same door layout and labels as the second on a
white/cream marble background instead of dark bronze, without that
bottom banner (the Medical/Accounting split lives in code — the
Professional Careers lobby, §2a — not in the art, so dropping the banner
changed nothing functionally). Door *positions* have stayed pixel-
identical across all three revisions, only the rendering style and
painted labels changed, so `hallwayHotspots.ts`'s coordinates have
carried over unchanged each time — always re-measure and re-verify with
a grid overlay if a future revision moves anything, rather than assuming
that'll keep holding. 11 painted doors cover 16 pathways today — 6 line
up by name (Merchant Marine, Longshoremen, Police Officer, Military,
Firefighter, Truck Driver), 2 more are direct matches (Attorney →
`attorney`; Real Estate → Construction & Skilled Trades, a thematic
rather than literal fit), and the remaining 3 doors each cover more than
one career, so they lead to a **lobby** (§2a) instead of a pathway
directly: Professional Careers → Medical, Accounting; Business
Acquisition & Stock Trading → Business Acquisition, Stock Trading;
Technology Innovation → Cybersecurity, Web Development & Programming,
AI Architect. `PATHWAYS` (`src/lib/pathways.ts`) still defines the
gradient/icon/atmosphere metadata used on each pathway's own page; it's
no longer used to render doors directly on the homepage. `/pathways/[slug]`
requires either a working image at `public/images/` or falls back to a
plain CSS page (see §2d). `/hall-of-opportunity` is kept as a redirect
to `/` for any old links.

**`advertiser` currently has no hallway door or lobby item at all** —
the first version of the interior image's Professional Careers lobby
included it, but this second version's door caption and bottom banner
only list Medical and Accounting, so it was dropped to match the art
exactly. The pathway itself, its intake questions, and its fallback room
page all still work; it's just unreachable by walking through anything
today. Worth flagging back to whoever's iterating on the art.

### 2a. Lobbies — one door, several careers

Some doors' painted labels don't map to a single pathway (Technology
Innovation covers three tech careers; Professional Careers covers two
professions). `src/lib/lobbies.ts` models this as a **lobby**: a shared
entry room with no intake of its own, whose items each link straight to
a real pathway. `/lobbies/[slug]/page.tsx` renders it one of two ways
depending on whether the lobby has unique art:

- **Technology** reuses `room-ai-architect.png` (the existing sci-fi
  command-room render) — it already has three distinct set pieces, so
  three bold, always-visible (not hover-only, per an explicit
  readability requirement) labels are overlaid directly on them: the
  floor console table → Cybersecurity, the wall of six screens → Web
  Development & Programming, the standing panel → AI Architect (AI
  Development). Each of those three pathways then reuses the *same*
  image again as its own room (see §2d) — "disregard the [dedicated]
  cybersecurity room, use the generalized tech room" was the explicit
  instruction that produced this.
- **Professional Careers** (Medical / Accounting) and **Business
  Acquisition & Stock Trading** (Business Acquisition / Stock Trading)
  have no shared art, so they render as a plain bold-labeled card grid
  instead — same "click this, land on that pathway's own room" contract,
  just without an image to overlay.

"Medical" deliberately routes to the existing `healthcare` pathway
rather than a new one — it already has full room art and mentors.
`/lobbies/[slug]` carries the same registration gate as room entry
(§2b) — reaching a lobby is still "walking through a door."

The exterior image's painted nav bar (Home / About / Opportunities /
Mentorship / Resources / Contact / "Enter Your Future") is made
clickable the same way — `src/lib/exteriorHotspots.ts` holds those
coordinates. "Opportunities" and "Enter Your Future" both just trigger
entering the hallway; the rest route to real pages (`/about`,
`/mentors`, `/resources`, `/contact`).

`src/app/page.tsx` is a client component holding the exterior/interior
toggle. Registration isn't gated here at all — see §2b, the gate is one
step later, at room/lobby entry — so this page needs no server-side auth
check. Every "Back to the Hallway" / "Explore Another Door" / "Back to
the Hall of Opportunity" link across the app points at `/?entered=1`
rather than plain `/`, and the homepage reads that via `useSearchParams()`
(wrapped in a `<Suspense>` boundary, per Next's requirement for that
hook) rather than `useState` + a `useEffect` reading `window.location`.
That distinction matters: `useSearchParams()` reflects the destination
URL synchronously as part of the client-side navigation itself, so the
interior hallway renders on the very first paint. The old effect-based
version set `welcomed` a render *after* mount, which was visible — every
"Back to the Hallway" click flashed the exterior welcome screen for a
frame before flipping to the interior. Plain `/` (e.g. the navbar logo)
intentionally still resets to the exterior, via separate local state for
the in-page "Enter" button/hotspots.

### 2b. Registration gate

Anyone can click "Enter" and browse the full hallway — every painted
door, hovering to see its label — without an account. Registration is
gated one step later, at **room or lobby entry**: both
`/pathways/[slug]/page.tsx` and `/lobbies/[slug]/page.tsx` call `auth()`
server-side and, if there's no session, `redirect()` to
`/register?callbackUrl=...` (back to whichever one was requested) before
rendering any content (mentors, practice test, the mirror, or a lobby's
item list). This is a deliberate
middle ground — gating at the front door turned away curious visitors
before they'd seen anything; deferring all the way to the mirror would
let people browse every room anonymously. Room entry is the point where
an applicant profile actually starts to matter: mentors/admins need
someone to track, and a completed interview needs an account for its
score, answers, and eventual certificate to attach to (see §3 and §3a).
After registering, the applicant lands back on the same room they tried
to enter. `src/app/register/page.tsx` is a server-action form (same
pattern as `/login`) that calls `registerUser()` (`src/lib/auth/users.ts`)
then `createApplicantProfile()` (`src/data/mock.ts`) before signing the
new account in and redirecting back to the `callbackUrl`. See §7 for the
same demo-grade caveat that already applied to login.

### 2c. Profile-completion gate

Registering creates an `ApplicantProfile`, but an empty one —
`careerProfile.goals` starts as `""`. The first room door an applicant
successfully walks through checks that: if `goals` is still empty,
`/pathways/[slug]/page.tsx` redirects to `/pathways/[slug]/profile`
(`src/app/pathways/[slug]/profile/page.tsx`), a short 4-question form
(goals, city/state, availability, transportation) that `POST`s to
`/api/profile/complete` and then sends the applicant back to the room
they were trying to enter. This only fires once — after the first
completion, `goals` is no longer empty, so later rooms skip straight to
their content. This is deliberately a *different, much shorter* thing
than the interview behind the mirror (§3): this is "who are you," not
"how well do you fit this specific career" — the 27-question evaluation
stays exclusively behind the mirror, never at the door.

## 2d. Pathway rooms

`/pathways/[slug]` renders a real per-pathway reference image
(`public/images/room-*.png`, one per pathway) rather than a CSS mockup.
Most images were generated with a wall of blank picture frames (for
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

`ai-architect`'s source art doesn't follow the blank-frame pattern — it's
a sci-fi command-room render with wall monitors instead of frames, so its
coordinates are a best-effort adaptation (monitors double as mentor
slots, a floor console splits into three for practice test/application/
refer, a standing digital panel stands in for the mirror). `cybersecurity`
and `web-development-programming` deliberately reuse this exact same
image rather than getting unique art of their own — they're the other
two doors behind the Technology lobby (§2a), and giving each its own
mirror on a different set piece (the floor console, the wall of screens)
was cheaper and more consistent than commissioning two more renders.
Since neither has blank frames to work with, their `pathwayRooms.ts`
entries skip mentor/practice-test/application/refer entirely (zeroed-out
`RoomSlot`s) and define only a `mirror` — every pathway that has a room
at all still has a mirror, that's just the one interactive element for
these two.

`accounting` and `business-acquisition` have unique art but it isn't the
blank-frame pattern either (a fully-rendered office scene each), so they
get the same zeroed-mentor/practice-test/application/refer, mirror-only
treatment as the shared tech room. Both were supplied at 1402x1122
rather than the usual 1536x1024 canvas, so `PathwayRoomArt` grew optional
`imageWidth`/`imageHeight` fields the page reads before falling back to
1536x1024 — without them the browser stretches the image to the wrong
aspect ratio. `business-acquisition`'s render also bakes in its own
"RETURN TO HALL" graphic; `returnToHallway` overlays a real link on it.

`attorney` and `stock-trading` *do* follow the blank-frame pattern —
`attorney` has 6 blank mentor frames ("Mentors Who Built The Path") and
one large circular mirror, plus three real book-stack set pieces doing
double duty as the practice-test/application/refer hotspots (the
"CIVIL PROCEDURE / CONSTITUTIONAL LAW / ..." named stack → Practice
Test, the flat stack with the gavel → Application, the standalone shelf
row → Refer a Recruit — no blank frames exist for these in the source
art, so real set pieces were measured and used instead, the same idea as
the Technology lobby's clickable items in §2a). `stock-trading` has 6
blank mentor frames split into two walls of 3 ("Mentors Who Mastered The
Markets" / "Mentors Who Built The Path") and, unusually, *two* mirrors
flanking the central NYSE display — both are equally valid, so
`PathwayRoomArt` grew an optional `additionalMirrors: RoomSlot[]` and the
page renders every one of them with the same "Begin Interview" behavior.

`advertiser` has no `pathwayRooms.ts` entry and falls back to a plain
CSS info page (icon, atmosphere copy, intake link) — no unique art
exists for it yet, and per §2 it currently has no hallway door or lobby
item either.

`/mentors` (the Mentor Hall nav tab) renders `mentor-gallery.png` as its
hero, per direct request to put it there — but only its *real* UI chrome
is wired up as functional, not the image's own painted content.
`src/lib/mentorCategories.ts` maps the image's "Browse by Industry"
sidebar (Technology / Finance / Healthcare / Entrepreneurship / Real
Estate / Entertainment / Leadership) to real `MentorProfile.careerSpecialties`
values, so clicking a category button live-filters the real mentor grid
rendered below the image (`src/app/mentors/MentorsGalleryClient.tsx`,
"use client" for the filter state). A real `<input>` is absolutely
positioned over the "Find Your Mentor" tablet mockup's search box and
live-filters by name/specialty/bio as you type.

What's deliberately **not** wired up: the image's right-hand "OUR
MENTORS" panel — 20 baked-in fictional names/photos/titles under those
same 5 categories. Those are pixels in the art, not separate elements,
so there's no way to swap in real mentor data without either
misrepresenting a real account as one of those specific fictional
people or creating a confusing mismatch (click "Sophia Lin," land on a
real mentor's profile with a different name and face) — same problem as
the original hallway art's door labels in §2, and not an acceptable
tradeoff on a platform serving minors. That panel is decorative
atmosphere only; the real, filterable mentor grid directly below it is
the functional equivalent. The Library (§2e) covers the analogous
"browse every industry" need for study material, built data-driven from real
pathways/mentors instead.

## 2e. Room frame overrides, the Technology globe, and the Practice Library

Every mentor picture frame in a pathway room is clickable, always — a
frame with no mentor matched by career specialty used to render a dead
`<div>`; it now falls back to a "Meet Our Mentors" link to `/mentors`
instead. `src/lib/roomFrameSettings.ts` is the in-memory override layer
that makes both halves of this configurable from `/admin/rooms`: an
admin can pin a *specific* mentor into a specific frame index (overriding
the automatic positional match), explicitly clear a frame back to blank,
or toggle a frame's clickability off entirely. `PathwayRoomPage` resolves
each frame through `resolveFrameMentorId`/`isFrameClickable` before
falling back to the default positional mentor — same limitation as the
rest of `src/data/mock.ts` (in-memory, resets on restart).

The Technology lobby's shared room (`room-ai-architect.png`) renders
**four** gateways on every one of its three pathway pages, not just
whichever one you arrived through: each pathway's own dedicated landmark
(the floor console for Cybersecurity, the wall of screens for Web
Development & Programming, the standing side panel for AI Architect —
`TECH_GATEWAY_POSITIONS` in `pathwayRooms.ts`) plus the desk globe, which
is shared by all three (`TECH_ROOM_GLOBE`, wired as an `additionalMirrors`
entry on each). The other two pathways' landmarks render too, via a new
`crossPathwayMirrors` field on `PathwayRoomArt` — each entry pairs a
position with an explicit `pathwaySlug`, so e.g. the Cybersecurity page
also shows the wall-of-screens and standing-panel hotspots, each linking
straight to Web Development & Programming's or AI Architect's own
`/intake`, never to another room page. `techCrossPathwayMirrors(slug)`
generates these automatically from `TECH_GATEWAY_POSITIONS` so all three
entries can't drift out of sync with each other. Net effect: land on any
one of the three technology pathways and all four gateways — three
career-specific landmarks plus the globe — are visible and clickable,
each going straight to that specific pathway's questions.

The **Practice Library** (`/library`) is a fourth top-level room concept,
reachable from the Navbar, rendering real reference art
(`public/images/hall of opportunity library.png`) — a room of 10 labeled
bookshelves, each listing real study topics. `src/lib/libraryShelves.ts`
maps each shelf to the pathway(s) it represents (a shelf covering more
than one pathway, like "Technology" or "Business Acquisition & Stocks",
routes to that grouping's lobby, same convention as the hallway doors in
§2). The painted image only covers 10 of the 16 pathways — Attorney,
Accounting, and Advertiser aren't on any shelf, so those three render as
a plain card row below the image instead of an invented hotspot.

It's gated the same way pathway rooms are — registration required — plus
one more rule specific to the Library: an applicant can't browse it at
all until they've walked through a door and completed the mini-profile
at their first room (§2c), because there'd be no "own industry" to focus
on otherwise. That "own industry" is tracked as
`ApplicantProfile.primaryPathwaySlug`, set once by `/api/profile/complete`
from whichever pathway's mini-profile the applicant completed first, and
never overwritten by later room visits. Once past that gate, every shelf
is browsable — the page keeps a persistent reminder banner that only the
applicant's own pathway counts toward their completion certificate, and
rings whichever shelf represents it in gold.

A second reference image (`mentor-gallery.png`) was also supplied around
the same time but belongs on `/mentors` instead, not here — its content
is mentor headshots by broad category, not study topics by pathway, so
it doesn't fit the Library's shelf-of-materials concept. See §2d for how
it's actually used.

## 3. Intake → AI recommendation → decision

1. `/pathways/[slug]/intake` walks the applicant through
   `getIntakeQuestions(slug)` (`src/lib/ai/guide.ts`) — up to 33 questions
   (27 today, leaving headroom), assembled from: the shared `INTAKE_QUESTIONS`
   core (goals, environment, team style, risk tolerance, interests,
   timeline); that pathway's own `PATHWAY_INTAKE_QUESTIONS` follow-ups
   (e.g. Merchant Marine asks about time away from home, Firefighter asks
   about EMT certification); `SKILL_LEVEL_QUESTIONS`; `PSYCHOLOGY_QUESTIONS`;
   `HEALTH_FITNESS_QUESTIONS`; `SCIENCE_AWARENESS_QUESTIONS`; and
   `QUALIFYING_QUESTIONS` (age, education, work authorization, felony,
   DUI/DWI, background-check consent — the qualify/disqualify screen).
   This is how each room's mirror leads into an interview that actually
   reflects that career, and screens for real-world eligibility, not one
   generic interview reused everywhere.
2. On the last question, the client POSTs all responses to
   `/api/intake/submit` (`src/app/api/intake/submit/route.ts`), which
   calls `generatePathwayRecommendations(responses, pickedSlug)`
   (`src/lib/ai/recommend.ts`) server-side and returns a
   `RecommendationResult`: a `picked` fit score (0-100) for the door the
   applicant actually walked through, plus up to 3 ranked `alternates` —
   the contingency doors, including ones that scored higher than the
   picked pathway. Scoring combines interest/motivation/team-style tag
   overlap, risk-tolerance and health-fitness alignment against the
   pathway's `physicalDemand`, the science/aptitude questions' correctness,
   and skill-level self-reporting. `DISQUALIFIERS` in the same file maps
   qualifying answers to pathways: `hard` disqualifiers (e.g. no U.S. work
   authorization, under the minimum age for Military/Police/Firefighter/
   Truck Driver/Merchant Marine/Longshoremen, a felony for Police
   Officer/Military) drop a pathway's eligibility to zero and exclude it
   from the ranked alternates; `caution` disqualifiers (e.g. a DUI for a
   pathway that isn't Truck Driver) dock points and surface an explanatory
   note without blocking it outright. **This deterministic scorer is the
   one function to replace with a real LLM call** (e.g. the Claude
   Messages API): keep the same
   `(IntakeResponse[], pathwaySlug) => RecommendationResult` signature,
   prompt the model with the applicant's answers plus `PATHWAYS`, and
   parse its reply into the same shape.
3. If the request carries a session, the route also calls
   `recordIntakeAssessment()` (`src/data/mock.ts`), which appends an
   `AssessmentResult` — score **and every raw question/answer pair** — to
   that applicant's profile and updates `readinessScore`. `/admin/applicants`
   renders each interview (collapsed by default, expandable) so an admin
   can see exactly how an applicant answered, not just their score. This
   is why registration (§2a) happens before intake: without a signed-in
   applicant, an interview still scores and displays normally, it just has
   nowhere durable to land.
4. `/pathways/[slug]/recommendation` reads the `RecommendationResult`
   back out of `sessionStorage` (a placeholder for a real server-side
   session — see §8) and renders the picked door's fit score plus the
   alternates, always framed as advisory ("Lock This Door" / "Explore
   Another Door" / "Consider This Instead") — the recommendation engine
   must never auto-select a pathway for the applicant.

## 3a. Certificates

`/workspace/[matchId]`'s Certificates tab lets a signed-in mentor or
admin issue a "Hall of Opportunity" certificate for that match
(`POST /api/certificates/issue`, gated to the `MENTOR`/`ADMIN` roles
server-side, not just hidden in the UI). `issueCertificate()`
(`src/data/mock.ts`) stamps the industry (pathway name), issue date and
time, a "speed" label (elapsed time from `Match.requestedAt` to
issuance), the applicant's current `readinessScore` as the grade, and
the matched mentor's name, then `src/components/Certificate.tsx` renders
it with the "Powered by Greenwood 100Inc and Help The Kids Win" footer
and a "De'Aris Henry" signature — self-hosted via `next/font/google`'s
Dancing Script rather than the CSS generic `cursive` family, which has
no reliable fallback on Linux and silently renders as plain serif there.

There's no real workspace task/milestone completion tracking yet (the
Tasks/Milestones tabs are still static display-only lists — see §8), so
issuing a certificate isn't gated on an automated "100% done" check; a
mentor or admin issues it once they've confirmed the applicant is ready.
Wire it to real milestone completion once Tasks/Milestones stop being
mock lists.

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

`trustHost: true` is set explicitly rather than relying on Auth.js's
automatic per-platform detection (it only auto-trusts the request host
in production when it recognizes the hosting platform itself, e.g. via
Vercel's own env vars, or when `AUTH_URL`/`NEXTAUTH_URL` is set — this
project sets neither). Without it, every sign-in/session request in a
production build throws `UntrustedHost` and fails silently: no session
cookie is ever set, so `auth()` returns null everywhere, which surfaces
as seemingly unrelated bugs throughout the app — room pages endlessly
redirecting to `/register`, "Back to the Hallway" links behaving
strangely, hotspots that look wired up doing nothing — because the
person clicking them was never actually signed in. This was found and
fixed after exactly that kind of report; if navigation ever looks broken
again in a way the code doesn't explain, check for `UntrustedHost` in
server logs first.

**This is demo-grade, not production-grade.** `src/lib/auth/users.ts` seeds
four hardcoded demo accounts (one per role) into an in-memory
`REGISTERED_USERS` array — the same array `/register` (§2a) pushes new
applicant signups into — because there is no persisted `User` table yet
(see §8). Passwords are stored in plaintext in that array. Before this
touches any real applicant or mentor data — and especially before it
touches anything a minor interacts with — replace it with: real password
hashing (or drop Credentials entirely in favor of an OAuth/SSO provider),
a Prisma-backed user lookup, and email verification. The middleware's
role-gating logic itself (the `ROLE_GATES` table) is the part that should
carry forward unchanged once the identity layer is real.

## 7a. Site navigation, mentor self-signup, account recovery, and policy

`src/components/Navbar.tsx` is the single source of truth for site
navigation: Home, Mentor Hall, About, Resources, Contact, and Policy &
Disclaimer are always visible; Admin appears only for `ADMIN` sessions.
The auth cluster on the right is role-aware — a signed-out visitor sees
Sign Up / Sign In, a signed-in user sees their name, role, a link to the
role-appropriate profile page (`/apply/profile`, `/mentor/profile`, or
`/admin`), and Sign Out.

**Mentor self-signup** (`/mentor/signup`) mirrors the applicant
`/register` flow but calls `registerUser({ ..., role: "MENTOR" })` and
then `createMentorProfile(...)` (both in `src/lib/auth/users.ts` /
`src/data/mock.ts`) instead of `createApplicantProfile`. It collects
career specialties as checkboxes sourced directly from `PATHWAYS`
(`src/lib/pathways.ts`) so the list can't drift out of sync with the
pathway registry. New mentors start with
`verification.backgroundReviewStatus: "pending"` — matching the
minor-protection gate in §5, they cannot message an applicant under 18
until an admin clears that review.

`/mentor/signup` has to be a **public** route even though every other
`/mentor/*` path is role-gated — `src/middleware.ts` special-cases it via
a `PUBLIC_EXACT_PATHS` set checked before the `ROLE_GATES` table, since a
brand-new mentor has no session yet when they land on the signup page.

**Applicant and mentor profile pages** (`/apply/profile`,
`/mentor/profile`) were previously non-functional UI stubs (`FormSection`
inputs with no `name`/`defaultValue`, buttons that did nothing). Both are
now real server components: they read the signed-in user's
`ApplicantProfile` / `MentorProfile` via `getApplicantByUserId` /
`getMentorByUserId`, prefill every field with `defaultValue`, and a
`"use server"` action persists edits via the new `updateApplicantProfile`
/ `updateMentorProfile` functions in `src/data/mock.ts`. The mentor page
also has a "Submit for Verification" action
(`submitMentorForVerification`) that's disabled once a review is already
underway. The old client-side "Resume upload" file input was removed
rather than wired to a fake handler — there's no file storage yet, and a
non-functional upload button would be worse than no button.

**Forgot password/username** (`/forgot-password`) is intentionally an
honest stub, not a fake "reset link sent" flow: there's no email-sending
service wired up (see §8), so pretending to send a reset email would be
lying to the user. The page collects the account email and tells the
visitor a real person will follow up, pointing them at `/contact` in the
meantime. This should become a real token-based reset flow once an email
provider is configured.

**Policy & Disclaimer** (`/policy`) directly answers two questions this
project needed honest answers to rather than assumed ones:

- *Does HIPAA apply?* No — this platform isn't a healthcare provider,
  health plan, or clearinghouse (the definition of a HIPAA "covered
  entity"), even though one pathway is healthcare careers. The page still
  flags the FTC Health Breach Notification Rule and state
  sensitive-data laws as the more relevant obligations for the
  health/fitness-adjacent intake questions this platform does ask.
- *Does COPPA apply, and is Vanta the right free tool?* COPPA covers
  under-13s specifically, so it doesn't reach a 16-18 platform — but
  state-level minor-protection and youth-program background-check
  statutes do, which is why guardian consent and mentor background
  review are hard gates (§5) rather than a COPPA checkbox. And Vanta is
  **not free** — it's a paid SOC 2/HIPAA compliance-automation
  subscription that wouldn't address this project's actual current risk
  (plaintext passwords in an in-memory store, §7). The page recommends
  free alternatives (OWASP ASVS, NIST Privacy Framework, CISA's Cyber
  Essentials) for now and revisiting paid tooling once/if a school
  district or funder requires formal compliance proof.

The page is explicit that it is not legal advice and hasn't been reviewed
by an attorney — that review is still a prerequisite before this
platform handles real minors' data in production.

## 8. Known scaffolding gaps (intentional, documented here rather than hidden)

- **Identity**: see §7 — the demo/in-memory credential store is the main
  thing standing between this scaffold and a real login system. Every
  registered account, every `MOCK_APPLICANTS` entry created at signup, and
  every issued `Certificate` lives in module-scope arrays in
  `src/data/mock.ts` / `src/lib/auth/users.ts` — they reset on every
  server restart or cold start, and in a real multi-instance deployment
  (e.g. Vercel serverless) different requests can hit different instances
  with different in-memory state. This is fine for a single running demo
  process; it is not durable storage.
- **Persistence**: pages currently read `src/data/mock.ts`. Swap in Prisma
  queries once `DATABASE_URL` points at a real Postgres instance; the
  shapes in `src/types/index.ts` already mirror the Prisma models. This
  also unblocks per-user authorization (e.g. a mentor should only see
  their own matches, not just any role-gated route).
- **Intake session**: `sessionStorage` is a placeholder for passing the
  already-computed `RecommendationResult` from `/intake` to
  `/recommendation` (the score itself is computed and persisted
  server-side in `/api/intake/submit` — see §3 — this is just the
  same-request UI handoff); move this server-side too once a real session
  exists.
- **LLM integration**: see §3 — `generatePathwayRecommendations` and the
  AI guide's conversational turns beyond the fixed welcome script are the
  two seams intended for a real model call.
- **Practice test / refer-a-recruit are UI-only stubs**: `/pathways/[slug]/practice-test`
  scores client-side and shows nothing to a mentor or admin;
  `/pathways/[slug]/refer` shows a confirmation but sends nothing. Both
  need a real submission target once one exists.
- **No email-sending service**: `/contact` and `/forgot-password` both
  collect input and show an honest "a real person will follow up"
  message rather than a fake "email sent" confirmation (see §7a) — there
  is no SMTP/Resend/SES integration yet. Wiring one up unblocks both a
  real password-reset-by-email flow and actual contact-form delivery.
- **No file storage**: the applicant profile's resume upload was removed
  rather than left as a non-functional stub (see §7a) — add S3/Vercel
  Blob (or similar) before reintroducing it.
- **Intake intended to become a Google Form → Sheet → LLM pipeline**: the
  requested design is: the mirror leads to a Google Form, responses land
  in a Google Sheet, and a server-side job calls an LLM against that
  sheet's rows to produce the pathway recommendation (replacing the
  deterministic weighted-scoring stub in `generatePathwayRecommendations`,
  §3). This needs two things only the org can provide: (1) the Google
  Form itself, or a service-account credential with Sheets API access,
  and (2) an LLM API key set as an environment variable. Until those
  exist, `/pathways/[slug]/intake` stays on the current in-app form +
  weighted-scoring implementation as the interim mirror destination —
  it's a real scorer with real disqualification logic, just not an LLM.

## 9. Long-term vision

Help the World Win is designed to grow into a global opportunity platform:
career discovery, workforce development, apprenticeships, mentorship,
scholarships, entrepreneurship, military preparation, skilled trades,
healthcare careers, technology careers, financial literacy, leadership
development, community service, and lifelong learning — all sharing one
mission and, wherever the domain allows, one codebase.
