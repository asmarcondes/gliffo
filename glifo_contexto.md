# glif.foo — Contexto do Projeto

## O que é

Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Stack

- **Single-file:** `index.html` (~7977 linhas) — HTML + CSS + JS, sem dependências externas
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

| Passo | Conteúdo                                                                    |
| ----- | --------------------------------------------------------------------------- |
| 1/7   | Glifo pulsando — "o que é isso?"                                            |
| 2/7   | Animação ISO em loop — A→L→O→B chegando em perspectiva                      |
| 3/7   | Digita VALE ao vivo, Seu Glifo se forma                                     |
| 4/7   | Feedback VALE vs BOLA                                                       |
| 5/7   | Cor única por letra                                                         |
| 6/7   | Interação obrigatória: reorganiza letras para BOLA (bloqueado até resolver) |
| 7/7   | Vitória: cards resumo + "Jogar agora! 🎮"                                   |

- Tem botão **Pular** + botão **✕** (mclose) para fechar
- Auto-show na primeira visita (`localStorage: gliffoo_tutdone`)

## Edge Function — `daily-word`

- **URL:** `https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word`
- **Auth:** `verify_jwt: false` (pública)
- **Parâmetro opcional:** `?date=YYYY-MM-DD` (debug/modo arquivo)
- **Resposta:** `{ word, nivel, nivelLabel, puzzle, date }`

### Lógica atual

```ts
// Época: 2025-01-01T00:00:00Z
// diasDesdeEpoca = (hoje - EPOCA) / 86400000
// nivel = CICLO_DIF[hoje.getUTCDay()]
// idx = ((diasDesdeEpoca * 2654435761) >>> 0) % lista.length
```

### Ciclo de dificuldade (por dia da semana)

```
CICLO_DIF = ["facil","medio","medio","dificil","dificil","muito_dificil","muito_dificil"]
// Dom=facil, Seg=medio, Ter=medio, Qua=dificil, Qui=dificil, Sex=muito_dificil, Sab=muito_dificil
```

### Banco espelhado na Edge Function

O banco `PALAVRAS` está **duplicado** entre `index.html` e `index.ts` — ao atualizar o banco de palavras, ambos precisam ser atualizados em sincronia.

```
PALAVRAS = {
  facil:        334 palavras (4L)
  medio:        394 palavras (5L)
  dificil:      368 palavras (6L)
  muito_dificil: 169 palavras (7L)
}
DICIONARIO: ~1251 palavras 5L extras para validação
```

- `dicionarioValido(word)`: 5L aceita PALAVRAS+DICIONARIO; outros só PALAVRAS
- `words_ptbr_year.json`: 365 dias provisório (seed=42), já gerado

## Pendente (em ordem de prioridade)

### Chat A — Banco de Palavras & Dicionário

1. **Banco de palavras PT-BR curado** via `fserb/pt-br`:
   - ICF baixo=comum, alto=raro; filtrar 4–7L, sem acento, só A–Z
   - Combinar scoreVisual × ICF para dificuldade
   - Regenerar `words_ptbr_year.json` com banco curado
2. **Dicionário de validação completo** para 4/6/7L (hoje só 5L tem DICIONARIO extra)

### Chat B — Backend & Infra

3. **Edge Function `daily-word`** — atualizar para consumir `words_ptbr_year.json`
4. Lógica de CICLO_DIF no backend

### Chat C — Features de Engajamento

5. **Sistema de streak e estatísticas** — dias consecutivos, distribuição, compartilhar
6. **PWA** — manifest, service worker, ícones

### Chat D — Tutorial

7. Atualizar passo 6 do tutorial (swap foi removido — agora é cursor não-linear)
8. Demonstrar o novo sistema de input no tutorial

## Decisões de Design

- Arquivo único sem dependências (intencional)
- Swap de letras **REMOVIDO** — substituído por cursor não-linear clicável
- Tutorial usa BOLA (4L) para demonstração; jogo usa 4–7L por dificuldade (facil=4L, medio=5L, dificil=6L, muito_dificil=7L)
- Input não-linear: clicar em qualquer slot move o cursor sem apagar
- Feedback de palavra inválida: borda vermelha em todos slots não-decoded
- Slot com cursor mantém borda âmbar mesmo no estado inválido
- Histórico de tentativas em ordem reversa (mais recente no topo)
- `renderDaily` recebe índices para animar só letras específicas

---

## Prompts para Novos Chats

> Cole o **Prompt Base** em todo novo chat. Depois adicione o bloco específico da frente de trabalho.

### Prompt Base (sempre)

