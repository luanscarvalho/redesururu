import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Aviso de privacidade — REDE SURURU" },
      { name: "description", content: "Como a REDE SURURU trata as informações compartilhadas pelos participantes." },
      { property: "og:title", content: "Aviso de privacidade — REDE SURURU" },
      { property: "og:description", content: "Como a REDE SURURU trata as informações compartilhadas pelos participantes." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-surface">
        <div className="container-site flex h-14 items-center">
          <Link to="/" aria-label="Voltar ao início"><Logo className="h-8 w-auto" /></Link>
        </div>
      </header>
      <main className="container-site max-w-2xl py-12 text-[15px] leading-relaxed">
        <h1 className="text-2xl font-bold sm:text-3xl">Aviso de privacidade</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            A REDE SURURU é uma iniciativa independente. As informações compartilhadas nos formulários de cadastro
            são usadas para compreender interesses e necessidades da comunidade e para aproximar pessoas de
            oportunidades do ecossistema de inovação de Alagoas.
          </p>
          <p>
            Este site não publica dados pessoais, listas de participantes ou contatos individuais. Os indicadores
            exibidos são números agregados, sem identificação de pessoas.
          </p>
          <p>
            Para dúvidas ou para solicitar a correção ou exclusão das suas informações, utilize o contato indicado
            no rodapé do site.
          </p>
        </div>
        <Link to="/" className="mt-8 inline-block text-sm font-medium text-accent hover:underline">← Voltar ao início</Link>
      </main>
    </div>
  );
}
