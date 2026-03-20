import { z } from "npm:zod@4";

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
};

const scheduleSourceSchema = z.enum(["embedded", "database"]);

const rawEnvSchema = z.object({
  PUZZLE_SCHEDULE_SOURCE: z.string().optional(),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  APP_SUPABASE_URL: z.string().optional(),
  APP_SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  PUZZLE_ALLOWED_ORIGIN: z.string().optional(),
  DAILY_WORD_CACHE_MAX_AGE_SECONDS: z.string().optional(),
});

type BaseAppEnv = {
  allowOrigin: string;
  cacheMaxAgeSeconds: number;
};

type EmbeddedAppEnv = BaseAppEnv & {
  scheduleSource: "embedded";
};

type DatabaseAppEnv = BaseAppEnv & {
  scheduleSource: "database";
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
};

export type AppEnv = EmbeddedAppEnv | DatabaseAppEnv;

function normalizeSupabaseUrl(rawUrl: string): string {
  const parsedUrl = new URL(rawUrl);

  if (parsedUrl.hostname === "127.0.0.1" || parsedUrl.hostname === "localhost") {
    parsedUrl.hostname = "host.docker.internal";
  }

  return parsedUrl.toString();
}

export function getAppEnv(): AppEnv {
  const rawEnv = rawEnvSchema.parse({
    PUZZLE_SCHEDULE_SOURCE: Deno.env.get("PUZZLE_SCHEDULE_SOURCE"),
    SUPABASE_URL: Deno.env.get("SUPABASE_URL"),
    SUPABASE_SERVICE_ROLE_KEY: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
    APP_SUPABASE_URL: Deno.env.get("APP_SUPABASE_URL"),
    APP_SUPABASE_SERVICE_ROLE_KEY: Deno.env.get("APP_SUPABASE_SERVICE_ROLE_KEY"),
    PUZZLE_ALLOWED_ORIGIN: Deno.env.get("PUZZLE_ALLOWED_ORIGIN"),
    DAILY_WORD_CACHE_MAX_AGE_SECONDS: Deno.env.get("DAILY_WORD_CACHE_MAX_AGE_SECONDS"),
  });

  const runtimeEnv = z.object({
    PUZZLE_ALLOWED_ORIGIN: z.union([z.literal("*"), z.url()]).optional(),
    DAILY_WORD_CACHE_MAX_AGE_SECONDS: z.coerce.number().int().nonnegative().optional(),
  }).parse({
    PUZZLE_ALLOWED_ORIGIN: rawEnv.PUZZLE_ALLOWED_ORIGIN?.trim() || undefined,
    DAILY_WORD_CACHE_MAX_AGE_SECONDS: rawEnv.DAILY_WORD_CACHE_MAX_AGE_SECONDS,
  });

  const scheduleSource = scheduleSourceSchema.parse(
    rawEnv.PUZZLE_SCHEDULE_SOURCE?.trim().toLowerCase() ?? "embedded",
  );

  const baseEnv: BaseAppEnv = {
    allowOrigin: runtimeEnv.PUZZLE_ALLOWED_ORIGIN ?? "*",
    cacheMaxAgeSeconds: runtimeEnv.DAILY_WORD_CACHE_MAX_AGE_SECONDS ?? 3600,
  };

  if (scheduleSource === "embedded") {
    return {
      ...baseEnv,
      scheduleSource,
    };
  }

  const resolvedSupabaseUrl = rawEnv.APP_SUPABASE_URL ?? rawEnv.SUPABASE_URL;
  const resolvedSupabaseServiceRoleKey = rawEnv.APP_SUPABASE_SERVICE_ROLE_KEY ??
    rawEnv.SUPABASE_SERVICE_ROLE_KEY;

  const databaseEnv = z.object({
    SUPABASE_URL: z.url(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  }).parse({
    SUPABASE_URL: resolvedSupabaseUrl,
    SUPABASE_SERVICE_ROLE_KEY: resolvedSupabaseServiceRoleKey,
  });

  return {
    ...baseEnv,
    scheduleSource,
    supabaseUrl: normalizeSupabaseUrl(databaseEnv.SUPABASE_URL),
    supabaseServiceRoleKey: databaseEnv.SUPABASE_SERVICE_ROLE_KEY,
  };
}