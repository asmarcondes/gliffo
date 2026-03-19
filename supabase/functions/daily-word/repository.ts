import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import scheduleData from "./words_ptbr_year.json" with { type: "json" };
import type {
  PuzzleScheduleRepository,
  ScheduleEntry,
  ScheduleFile,
} from "./types.ts";

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
};

type ScheduleSource = "embedded" | "database";

type ScheduleRow = {
  date: string;
  word: string;
  difficulty: string;
  difficulty_label: string;
  puzzle: number;
};

type EmbeddedScheduleEntry = {
  date: string;
  word: string;
  nivel: string;
  nivelLabel: string;
  puzzle: number;
};

type EmbeddedScheduleFile = {
  days: EmbeddedScheduleEntry[];
};

const DEFAULT_SCHEDULE_SOURCE: ScheduleSource = "embedded";
const SCHEDULE_SOURCE_ENV = "PUZZLE_SCHEDULE_SOURCE";
const DATABASE_TABLE = "daily_schedule";

let embeddedScheduleCache: ScheduleFile | null = null;
let repositoryCache: PuzzleScheduleRepository | null = null;

function getScheduleSource(): ScheduleSource {
  const source = Deno.env.get(SCHEDULE_SOURCE_ENV)?.trim().toLowerCase();

  if (!source) return DEFAULT_SCHEDULE_SOURCE;
  if (source === "embedded" || source === "database") return source;

  throw new Error(`Unsupported schedule source: ${source}`);
}

async function loadEmbeddedSchedule(): Promise<ScheduleFile> {
  if (embeddedScheduleCache) return embeddedScheduleCache;

  const parsed = scheduleData as EmbeddedScheduleFile;

  if (!parsed || !Array.isArray(parsed.days) || parsed.days.length === 0) {
    throw new Error("Schedule inválido ou vazio");
  }

  embeddedScheduleCache = {
    days: parsed.days.map((entry) => ({
      date: entry.date,
      word: entry.word,
      difficulty: entry.nivel,
      difficultyLabel: entry.nivelLabel,
      puzzle: entry.puzzle,
    })),
  };
  return embeddedScheduleCache;
}

function createEmbeddedScheduleRepository(): PuzzleScheduleRepository {
  return {
    async getByDate(dateStr: string): Promise<ScheduleEntry | null> {
      const schedule = await loadEmbeddedSchedule();
      return schedule.days.find((entry) => entry.date === dateStr) ?? null;
    },
  };
}

function getDatabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials for database schedule source");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function mapScheduleRow(row: ScheduleRow | null): ScheduleEntry | null {
  if (!row) return null;

  return {
    date: row.date,
    word: row.word,
    difficulty: row.difficulty,
    difficultyLabel: row.difficulty_label,
    puzzle: row.puzzle,
  };
}

function createDatabaseScheduleRepository(): PuzzleScheduleRepository {
  return {
    async getByDate(dateStr: string): Promise<ScheduleEntry | null> {
      const supabase = getDatabaseClient();
      const { data, error } = await supabase
        .from(DATABASE_TABLE)
        .select("date, word, difficulty, difficulty_label, puzzle")
        .eq("date", dateStr)
        .maybeSingle();

      if (error) {
        throw new Error(`Database schedule lookup failed: ${error.message}`);
      }

      return mapScheduleRow(data as ScheduleRow | null);
    },
  };
}

export function createPuzzleScheduleRepository(): PuzzleScheduleRepository {
  if (repositoryCache) return repositoryCache;

  const source = getScheduleSource();

  repositoryCache = source === "database"
    ? createDatabaseScheduleRepository()
    : createEmbeddedScheduleRepository();

  return repositoryCache;
}