import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Why Your LinkedIn Headshot Matters More Than You Think (Data Inside) — HeadPic",
  description:
    "LinkedIn profiles with professional headshots get 14x more views. See the data and learn how to get a great headshot without spending $300.",
  openGraph: {
    title:
      "Why Your LinkedIn Headshot Matters More Than You Think (Data Inside)",
    description:
      "LinkedIn profiles with professional headshots get 14x more views. See the data and learn how to get a great headshot without spending $300.",
  },
};

export default function WhyHeadshotMatters() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3 text-sm text-primary/40">
          <span>Feb 23, 2026</span>
          <span>·</span>
          <span>6 min read</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-primary">
          Why Your LinkedIn Headshot Matters More Than You Think (Data Inside)
        </h1>
        <p className="text-lg text-primary/60">
          You&apos;ve spent hours on your resume. Your LinkedIn summary is
          perfect. But your profile photo is a cropped group shot from 2019.
        </p>
      </div>

      <div className="prose prose-lg prose-primary max-w-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-primary [&_p]:mb-4 [&_p]:text-primary/80 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-2 [&_li]:text-primary/80 [&_strong]:text-primary">
        <p>
          Let&apos;s talk about the elephant in the LinkedIn room: your profile
          photo might be costing you opportunities. Not because you&apos;re not
          photogenic — but because first impressions are formed in{" "}
          <strong>100 milliseconds</strong>, and your headshot is the first
          thing people see.
        </p>

        <h2>The Numbers Don&apos;t Lie</h2>
        <p>LinkedIn&apos;s own data tells a clear story:</p>
        <ul className="list-disc pl-6">
          <li>
            Profiles with photos receive{" "}
            <strong>14x more views</strong> than those without
          </li>
          <li>
            A professional headshot gets{" "}
            <strong>36x more messages</strong> from recruiters
          </li>
          <li>
            Profiles with professional-quality photos are perceived as{" "}
            <strong>more competent, likeable, and influential</strong>
          </li>
          <li>
            <strong>65%</strong> of hiring managers say a poor profile photo
            negatively affects their perception of a candidate
          </li>
        </ul>
        <p>
          That last stat should wake you up. Two-thirds of the people deciding
          whether to interview you are judging your photo before they read a
          single word on your profile.
        </p>

        <h2>What Makes a &quot;Professional&quot; Headshot?</h2>
        <p>
          It&apos;s not about being attractive. Research from{" "}
          <strong>PhotoFeeler</strong> (which analyzed millions of profile photo
          ratings) found that these factors matter most:
        </p>

        <h3>1. Lighting</h3>
        <p>
          Photos with soft, even lighting are rated 76% more competent than
          those with harsh shadows. Studio lighting or natural window light
          both work.
        </p>

        <h3>2. Background</h3>
        <p>
          Clean, uncluttered backgrounds win. A solid neutral background
          increases &quot;likeability&quot; scores by 41% compared to busy
          environments.
        </p>

        <h3>3. Expression</h3>
        <p>
          A genuine smile with teeth showing actually scores highest on both
          competence AND likeability. The &quot;serious executive face&quot;
          scores well on competence but tanks on approachability.
        </p>

        <h3>4. Attire</h3>
        <p>
          Dress one level above your industry standard. Tech? A nice polo or
          blazer. Finance? Suit and tie. Creative? Something stylish but
          polished. The key: look intentional, not overdressed.
        </p>

        <h2>The Cost Problem</h2>
        <p>
          A professional headshot session typically costs $200–500. In major
          cities, easily $500+. That includes:
        </p>
        <ul className="list-disc pl-6">
          <li>Photographer&apos;s time (30–60 minutes)</li>
          <li>Studio rental</li>
          <li>Post-processing / retouching</li>
          <li>2–5 final edited images</li>
        </ul>
        <p>
          For a CEO or a partner at a law firm, $500 is nothing. For a job
          seeker, a college grad, or a freelancer building their brand? It&apos;s
          a real barrier.
        </p>
        <p>
          This is exactly why AI headshot generators have exploded in
          popularity. The technology has reached a point where a $10–30 AI
          headshot is genuinely competitive with a $300 studio session — at
          least for LinkedIn and professional profile purposes.
        </p>

        <h2>When AI Headshots Work (And When They Don&apos;t)</h2>
        <p>
          <strong>AI headshots are great for:</strong>
        </p>
        <ul className="list-disc pl-6">
          <li>LinkedIn profiles</li>
          <li>Company &quot;About Us&quot; pages</li>
          <li>Conference badges and speaker bios</li>
          <li>Resume photos (common in Europe and Asia)</li>
          <li>Social media profiles</li>
          <li>Email signatures</li>
        </ul>
        <p>
          <strong>You might still want a photographer for:</strong>
        </p>
        <ul className="list-disc pl-6">
          <li>Magazine features or press kits</li>
          <li>Billboard or large-format printing</li>
          <li>Personal branding photoshoots (full body, multiple locations)</li>
          <li>Situations where &quot;authenticity&quot; is critical (e.g., running for office)</li>
        </ul>

        <h2>The ROI of a Good Headshot</h2>
        <p>Let&apos;s do some quick math:</p>
        <ul className="list-none pl-0">
          <li>
            💼 Average salary increase from a job switch:{" "}
            <strong>$15,000–25,000/year</strong>
          </li>
          <li>
            📈 More recruiter messages → more interviews → faster job search
          </li>
          <li>
            🤝 Better first impression → more connections → more opportunities
          </li>
          <li>
            💰 Cost of an AI headshot: <strong>$9.90</strong>
          </li>
        </ul>
        <p>
          Even if a better headshot only speeds up your job search by a single
          week, the ROI is absurd. You&apos;re not spending $10 on a photo —
          you&apos;re investing $10 in being taken seriously.
        </p>

        <h2>5 Common Headshot Mistakes</h2>
        <p>
          While we&apos;re here, stop doing these:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>The vacation crop</strong> — A cropped beach photo where
            you can still see someone&apos;s arm around you
          </li>
          <li>
            <strong>The 10-year-old photo</strong> — You should be recognizable
            when you walk into the interview
          </li>
          <li>
            <strong>The car selfie</strong> — Seatbelt lighting is not studio
            lighting
          </li>
          <li>
            <strong>The filter overload</strong> — If your skin looks smoother
            than porcelain, nobody believes it
          </li>
          <li>
            <strong>No photo at all</strong> — A blank silhouette says
            &quot;I&apos;m hiding something&quot; (fair or not)
          </li>
        </ul>

        <h2>Take Action Today</h2>
        <p>
          Your headshot is the lowest-hanging fruit in professional branding.
          It takes 60 seconds to generate one with AI, costs less than lunch,
          and the data clearly shows it impacts how people perceive you.
        </p>
        <p>
          Don&apos;t overthink it. Take a decent selfie (facing the light, eye
          level, neutral background), run it through an AI headshot tool, and
          update your LinkedIn. You&apos;ll wonder why you didn&apos;t do it
          sooner.
        </p>

        <div className="mt-12 rounded-2xl bg-primary/5 p-8 text-center">
          <h3 className="mb-2">Get your professional headshot now</h3>
          <p className="mb-4">
            60 seconds. Free to preview. No photographer needed.
          </p>
          <Link
            href="/generate"
            className="inline-block rounded-lg bg-gold px-8 py-3 font-semibold text-white transition-colors hover:bg-gold-light"
          >
            Try HeadPic Free →
          </Link>
        </div>
      </div>
    </article>
  );
}
