import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const filesToCopy = [
  "index.html",
  "arena.html",
  "app.css",
  "app.js",
  "manifest.json",
  "sw.js",
  "og.png",
];
const directoriesToCopy = ["animations", "icons", "vendor"];

async function copyFile(relativePath) {
  const src = path.join(rootDir, relativePath);
  const dest = path.join(distDir, relativePath);
  await mkdir(path.dirname(dest), { recursive: true });
  await cp(src, dest, { recursive: false });
}

async function copyDirectory(relativePath) {
  const src = path.join(rootDir, relativePath);
  const dest = path.join(distDir, relativePath);
  await cp(src, dest, { recursive: true });
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  for (const relativePath of filesToCopy) {
    await copyFile(relativePath);
  }

  for (const relativePath of directoriesToCopy) {
    await copyDirectory(relativePath);
  }

  await mkdir(path.join(distDir, "data"), { recursive: true });
  await copyFile(path.join("data", "dicionario.json"));

  console.log("dist pronto em", distDir);
}

try {
  await main();
} catch (error) {
  console.error("Falha ao gerar dist:", error);
  process.exitCode = 1;
}
