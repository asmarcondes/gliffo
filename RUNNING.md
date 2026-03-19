Como rodar o jogo localmente

Opção A — usando Node (recomendado se tiver Node.js instalado)

1. Abra um terminal na pasta do projeto (onde está `index.html`).
2. Rode:

```
npm install
npm start
```

3. Abra no navegador: `http://localhost:8080`

Opção B — usando Python (se não tiver Node)

1. Abra um terminal na pasta do projeto.
2. Rode:

```
python -m http.server 8080
```

3. Abra no navegador: `http://localhost:8080`

Observações

- O jogo usa recursos que exigem servir via HTTP (service worker, módulos, etc.), portanto abrir `index.html` via `file://` não funcionará corretamente.
- Se preferir recarregamento automático ao salvar, use `live-server` em vez do `http-server`:
  - Instalar globalmente: `npm i -g live-server`
  - Rodar: `live-server --port=8080 --no-browser`

  Ou usar sem instalar (via npx): `npx live-server --port=8080 --no-browser --watch=.`

Fluxo local da `daily-word`

1. Preparar Supabase local com migrations + seed:

```
pnpm supabase:bootstrap-local
```

2. Em outro terminal, servir a Edge Function:

```
pnpm exec supabase functions serve daily-word --env-file supabase/.env.local --no-verify-jwt
```

3. Validar o endpoint local:

```
pnpm smoke:daily-word
```

Fluxo de qualidade

1. Testes unitários do backend diário:

```
pnpm test:daily-word
```

2. Smoke suite HTTP da function:

```
pnpm smoke:daily-word:suite
```

3. Build final do front:

```
pnpm build
```
