"use client";

import { useCallback, useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageSelect: (base64: string) => void;
  preview: string | null;
  onClear: () => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB original file limit
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_DIMENSION = 1536; // Max width/height after resize
const JPEG_QUALITY = 0.85; // Compression quality

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Scale down if needed
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG base64
      const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export default function UploadZone({
  onImageSelect,
  preview,
  onClear,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please upload a JPG, PNG, or WebP image.");
        return;
      }

      if (file.size > MAX_SIZE) {
        setError("Image must be under 10MB.");
        return;
      }

      setProcessing(true);
      try {
        const base64 = await compressImage(file);
        onImageSelect(base64);
      } catch {
        setError("Failed to process image. Please try another photo.");
      } finally {
        setProcessing(false);
      }
    },
    [onImageSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  if (preview) {
    return (
      <div className="relative mx-auto max-w-sm">
        <img
          src={`data:image/jpeg;base64,${preview}`}
          alt="Upload preview"
          className="w-full rounded-xl border-2 border-gold/30 shadow-lg"
        />
        <button
          onClick={onClear}
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
        <p className="mt-3 text-center text-sm text-primary/50">
          Photo uploaded successfully
        </p>
      </div>
    );
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
          dragActive
            ? "border-gold bg-gold/5"
            : "border-primary/20 bg-primary/5 hover:border-gold/50 hover:bg-gold/5",
          processing && "pointer-events-none opacity-60"
        )}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {processing ? (
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          ) : dragActive ? (
            <ImageIcon className="h-8 w-8 text-gold" />
          ) : (
            <Upload className="h-8 w-8 text-primary/40" />
          )}
        </div>
        <p className="mb-1 text-lg font-medium text-primary">
          {processing
            ? "Processing photo..."
            : dragActive
              ? "Drop your photo here"
              : "Upload your photo"}
        </p>
        <p className="text-sm text-primary/50">
          Drag & drop or click to browse. JPG, PNG, WebP up to 10MB.
        </p>
        <input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleChange}
        />
      </label>
      {error && (
        <p className="mt-3 text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
