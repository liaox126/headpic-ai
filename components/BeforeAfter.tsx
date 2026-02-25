import Image from "next/image";

const comparisons = [
  {
    before: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      alt: "Casual male selfie",
    },
    after: {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      alt: "Professional male headshot",
    },
  },
  {
    before: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
      alt: "Casual female selfie",
    },
    after: {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      alt: "Professional female headshot",
    },
  },
];

export default function BeforeAfter() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          See the <span className="text-gold">Transformation</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-primary/60">
          From a casual selfie to a polished professional headshot — powered by
          AI
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          {comparisons.map((pair, i) => (
            <div key={i} className="flex items-center justify-center gap-4">
              {/* Before */}
              <div className="w-full max-w-[180px]">
                <div className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-primary/40">
                  Before
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-dashed border-primary/20">
                  <Image
                    src={pair.before.src}
                    alt={pair.before.alt}
                    fill
                    className="object-cover"
                    sizes="180px"
                    unoptimized
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white">
                <span className="text-lg font-bold">→</span>
              </div>

              {/* After */}
              <div className="w-full max-w-[180px]">
                <div className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-primary/40">
                  After
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gold/30 shadow-lg shadow-gold/10">
                  <Image
                    src={pair.after.src}
                    alt={pair.after.alt}
                    fill
                    className="object-cover"
                    sizes="180px"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-primary/30">
          Demo images shown. Results vary based on input photo quality.
        </p>
      </div>
    </section>
  );
}
