import { useId } from "react";
import { ALAGOAS_PATH, ALAGOAS_NODES, ALAGOAS_EDGES } from "./alagoas-network";

export function NetworkArt({ className, label }: { className?: string; label: string }) {
  const clipId = useId();
  const colors = ["var(--accent)", "var(--primary)", "var(--highlight)"];
  return (
    <svg viewBox="427.5 170.1 40.4 23.6" className={className} role="img" aria-label={label}>
      <defs><clipPath id={clipId}><path d={ALAGOAS_PATH} /></clipPath></defs>
      <path d={ALAGOAS_PATH} fill="none" stroke="var(--primary)" strokeWidth="0.12" strokeOpacity="0.6" strokeLinejoin="round" />
      <g clipPath={`url(#${clipId})`}>
      {ALAGOAS_EDGES.map(([a, b], i) => {
        const A = ALAGOAS_NODES[a];
        const B = ALAGOAS_NODES[b];
        if (!A || !B) return null;
        return (
          <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
            stroke={i % 5 === 0 ? "var(--accent)" : "var(--primary)"} strokeOpacity="0.3" strokeWidth="0.1" />
        );
      })}
      </g>
      {ALAGOAS_NODES.map(({ x, y }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 9 === 0 ? 0.4 : 0.25} fill={colors[i % 9 === 0 ? 2 : i % 2]} />
          <circle cx={x} cy={y} r={i % 9 === 0 ? 0.14 : 0.09} fill="var(--surface)" />
        </g>
      ))}
    </svg>
  );
}
