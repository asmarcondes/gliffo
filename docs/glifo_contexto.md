# glif.foo — Contexto do Projeto

## O que é

Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Stack

- **Single-file:** `index.html` — HTML + CSS + JS
- **CDN (tutorial/animações):** `animejs@3.2.2` (micro-interações do tutorial), `@lottiefiles/dotlottie-web@0.41.2` (personagem animado sadGoodbye)
- Fontes: DM Serif Display + DM Sans (Google Fonts)
- SVG gerado programaticamente via `makeSVG(letter, color, style)`
- Supabase Project ID: `ppssfweuotjgcfejdznn`
- Edge Function: `https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word`

## Identidade Visual

- **Paleta:** âmbar/laranja como cor de acento (`#f5a623` / `#e8940a`)
- **Temas:** dark (padrão) e light, togglável
- **Tipografia:** DM Serif Display (títulos) + DM Sans (corpo)
- **Scrollbar:** customizada em âmbar, fina (6px)
- **Cores de feedback por letra:** cada letra recebe uma cor única e consistente durante toda a sessão (array `GLYPH_COLORS`)

## Mecânica do Jogo

- Palavra do dia com `WN` letras (4–7L por dificuldade)
- 4 tentativas (`G.attempts`)
- **Feedback por posição:**
  - Letra na posição certa → some do Glifo do Dia (com animação fade+blur), slot fica colorido
  - Letra existe mas posição errada → acende colorida no Glifo do Dia
  - Letra não existe → eliminada do teclado
- **Chave Decodificadora:** 1 por tentativa, revela uma letra escolhida pelo jogador (`G.keyUsed`, `G.keyPos`)
- **Glifo do Dia** vs **Seu Glifo:** dois painéis lado a lado, atualizados ao vivo

## Estado do Jogo (objeto G)

```js
G = {
  typed: [], // array esparso — letras digitadas (índice = posição)
  cursor: 0, // posição atual do cursor (input não-linear)
  attempts: [], // histórico [{word, decoded:[], found:[]}]
  decoded: new Set(), // posições decodificadas (corretas)
  found: new Set(), // letras encontradas (posição errada)
  elim: new Set(), // letras eliminadas
  keyUsed: false, // chave já usada nesta tentativa
  keyPos: new Set(), // posições reveladas pela chave
  done: false, // jogo terminado
  won: false, // jogador venceu
  selKey: null, // posição selecionada na chave
};
// REMOVIDO: swapSel (swap de letras foi removido)
```

## Sistema de Input (refatorado nesta sessão)

O input foi completamente refeito para suportar **cursor não-linear**:

- `G.typed` é um **array esparso** — qualquer posição pode ser preenchida independentemente
- `G.cursor` indica onde a próxima letra será digitada
- **Clicar em slot vazio** → move cursor (cursor `text`)
- **Clicar em slot preenchido** → move cursor para lá (cursor `pointer`), pode sobrescrever
- **Setas ← →** → navegam entre slots (pulam decoded/keyPos)
- **⌫ em slot preenchido** → apaga a letra, cursor fica no slot (agora vazio)
- **⌫ em slot vazio** → move para o slot anterior (apaga se tiver letra)
- **Digitar** → escreve no cursor, avança para próximo slot vazio; se todos cheios, fica no slot atual
- `nextCursor(from)` → próximo vazio; se não houver, fica no slot digitado (sem wrap)
- `prevCursor(from)` → slot editável anterior (pula decoded/keyPos)

### CSS de estado dos slots

- `.lbox.active` → borda âmbar (cursor está aqui)
- `.lboxes.invalid .lbox:not(.decoded)` → borda vermelha (palavra inválida)
- `.lboxes.invalid .lbox.active` → borda âmbar (cursor mantém identidade mesmo com erro)

## Animação de Sumiço das Letras (renderDaily)

`renderDaily(revealedIndices?)` aceita array opcional de índices revelados:

- Cada SVG tem `data-idx` para identificação individual
- Ao revelar: só o SVG da letra revelada faz `opacity:0 + blur(6px)` em 600ms
- Após 620ms: reconstrói o stack sem as letras reveladas
- Chamada com índices em: `decode()` (passa `dec`) e `useKey()` (passa `[pos]`)
- Chamada sem índices em: `refresh()` e inicialização (sem animação)

## Funções Principais

