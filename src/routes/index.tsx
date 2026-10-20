import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, BookOpen, Building2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NetworkArt } from "@/components/site/NetworkArt";
import { ExternalCta } from "@/components/site/ExternalCta";
import photoStudent from "@/assets/sinpete-estudante.jpg.asset.json";
import photoTelescope from "@/assets/sinpete-telescopio.jpg.asset.json";
import photoModel from "@/assets/sinpete-maquete.jpg.asset.json";
import photoTech from "@/assets/sinpete-tecnologia.jpg.asset.json";
import {
  METRIC_FIELDS, publishedMetricsQuery, settingsQuery, hasAnyMetric, formatDate,
} from "@/lib/site-data";

const TITLE = "REDE SURURU — Conectando a comunidade acadêmica à inovação em Alagoas";
const DESC =
  "Iniciativa independente que aproxima estudantes, professores, profissionais e instituições do ecossistema de inovação de Alagoas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const settings = useQuery(settingsQuery).data;
  return (
    <div className="min-h-screen">
      <Header />
      <main id="inicio">
        <Hero />
        <About />
        <Audiences settings={settings} />
        <Results />
        <HowItWorks formUrl={settings?.general_form_url} whatsapp={settings?.whatsapp_url} />
        <Territory />
        <FinalCta settings={settings} />
      </main>
      <Footer settings={settings} />
    </div>
  );
}

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      {children && <div className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">{children}</div>}
    </div>
  );
}

