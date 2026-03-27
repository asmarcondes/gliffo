-- Fase 3: Sync Offline Avançado (Event Sourcing)
-- Função que calcula streak atual a partir do histórico de vitórias
-- Conta dias consecutivos terminando em hoje ou ontem (BRT)
CREATE OR REPLACE FUNCTION compute_streak(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_streak integer := 0;
  v_prev   date;
  v_date   date;
BEGIN
  -- Seleciona datas distintas de vitória, mais recentes primeiro
  FOR v_date IN
    SELECT DISTINCT puzzle_date::date AS d
      FROM game_history
     WHERE user_id = p_user_id
       AND won = TRUE
       AND is_archive = FALSE
       AND suspicious = FALSE
     ORDER BY d DESC
  LOOP
    IF v_streak = 0 THEN
      -- Primeira vitória: aceita hoje ou ontem (fuso BRT = UTC-3)
      IF v_date >= (NOW() AT TIME ZONE 'America/Sao_Paulo')::date - interval '1 day' THEN
        v_streak := 1;
        v_prev := v_date;
      ELSE
        EXIT; -- última vitória é muito antiga
      END IF;
    ELSE
      -- Continua streak se a data é exatamente um dia antes da anterior
      IF v_date = v_prev - interval '1 day' THEN
        v_streak := v_streak + 1;
        v_prev := v_date;
      ELSE
        EXIT; -- quebra de sequência
      END IF;
    END IF;
  END LOOP;

  RETURN v_streak;
END;
$$;


-- Fase 4: Bounding de Segurança no Edge (Anti-Cheat)
-- Adiciona rastreamento de tempo de jogo e flag anti-cheat
ALTER TABLE game_history
  ADD COLUMN IF NOT EXISTS elapsed_ms integer,
  ADD COLUMN IF NOT EXISTS suspicious boolean DEFAULT false;

COMMENT ON COLUMN game_history.elapsed_ms IS 'Tempo total da partida em milissegundos (do carregamento do puzzle até envio do resultado)';
COMMENT ON COLUMN game_history.suspicious IS 'TRUE se o tempo foi suspeito (< 10s para vitória)';
