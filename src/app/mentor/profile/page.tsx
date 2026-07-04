import { Navbar } from "@/components/Navbar";
import { FormSection, TextField, TextAreaField } from "@/components/FormSection";

export default function MentorProfilePage() {
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

        <FormSection title="Biography">
          <TextAreaField label="Biography" placeholder="Your story and why you mentor" />
        </FormSection>

        <FormSection title="Experience & Certifications">
          <TextField label="Years of experience" type="number" />
          <TextField label="Certifications" placeholder="Comma-separated" />
        </FormSection>

        <FormSection title="Specialties">
          <TextField label="Career specialties" placeholder="e.g. Cybersecurity, Healthcare" />
          <TextField label="Teaching specialties" placeholder="e.g. Hands-on demonstration" />
        </FormSection>

        <FormSection title="Availability & Capacity">
          <TextField label="Availability" placeholder="e.g. Weekday evenings" />
          <TextField label="Maximum apprentices" type="number" />
        </FormSection>

        <FormSection title="Employer & Accomplishments">
          <TextField label="Current employer" />
          <TextAreaField label="Professional accomplishments" />
        </FormSection>

        <div className="rounded-xl border border-hallway-gold/30 bg-hallway-gold/10 p-4 text-sm text-hallway-gold">
          Mentors must complete identity verification, credential verification, and a
          background review before communicating with any applicant under 18.
        </div>

        <button className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110">
          Submit for Verification
        </button>
      </main>
    </>
  );
}
