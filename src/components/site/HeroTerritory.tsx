import { BRAZIL_STATES } from "./brazil-map-data";
import coast from "@/assets/maceio-coast.jpg.asset.json";

/** The native Alagoas outline is scaled uniformly, without cartographic decoration. */
export function HeroTerritory() {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <svg className="hero-territory" viewBox="425 166 49 32" role="img" aria-label="Silhueta geográfica de Alagoas">
      <defs><clipPath id="hero-alagoas-coast"><path d={alagoas.d} /></clipPath></defs>
      <path className="hero-territory-depth" d={alagoas.d} transform="translate(0.6 0.8)" />
      <path className="hero-territory-edge" d={alagoas.d} />
      <image href={coast.url} x="429.2" y="171.8" width="37" height="20.2" preserveAspectRatio="xMidYMid slice" clipPath="url(#hero-alagoas-coast)" />
      <path className="hero-territory-outline" d={alagoas.d} />
    </svg>
  );
}