import { assertEquals } from "jsr:@std/assert";
import { createDailyWordHandler } from "./handler.ts";
import type { PuzzleScheduleRepository, ScheduleEntry } from "./types.ts";

function createRepository(getByDate: (dateStr: string) => Promise<ScheduleEntry | null>): PuzzleScheduleRepository {
  return { getByDate };
}

Deno.test("daily-word handler returns 200 with validated payload", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async (dateStr) => ({
      date: dateStr,
      word: "ABRIR",
      difficulty: "medio",
      difficultyLabel: "Médio",
      puzzle: 11,
    })),
    allowOrigin: "https://glif.foo",
    cacheMaxAgeSeconds: 7200,
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2026-03-18", {
    headers: { Origin: "https://glif.foo" },
  }));
  const payload = await response.json();

  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "https://glif.foo");
  assertEquals(response.headers.get("Cache-Control"), "public, max-age=7200, s-maxage=7200");
  assertEquals(payload.word, "ABRIR");
  assertEquals(payload.puzzle, 11);
});

Deno.test("daily-word handler returns 400 for invalid date", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async () => null),
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2026-02-30"));
  const payload = await response.json();

  assertEquals(response.status, 400);
  assertEquals(payload.error, "Invalid date format. Use YYYY-MM-DD");
});

Deno.test("daily-word handler returns 404 when puzzle is absent", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async () => null),
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2099-01-01"));
  const payload = await response.json();

  assertEquals(response.status, 404);
  assertEquals(payload.error, "Puzzle not found for date");
});

Deno.test("daily-word handler returns 500 when repository throws", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async () => {
      throw new Error("boom");
    }),
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2026-03-18"));
  const payload = await response.json();

  assertEquals(response.status, 500);
  assertEquals(payload.error, "Failed to load schedule");
});

Deno.test("daily-word handler returns 204 for OPTIONS", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async () => null),
    allowOrigin: "https://glif.foo",
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word", {
    method: "OPTIONS",
    headers: { Origin: "https://glif.foo" },
  }));

  assertEquals(response.status, 204);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "https://glif.foo");
  assertEquals(response.headers.get("Cache-Control"), "no-store");
});

Deno.test("daily-word handler keeps configured origin when request origin differs", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async (dateStr) => ({
      date: dateStr,
      word: "ABRIR",
      difficulty: "medio",
      difficultyLabel: "Médio",
      puzzle: 11,
    })),
    allowOrigin: "https://glif.foo",
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2026-03-18", {
    headers: { Origin: "https://other.example" },
  }));

  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Access-Control-Allow-Origin"), "https://glif.foo");
  assertEquals(response.headers.get("Vary"), "Origin");
});

Deno.test("daily-word handler disables caching when cache max age is zero", async () => {
  const handler = createDailyWordHandler({
    repository: createRepository(async (dateStr) => ({
      date: dateStr,
      word: "ABRIR",
      difficulty: "medio",
      difficultyLabel: "Médio",
      puzzle: 11,
    })),
    cacheMaxAgeSeconds: 0,
  });

  const response = await handler(new Request("https://example.test/functions/v1/daily-word?date=2026-03-18"));

  assertEquals(response.status, 200);
  assertEquals(response.headers.get("Cache-Control"), "no-store");
});