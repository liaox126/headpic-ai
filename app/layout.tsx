import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeadPic — Professional AI Headshots in 60 Seconds",
  description:
    "Transform your selfie into studio-quality professional headshots with AI. Perfect for LinkedIn, resumes, and corporate profiles.",
  metadataBase: new URL("https://headpic.site"),
  openGraph: {
    title: "HeadPic — Professional AI Headshots in 60 Seconds",
    description:
      "Transform your selfie into studio-quality professional headshots with AI. Perfect for LinkedIn, resumes, and corporate profiles.",
    url: "https://headpic.site",
    siteName: "HeadPic",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HeadPic — AI Professional Headshots",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeadPic — Professional AI Headshots in 60 Seconds",
    description:
      "Transform your selfie into studio-quality professional headshots with AI.",
    images: ["/og-image.png"],
  },
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
