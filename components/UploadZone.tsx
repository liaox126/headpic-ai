"use client";

import { useCallback, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageSelect: (base64: string) => void;
  preview: string | null;
  onClear: () => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function UploadZone({
  onImageSelect,
  preview,
  onClear,
}: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Please upload a JPG, PNG, or WebP image.");
        return;
      }

      if (file.size > MAX_SIZE) {
        setError("Image must be under 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Extract base64 data after the data URL prefix
        const base64 = result.split(",")[1];
        onImageSelect(base64);
      };
      reader.readAsDataURL(file);
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
            : "border-primary/20 bg-primary/5 hover:border-gold/50 hover:bg-gold/5"
        )}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {dragActive ? (
            <ImageIcon className="h-8 w-8 text-gold" />
          ) : (
            <Upload className="h-8 w-8 text-primary/40" />
          )}
        </div>
        <p className="mb-1 text-lg font-medium text-primary">
          {dragActive ? "Drop your photo here" : "Upload your photo"}
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
