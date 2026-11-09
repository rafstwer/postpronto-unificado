create type public.app_role as enum ('admin','user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- first user to sign up becomes admin
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_first_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create table public.kit_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  user_email text,
  kit_id text not null,
  status text not null default 'pending',
  payer_name text,
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  unique (user_id, kit_id)
);
grant select, insert, update on public.kit_purchases to authenticated;
grant all on public.kit_purchases to service_role;
alter table public.kit_purchases enable row level security;
create policy "read own or admin" on public.kit_purchases for select to authenticated
  using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "insert own pending" on public.kit_purchases for insert to authenticated
  with check (auth.uid() = user_id and status = 'pending');
create policy "admin update" on public.kit_purchases for update to authenticated
  using (public.has_role(auth.uid(),'admin'));

create table public.designs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  kit_id text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, kit_id)
);
grant select, insert, update, delete on public.designs to authenticated;
grant all on public.designs to service_role;
alter table public.designs enable row level security;
create policy "own designs" on public.designs for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "public read uploads" on storage.objects for select
  using (bucket_id = 'uploads');