| Função                               | O que faz                                     |
| ------------------------------------ | --------------------------------------------- |
| `makeSVG(l, color, style)`           | Gera SVG de uma letra                         |
| `buildBoxes()`                       | Renderiza slots com cursor não-linear         |
| `moveCursor(idx)`                    | Move cursor para posição idx                  |
| `nextCursor(from)`                   | Próxima posição editável vazia                |
| `prevCursor(from)`                   | Posição editável anterior                     |
| `handleKey(k)`                       | Input de letra/backspace/enter                |
| `calcWarns()` / `recalcWarns()`      | Avisos contextuais (elim/posição errada)      |
| `buildKB()`                          | Renderiza teclado virtual                     |
| `renderDaily(revealedIndices?)`      | Atualiza Glifo do Dia (com animação opcional) |
| `renderYours()`                      | Atualiza Seu Glifo                            |
| `decode()`                           | Processa tentativa, calcula feedback two-pass |
| `useKey()`                           | Usa chave decodificadora                      |
| `winAnim()`                          | Animação de vitória                           |
| `openTutorial()` / `closeTutorial()` | Controle do tutorial                          |

## Tutorial (7 passos)

Palavra de demonstração: **BOLA** (B=âmbar, O=lavanda, L=mint, A=coral)

| Passo | Conteúdo                                                              |
| ----- | --------------------------------------------------------------------- |
| 1/7   | Glifo pulsando — "o que é isso?"                                      |
| 2/7   | Animação ISO em loop — A→L→O→B chegando em perspectiva                |
| 3/7   | Digita **BICO** ao vivo, Seu Gliffo se forma                          |
| 4/7   | Feedback de **BICO**: letras eliminadas, posição errada e acerto      |
| 5/7   | Cor única por letra + início da 2ª tentativa com **B** já confirmado  |
| 6/7   | Chave Decodificadora em loop — revela **L** e mostra aviso com atraso |
| 7/7   | Interação obrigatória com cursor não-linear para completar **BOLA**   |

- Passo final começa com **B** e **L** já confirmados; só os slots vazios são editáveis
- `Seu Gliffo` no passo final mostra apenas as letras digitadas pelo jogador nessa etapa
- Ao completar **BOLA**, o título vira **"BOLA!"**, aparecem confetes e cards-resumo
- Se o botão final for liberado, o botão da esquerda vira **Ver de novo**
- Tem botão **Pular** / **Ver de novo** + botão **✕** (mclose) para fechar
- Auto-show na primeira visita (`localStorage: gliffoo_tutdone`)

## Edge Function — `daily-word`

- **URL:** `https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word`
- **Auth:** `verify_jwt: false` (pública)
- **Versão deployada:** v5
- **Parâmetro opcional:** `?date=YYYY-MM-DD` (debug/modo arquivo)
- **Resposta:** `{ word, nivel, nivelLabel, puzzle, date }`

### Lógica atual

```ts
// Época: 2026-03-08T00:00:00Z (puzzle #1 = dia de lançamento)
// diasDesdeEpoca = (hoje - EPOCA) / 86400000
// nivel = CICLO_DIF[hoje.getUTCDay()]
// idx = ((diasDesdeEpoca * 2654435761) >>> 0) % lista.length
```

### Ciclo de dificuldade (por dia da semana)

```
CICLO_DIF = ["facil","facil","medio","medio","dificil","dificil","muito_dificil"]
// Dom=facil, Seg=facil, Ter=medio, Qua=medio, Qui=dificil, Sex=dificil, Sab=muito_dificil
```

### Banco de palavras (Chat A — ✅ concluído)

O banco `PALAVRAS` está **duplicado** entre `index.html` e `supabase/functions/daily-word/index.ts` — ao atualizar o banco, ambos precisam ser atualizados em sincronia.

```
PALAVRAS = {
  facil:         281 palavras (4L)
  medio:         382 palavras (5L)
  dificil:       362 palavras (6L)
  muito_dificil: 300 palavras (7L)
  TOTAL:         1325 palavras curadas
}
DICIONARIO: ~38.664 palavras cobrindo 4L–7L para validação
```

- Fonte de verdade: `data/word_bank_final.json`
- Dicionário de validação: `data/dicionario.json` — 38.664 palavras (léxico fserb/pt-br normalizado, 354 KB)
  - Carregamento: localStorage `gliffoo_dic` → fetch `data/dicionario.json` → fallback PALAVRAS
