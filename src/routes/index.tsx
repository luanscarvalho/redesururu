import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, BookOpen, Building2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { NetworkArt } from "@/components/site/NetworkArt";
import { ExternalCta } from "@/components/site/ExternalCta";
import { ActingFront } from "@/components/site/ActingFront";
import { ParticipationPanel } from "@/components/site/ParticipationPanel";
import photoTelescope from "@/assets/sinpete-telescopio.jpg.asset.json";
import photoModel from "@/assets/sinpete-maquete.jpg.asset.json";
import photoTech from "@/assets/sinpete-tecnologia.jpg.asset.json";
import photoEvent from "@/assets/inovacao-evento.jpg.asset.json";
import photoSebrae from "@/assets/sebrae-alagoas.png.asset.json";
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
      <svg className="hero-transition" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sururu-transition-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="220">
            <stop className="transition-stop-warm" offset="0" />
            <stop className="transition-stop-light" offset="0.42" />
            <stop className="transition-stop-mid" offset="0.73" />
            <stop className="transition-stop-deep" offset="1" />
          </linearGradient>
          <filter id="sururu-transition-soften" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <mask id="sururu-transition-mask" className="hero-transition-mask" maskUnits="userSpaceOnUse" x="-40" y="-60" width="1520" height="360">
            <path filter="url(#sururu-transition-soften)" d="M-40 60 C225 159 470 194 730 185 C1020 182 1250 127 1480 28 L1480 300 L-40 300 Z" />
          </mask>
        </defs>
        <rect className="hero-transition-area" x="0" y="0" width="1440" height="240" mask="url(#sururu-transition-mask)" />
      </svg>
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
            <img className="mosaic-a" src={photoModel.url} width={1920} height={1280} alt="Maquete didática sobre o ciclo do carbono" fetchPriority="high" />
            <img className="mosaic-b" src={photoTelescope.url} width={1920} height={1280} alt="Estudante observando por um telescópio em estande de astronomia" loading="lazy" />
            <img className="mosaic-c" src={photoEvent.url} width={1920} height={1279} alt="Estudantes reunidos em roda durante encontro do ecossistema de inovação" loading="lazy" />
            <img className="mosaic-d" src={photoTech.url} width={1280} height={1920} alt="Participante digitando em um notebook durante competição de programação" loading="lazy" />
          </div>
          {chips.map((c) => <span key={c.t} className={`hero-chip ${c.c}`} aria-hidden="true">+ {c.t}</span>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const fronts: { n: string; t: string; d: string; points?: string[] }[] = [
    {
      n: "01",
      t: "Mobilização",
      d: "Apresentar o ecossistema por meio de oficinas, palestras e eventos já existentes e outras ações.",
    },
    {
      n: "02",
      t: "Escuta",
      d: "Formulário que vai além de um cadastro: identificamos interesses, necessidades, competências e oportunidades, visando atuar e realizar melhores conexões.",
    },
    {
      n: "03",
      t: "Integração",
      d: "Canal no WhatsApp, não para ser mais um grupo sem finalidade concreta, mas para que os atores possam divulgar oportunidades e que possamos estimular a participação nas ações. Além de outros formatos de promoção, como newsletter e encontros.",
    },
    {
      n: "04",
      t: "Articulação",
      d: "Em vez de criar do zero ações para cada demanda, com as informações que colhemos:",
      points: [
        "Conectamos quem já pode respondê-las.",
        "A partir das necessidades, estimulamos a criação de iniciativas.",
      ],
    },
  ];

  return (
    <section id="projeto" className="sururu-about">
      <div className="container-site py-14 sm:py-20">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="md:flex md:flex-col">
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
          <img
            className="about-photo mt-6 aspect-[16/9] w-full object-cover md:aspect-auto md:h-full md:min-h-0 md:flex-1"
            src={photoSebrae.url}
            width={1536}
            height={868}
            loading="lazy"
            alt="Palco com painel “Ecossistema Local de Inovação do Nordeste” e público sentado em pufes coloridos durante evento de inovação"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Como pretendemos atuar</p>
          <ol className="acting-fronts mt-3">
            {fronts.map((f) => <ActingFront key={f.n} {...f} />)}
          </ol>
        </div>
      </div>
      </div>
    </section>
  );
}

type Aud = { n: string; icon: LucideIcon; title: string; text: string; cta: string; href?: string | null | undefined };

function Audiences({ settings }: { settings?: import("@/lib/site-data").SiteSettings | null | undefined }) {
  const items: Aud[] = [
    {
      n: "01", icon: GraduationCap, title: "Você que estuda", cta: "Sou estudante", href: settings?.student_form_url,
      text: "Estuda no ensino técnico, na graduação ou na pós-graduação? Encontre oportunidades e compartilhe o que você busca.",
    },
    {
      n: "02", icon: BookOpen, title: "Você que ensina ou administra em uma instituição de ensino", cta: "Sou professor(a) ou gestor(a)", href: settings?.teacher_form_url,
      text: "É professor(a), pesquisador(a) ou atua na gestão de uma instituição de ensino técnico ou superior? Compartilhe projetos, interesses e possibilidades de colaboração.",
    },
    {
      n: "03", icon: Building2, title: "Você que atua em uma instituição do ecossistema de inovação", cta: "Represento uma instituição", href: settings?.institution_form_url,
      text: "Trabalha em uma organização pública ou privada ligada à inovação, ciência, tecnologia, empreendedorismo ou impacto? Ajude a aproximar iniciativas e oportunidades da comunidade acadêmica.",
    },
  ];
  return (
    <section id="participar" className="border-y bg-surface py-14 sm:py-20">
      <div className="container-site">
        <SectionHead eyebrow="Quem pode participar?" title="Cada pessoa contribui de um jeito." />
        <div className="participation-panels mt-8">
          {items.map((a) => <ParticipationPanel key={a.n} {...a} />)}
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
      <NetworkArt className="mx-auto w-full max-w-lg" label="Mapa de Alagoas com pontos conectados no contorno geográfico e no interior do estado" />
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
