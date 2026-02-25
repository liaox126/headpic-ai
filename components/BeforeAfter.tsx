import Image from "next/image";

const comparisons = [
  {
    before: {
      src: "/samples/male-before.jpg",
      alt: "Casual male photo",
    },
    after: {
      src: "/samples/male-after.jpg",
      alt: "Corporate professional headshot",
    },
    style: "Corporate",
  },
  {
    before: {
      src: "/samples/female-before.jpg",
      alt: "Casual female photo",
    },
    after: {
      src: "/samples/female-after.jpg",
      alt: "Business Casual professional headshot",
    },
    style: "Business Casual",
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
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex shrink-0 flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white">
                  <span className="text-lg font-bold">→</span>
                </div>
                <span className="text-xs font-medium text-gold">{pair.style}</span>
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
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-primary/30">
          Real AI-generated results. Output quality depends on input photo.
        </p>
      </div>
    </section>
  );
}
