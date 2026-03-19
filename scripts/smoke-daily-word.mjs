const defaultBaseUrl = process.env.DAILY_WORD_BASE_URL ?? "http://127.0.0.1:54321/functions/v1/daily-word";
const targetDate = process.argv[2] ?? "2026-03-18";
const requestUrl = new URL(defaultBaseUrl);

requestUrl.searchParams.set("date", targetDate);

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

try {
  const response = await fetch(requestUrl);
  const rawBody = await response.text();

  if (response.ok) {
    const payload = JSON.parse(rawBody);
    const requiredStringFields = ["date", "word", "difficulty", "difficultyLabel"];

    for (const field of requiredStringFields) {
      if (typeof payload[field] !== "string" || payload[field].length === 0) {
        fail(`Campo invalido no payload: ${field}`);
      }
    }

    if (typeof payload.puzzle !== "number" || payload.puzzle <= 0) {
      fail("Campo invalido no payload: puzzle");
    }

    console.log(`Smoke test ok para ${targetDate}`);
    console.log(JSON.stringify(payload));
  } else {
    fail(`Smoke test falhou com status ${response.status}: ${rawBody}`);
  }
} catch (error) {
  fail(`Smoke test falhou ao chamar ${requestUrl.toString()}: ${error.message}`);
}