import { Button } from "@/components/ui/button";
import { BRAZIL_STATES } from "./brazil-map-data";
import heroEcosystem from "@/assets/hero-ecosystem.jpg";
import heroScene from "@/assets/hero-innovation-scene.jpg";
import coast from "@/assets/maceio-coast.jpg.asset.json";

const COPY =
  "A REDE SURURU aproxima estudantes, professores, profissionais e instituições para fortalecer as conexões entre educação, ciência, tecnologia, impacto e inovação em Alagoas.";
const COPY2 =
  "A iniciativa começa no ecossistema alagoano, com a perspectiva de ampliar sua atuação para outros territórios no futuro.";

function Actions({ className = "" }: { className?: string }) {
  return (
    <div className={`hv-actions ${className}`}>
      <Button asChild size="lg" variant="highlight">
        <a href="#participar">Quero participar</a>
      </Button>
      <Button asChild size="lg" variant="outline" className="hv-results">
        <a href="#resultados">Conheça os resultados</a>
      </Button>
    </div>
  );
}

function Lines({ finale = false }: { finale?: boolean }) {
  return (
    <>
      <span className="hv-line">Conectando a</span> <span className="hv-line">comunidade acadêmica</span>{" "}
      <span className="hv-line">às oportunidades</span>{" "}
      <span className={`hv-line ${finale ? "hv-line-finale" : ""}`}>de inovação.</span>
    </>
  );
}

function Support({ finale }: { finale: boolean }) {
  return (
    <div className="hv-support">
      <p className="hv-copy">{COPY}</p>
      <p className="hv-copy2">{COPY2}</p>
      <Actions className={finale ? "" : ""} />
    </div>
  );
}

/** A — rede luminosa emoldurada sobre fundo azul-marinho. */
export function HeroA() {
  return (
    <section className="hv hv-a">
      <div aria-hidden className="hv-glow" />
      <div className="container-site hv-grid">
        <div>
          <p className="hv-badge">
            <span className="hv-ping" aria-hidden />
            Ecossistema de inovação · Alagoas
          </p>
          <h1 className="hv-title">
            Conectando a comunidade acadêmica às oportunidades de{" "}
            <span className="hv-mark">inovação</span>.
          </h1>
          <p className="hv-copy">{COPY}</p>
          <p className="hv-copy2">{COPY2}</p>
          <Actions />
        </div>
        <figure className="hv-figure">
          <img src={heroEcosystem} width={1024} height={768} alt="Rede de pontos luminosos conectados, remetendo ao ecossistema de inovação" />
          <div aria-hidden className="hv-fade" />
          <figcaption className="hv-caption">
            <span>Educação · Ciência · Tecnologia · Impacto</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** B — mapa do Brasil com Alagoas destacado. */
export function HeroB() {
  return (
    <section className="hv hv-b">
      <div className="container-site hv-composition">
        <h1 className="hv-title">
          Conectando a comunidade acadêmica às oportunidades de <em>inovação</em>.
        </h1>
        <svg className="hv-territory" viewBox="0 0 460 470" role="img" aria-label="Mapa do Brasil com Alagoas destacado em amarelo">
          <g className="hv-states">
            {BRAZIL_STATES.filter((state) => state.id !== "AL").map((state) => (
              <path key={state.id} d={state.d} />
            ))}
          </g>
          <path className="hv-alagoas" d={BRAZIL_STATES.find((state) => state.id === "AL")?.d} />
          <path className="hv-connection" d="M449 181 C490 222 470 313 397 339" />
          <path className="hv-marker" d="M445 162v-12m-6 6h12" />
        </svg>
        <div className="hv-support">
          <p className="hv-copy">{COPY}</p>
          <p className="hv-copy2">{COPY2}</p>
          <Actions />
        </div>
      </div>
    </section>
  );
}

function AlagoasSilhouette({ className, viewBox }: { className: string; viewBox: string }) {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <svg className={className} viewBox={viewBox} role="img" aria-label="Silhueta geográfica de Alagoas">
      <path d={alagoas.d} />
    </svg>
  );
}

/** C — cartaz amarelo com tipografia escalonada. */
export function HeroC() {
  return (
    <section className="hv hv-c">
      <div className="container-site hv-composition">
        <h1 className="hv-title">
          <Lines />
        </h1>
        <AlagoasSilhouette className="hv-territory" viewBox="428.7 171.3 38 21.2" />
        <Support finale={false} />
      </div>
    </section>
  );
}

/** D — curvas em camadas com Alagoas em três planos. */
export function HeroD() {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <section className="hv hv-d">
      <div className="container-site hv-composition">
        <div className="hv-stage">
          <svg className="hv-territory" viewBox="425 166 49 32" role="img" aria-label="Silhueta geográfica de Alagoas">
            <path className="hv-depth" d={alagoas.d} transform="translate(3 5)" />
            <path className="hv-edge" d={alagoas.d} transform="translate(1.5 2.5)" />
            <path className="hv-face" d={alagoas.d} />
          </svg>
          <h1 className="hv-title">
            <Lines finale />
          </h1>
        </div>
        <div className="hv-support">
          <p className="hv-copy">{COPY}</p>
          <p className="hv-copy2">{COPY2}</p>
          <Actions />
        </div>
      </div>
    </section>
  );
}

/** E — cena universitária em fotografia de fundo. */
export function HeroE() {
  return (
    <section className="hv hv-e">
      <img className="hv-scene" src={heroScene} width={1536} height={1024} alt="Cena ilustrativa de um planeta com livros, ciência e espaços universitários integrado a uma paisagem de inovação" />
      <div className="hv-shade" aria-hidden />
      <div className="container-site hv-composition">
        <div className="hv-stage">
          <h1 className="hv-title">
            <Lines finale />
          </h1>
        </div>
        <Support finale />
      </div>
      <div className="hv-bar" aria-hidden />
    </section>
  );
}

/** F — litoral de Maceió recortado no contorno de Alagoas. */
export function HeroF() {
  const alagoas = BRAZIL_STATES.find((state) => state.id === "AL");
  if (!alagoas) return null;
  return (
    <section className="hv hv-f">
      <img className="hv-scene" src={coast.url} width={850} height={560} alt="Litoral de Maceió, com mar turquesa, praia, coqueiros e prédios da orla" />
      <div className="hv-shade" aria-hidden />
      <svg className="hv-territory" viewBox="425 166 49 32" role="img" aria-label="Silhueta geográfica de Alagoas">
        <defs>
          <clipPath id="hg-alagoas-coast">
            <path d={alagoas.d} />
          </clipPath>
        </defs>
        <path className="hv-depth" d={alagoas.d} transform="translate(0.6 0.8)" />
        <path className="hv-edge" d={alagoas.d} />
        <image href={coast.url} x="429.2" y="171.8" width="37" height="20.2" preserveAspectRatio="xMidYMid slice" clipPath="url(#hg-alagoas-coast)" />
        <path className="hv-outline" d={alagoas.d} />
      </svg>
      <div className="container-site hv-composition">
        <div className="hv-stage">
          <h1 className="hv-title">
            <Lines finale />
          </h1>
        </div>
        <Support finale />
      </div>
    </section>
  );
}
