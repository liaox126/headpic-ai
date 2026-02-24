"use client";

import { Download, DownloadCloud } from "lucide-react";

interface ResultGridProps {
  results: { styleId: string; styleName: string; imageBase64: string }[];
}

function downloadImage(base64: string, filename: string) {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${base64}`;
  link.download = filename;
  link.click();
}

export default function ResultGrid({ results }: ResultGridProps) {
  const handleDownloadAll = () => {
    results.forEach((r) => {
      downloadImage(r.imageBase64, `headpic-${r.styleId}.png`);
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">Your Headshots</h3>
        {results.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            <DownloadCloud className="h-4 w-4" />
            Download All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.styleId}
            className="group overflow-hidden rounded-xl border-2 border-primary/10 bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <img
                src={`data:image/png;base64,${result.imageBase64}`}
                alt={`${result.styleName} headshot`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-primary">
                {result.styleName}
              </span>
              <button
                onClick={() =>
                  downloadImage(
                    result.imageBase64,
                    `headpic-${result.styleId}.png`
                  )
                }
                className="flex items-center gap-1 rounded-lg bg-gold/10 px-3 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                <Download className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
