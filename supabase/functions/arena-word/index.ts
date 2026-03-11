// arena-word — sorteia a palavra do turno para um time, evitando repetições
// POST { roomId: string, team: "A" | "B" }
// Retorna { word, pool, level }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PALAVRAS, LEVEL_POOL } from "../_shared/palavras.ts";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

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

  let body: { roomId?: string; team?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const { roomId, team } = body;
  if (!roomId || (team !== "A" && team !== "B")) {
    return new Response(
      JSON.stringify({ error: "roomId e team ('A'|'B') são obrigatórios" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const sb = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Busca nível atual do time
  const { data: room, error: roomErr } = await sb
    .from("arena_rooms")
    .select("team_a_level, team_b_level")
    .eq("id", roomId)
    .single();

  if (roomErr || !room) {
    return new Response(JSON.stringify({ error: "Sala não encontrada" }), {
      status: 404,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const level: number = team === "A" ? room.team_a_level : room.team_b_level;
  const pool = LEVEL_POOL[level] ?? "facil";
  const lista: string[] = PALAVRAS[pool];

  // Palavras já usadas nesta sala (todas as propostas anteriores)
  const { data: pastProps } = await sb
    .from("arena_proposals")
    .select("word")
    .eq("room_id", roomId);

  const usedWords = new Set<string>((pastProps ?? []).map((p: { word: string }) => p.word));

  // Sorteia palavra não repetida (até 200 tentativas; depois aceita repetição)
  let word = lista[Math.floor(Math.random() * lista.length)];
  for (let i = 0; i < 200 && usedWords.has(word); i++) {
    word = lista[Math.floor(Math.random() * lista.length)];
  }

  // Grava na sala (coluna correta por time)
  const updateField = team === "A" ? { team_a_word: word } : { team_b_word: word };
  const { error: updErr } = await sb
    .from("arena_rooms")
    .update(updateField)
    .eq("id", roomId);

  if (updErr) {
    return new Response(JSON.stringify({ error: "Erro ao gravar palavra" }), {
      status: 500,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ word, pool, level }), {
    status: 200,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
});
