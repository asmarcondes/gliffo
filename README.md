# glif.foo

Jogo diário de palavras em português. As letras da palavra do dia se empilham em camadas formando um **glifo geométrico SVG** — estude as formas sobrepostas e decodifique a palavra escondida em até 4 tentativas.

🎮 **[Jogar em glif.foo](https://glif.foo)**

---

## Mecânica

- Cada letra tem uma **cor única** e consistente durante a sessão
- Letra na **posição certa** → some do Glifo do Dia com animação ✨
- Letra na palavra mas **posição errada** → acende colorida no glifo
- Letra **não existe** → eliminada do teclado virtual
- **Cursor não-linear** — clique em qualquer slot para digitar em qualquer ordem
- **Chave Decodificadora** 🔑 — 1 por tentativa, revela uma letra à sua escolha

## Stack

- **Single-file:** `index.html` (~8.400 linhas) — HTML + CSS + JS, sem frameworks, sem dependências
- SVG gerado programaticamente via `makeSVG(letter, color, style)`
- Fontes: DM Serif Display + DM Sans (Google Fonts)
- Backend: Supabase Edge Function (`daily-word`) como fonte do puzzle diário/arquivo + agenda anual no backend
- PWA: offline-capable via Service Worker, instalável no celular

## Estrutura

```
gliffo/
├── index.html              (~8.400L — jogo completo, arquivo único)
├── curadoria.html          (ferramenta interna de curadoria do banco)
├── og.png                  (1200×630 — preview de links)
├── gen-og.html             (fonte para regenerar og.png via screenshot)
├── manifest.json           (PWA manifest — theme #f5a623)
├── sw.js                   (Service Worker — network-first HTML, cache-first assets)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
├── data/
│   ├── word_bank_final.json     (fonte de verdade do banco — 4 dificuldades)
│   ├── dicionario.json          (38.664 palavras 4–7L para validação de tentativas)
│   └── words_ptbr_year.json     (agenda local de manutenção/geração, fora do deploy público)
├── docs/
│   ├── glifo_contexto.md        (contexto completo do projeto)
│   └── resumo_banco.md
└── supabase/
    └── functions/
        └── daily-word/
            ├── index.ts              (Edge Function — lookup por agenda embutida, sem fallback local)
            └── words_ptbr_year.json  (agenda anual empacotada com a função)
```

## Banco de palavras

| Dificuldade   | Tamanho  | Quantidade   |
| ------------- | -------- | ------------ |
| Fácil         | 4 letras | 400 palavras |
| Médio         | 5 letras | 400 palavras |
| Difícil       | 6 letras | 371 palavras |
| Muito difícil | 7 letras | 300 palavras |

O ciclo de dificuldade segue o dia da semana (Dom=Fácil … Sáb=Muito Difícil).  
Fonte de verdade: `data/word_bank_final.json`. O banco segue duplicado entre `index.html` e `supabase/functions/daily-word/index.ts` para prática/curadoria, mas o puzzle oficial diário/arquivo é carregado pelo cliente via Edge Function a partir da agenda embutida no backend.

## Deploy

Funciona em qualquer host estático com HTTPS (necessário para Service Worker):

- **GitHub Pages** — repositório público, `Settings > Pages > branch main / root`
- **Vercel** — `vercel --prod`
- **Netlify** — drag & drop da pasta raiz

## Desenvolvimento local

```bash
# Com pnpm
pnpm dev

# ou sem Node tooling
python -m http.server 8080
```

## Build público

```bash
pnpm build
```

O build gera `dist/` com apenas os assets públicos necessários ao runtime:

- `index.html`
- `manifest.json`
- `sw.js`
- `og.png`
- `icons/`
- `animations/`
- `data/dicionario.json`

Arquivos internos como `docs/`, `supabase/`, `scripts/` e `data/words_ptbr_year.json` ficam fora do output público.

Para atualizar a Edge Function no Supabase:

```bash
supabase functions deploy daily-word
```

A `daily-word` usa uma camada de repositório para buscar a agenda oficial. O código continua com `embedded` como fallback seguro, mas o ambiente remoto já está configurado com `PUZZLE_SCHEDULE_SOURCE=database` e lê a tabela `public.daily_schedule` com as colunas `date`, `word`, `difficulty`, `difficulty_label`, `puzzle` e `created_at`. Para desenvolvimento e rollback controlado, a origem pode ser trocada por variável de ambiente:

O payload público da função também está padronizado em inglês: `{ word, difficulty, difficultyLabel, puzzle, date }`.

```bash
PUZZLE_SCHEDULE_SOURCE=embedded  # fallback local/operacional
PUZZLE_SCHEDULE_SOURCE=database  # origem oficial atual no Supabase remoto
```

Para servir a função localmente em modo banco, use um arquivo de ambiente como `supabase/.env.local` com `PUZZLE_SCHEDULE_SOURCE=database` e rode:

```bash
supabase functions serve daily-word --env-file supabase/.env.local --no-verify-jwt
```

## Vercel

O deploy automático da Vercel via GitHub deve usar:

- `Build Command`: `pnpm build`
- `Output Directory`: `dist`

O arquivo `vercel.json` já aponta para essa configuração.

## Regenerar og.png

Abra `gen-og.html` em um browser (ou via server local), tire um screenshot
da página inteira com 1200×630px e salve como `og.png` na raiz.  
Com Playwright instalado:

```bash
npx playwright screenshot --viewport-size="1200,630" gen-og.html og.png
```

## Roadmap

- [x] Banco curado PT-BR (400/400/371/300 palavras por dificuldade)
- [x] Dicionário de validação com 38.664 palavras 4–7L
- [x] Agenda anual de puzzles (365 dias, ciclo de dificuldade correto)
- [x] Streak, estatísticas e compartilhamento
- [x] Tutorial interativo (7 passos, palavra BOLA)
- [x] PWA — instalável, offline-capable
- [x] OG image para previews de link
- [ ] Modo arquivo — jogar puzzles de dias anteriores
- [ ] Configurações centralizadas (dark/light, reset stats)
- [ ] Modo difícil de gameplay (letras confirmadas obrigatórias)
- [ ] Streak cross-device via Supabase Auth

## Licença

© 2026 glif.foo — Todos os direitos reservados.
