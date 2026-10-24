import { describe, expect, it } from "vitest";
import { ALAGOAS_BOUNDARY, ALAGOAS_PATH, ALAGOAS_NODES, ALAGOAS_EDGES, isInsideAlagoas } from "@/components/site/alagoas-network";
import { BRAZIL_STATES } from "@/components/site/brazil-map-data";

describe("Alagoas network geography", () => {
  it("uses the real AL boundary without replacing its vertices", () => {
    expect(ALAGOAS_PATH).toBe(BRAZIL_STATES.find((state) => state.id === "AL")?.d);
    expect(ALAGOAS_BOUNDARY.length).toBeGreaterThan(90);
    expect(ALAGOAS_BOUNDARY[0]).toEqual({ x: 462.4, y: 171.9 });
  });
  it("places interior nodes inside Alagoas and distributes nodes on the boundary", () => {
    const interior = ALAGOAS_NODES.filter((node) => !node.boundary);
    expect(interior.length).toBeGreaterThan(20);
    expect(ALAGOAS_NODES.filter((node) => node.boundary).length).toBeGreaterThan(20);
    expect(interior.every(isInsideAlagoas)).toBe(true);
    expect(isInsideAlagoas({ x: 420, y: 170 })).toBe(false);
  });
  it("keeps the connected links within the state", () => {
    expect(ALAGOAS_EDGES.length).toBeGreaterThan(50);
    for (const [start, end] of ALAGOAS_EDGES) {
      const a = ALAGOAS_NODES[start], b = ALAGOAS_NODES[end];
      if (!a || !b) throw new Error("Invalid network node");
      expect(isInsideAlagoas({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })).toBe(true);
    }
  });
});