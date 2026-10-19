/** Pontos conectados em um contorno livre inspirado em Alagoas. */
const NODES: [number, number, "a" | "p" | "h"][] = [
  [30, 70, "p"], [80, 40, "a"], [140, 60, "h"], [200, 30, "a"], [260, 50, "p"],
  [320, 25, "a"], [360, 70, "h"], [60, 130, "a"], [120, 120, "p"], [180, 110, "a"],
  [240, 120, "h"], [300, 110, "a"], [150, 175, "p"], [210, 170, "a"], [270, 165, "p"], [200, 225, "h"],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 6],
  [1, 8], [2, 9], [3, 10], [4, 11], [8, 12], [9, 13], [10, 14], [12, 13], [13, 14], [12, 15], [14, 15], [13, 15], [2, 8], [4, 10],
];

export function NetworkArt({ className, label }: { className?: string; label: string }) {
  const color = { a: "var(--accent)", p: "var(--primary)", h: "var(--highlight)" };
  return (
    <svg viewBox="0 0 390 260" className={className} role="img" aria-label={label}>
      {EDGES.map(([a, b], i) => {
        const A = NODES[a]!;
        const B = NODES[b]!;
        return (
          <line key={i} x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]}
            stroke="var(--primary)" strokeOpacity="0.22" strokeWidth="1.5" />
        );
      })}
      {NODES.map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={c === "h" ? 9 : 6} fill={color[c]} />
          <circle cx={x} cy={y} r={c === "h" ? 3.5 : 2.2} fill="var(--surface)" />
        </g>
      ))}
      <g transform="translate(345 200)">
        <circle r="5" fill="none" stroke="var(--accent)" strokeDasharray="2 3" strokeWidth="1.5" />
        <line x1="-40" y1="-25" x2="-5" y2="-3" stroke="var(--accent)" strokeDasharray="3 4" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
