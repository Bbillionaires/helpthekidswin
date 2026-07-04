import { Navbar } from "@/components/Navbar";
import { FormSection, TextField, TextAreaField } from "@/components/FormSection";

export default function ApplicantProfilePage() {
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

        <FormSection title="Career Profile">
          <TextAreaField label="What are your career goals?" />
          <TextField label="Availability" placeholder="e.g. Weekday evenings, weekends" />
        </FormSection>

        <FormSection title="Personality & Work Style">
          <TextAreaField label="How would you describe your work style?" />
        </FormSection>

        <FormSection title="Skills Inventory">
          <TextField label="Skills" placeholder="Comma-separated, e.g. wiring, Python, CPR" />
        </FormSection>

        <FormSection title="Interests">
          <TextField label="Interests" placeholder="e.g. technology, healthcare, trades" />
        </FormSection>

        <FormSection title="Education & Certifications">
          <TextField label="Current education level" />
          <TextField label="Certifications" placeholder="Comma-separated" />
        </FormSection>

        <FormSection title="Accomplishments">
          <TextAreaField label="Accomplishments you're proud of" />
        </FormSection>

        <FormSection
          title="Availability, Physical Requirements & Transportation"
          description="Some pathways involve physical requirements or reliable transportation. Be honest — this only helps us match you well."
        >
          <TextField label="Physical requirements you can meet" />
          <TextField label="Transportation" placeholder="Own vehicle / public transit / needs assistance" />
        </FormSection>

        <FormSection title="Location">
          <div className="grid grid-cols-3 gap-3">
            <TextField label="City" />
            <TextField label="State" />
            <TextField label="ZIP" />
          </div>
        </FormSection>

        <FormSection title="Resume" description="Optional">
          <input
            type="file"
            className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-hallway-gold file:px-4 file:py-2 file:text-hallway-void"
          />
        </FormSection>

        <button className="w-full rounded-full bg-hallway-gold py-3 font-semibold text-hallway-void transition hover:brightness-110">
          Save Profile
        </button>
      </main>
    </>
  );
}
