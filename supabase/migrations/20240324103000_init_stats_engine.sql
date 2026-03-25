create table public.user_stats (
  user_id          uuid references auth.users primary key,
  streak           int  default 0,
  max_streak       int  default 0,
  games_played     int  default 0,
  games_won        int  default 0,
  last_played      date,               -- anti-duplo: não conta 2x no mesmo dia
  distribution     jsonb default '{}', -- {"1":N,"2":N,"3":N,"4":N,"X":N}
  golden_total     int  default 0,     -- total de glifos dourados
  golden_consec    int  default 0,     -- sequência atual de dourados
  wknd_dates       jsonb default '[]', -- datas de vitória fim de semana
  updated_at       timestamptz default now()
);

alter table public.user_stats enable row level security;
create policy "owner" on public.user_stats
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.user_achievements (
  user_id    uuid references auth.users,
  ach_id     text,
  earned_at  timestamptz default now(),
  primary key (user_id, ach_id)
);

alter table public.user_achievements enable row level security;
create policy "owner" on public.user_achievements
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.user_timed_counters (
  user_id    uuid references auth.users,
  counter_id text,          -- ex: "night_owl", "early_bird"
  value      int default 0,
  primary key (user_id, counter_id)
);

alter table public.user_timed_counters enable row level security;
create policy "owner" on public.user_timed_counters
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table public.game_history (
  id           bigint generated always as identity primary key,
  user_id      uuid references auth.users,
  played_at    timestamptz default now(),
  puzzle_num   int,           -- #N (número do puzzle)
  puzzle_date  date,          -- data do puzzle (YYYY-MM-DD)
  word         text,          -- palavra do dia (só registrada após o jogo terminar)
  difficulty   text,          -- "facil" | "medio" | "dificil" | "muito_dificil"
  word_length  int,           -- 4–7
  attempts     int,           -- 1–4 (null = perdeu)
  won          boolean,
  used_key     boolean,       -- usou a Chave Decodificadora
  hard_mode    boolean,
  is_archive   boolean        -- true = jogo do arquivo, false = puzzle do dia
);

alter table public.game_history enable row level security;
create policy "owner" on public.game_history
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
