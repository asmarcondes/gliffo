# Plano: Dueto & Quarteto no Gliffo
> Adaptação original — não é uma cópia do term.ooo

**Última atualização:** Mar 2026 — análise completa de mecânica + adequação ao Gliffo

---

## 0. Análise: por que o termo.ooo Dueto/Quarteto funciona

O Dueto e o Quarteto do term.ooo (e análogos como Dordle/Quordle) funcionam por uma
mecânica de **eficiência de informação**: cada guess revelada em múltiplos boards ao mesmo
tempo compensa ter menos tentativas dedicadas por board.

| Modo | Tentativas | Boards | Att/board | Base |
|---|---|---|---|---|
| Wordle | 6 | 1 | 6.0 | Wordle 5L |
| Dueto | 7 | 2 | 3.5 | Wordle + 1 |
| Quarteto | 9 | 4 | 2.25 | Wordle + 3 |

**Fórmula term.ooo:** base + (N − 1) tentativas extras.

### O que Gliffo tem que term.ooo NÃO tem

| Elemento | Impacto |
|---|---|
| Glifo SVG por board | Feedback visual mais rico mas cognitivamente mais pesado |
| **Chave Decodificadora — 1 por jogo** | Recurso **escasso e estratégico** — no modo normal é única por partida |
| Palavras 4–7L (não fixo 5L) | Comprimento variável exige que todos os boards tenham mesmo WN |
| 4 tentativas base (vs 6 Wordle) | Partida mais apertada — a escala de extras precisa ser cuidadosa |
| Teclado SEM estado "eliminado" | Feedback do glifo substitui o teclado; kbd mostra apenas decoded/found |

### Problema central da transposição direta

O jogo base do Gliffo já é *mais difícil* que o Wordle em tentativas/board (4 vs 6).
Aplicar a fórmula do term.ooo (`4 + N−1`) geraria:
- Dueto: 5 att → **muito difícil** (2.5/board)
- Quarteto: 7 att → **punitivo** (1.75/board)

A solução é uma progressão aritmética simples **+2 por modo**:
- Normal: 4 | Dueto: 6 | Quarteto: 8

Esse intervalo é suficiente porque a **Chave continua sendo 1 por jogo** (alta escassez),
e a informação cross-board (mesma guess informa todos) compensa.

---

## 1. Visão Geral da Mecânica

### O que é
- O jogador resolve **N palavras ao mesmo tempo** (N=2 Dueto, N=4 Quarteto)
- Cada tentativa digitada aplica-se a **todos os boards** simultaneamente
- Cada board tem seu próprio **Glifo do Dia** e feedback independente
- O jogo só termina quando **todos os boards** forem decodificados (ou tentativas esgotarem)

### Diferenças do term.ooo para o Gliffo Multi
| Aspecto | term.ooo Dueto/Quarteto | Gliffo Dueto/Quarteto |
|---|---|---|
| Feedback por board | Grade 5×6 de letras coloridas | Glifo SVG dinâmico (letras desaparecem ao decodificar) |
| Estado do teclado | Verde/Amarelo/Cinza (simples) | decoded/found mesclado — **sem estado "eliminado"** (igual ao normal) |
| Dica/Hint | Nenhuma | **1 Chave por jogo** (igual ao modo normal — ver §6) |
| Comprimento | Fixo 5L em todos os boards | Variável 4–7L, **todos os boards idêntico** no mesmo puzzle |
| Tentativas base | 6 (Wordle) | 4 (Gliffo) |
| Extra por modo | +1 Dueto, +3 Quarteto | **+2 por modo**: Dueto=6, Quarteto=8 (ver §8) |
| "Seu Glifo" | Não existe | **Único e central** — compartilhado, pois a tentativa é a mesma para todos |

---

## 2. Arquivos a Criar

```
dueto.html       ← standalone auto-suficiente (~1800 linhas)
quarteto.html    ← standalone auto-suficiente (~2000 linhas, N=4)
```

Mesma abordagem do `arena.html`: single-file, CSS + JS + dados inline.
Reutiliza blocos copiados do `index.html`: LETTERS, makeSVG, PALAVRAS, DICIONARIO.

Navegação: links no menu/header do `index.html` — ex: dois ícones abaixo do título
("DUETO" com dois glifos sobrepostos, "QUARTETO" com quatro).

---

## 3. Estado do Jogo

