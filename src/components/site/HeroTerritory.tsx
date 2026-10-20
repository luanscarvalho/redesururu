import { BRAZIL_STATES } from "./brazil-map-data";

/** The native Alagoas outline is scaled uniformly, without cartographic decoration. */
export function HeroTerritory() {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <svg className="hero-territory" viewBox="425 166 49 32" role="img" aria-label="Silhueta geográfica de Alagoas">
      <path className="hero-territory-depth" d={alagoas.d} transform="translate(3 5)" />
      <path className="hero-territory-edge" d={alagoas.d} transform="translate(1.5 2.5)" />
      <path className="hero-territory-face" d={alagoas.d} />
    </svg>
  );
}