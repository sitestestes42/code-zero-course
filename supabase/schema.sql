-- Execute este arquivo no SQL Editor do seu projeto Supabase.
-- O frontend usa apenas a chave anon pública e as políticas abaixo isolam os dados por usuário.

create table if not exists public.lesson_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.lesson_progress enable row level security;

drop policy if exists "alunos leem o proprio progresso" on public.lesson_progress;
create policy "alunos leem o proprio progresso"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

drop policy if exists "alunos criam o proprio progresso" on public.lesson_progress;
create policy "alunos criam o proprio progresso"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "alunos atualizam o proprio progresso" on public.lesson_progress;
create policy "alunos atualizam o proprio progresso"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.student_projects (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id text not null,
  published_url text,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, project_id)
);

alter table public.student_projects enable row level security;

drop policy if exists "alunos gerenciam os proprios projetos" on public.student_projects;
create policy "alunos gerenciam os proprios projetos"
  on public.student_projects for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
