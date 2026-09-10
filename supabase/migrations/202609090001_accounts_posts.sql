-- LongCont: cuentas verificadas, perfiles y publicaciones.
create extension if not exists citext;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username citext not null unique check (username ~ '^[a-z0-9_]{3,24}$'),
  display_name text not null check (char_length(display_name) between 3 and 80),
  role text not null default 'member' check (role in ('member', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 90),
  summary text not null check (char_length(summary) between 10 and 450),
  category text not null check (category in ('Noticia', 'Economía', 'Educación', 'Salud', 'Cultura', 'Historia', 'Gastronomía', 'Turismo', 'Festivales')),
  image_path text,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create index publications_public_feed on public.publications (published_at desc)
  where status = 'published';

alter table public.profiles enable row level security;
alter table public.publications enable row level security;

create policy "profiles are visible to signed-in users" on public.profiles
  for select to authenticated using (true);
create policy "users create their profile" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "users update their profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "published posts are public" on public.publications
  for select to anon, authenticated using (status = 'published' or author_id = auth.uid());
create policy "users submit their posts" on public.publications
  for insert to authenticated with check (author_id = auth.uid() and status = 'pending');
create policy "authors update pending posts" on public.publications
  for update to authenticated using (author_id = auth.uid() and status = 'pending')
  with check (author_id = auth.uid() and status = 'pending');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('publication-images', 'publication-images', true, 1048576, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "authenticated users upload publication images" on storage.objects
  for insert to authenticated with check (bucket_id = 'publication-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "publication images are public" on storage.objects
  for select to anon, authenticated using (bucket_id = 'publication-images');
create policy "users manage their images" on storage.objects
  for delete to authenticated using (bucket_id = 'publication-images' and owner_id = auth.uid()::text);
