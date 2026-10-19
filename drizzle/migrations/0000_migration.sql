create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create table public.metrics (
  status text primary key check (status in ('draft','published')),
  students integer check (students >= 0),
  channel_reach integer check (channel_reach >= 0),
  professionals integer check (professionals >= 0),
  institutions integer check (institutions >= 0),
  cities integer check (cities >= 0),
  participants integer check (participants >= 0),
  updated_at timestamptz,
  updated_by uuid,
  published_at timestamptz
);
grant select on public.metrics to anon, authenticated;
grant all on public.metrics to service_role;
alter table public.metrics enable row level security;
create policy "Public reads published metrics" on public.metrics for select to anon, authenticated using (status = 'published');
create policy "Admins read all metrics" on public.metrics for select to authenticated using (public.has_role(auth.uid(), 'admin'));
insert into public.metrics (status) values ('draft'), ('published');

create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  student_form_url text check (char_length(student_form_url) <= 500),
  teacher_form_url text check (char_length(teacher_form_url) <= 500),
  institution_form_url text check (char_length(institution_form_url) <= 500),
  general_form_url text check (char_length(general_form_url) <= 500),
  whatsapp_url text check (char_length(whatsapp_url) <= 500),
  contact_email text check (char_length(contact_email) <= 255),
  updated_at timestamptz,
  updated_by uuid
);
grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Public reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins update settings" on public.site_settings for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
insert into public.site_settings (id) values (1);

create table public.metric_history (
  id uuid primary key default gen_random_uuid(),
  status text not null,
  old_values jsonb,
  new_values jsonb,
  changed_at timestamptz not null default now(),
  changed_by uuid,
  changed_by_email text
);
grant select on public.metric_history to authenticated;
grant all on public.metric_history to service_role;
alter table public.metric_history enable row level security;
create policy "Admins read history" on public.metric_history for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Atomic save (draft or publish), admin-only
create or replace function public.save_metrics(
  _students integer, _channel_reach integer, _professionals integer,
  _institutions integer, _cities integer, _participants integer, _publish boolean
) returns void language plpgsql security definer set search_path = public as $$
declare
  _uid uuid := auth.uid();
  _email text := coalesce(auth.jwt() ->> 'email', null);
  _old jsonb;
  _new jsonb;
  _target text;
begin
  if _uid is null or not public.has_role(_uid, 'admin') then
    raise exception 'Acesso negado' using errcode = '42501';
  end if;
  if coalesce(_students,0) < 0 or coalesce(_channel_reach,0) < 0 or coalesce(_professionals,0) < 0
     or coalesce(_institutions,0) < 0 or coalesce(_cities,0) < 0 or coalesce(_participants,0) < 0 then
    raise exception 'Valores devem ser inteiros não negativos';
  end if;
  _new := jsonb_build_object('students',_students,'channel_reach',_channel_reach,'professionals',_professionals,
    'institutions',_institutions,'cities',_cities,'participants',_participants);
  foreach _target in array (case when _publish then array['draft','published'] else array['draft'] end) loop
    select jsonb_build_object('students',students,'channel_reach',channel_reach,'professionals',professionals,
      'institutions',institutions,'cities',cities,'participants',participants)
      into _old from public.metrics where status = _target;
    update public.metrics set students=_students, channel_reach=_channel_reach, professionals=_professionals,
      institutions=_institutions, cities=_cities, participants=_participants,
      updated_at=now(), updated_by=_uid,
      published_at = case when _target='published' then now() else published_at end
    where status = _target;
    insert into public.metric_history (status, old_values, new_values, changed_by, changed_by_email)
      values (_target, _old, _new, _uid, _email);
  end loop;
end $$;
revoke all on function public.save_metrics(integer,integer,integer,integer,integer,integer,boolean) from public, anon;
grant execute on function public.save_metrics(integer,integer,integer,integer,integer,integer,boolean) to authenticated;