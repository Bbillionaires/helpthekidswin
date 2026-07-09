import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/auth";
import { registerUser } from "@/lib/auth/users";
import { createApplicantProfile } from "@/data/mock";
import { FLAGSHIP_INITIATIVE } from "@/lib/organization";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  const callbackUrl = searchParams.callbackUrl || "/?entered=1";

  async function register(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const dateOfBirth = (formData.get("dateOfBirth") as string) || undefined;
    const redirectTo = (formData.get("callbackUrl") as string) || "/?entered=1";

    const result = registerUser({ name, email, password, dateOfBirth });
    if ("error" in result) {
      const params = new URLSearchParams({ error: result.error, callbackUrl: redirectTo });
      redirect(`/register?${params.toString()}`);
    }

    createApplicantProfile({ userId: result.id, displayName: result.name, dateOfBirth });

    try {
      await signIn("credentials", { email, password, redirectTo });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect(`/login?callbackUrl=${encodeURIComponent(redirectTo)}`);
      }
      throw error;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-hallway-void px-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="mb-1 text-xs uppercase tracking-widest text-hallway-gold">
          {FLAGSHIP_INITIATIVE.name}
        </p>
        <h1 className="mb-2 font-display text-2xl font-semibold text-white">
          Register to Enter
        </h1>
        <p className="mb-6 text-sm text-white/60">
          Before you step inside the Hall of Opportunity, create your profile — it's how
          mentors and administrators can follow your progress, and how your certificate
          finds its way to you.
        </p>

        {searchParams.error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {searchParams.error}
          </p>
        )}

        <form action={register} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">Full name</span>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">Email</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">Password</span>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-white/80">
              Date of birth <span className="text-white/40">(optional)</span>
            </span>
            <input
              name="dateOfBirth"
              type="date"
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-hallway-gold py-2.5 font-semibold text-hallway-void transition hover:brightness-110"
          >
            Create My Profile &amp; Enter
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Already registered?{" "}
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="text-hallway-gold hover:underline"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </main>
  );
}