### Estado por board (array `GW[i]`)
```js
GW[i] = {
  word:    "MESA",          // palavra alvo do board i
  letters: ["M","E","S","A"], // WL por board
  WN:      4,               // comprimento (igual em todos os boards)
  colorOf: {},              // letra → cor SVG (independente por board — ver §5)
  decoded: new Set(),       // posições decodificadas (corretas)
  found:   new Set(),       // letras encontradas (posição errada)
  keyPos:  new Set(),       // posições reveladas pela Chave (se usada neste board)
  done:    false,
  won:     false,
  // histórico por board
  history: [],              // [{decoded:[], found:[]}] — uma entry por tentativa
}
```

### Estado global compartilhado (`G`)
```js
G = {
  N:         2,             // número de boards (2=dueto, 4=quarteto)
  WN:        4,             // comprimento da palavra (igual em todos)
  MAX_ATT:   6,             // tentativas máximas — Dueto=6, Quarteto=8 (ver §8)
  typed:     [],            // input atual do jogador (array esparso compartilhado)
  cursor:    0,             // cursor atual (compartilhado)
  attempts:  [],            // histórico global [{word}] — só a palavra tentada
  done:      false,         // todos os boards terminaram (won ou lost)
  won:       false,         // todos os boards foram decodificados
  keyUsed:   false,         // **Chave única por jogo** — quando true, bloqueia o botão 🔑
  keyBoard:  null,          // qual board recebeu a Chave (null = não usada ainda)
  selKey:    null,          // posição selecionada no modal da Chave
  _flipping: false,
  _flipGen:  0,
}
```

**Nota sobre a Chave**: 1 única por jogo inteiro (igual ao modo normal). `G.keyUsed = true`
permanece para toda a sessão. `G.keyBoard` registra qual board recebeu a revelação.
Não há reset de `keyUsed` entre tentativas — o botão 🔑 some definitivamente após o uso.

---

## 4. Layout Visual

### Dueto — layout fixo 2 colunas

```
┌────────────────────────────────────────────────┐
│  🔷 GLIFFO DUETO   #42   [?] [☀] [📊]         │
├────────────────────┬───────────────────────────┤
│  Board 1 (âmbar)   │  Board 2 (quartzo)        │
│  ┌──────────────┐  │  ┌──────────────┐         │
│  │ Glifo do Dia │  │  │ Glifo do Dia │         │
│  │   [SVG]      │  │  │   [SVG]      │         │
│  └──────────────┘  │  └──────────────┘         │
│  [histórico dots]  │  [histórico dots]          │
│  ✓ resolvido!      │                            │
├────────────────────┴───────────────────────────┤
│         ┌──────────────────────────┐           │
│         │   Seu Glifo (central)    │           │
│         │         [SVG]            │           │
│         └──────────────────────────┘           │
│  [ R ][ O ][ S ][ A ]    6/6  [🔑 Usar Chave] │
├────────────────────────────────────────────────┤
│              TECLADO (feedback mesclado)        │
└────────────────────────────────────────────────┘
```

### Quarteto — layout 2×2

```
┌──────────────┬──────────────┐
│  Board 1     │  Board 2     │
│  [Glifo Dia] │  [Glifo Dia] │
│  [hist dots] │  [hist dots] │
├──────────────┼──────────────┤
│  Board 3     │  Board 4     │
│  [Glifo Dia] │  [Glifo Dia] │
│  [hist dots] │  [hist dots] │
└──────────────┴──────────────┘
      [Seu Glifo — central]
  [ M ][ E ][ S ][ A ]     9/9
  [🔑 Usar Chave]
        TECLADO
```

### Mobile (< 600px)
- **Dueto**: 2 colunas compactas lado a lado (sem "Seu Glifo" visível acima do fold)
- **Quarteto**: 2×2 compacto com glifos reduzidos (~80px), swipe para ver detalhes de cada board

---

## 5. Cor de Cada Board (Identidade Visual)

Cada board tem uma **cor de acento** derivada de `GLYPH_COLORS`:

| Board | Cor | Uso |
|---|---|---|
| 0 | `#f5a623` âmbar | Borda do painel, badge "resolvido", dot do kbd |
| 1 | `#9b8fe8` lavanda | Borda do painel, badge "resolvido", dot do kbd |
| 2 | `#e87a6b` coral | (só Quarteto) |
| 3 | `#5bbfa0` mint | (só Quarteto) |

