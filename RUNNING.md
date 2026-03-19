Como rodar o jogo localmente

Opção A — usando Node (recomendado se tiver Node.js instalado)

1. Abra um terminal na pasta do projeto (onde está `index.html`).
2. Rode:

```
pnpm install
pnpm start
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
- `pnpm start` agora sobe o frontend e também a Edge Function local `daily-word`. Se a stack local do Supabase estiver parada, o comando executa `supabase start` antes de servir a função.
- Para recriar o banco local com migrations + seed atualizado, use `pnpm start:reset`.
- Se preferir recarregamento automático ao salvar, use `live-server` em vez do `http-server`:
  - Instalar globalmente: `npm i -g live-server`
  - Rodar: `live-server --port=8080 --no-browser`

  Ou usar sem instalar (via npx): `npx live-server --port=8080 --no-browser --watch=.`

Fluxo local da `daily-word`

1. Fluxo recomendado do dia a dia:

```
pnpm start
```

2. Se precisar reconstruir a base local com migrations + seed:

```
pnpm start:reset
```

3. Se quiser servir só a function, sem subir o frontend:

```
pnpm dev:function
```

4. Validar o endpoint local:

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