```
Você é um colaborador sênior no desenvolvimento do glif.foo, um jogo de palavras PT-BR com glifos geométricos SVG.

Sempre:
- Leia o glifo_contexto.md (arquivo no projeto) antes de qualquer alteração
- Trabalhe diretamente no index.html — arquivo único (~8000 linhas) sem dependências
- Mantenha a identidade visual: DM Serif Display + DM Sans, paleta âmbar, temas dark/light
- Preserve todas as funcionalidades já implementadas
- Prefira edições cirúrgicas (str_replace) a reescritas completas

Linguagem: interface sempre em PT-BR. Comunicação pode ser em português.
Código: JS vanilla, sem frameworks. CSS com variáveis do :root.
Arquivos finais sempre em /mnt/user-data/outputs/
```

---

### Chat A — Banco de Palavras & Dicionário

```
Frente: curar o banco de palavras usando o repositório fserb/pt-br (github.com/fserb/pt-br).

Objetivo:
1. Processar `icf` (419k palavras, ICF baixo=comum) e `lexico` (145k) e `listas/negativas`
2. Filtrar: 4–7 letras, sem acento, só A–Z, sem palavras ofensivas
3. Classificar por dificuldade: scoreVisual × ICF
   scoreVisual = 45 + avgOverlap*35 + n_unicas*2 - repeticoes*5
   SCORE_RANGE: facil(40-56/4L), medio(54-62/5L), dificil(60-68/6L), muito_dificil(56-80/7L)
4. ~300–400 palavras por nível: facil(4L), medio(5L), dificil(6L), muito_dificil(7L)
5. Dicionário de validação completo para todos os tamanhos (hoje só 5L tem lista extra)
6. Regenerar words_ptbr_year.json (365 dias, seed=42)

Atenção: banco PALAVRAS está duplicado entre index.html e a Edge Function (index.ts).
Ambos precisam ser atualizados em sincronia.
```

---

### Chat B — Edge Function & Backend

```
Frente: atualizar a Edge Function `daily-word` no Supabase.

Supabase project ID: ppssfweuotjgcfejdznn
URL: https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word

Lógica atual:
- Época: 2025-01-01T00:00:00Z
- nivel = CICLO_DIF[hoje.getUTCDay()]
  ["facil","medio","medio","dificil","dificil","muito_dificil","muito_dificil"]
- idx = ((diasDesdeEpoca * 2654435761) >>> 0) % lista.length
- Resposta: { word, nivel, nivelLabel, puzzle, date }
- Param opcional: ?date=YYYY-MM-DD

Objetivo:
1. Atualizar para consumir words_ptbr_year.json (lookup direto por data)
2. Manter fallback para banco hardcoded
3. Avaliar centralizar banco (hoje duplicado entre index.html e index.ts)
```

---

### Chat C — Tutorial

```
Frente: atualizar o tutorial (7 passos, palavra BOLA).

O que mudou:
- SWAP DE LETRAS foi REMOVIDO
- Implementado INPUT NÃO-LINEAR com G.cursor:
  * Clicar em qualquer slot move o cursor (sem apagar)
  * Slot vazio: cursor text | Slot preenchido: cursor pointer
  * Setas ← → navegam entre slots
  * ⌫ em preenchido: apaga, cursor fica no slot
  * ⌫ em vazio: move para anterior (apagando se tiver letra)
  * Digitar: escreve no cursor, avança para próximo vazio

O passo 6/7 ainda ensina swap (obsoleto) — redesenhar para demonstrar o input não-linear.
Tutorial: TW='BOLA', TWL=['B','O','L','A'], TC=['#f5a623','#9b8fe8','#5bbfa0','#e87a6b']
```

---

### Chat D — Streak & Estatísticas

```
Frente: sistema de streak e estatísticas.

localStorage atual:
- gliffoo_estado: { word, nivel, typed, attempts, decoded, found, elim, keyUsed, keyPos, done, won, cursor }
- gliffoo_stats: { jogados, vitorias, sequencia, maxSequencia, ultimaData, distribuicao }

Stats modal já existe (openStats(), carregarStats()) mas distribuição é básica.

Objetivos:
1. Streak de dias consecutivos jogados
2. Distribuição de tentativas (1–4 + derrota)
3. Taxa de vitória
4. Compartilhar resultado com emojis estilo Wordle (⬛🟡✅)
```

---

### Chat E — PWA

```
Frente: transformar em PWA.

Arquivos necessários:
1. manifest.json — nome "glif.foo", display: standalone, theme_color: #f5a623
2. service-worker.js — cache do index.html para offline
3. Ícones — glifo G+L+I+F sobrepostos, fundo dark (#1a1510) ou âmbar
4. Meta tags no index.html — theme-color, apple-touch-icon

O index.html é único — o SW deve fazer cache dele e dos recursos do Google Fonts.
```
