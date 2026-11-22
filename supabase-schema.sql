-- Run this file once in Supabase Dashboard > SQL Editor.
create table if not exists public.kkn_settings (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.kkn_links (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.kkn_schedules (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.kkn_letters (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.kkn_email_logs (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'kkn_settings', 'kkn_links', 'kkn_schedules', 'kkn_letters', 'kkn_email_logs'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
    execute format('drop policy if exists "authenticated can manage %1$s" on public.%1$s', table_name);
    execute format(
      'create policy "authenticated can manage %1$s" on public.%1$s for all to authenticated using (true) with check (true)',
      table_name
    );
  end loop;
end $$;

-- Enable realtime for shared updates between devices.
do $$
begin
  alter publication supabase_realtime add table
    public.kkn_settings,
    public.kkn_links,
    public.kkn_schedules,
    public.kkn_letters,
    public.kkn_email_logs;
exception
  when duplicate_object then null;
end $$;
