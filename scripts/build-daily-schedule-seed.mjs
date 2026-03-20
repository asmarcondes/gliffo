import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const schedulePath = path.join(rootDir, "data", "words_ptbr_year.json");
const seedPath = path.join(rootDir, "supabase", "seed.sql");

function toSqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function buildInsertRow(entry) {
  return `  (${toSqlString(entry.date)}, ${toSqlString(entry.word)}, ${toSqlString(entry.difficulty)}, ${toSqlString(entry.difficultyLabel)}, ${entry.puzzle})`;
}

async function main() {
  const rawSchedule = await readFile(schedulePath, "utf8");
  const schedule = JSON.parse(rawSchedule);

  if (!Array.isArray(schedule.days) || schedule.days.length === 0) {
    throw new Error(
      "Agenda anual inválida: nenhuma entrada encontrada em data/words_ptbr_year.json",
    );
  }

  const insertRows = schedule.days.map(buildInsertRow).join(",\n");
  const seedSql = [
    "begin;",
    "",
    "truncate table public.daily_schedule restart identity;",
    "",
    "insert into public.daily_schedule (date, word, difficulty, difficulty_label, puzzle)",
    "values",
    `${insertRows};`,
    "",
    "commit;",
    "",
  ].join("\n");

  await mkdir(path.dirname(seedPath), { recursive: true });
  await writeFile(seedPath, seedSql, "utf8");

  console.log(
    `seed gerado em ${seedPath} com ${schedule.days.length} registros`,
  );
}

try {
  await main();
} catch (error) {
  console.error("Falha ao gerar supabase/seed.sql:", error);
  process.exitCode = 1;
}
