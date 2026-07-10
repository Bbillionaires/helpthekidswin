import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { registerUser } from "@/lib/auth/users";
import { createMentorProfile } from "@/data/mock";
import { PATHWAYS } from "@/lib/pathways";
import { FLAGSHIP_INITIATIVE } from "@/lib/organization";

export default function MentorSignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  async function register(formData: FormData) {
    "use server";
    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";
    const employer = (formData.get("employer") as string) || undefined;
    const biography = (formData.get("biography") as string) ?? "";
    const experienceYears = Number(formData.get("experienceYears") ?? 0) || 0;
    const careerSpecialties = formData.getAll("careerSpecialties") as string[];

    if (careerSpecialties.length === 0) {
      const params = new URLSearchParams({ error: "Choose at least one career specialty." });
      redirect(`/mentor/signup?${params.toString()}`);
    }

    const result = registerUser({ name, email, password, role: "MENTOR" });
    if ("error" in result) {
      const params = new URLSearchParams({ error: result.error });
      redirect(`/mentor/signup?${params.toString()}`);
    }

    createMentorProfile({
      userId: result.id,
      displayName: result.name,
      biography,
      careerSpecialties,
      experienceYears,
      employer,
    });

    try {
      await signIn("credentials", { email, password, redirectTo: "/mentors" });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect(`/login?callbackUrl=${encodeURIComponent("/mentors")}`);
      }
      throw error;
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-hallway-void px-6 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="mb-1 text-xs uppercase tracking-widest text-hallway-gold">
            {FLAGSHIP_INITIATIVE.name}
          </p>
          <h1 className="mb-2 font-display text-2xl font-semibold text-white">
            Become a Mentor
          </h1>
          <p className="mb-6 text-sm text-white/60">
            Share your career path with the next generation. All mentor accounts go through
            identity and background review before they're matched with an applicant — see the{" "}
            <Link href="/policy" className="text-hallway-gold hover:underline">
              Policy &amp; Disclaimer
            </Link>{" "}
            page for details on how we protect minors on this platform.
          </p>

          {searchParams.error && (
            <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {searchParams.error}
            </p>
          )}

          <form action={register} className="space-y-4">
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
                Employer <span className="text-white/40">(optional)</span>
              </span>
              <input
                name="employer"
                type="text"
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">
                Years of experience
              </span>
              <input
                name="experienceYears"
                type="number"
                min={0}
                max={60}
                required
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">
                Short biography
              </span>
              <textarea
                name="biography"
                rows={3}
                required
                placeholder="Tell applicants a bit about your career and what you'd love to mentor on."
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              />
            </label>
            <fieldset className="block">
              <span className="mb-2 block text-sm font-medium text-white/80">
                Career specialties <span className="text-white/40">(choose at least one)</span>
              </span>
              <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-white/10 bg-hallway-void/40 p-3 sm:grid-cols-2">
                {PATHWAYS.map((pathway) => (
                  <label key={pathway.slug} className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      name="careerSpecialties"
                      value={pathway.name}
                      className="h-4 w-4 rounded border-white/30 bg-hallway-void/60 text-hallway-gold focus:ring-hallway-gold"
                    />
                    {pathway.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full rounded-full bg-hallway-gold py-2.5 font-semibold text-hallway-void transition hover:brightness-110"
            >
              Create My Mentor Profile
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            Already a mentor?{" "}
            <Link href="/login" className="text-hallway-gold hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
