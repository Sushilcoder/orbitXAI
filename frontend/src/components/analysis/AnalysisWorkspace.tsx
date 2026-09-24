"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Info,
  Satellite,
} from "lucide-react";

import ImageDropzone from "./ImageDropzone";
import ImageViewer from "./ImageViewer";
import AIAnalyst from "./AIAnalyst";
import AnalysisBottomPanel from "./AnalysisBottomPanel";

type Mode = "SINGLE_IMAGE" | "BI_TEMPORAL" | "MULTISENSOR";

interface FileState {
  image: File | null;
  t1: File | null;
  t2: File | null;
  optical: File | null;
  sar: File | null;
}

export default function AnalysisWorkspace() {
  const [mode, setMode] = useState<Mode>("SINGLE_IMAGE");

  const [files, setFiles] = useState<FileState>({
    image: null,
    t1: null,
    t2: null,
    optical: null,
    sar: null,
  });

  const [query, setQuery] = useState("");

  const activeFile = useMemo(() => {
    if (mode === "SINGLE_IMAGE") return files.image;
    if (mode === "BI_TEMPORAL") return files.t1;
    return files.optical;
  }, [files, mode]);

  const previewUrl = useObjectUrl(
  mode === "SINGLE_IMAGE"
    ? files.image
    : mode === "BI_TEMPORAL"
      ? files.t1
      : files.optical
);

const secondaryPreviewUrl = useObjectUrl(
  mode === "BI_TEMPORAL"
    ? files.t2
    : mode === "MULTISENSOR"
      ? files.sar
      : null
);
  const ready = getAnalysisReadiness(mode, files);

  function updateFile(
    key: keyof FileState,
    file: File | null
  ) {
    setFiles((current) => ({
      ...current,
      [key]: file,
    }));
  }

  function changeMode(nextMode: Mode) {
    setMode(nextMode);
    setQuery("");
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-white/[0.07] bg-[#07090d]/95 px-5 backdrop-blur-xl lg:pl-[272px] lg:pr-7">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] text-white/35 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-white/25">
              New Analysis
            </div>

            <div className="mt-1 flex items-center gap-2 text-sm font-medium text-white/75">
              <Satellite className="h-3.5 w-3.5 text-cyan-200/60" />
              Untitled Analysis
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.04] px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="text-[9px] text-emerald-300/65">
              System Ready
            </span>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] text-white/40 transition hover:text-white/70"
          >
            Save
          </button>
        </div>
      </header>

      <main className="lg:ml-[248px]">
        <div className="mx-auto max-w-[1700px] p-4 sm:p-5 lg:p-6">
          {/* Mode selector */}
          <section className="mb-4 flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-200/40">
                Analysis Configuration
              </div>

              <div className="mt-1 text-sm text-white/60">
                Select the imagery configuration for this analysis.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <ModeButton
                active={mode === "SINGLE_IMAGE"}
                onClick={() => changeMode("SINGLE_IMAGE")}
              >
                Single Image
              </ModeButton>

              <ModeButton
                active={mode === "BI_TEMPORAL"}
                onClick={() => changeMode("BI_TEMPORAL")}
              >
                T1 / T2
              </ModeButton>

              <ModeButton
                active={mode === "MULTISENSOR"}
                onClick={() => changeMode("MULTISENSOR")}
              >
                Optical / SAR
              </ModeButton>
            </div>
          </section>

          {/* Readiness */}
          <section
            className={`mb-4 flex items-center gap-3 rounded-xl border px-4 py-3 ${
              ready
                ? "border-emerald-300/10 bg-emerald-300/[0.03]"
                : "border-white/[0.06] bg-white/[0.015]"
            }`}
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                ready
                  ? "bg-emerald-300/[0.07]"
                  : "bg-white/[0.03]"
              }`}
            >
              {ready ? (
                <Check className="h-3.5 w-3.5 text-emerald-300/70" />
              ) : (
                <Info className="h-3.5 w-3.5 text-white/25" />
              )}
            </div>

            <div>
              <div className="text-[10px] font-medium text-white/50">
                {ready
                  ? "Input configuration ready"
                  : "Waiting for required imagery"}
              </div>

              <div className="mt-0.5 text-[9px] text-white/20">
                {getReadinessMessage(mode, files)}
              </div>
            </div>
          </section>

          {/* Main workspace */}
          <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_350px]">
            {/* Input */}
            <aside className="rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <div className="border-b border-white/[0.07] px-4 py-4">
                <div className="text-xs font-semibold text-white/70">
                  Input Data
                </div>

                <div className="mt-1 text-[9px] text-white/25">
                  Upload imagery for analysis
                </div>
              </div>

              <div className="space-y-3 p-4">
                {mode === "SINGLE_IMAGE" && (
                  <ImageDropzone
                    label="Satellite Image"
                    description="Primary analysis image"
                    selectedFile={files.image}
                    onFileSelected={(file) =>
                      updateFile("image", file)
                    }
                  />
                )}

                {mode === "BI_TEMPORAL" && (
                  <>
                    <ImageDropzone
                      label="T1 — Earlier"
                      description="Earlier observation"
                      selectedFile={files.t1}
                      onFileSelected={(file) =>
                        updateFile("t1", file)
                      }
                    />

                    <ImageDropzone
                      label="T2 — Later"
                      description="Later observation"
                      selectedFile={files.t2}
                      onFileSelected={(file) =>
                        updateFile("t2", file)
                      }
                    />

                    <div className="rounded-lg border border-cyan-300/10 bg-cyan-300/[0.03] p-3">
                      <div className="flex gap-2">
                        <Info className="mt-0.5 h-3 w-3 shrink-0 text-cyan-200/50" />

                        <p className="text-[9px] leading-4 text-white/30">
                          T1 and T2 should cover the same geographic
                          region for reliable temporal analysis.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {mode === "MULTISENSOR" && (
                  <>
                    <ImageDropzone
                      label="Optical"
                      description="Multispectral / optical imagery"
                      selectedFile={files.optical}
                      onFileSelected={(file) =>
                        updateFile("optical", file)
                      }
                    />

                    <ImageDropzone
                      label="SAR"
                      description="Synthetic aperture radar imagery"
                      selectedFile={files.sar}
                      onFileSelected={(file) =>
                        updateFile("sar", file)
                      }
                    />
                  </>
                )}

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-3">
                  <div className="flex items-center gap-2">
                    <Satellite className="h-3.5 w-3.5 text-white/25" />

                    <span className="text-[9px] uppercase tracking-wider text-white/25">
                      Supported
                    </span>
                  </div>

                  <div className="mt-2 font-mono text-[9px] text-white/20">
                    JPG · PNG · TIFF · GEOTIFF
                  </div>

                  <div className="mt-2 text-[8px] leading-4 text-white/15">
                    Maximum upload size: 100 MB per file.
                  </div>
                </div>
              </div>
            </aside>

            {/* Viewer */}
            <section className="min-w-0">
              <ImageViewer
  mode={
    mode === "SINGLE_IMAGE"
      ? "SINGLE"
      : mode === "BI_TEMPORAL"
        ? "TEMPORAL"
        : "MULTISENSOR"
  }
  previewUrl={previewUrl}
  secondaryPreviewUrl={secondaryPreviewUrl}
  fileName={activeFile?.name}
  secondaryFileName={
    mode === "BI_TEMPORAL"
      ? files.t2?.name
      : mode === "MULTISENSOR"
        ? files.sar?.name
        : undefined
  }
/>
            </section>

            {/* AI Analyst */}
            <aside className="min-h-[520px] rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <AIAnalyst onQueryChange={setQuery} />
            </aside>
          </div>

          {/* Bottom panel */}
          <div className="mt-4">
            <AnalysisBottomPanel />
          </div>

          {/* Workspace footer */}
          <div className="mt-4 flex flex-col gap-2 px-1 text-[9px] text-white/15 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Check className="h-3 w-3 text-emerald-300/30" />
              {query
                ? "Query captured — analysis engine not connected"
                : "Workspace initialized"}
            </div>

            <div className="font-mono">
              ORBIT ENGINE / ANALYSIS WORKSPACE / v0.2
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-[10px] font-medium transition ${
        active
          ? "border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-100"
          : "border-white/[0.07] bg-white/[0.015] text-white/30 hover:text-white/60"
      }`}
    >
      {active && (
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
      )}

      {children}
    </button>
  );
}

