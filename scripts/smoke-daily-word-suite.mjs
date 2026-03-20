const baseUrl =
  process.env.DAILY_WORD_BASE_URL ??
  "http://127.0.0.1:54321/functions/v1/daily-word";

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function requestScenario(searchParams) {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url);
  const rawBody = await response.text();

  let payload = null;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    payload = rawBody;
  }

  return { response, payload, url: url.toString() };
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
    throw new Error(message);
  }
}

try {
  const okScenario = await requestScenario({ date: "2026-03-18" });
  assert(
    okScenario.response.status === 200,
    `Esperado 200 no cenário ok, recebido ${okScenario.response.status}`,
  );
  assert(
    typeof okScenario.payload.word === "string",
    "Payload 200 sem campo word",
  );
  assert(
    typeof okScenario.payload.difficulty === "string",
    "Payload 200 sem campo difficulty",
  );

  const invalidDateScenario = await requestScenario({ date: "2026-02-30" });
  assert(
    invalidDateScenario.response.status === 400,
    `Esperado 400 para data inválida, recebido ${invalidDateScenario.response.status}`,
  );
  assert(
    invalidDateScenario.payload?.error ===
      "Invalid date format. Use YYYY-MM-DD",
    "Mensagem inesperada para data inválida",
  );

  const notFoundScenario = await requestScenario({ date: "2026-03-01" });
  assert(
    notFoundScenario.response.status === 404,
    `Esperado 404 para puzzle ausente, recebido ${notFoundScenario.response.status}`,
  );
  assert(
    notFoundScenario.payload?.error === "Puzzle not found for date",
    "Mensagem inesperada para puzzle ausente",
  );

  const futureScenario = await requestScenario({ date: "2099-01-01" });
  assert(
    futureScenario.response.status === 425,
    `Esperado 425 para puzzle futuro, recebido ${futureScenario.response.status}`,
  );
  assert(
    futureScenario.payload?.error ===
      "Calma. Esse glifo ainda nao saiu do forno.",
    "Mensagem inesperada para puzzle futuro",
  );
  assert(
    futureScenario.payload?.code === "FUTURE_PUZZLE",
    "Codigo inesperado para puzzle futuro",
  );

  console.log("Smoke suite ok para daily-word");
  console.log(
    JSON.stringify({
      ok: okScenario.payload,
      invalidDate: invalidDateScenario.payload,
      notFound: notFoundScenario.payload,
      future: futureScenario.payload,
    }),
  );
} catch (error) {
  fail(`Smoke suite falhou: ${error.message}`);
}