As cores SVG das letras dentro de cada board são construídas com `colorOf[i]` próprio de cada
board, usando `GLYPH_COLORS[(letterIndex + boardIndex * 3) % 7]` como seed inicial.
Isso garante paletas visualmente distintas entre boards.

---

## 6. Chave Decodificadora — Adaptação para Multi-Board

### Princípio: mantém a mesma escassez do modo normal

No modo normal: **1 Chave por jogo** — revelação única, permanente, de alto valor.
No multi-board: **a mesma regra** — 1 Chave por jogo, compartilhada entre todos os boards.
O jogador escolhe **em qual board** aplicar a sua única chave.

```
Normal:   1 Chave → revela 1 posição da única palavra
Dueto:    1 Chave → revela 1 posição em 1 dos 2 boards (jogador escolhe)
Quarteto: 1 Chave → revela 1 posição em 1 dos 4 boards (jogador escolhe)
```

Essa escolha **torna a Chave estratégica** no multi-board: qual board merece a revelação?
O board mais difícil? O que está mais perto de ser resolvido? O que bloqueou a sinergia?

### UX da Chave adaptada (dois passos)

1. Jogador clica em **🔑 Usar Chave** (botão visível enquanto `!G.keyUsed`)
2. Todos os boards disponíveis ficam com **borda pulsante âmbar** (seleção de board)
3. Jogador **clica em um board** → modal de seleção de posição abre (idêntico ao normal)
4. Jogador seleciona a posição → confirma
5. `GW[i].keyPos.add(pos)`, `G.keyUsed = true`, `G.keyBoard = i`
6. Botão 🔑 some definitivamente (sem reset entre tentativas)

### Balanceamento com 1 Chave total

| Modo | Chaves | Boards | Posições por palavra possíveis |
|---|---|---|---|
| Normal | 1 | 1 | 1/WN (ex: 1/5 = 20%) |
| Dueto | 1 | 2 | 0.5/WN por board em média |
| Quarteto | 1 | 4 | 0.25/WN por board em média |

A escassez aumenta com o número de boards — o que é intencional. A Chave se torna
decisão de alto peso, não "uso automático quando possível".

**Boards já resolvidos** não são elegíveis para receber a Chave (borda sem pulso).

---

## 7. Feedback do Teclado (Mesclado)

O teclado é **compartilhado** entre todos os boards. A tecla exibe o estado
**mais informativo** considerando todos os boards ainda ativos:

| Prioridade | Condição | Visual |
|---|---|---|
| 1 | Letra decodificada (pos certa) em **qualquer** board | `decoded` — âmbar sólido |
| 2 | Letra encontrada (pos errada) em **qualquer** board ativo | `found` — borda âmbar |
| 3 | Sem informação ainda | neutro |

**Por que não há estado "eliminado" no teclado?**
O Gliffo normal já não exibe letras eliminadas no teclado — o feedback vem do Glifo do Dia:
quando uma letra não existe na palavra, ela simplesmente não aparece (ou não "acende") no SVG.
Em multi-board isso é ainda mais correto: a mesma letra pode estar ausente num board e
presente em outro. Cada Glifo do Dia mostra individualmente o que sobrou naquele board.
O teclado serve apenas para orientação *positiva* (o que foi encontrado/confirmado).

**Comportamento de `decoded` no teclado multi-board:**
Uma letra pode estar `decoded` em posições diferentes em boards diferentes (ex: "A" é a
posição 2 no board 0 e posição 4 no board 1). O teclado marca como `decoded` (âmbar sólido)
se for verdade em *qualquer* board. A posição exata vem do Glifo/slots de cada board.

---

## 8. Tentativas e Condições de Término

### Justificativa dos números

O Gliffo normal tem **4 tentativas** — já apertado para a mecânica de glifo.
Aplicar a fórmula do term.ooo (base + N-1) daria:
- Dueto: 4+1 = **5** → difícil demais (2.5/board < que Gliffo normal)
- Quarteto: 4+3 = **7** → punitivo (1.75/board)

A Chave por board (§6) reduz a quantidade de revelações totais vs "por turno",
o que justifica dar mais tentativas. Nossa fórmula: **base + N**:

| Modo | Fórmula | Tentativas | Att/board | Chaves |
|---|---|---|---|---|
| Normal | 4 + 0 | **4** | 4.0 | 1 total |
| Dueto | 4 + 2 | **6** | 3.0 | 2 total (1/board) |
| Quarteto | 4 + 5 | **9** | 2.25 | 4 total (1/board) |

