import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import {
  METRIC_FIELDS, type MetricKey, type MetricsRow, type SiteSettings,
  metricInputSchema, settingsSchema, formatDateTime,
} from "@/lib/site-data";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel administrativo — REDE SURURU" },
      { name: "description", content: "Área restrita para gestão dos indicadores da REDE SURURU." },
      { property: "og:title", content: "Painel administrativo — REDE SURURU" },
      { property: "og:description", content: "Área restrita da REDE SURURU." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="border-b bg-surface">
        <div className="container-site flex h-14 items-center justify-between gap-3">
          <Link to="/" aria-label="Ir para o site"><Logo className="h-8 w-auto" /></Link>
          {session && (
            <div className="flex min-w-0 items-center gap-2">
              <span className="hidden truncate text-sm text-muted-foreground sm:inline">{session.user.email}</span>
              <Button size="sm" variant="ghost" onClick={() => supabase.auth.signOut()}>
                <LogOut /> Sair
              </Button>
            </div>
          )}
        </div>
      </header>
      <main className="container-site py-8">
        {session === undefined ? <Spinner /> : session ? <AdminGate userId={session.user.id} /> : <LoginForm />}
      </main>
    </div>
  );
}

function Spinner() {
  return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-accent" aria-label="Carregando" /></div>;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) setError("E-mail ou senha incorretos.");
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-xl border bg-surface p-6">
      <h1 className="text-xl font-bold">Acesso restrito</h1>
      <p className="text-sm text-muted-foreground">Entre com a conta de administrador da REDE SURURU.</p>
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="animate-spin" />} Entrar
      </Button>
    </form>
  );
}

function AdminGate({ userId }: { userId: string }) {
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["is-admin", userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (error) throw error;
      return !!data;
    },
  });
  if (isLoading) return <Spinner />;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-md rounded-xl border bg-surface p-6 text-sm">
        <h1 className="text-lg font-bold">Sem permissão de administrador</h1>
        <p className="mt-2 text-muted-foreground">
          Sua conta está conectada, mas ainda não tem permissão para editar o painel. Solicite a liberação ao
          responsável pela REDE SURURU.
        </p>
      </div>
    );
  return <Dashboard />;
}

const TABS = [
  { id: "overview", label: "Visão geral" },
  { id: "metrics", label: "Indicadores" },
  { id: "links", label: "Links" },
  { id: "history", label: "Histórico" },
] as const;

function Dashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const metrics = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metrics").select("*");
      if (error) throw error;
      const rows = (data ?? []) as MetricsRow[];
      return { draft: rows.find((r) => r.status === "draft"), published: rows.find((r) => r.status === "published") };
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold">Painel administrativo</h1>
      <div role="tablist" aria-label="Seções do painel" className="mt-5 flex gap-1 overflow-x-auto border-b">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`-mb-px shrink-0 border-b-2 px-3 py-2 text-sm font-medium ${tab === t.id ? "border-accent text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {metrics.isLoading ? <Spinner /> : metrics.isError ? (
          <p className="text-sm text-destructive">Erro ao carregar indicadores.</p>
        ) : (
          <>
            {tab === "overview" && <Overview draft={metrics.data?.draft} published={metrics.data?.published} />}
            {tab === "metrics" && <MetricsForm draft={metrics.data?.draft} />}
            {tab === "links" && <LinksForm />}
            {tab === "history" && <History />}
          </>
        )}
      </div>
    </div>
  );
}

function differs(a?: MetricsRow, b?: MetricsRow) {
  return METRIC_FIELDS.some((f) => (a?.[f.key] ?? null) !== (b?.[f.key] ?? null));
}

function Overview({ draft, published }: { draft?: MetricsRow | undefined; published?: MetricsRow | undefined }) {
  const pending = differs(draft, published);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <p><span className="text-muted-foreground">Última publicação:</span> <strong>{formatDateTime(published?.published_at)}</strong></p>
        <p><span className="text-muted-foreground">Último rascunho salvo:</span> <strong>{formatDateTime(draft?.updated_at)}</strong></p>
        <p>
          <span className="text-muted-foreground">Status:</span>{" "}
          <strong className={pending ? "text-highlight-foreground" : "text-success"}>
            {pending ? "Há alterações em rascunho não publicadas" : "Público em dia com o rascunho"}
          </strong>
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-surface">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr><th className="p-3">Indicador</th><th className="p-3 text-right">Publicado</th><th className="p-3 text-right">Rascunho</th></tr>
          </thead>
          <tbody>
            {METRIC_FIELDS.map((f) => (
              <tr key={f.key} className="border-t">
                <td className="p-3">{f.label}</td>
                <td className="p-3 text-right tabular-nums">{published?.[f.key] ?? "—"}</td>
                <td className="p-3 text-right tabular-nums">{draft?.[f.key] ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">“—” significa sem valor informado; o site mostra “Em atualização”.</p>
    </div>
  );
}

function MetricsForm({ draft }: { draft?: MetricsRow | undefined }) {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<MetricKey, string>>(() =>
    Object.fromEntries(METRIC_FIELDS.map((f) => [f.key, draft?.[f.key]?.toString() ?? ""])) as Record<MetricKey, string>,
  );
  const [errors, setErrors] = useState<Partial<Record<MetricKey, string>>>({});

  const save = useMutation({
    mutationFn: async (publish: boolean) => {
      const toNum = (k: MetricKey) => (values[k].trim() === "" ? null : Number(values[k].trim()));
      const { error } = await supabase.rpc("save_metrics", {
        _students: toNum("students") as number, _channel_reach: toNum("channel_reach") as number,
        _professionals: toNum("professionals") as number, _institutions: toNum("institutions") as number,
        _cities: toNum("cities") as number, _participants: toNum("participants") as number, _publish: publish,
      });
      if (error) throw error;
      return publish;
    },
    onSuccess: (publish) => {
      toast.success(publish ? "Resultados publicados no site." : "Rascunho salvo. O site público não foi alterado.");
      qc.invalidateQueries({ queryKey: ["admin-metrics"] });
      qc.invalidateQueries({ queryKey: ["metrics"] });
      qc.invalidateQueries({ queryKey: ["metric-history"] });
    },
    onError: (e: Error) => toast.error(`Não foi possível salvar: ${e.message}`),
  });

  function submit(publish: boolean) {
    const errs: typeof errors = {};
    for (const f of METRIC_FIELDS) {
      const r = metricInputSchema.safeParse(values[f.key]);
      if (!r.success) errs[f.key] = r.error.issues[0]?.message ?? "Valor inválido.";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    save.mutate(publish);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl space-y-5" noValidate>
      <p className="text-sm text-muted-foreground">
        Deixe em branco o que ainda não foi apurado. O valor zero é aceito e será exibido como zero.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {METRIC_FIELDS.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key} className="leading-snug">{f.admin}</Label>
            <Input id={f.key} inputMode="numeric" pattern="[0-9]*" value={values[f.key]}
              aria-invalid={!!errors[f.key]} aria-describedby={errors[f.key] ? `${f.key}-err` : undefined}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
            {errors[f.key] && <p id={`${f.key}-err`} className="text-xs text-destructive">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" disabled={save.isPending} onClick={() => submit(false)}>
          {save.isPending && save.variables === false && <Loader2 className="animate-spin" />} Salvar como rascunho
        </Button>
        <Button type="button" variant="accent" disabled={save.isPending} onClick={() => submit(true)}>
          {save.isPending && save.variables === true && <Loader2 className="animate-spin" />} Publicar resultados
        </Button>
      </div>
    </form>
  );
}

const LINK_FIELDS: { key: keyof Omit<SiteSettings, "updated_at">; label: string; type?: string }[] = [
  { key: "student_form_url", label: "Formulário de estudantes" },
  { key: "teacher_form_url", label: "Formulário de professores" },
  { key: "institution_form_url", label: "Formulário de profissionais de instituições" },
  { key: "general_form_url", label: "Formulário geral (opcional)" },
  { key: "whatsapp_url", label: "Canal do WhatsApp" },
  { key: "contact_email", label: "E-mail de contato (opcional)", type: "email" },
];

function LinksForm() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (error) throw error;
      return data as SiteSettings;
    },
  });
  if (q.isLoading) return <Spinner />;
  if (q.isError || !q.data) return <p className="text-sm text-destructive">Erro ao carregar links.</p>;
  return <LinksEditor initial={q.data} onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-settings"] }); qc.invalidateQueries({ queryKey: ["site_settings"] }); }} />;
}

function LinksEditor({ initial, onSaved }: { initial: SiteSettings; onSaved: () => void }) {
  const [values, setValues] = useState(() => Object.fromEntries(LINK_FIELDS.map((f) => [f.key, initial[f.key] ?? ""])) as Record<string, string>);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const save = useMutation({
    mutationFn: async (payload: Record<string, string | null>) => {
      const { data: u } = await supabase.auth.getUser();
      const { data, error } = await supabase.from("site_settings")
        .update({ ...payload, updated_at: new Date().toISOString(), updated_by: u.user?.id ?? null })
        .eq("id", 1).select("id");
      if (error) throw error;
      if (!data?.length) throw new Error("Sem permissão para alterar.");
    },
    onSuccess: () => { toast.success("Links atualizados."); onSaved(); },
    onError: (e: Error) => toast.error(`Não foi possível salvar: ${e.message}`),
  });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = settingsSchema.safeParse(values);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    save.mutate(Object.fromEntries(Object.entries(r.data).map(([k, v]) => [k, v === "" ? null : v])));
  }
  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4" noValidate>
      <p className="text-sm text-muted-foreground">
        Links vazios aparecem no site como “em breve”. Use endereços completos começando com https://.
      </p>
      {LINK_FIELDS.map((f) => (
        <div key={f.key} className="space-y-1.5">
          <Label htmlFor={f.key}>{f.label}</Label>
          <Input id={f.key} type={f.type ?? "url"} value={values[f.key]} aria-invalid={!!errors[f.key]}
            placeholder={f.type === "email" ? "" : "https://"}
            onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
          {errors[f.key] && <p className="text-xs text-destructive">{errors[f.key]}</p>}
        </div>
      ))}
      <p className="text-xs text-muted-foreground">Última alteração: {formatDateTime(initial.updated_at)}</p>
      <Button type="submit" disabled={save.isPending}>{save.isPending && <Loader2 className="animate-spin" />} Salvar links</Button>
    </form>
  );
}

type HistoryRow = { id: string; status: string; old_values: Record<string, number | null> | null; new_values: Record<string, number | null> | null; changed_at: string; changed_by_email: string | null };

function History() {
  const q = useQuery({
    queryKey: ["metric-history"],
    queryFn: async () => {
      const { data, error } = await supabase.from("metric_history").select("*").order("changed_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as unknown as HistoryRow[];
    },
  });
  if (q.isLoading) return <Spinner />;
  if (q.isError) return <p className="text-sm text-destructive">Erro ao carregar histórico.</p>;
  if (!q.data?.length) return <p className="text-sm text-muted-foreground">Nenhuma alteração registrada ainda.</p>;
  return (
    <ul className="space-y-3">
      {q.data.map((h) => (
        <li key={h.id} className="rounded-xl border bg-surface p-4 text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <strong>{formatDateTime(h.changed_at)}</strong>
            <span className={`rounded-full px-2 py-0.5 text-xs ${h.status === "published" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
              {h.status === "published" ? "Publicado" : "Rascunho"}
            </span>
            <span className="text-muted-foreground">{h.changed_by_email ?? "usuário não identificado"}</span>
          </div>
          <dl className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
            {METRIC_FIELDS.map((f) => {
              const o = h.old_values?.[f.key] ?? null, n = h.new_values?.[f.key] ?? null;
              return (
                <div key={f.key} className={`flex justify-between gap-2 ${o !== n ? "font-medium" : "text-muted-foreground"}`}>
                  <dt className="truncate">{f.label}</dt>
                  <dd className="shrink-0 tabular-nums">{o ?? "—"} → {n ?? "—"}</dd>
                </div>
              );
            })}
          </dl>
        </li>
      ))}
    </ul>
  );
}
