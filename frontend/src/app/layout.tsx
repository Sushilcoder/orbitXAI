import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrbitXAI — Earth Observation Intelligence",
  description:
    "Agentic Earth observation intelligence for satellite imagery analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}