**6 tentativas no Dueto**: cada board tem em média 3 tentativas dedicadas —
ligeiramente mais generoso que o normal, compensando a atenção dividida.

**9 tentativas no Quarteto**: espelho exato do Quarteto do term.ooo (de base 6 para base 4,
a proporção relativa é mantida). Cognitivamente é o modo mais exigente.

### Condições de término

| Modo | Vitória | Derrota |
|---|---|---|
| Normal | Word decodificada | Tentativas esgotadas |
| Dueto | **Ambas** decodificadas antes da 7ª tentativa | 6 tentativas sem resolver tudo |
| Quarteto | **Todas as 4** decodificadas antes da 10ª | 9 tentativas sem resolver tudo |

**Board resolvido individualmente**: quando `GW[i].decoded.size === WN`, o board i fica
"fechado" — overlay verde translúcido com a palavra revelada, animação de confetes
pequenos apenas naquele painel. O input continua para os boards restantes.

**Derrota parcial no Quarteto**: é possível resolver 3 de 4 boards e perder o jogo
(o 4º não foi decodificado). A tela de fim mostra quantas palavras foram resolvidas.

---

## 9. "Seu Glifo" — Central e Compartilhado

No Gliffo normal há dois glifos por jogo: "Glifo do Dia" e "Seu Glifo".

No modo multi-board:
- **Glifo do Dia**: N glifos independentes, um por board (mostram letras restantes)
- **Seu Glifo**: **1 único**, centralizado, compartilhado por todos os boards

A tentativa digitada é a **mesma** para todos os boards — portanto o "Seu Glifo"
representa exatamente isso: a palavra que o jogador está construindo agora,
independente de a qual board pertence. Ter N glifos do jogador seria redundante e confuso.

Positionamento: entre o grid de boards e a área de input/slots/teclado.
Paleta: `GLYPH_COLORS[i % 7]` com o índice incremental por letra (sem vinculação a board).

---

## 10. Histórico por Board (compacto)

Cada board-panel mostra um histórico compacto de tentativas já feitas:

```
Tentativa 1: ROSA  •• (2 decoded em âmbar, 1 found em lavanda)
Tentativa 2: MALA  •  (1 decoded)
Tentativa 3: BOLA  ✓✓✓✓ palavra resolvida!
```

A palavra (ex: "ROSA") é omitida nos panels — está no histórico global compartilhado
que o jogador pode ver se quiser. O panel mostra só os dots coloridos de feedback
para economizar espaço.

**Formato dos dots no histórico por board:**
- Cada tentativa: uma linha de dots onde:
  - 🔵 (cor do board) = decoded naquela posição
  - ⚪ (neutro) = not decoded yet
  - Ponto especial com borda âmbar = posição revelada pela Chave

---

## 11. Compartilhamento e Estatísticas

### Emojis de share

**Dueto** (6 tentativas, ex: resolvido em 5, chave usada):
```
Gliffo Dueto #42 — 5/6 🔑
🟧⬛  🟦⬛
🟧🟧  🟦⬛
🟧🟧  🟦🟦
✅✅✅  🟦🟦🟦
✅✅✅✅  ✅✅✅✅
```
Cada linha: board 0 dots | espaço | board 1 dots
🟧=decoded board0, 🟦=decoded board1, ⬛=não decoded, ✅=posição decoded (ganha)
🔑=chave usada neste jogo (sem indicar em qual board)

**Quarteto** (8 tentativas):
Cada linha tem 4 blocos separados por espaço:
```
Gliffo Quarteto #42 — 7/8 🔑
🟧⬛  🟦⬛  🟩⬛  🟨⬛
🟧🟧  🟦⬛  🟩⬛  🟨🟨
🟧🟧🟧  🟦🟦  ✅✅✅✅  🟨🟨🟨
...
```
(compacto — dots por board, linha por tentativa)

### localStorage separado por modo
```
gliffoo_dueto_YYYY-MM-DD     → save state
gliffoo_dueto_stats          → { played, won, streak, maxStreak, dist[1..6] }
gliffoo_quarteto_YYYY-MM-DD  → save state
gliffoo_quarteto_stats       → { played, won, streak, maxStreak, dist[1..8] }
```

