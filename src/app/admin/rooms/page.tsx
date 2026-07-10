import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PATHWAYS } from "@/lib/pathways";
import { getRoomArt } from "@/lib/pathwayRooms";
import { getMentorsForPathway, MOCK_MENTORS } from "@/data/mock";
import { getFrameOverrideValue, isFrameClickable, setFrameClickable, setFrameMentor } from "@/lib/roomFrameSettings";

export default function AdminRoomsPage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const pathwaysWithRooms = PATHWAYS.filter((pathway) => getRoomArt(pathway.slug));

  async function saveFrames(formData: FormData) {
    "use server";
    const slug = formData.get("slug") as string;
    const frameCount = Number(formData.get("frameCount") ?? 0);

    for (let i = 0; i < frameCount; i++) {
      const mentorValue = (formData.get(`mentor_${i}`) as string) || "";
      setFrameMentor(slug, i, mentorValue === "" ? null : mentorValue);
      setFrameClickable(slug, i, formData.get(`clickable_${i}`) === "on");
    }

    redirect("/admin/rooms?saved=1");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Room Frames</h1>
          <p className="mt-1 text-sm text-white/60">
            Assign a specific mentor to a picture frame in any pathway room, or turn a frame off
            entirely. Frames left on "Default" automatically fill with whichever mentors are
            matched to that pathway by career specialty.
          </p>
        </div>

        {searchParams.saved && (
          <p className="rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 px-4 py-2 text-sm text-hallway-gold">
            Saved.
          </p>
        )}

        <div className="space-y-6">
          {pathwaysWithRooms.map((pathway) => {
            const room = getRoomArt(pathway.slug);
            if (!room || room.mentorFrames.length === 0) return null;
            const defaultMentors = getMentorsForPathway(pathway.name);

            return (
              <form
                key={pathway.slug}
                action={saveFrames}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <input type="hidden" name="slug" value={pathway.slug} />
                <input type="hidden" name="frameCount" value={room.mentorFrames.length} />

                <h2 className="font-display text-lg font-semibold text-white">
                  {pathway.icon} {pathway.name}
                </h2>
                <p className="mt-1 text-xs text-white/50">
                  {room.mentorFrames.length} frame(s) · {defaultMentors.length} mentor(s) matched by default
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {room.mentorFrames.map((_, i) => {
                    const overrideValue = getFrameOverrideValue(pathway.slug, i);
                    const clickable = isFrameClickable(pathway.slug, i);
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-hallway-void/40 p-3"
                      >
                        <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-white/40">
                          Frame {i + 1}
                        </span>
                        <select
                          name={`mentor_${i}`}
                          defaultValue={overrideValue ?? ""}
                          className="flex-1 rounded-md border border-white/15 bg-hallway-void/60 px-2 py-1.5 text-sm text-white focus:border-hallway-gold focus:outline-none"
                        >
                          <option value="">
                            Default {defaultMentors[i] ? `(${defaultMentors[i].displayName})` : "(none matched)"}
                          </option>
                          <option value="NONE">No mentor (blank)</option>
                          {MOCK_MENTORS.map((mentor) => (
                            <option key={mentor.id} value={mentor.id}>
                              {mentor.displayName}
                            </option>
                          ))}
                        </select>
                        <label className="flex items-center gap-1.5 text-xs text-white/70">
                          <input
                            type="checkbox"
                            name={`clickable_${i}`}
                            defaultChecked={clickable}
                            className="h-4 w-4 rounded border-white/30 bg-hallway-void/60 text-hallway-gold focus:ring-hallway-gold"
                          />
                          Clickable
                        </label>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className="mt-4 rounded-full bg-hallway-gold px-5 py-2 text-sm font-semibold text-hallway-void transition hover:brightness-110"
                >
                  Save {pathway.name}
                </button>
              </form>
            );
          })}
        </div>
      </main>
    </>
  );
}
