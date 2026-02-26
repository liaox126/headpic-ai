"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Marketing Director",
    quote:
      "I updated my LinkedIn headshot with HeadPic and started getting 3x more recruiter messages within a week. The corporate style looks like I spent $300 at a studio.",
    color: "bg-rose-500",
  },
  {
    name: "James K.",
    role: "Software Engineer",
    quote:
      "Needed a professional photo for a conference badge last minute. Uploaded a selfie, picked the startup style, and had a great headshot in under a minute. Lifesaver.",
    color: "bg-blue-500",
  },
  {
    name: "Emily R.",
    role: "Real Estate Agent",
    quote:
      "I use HeadPic headshots on all my listing cards and yard signs. My clients always comment on how professional they look. Way easier than booking a photographer every season.",
    color: "bg-emerald-500",
  },
  {
    name: "David L.",
    role: "MBA Student",
    quote:
      "As a grad student, I couldn't afford a professional photoshoot. HeadPic gave me a polished headshot for my resume and job applications at a fraction of the cost.",
    color: "bg-violet-500",
  },
  {
    name: "Lisa W.",
    role: "Freelance Designer",
    quote:
      "The creative style headshot fits my portfolio perfectly. It has that artistic vibe without looking overdone. I've recommended it to several designer friends already.",
    color: "bg-amber-500",
  },
  {
    name: "Michael C.",
    role: "Sales Executive",
    quote:
      "We used HeadPic to get consistent headshots for our entire sales team of 12. Everyone looks professional and on-brand. Saved us thousands compared to a group photoshoot.",
    color: "bg-cyan-500",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-gold text-gold"
        />
      ))}
    </div>
  );
}

function Initials({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color} text-sm font-bold text-white`}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          Loved by <span className="text-gold">Professionals</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-white/50">
          Join thousands who upgraded their professional image with AI headshots.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <Stars />
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Initials name={t.name} color={t.color} />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
