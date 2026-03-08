# glif.foo — Contexto do Projeto

## O que é

Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Stack

- **Single-file:** `index.html` — HTML + CSS + JS, sem dependências externas
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

### 🟡 Chat I — Modo Arquivo (puzzles anteriores)

**Problema:** Jogadores não conseguem voltar a puzzles perdidos. Estrutura do debug mode (`palavraPorOffset()`, `resetParaDebug()`) já implementa a lógica — falta UX.

**Itens:**

1. Botão "Arquivo" no cabeçalho (ou dentro do modal de stats)
2. UI de seleção por data ou número de puzzle
3. Aproveitar Edge Function `?date=YYYY-MM-DD` para puzzles históricos
4. Estado de arquivo separado do estado diário (sem sobrescrever `gliffoo_state`)
5. Indicação visual clara de que é modo arquivo (não conta para streak)

---

### 🟡 Chat J — Decisão Beta Reset + Streak Cross-Device

**Problema:** `BETA_END_DATE = 2026-06-01` vai zerar estatísticas de todos os jogadores em ~3 meses. Decisão de produto necessária antes do lançamento oficial.

**Itens:**

1. Definir: manter beta reset (lançamento limpo) ou remover flag e preservar histórico
2. Se remover: limpar `checkBetaReset()`, `BETA_END_DATE`, `BETA_RESET_KEY` do código
3. Avaliar streak cross-device: Supabase Auth simples (email magic link) ou manter local-only
4. Se cross-device: schema Supabase `user_stats`, sync no `atualizarStats()`

---

### 🟡 Chat K — Race Condition do Dicionário

**Problema:** `DICIONARIO` é populado de forma async (localStorage/fetch), mas `dicionarioValido()` é chamado síncronamente no submit. Se o usuário submeter antes do fetch/parse completar (improvável mas possível em conexões lentas sem cache), o Set estará vazio e a validação cai no fallback PALAVRAS — aceitando qualquer coisa.

**Itens:**

1. Adicionar flag `dicReady = false` → `true` após Set populado
2. No submit: se `!dicReady`, mostrar spinner breve ou aceitar (graceful degradation)
3. Alternativa mais simples: pré-popular `DICIONARIO` com `PALAVRAS` (inline, sync) e substituir pelo JSON após fetch

---

### 🟢 Chat L — Compartilhar Passaporte (verificação iOS)

**Problema:** Botão "📸 Compartilhar passaporte" usa Canvas `toBlob` + `navigator.share` — funcionalidade com limitações conhecidas em iOS Safari (requer interação do usuário, `share` com `files` só em iOS 15+).

**Itens:**

1. Testar fluxo no iOS Safari — identificar falhas
2. Fallback: se `navigator.share` com files não disponível, fazer download direto (`<a download>`)
3. Fallback 2: copiar link com og.png como alternativa ao canvas

---

### 🟢 Chat M — Acessibilidade

**Problema:** Feedback de letras não anunciado para leitores de tela. Modal de conquistas sem navegação por teclado. Sem suporte a alto contraste.

**Itens:**

1. `aria-live="polite"` no `#fbmsg` e nas mensagens de feedback
2. `aria-label` adequados nos slots de letra e no teclado virtual
3. Navegação por Tab/Enter nos modais de conquistas e stats
4. Tema alto contraste como variante CSS (`prefers-contrast: more`)

---

### 🟢 Chat N — Modo Difícil

**Problema:** Sem variante de dificuldade de gameplay (apenas dificuldade de vocabulário já existe via ciclo semanal).

**Itens:**

1. Toggle "Modo Difícil" nas configurações
2. Regra: letras confirmadas (decoded/found) devem aparecer nas tentativas seguintes
3. Regra: avisos de `calcWarns()` desativados (sem indicação de letras eliminadas/posição errada)
4. Persiste em localStorage (`gliffoo_hard_mode`)
5. Badge de conquista exclusivo para vitorias em modo difícil

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

### Chat J — Decisão Beta Reset + Configurações

