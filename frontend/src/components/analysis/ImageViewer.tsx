"use client";

import {
  Crosshair,
  Layers3,
  Maximize2,
  Minus,
  Move,
  Plus,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

type ViewerMode = "SINGLE" | "TEMPORAL" | "MULTISENSOR";

interface ImageViewerProps {
  mode?: ViewerMode;
  previewUrl?: string;
  secondaryPreviewUrl?: string;
  fileName?: string;
  secondaryFileName?: string;
}

export default function ImageViewer({
  mode = "SINGLE",
  previewUrl,
  secondaryPreviewUrl,
  fileName,
  secondaryFileName,
}: ImageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(true);

  const [temporalLayer, setTemporalLayer] =
    useState<"T1" | "T2">("T1");

  const [sensorLayer, setSensorLayer] =
    useState<"OPTICAL" | "SAR">("OPTICAL");

  function zoomIn() {
    setZoom((current) => Math.min(current + 0.25, 3));
  }

  function zoomOut() {
    setZoom((current) => Math.max(current - 0.25, 0.5));
  }

  function resetView() {
    setZoom(1);
  }

  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-xl border border-white/[0.07] bg-[#060a0f]">

      {/* Background grid */}
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      {/* Main viewer */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-8">

        {!previewUrl ? (
          <EmptyViewer />
        ) : (
          <div
            className="relative h-full w-full transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
            }}
          >

            {/* SINGLE IMAGE */}
            {mode === "SINGLE" && (
              <SingleImage
                src={previewUrl}
                fileName={fileName}
              />
            )}

            {/* T1 / T2 */}
            {mode === "TEMPORAL" && (
              <TemporalViewer
                t1={previewUrl}
                t2={secondaryPreviewUrl}
                t1Name={fileName}
                t2Name={secondaryFileName}
                activeLayer={temporalLayer}
                onLayerChange={setTemporalLayer}
              />
            )}

            {/* OPTICAL / SAR */}
            {mode === "MULTISENSOR" && (
              <MultisensorViewer
                optical={previewUrl}
                sar={secondaryPreviewUrl}
                opticalName={fileName}
                sarName={secondaryFileName}
                activeLayer={sensorLayer}
                onLayerChange={setSensorLayer}
              />
            )}

          </div>
        )}
      </div>

      {/* Coordinates */}
      {showCoordinates && (
        <div className="absolute left-4 top-4 z-20 rounded-lg border border-white/[0.07] bg-black/70 px-3 py-2 backdrop-blur-md">

          <div className="font-mono text-[9px] text-white/35">
            LAT&nbsp;&nbsp;18.5204°
          </div>

          <div className="mt-1 font-mono text-[9px] text-white/35">
            LON&nbsp;&nbsp;73.8567°
          </div>

          <div className="mt-1 text-[8px] text-white/15">
            DEMO VIEWPORT
          </div>

        </div>
      )}

      {/* Top-right controls */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-lg border border-white/[0.07] bg-black/70 p-1 backdrop-blur-md">

        <ViewerMiniButton
          active={showGrid}
          label="Grid"
          onClick={() =>
            setShowGrid((current) => !current)
          }
        />

        <ViewerMiniButton
          active={showCoordinates}
          label="Coords"
          onClick={() =>
            setShowCoordinates((current) => !current)
          }
        />

        <button
          type="button"
          className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[9px] text-white/35 hover:bg-white/[0.05] hover:text-white/70"
        >
          <Layers3 className="h-3 w-3" />
          Layers
        </button>

      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">

        {/* Zoom indicator */}
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-black/70 px-3 py-2 backdrop-blur-md">

          <Crosshair className="h-3.5 w-3.5 text-cyan-200/50" />

          <span className="font-mono text-[9px] text-white/35">
            ZOOM {Math.round(zoom * 100)}%
          </span>

        </div>

        {/* Viewer buttons */}
        <div className="flex overflow-hidden rounded-lg border border-white/[0.07] bg-black/70 backdrop-blur-md">

          <ViewerButton
            icon={Move}
            label="Pan"
          />

          <ViewerButton
            icon={Plus}
            label="Zoom in"
            onClick={zoomIn}
          />

          <ViewerButton
            icon={Minus}
            label="Zoom out"
            onClick={zoomOut}
          />

          <ViewerButton
            icon={RotateCcw}
            label="Reset"
            onClick={resetView}
          />

          <ViewerButton
            icon={Maximize2}
            label="Fullscreen"
          />

        </div>

      </div>
    </div>
  );
}


/* ======================================================
   SINGLE IMAGE
====================================================== */

function SingleImage({
  src,
  fileName,
}: {
  src: string;
  fileName?: string;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">

      <div className="relative max-h-full max-w-full overflow-hidden rounded-lg border border-white/10">

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={fileName || "Satellite imagery"}
          className="max-h-[440px] max-w-full object-contain"
        />

      </div>

    </div>
  );
}


/* ======================================================
   T1 / T2
====================================================== */

function TemporalViewer({
  t1,
  t2,
  t1Name,
  t2Name,
  activeLayer,
  onLayerChange,
}: {
  t1: string;
  t2?: string;
  t1Name?: string;
  t2Name?: string;
  activeLayer: "T1" | "T2";
  onLayerChange: (layer: "T1" | "T2") => void;
}) {
  const activeImage =
    activeLayer === "T1"
      ? t1
      : t2;

  const activeName =
    activeLayer === "T1"
      ? t1Name
      : t2Name;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">

      {/* T1 / T2 selector */}
      <div className="mb-4 flex rounded-lg border border-white/[0.07] bg-black/70 p-1 backdrop-blur-md">

        <button
          type="button"
          onClick={() => onLayerChange("T1")}
          className={`rounded-md px-5 py-2 text-[9px] font-medium transition ${
            activeLayer === "T1"
              ? "bg-cyan-300/[0.12] text-cyan-200"
              : "text-white/30 hover:text-white/60"
          }`}
        >
          T1 — EARLIER
        </button>

        <button
          type="button"
          onClick={() => {
            if (t2) {
              onLayerChange("T2");
            }
          }}
          disabled={!t2}
          className={`rounded-md px-5 py-2 text-[9px] font-medium transition ${
            activeLayer === "T2"
              ? "bg-cyan-300/[0.12] text-cyan-200"
              : "text-white/30 hover:text-white/60"
          } disabled:cursor-not-allowed disabled:opacity-30`}
        >
          T2 — LATER
        </button>

      </div>

      {/* Main image */}
      <div className="relative flex h-[430px] w-full max-w-[850px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black">

        {activeImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeImage}
              src={activeImage}
              alt={
                activeName ||
                `${activeLayer} satellite imagery`
              }
              className="max-h-full max-w-full object-contain"
            />

            {/* Layer label */}
            <div className="absolute bottom-3 left-3 rounded-md border border-white/[0.07] bg-black/70 px-3 py-2 backdrop-blur-md">

              <div className="text-[8px] uppercase tracking-[0.15em] text-white/40">
                {activeLayer === "T1"
                  ? "T1 — Earlier Observation"
                  : "T2 — Later Observation"}
              </div>

              {activeName && (
                <div className="mt-1 max-w-[220px] truncate text-[8px] text-white/20">
                  {activeName}
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="text-center">

            <div className="text-sm text-white/40">
              T2 imagery unavailable
            </div>

            <div className="mt-2 text-[9px] text-white/20">
              Upload the second temporal image to view T2.
            </div>

          </div>
        )}

      </div>

      {/* Status */}
      <div className="mt-4 flex gap-2">

        <TemporalStatus
          label="T1"
          available={Boolean(t1)}
          active={activeLayer === "T1"}
        />

        <TemporalStatus
          label="T2"
          available={Boolean(t2)}
          active={activeLayer === "T2"}
        />

      </div>

    </div>
  );
}


