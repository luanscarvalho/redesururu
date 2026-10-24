import { BRAZIL_STATES } from "./brazil-map-data";

type Point = { x: number; y: number };
export type NetworkNode = Point & { boundary: boolean };

// Reuse the attributed geographic data, retaining every boundary vertex.
export const ALAGOAS_PATH = BRAZIL_STATES.find((state) => state.id === "AL")?.d ?? "";
const mainRing = ALAGOAS_PATH.split("Z")[0] ?? "";
export const ALAGOAS_BOUNDARY: Point[] = Array.from(
  mainRing.matchAll(/[ML]([\d.]+),([\d.]+)/g),
  (match) => ({ x: Number(match[1]), y: Number(match[2]) }),
);

export function isInsideAlagoas(point: Point): boolean {
  let inside = false;
  for (let i = 0, j = ALAGOAS_BOUNDARY.length - 1; i < ALAGOAS_BOUNDARY.length; j = i++) {
    const a = ALAGOAS_BOUNDARY[i];
    const b = ALAGOAS_BOUNDARY[j];
    if (!a || !b) continue;
    if ((a.y > point.y) !== (b.y > point.y) &&
      point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

function buildNodes(): NetworkNode[] {
  const nodes: NetworkNode[] = [];
  let accumulated = 0;
  for (let i = 0; i < ALAGOAS_BOUNDARY.length; i++) {
    const a = ALAGOAS_BOUNDARY[i];
    const b = ALAGOAS_BOUNDARY[(i + 1) % ALAGOAS_BOUNDARY.length];
    if (!a || !b) continue;
    const length = distance(a, b);
    if (length === 0) continue;
    for (let step = 2.7 - accumulated; step <= length; step += 2.7) {
      nodes.push({ x: a.x + (b.x - a.x) * step / length, y: a.y + (b.y - a.y) * step / length, boundary: true });
    }
    accumulated = (accumulated + length) % 2.7;
  }
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 13; col++) {
      const point = { x: 430 + col * 2.8 + (row % 2) * 1.4 + Math.sin(col * 3 + row) * 0.4,
        y: 173 + row * 2.5 + Math.cos(row * 2 + col) * 0.35 };
      if (isInsideAlagoas(point) && nodes.every((node) => distance(node, point) > 1.25)) {
        nodes.push({ ...point, boundary: false });
      }
    }
  }
  return nodes;
}

export const ALAGOAS_NODES = buildNodes();
export const ALAGOAS_EDGES: [number, number][] = [];
// Short local links, checked along their entire length to avoid crossing bays or borders.
ALAGOAS_NODES.forEach((a, i) => {
  ALAGOAS_NODES.map((b, j) => ({ b, j, length: distance(a, b) }))
    .filter(({ j, length }) => j !== i && length < 5)
    .sort((a, b) => a.length - b.length)
    .filter(({ b }) => Array.from({ length: 19 }, (_, k) => {
      const t = (k + 1) / 20;
      return isInsideAlagoas({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }).every(Boolean))
    .slice(0, a.boundary ? 2 : 4)
    .forEach(({ j }) => {
      const start = Math.min(i, j), end = Math.max(i, j);
      if (!ALAGOAS_EDGES.some(([x, y]) => x === start && y === end)) ALAGOAS_EDGES.push([start, end]);
    });
});