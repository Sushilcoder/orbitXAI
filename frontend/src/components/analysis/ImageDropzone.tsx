"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileImage,
  Upload,
  X,
} from "lucide-react";

interface ImageDropzoneProps {
  label: string;
  description: string;
  onFileSelected: (file: File | null) => void;
  selectedFile?: File | null;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024;

export default function ImageDropzone({
  label,
  description,
  onFileSelected,
  selectedFile,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file?: File) {
    if (!file) return;

    setError(null);

    const supported =
      file.type.startsWith("image/") ||
      /\.(tif|tiff)$/i.test(file.name);

    if (!supported) {
      setError("Unsupported file. Use JPG, PNG or TIFF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 100 MB.");
      return;
    }

    onFileSelected(file);
  }

  function removeFile() {
    setError(null);
    onFileSelected(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFile(event.dataTransfer.files?.[0]);
      }}
      className={`rounded-xl border p-4 transition ${
        dragging
          ? "border-cyan-300/50 bg-cyan-300/[0.06]"
          : "border-white/[0.07] bg-white/[0.02]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-white/75">
            {label}
          </div>

          <div className="mt-1 text-[10px] text-white/30">
            {description}
          </div>
        </div>

        {selectedFile && (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300/80" />
        )}
      </div>

      {selectedFile ? (
        <div className="rounded-lg border border-emerald-300/10 bg-emerald-300/[0.04] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
              <FileImage className="h-4 w-4 text-cyan-200/60" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-xs text-white/70">
                {selectedFile.name}
              </div>

              <div className="mt-1 text-[9px] text-white/25">
                {formatFileSize(selectedFile.size)}
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              aria-label={`Remove ${label}`}
              className="rounded-md p-1.5 text-white/25 hover:bg-white/[0.05] hover:text-white/70"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.09] px-4 py-7 transition hover:border-cyan-300/20 hover:bg-white/[0.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035]">
            <Upload className="h-4 w-4 text-cyan-200/60" />
          </div>

          <div className="mt-3 text-xs text-white/55">
            Drop imagery here
          </div>

          <div className="mt-1 text-[9px] text-white/25">
            or click to browse
          </div>
        </button>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/10 bg-red-400/[0.04] p-2.5">
          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-red-300/70" />

          <span className="text-[9px] leading-4 text-red-200/60">
            {error}
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.tif,.tiff"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}