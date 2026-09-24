"use client";

import {
  ArrowUp,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface AIAnalystProps {
  onQueryChange?: (query: string) => void;
}

export default function AIAnalyst({
  onQueryChange,
}: AIAnalystProps) {
  const [query, setQuery] = useState("");

  function updateQuery(value: string) {
    setQuery(value);
    onQueryChange?.(value);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/10 bg-cyan-300/[0.04]">
          <BrainCircuit className="h-4 w-4 text-cyan-200/65" />
        </div>

        <div>
          <div className="text-xs font-semibold text-white/75">
            AI Analyst
          </div>

          <div className="mt-0.5 flex items-center gap-1.5 text-[9px] text-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            Analysis engine ready
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-200/35">
            Natural Language Query
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 focus-within:border-cyan-300/20">
            <textarea
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Ask something about the imagery..."
              className="min-h-[130px] w-full resize-none bg-transparent text-sm leading-6 text-white/80 outline-none placeholder:text-white/20"
            />

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <div className="flex items-center gap-2 text-[9px] text-white/25">
                <Sparkles className="h-3 w-3" />
                Natural language enabled
              </div>

              <button
                disabled={!query.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-20"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
              Suggested queries
            </div>

            <div className="mt-2 space-y-2">
              {[
                "What is the dominant land cover?",
                "Where is the largest water body?",
                "Describe the scene.",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => updateQuery(suggestion)}
                  className="block w-full rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2 text-left text-[10px] text-white/35 transition hover:border-cyan-300/15 hover:text-white/60"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
            Pipeline
          </div>

          <div className="mt-3 flex items-center gap-2 text-[9px] text-white/30">
            <span>Query</span>
            <span className="text-white/15">→</span>
            <span>Agent</span>
            <span className="text-white/15">→</span>
            <span>Model</span>
            <span className="text-white/15">→</span>
            <span>Evidence</span>
          </div>
        </div>
      </div>
    </div>
  );
}