function Hero() {
  const chips = [
    { t: "Educação", c: "chip-a" },
    { t: "Ciência", c: "chip-b" },
    { t: "Tecnologia", c: "chip-c" },
    { t: "Inovação", c: "chip-d" },
  ];
  return (
    <section className="sururu-hero">
      <div className="hero-bands" aria-hidden="true">
        <span className="band band-1" /><span className="band band-2" /><span className="band band-3" />
        <span className="band band-4" /><span className="band band-5" />
      </div>
      <div className="container-site hero-composition">
        <div className="hero-text">
          <h1 className="hero-title font-bold">
            Conectando a comunidade acadêmica às oportunidades <span className="hero-line-finale">de inovação.</span>
          </h1>
          <p className="hero-main-copy">
            A REDE SURURU aproxima estudantes, professores, profissionais e instituições para fortalecer as conexões
            entre educação, ciência, tecnologia, impacto e inovação em Alagoas.
          </p>
          <p className="hero-secondary-copy">
            A iniciativa começa no ecossistema alagoano, com a perspectiva de ampliar sua atuação para outros
            territórios no futuro.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg"><a href="#participar">Quero participar</a></Button>
            <Button asChild size="lg" variant="outline"><a href="#resultados">Conheça os resultados</a></Button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-mosaic">
            <img className="mosaic-a" src={photoStudent.url} width={1920} height={1280} alt="Estudante sorrindo em estande de projeto de extensão universitária" fetchPriority="high" />
            <img className="mosaic-b" src={photoTelescope.url} width={1920} height={1280} alt="Estudante observando por um telescópio em estande de astronomia" loading="lazy" />
            <img className="mosaic-c" src={photoModel.url} width={1920} height={1280} alt="Maquete didática sobre o ciclo do carbono" loading="lazy" />
            <img className="mosaic-d" src={photoTech.url} width={1280} height={1920} alt="Participante digitando em um notebook durante competição de programação" loading="lazy" />
          </div>
          {chips.map((c) => <span key={c.t} className={`hero-chip ${c.c}`} aria-hidden="true">+ {c.t}</span>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const fronts = [
    { n: "01", t: "Conectar", d: "Aproximar pessoas, instituições e oportunidades." },
    { n: "02", t: "Informar", d: "Compartilhar editais, eventos, programas, bolsas e outras iniciativas." },
    { n: "03", t: "Articular", d: "Identificar demandas e estimular ações mais alinhadas às necessidades da comunidade." },
  ];
  return (
    <section id="projeto" className="container-site py-14 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <SectionHead eyebrow="O que é a REDE SURURU?" title="Mais conexões, mais oportunidades.">
          <p>
            A REDE SURURU é uma iniciativa independente que busca aproximar a comunidade acadêmica das oportunidades
            e dos atores do ecossistema de inovação de Alagoas.
          </p>
          <p className="mt-3">
            Além de divulgar oportunidades, a rede busca compreender os interesses, as necessidades e os desafios de
            quem estuda, ensina, pesquisa e desenvolve iniciativas no território. Essas informações podem contribuir
            para orientar ações, aproximar parceiros e identificar possibilidades de colaboração.
          </p>
        </SectionHead>
        <div>
          <p className="text-sm font-semibold text-primary">Como pretendemos atuar</p>
          <ol className="mt-3 divide-y border-y">
            {fronts.map((f) => (
              <li key={f.n} className="flex gap-4 py-4">
                <span className="text-sm font-semibold text-accent tabular-nums">{f.n}</span>
                <div>
                  <p className="font-semibold">{f.t}</p>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

type Aud = { icon: LucideIcon; title: string; text: string; cta: string; href?: string | null | undefined; tone: string };

function Audiences({ settings }: { settings?: import("@/lib/site-data").SiteSettings | null | undefined }) {
  const items: Aud[] = [
    {
      icon: GraduationCap, title: "Você que estuda.", cta: "Sou estudante", href: settings?.student_form_url,
      tone: "border-t-accent",
      text: "Compartilhe seus interesses, objetivos e oportunidades que gostaria de encontrar. Sua perspectiva ajuda a entender o que faz diferença para quem está na formação técnica, na graduação ou na pós-graduação.",
    },
    {
      icon: BookOpen, title: "Você que ensina e pesquisa.", cta: "Sou professor(a)", href: settings?.teacher_form_url,
      tone: "border-t-primary",
      text: "Apresente suas áreas de atuação, pesquisas, projetos e possibilidades de colaboração. Se você possui uma iniciativa estruturada como empresa ou organização, com ou sem fins lucrativos, considere também o cadastro como profissional de instituição.",
    },
    {
      icon: Building2, title: "Você que atua em uma instituição.", cta: "Represento uma instituição", href: settings?.institution_form_url,
      tone: "border-t-highlight",
      text: "Você não precisa ser gestor ou líder da área. Pode contribuir compartilhando oportunidades, estabelecendo contatos ou aproximando sua instituição da comunidade acadêmica.",
    },
  ];
  return (
    <section id="participar" className="border-y bg-surface py-14 sm:py-20">
      <div className="container-site">
        <SectionHead eyebrow="Quem pode participar?" title="Cada pessoa contribui de um jeito." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((a) => (
            <article key={a.cta} className={`flex flex-col rounded-xl border border-t-4 bg-background p-5 ${a.tone}`}>
              <a.icon className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
              <ExternalCta href={a.href} className="mt-5 self-start">{a.cta}</ExternalCta>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const { data, isLoading, isError } = useQuery(publishedMetricsQuery);
  const ready = hasAnyMetric(data);
  const date = formatDate(data?.published_at);
  return (
    <section id="resultados" className="container-site py-14 sm:py-20">
      <SectionHead eyebrow="Resultados" title="A rede em números.">
        <p>
          Acompanhe o crescimento da REDE SURURU e sua presença na comunidade acadêmica e no ecossistema de inovação
          de Alagoas.
        </p>
      </SectionHead>

      {!isLoading && !isError && !ready && (
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
          <span className="h-2 w-2 rounded-full bg-highlight" aria-hidden />
          Os primeiros resultados estão sendo consolidados.
        </p>
      )}
      {isError && <p className="mt-6 text-sm text-destructive">Não foi possível carregar os indicadores agora.</p>}

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-3">
        {METRIC_FIELDS.map((f) => {
          const v = data?.[f.key];
          return (
            <div key={f.key} className="bg-surface p-4 sm:p-6">
              <dt className="text-sm font-semibold text-primary">{f.label}</dt>
              <dd className="mt-2 text-2xl font-bold tabular-nums sm:text-3xl">
                {isLoading ? (
                  <span className="inline-block h-7 w-16 animate-pulse rounded bg-muted" aria-label="Carregando" />
                ) : v === null || v === undefined ? (
                  <span className="text-base font-medium text-muted-foreground">Em atualização</span>
                ) : (
                  v.toLocaleString("pt-BR")
                )}
              </dd>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">{f.hint}</dd>
            </div>
          );
        })}
      </dl>
      <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p className="max-w-2xl">
          Os indicadores são atualizados periodicamente com base nos registros da REDE SURURU. O alcance do canal
          corresponde à maior quantidade de visualizações observada em uma publicação, e não à soma de todas as
          visualizações.
        </p>
        {ready && date && <p className="shrink-0 font-medium">Última atualização: {date}</p>}
      </div>
    </section>
  );
}

function HowItWorks({ formUrl, whatsapp }: { formUrl?: string | null | undefined; whatsapp?: string | null | undefined }) {
  const steps = [
    { t: "Cadastre-se", d: "Compartilhe suas informações, interesses e necessidades pelo formulário." },
    { t: "Conecte-se", d: "Acompanhe o canal da REDE SURURU para conhecer oportunidades." },
    { t: "Participe", d: "Aproveite iniciativas e identifique possibilidades de conexão e colaboração." },
  ];
  return (
    <section className="border-y bg-primary py-14 text-primary-foreground sm:py-20">
      <div className="container-site">
        <p className="eyebrow !text-highlight">Como funciona</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Fazer parte é simples.</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.t} className="flex gap-4 md:flex-col md:gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-highlight text-sm font-bold text-highlight">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-primary-foreground/75">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex flex-wrap gap-3">
          <ExternalCta href={formUrl} variant="highlight">Preencher o formulário</ExternalCta>
          <ExternalCta href={whatsapp} variant="accent">Entrar no canal do WhatsApp</ExternalCta>
        </div>
      </div>
    </section>
  );
}

function Territory() {
  return (
    <section className="container-site grid items-center gap-8 py-14 sm:py-20 md:grid-cols-2">
      <SectionHead eyebrow="Território e expansão" title="Começamos em Alagoas. Queremos conectar outros territórios.">
        <p>
          A REDE SURURU nasce com o olhar voltado ao ecossistema de inovação de Alagoas, buscando aproximar
          instituições, pessoas e oportunidades que muitas vezes não se encontram.
        </p>
        <p className="mt-3">
          A proposta é construir uma experiência que possa inspirar conexões semelhantes em outros territórios,
          respeitando as características e as necessidades de cada contexto.
        </p>
      </SectionHead>
      <NetworkArt className="mx-auto w-full max-w-sm" label="Ilustração de pontos conectados em Alagoas, com uma conexão tracejada indicando expansão futura" />
    </section>
  );
}

function FinalCta({ settings }: { settings?: import("@/lib/site-data").SiteSettings | null | undefined }) {
  return (
    <section className="file-pattern border-t py-14 sm:py-16">
      <div className="container-site max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">As próximas conexões também podem começar com você.</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted-foreground">
          Se você estuda, ensina, pesquisa ou atua em uma instituição, sua participação pode ajudar a fortalecer as
          conexões do ecossistema de inovação de Alagoas.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <ExternalCta size="sm" href={settings?.student_form_url}>Sou estudante</ExternalCta>
          <ExternalCta size="sm" variant="accent" href={settings?.teacher_form_url}>Sou professor(a)</ExternalCta>
          <ExternalCta size="sm" variant="outline" href={settings?.institution_form_url}>Represento uma instituição</ExternalCta>
        </div>
      </div>
    </section>
  );
}
