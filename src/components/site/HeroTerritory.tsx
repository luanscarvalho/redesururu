import { BRAZIL_STATES } from "./brazil-map-data";

/** Geographic artwork, with Alagoas preserved at its actual scale and location. */
export function HeroTerritory() {
  return (
    <svg className="hero-territory" viewBox="0 0 460 470" role="img" aria-label="Mapa do Brasil com Alagoas destacado em amarelo">
      <g className="hero-map-states">
        {BRAZIL_STATES.filter((state) => state.id !== "AL").map((state) => (
          <path key={state.id} d={state.d} />
        ))}
      </g>
      <path className="hero-map-alagoas" d={BRAZIL_STATES.find((state) => state.id === "AL")?.d} />
      <path className="hero-map-connection" d="M449 181 C490 222 470 313 397 339" />
      <path className="hero-map-marker" d="M445 162v-12m-6 6h12" />
    </svg>
  );
}