/* ======================================================
   OPTICAL / SAR
====================================================== */

function MultisensorViewer({
  optical,
  sar,
  opticalName,
  sarName,
  activeLayer,
  onLayerChange,
}: {
  optical: string;
  sar?: string;
  opticalName?: string;
  sarName?: string;
  activeLayer: "OPTICAL" | "SAR";
  onLayerChange: (layer: "OPTICAL" | "SAR") => void;
}) {
  const activeImage =
    activeLayer === "OPTICAL"
      ? optical
      : sar;

  const activeName =
    activeLayer === "OPTICAL"
      ? opticalName
      : sarName;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">

      {/* Optical / SAR selector */}
      <div className="mb-4 flex rounded-lg border border-white/[0.07] bg-black/70 p-1 backdrop-blur-md">

        <button
          type="button"
          onClick={() => onLayerChange("OPTICAL")}
          className={`rounded-md px-5 py-2 text-[9px] font-medium transition ${
            activeLayer === "OPTICAL"
              ? "bg-cyan-300/[0.12] text-cyan-200"
              : "text-white/30 hover:text-white/60"
          }`}
        >
          OPTICAL
        </button>

        <button
          type="button"
          onClick={() => {
            if (sar) {
              onLayerChange("SAR");
            }
          }}
          disabled={!sar}
          className={`rounded-md px-5 py-2 text-[9px] font-medium transition ${
            activeLayer === "SAR"
              ? "bg-cyan-300/[0.12] text-cyan-200"
              : "text-white/30 hover:text-white/60"
          } disabled:cursor-not-allowed disabled:opacity-30`}
        >
          SAR
        </button>

      </div>

      {/* Main image */}
      <div className="relative flex h-[430px] w-full max-w-[850px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black">

        {activeImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeImage}
              src={activeImage}
              alt={
                activeName ||
                `${activeLayer} satellite imagery`
              }
              className="max-h-full max-w-full object-contain"
            />

            <div className="absolute bottom-3 left-3 rounded-md border border-white/[0.07] bg-black/70 px-3 py-2 backdrop-blur-md">

              <div className="text-[8px] uppercase tracking-[0.15em] text-white/40">
                {activeLayer === "OPTICAL"
                  ? "Optical Sensor"
                  : "SAR Sensor"}
              </div>

              {activeName && (
                <div className="mt-1 max-w-[220px] truncate text-[8px] text-white/20">
                  {activeName}
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="text-center">

            <div className="text-sm text-white/40">
              SAR imagery unavailable
            </div>

            <div className="mt-2 text-[9px] text-white/20">
              Upload a SAR image to view this layer.
            </div>

          </div>
        )}

      </div>

      {/* Status */}
      <div className="mt-4 flex gap-2">

        <TemporalStatus
          label="OPTICAL"
          available={Boolean(optical)}
          active={activeLayer === "OPTICAL"}
        />

        <TemporalStatus
          label="SAR"
          available={Boolean(sar)}
          active={activeLayer === "SAR"}
        />

      </div>

    </div>
  );
}


