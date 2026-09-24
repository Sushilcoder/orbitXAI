"use client";

import {
  Activity,
  CheckCircle2,
  Clock3,
  FileSearch,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    id: "evidence",
    label: "Evidence",
    icon: FileSearch,
  },
  {
    id: "metadata",
    label: "Metadata",
    icon: Layers3,
  },
  {
    id: "confidence",
    label: "Confidence",
    icon: ShieldCheck,
  },
  {
    id: "trace",
    label: "Execution Trace",
    icon: Activity,
  },
];

export default function AnalysisBottomPanel() {
  const [activeTab, setActiveTab] = useState("evidence");

  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
      <div className="flex overflow-x-auto border-b border-white/[0.07]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3 text-[10px] font-medium transition ${
                active
                  ? "border-cyan-300 text-cyan-200/80"
                  : "border-transparent text-white/30 hover:text-white/55"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-[150px] p-5">
        {activeTab === "evidence" && <EvidenceState />}

        {activeTab === "metadata" && <MetadataState />}

        {activeTab === "confidence" && <ConfidenceState />}

        {activeTab === "trace" && <TraceState />}
      </div>
    </section>
  );
}

function EvidenceState() {
  return (
    <EmptyState
      icon={FileSearch}
      title="No evidence generated"
      description="Visual evidence, masks and bounding regions will appear here after analysis."
    />
  );
}

function MetadataState() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {[
        ["CRS", "—"],
        ["Resolution", "—"],
        ["Acquisition", "—"],
        ["Sensor", "—"],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-3"
        >
          <div className="text-[9px] uppercase tracking-wider text-white/20">
            {label}
          </div>

          <div className="mt-2 font-mono text-xs text-white/45">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfidenceState() {
  return (
    <EmptyState
      icon={ShieldCheck}
      title="Confidence unavailable"
      description="Confidence will be calculated from model and evidence outputs."
    />
  );
}

function TraceState() {
  return (
    <div className="space-y-3">
      {[
        "Waiting for query",
        "Input validation",
        "Task classification",
        "Model selection",
        "Evidence generation",
      ].map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02]">
            {index === 0 ? (
              <Clock3 className="h-3 w-3 text-white/20" />
            ) : (
              <CheckCircle2 className="h-3 w-3 text-white/15" />
            )}
          </div>

          <span className="text-[10px] text-white/30">{step}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
        <Icon className="h-4 w-4 text-white/20" />
      </div>

      <div>
        <div className="text-xs text-white/45">{title}</div>
        <div className="mt-1 max-w-xl text-[10px] leading-5 text-white/20">
          {description}
        </div>
      </div>
    </div>
  );
}