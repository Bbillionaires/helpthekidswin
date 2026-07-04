import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { DEMO_USERS } from "@/lib/auth/users";
import { FLAGSHIP_INITIATIVE } from "@/lib/organization";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  async function authenticate(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: (formData.get("callbackUrl") as string) || "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        const params = new URLSearchParams({ error: "CredentialsSignin" });
        const callbackUrl = formData.get("callbackUrl");
        if (callbackUrl) params.set("callbackUrl", callbackUrl as string);
        redirect(`/login?${params.toString()}`);
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
        <h1 className="mb-6 font-display text-2xl font-semibold text-white">Sign In</h1>

        {searchParams.error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            Invalid email or password.
          </p>
        )}

        <form action={authenticate} className="space-y-4">
          <input type="hidden" name="callbackUrl" value={searchParams.callbackUrl ?? "/"} />
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
              className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-hallway-gold py-2.5 font-semibold text-hallway-void transition hover:brightness-110"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-white/50">
          <p className="mb-1 font-semibold text-white/70">Demo accounts (no real backend yet):</p>
          {DEMO_USERS.map((user) => (
            <p key={user.email}>
              {user.role.toLowerCase()}: {user.email} / {user.password}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
