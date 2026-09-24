import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Box,
  GitCompareArrows,
  Layers3,
  Map,
  Plus,
  Radar,
} from "lucide-react";

const modules = [
  {
    name: "Visual Q&A",
    description: "Ask questions about a satellite image.",
    icon: Bot,
    code: "VQA",
  },
  {
    name: "Grounding",
    description: "Locate objects and regions from natural language.",
    icon: Box,
    code: "GRD",
  },
  {
    name: "Change Analysis",
    description: "Compare imagery across two points in time.",
    icon: GitCompareArrows,
    code: "T1 / T2",
  },
  {
    name: "Optical + SAR",
    description: "Fuse complementary satellite modalities.",
    icon: Radar,
    code: "MULTI",
  },
];

const recentAnalyses = [
  {
    name: "Urban Expansion",
    type: "Bi-temporal Change",
    status: "Ready",
    time: "Today, 18:42",
  },
  {
    name: "Water Body Detection",
    type: "Grounding",
    status: "Ready",
    time: "Today, 16:18",
  },
  {
    name: "Land Cover Query",
    type: "Visual Q&A",
    status: "Ready",
    time: "Yesterday, 21:04",
  },
];

export default function Dashboard() {
  return (
    <main className="lg:ml-[248px]">
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0f16] p-7 sm:p-9">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -right-20 -top-32 h-[360px] w-[360px] rounded-full border border-cyan-300/10" />
            <div className="absolute -right-8 -top-20 h-[250px] w-[250px] rounded-full border border-cyan-300/[0.06]" />
            <div className="absolute right-20 top-10 h-24 w-24 rounded-full bg-cyan-300/[0.04] blur-3xl" />
          </div>

          <div className="relative max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/70">
                Earth Observation Intelligence
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Understand the Earth
              <span className="block text-white/40">
                through natural language.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
              Upload satellite imagery, ask a question, and let OrbitXAI
              orchestrate the right geospatial intelligence workflow.
            </p>

    <Link
  href="/analysis"
  className="mt-7 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
>
  <Plus className="h-4 w-4" />
  Start New Analysis
  <ArrowUpRight className="ml-1 h-4 w-4" />
</Link>
          </div>
        </section>

        {/* Metrics */}
        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric
            label="Total Analyses"
            value="24"
            detail="+8 this month"
          />
          <Metric
            label="Active Projects"
            value="03"
            detail="2 currently running"
          />
          <Metric
            label="AI Engine"
            value="READY"
            detail="All systems operational"
            status
          />
        </section>

        {/* Modules */}
        <section className="mt-9">
          <SectionHeader
            eyebrow="Intelligence Modules"
            title="Analysis capabilities"
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <button
                  key={module.name}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035]">
                      <Icon className="h-5 w-5 text-cyan-200/75" />
                    </div>

                    <span className="font-mono text-[9px] tracking-wider text-white/20">
                      {module.code}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white/85">
                    {module.name}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/35">
                    {module.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-[10px] font-medium text-white/30 transition group-hover:text-cyan-200/70">
                    Open module
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recent */}
        <section className="mt-9">
          <SectionHeader
            eyebrow="Activity"
            title="Recent analyses"
            action="View all"
          />

          <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
            {recentAnalyses.map((analysis, index) => (
              <div
                key={analysis.name}
                className={`flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center ${
                  index !== recentAnalyses.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Layers3 className="h-4 w-4 text-white/35" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white/75">
                    {analysis.name}
                  </div>

                  <div className="mt-1 text-[11px] text-white/30">
                    {analysis.type}
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <span className="text-[10px] text-white/25">
                    {analysis.time}
                  </span>

                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] font-medium text-emerald-300/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {analysis.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System architecture teaser */}
        <section className="mt-9 rounded-xl border border-white/[0.07] bg-[#080c12] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-300/[0.05]">
              <Map className="h-5 w-5 text-cyan-200/60" />
            </div>

            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Agentic Analysis Pipeline
              </div>

              <div className="mt-1 text-xs text-white/30">
                Query → Validation → Model Selection → Evidence → Result
              </div>
            </div>

            <span className="font-mono text-[9px] text-cyan-200/40">
              ORBIT ENGINE / v0.1
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  detail,
  status = false,
}: {
  label: string;
  value: string;
  detail: string;
  status?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
        {label}
      </div>

      <div
        className={`mt-3 font-mono text-2xl font-semibold ${
          status ? "text-emerald-300/80" : "text-white/85"
        }`}
      >
        {value}
      </div>

      <div className="mt-1 text-[10px] text-white/25">{detail}</div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-200/40">
          {eyebrow}
        </div>

        <h2 className="mt-1 text-lg font-semibold text-white/80">{title}</h2>
      </div>

      {action && (
        <button className="text-[11px] text-white/30 hover:text-white/70">
          {action} →
        </button>
      )}
    </div>
  );
}