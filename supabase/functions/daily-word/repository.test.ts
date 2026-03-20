import { assertEquals, assertThrows } from "jsr:@std/assert";
import {
  createPuzzleScheduleRepository,
  mapScheduleRow,
  resetRepositoryCacheForTests,
} from "./repository.ts";

const ENV_KEYS = [
  "PUZZLE_SCHEDULE_SOURCE",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "APP_SUPABASE_URL",
  "APP_SUPABASE_SERVICE_ROLE_KEY",
  "PUZZLE_ALLOWED_ORIGIN",
  "DAILY_WORD_CACHE_MAX_AGE_SECONDS",
] as const;

function withEnv(values: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>, run: () => Promise<void>): Promise<void> {
  const previous = new Map<string, string | undefined>();

  for (const key of ENV_KEYS) {
    previous.set(key, Deno.env.get(key));

    const value = values[key];
    if (value === undefined) {
      Deno.env.delete(key);
    } else {
      Deno.env.set(key, value);
    }
  }

  return run().finally(() => {
    resetRepositoryCacheForTests();
    for (const key of ENV_KEYS) {
      const value = previous.get(key);
      if (value === undefined) {
        Deno.env.delete(key);
      } else {
        Deno.env.set(key, value);
      }
    }
  });
}

Deno.test("embedded repository returns known scheduled puzzle", async () => {
  await withEnv({
    PUZZLE_SCHEDULE_SOURCE: "embedded",
  }, async () => {
    const repository = createPuzzleScheduleRepository();
    const result = await repository.getByDate("2026-03-18");

    assertEquals(result?.word, "ABRIR");
    assertEquals(result?.difficulty, "medio");
    assertEquals(result?.puzzle, 11);
  });
});

Deno.test("mapScheduleRow maps database fields to public fields", () => {
  const result = mapScheduleRow({
    date: "2026-03-18",
    word: "ABRIR",
    difficulty: "medio",
    difficulty_label: "Médio",
    puzzle: 11,
  });

  assertEquals(result, {
    date: "2026-03-18",
    word: "ABRIR",
    difficulty: "medio",
    difficultyLabel: "Médio",
    puzzle: 11,
  });
});

Deno.test("mapScheduleRow throws for invalid rows", () => {
  assertThrows(() => {
    mapScheduleRow({
      date: "2026-03-18",
      word: "",
      difficulty: "medio",
      difficulty_label: "Médio",
      puzzle: 11,
    });
  });
});