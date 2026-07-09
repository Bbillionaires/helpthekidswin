import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getApplicantByUserId } from "@/data/mock";

const VALID_TRANSPORTATION = ["own-vehicle", "public-transit", "needs-assistance", "not-applicable"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const applicant = getApplicantByUserId(session.user.id);
  if (!applicant) {
    return NextResponse.json({ error: "No applicant profile found for this account." }, { status: 404 });
  }

  const body = await request.json();
  applicant.careerProfile.goals = typeof body.goals === "string" ? body.goals : applicant.careerProfile.goals;
  applicant.careerProfile.availability =
    typeof body.availability === "string" ? body.availability : applicant.careerProfile.availability;
  applicant.location.city = typeof body.city === "string" ? body.city : applicant.location.city;
  applicant.location.state = typeof body.state === "string" ? body.state : applicant.location.state;
  if (VALID_TRANSPORTATION.includes(body.transportation)) {
    applicant.transportation = body.transportation;
  }

  return NextResponse.json({ ok: true });
}