/* ======================================================
   STATUS
====================================================== */

function TemporalStatus({
  label,
  available,
  active,
}: {
  label: string;
  available: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        active
          ? "border-cyan-300/20 bg-cyan-300/[0.06]"
          : "border-white/[0.06] bg-white/[0.015]"
      }`}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          available
            ? "bg-emerald-400"
            : "bg-white/20"
        }`}
      />

      <span className="text-[8px] text-white/40">
        {label}
      </span>

    </div>
  );
}


/* ======================================================
   EMPTY VIEWER
====================================================== */

function EmptyViewer() {
  return (
    <div className="flex max-w-sm flex-col items-center text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04]">
        <Crosshair className="h-7 w-7 text-cyan-200/45" />
      </div>

      <div className="mt-5 text-sm font-medium text-white/55">
        Imagery viewer ready
      </div>

      <p className="mt-2 text-xs leading-5 text-white/25">
        Upload satellite imagery to begin visual analysis.
      </p>

    </div>
  );
}


/* ======================================================
   BUTTONS
====================================================== */

function ViewerButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center border-l border-white/[0.07] first:border-l-0 text-white/35 transition hover:bg-white/[0.05] hover:text-white/70"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}


function ViewerMiniButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1.5 text-[8px] transition ${
        active
          ? "bg-cyan-300/[0.08] text-cyan-200/70"
          : "text-white/25 hover:text-white/60"
      }`}
    >
      {label}
    </button>
  );
}