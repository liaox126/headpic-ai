"use client";

import { useCallback, useState } from "react";
import { Upload, X, ImageIcon, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImagesSelect: (base64List: string[]) => void;
  previews: string[];
  onClear: () => void;
  maxPhotos?: number;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB original file limit
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_DIMENSION = 1536;
const JPEG_QUALITY = 0.85;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

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
  onImagesSelect,
  previews,
  onClear,
  maxPhotos = 3,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const processFiles = useCallback(
    async (files: File[]) => {
      setError(null);

      const validFiles: File[] = [];
      for (const file of files) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setError("Please upload JPG, PNG, or WebP images.");
          return;
        }
        if (file.size > MAX_SIZE) {
          setError("Each image must be under 10MB.");
          return;
        }
        validFiles.push(file);
      }

      const totalPhotos = previews.length + validFiles.length;
      if (totalPhotos > maxPhotos) {
        setError(`Maximum ${maxPhotos} photos allowed. You already have ${previews.length}.`);
        return;
      }

      setProcessing(true);
      try {
        const newImages = await Promise.all(validFiles.map((f) => compressImage(f)));
        onImagesSelect([...previews, ...newImages]);
      } catch {
        setError("Failed to process image. Please try another photo.");
      } finally {
        setProcessing(false);
      }
    },
    [onImagesSelect, previews, maxPhotos]
  );

  const removePhoto = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    if (updated.length === 0) {
      onClear();
    } else {
      onImagesSelect(updated);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) processFiles(files);
    },
    [processFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) processFiles(files);
      // Reset input so the same file can be selected again
      e.target.value = "";
    },
    [processFiles]
  );

  if (previews.length > 0) {
    return (
      <div>
        <div className="flex flex-wrap gap-4 justify-center">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={`data:image/jpeg;base64,${preview}`}
                alt={`Photo ${index + 1}`}
                className="h-40 w-40 rounded-xl border-2 border-gold/30 object-cover shadow-lg sm:h-48 sm:w-48"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-gold/90 px-2 py-0.5 text-xs font-medium text-white">
                  Main
                </span>
              )}
            </div>
          ))}

          {previews.length < maxPhotos && (
            <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/20 transition-all hover:border-gold/50 hover:bg-gold/5 sm:h-48 sm:w-48">
              <Plus className="h-8 w-8 text-primary/30" />
              <span className="mt-2 text-xs text-primary/40">Add photo</span>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleChange}
              />
            </label>
          )}
        </div>
        <p className="mt-3 text-center text-sm text-primary/50">
          {previews.length === 1
            ? "Add more angles for better results (optional)"
            : `${previews.length} photos uploaded — more angles = better likeness`}
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
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 sm:p-12 transition-all",
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
        <p className="mb-1 text-base sm:text-lg font-medium text-primary text-center">
          {processing
            ? "Processing photos..."
            : dragActive
              ? "Drop your photos here"
              : "Upload your photo(s)"}
        </p>
        <p className="text-xs sm:text-sm text-primary/50 text-center">
          Up to {maxPhotos} photos for better accuracy. JPG, PNG, WebP up to 10MB each.
        </p>
        <input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleChange}
        />
      </label>
      {error && (
        <p className="mt-3 text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
