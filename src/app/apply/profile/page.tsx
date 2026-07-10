import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { FormSection, TextField, TextAreaField } from "@/components/FormSection";
import { getApplicantByUserId, updateApplicantProfile } from "@/data/mock";

export default async function ApplicantProfilePage({
  searchParams,
}: {
  searchParams: { saved?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/apply/profile");

  const applicant = getApplicantByUserId(session.user.id);

  async function saveProfile(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/login?callbackUrl=/apply/profile");

    const splitList = (value: FormDataEntryValue | null) =>
      (value as string | null)
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) ?? [];

    updateApplicantProfile(session.user.id, {
      careerProfile: {
        goals: (formData.get("goals") as string) ?? "",
        interests: splitList(formData.get("interests")),
        availability: (formData.get("availability") as string) ?? "",
      },
      personality: {
        workStyle: (formData.get("workStyle") as string) ?? "",
      },
      skills: splitList(formData.get("skills")),
      education: (formData.get("education") as string) ?? "",
      certifications: splitList(formData.get("certifications")),
      accomplishments: splitList(formData.get("accomplishments")),
      physicalRequirementsAck: Boolean(formData.get("physicalRequirements")),
      transportation:
        (formData.get("transportation") as
          | "own-vehicle"
          | "public-transit"
          | "needs-assistance"
          | "not-applicable"
          | null) ?? "not-applicable",
      location: {
        city: (formData.get("city") as string) ?? "",
        state: (formData.get("state") as string) ?? "",
        zip: (formData.get("zip") as string) ?? "",
      },
    });

    redirect("/apply/profile?saved=1");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Applicant Profile
          </h1>
          <p className="mt-1 text-white/60">
            The more we know, the better your pathway recommendations and mentor matches
            will be.
          </p>
        </div>

        {!applicant && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            We couldn't find an applicant profile for your account yet — enter a pathway room
            once and it'll be created automatically.
          </p>
        )}

        {searchParams.saved && (
          <p className="rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 px-4 py-2 text-sm text-hallway-gold">
            Profile saved.
          </p>
        )}

        <form action={saveProfile} className="space-y-6">
          <FormSection title="Career Profile">
            <TextAreaField
              label="What are your career goals?"
              name="goals"
              defaultValue={applicant?.careerProfile.goals}
            />
            <TextField
              label="Availability"
              name="availability"
              placeholder="e.g. Weekday evenings, weekends"
              defaultValue={applicant?.careerProfile.availability}
            />
          </FormSection>

          <FormSection title="Personality & Work Style">
            <TextAreaField
              label="How would you describe your work style?"
              name="workStyle"
              defaultValue={applicant?.personality.workStyle}
            />
          </FormSection>

          <FormSection title="Skills Inventory">
            <TextField
              label="Skills"
              name="skills"
              placeholder="Comma-separated, e.g. wiring, Python, CPR"
              defaultValue={applicant?.skills.join(", ")}
            />
          </FormSection>

          <FormSection title="Interests">
            <TextField
              label="Interests"
              name="interests"
              placeholder="e.g. technology, healthcare, trades"
              defaultValue={applicant?.careerProfile.interests.join(", ")}
            />
          </FormSection>

          <FormSection title="Education & Certifications">
            <TextField label="Current education level" name="education" defaultValue={applicant?.education} />
            <TextField
              label="Certifications"
              name="certifications"
              placeholder="Comma-separated"
              defaultValue={applicant?.certifications.join(", ")}
            />
          </FormSection>

          <FormSection title="Accomplishments">
            <TextAreaField
              label="Accomplishments you're proud of"
              name="accomplishments"
              defaultValue={applicant?.accomplishments.join(", ")}
            />
          </FormSection>

          <FormSection
            title="Availability, Physical Requirements & Transportation"
            description="Some pathways involve physical requirements or reliable transportation. Be honest — this only helps us match you well."
          >
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                name="physicalRequirements"
                defaultChecked={applicant?.physicalRequirementsAck}
                className="h-4 w-4 rounded border-white/30 bg-hallway-void/60 text-hallway-gold focus:ring-hallway-gold"
              />
              I can meet the physical requirements of the pathways I'm interested in
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-white/80">Transportation</span>
              <select
                name="transportation"
                defaultValue={applicant?.transportation ?? "not-applicable"}
                className="w-full rounded-lg border border-white/15 bg-hallway-void/60 px-3 py-2 text-white focus:border-hallway-gold focus:outline-none"
              >
                <option value="own-vehicle">Own vehicle</option>
                <option value="public-transit">Public transit</option>
                <option value="needs-assistance">Needs assistance</option>
                <option value="not-applicable">Not applicable</option>
              </select>
            </label>
          </FormSection>

          <FormSection title="Location">
            <div className="grid grid-cols-3 gap-3">
              <TextField label="City" name="city" defaultValue={applicant?.location.city} />
              <TextField label="State" name="state" defaultValue={applicant?.location.state} />
              <TextField label="ZIP" name="zip" defaultValue={applicant?.location.zip} />
            </div>
          </FormSection>

          <button
            type="submit"
            className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110"
          >
            Save Profile
          </button>
        </form>
      </main>
    </>
  );
}
