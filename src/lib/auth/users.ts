/**
 * Demo credential store for local development and preview environments.
 *
 * There is no persisted `User` table wired up yet (see ARCHITECTURE.md
 * §7), so authentication has nowhere real to check identity against. This
 * fixed list stands in for that table so role-gated routes are provable
 * end-to-end. Replace with a Prisma-backed lookup (hashed passwords, or a
 * real OAuth/SSO provider) before handling any real applicant or mentor
 * data — this is not sufficient for production, and never will be for
 * accounts that can interact with minors.
 */

import type { UserRole } from "@/types";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export const DEMO_USERS: DemoUser[] = [
  { id: "user_admin", email: "admin@demo.helpthekidswin.org", password: "demo-admin", name: "Ava (Admin)", role: "ADMIN" },
  { id: "user_10", email: "mentor@demo.helpthekidswin.org", password: "demo-mentor", name: "Marcus T.", role: "MENTOR" },
  { id: "user_1", email: "applicant@demo.helpthekidswin.org", password: "demo-applicant", name: "Jordan M.", role: "APPLICANT" },
  { id: "user_guardian", email: "guardian@demo.helpthekidswin.org", password: "demo-guardian", name: "Guardian of Jordan M.", role: "GUARDIAN" },
];

export function findDemoUser(email: string, password: string): DemoUser | undefined {
  return DEMO_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );
}
