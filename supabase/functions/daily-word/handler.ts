import { dateQuerySchema, scheduleEntrySchema } from "./schema.ts";
import type { PuzzleScheduleRepository } from "./types.ts";

type DailyWordHandlerOptions = {
  repository: PuzzleScheduleRepository;
  now?: () => Date;
  allowOrigin?: string;
  cacheMaxAgeSeconds?: number;
};

function resolveAllowOrigin(req: Request, configuredAllowOrigin: string): string {
  if (configuredAllowOrigin === "*") {
    return configuredAllowOrigin;
  }

  const requestOrigin = req.headers.get("Origin");
  return requestOrigin === configuredAllowOrigin ? requestOrigin : configuredAllowOrigin;
}

function buildHeaders(contentType: string | null, allowOrigin: string, cacheControl: string): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": cacheControl,
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

function jsonResponse(body: unknown, init: { status: number; allowOrigin: string; cacheControl?: string }): Response {
  return new Response(JSON.stringify(body), {
    status: init.status,
    headers: buildHeaders(
      "application/json",
      init.allowOrigin,
      init.cacheControl ?? "no-store",
    ),
  });
}

function getSaoPauloIsoDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Failed to resolve Sao Paulo date");
  }

  return `${year}-${month}-${day}`;
}

function isFutureDate(targetDate: string, todayDate: string): boolean {
  return targetDate > todayDate;
}

export function createDailyWordHandler(options: DailyWordHandlerOptions) {
  const now = options.now ?? (() => new Date());
  const configuredAllowOrigin = options.allowOrigin ?? "*";
  const cacheMaxAgeSeconds = options.cacheMaxAgeSeconds ?? 3600;

  return async function handleDailyWordRequest(req: Request): Promise<Response> {
    const allowOrigin = resolveAllowOrigin(req, configuredAllowOrigin);

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: buildHeaders(null, allowOrigin, "no-store"),
      });
    }

    if (req.method !== "GET") {
      return jsonResponse({ error: "Method not allowed" }, {
        status: 405,
        allowOrigin,
      });
    }

    const url = new URL(req.url);
    const queryParse = dateQuerySchema.safeParse({
      date: url.searchParams.get("date") ?? undefined,
    });

    if (!queryParse.success) {
      return jsonResponse(
        { error: queryParse.error.issues[0]?.message ?? "Invalid query params" },
        { status: 400, allowOrigin },
      );
    }

    const currentDate = now();
    const todayDate = getSaoPauloIsoDate(currentDate);
    const targetDate = queryParse.data.date ?? todayDate;

    if (isFutureDate(targetDate, todayDate)) {
      return jsonResponse(
        { error: "Calma. Esse glifo ainda nao saiu do forno.", code: "FUTURE_PUZZLE" },
        { status: 425, allowOrigin },
      );
    }

    try {
      const result = await options.repository.getByDate(targetDate);

      if (!result) {
        return jsonResponse({ error: "Puzzle not found for date" }, {
          status: 404,
          allowOrigin,
        });
      }

      const payload = scheduleEntrySchema.parse(result);
      const successCacheControl = cacheMaxAgeSeconds > 0
        ? `public, max-age=${cacheMaxAgeSeconds}, s-maxage=${cacheMaxAgeSeconds}`
        : "no-store";

      return jsonResponse(payload, {
        status: 200,
        allowOrigin,
        cacheControl: successCacheControl,
      });
    } catch (error) {
      console.error("[daily-word] failed to load schedule", error);
      return jsonResponse({ error: "Failed to load schedule" }, {
        status: 500,
        allowOrigin,
      });
    }
  };
}