import { execFileSync, spawn } from "node:child_process";
import process from "node:process";

const PNPM_BIN = "pnpm";
const PROJECT_URL = "http://127.0.0.1:54321";
const DAILY_WORD_HEALTH_URL = `${PROJECT_URL}/functions/v1/daily-word?date=2026-03-18`;
const RESET = process.argv.includes("--reset");
const children = new Set();
let shuttingDown = false;

function isDeviceGuardBlockMessage(message) {
  return /device guard|bloqueado pela pol.tica|blocked by .*device guard/i.test(
    message,
  );
}

function log(message) {
  console.log(`[local-dev] ${message}`);
}

function prefixStream(stream, prefix, target, onLine) {
  let buffer = "";

  stream.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.length > 0) {
        target.write(`[${prefix}] ${line}\n`);
        onLine?.(line);
      }
    }
  });

  stream.on("end", () => {
    if (buffer.length > 0) {
      target.write(`[${prefix}] ${buffer}\n`);
      onLine?.(buffer);
    }
  });
}

function quoteWindowsArg(value) {
  if (value.length === 0) {
    return '""';
  }

  if (!/[\s"]/u.test(value)) {
    return value;
  }

  return `"${value}"`;
}

function spawnPnpm(args, options = {}) {
  const baseOptions = {
    cwd: process.cwd(),
    env: process.env,
    shell: false,
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
  };
  const child =
    process.platform === "win32"
      ? spawn(
          process.env.ComSpec ?? "cmd.exe",
          [
            "/d",
            "/s",
            "/c",
            [PNPM_BIN, ...args].map(quoteWindowsArg).join(" "),
          ],
          baseOptions,
        )
      : spawn(PNPM_BIN, args, baseOptions);

  if (child.stdout) {
    prefixStream(
      child.stdout,
      options.label ?? args[0],
      process.stdout,
      options.onLine,
    );
  }

  if (child.stderr) {
    prefixStream(
      child.stderr,
      options.label ?? args[0],
      process.stderr,
      options.onLine,
    );
  }

  return child;
}

function runStep(label, args) {
  return new Promise((resolve, reject) => {
    const child = spawnPnpm(args, { label });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${label} interrompido por sinal ${signal}`));
        return;
      }

      if (code !== 0) {
        reject(new Error(`${label} falhou com código ${code}`));
        return;
      }

      resolve();
    });
  });
}

async function isSupabaseRunning() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(`${PROJECT_URL}/rest/v1/`, {
      method: "GET",
      signal: controller.signal,
    });

    return response.status > 0;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function ensureSupabase() {
  if (RESET) {
    log("Reconstruindo Supabase local com migrations e seed...");
    await runStep("bootstrap", ["run", "supabase:bootstrap-local"]);
    return;
  }

  if (await isSupabaseRunning()) {
    log("Supabase local já está ativo.");
    return;
  }

  log("Subindo stack local do Supabase...");
  await runStep("supabase", ["supabase", "start"]);
}

async function waitForDailyWordReady(timeoutMs = 20000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    try {
      const response = await fetch(DAILY_WORD_HEALTH_URL, {
        method: "GET",
        signal: controller.signal,
      });

      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the runtime is ready.
    } finally {
      clearTimeout(timeout);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("daily-word não respondeu 200 dentro do tempo esperado");
}

function startDailyWordService() {
  const state = {
    output: [],
    deviceGuardBlocked: false,
  };
  const child = startService(
    "daily-word",
    [
      "supabase",
      "functions",
      "serve",
      "daily-word",
      "--env-file",
      "supabase/.env.local",
      "--no-verify-jwt",
    ],
    {
      tolerateExit: (code, signal) => {
        if (signal) {
          return false;
        }

        return code === 1 && state.deviceGuardBlocked;
      },
      onLine: (line) => {
        state.output.push(line);
        if (isDeviceGuardBlockMessage(line)) {
          state.deviceGuardBlocked = true;
        }
      },
      onToleratedExit: () => {
        log(
          "Device Guard bloqueou o Supabase CLI local; continuando sem a daily-word local.",
        );
      },
    },
  );

  return { child, state };
}

async function waitForDailyWordStartup(service, timeoutMs = 20000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (service.state.deviceGuardBlocked) {
      return { mode: "fallback" };
    }

    if (service.child.exitCode !== null) {
      if (service.state.deviceGuardBlocked) {
        return { mode: "fallback" };
      }

      throw new Error(
        `daily-word falhou ao iniciar (código ${service.child.exitCode}).`,
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    try {
      const response = await fetch(DAILY_WORD_HEALTH_URL, {
        method: "GET",
        signal: controller.signal,
      });

      if (response.ok) {
        return { mode: "ready" };
      }
    } catch {
      // Keep polling until the runtime is ready or we detect a tolerated block.
    } finally {
      clearTimeout(timeout);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  if (service.state.deviceGuardBlocked) {
    return { mode: "fallback" };
  }

  throw new Error("daily-word não respondeu 200 dentro do tempo esperado");
}

function terminateChild(child) {
  if (child?.exitCode !== null || child?.killed) {
    return;
  }

  if (process.platform === "win32") {
    try {
      execFileSync("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore",
      });
      return;
    } catch {
      child.kill();
      return;
    }
  }

  child.kill("SIGTERM");
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    terminateChild(child);
  }

  setTimeout(() => {
    process.exit(exitCode);
  }, 100);
}

function startService(label, args, options = {}) {
  const child =
    label === "web"
      ? spawn(process.execPath, ["scripts/serve-static.mjs"], {
          cwd: process.cwd(),
          env: process.env,
          shell: false,
          stdio: ["ignore", "pipe", "pipe"],
        })
      : spawnPnpm(args, { label, onLine: options.onLine });

  if (label === "web") {
    if (child.stdout) {
      prefixStream(child.stdout, label, process.stdout, options.onLine);
    }

    if (child.stderr) {
      prefixStream(child.stderr, label, process.stderr, options.onLine);
    }
  }

  children.add(child);

  child.on("error", (error) => {
    console.error(`[${label}] ${error.message}`);
    shutdown(1);
  });

  child.on("exit", (code, signal) => {
    children.delete(child);
    const exitReason = signal ?? `codigo ${code}`;

    if (shuttingDown) {
      return;
    }

    if (options.tolerateExit?.(code, signal)) {
      options.onToleratedExit?.(code, signal);
      return;
    }

    if (signal || code !== 0) {
      console.error(`[${label}] encerrado inesperadamente (${exitReason}).`);
      shutdown(code ?? 1);
      return;
    }

    log(`${label} finalizou; encerrando os demais processos.`);
    shutdown(0);
  });

  return child;
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

try {
  await ensureSupabase();

  log("Subindo daily-word local...");
  const dailyWordService = startDailyWordService();

  log("Aguardando daily-word ficar pronta...");
  const dailyWordStartup = await waitForDailyWordStartup(dailyWordService);

  if (dailyWordStartup.mode === "fallback") {
    log("Frontend seguirá com fallback local para o puzzle do dia.");
  }

  log("Subindo frontend local...");
  startService("web", []);
} catch (error) {
  console.error(`[local-dev] ${error.message}`);
  process.exit(1);
}
