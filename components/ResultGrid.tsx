"use client";

import { Download, DownloadCloud, Lock } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface ResultGridProps {
  results: { styleId: string; styleName: string; imageBase64: string }[];
  isFreePreview?: boolean;
}

function downloadImage(base64: string, filename: string) {
  const link = document.createElement("a");
  link.href = `data:image/png;base64,${base64}`;
  link.download = filename;
  link.click();
}

function WatermarkedImage({
  base64,
  alt,
}: {
  base64: string;
  alt: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Draw watermark pattern
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(img.width / 8, 32)}px Arial`;
      ctx.textAlign = "center";

      // Rotate and tile watermark
      const text = "HeadPic.site";
      const step = img.width / 2;

      for (let y = -img.height; y < img.height * 2; y += step) {
        for (let x = -img.width; x < img.width * 2; x += step) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(-Math.PI / 6);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }

      // Draw a stronger center watermark
      ctx.globalAlpha = 0.25;
      ctx.font = `bold ${Math.max(img.width / 6, 40)}px Arial`;
      ctx.translate(img.width / 2, img.height / 2);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(text, 0, 0);

      ctx.restore();
    };
    img.src = `data:image/png;base64,${base64}`;
  }, [base64]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full object-cover"
      aria-label={alt}
    />
  );
}

export default function ResultGrid({ results, isFreePreview }: ResultGridProps) {
  const handleDownloadAll = () => {
    results.forEach((r) => {
      downloadImage(r.imageBase64, `headpic-${r.styleId}.png`);
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-primary">Your Headshots</h3>
        {!isFreePreview && results.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
          >
            <DownloadCloud className="h-4 w-4" />
            Download All
          </button>
        )}
      </div>

      {isFreePreview && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
          <Lock className="inline h-4 w-4 mr-1" />
          This is a free preview with watermark. Purchase a plan to download high-quality headshots without watermark.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.styleId}
            className="group overflow-hidden rounded-xl border-2 border-primary/10 bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-square">
              {isFreePreview ? (
                <WatermarkedImage
                  base64={result.imageBase64}
                  alt={`${result.styleName} headshot preview`}
                />
              ) : (
                <img
                  src={`data:image/png;base64,${result.imageBase64}`}
                  alt={`${result.styleName} headshot`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-primary">
                {result.styleName}
              </span>
              {isFreePreview ? (
                <Link
                  href="/#pricing"
                  className="flex items-center gap-1 rounded-lg bg-gold px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gold-light"
                >
                  <Lock className="h-3 w-3" />
                  Unlock
                </Link>
              ) : (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
