import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { MOCK_MATCHES, MOCK_APPLICANTS, MOCK_MENTORS, issueCertificate } from "@/data/mock";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || !["MENTOR", "ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "Only a mentor or admin can issue a certificate." }, { status: 403 });
  }

  const body = await request.json();
  const matchId = body?.matchId;
  const match = MOCK_MATCHES.find((m) => m.id === matchId);
  if (!match) {
    return NextResponse.json({ error: "Match not found." }, { status: 404 });
  }

  const applicant = MOCK_APPLICANTS.find((a) => a.id === match.applicantId);
  const mentor = MOCK_MENTORS.find((m) => m.id === match.mentorId);
  const certificate = issueCertificate(match, applicant, mentor);

  return NextResponse.json(certificate);
}
