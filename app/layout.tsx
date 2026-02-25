import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeadPic — Professional AI Headshots in 60 Seconds",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CD9WQKQT1P"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CD9WQKQT1P');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
