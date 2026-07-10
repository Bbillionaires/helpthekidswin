import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar";
import { FormSection, TextField, TextAreaField } from "@/components/FormSection";
import { getMentorByUserId, updateMentorProfile, submitMentorForVerification } from "@/data/mock";

export default async function MentorProfilePage({
  searchParams,
}: {
  searchParams: { saved?: string; submitted?: string };
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/mentor/profile");

  const mentor = getMentorByUserId(session.user.id);

  async function saveProfile(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/login?callbackUrl=/mentor/profile");

    const splitList = (value: FormDataEntryValue | null) =>
      (value as string | null)
        ?.split(",")
        .map((item) => item.trim())
        .filter(Boolean) ?? [];

    updateMentorProfile(session.user.id, {
      biography: (formData.get("biography") as string) ?? "",
      experienceYears: Number(formData.get("experienceYears") ?? 0) || 0,
      certifications: splitList(formData.get("certifications")),
      careerSpecialties: splitList(formData.get("careerSpecialties")),
      teachingSpecialties: splitList(formData.get("teachingSpecialties")),
      availability: (formData.get("availability") as string) ?? "",
      maxApprentices: Number(formData.get("maxApprentices") ?? 1) || 1,
      employer: (formData.get("employer") as string) || undefined,
      accomplishments: splitList(formData.get("accomplishments")),
    });

    redirect("/mentor/profile?saved=1");
  }

  async function submitForVerification() {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/login?callbackUrl=/mentor/profile");

    submitMentorForVerification(session.user.id);
    redirect("/mentor/profile?submitted=1");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Mentor Profile</h1>
          <p className="mt-1 text-white/60">
            Tell us about your experience so we can match you with the right apprentices.
          </p>
        </div>

        {!mentor && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
            We couldn't find a mentor profile for your account — sign up through the Mentor
            Hall first.
          </p>
        )}

        {searchParams.saved && (
          <p className="rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 px-4 py-2 text-sm text-hallway-gold">
            Profile saved.
          </p>
        )}
        {searchParams.submitted && (
          <p className="rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 px-4 py-2 text-sm text-hallway-gold">
            Submitted for verification.
          </p>
        )}

        <form action={saveProfile} className="space-y-6">
          <FormSection title="Biography">
            <TextAreaField
              label="Biography"
              name="biography"
              placeholder="Your story and why you mentor"
              defaultValue={mentor?.biography}
            />
          </FormSection>

          <FormSection title="Experience & Certifications">
            <TextField
              label="Years of experience"
              name="experienceYears"
              type="number"
              defaultValue={mentor?.experienceYears}
            />
            <TextField
              label="Certifications"
              name="certifications"
              placeholder="Comma-separated"
              defaultValue={mentor?.certifications.join(", ")}
            />
          </FormSection>

          <FormSection title="Specialties">
            <TextField
              label="Career specialties"
              name="careerSpecialties"
              placeholder="e.g. Cybersecurity, Healthcare"
              defaultValue={mentor?.careerSpecialties.join(", ")}
            />
            <TextField
              label="Teaching specialties"
              name="teachingSpecialties"
              placeholder="e.g. Hands-on demonstration"
              defaultValue={mentor?.teachingSpecialties.join(", ")}
            />
          </FormSection>

          <FormSection title="Availability & Capacity">
            <TextField
              label="Availability"
              name="availability"
              placeholder="e.g. Weekday evenings"
              defaultValue={mentor?.availability}
            />
            <TextField
              label="Maximum apprentices"
              name="maxApprentices"
              type="number"
              defaultValue={mentor?.maxApprentices}
            />
          </FormSection>

          <FormSection title="Employer & Accomplishments">
            <TextField label="Current employer" name="employer" defaultValue={mentor?.employer} />
            <TextAreaField
              label="Professional accomplishments"
              name="accomplishments"
              defaultValue={mentor?.accomplishments.join(", ")}
            />
          </FormSection>

          <button
            type="submit"
            className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110"
          >
            Save Profile
          </button>
        </form>

        <div className="rounded-xl border border-hallway-gold/30 bg-hallway-gold/10 p-4 text-sm text-hallway-gold">
          Mentors must complete identity verification, credential verification, and a
          background review before communicating with any applicant under 18.
          {mentor && (
            <p className="mt-2 text-hallway-gold/80">
              Current status: {mentor.verification.backgroundReviewStatus.replace("-", " ")}
            </p>
          )}
        </div>

        <form action={submitForVerification}>
          <button
            type="submit"
            disabled={!mentor || mentor.verification.backgroundReviewStatus !== "not-started"}
            className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit for Verification
          </button>
        </form>
      </main>
    </>
  );
}