### Save State completo
```js
{
  date, puzzle, N, WN,
  words: ["ROSA","MALA"],           // N palavras
  attempts: ["BOLA","MALA",...],    // só as palavras tentadas
  keyUsed: true,                    // Chave global — 1 por jogo
  keyBoard: 0,                      // board que recebeu a Chave (null = não usada)
  GW: [
    { decoded:[0,2], found:["O"], keyPos:[1], done:true, won:true,
      history:[{decoded:[],found:[]},{decoded:[0],found:["O"]},{decoded:[0,2],found:[]}] },
    { decoded:[], found:[], keyPos:[], done:false, won:false,
      history:[...] }
  ],
  done: false, won: false, timestamp: 1741823400000
}
```

---

## 12. Seleção de Palavras

### Estratégia: seeds independentes por board, mesmo nível do dia

```js
// Mesma lógica de index.html para obter (nivel, diasDesdeEpoca)
// Para dueto/quarteto, N palavras do mesmo nível:
function pickWords(lista, N, baseIdx) {
  const words = new Set();
  const seeds = [1, 2654435761, 2246822519, 1013904223]; // seeds LCG diferentes
  let picks = [];
  for (let b = 0; b < N; b++) {
    let idx = ((baseIdx * seeds[b]) >>> 0) % lista.length;
    // Garante unicidade
    while (lista[idx] === lista[baseIdx] || picks.includes(lista[idx])) {
      idx = (idx + 1) % lista.length;
    }
    picks.push(lista[idx]);
  }
  return picks; // N palavras distintas do mesmo nível
}
```

### Extensão da Edge Function `daily-word`
```
GET /functions/v1/daily-word?mode=dueto
→ { words: ["ROSA","BALA"], nivel: "facil", nivelLabel: "Fácil", puzzle: 42, date: "2026-03-12" }

GET /functions/v1/daily-word?mode=quarteto
→ { words: ["ROSA","BALA","MESA","CANA"], nivel: "facil", puzzle: 42, date: "2026-03-12" }
```

Palavra selecionada para Dueto ≠ palavra do dia normal (seeds diferentes garantem isso).
Fallback offline: derivação local com date hash, sem fetch — identidade garantida.

---

## 13. Roadmap de Implementação

### Chat Du-A — Engine + `dueto.html` (núcleo)
**Objetivo**: jogo funcional sem polish visual

- [ ] HTML base: estrutura de 2 board-panels + Seu Glifo central + input + teclado
- [ ] CSS: layout-grid 2 colunas, board-panel com borda colorida, tokens do index.html
- [ ] Estado: `G` global + `GW[2]` por board
- [ ] `pickWordsLocal(N)`: seleção de palavras com seeds independentes (fallback)
- [ ] `fetchWords(mode)`: integração Edge Function com fallback para pickWordsLocal
- [ ] `decodeMulti()`: aplica two-pass em todos os GW, atualiza `GW[i].decoded/found/history`
- [ ] `handleKey(k)`: input compartilhado — cursor não-linear do index.html adaptado
- [ ] `buildBoxes()`: slots compartilhados (WN slots, cursor único)
- [ ] `renderAllBoards()`: loop `renderBoardDaily(i)` para cada board
- [ ] `renderYoursCentral()`: Seu Glifo único central
- [ ] `buildKB()`: teclado com estado mesclado (decoded/found de todos os GW, sem elim)
- [ ] Flip animation herdada do index.html — executada em todos os boards simultaneamente
- [ ] Lógica de board concluído: overlay com palavra revelada + mini-confetes por board
- [ ] `G.done = GW.every(b => b.done)` → fim de partida

### Chat Du-B — Chave (1/jogo) + Histórico + Fim + Stats

- [ ] Chave: `G.keyUsed` único, sem reset — botão 🔑 some definitivamente após uso
- [ ] UX em dois passos: selecionar board (borda pulsante) → selecionar posição (modal)
- [ ] `G.keyBoard` registra qual board recebeu; salvo no estado
- [ ] Histórico compacto por board (dots coloridos por tentativa)
- [ ] Tela de fim de partida: resultado, palavras reveladas, share, stats
- [ ] Stats modal: distribuição de tentativas, streak
- [ ] `buildShareText()`: emojis alinhados multi-board com 🔑 se chave foi usada
- [ ] Save/load estado completo no localStorage
- [ ] Reconstrói jogo exatamente do save ao reabrir a página (mesmo dia)

