import type { Metadata } from "next";
import "./globals.css";
import { FLAGSHIP_INITIATIVE, PARENT_ORGANIZATION } from "@/lib/organization";

export const metadata: Metadata = {
  title: `${FLAGSHIP_INITIATIVE.name} — ${FLAGSHIP_INITIATIVE.tagline}`,
  description: PARENT_ORGANIZATION.mission,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen bg-hallway-void text-white">
        {children}
      </body>
    </html>
  );
}
