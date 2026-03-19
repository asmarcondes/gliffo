import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { getAppEnv } from "./env.ts";
import {
  scheduleFileSchema,
  scheduleRowSchema,
} from "./schema.ts";
import scheduleData from "./words_ptbr_year.json" with { type: "json" };
import type {
  PuzzleScheduleRepository,
  ScheduleEntry,
  ScheduleFile,
} from "./types.ts";
const DATABASE_TABLE = "daily_schedule";

let embeddedScheduleCache: ScheduleFile | null = null;
let repositoryCache: PuzzleScheduleRepository | null = null;

async function loadEmbeddedSchedule(): Promise<ScheduleFile> {
  if (embeddedScheduleCache) return embeddedScheduleCache;

  const parsedSchedule = scheduleFileSchema.parse(scheduleData);
  embeddedScheduleCache = parsedSchedule;
  return parsedSchedule;
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
  const env = getAppEnv();

  if (env.scheduleSource !== "database") {
    throw new Error("Database client requested while schedule source is not database");
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function mapScheduleRow(row: unknown): ScheduleEntry | null {
  if (!row) return null;

  const parsedRow = scheduleRowSchema.parse(row);

  return {
    date: parsedRow.date,
    word: parsedRow.word,
    difficulty: parsedRow.difficulty,
    difficultyLabel: parsedRow.difficulty_label,
    puzzle: parsedRow.puzzle,
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

      return mapScheduleRow(data);
    },
  };
}

export function createPuzzleScheduleRepository(): PuzzleScheduleRepository {
  if (repositoryCache) return repositoryCache;

  const env = getAppEnv();

  repositoryCache = env.scheduleSource === "database"
    ? createDatabaseScheduleRepository()
    : createEmbeddedScheduleRepository();

  return repositoryCache;
}

export function resetRepositoryCacheForTests(): void {
  embeddedScheduleCache = null;
  repositoryCache = null;
}