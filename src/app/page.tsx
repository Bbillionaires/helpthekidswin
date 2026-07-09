import { auth } from "@/auth";
import { HomeExperience } from "./HomeExperience";

export default async function HomePage() {
  const session = await auth();
  return <HomeExperience isAuthenticated={!!session?.user} />;
}
