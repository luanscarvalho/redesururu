import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

/** Botão para links configuráveis. Sem link cadastrado, fica indisponível. */
export function ExternalCta({ href, children, ...props }: { href?: string | null } & ButtonProps) {
  if (!href) {
    return (
      <Button {...props} disabled aria-disabled title="Link ainda não disponível">
        {children}
        <span className="text-xs font-normal opacity-80">(em breve)</span>
      </Button>
    );
  }
  return (
    <Button asChild {...props}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight aria-hidden />
      </a>
    </Button>
  );
}
