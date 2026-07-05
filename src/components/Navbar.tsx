import Link from "next/link";
import { auth, signOut } from "@/auth";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-white/10 bg-hallway-void/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold">
            {FLAGSHIP_INITIATIVE.name}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-hallway-gold">
            Powered by {PARENT_ORGANIZATION.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          <Link href="/mentor/profile" className="hover:text-white">
            Mentors
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50">
                {session.user.name} · {session.user.role}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="rounded-full border border-white/20 px-3 py-1 text-xs hover:bg-white/10">
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-hallway-gold/50 px-3 py-1 text-xs text-hallway-gold hover:bg-hallway-gold/10"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
