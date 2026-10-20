import { BRAZIL_STATES } from "./brazil-map-data";

/** The native Alagoas outline is scaled uniformly, without cartographic decoration. */
export function HeroTerritory() {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <svg className="hero-territory" viewBox="428.7 171.3 38 21.2" role="img" aria-label="Silhueta geográfica de Alagoas">
      <path d={alagoas.d} />
    </svg>
  );
}