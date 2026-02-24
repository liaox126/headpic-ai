"use client";

import { cn } from "@/lib/utils";
import { styles, type Style } from "@/lib/styles";
import { Briefcase, Shirt, Palette, Rocket, Crown } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  corporate: <Briefcase className="h-6 w-6" />,
  "business-casual": <Shirt className="h-6 w-6" />,
  creative: <Palette className="h-6 w-6" />,
  startup: <Rocket className="h-6 w-6" />,
  formal: <Crown className="h-6 w-6" />,
};

interface StylePickerProps {
  selected: string[];
  onToggle: (id: string) => void;
  showAsPreview?: boolean;
}

export default function StylePicker({
  selected,
  onToggle,
  showAsPreview,
}: StylePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {styles.map((style: Style) => {
        const isSelected = selected.includes(style.id);
        return (
          <button
            key={style.id}
            onClick={() => onToggle(style.id)}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all",
              isSelected
                ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                : "border-primary/10 bg-white hover:border-gold/50 hover:shadow-md",
              showAsPreview && "cursor-default"
            )}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs text-white">
                ✓
              </div>
            )}
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                isSelected
                  ? "bg-gold text-white"
                  : "bg-primary/5 text-primary group-hover:bg-gold/10 group-hover:text-gold"
              )}
            >
              {icons[style.id]}
            </div>
            <div className="text-center">
              <p className="font-semibold text-primary">{style.name}</p>
              <p className="mt-1 text-xs text-primary/50">
                {style.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