```
Frente: resolver a flag de beta reset e centralizar configurações do jogo.

Estado atual:
- BETA_END_DATE = 2026-06-01: em ~3 meses, checkBetaReset() vai zerar estatísticas
  de TODOS os jogadores. Decisão de produto necessária.
- Não existe tela de configurações — toggle dark/light está no header, sem local
  centralizado para futuras opções (modo difícil, notificações, etc.)

Itens:
1. Definir: manter beta reset (lançamento limpo em jun/2026) ou remover a flag
2. Se remover: limpar checkBetaReset(), BETA_END_DATE, BETA_RESET_KEY do código
3. Criar modal de Configurações (ícone ⚙️ no header):
   - Toggle dark/light (mover para cá)
   - Toggle modo difícil (preparar para Chat N)
   - Botão "Resetar estatísticas" com confirmação
4. Persiste configurações em localStorage gliffoo_config
```

---

### Chat K — Race Condition do Dicionário

```
Frente: tornar o carregamento do dicionário robusto.

Estado atual:
- DICIONARIO é populado de forma async (localStorage/fetch)
- dicionarioValido() é chamado síncronamente no submit
- Se o usuário submeter nos primeiros ~100ms (conexão lenta, sem cache):
  Set vazio → fallback PALAVRAS → qualquer palavra de 4-7L seria aceita

Itens:
1. Opção A (recomendada): pré-popular DICIONARIO = new Set(Object.values(PALAVRAS).flat())
   de forma síncrona imediatamente, depois substituir pelo JSON completo após fetch
2. Opção B (estrita): no submit, se !dicReady, bloquear com feedback "Carregando..." e re-tentar
3. Implementar flag let dicReady = false → true após Set populado (para logs/debug)
```

---

### Chat L — Verificação Share iOS & Passaporte

```
Frente: garantir que o compartilhamento funciona em todos os dispositivos.

Estado atual:
- "📸 Compartilhar passaporte" usa Canvas toBlob() + navigator.share({ files })
- iOS Safari: share com files requer iOS 15+; toBlob() tem bugs de escala em alguns devices
- Sem fallback implementado atualmente

Itens:
1. Detectar suporte: if (!navigator.canShare?.({ files: [blob] }))
2. Fallback primário: <a download="glifoo-passaporte.png"> ao invés de share
3. Fallback secundário: copiar texto alternativo (share de texto já implementado)
4. Feedback visual durante geração do canvas (loading spinner)
```

---

### Chat M — Acessibilidade

```
Frente: melhorar suporte a leitores de tela e navegação por teclado.

Estado atual:
- Feedback de letras (#fbmsg) não tem aria-live → leitores de tela ignoram
- Slots de letra têm role implícito, sem aria-label descritivo
- Teclado virtual: botões sem label de texto visível
- Modais de conquistas/stats sem trap de foco

Itens:
1. aria-live="polite" no #fbmsg e mensagens de resultado
2. aria-label dinâmico nos .lbox: "Posição 1 — vazia" / "Posição 2 — letra B, confirmada"
3. aria-label nos botões do teclado virtual: "Letra A", "Apagar", "Confirmar"
4. Focus trap nos modais (Tab/Shift+Tab circula dentro do modal)
5. CSS @media (prefers-contrast: more) com bordas mais espessas e sem blur
```

---

### Chat N — Modo Difícil

```
Frente: implementar variante de gameplay mais desafiadora.

Estado atual:
- Dificuldade atual é apenas de vocabulário (ciclo semanal 4L→7L)
- calcWarns() mostra avisos contextuais (letras eliminadas, posição errada conhecida)
- Chat J (Configurações) é pré-requisito

Itens:
1. Toggle "Modo Difícil 🔥" no modal de Configurações (Chat J prerequisito)
2. Regras:
   a. Letras decoded (posição certa) devem aparecer na mesma posição → validar no submit
   b. Letras found (existem mas posição errada) devem aparecer em alguma posição
   c. calcWarns() desativado (sem avisos de "letra eliminada" ou "posição diferente")
3. Badge "🔥 Difícil" persistente no cabeçalho durante partida
4. Persiste: gliffoo_config.hardMode; não ativa no meio de uma partida em andamento
5. Share: adiciona "🔥" ao texto compartilhado
6. Conquista: "Ferro em Brasa" — vencer no modo difícil
```