function getAnalysisReadiness(
  mode: Mode,
  files: FileState
) {
  if (mode === "SINGLE_IMAGE") {
    return Boolean(files.image);
  }

  if (mode === "BI_TEMPORAL") {
    return Boolean(files.t1 && files.t2);
  }

  return Boolean(files.optical && files.sar);
}

function getReadinessMessage(
  mode: Mode,
  files: FileState
) {
  if (mode === "SINGLE_IMAGE") {
    return files.image
      ? "Single imagery input detected."
      : "Upload one satellite image to continue.";
  }

  if (mode === "BI_TEMPORAL") {
    if (!files.t1 && !files.t2) {
      return "Upload both T1 and T2 observations.";
    }

    if (!files.t1) {
      return "T1 is required.";
    }

    if (!files.t2) {
      return "T2 is required.";
    }

    return "Both temporal observations are available.";
  }

  if (!files.optical && !files.sar) {
    return "Upload both Optical and SAR imagery.";
  }

  if (!files.optical) {
    return "Optical imagery is required.";
  }

  if (!files.sar) {
    return "SAR imagery is required.";
  }

  return "Both sensor inputs are available.";
}

function useObjectUrl(file: File | null) {
  const url = useMemo(() => {
    if (
      !file ||
      !file.type.startsWith("image/") ||
      /\.(tif|tiff)$/i.test(file.name)
    ) {
      return undefined;
    }

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
}