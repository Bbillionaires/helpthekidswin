import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { FLAGSHIP_INITIATIVE } from "@/lib/organization";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/70">{children}</div>
    </section>
  );
}

export default function PolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-hallway-void px-4 py-8 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-hallway-gold">
            {FLAGSHIP_INITIATIVE.name}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            Policy &amp; Disclaimer
          </h1>
          <p className="mt-4 rounded-lg border border-hallway-gold/30 bg-hallway-gold/10 px-4 py-3 text-sm text-hallway-gold">
            This page is written in plain language so applicants, mentors, and guardians can
            understand it. It is <strong>not legal advice</strong> and has not been reviewed by
            an attorney. Before this platform handles real information from real minors, it
            needs a licensed attorney's review of privacy, minor-protection, and data-security
            obligations for every state and country it operates in.
          </p>

          <Section title="Who this covers">
            <p>
              This platform matches applicants — many of them 16&ndash;18 years old — with adult
              mentors across career pathways. This policy applies to applicants, parents and
              guardians, mentors, and administrators using the site.
            </p>
          </Section>

          <Section title="Minor protection comes first">
            <p>
              No mentor can message or meet an applicant under 18 until every one of these is
              true: a parent or guardian has consented, an administrator has approved the match,
              the mentor's identity has been verified, the mentor's background review has
              cleared, and communication has been explicitly authorized. Any one of these can be
              revoked at any time, which immediately cuts off further contact. This is enforced
              in the platform's code, not just described in writing — see{" "}
              <code className="rounded bg-black/30 px-1 py-0.5 text-xs">
                src/lib/safety/minorProtection.ts
              </code>{" "}
              for anyone who wants to verify that directly.
            </p>
          </Section>

          <Section title="What we collect, and why">
            <p>
              We collect what's needed to build a career profile and make a good mentor match:
              contact info, career interests, and answers to intake questions covering skills,
              goals, availability, and (for some pathways) physical-demand and health/fitness
              questions relevant to that specific career — for example, whether someone can meet
              a physical-fitness standard for firefighting. We do not collect medical records or
              treatment history, and we ask applicants not to submit any.
            </p>
          </Section>

          <Section title="Does HIPAA apply to this platform?">
            <p>
              Almost certainly not, and it's worth explaining why rather than just asserting it.
              HIPAA applies to "covered entities" — health plans, healthcare clearinghouses, and
              healthcare providers who transmit health information electronically for billing or
              treatment — and to their business associates. This platform doesn't provide medical
              treatment, doesn't bill insurance, and isn't a healthcare provider, so it doesn't
              fit the definition of a covered entity even though one of the career pathways is
              healthcare.
            </p>
            <p>
              That doesn't mean health-adjacent answers (like fitness-for-duty questions) are
              unregulated, though. The FTC's Health Breach Notification Rule can apply to apps
              that handle consumer health information outside of HIPAA, and several states treat
              health data as "sensitive personal information" under their own privacy laws
              regardless of HIPAA. Practically, that means: minimize what health-adjacent data we
              ask for, encrypt it, restrict who can see it, and give people a way to have it
              deleted — the same practices HIPAA would require, applied voluntarily rather than
              because a statute demands it.
            </p>
          </Section>

          <Section title="Does COPPA apply, and what about state 'kids code' laws?">
            <p>
              COPPA (the Children's Online Privacy Protection Act) applies to services aimed at,
              or that knowingly collect personal information from, children <em>under 13</em>.
              Since this platform is built for 16&ndash;18 year olds and isn't directed at
              children under 13, COPPA itself doesn't apply — as long as we don't knowingly let
              anyone younger register.
            </p>
            <p>
              That's a narrower answer than "we're compliant with children's privacy law,"
              though. Several states (California, Maryland, and others) have passed or are
              litigating broader "age-appropriate design code" style laws that reach minors up
              to 18, not just under-13s, and most states have separate statutes governing
              background checks and consent requirements for adults who work with minors in
              mentoring, coaching, or volunteer programs. Those state-level minor-protection and
              background-check rules — not COPPA — are the ones most directly relevant to a
              mentor-matching platform like this one, which is why guardian consent and mentor
              background review are hard gates here rather than optional settings.
            </p>
          </Section>

          <Section title="Current state of security — and what still needs to change">
            <p>
              Being direct about where this platform actually stands today: applicant and mentor
              accounts are currently stored in memory with plaintext passwords for demo purposes,
              not in a production database with hashed credentials. That is explicitly called out
              as a known limitation in the project's own architecture notes, and it is not
              acceptable for handling real information from real minors. Before onboarding real
              users, this needs: a real database, hashed and salted passwords (or a real
              identity provider), encrypted data at rest and in transit, audit logs of who
              accessed a minor's information and when, and a written incident-response process.
            </p>
          </Section>

          <Section title="About Vanta and compliance tooling">
            <p>
              One correction worth stating plainly: Vanta is not a free product. It's a paid
              compliance-automation platform (continuous monitoring toward SOC 2, HIPAA, ISO
              27001, and similar frameworks), typically sold on an annual contract. Since HIPAA
              doesn't apply here and this project doesn't yet need to prove SOC 2 compliance to
              an enterprise customer, paying for Vanta right now wouldn't buy much — the actual
              risk here is the plaintext-password, in-memory data store described above, and no
              compliance-automation subscription fixes that; only the engineering work does.
            </p>
            <p>
              Free resources that are a better fit at this stage: the OWASP Top 10 and
              Application Security Verification Standard (self-service security checklists),
              NIST's Privacy Framework, CISA's free "Cyber Essentials" toolkit for small
              organizations, and each state's guidance on background-check requirements for
              youth-serving programs. If this platform later needs to formally prove compliance
              to a school district, funder, or enterprise partner, a paid tool like Vanta,
              Drata, or Secureframe becomes worth evaluating — budgeted for as a real line item,
              not assumed to be free.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Applicants, guardians, and mentors can ask us what information we have, ask us to
              correct it, or ask us to delete it, by reaching out through the{" "}
              <Link href="/contact" className="text-hallway-gold hover:underline">
                Contact page
              </Link>
              . Guardians of an applicant under 18 can revoke consent for mentor communication at
              any time, which immediately cuts off further contact per the minor-protection gate
              described above.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              This is a living document for a platform still under active development. We'll
              update it as real data-handling, legal review, and infrastructure work replaces the
              current preview/demo setup, and we'll note material changes here.
            </p>
          </Section>

          <Link
            href="/"
            className="mt-10 inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to the Hall of Opportunity
          </Link>
        </div>
      </main>
    </>
  );
}
