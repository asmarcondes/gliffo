import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createDailyWordHandler } from "./handler.ts";
import { getAppEnv } from "./env.ts";
import { createPuzzleScheduleRepository } from "./repository.ts";

declare const Deno: {
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const appEnv = getAppEnv();
const puzzleScheduleRepository = createPuzzleScheduleRepository();

Deno.serve(createDailyWordHandler({
  repository: puzzleScheduleRepository,
  allowOrigin: appEnv.allowOrigin,
  cacheMaxAgeSeconds: appEnv.cacheMaxAgeSeconds,
}));
