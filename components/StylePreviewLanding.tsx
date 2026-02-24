import { styles } from "@/lib/styles";
import { Briefcase, Shirt, Palette, Rocket, Crown } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  corporate: <Briefcase className="h-8 w-8" />,
  "business-casual": <Shirt className="h-8 w-8" />,
  creative: <Palette className="h-8 w-8" />,
  startup: <Rocket className="h-8 w-8" />,
  formal: <Crown className="h-8 w-8" />,
};

export default function StylePreviewLanding() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          5 Professional <span className="text-gold">Styles</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-primary/60">
          Choose from curated styles designed for different professional
          contexts
        </p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {styles.map((style) => (
            <div
              key={style.id}
              className="flex flex-col items-center gap-4 rounded-xl border-2 border-primary/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                {icons[style.id]}
              </div>
              <div className="text-center">
                <p className="font-semibold text-primary">{style.name}</p>
                <p className="mt-1 text-xs text-primary/50">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
