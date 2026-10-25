import { useState } from "react";
import { Plus, Minus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExternalCta } from "@/components/site/ExternalCta";

type ParticipationPanelProps = {
  n: string;
  title: string;
  text: string;
  cta: string;
  href?: string | null | undefined;
  icon: LucideIcon;
};

/** Painel interativo de perfil de participação: clique revela a descrição e a ação. */
export function ParticipationPanel({ n, title, text, cta, href, icon: Icon }: ParticipationPanelProps) {
  const [open, setOpen] = useState(false);
  const bodyId = `participation-${n}`;

  return (
    <article className="participation-panel" data-open={open}>
      <Button
        variant="ghost"
        className="participation-trigger"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
      >
        <span className="participation-number tabular-nums">{n}</span>
        <span className="participation-heading">
          <Icon className="h-4 w-4" aria-hidden />
          <span className="participation-title">{title}</span>
        </span>
        {open ? <Minus aria-hidden /> : <Plus aria-hidden />}
      </Button>
      <div id={bodyId} className="participation-body" aria-hidden={!open}>
        <div className="participation-body-inner">
          <p>{text}</p>
          <ExternalCta href={href} size="sm" className="mt-4 self-start">{cta}</ExternalCta>
        </div>
      </div>
    </article>
  );
}
