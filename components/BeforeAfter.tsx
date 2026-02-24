import { User, Camera } from "lucide-react";

export default function BeforeAfter() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          See the <span className="text-gold">Transformation</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-primary/60">
          From a casual selfie to a polished professional headshot — powered by AI
        </p>

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
          {/* Before */}
          <div className="w-full max-w-xs">
            <div className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-primary/50">
              Before
            </div>
            <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5">
              <div className="text-center">
                <User className="mx-auto mb-2 h-16 w-16 text-primary/30" />
                <p className="text-sm text-primary/40">Your Selfie</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold text-white">
            <span className="text-2xl font-bold">→</span>
          </div>

          {/* After */}
          <div className="w-full max-w-xs">
            <div className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-primary/50">
              After
            </div>
            <div className="flex aspect-square items-center justify-center rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-primary/5 to-gold/10">
              <div className="text-center">
                <Camera className="mx-auto mb-2 h-16 w-16 text-gold" />
                <p className="text-sm text-gold">AI Headshot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