- `dicionarioValido(word)`: checa DICIONARIO (4L–7L) primeiro; fallback para PALAVRAS
- `data/words_ptbr_year.json`: agenda 365 dias (2026-03-08 a 2027-03-07), v3, época 2026-03-08
  - Verificado: 2026-03-08 (dom) = MESA / facil / puzzle #1 ✓

## Estrutura do Projeto

```
gliffo/
├── .gitignore
├── README.md
├── index.html          (jogo completo)
├── curadoria.html      (ferramenta de curadoria do banco)
├── gen-og.html         (gerador do og.png)
├── og.png              (imagem Open Graph 1200×630)
├── sw.js               (service worker PWA, cache glifo-static-v3)
├── manifest.json       (PWA manifest)
├── icons/              (ícones PWA)
├── data/
│   ├── banco_curado.json        (80 KB  - exportação da curadoria: decisões + stats)
│   ├── word_bank_final.json     (62 KB  - fonte de verdade: 1.325 palavras aceitas)
│   ├── dicionario.json          (346 KB - 38.664 palavras 4L–7L para validação)
│   ├── words_ptbr_year.json     (92 KB  - agenda 365 dias → Supabase Storage)
│   ├── icf.txt                  (inputs do gen_banco.ps1)
│   ├── verbos.txt               (inputs do gen_banco.ps1)
│   └── lexico_ptbr.txt          (inputs do gen_banco.ps1)
├── docs/
│   ├── glifo_contexto.md
│   └── resumo_banco.md
├── scripts/
│   ├── gen_banco.ps1            (gera candidatos com SV+conf — reusa se expandir banco)
│   └── gen_year.ps1             (regenera words_ptbr_year.json — rodar todo ano)
└── supabase/
    └── functions/
        └── daily-word/
            └── index.ts         (Edge Function v5, deployada)
```

## Histórico de Chats Concluídos

### ✅ Chat A — Banco de Palavras & Dicionário

1. ✅ Banco curado PT-BR aplicado em `index.html` e `index.ts`
2. ✅ Dicionário 4L–7L (~6579 entradas) aplicado em `index.html`
3. ✅ CICLO_DIF corrigido em ambos (Dom=facil…Sab=muito_dificil)
4. ✅ `dicionarioValido()` corrigido para cobrir todos os tamanhos
5. ✅ Edge Function v3 deployada e verificada
6. ✅ `words_ptbr_year.json` regenerado com CICLO correto (v2)

### ✅ Chat B — Supabase Storage

1. ✅ Bucket público `data` criado no Supabase Storage
2. ✅ `words_ptbr_year.json` hospedado em Storage público
3. ✅ Edge Function v4: lookup por data no schedule → fallback on-the-fly
4. ✅ Cache em memória do schedule (timeout 3s)

### ✅ Chat C — Tutorial

5. ✅ Passo final redesenhado para cursor não-linear
6. ✅ Tutorial atualizado: BOLA, BICO → feedback → B+L confirmados → completar

### ✅ Chat D — Streak & Estatísticas

7. ✅ Streak, distribuição, taxa de vitória, share com emojis
8. ✅ 9 títulos de rank por streak (Novato → Guardião dos Glifos)
9. ✅ Micro-interactions: pop, shake, flip reveal, glow, háptico

### ✅ Chat E — PWA

10. ✅ manifest.json: theme_color #f5a623, shortcuts, sem screenshots
11. ✅ sw.js: network-first HTML, cache-first assets, offline fallback
12. ✅ Meta tags: theme-color, apple-touch-icon, viewport

### ✅ Chat F — Dicionário de Validação

13. ✅ `data/dicionario.json` — 38.664 palavras 4–7L (léxico fserb/pt-br normalizado, 354 KB)
14. ✅ Carregamento IIFE: localStorage `gliffoo_dic` → fetch → fallback PALAVRAS
15. ✅ sw.js `glifo-static-v3`, `dicionario.json` no PRECACHE

### ✅ Chat G — OG Image & README

