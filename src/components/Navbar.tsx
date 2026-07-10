import Link from "next/link";
import { auth, signOut } from "@/auth";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/mentors", label: "Mentor Hall" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/policy", label: "Policy & Disclaimer" },
];

function profileHrefFor(role: string): string {
  if (role === "MENTOR") return "/mentor/profile";
  if (role === "ADMIN") return "/admin";
  return "/apply/profile";
}

export async function Navbar() {
  const session = await auth();
  const role = session?.user?.role;

  return (
    <header className="border-b border-white/10 bg-hallway-void/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold">
            {FLAGSHIP_INITIATIVE.name}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-hallway-gold">
            Powered by {PARENT_ORGANIZATION.name}
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80">
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
          {role === "ADMIN" && (
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {session?.user && role ? (
            <>
              <Link
                href={profileHrefFor(role)}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                Profile
              </Link>
              <span className="text-xs text-white/50">
                {session.user.name} · {role}
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
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-hallway-gold/50 px-3 py-1 text-xs text-hallway-gold hover:bg-hallway-gold/10"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
