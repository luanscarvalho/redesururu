import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

export const METRIC_FIELDS = [
  { key: "students", label: "Estudantes alcançados", admin: "Estudantes cadastrados", hint: "Estudantes cadastrados na rede." },
  { key: "channel_reach", label: "Alcance do canal", admin: "Maior número de visualizações em uma publicação do canal", hint: "Maior número de visualizações em uma única publicação do canal de WhatsApp." },
  { key: "professionals", label: "Profissionais de instituições", admin: "Profissionais de instituições cadastrados", hint: "Profissionais cadastrados que representam instituições do ecossistema." },
  { key: "institutions", label: "Instituições de ensino", admin: "Instituições de ensino representadas", hint: "Instituições com pelo menos um estudante cadastrado." },
  { key: "cities", label: "Cidades alcançadas", admin: "Cidades representadas", hint: "Cidades com pelo menos uma pessoa cadastrada." },
  { key: "participants", label: "Pessoas cadastradas", admin: "Total de participantes únicos cadastrados", hint: "Total de participantes únicos na base da rede." },
] as const;

export type MetricKey = (typeof METRIC_FIELDS)[number]["key"];
export type MetricsRow = Record<MetricKey, number | null> & {
  status: string;
  updated_at: string | null;
  published_at: string | null;
};

export type SiteSettings = {
  student_form_url: string | null;
  teacher_form_url: string | null;
  institution_form_url: string | null;
  general_form_url: string | null;
  whatsapp_url: string | null;
  contact_email: string | null;
  updated_at: string | null;
};

export const publishedMetricsQuery = {
  queryKey: ["metrics", "published"],
  queryFn: async (): Promise<MetricsRow | null> => {
    const { data, error } = await supabase.from("metrics").select("*").eq("status", "published").maybeSingle();
    if (error) throw error;
    return data as MetricsRow | null;
  },
};

export const settingsQuery = {
  queryKey: ["site_settings"],
  queryFn: async (): Promise<SiteSettings | null> => {
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (error) throw error;
    return data as SiteSettings | null;
  },
};

export function hasAnyMetric(m: MetricsRow | null | undefined) {
  return !!m && METRIC_FIELDS.some((f) => m[f.key] !== null);
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export const metricInputSchema = z
  .string()
  .trim()
  .refine((v) => v === "" || /^\d+$/.test(v), "Use apenas números inteiros não negativos.")
  .refine((v) => v === "" || Number(v) <= 2_000_000_000, "Valor muito alto.");

const optionalUrl = z
  .string()
  .trim()
  .max(500, "Máximo de 500 caracteres.")
  .refine((v) => v === "" || /^https:\/\/[^\s]+\.[^\s]+/.test(v), "Informe um link completo começando com https://");

export const settingsSchema = z.object({
  student_form_url: optionalUrl,
  teacher_form_url: optionalUrl,
  institution_form_url: optionalUrl,
  general_form_url: optionalUrl,
  whatsapp_url: optionalUrl,
  contact_email: z
    .string()
    .trim()
    .max(255)
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "E-mail inválido."),
});
