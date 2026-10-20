DROP POLICY IF EXISTS "Public reads settings" ON public.site_settings;
CREATE POLICY "Public reads settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (id = 1);
REVOKE SELECT ON public.site_settings FROM anon;
GRANT SELECT (id, student_form_url, teacher_form_url, institution_form_url, general_form_url, whatsapp_url, contact_email, updated_at) ON public.site_settings TO anon;