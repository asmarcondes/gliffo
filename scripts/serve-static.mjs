import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import process from "node:process";

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT ?? 8080);
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".manifest", "application/manifest+json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
]);

function resolvePath(requestUrl) {
  const url = new URL(requestUrl, `http://127.0.0.1:${PORT}`);
  const pathname = decodeURIComponent(
    url.pathname === "/" ? "/index.html" : url.pathname,
  );
  const normalized = path.normalize(path.join(ROOT_DIR, pathname));

  if (!normalized.startsWith(ROOT_DIR)) {
    return null;
  }

  return normalized;
}

function sendNotFound(response) {
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}

const server = http.createServer(async (request, response) => {
  const filePath = resolvePath(request.url ?? "/");

  if (!filePath) {
    sendNotFound(response);
    return;
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      sendNotFound(response);
      return;
    }

    const extname = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": MIME_TYPES.get(extname) ?? "application/octet-stream",
    });

    createReadStream(filePath).pipe(response);
  } catch {
    sendNotFound(response);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${ROOT_DIR} at http://127.0.0.1:${PORT}`);
});

process.on("SIGINT", () => server.close(() => process.exit(0)));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
