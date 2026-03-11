-- ═══════════════════════════════════════════════════════════════
-- Gliffo Arena — Schema do banco de dados multiplayer
-- Criado em: 2026-03-11
-- ═══════════════════════════════════════════════════════════════

-- ── Salas ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS arena_rooms (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  code              CHAR(6)     UNIQUE NOT NULL,
  host_id           TEXT        NOT NULL,
  status            TEXT        NOT NULL DEFAULT 'lobby'   CHECK (status   IN ('lobby','playing','finished')),
  phase             TEXT        NOT NULL DEFAULT 'propose' CHECK (phase    IN ('propose','vote','confirm','feedback','between')),
  config            JSONB       NOT NULL DEFAULT '{"timer_propose":45,"timer_vote":20,"regress":false,"powerups":true}',
  current_turn      TEXT        NOT NULL DEFAULT 'A'       CHECK (current_turn IN ('A','B')),
  turn_number       INT         NOT NULL DEFAULT 0,
  phase_deadline    TIMESTAMPTZ,

  -- Nível de cada time (1=4L facil … 4=7L muito_dificil)
  team_a_level      INT         NOT NULL DEFAULT 1,
  team_b_level      INT         NOT NULL DEFAULT 1,

  -- Palavra atual de cada time (opaca para o adversário — honor system na UI)
  team_a_word       TEXT,
  team_b_word       TEXT,

  -- Acumuladores para desempate
  team_a_attempts   INT         NOT NULL DEFAULT 0,
  team_b_attempts   INT         NOT NULL DEFAULT 0,
  team_a_time_ms    BIGINT      NOT NULL DEFAULT 0,
  team_b_time_ms    BIGINT      NOT NULL DEFAULT 0,
  team_a_clutches   INT         NOT NULL DEFAULT 0,  -- acertos na 1ª tentativa
  team_b_clutches   INT         NOT NULL DEFAULT 0,

  -- Power-ups (fila, máx 3 por time)
  team_a_powerups   JSONB       NOT NULL DEFAULT '[]',
  team_b_powerups   JSONB       NOT NULL DEFAULT '[]',

  -- Efeitos ativos neste turno (ex: névoa, espelho)
  active_fx         JSONB       NOT NULL DEFAULT '{}',

  winner            TEXT,       -- 'A' | 'B' | 'draw'

  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Jogadores ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS arena_players (
  id                TEXT        NOT NULL,          -- UUID gerado no localStorage
  room_id           UUID        NOT NULL REFERENCES arena_rooms(id) ON DELETE CASCADE,
  nickname          TEXT        NOT NULL,
  team              TEXT                 CHECK (team IN ('A','B','spec')),
  is_host           BOOLEAN     NOT NULL DEFAULT false,
  online            BOOLEAN     NOT NULL DEFAULT true,
  joined_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (id, room_id)
);

-- ── Propostas de palavras ──────────────────────────────────────
-- Cada jogador submete UMA proposta por fase de proposta.
-- Votos são registrados como referência ao id da proposta.
CREATE TABLE IF NOT EXISTS arena_proposals (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id           UUID        NOT NULL REFERENCES arena_rooms(id) ON DELETE CASCADE,
  turn_number       INT         NOT NULL,
  team              TEXT        NOT NULL,
  player_id         TEXT        NOT NULL,
  nickname          TEXT        NOT NULL,
  word              TEXT        NOT NULL,
  proposed_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Votos nas propostas ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS arena_votes (
  room_id           UUID        NOT NULL REFERENCES arena_rooms(id) ON DELETE CASCADE,
  turn_number       INT         NOT NULL,
  team              TEXT        NOT NULL,
  player_id         TEXT        NOT NULL,
  proposal_id       UUID        NOT NULL REFERENCES arena_proposals(id) ON DELETE CASCADE,
  voted_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, turn_number, team, player_id)
);

-- ── Índices ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_arena_rooms_code       ON arena_rooms(code);
CREATE INDEX IF NOT EXISTS idx_arena_players_room     ON arena_players(room_id);
CREATE INDEX IF NOT EXISTS idx_arena_proposals_room   ON arena_proposals(room_id, turn_number, team);
CREATE INDEX IF NOT EXISTS idx_arena_votes_room       ON arena_votes(room_id, turn_number, team);

-- ── Trigger: updated_at automático ────────────────────────────
CREATE OR REPLACE FUNCTION arena_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_arena_rooms_updated_at ON arena_rooms;
CREATE TRIGGER trg_arena_rooms_updated_at
  BEFORE UPDATE ON arena_rooms
  FOR EACH ROW EXECUTE FUNCTION arena_set_updated_at();

-- ── Limpeza automática: salas inativas > 24h ──────────────────
-- (executar via pg_cron ou manualmente se necessário)
-- DELETE FROM arena_rooms WHERE updated_at < now() - INTERVAL '24 hours';

-- ── Realtime ──────────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE arena_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE arena_players;
ALTER PUBLICATION supabase_realtime ADD TABLE arena_proposals;
ALTER PUBLICATION supabase_realtime ADD TABLE arena_votes;

-- ── RLS — permissivo (honor system) ──────────────────────────
ALTER TABLE arena_rooms      ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_players    ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_proposals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_votes      ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_all_arena_rooms"     ON arena_rooms;
DROP POLICY IF EXISTS "anon_all_arena_players"   ON arena_players;
DROP POLICY IF EXISTS "anon_all_arena_proposals" ON arena_proposals;
DROP POLICY IF EXISTS "anon_all_arena_votes"     ON arena_votes;

CREATE POLICY "anon_all_arena_rooms"     ON arena_rooms     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_arena_players"   ON arena_players   FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_arena_proposals" ON arena_proposals FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_arena_votes"     ON arena_votes     FOR ALL TO anon USING (true) WITH CHECK (true);
