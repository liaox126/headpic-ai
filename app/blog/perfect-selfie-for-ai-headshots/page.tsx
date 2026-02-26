import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How to Take the Perfect Selfie for AI Headshots (5 Simple Rules) — HeadPic",
  description:
    "Your AI headshot quality depends on your input photo. Follow these 5 rules to get the best results from any AI headshot generator.",
  openGraph: {
    title: "How to Take the Perfect Selfie for AI Headshots (5 Simple Rules)",
    description:
      "Your AI headshot quality depends on your input photo. Follow these 5 rules to get the best results from any AI headshot generator.",
  },
};

export default function PerfectSelfie() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3 text-sm text-primary/40">
          <span>Feb 24, 2026</span>
          <span>·</span>
          <span>5 min read</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight text-primary">
          How to Take the Perfect Selfie for AI Headshots (5 Simple Rules)
        </h1>
        <p className="text-lg text-primary/60">
          The #1 factor in AI headshot quality isn&apos;t the tool — it&apos;s
          your input photo.
        </p>
      </div>

      <div className="prose prose-lg prose-primary max-w-none [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-primary [&_p]:mb-4 [&_p]:text-primary/80 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-2 [&_li]:text-primary/80 [&_strong]:text-primary">
        <p>
          We&apos;ve processed thousands of selfies through AI headshot
          generators. The single biggest predictor of output quality? The photo
          you upload. A good selfie produces a great headshot. A bad selfie
          produces an uncanny valley nightmare.
        </p>
        <p>Here are the 5 rules that separate great inputs from bad ones.</p>

        <h2>Rule 1: Face the Light</h2>
        <p>
          This is the single most important factor. Stand facing a window during
          the day, or face any large, diffused light source. The light should
          hit your face evenly — no harsh shadows across one side.
        </p>
        <p>
          <strong>Why it matters for AI:</strong> When half your face is in
          shadow, the AI has to &quot;guess&quot; what those features look like.
          It usually guesses wrong. Even illumination gives the AI clear data to
          work with.
        </p>
        <p>
          <strong>Quick test:</strong> If you can see both your eyes clearly in
          the photo without squinting, you&apos;re good.
        </p>

        <h2>Rule 2: Eye Level, Straight On</h2>
        <p>
          Hold your phone at eye level, directly in front of your face. Not
          above (the MySpace angle), not below (the unflattering nostril shot),
          not dramatically to the side.
        </p>
        <p>
          A slight angle (10-15°) is fine and even adds character. But anything
          beyond 30° off-center means the AI has to reconstruct parts of your
          face it can&apos;t see.
        </p>
        <p>
          <strong>Pro tip:</strong> Use your front camera and hold the phone
          about arm&apos;s length away. If you can see from the top of your head
          to your shoulders, that&apos;s the right framing.
        </p>

        <h2>Rule 3: Clean Background</h2>
        <p>
          The AI will replace the background anyway — but a cluttered background
          can confuse the AI about where &quot;you&quot; end and the environment
          begins. This is especially true near your hair and shoulders.
        </p>
        <p>
          Stand in front of a plain wall if possible. White, gray, even a solid
          color door works. Avoid: busy patterns, other people in frame,
          anything touching or overlapping your head/shoulders.
        </p>

        <h2>Rule 4: No Extreme Expressions</h2>
        <p>
          Your best bet: a natural, relaxed expression. Slight smile or neutral.
          The AI will preserve your expression, so if you&apos;re mid-laugh or
          making a goofy face, that&apos;s what your &quot;professional
          headshot&quot; will show.
        </p>
        <p>
          <strong>The trick:</strong> Say &quot;money&quot; (not
          &quot;cheese&quot;) right before you take the photo. It naturally
          positions your mouth in a subtle, genuine-looking smile.
        </p>

        <h2>Rule 5: High Resolution, Sharp Focus</h2>
        <p>
          This should be obvious but: make sure the photo is in focus and
          high-resolution. Most modern phone cameras are fine. Just make sure:
        </p>
        <ul className="list-disc pl-6">
          <li>The photo isn&apos;t blurry (hold still, or use a timer)</li>
          <li>
            It&apos;s not a heavily filtered Instagram screenshot (AI needs
            your real skin tone and features)
          </li>
          <li>
            It&apos;s not zoomed-in from a group photo (low resolution + pixelation)
          </li>
          <li>The image is at least 500x500 pixels (bigger is better)</li>
        </ul>

        <h2>Bonus: What to Wear</h2>
        <p>
          Since AI headshot tools change your clothing, this matters less than
          you&apos;d think. But wearing something simple helps the AI cleanly
          separate your face from your outfit. Avoid:
        </p>
        <ul className="list-disc pl-6">
          <li>High collars that merge with your chin</li>
          <li>Hats or hoods that partially cover your face</li>
          <li>Sunglasses (the AI needs your eyes!)</li>
          <li>Heavy scarves or turtlenecks pulled up</li>
        </ul>
        <p>
          A regular t-shirt or casual top is perfect. The AI will swap it for a
          suit or blazer anyway.
        </p>

        <h2>The 30-Second Checklist</h2>
        <p>Before you upload, check all five:</p>
        <ul className="list-none pl-0 text-lg">
          <li>✅ Facing the light — even illumination on face</li>
          <li>✅ Eye level — camera straight at your face</li>
          <li>✅ Clean background — minimal clutter</li>
          <li>✅ Natural expression — relaxed, slight smile</li>
          <li>✅ Sharp and clear — in focus, not pixelated</li>
        </ul>
        <p>
          Get all five right and you&apos;ll be amazed at the quality. Miss even
          one and you&apos;ll be wondering why the AI &quot;doesn&apos;t work.&quot;
        </p>

        <div className="mt-12 rounded-2xl bg-primary/5 p-8 text-center">
          <h3 className="mb-2">Ready to test it out?</h3>
          <p className="mb-4">
            Take a quick selfie following these rules, then generate your
            professional headshot in 60 seconds.
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
