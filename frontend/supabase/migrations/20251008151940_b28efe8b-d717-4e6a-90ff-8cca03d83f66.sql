-- Create enum for user roles
create type public.app_role as enum ('tourist', 'merchant', 'curator', 'analyst');

-- Create profiles table for user information
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create user_roles table (separate from profiles for security)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamp with time zone not null default now(),
  unique (user_id, role)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- Create security definer function to check roles (prevents RLS recursion)
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for profiles
create policy "Users can view all profiles"
  on public.profiles
  for select
  using (true);

create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- RLS Policies for user_roles
create policy "Users can view their own roles"
  on public.user_roles
  for select
  using (auth.uid() = user_id);

create policy "Only curators and analysts can view all roles"
  on public.user_roles
  for select
  using (
    public.has_role(auth.uid(), 'curator') or 
    public.has_role(auth.uid(), 'analyst')
  );

-- Trigger function to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', 'Usuario')
  );
  
  -- Assign default 'tourist' role to new users
  insert into public.user_roles (user_id, role)
  values (new.id, 'tourist');
  
  return new;
end;
$$;

-- Trigger to auto-create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger function for updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for profiles updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();