16. ✅ `og.png` (1200×630) criado via `gen-og.html` + screenshot Playwright
    - Glifo empilhado 4 camadas (G=âmbar, L=lavanda, I=coral, F=mint) à esquerda
    - Título "glif.foo" em DM Serif Display + label âmbar + subtitle + pills
    - Background dark (#111118) com dot-grid sutil e gradientes radiais
17. ✅ `gen-og.html` mantido na raiz como fonte para regeneração futura
18. ✅ README atualizado: estrutura real (sem src/, sem Swap), stack atual,
    banco de palavras tabelado, instrução regenerar og.png, roadmap com checkboxes

### ✅ Chat H — Curadoria Expandida do Banco + Deploy

19. ✅ **gen_banco.ps1** criado: gera banco com SV (similaridade visual) + conf (confiança) por palavra
    — corrigidos 3 bugs (null array, base score=0, scalar unboxing PowerShell)
20. ✅ **Nova fórmula SV**: `SV = 45 + (1 − avgOverlap) × 35 + nUnique × 2` (LETTER_SIM Jaccard 23×23)
    — Thresholds: sv_alto≥80, sv_medio≥68, sv_baixo<60
21. ✅ **banco_novo.json** gerado: 3.264 candidatos (facil=489, medio=854, dificil=878, muito_dificil=1043)
22. ✅ **curadoria.html** atualizado: novo BANCO, fórmula SV, thresholds, LETTER_SIM, computeSV() embarcados
23. ✅ **Curadoria manual** de 1.618 palavras via curadoria.html → **1.325 aceitas** (293 recusadas):
    facil=281, medio=382, dificil=362, muito_dificil=300
24. ✅ Banco sincronizado em `data/word_bank_final.json`, `index.html`, `index.ts`
25. ✅ `data/words_ptbr_year.json` v3 regenerado: 365 dias a partir de 2026-03-08
26. ✅ **Época redefinida**: 2026-03-08 = puzzle #1 (era 2025-01-01 = puzzle #432 no lançamento)
    — atualizado em `index.html` (3 locais), `index.ts`, `gen_year.ps1`
27. ✅ **Upload Storage** + **deploy Edge Function v5** — API confirmada: puzzle #1 = MESA / Fácil
28. ✅ Limpeza: removidos `banco_novo.json`, `gen_banco_log.txt`, `letter_sim.js`, `letter_sim.json`, `integrar_banco.ps1`

---

## Plano de Próximos Chats

> Baseado em levantamento completo do projeto (2026-03-08).

---

### 🔴 Chat G — OG Image & README (alta prioridade)

**Problema:** `og.png` (1200×630) referenciada em `<head>` mas inexistente → previews de link quebrados em WhatsApp, iMessage, Twitter. README menciona `src/glifo_ptbr.html` (removido), "Swap" (removido), estrutura desatualizada.

**Itens:**

1. Criar `og.png` — composição com glifo + identidade visual âmbar
2. Atualizar README: estrutura real, stack atual, roadmap atualizado, remover Swap/src/

---

### ✅ Chat H — Curadoria Expandida do Banco + Deploy (concluído)

Ver **Histórico de Chats Concluídos** acima.

---

### ✅ Chat I — Modo Arquivo (puzzles anteriores)

**Implementado em 2026-03-08.**

1. ✅ Botão "📅 Arquivo" no cabeçalho (antes do ícone de stats)
2. ✅ Modal com grade estilo GitHub contribution calendar — 7 colunas (Dom–Sáb), semanas empilhadas (mais recente no topo), rótulo de mês separando grupos
3. ✅ Cada célula mostra: `#N` (canto superior esquerdo), ícone central de status, badge "hoje" — sem rótulo de letras
4. ✅ Estado separado por puzzle: `gliffoo_archive_N` (não altera `gliffoo_state`)
5. ✅ Não conta para streak — `atualizarStats()` retorna imediatamente se `ARQUIVO_MODO=true`
6. ✅ Header-meta mostra badge "📅 Arquivo #N"
7. ✅ Win/lose modais: sem countdown, midCard mostra "📅 Arquivo #N" em vez de streak
8. ✅ Share text: `glif.foo #N (arquivo)` para identificar puzzles de arquivo
9. ✅ "← Voltar ao Puzzle de Hoje" quando em modo arquivo
10. ✅ Cabeçalho de dias da semana sticky (fica fixo ao rolar)
11. ✅ Dia atual: anel âmbar pulsante (`@keyframes arquivo-pulse`). Dias futuros: desbloqueados mas opacos
12. ✅ Puzzle em jogo (archive): anel roxo `active`
13. ✅ Células coloridas **por status**, não por dificuldade — verde tênue (ganhou), neutro escuro (perdeu), âmbar tênue (em progresso), superfície (não jogado)
14. ✅ Ícone central: `★` (primeira tentativa sem chave), `●●○○` (dots de tentativas), `✕` (perdeu), `···` (em progresso)
15. ✅ Badge de chave 🗝 (canto superior direito) quando `keyUsed || keyPos.length > 0`
16. ✅ Tooltip completo com data, dificuldade e resultado ao passar o mouse
17. ✅ Funções: `palavraPorDia()`, `openArquivo()`, `buildArquivoList()`, `startArquivoMode()`, `exitArquivoMode()`, `salvarEstadoArquivo()`, `carregarEstadoArquivo()`

**Bug corrigido no mesmo chat:**

- ✅ **Duplicatas em `elim`**: letras excedentes de duplicatas (ex.: 2º E em PENEDO quando a resposta tem 1 E) eram incorretamente adicionadas ao conjunto de eliminadas → warning falso "E já foi eliminada". Corrigido na 2ª passagem do two-pass: `eli.push(l)` só ocorre se `!WL.includes(l)`

---

### ✅ Chat J — Beta Reset + Modal de Configurações

**Implementado em 2026-03-08.**

1. ✅ **Decisão beta reset:** manter `checkBetaReset()` — lançamento limpo em jun/2026
2. ✅ **Badge "Acesso Antecipado"** no header (ao lado do logo) — visível enquanto `Date.now() < BETA_END_DATE`, some automaticamente após jun/2026
3. ✅ **Botão ⚙️** no header substituindo o antigo botão dark/light
4. ✅ **Modal Configurações** (`config-modal`) com:
   - Toggle **Tema escuro** (dark/light movido para cá, com switch visual âmbar)
   - Toggle **Modo Difícil 🔥** — row desabilitada, label "Em breve" (prep para Chat N)
   - Info block âmbar sobre Acesso Antecipado (aparece só enquanto beta ativo)
5. ✅ **`gliffoo_config`** em localStorage — persiste `theme`; `initConfig()` aplicado antes do init para evitar flash
6. ✅ `config-modal` adicionado às 3 listas de fechar modais ao trocar puzzle
7. ✅ Streak cross-device: adiado — mantido local-only por ora

---

### ✅ Chat K — Race Condition do Dicionário

**Implementado em 2026-03-08.**

1. ✅ `DICIONARIO` pré-populado **sincronamente** com `Object.values(PALAVRAS).flat()` logo após a definição de `PALAVRAS` — validação mínima garantida desde o primeiro submit, sem race condition
2. ✅ `loadDicionario()` movida para após `PALAVRAS`; Fase 2 assíncrona (localStorage → fetch) substitui o Set pelo léxico completo de 38.6k palavras
3. ✅ Flag `let dicReady = false` → `true` após Set completo populado (ou no `catch` do fallback)

---

### ✅ Chat L — Compartilhar Passaporte (verificação iOS)

**Implementado em 2026-03-08.**

1. ✅ `toBlob` convertido de callback para Promise — preserva user gesture no iOS Safari (microtask vs macrotask); `await navigator.share()` fica na mesma cadeia async, Safari 15+ reconhece como oriundo do toque
2. ✅ Fallback `downloadBlob()` já existia — acionado quando `navigator.canShare({ files })` retorna falso (iOS < 15 ou desktop sem share)
3. ✅ Loading state no botão: desabilita + muda texto para `⏳ Gerando…` durante geração do canvas
4. ✅ `try/finally` em torno do corpo completo — botão sempre restaurado mesmo em erro
5. ✅ CSS `.passport-share-btn:disabled { opacity: 0.6; cursor: not-allowed }` adicionado

---

### ✅ Chat M — Acessibilidade

**Implementado em 2026-03-11.**

1. ✅ `aria-live="polite"` + `aria-atomic="true"` no `#fbmsg` — leitores de tela anunciam cada mensagem de feedback automaticamente
2. ✅ `role="group"` + `aria-label` nos containers `#lboxes` e `#keyboard`
3. ✅ `aria-label` dinâmico por slot em `buildBoxes()` — `"Posição N — letra X, confirmada"` / `"revelada pela chave"` / `"vazia"`; SVGs internos com `aria-hidden="true"`
4. ✅ `aria-label` por tecla em `buildKB()` — `"Letra X"`, `"Apagar"`, `"Confirmar"`
5. ✅ Focus trap genérico (`_installTrap` / `_removeTrap`) integrado em `openM()` / `closeM()` — Tab/Shift+Tab circula dentro do modal, foco restaurado ao fechar
6. ✅ `winMod()`, `loseMod()`, `openKeyModal()`, `openStats()` refatorados para usar `openM()` (garantindo focus trap em todos os modais)
7. ✅ `@media (prefers-contrast: more)` — bordas mais espessas, outline no slot ativo, backdrop-filter removido, overlay mais opaco

---

### ✅ Chat N — Modo Difícil

**Implementado em 2026-03-11.**

1. ✅ Toggle "Modo Difícil 🔥" ativado no modal Configurações (era placeholder "Em breve")
2. ✅ `let HARD_MODE = false` + `initConfig()` lê `gliffoo_config.hardMode` e chama `applyHardMode()`
3. ✅ `toggleHardMode()` — bloqueia se partida em andamento (`G.attempts.length > 0 && !G.done`)
4. ✅ `applyHardMode()` — esconde `#key-btn` (sem chave decodificadora)
5. ✅ `renderDaily()` — em Hard Mode: sem fade-out, todas as camadas visíveis (decoded não somem do glifo)
6. ✅ `buildHistory()` — dots monocromáticos (`var(--text-muted)`) em Hard Mode, sem cores por letra
7. ✅ `calcWarns()` — bloco de aviso de posição repetida desativado em Hard Mode
8. ✅ `buildHeaderMeta()` — badge `🔥 Difícil` no header em Hard Mode (modo normal, não arquivo)
9. ✅ `share()` — adiciona `🔥` ao texto compartilhado em Hard Mode
10. ✅ CSS `.hard-badge` — tom vermelho/fogo, dark e light mode
11. ✅ `syncConfigUI()` — switch do Hard Mode sincronizado ao abrir Configurações

**Mecânica Hard Mode (filosofia "leia só o glifo"):**

| Mecânica                     | Normal                   | Hard                     |
| ---------------------------- | ------------------------ | ------------------------ |
| Chave Decodificadora         | 1/tentativa              | ❌ oculta                |
| Aviso posição repetida       | ✅ texto                 | ❌ sem aviso             |
| Letras somem do Glifo do Dia | ✅ (decoded desaparecem) | ❌ glifo sempre completo |
| Dots coloridos no histórico  | ✅ cor por letra         | ❌ cinza neutro          |
| Badge 🔥 no header           | ❌                       | ✅                       |

---

### 🟡 Chat O — Micro-interações com Anime.js (jogo)

**Contexto:** Anime.js (`animejs@3.2.2`) já está adicionado como CDN para o tutorial (stagger das escolhas). Aplicar também nas animações do tabuleiro para maior polish.

**Itens:**

1. **Flip reveal** dos tiles ao submeter tentativa — `rotateX: [0, 180]` com stagger por posição, revelando a cor de feedback ao chegar em 90°
2. **Shake** da linha atual quando a palavra é inválida — substitui ou complementa a borda vermelha atual
3. **Bounce** ao digitar uma letra no slot — `scale: [1, 1.12, 1]` rápido (150ms)
4. **Stagger entrada** do teclado virtual no carregamento inicial
5. **Pop** dos tiles corretamente posicionados (decoded) — pequeno `scale` pulse ao confirmar

**Notas técnicas:**

- `anime` disponível via `window.anime` — verificar antes de usar (CDN pode falhar)
- Funções afetadas: `decode()` (flip+shake), `buildBoxes()` (bounce no input), `buildKB()` (stagger kb), `renderDaily()` (pop nos decoded)
- Coordenar com o CSS de transições já existentes nos `.lbox` e `.key` para não haver conflito

---

## Decisões de Design

- Arquivo único sem dependências (intencional)
- Swap de letras **REMOVIDO** — substituído por cursor não-linear clicável
- Tutorial usa BOLA (4L) para demonstração; jogo usa 4–7L por dificuldade (facil=4L, medio=5L, dificil=6L, muito_dificil=7L)
- Input não-linear: clicar em qualquer slot move o cursor sem apagar
- Feedback de palavra inválida: borda vermelha em todos slots não-decoded
- Slot com cursor mantém borda âmbar mesmo no estado inválido
- Histórico de tentativas em ordem reversa (mais recente no topo)
- `renderDaily` recebe índices para animar só letras específicas
- `palavraDoDia()` usa hash determinístico local — intencional para offline/latência zero; Edge Function existe para dados adicionais/agenda externa

---

## Prompts para Novos Chats

> Cole o **Prompt Base** em todo novo chat. Depois adicione o bloco específico da frente de trabalho.

### Prompt Base (sempre)

```
Você é um colaborador sênior no desenvolvimento do glif.foo, um jogo de palavras PT-BR com glifos geométricos SVG.

Sempre:
- Leia o docs/glifo_contexto.md antes de qualquer alteração
- Trabalhe diretamente no index.html — arquivo único (~8.400 linhas) sem dependências
- Mantenha a identidade visual: DM Serif Display + DM Sans, paleta âmbar, temas dark/light
- Preserve todas as funcionalidades já implementadas
- Prefira edições cirúrgicas (str_replace) a reescritas completas

Linguagem: interface sempre em PT-BR. Comunicação pode ser em português.
Código: JS vanilla, sem frameworks. CSS com variáveis do :root.
```

---

### ~~Chats A–F~~ — ✅ Concluídos (ver Histórico de Chats Concluídos acima)

---

### Chat G — OG Image & README

```
Frente: criar og.png e atualizar README.

Estado atual:
- og.png (1200×630) referenciada em <head> og:image e twitter:image, mas o arquivo NÃO EXISTE no repo
  → qualquer preview de link (WhatsApp, iMessage, Twitter/X) está quebrado
- README.md menciona src/glifo_ptbr.html (pasta inexistente), mecânica de Swap (removida),
  estrutura de pastas desatualizada (sem data/, sem dicionario.json)

Itens:
1. Criar icons/og.png — composição 1200×630 com glifo + identidade visual âmbar + texto glif.foo
   (pode ser SVG exportado, Figma, ou gerado via canvas no Node)
2. Atualizar README: estrutura real do repo, mecânicas atuais (sem Swap), stack atual,
   roadmap atualizado, instruções de dev local corretas
```

---

### Chat H — Curadoria de Qualidade do Banco Jogável

```
Frente: revisar e limpar as listas PALAVRAS de anglicismos e palavras inadequadas.

Estado atual:
- Lista `facil` contém: GIRL, HIGH, HITS, HALL, ISOL, PART, NOEL, GRID, TOFU, SURF, JAZZ,
  PNEU, TAXI, AUTO e outros termos não-PT-BR cotidianos
- Listas `medio` e `dificil` com problemas similares (siglas, topônimos, termos técnicos)
- Banco DUPLICADO em index.html e supabase/functions/daily-word/index.ts
  → qualquer edição precisa ser feita nos dois arquivos em sincronia
- Fonte de verdade: data/word_bank_final.json (precisa ser atualizado também)

Itens:
1. Revisar lista `facil` — remover anglicismos, siglas, topônimos, palavras não-PT-BR
2. Revisar `medio` e `dificil` com mesma lente
3. Adicionar reposições PT-BR cotidianas para manter contagens (400/400/371/300)
4. Sincronizar banco limpo em index.ts (Edge Function) e data/word_bank_final.json
```

---

### Chat I — Modo Arquivo (puzzles anteriores)

```
Frente: implementar UX para jogar puzzles de dias anteriores.

Estado atual:
- Lógica já existe no debug mode: palavraPorOffset(offset) e resetParaDebug(offset)
  → gera a palavra de qualquer dia a partir de um offset relativo a hoje
- Edge Function aceita ?date=YYYY-MM-DD para lookup histórico no Storage
- Sem UX para o jogador comum — apenas acessível via Ctrl+Shift+D

Itens:
1. Botão "Arquivo 📅" no cabeçalho (ao lado dos ícones de stats/tutorial)
2. Modal de seleção: calendário ou lista dos últimos N puzzles com data + dificuldade
3. Ao jogar arquivo: estado separado (não sobrescreve gliffoo_state do dia atual)
4. Não conta para streak; indicação visual clara ("Modo Arquivo — #{N}")
5. Conquistas de arquivo opcionais (ex: completar 7 puzzles do arquivo)
```

---

### ~~Chat J~~ — ✅ Concluído (ver Histórico de Chats Concluídos acima)

---

### ~~Chat K~~ — ✅ Concluído (ver Histórico de Chats Concluídos acima)

---

### ~~Chat L~~ — ✅ Concluído (ver Histórico de Chats Concluídos acima)

---

### ~~Chat M~~ — ✅ Concluído (ver Histórico de Chats Concluídos acima)

---

### ~~Chat N~~ — ✅ Concluído (ver Histórico de Chats Concluídos acima)
