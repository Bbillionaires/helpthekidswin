import Link from "next/link";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export function Navbar() {
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
          <Link href="/hall-of-opportunity" className="hover:text-white">
            Hall of Opportunity
          </Link>
          <Link href="/mentor/profile" className="hover:text-white">
            Mentors
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
