"use client";

import { forwardRef } from "react";

type Node = { id: string; x: number; y: number; w: number; title: string; sub: string };

const H = 64;
const nodes: Node[] = [
  { id: "web", x: 170, y: 40, w: 220, title: "Next.js", sub: "Web app, TypeScript" },
  { id: "api", x: 170, y: 196, w: 220, title: "FastAPI", sub: "15 routers, JWT, RBAC" },
  { id: "stripe", x: 418, y: 196, w: 122, title: "Stripe", sub: "Payments" },
  { id: "db", x: 30, y: 352, w: 230, title: "PostgreSQL", sub: "Supabase + pgvector" },
  { id: "llm", x: 300, y: 352, w: 230, title: "Ollama", sub: "Local LLM, RAG" },
];

const edges = [
  { d: "M280 104 V196", label: "REST + JWT", lx: 290, ly: 154, nodes: ["web", "api"] },
  { d: "M390 228 H418", label: "", lx: 0, ly: 0, nodes: ["api", "stripe"] },
  { d: "M230 260 C230 310 145 300 145 352", label: "SQL", lx: 160, ly: 300, nodes: ["api", "db"] },
  { d: "M330 260 C330 310 415 300 415 352", label: "RAG", lx: 382, ly: 300, nodes: ["api", "llm"] },
  { d: "M300 384 H260", label: "", lx: 0, ly: 0, nodes: ["llm", "db"] },
];

/** AXIOM system diagram. `active` node ids light up; edges carry class `edge` for scroll drawing. */
const ArchitectureDiagram = forwardRef<SVGSVGElement, { active: string[] }>(function ArchitectureDiagram({ active }, ref) {
  const on = (id: string) => active.includes(id);
  const testsOn = on("tests");
  return (
    <svg ref={ref} viewBox="0 0 560 470" className="h-auto w-full" role="img" aria-labelledby="arch-title arch-desc">
      <title id="arch-title">AXIOM architecture</title>
      <desc id="arch-desc">
        A Next.js web app calls a FastAPI backend over REST with JWT. The backend uses Stripe for payments, PostgreSQL with pgvector on Supabase
        for data and embeddings, and a local Ollama model for retrieval-augmented generation. A Playwright suite tests the whole system end to end.
      </desc>

      {/* Playwright wraps everything */}
      <rect
        x="8" y="8" width="544" height="454" rx="18" fill="none" strokeWidth="1.5" strokeDasharray="6 7"
        className="transition-[stroke] duration-300"
        stroke={testsOn ? "#ffa31a" : "rgba(239,232,220,0.16)"}
      />
      <text x="28" y="446" fontSize="13" className="transition-[fill] duration-300" fill={testsOn ? "#ffa31a" : "#9a9084"}>
        Playwright end-to-end suite
      </text>

      {edges.map((e, i) => {
        const lit = e.nodes.every(on);
        return (
          <g key={i}>
            <path d={e.d} pathLength={1} className="edge transition-[stroke] duration-300" fill="none" strokeWidth="1.5" stroke={lit ? "#ffa31a" : "rgba(239,232,220,0.35)"} />
            {e.label && (
              <text x={e.lx} y={e.ly} fontSize="12" fill="#9a9084" className="edge-label">
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {nodes.map((n) => {
        const lit = on(n.id);
        return (
          <g key={n.id} className="node">
            <rect
              x={n.x} y={n.y} width={n.w} height={H} rx="12" strokeWidth="1.5"
              className="transition-[fill,stroke] duration-300"
              fill={lit ? "rgba(255,163,26,0.12)" : "#16130f"}
              stroke={lit ? "#ffa31a" : "rgba(239,232,220,0.18)"}
            />
            <text x={n.x + 18} y={n.y + 28} fontSize="17" fontWeight="600" fill="#efe8dc">
              {n.title}
            </text>
            <text x={n.x + 18} y={n.y + 48} fontSize="12.5" className="transition-[fill] duration-300" fill={lit ? "#ffc266" : "#9a9084"}>
              {n.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
});

export default ArchitectureDiagram;
