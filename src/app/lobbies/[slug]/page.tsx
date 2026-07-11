import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getLobby } from "@/lib/lobbies";

export default async function LobbyPage({ params }: { params: { slug: string } }) {
  const lobby = getLobby(params.slug);
  if (!lobby) notFound();

  // Same gate as room entry (see ARCHITECTURE.md §2a) — a lobby is still
  // "walking through a door," just one that leads to a chooser first.
  const session = await auth();
  if (!session?.user) {
    redirect(`/register?callbackUrl=${encodeURIComponent(`/lobbies/${lobby.slug}`)}`);
  }

  return (
    <main className="bg-hallway-void px-3 py-6">
      {lobby.image ? (
        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-hallway-gold/30 shadow-2xl">
          <Image
            src={lobby.image}
            alt={`${lobby.name} lobby`}
            width={1536}
            height={1024}
            className="h-auto w-full"
            priority
          />
          {lobby.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group absolute flex items-center justify-center rounded-md transition"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.width}%`,
                height: `${item.height}%`,
              }}
            >
              <span className="absolute inset-0 rounded-md ring-0 ring-hallway-gold/0 transition group-hover:bg-hallway-gold/10 group-hover:ring-2 group-hover:ring-hallway-gold/70" />
              <span className="relative rounded bg-black/70 px-3 py-1.5 text-center font-display text-sm font-bold uppercase tracking-wide text-hallway-gold drop-shadow-[0_0_6px_rgba(0,0,0,0.9)] sm:text-base">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <span className="text-5xl">{lobby.icon}</span>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-hallway-gold">
              {lobby.name}
            </h1>
            <p className="max-w-xl text-white/60">{lobby.atmosphere}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lobby.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-white/15 bg-white/5 px-6 py-8 text-center transition hover:border-hallway-gold/60 hover:bg-hallway-gold/10"
              >
                <span className="font-display text-xl font-bold uppercase tracking-wide text-hallway-gold">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-2 text-center">
        {lobby.image && (
          <>
            <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-hallway-gold">
              {lobby.name}
            </h1>
            <p className="max-w-xl text-sm text-white/60">{lobby.atmosphere}</p>
          </>
        )}
        <Link
          href="/?entered=1"
          className="mt-2 rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Back to the Hallway
        </Link>
      </div>
    </main>
  );
}
