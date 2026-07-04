import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-hallway-void px-6 text-center">
      <h1 className="font-display text-3xl font-bold text-white">Access Restricted</h1>
      <p className="max-w-md text-white/60">
        Your account doesn&apos;t have permission to view that page. If you think this is a
        mistake, contact an administrator.
      </p>
      <Link
        href="/"
        className="rounded-full border border-white/30 px-6 py-2 font-semibold text-white transition hover:bg-white/10"
      >
        Back to Home
      </Link>
    </main>
  );
}
