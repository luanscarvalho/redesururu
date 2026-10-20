import { createFileRoute } from "@tanstack/react-router";
import "@/hero-gallery.css";
import { HeroA, HeroB, HeroC, HeroD, HeroE, HeroF } from "@/components/site/HeroVariants";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Aberturas em comparação — REDE SURURU" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Galeria,
});

const ITEMS = [
  { id: "A", title: "Rede luminosa", note: "fundo azul-marinho, brilho e imagem emoldurada à direita", C: HeroA },
  { id: "B", title: "Mapa do Brasil", note: "mapa completo com Alagoas em amarelo e marca de conexão", C: HeroB },
  { id: "C", title: "Cartaz amarelo", note: "campo amarelo, tipografia escalonada e Alagoas em verde-petróleo", C: HeroC },
  { id: "D", title: "Curvas em camadas", note: "creme com curvas azul e amarela e Alagoas em três planos", C: HeroD },
  { id: "E", title: "Cena da inovação", note: "fotografia de fundo cobrindo a abertura inteira", C: HeroE },
  { id: "F", title: "Litoral de Maceió", note: "foto real recortada no contorno de Alagoas (atual)", C: HeroF },
];

function Galeria() {
  return (
    <div className="hg">
      {ITEMS.map(({ id, title, note, C }) => (
        <section className="hg-item" key={id}>
          <div className="hg-label">
            <b>{id}</b>
            <span>
              {title} — {note}
            </span>
          </div>
          <C />
        </section>
      ))}
    </div>
  );
}
