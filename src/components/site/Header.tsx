import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#projeto", label: "O projeto" },
  { href: "#participar", label: "Quem pode participar" },
  { href: "#resultados", label: "Resultados" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-site flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#inicio" aria-label="REDE SURURU — início" className="shrink-0">
          <Logo className="h-8 w-auto sm:h-9" />
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-primary/80 hover:text-accent">
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" variant="highlight">
            <a href="#participar">Quero fazer parte</a>
          </Button>
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-md text-primary md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="border-t bg-surface md:hidden">
          <div className="container-site flex flex-col py-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-2.5 text-[15px] font-medium text-primary">
                {l.label}
              </a>
            ))}
            <Button asChild variant="highlight" className="my-2">
              <a href="#participar" onClick={() => setOpen(false)}>Quero fazer parte</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
