import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — HeadPic | AI Headshot Tips & Guides",
  description:
    "Learn how to get the best AI-generated professional headshots. Tips, comparisons, and guides for LinkedIn, resumes, and more.",
};

const posts = [
  {
    slug: "best-ai-headshot-generators",
    title: "7 Best AI Headshot Generators in 2026 (Honest Comparison)",
    excerpt:
      "We tested the top AI headshot tools so you don't have to. Here's how they actually compare on quality, speed, and price.",
    date: "Feb 25, 2026",
    readTime: "8 min read",
  },
  {
    slug: "perfect-selfie-for-ai-headshots",
    title: "How to Take the Perfect Selfie for AI Headshots (5 Simple Rules)",
    excerpt:
      "Your AI headshot is only as good as the photo you upload. Follow these 5 rules to get studio-quality results every time.",
    date: "Feb 24, 2026",
    readTime: "5 min read",
  },
  {
    slug: "why-professional-headshot-matters",
    title: "Why Your LinkedIn Headshot Matters More Than You Think (Data Inside)",
    excerpt:
      "Profiles with professional headshots get 14x more views. Here's the data — and how to get one without spending $300.",
    date: "Feb 23, 2026",
    readTime: "6 min read",
  },
];

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-2 text-4xl font-bold text-primary">Blog</h1>
      <p className="mb-12 text-lg text-primary/60">
        Tips, guides, and insights on AI headshots and professional branding.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-primary/10 p-6 transition-all hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
          >
            <div className="mb-2 flex items-center gap-3 text-sm text-primary/40">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-primary">
              {post.title}
            </h2>
            <p className="text-primary/60">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
