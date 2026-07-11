import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findDemoUser } from "@/lib/auth/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  // Auth.js only auto-trusts the request host in production on platforms
  // it can detect itself (e.g. Vercel, via its own env vars) or when
  // AUTH_URL/NEXTAUTH_URL is set — neither of which this project
  // configures. Without this, every sign-in/session request in
  // production throws "UntrustedHost" and silently fails: no session
  // cookie ever gets set, so `auth()` returns null everywhere, which
  // looks like broken navigation/gating throughout the app even though
  // nothing else is wrong. Safe here because this app isn't multi-tenant
  // and doesn't do host-based routing.
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        const user = findDemoUser(email, password);
        if (!user) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.role) session.user.role = token.role;
        if (token.id) session.user.id = token.id;
      }
      return session;
    },
  },
});
