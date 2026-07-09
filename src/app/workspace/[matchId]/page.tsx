import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { auth } from "@/auth";
import { MOCK_MATCHES, MOCK_APPLICANTS, MOCK_MENTORS, getCertificatesForMatch } from "@/data/mock";
import { getPathway } from "@/lib/pathways";
import { WorkspaceTabs } from "./WorkspaceTabs";

export default async function WorkspacePage({ params }: { params: { matchId: string } }) {
  const match = MOCK_MATCHES.find((m) => m.id === params.matchId);
  if (!match) notFound();

  const applicant = MOCK_APPLICANTS.find((a) => a.id === match.applicantId);
  const mentor = MOCK_MENTORS.find((m) => m.id === match.mentorId);
  const pathway = getPathway(match.pathwaySlug);
  const certificates = getCertificatesForMatch(match.id);
  const session = await auth();
  const canIssueCertificate = session?.user?.role === "MENTOR" || session?.user?.role === "ADMIN";

  return (
    <>
      <Navbar />
      <WorkspaceTabs
        match={match}
        applicant={applicant}
        mentor={mentor}
        pathway={pathway}
        certificates={certificates}
        canIssueCertificate={canIssueCertificate}
      />
    </>
  );
}
