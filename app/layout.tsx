import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeadPic.ai — Professional AI Headshots in 60 Seconds",
  description:
    "Transform your selfie into studio-quality professional headshots with AI. Perfect for LinkedIn, resumes, and corporate profiles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
