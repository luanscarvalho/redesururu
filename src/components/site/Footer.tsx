import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import type { SiteSettings } from "@/lib/site-data";

export function Footer({ settings }: { settings?: SiteSettings | null | undefined }) {
  const form = settings?.general_form_url;
  return (
    <footer id="contato" className="border-t bg-surface">
      <div className="container-site grid gap-8 py-10 sm:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <Logo className="h-9 w-auto" />
          <p className="max-w-sm text-sm text-muted-foreground">
            Conectando a comunidade acadêmica às oportunidades de inovação.
          </p>
          <p className="text-xs text-muted-foreground">Uma iniciativa independente.</p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-col gap-2 text-sm">
          <span className="eyebrow mb-1">Contato e links</span>
          {form && <a className="text-primary hover:text-accent" href={form} target="_blank" rel="noopener noreferrer">Formulário de cadastro</a>}
          {settings?.whatsapp_url && <a className="text-primary hover:text-accent" href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer">Canal do WhatsApp</a>}
          {settings?.contact_email ? (
            <a className="text-primary hover:text-accent" href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
          ) : (
            <span className="text-muted-foreground">Contato em breve</span>
          )}
          <Link to="/privacidade" className="text-primary hover:text-accent">Aviso de privacidade</Link>
        </nav>
      </div>
      <div className="border-t">
        <p className="container-site py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} REDE SURURU
        </p>
      </div>
    </footer>
  );
}
