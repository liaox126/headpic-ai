import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-primary/10 bg-primary">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-white">
            HeadPic<span className="text-gold">.site</span>
          </Link>
          <Link
            href="/blog"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Blog
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-primary/10 bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-primary/40">
          &copy; {new Date().getFullYear()} HeadPic. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
