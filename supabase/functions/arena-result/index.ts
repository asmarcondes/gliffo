// arena-result — valida a tentativa two-pass e atualiza o estado da sala
// POST { roomId: string, team: "A" | "B", guess: string, turnNumber: number }
// Retorna { feedback, correct, word }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

type FeedbackItem = { letter: string; status: "correct" | "present" | "absent" };

// Algoritmo two-pass (mesmo lógica do index.html)
function twoPass(guess: string, target: string): FeedbackItem[] {
  const g = guess.toUpperCase();
  const t = target.toUpperCase();
  const result: FeedbackItem[] = g.split("").map((l) => ({ letter: l, status: "absent" }));

  // Contagem de letras disponíveis no target
  const available: Record<string, number> = {};
  for (const l of t) available[l] = (available[l] ?? 0) + 1;

  // Passagem 1: posições corretas
  for (let i = 0; i < g.length; i++) {
    if (g[i] === t[i]) {
      result[i].status = "correct";
      available[g[i]]--;
    }
  }

  // Passagem 2: letras presentes em posição errada
  for (let i = 0; i < g.length; i++) {
    if (result[i].status !== "correct" && (available[g[i]] ?? 0) > 0) {
      result[i].status = "present";
      available[g[i]]--;
    }
  }

  return result;
}

// Remove acentos para comparação (ex: "AÇÃO" → "ACAO")
function normalize(s: string): string {
  return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  let body: { roomId?: string; team?: string; guess?: string; turnNumber?: number };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const { roomId, team, guess } = body;
  if (!roomId || (team !== "A" && team !== "B") || !guess) {
    return new Response(
      JSON.stringify({ error: "roomId, team ('A'|'B') e guess são obrigatórios" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const sb = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Busca sala
  const { data: room, error: roomErr } = await sb
    .from("arena_rooms")
    .select(
      "team_a_word, team_b_word, team_a_level, team_b_level, team_a_attempts, team_b_attempts, status",
    )
    .eq("id", roomId)
    .single();

  if (roomErr || !room) {
    return new Response(JSON.stringify({ error: "Sala não encontrada" }), {
      status: 404,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  if (room.status === "finished") {
    return new Response(JSON.stringify({ error: "Partida já encerrada" }), {
      status: 409,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const targetWord: string = team === "A" ? room.team_a_word : room.team_b_word;
  if (!targetWord) {
    return new Response(JSON.stringify({ error: "Palavra do time não definida" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const normalizedGuess = normalize(guess);
  const normalizedTarget = normalize(targetWord);
  const feedback = twoPass(normalizedGuess, normalizedTarget);
  const correct = feedback.every((f) => f.status === "correct");

  // Monta atualização do room
  const update: Record<string, unknown> = { phase: "feedback" };

  if (team === "A") {
    update.team_a_attempts = (room.team_a_attempts ?? 0) + 1;
    if (correct) {
      const newLevel = (room.team_a_level ?? 1) + 1;
      update.team_a_level = newLevel;
      if (newLevel > 7) {
        update.winner = "A";
        update.status = "finished";
        update.phase = "finished";
      }
    }
  } else {
    update.team_b_attempts = (room.team_b_attempts ?? 0) + 1;
    if (correct) {
      const newLevel = (room.team_b_level ?? 1) + 1;
      update.team_b_level = newLevel;
      if (newLevel > 7) {
        update.winner = "B";
        update.status = "finished";
        update.phase = "finished";
      }
    }
  }

  await sb.from("arena_rooms").update(update).eq("id", roomId);

  return new Response(
    JSON.stringify({ feedback, correct, word: targetWord }),
    {
      status: 200,
      headers: { ...CORS, "Content-Type": "application/json" },
    },
  );
});
