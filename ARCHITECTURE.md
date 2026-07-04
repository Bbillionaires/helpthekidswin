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

`/hall-of-opportunity` (`src/app/hall-of-opportunity/page.tsx`) renders the
AI guide's welcome script, then a grid of `DoorCard` components driven
entirely by `PATHWAYS` (`src/lib/pathways.ts`). Each pathway carries its own
gradient, glow color, icon, and atmosphere copy so doors are visually
distinct without per-door components. The current implementation uses CSS
gradients + Framer Motion; the `musicMood` field is a hook for adding real
per-pathway audio later without touching layout code.

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

## 7. Known scaffolding gaps (intentional, documented here rather than hidden)

- **Auth**: no session/auth provider is wired up yet. Add one (Auth.js,
  Clerk, etc.) mapped to the `User.role` enum; every `/admin`, `/mentor`,
  and `/workspace` route should be gated by role once it exists.
- **Persistence**: pages currently read `src/data/mock.ts`. Swap in Prisma
  queries once `DATABASE_URL` points at a real Postgres instance; the
  shapes in `src/types/index.ts` already mirror the Prisma models.
- **Intake session**: `sessionStorage` is a placeholder for passing intake
  answers to the recommendation page; move this server-side once auth
  exists so recommendations can be tied to a persisted `ApplicantProfile`.
- **LLM integration**: see §3 — `generatePathwayRecommendations` and the
  AI guide's conversational turns beyond the fixed welcome script are the
  two seams intended for a real model call.

## 8. Long-term vision

Help the World Win is designed to grow into a global opportunity platform:
career discovery, workforce development, apprenticeships, mentorship,
scholarships, entrepreneurship, military preparation, skilled trades,
healthcare careers, technology careers, financial literacy, leadership
development, community service, and lifelong learning — all sharing one
mission and, wherever the domain allows, one codebase.