### Chat Du-C — Mobile + `quarteto.html`

- [ ] Media queries: mobile < 600px (boards menores, glifos 80px, scroll vertical)
- [ ] `quarteto.html`: N=4, MAX_ATT=**8**, layout 2×2, todos os 4 boards
- [ ] Layout 2×2 CSS Grid responsivo para Quarteto
- [ ] Link de acesso no `index.html` (ícones "DUETO" e "QUARTETO" no header ou seção)
- [ ] Share emoji para Quarteto (4 blocos por linha, 🔑 se usada)
- [ ] Animação especial "PERFEITO!" — resolveu todos os boards antes de esgotar tentativas

### Chat Du-D — Edge Function TypeScript

- [ ] `supabase/functions/daily-word/index.ts`: parâmetro `?mode=single|dueto|quarteto`
- [ ] Seleção de N palavras com seeds LCG independentes por board
- [ ] Garante N palavras distintas entre si e distintas da palavra do modo `single`
- [ ] Resposta: `{ words: string[], nivel, nivelLabel, puzzle, date }` (sempre array)
- [ ] Backward compat: sem `mode` ou `mode=single` → `{ word: string, ... }` (objeto,
  não array) para não quebrar o index.html existente

---

## 14. Reutilização do `index.html`

| Bloco | Linhas aprox. | Adaptação |
|---|---|---|
| `LETTERS` (paths SVG A–Z) | ~2810–3395 | Cópia direta — não muda |
| `makeSVG(l, color, style)` | ~3399–3420 | Cópia direta |
| `GLYPH_COLORS[7]` | 1 linha | Cópia direta |
| `PALAVRAS` (banco 1325 palavras) | ~3450–4934 | Cópia direta |
| `DICIONARIO` + `dicionarioValido()` | ~5100–5200 | Cópia direta |
| CSS vars + tema dark/light | ~1–900 | Reutilizar ~90%, adicionar `.board-panel`, `.board-done` |
| `buildKB()` | ~5450–5530 | Refatorar → estado mesclado (decoded/found de todos os GW) |
| `decode()` two-pass | ~5696–5830 | Refatorar → `decodeMulti()` aplica em todos os GW[i] |
| `openKeyModal()` / `useKey()` | ~5950–6000 | Refatorar → dois passos; `G.keyUsed` sem reset por turno |
| `winAnim()` + confetes | ~6070–6200 | Celebração final (todos boards completos) |
| `eeCanvasConfetti()` | inline | Mini-confetes por board ao resolver individualmente |
| `buildHistory()` / `prependHistoryRow()` | ~5533–5560 | Substituir por dots compactos por board |
| `salvarEstado()` / `carregarEstado()` | ~5200–5235 | Adaptar para formato multi-board com `keyUsed`/`keyBoard` |

---

## 15. Notas de Balanceamento

### Por que 6 att no Dueto é balanceado
- Cada board tem em média 3 tentativas — ligeiramente abaixo do normal (4), mas cada guess
  informa os 2 boards simultaneamente, dobrando o retorno de informação por tentativa
- A Chave é única para o jogo: o jogador deve escolher em qual board ela tem mais impacto
- Experiência alvo: ~80% de taxa de vitória para jogadores regulares do modo normal

### Por que 8 att no Quarteto é balanceado
- 8 att / 4 boards = 2.0 por board — o mais desafiador, mas cada guess informa os 4 boards
- Com 1 Chave para 4 boards, a decisão de onde usar se torna o momento estratégico central
- A informação cross-board é multiplicada por 4 → cada tentativa tem retorno 4× maior
- Experiência alvo: ~65% de taxa de vitória (modo difícil, requer estratégia)

### Dificuldade cognitiva — o desafio real
O verdadeiro desafio não é matemático — é **gerenciar N glifos ao mesmo tempo**.
O Glifo SVG requer leitura visual ativa (quais letras ainda aparecem no stack?).
O jogador deve:
1. Ler N glifos independentes — quais letras restam em cada um?
2. Encontrar a guess com melhor overlap cross-board (ex: palavra que cobre letras suspeitas em todos)
3. Decidir o momento ideal para usar a Chave — em qual board, em qual posição
4. Acompanhar o teclado mesclado (decoded/found de todos os boards de uma vez)

A complexidade cognitiva justifica o número generoso de tentativas — o desafio vem da
*leitura e síntese multi-board*, não da escassez de tentativas.
