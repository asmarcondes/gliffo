create table if not exists public.daily_schedule (
  date date primary key,
  word text not null,
  nivel text not null check (nivel in ('facil', 'medio', 'dificil', 'muito_dificil')),
  nivel_label text not null,
  puzzle integer not null unique check (puzzle > 0),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.daily_schedule enable row level security;