alter table public.daily_schedule
  rename column nivel to difficulty;

alter table public.daily_schedule
  rename column nivel_label to difficulty_label;

alter table public.daily_schedule
  drop constraint if exists daily_schedule_nivel_check;

alter table public.daily_schedule
  add constraint daily_schedule_difficulty_check
  check (difficulty in ('facil', 'medio', 'dificil', 'muito_dificil'));