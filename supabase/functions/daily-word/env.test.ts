import { assertEquals, assertThrows } from "jsr:@std/assert";
import { getAppEnv } from "./env.ts";

const ENV_KEYS = [
  "PUZZLE_SCHEDULE_SOURCE",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "APP_SUPABASE_URL",
  "APP_SUPABASE_SERVICE_ROLE_KEY",
  "PUZZLE_ALLOWED_ORIGIN",
  "DAILY_WORD_CACHE_MAX_AGE_SECONDS",
] as const;

function withEnv(values: Partial<Record<(typeof ENV_KEYS)[number], string | undefined>>, run: () => void): void {
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

  try {
    run();
  } finally {
    for (const key of ENV_KEYS) {
      const value = previous.get(key);
      if (value === undefined) {
        Deno.env.delete(key);
      } else {
        Deno.env.set(key, value);
      }
    }
  }
}

Deno.test("getAppEnv returns embedded defaults", () => {
  withEnv({}, () => {
    const env = getAppEnv();

    assertEquals(env.scheduleSource, "embedded");
    assertEquals(env.allowOrigin, "*");
    assertEquals(env.cacheMaxAgeSeconds, 3600);
  });
});

Deno.test("getAppEnv resolves local aliases and normalizes localhost", () => {
  withEnv({
    PUZZLE_SCHEDULE_SOURCE: "database",
    APP_SUPABASE_URL: "http://127.0.0.1:54321",
    APP_SUPABASE_SERVICE_ROLE_KEY: "test-service-role",
    PUZZLE_ALLOWED_ORIGIN: "https://glif.foo",
    DAILY_WORD_CACHE_MAX_AGE_SECONDS: "7200",
  }, () => {
    const env = getAppEnv();

    assertEquals(env.scheduleSource, "database");
    if (env.scheduleSource !== "database") {
      throw new Error("Expected database schedule source");
    }
    assertEquals(env.supabaseUrl, "http://host.docker.internal:54321/");
    assertEquals(env.supabaseServiceRoleKey, "test-service-role");
    assertEquals(env.allowOrigin, "https://glif.foo");
    assertEquals(env.cacheMaxAgeSeconds, 7200);
  });
});

Deno.test("getAppEnv throws when database configuration is incomplete", () => {
  withEnv({
    PUZZLE_SCHEDULE_SOURCE: "database",
    APP_SUPABASE_URL: "http://127.0.0.1:54321",
  }, () => {
    assertThrows(() => getAppEnv());
  });
});