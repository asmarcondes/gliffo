import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createPuzzleScheduleRepository } from "./repository.ts";
import type { ScheduleEntry } from "./types.ts";

declare const Deno: {
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const puzzleScheduleRepository = createPuzzleScheduleRepository();

async function getPuzzleByDate(dateStr: string): Promise<ScheduleEntry | null> {
  return puzzleScheduleRepository.getByDate(dateStr);
}

function isValidIsoDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

  const parsed = new Date(`${dateStr}T00:00:00Z`);

  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === dateStr;
}

Deno.serve(async (req: Request) => {
  // CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parâmetro opcional ?date=YYYY-MM-DD (para debug / modo arquivo)
  const url = new URL(req.url);
  const dateParam = url.searchParams.get("date") ?? undefined;

  // Valida formato e existência real da data se fornecido
  if (dateParam && !isValidIsoDate(dateParam)) {
    return new Response(JSON.stringify({ error: "Invalid date format. Use YYYY-MM-DD" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Data alvo (UTC)
  const targetDate = dateParam ??
    new Date().toISOString().slice(0, 10);

  let result: ScheduleEntry | null = null;

  try {
    result = await getPuzzleByDate(targetDate);
  } catch (error) {
    console.error("[daily-word] failed to load schedule", error);
    return new Response(JSON.stringify({ error: "Failed to load schedule" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!result) {
    return new Response(JSON.stringify({ error: "Puzzle not found for date" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
