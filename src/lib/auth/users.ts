/**
 * Demo credential store for local development and preview environments.
 *
 * There is no persisted `User` table wired up yet (see ARCHITECTURE.md
 * §7), so authentication has nowhere real to check identity against. This
 * fixed list stands in for that table so role-gated routes are provable
 * end-to-end. `REGISTERED_USERS` extends it in-memory so the /register
 * flow works, but it resets on every server restart / cold start —
 * replace with a Prisma-backed lookup (hashed passwords, or a real
 * OAuth/SSO provider) before handling any real applicant or mentor data —
 * this is not sufficient for production, and never will be for accounts
 * that can interact with minors.
 */

import type { UserRole } from "@/types";

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  dateOfBirth?: string;
}

export const DEMO_USERS: DemoUser[] = [
  { id: "user_admin", email: "admin@demo.helpthekidswin.org", password: "demo-admin", name: "Ava (Admin)", role: "ADMIN" },
  { id: "user_10", email: "mentor@demo.helpthekidswin.org", password: "demo-mentor", name: "Marcus T.", role: "MENTOR" },
  { id: "user_1", email: "applicant@demo.helpthekidswin.org", password: "demo-applicant", name: "Jordan M.", role: "APPLICANT" },
  { id: "user_guardian", email: "guardian@demo.helpthekidswin.org", password: "demo-guardian", name: "Guardian of Jordan M.", role: "GUARDIAN" },
];

// Starts seeded with the demo accounts so they keep working; grows as
// people register. In-memory only — see the file-level note above.
const REGISTERED_USERS: DemoUser[] = [...DEMO_USERS];
let nextUserSeq = 1;

export function findDemoUser(email: string, password: string): DemoUser | undefined {
  return REGISTERED_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );
}

export function findUserByEmail(email: string): DemoUser | undefined {
  return REGISTERED_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): DemoUser | undefined {
  return REGISTERED_USERS.find((user) => user.id === id);
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  dateOfBirth?: string;
  /** Defaults to APPLICANT — the general /register form never exposes this; only the dedicated /mentor/signup flow passes MENTOR. */
  role?: UserRole;
};

export function registerUser(input: RegisterInput): DemoUser | { error: string } {
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = input.password;

  if (!name) return { error: "Enter your name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email." };
  if (!password || password.length < 6) return { error: "Password must be at least 6 characters." };
  if (findUserByEmail(email)) return { error: "An account with that email already exists." };

  const user: DemoUser = {
    id: `user_reg_${nextUserSeq++}`,
    email,
    password,
    name,
    role: input.role ?? "APPLICANT",
    dateOfBirth: input.dateOfBirth || undefined,
  };
  REGISTERED_USERS.push(user);
  return user;
}
