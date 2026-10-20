/** A flat, editorial weave inspired by the interlaced paths of filé. */
export function HeroConnections() {
  return (
    <div className="hero-connections" role="img" aria-label="Uma trama de caminhos conecta pesquisa, bolsas, projetos e eventos a novas conexões.">
      <svg className="hero-weave" viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
        <g className="hero-weave-quiet" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M-40 180 130 10 350 230 570 10 790 230 1030-10M-40 100 130 270 350 50 570 270 790 50 1030 290" />
          <path d="M-40 140 130-30 350 190 570-30 790 190 1030-50M-40 60 130 230 350 10 570 230 790 10 1030 250" />
        </g>
        <g className="hero-weave-teal" fill="none" stroke="currentColor" strokeWidth="24" strokeLinejoin="round">
          <path d="M-30 192 115 60 300 198 505 40 705 198 920 40 1030 128" />
          <path d="M-30 68 115 200 300 62 505 220 705 62 920 220 1030 132" strokeWidth="12" />
        </g>
        <path className="hero-weave-yellow" d="M-30 192 115 60 300 198 505 40 705 198 920 40 1030 128" fill="none" stroke="currentColor" strokeWidth="3" pathLength="100" />
        <g className="hero-weave-nodes" fill="currentColor">
          <circle cx="115" cy="60" r="8" /><circle cx="300" cy="198" r="8" />
          <circle cx="505" cy="40" r="8" /><circle cx="705" cy="198" r="8" />
          <path d="m920 23 17 17-17 17-17-17Z" />
        </g>
      </svg>
      <span className="hero-connection-label hero-label-research">PESQUISA</span>
      <span className="hero-connection-label hero-label-grants">BOLSAS <span aria-hidden="true">↗</span></span>
      <span className="hero-connection-label hero-label-projects">PROJETOS</span>
      <span className="hero-connection-label hero-label-events">EVENTOS</span>
      <span className="hero-connection-label hero-label-new">NOVAS CONEXÕES <span aria-hidden="true">↗</span></span>
    </div>
  );
}