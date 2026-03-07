# glif.foo — Contexto do Projeto

## O que é

Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Stack

- **Single-file:** `index.html` (~6424 linhas) — HTML + CSS + JS, sem dependências externas
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

| Passo | Conteúdo                                                                 |
| ----- | ------------------------------------------------------------------------ |
| 1/7   | Glifo pulsando — "o que é isso?"                                         |
| 2/7   | Animação ISO em loop — A→L→O→B chegando em perspectiva                   |
| 3/7   | Digita **BICO** ao vivo, Seu Gliffo se forma                             |
| 4/7   | Feedback de **BICO**: letras eliminadas, posição errada e acerto         |
| 5/7   | Cor única por letra + início da 2ª tentativa com **B** já confirmado     |
| 6/7   | Chave Decodificadora em loop — revela **L** e mostra aviso com atraso    |
| 7/7   | Interação obrigatória com cursor não-linear para completar **BOLA**       |

- Passo final começa com **B** e **L** já confirmados; só os slots vazios são editáveis
- `Seu Gliffo` no passo final mostra apenas as letras digitadas pelo jogador nessa etapa
- Ao completar **BOLA**, o título vira **"BOLA!"**, aparecem confetes e cards-resumo
- Se o botão final for liberado, o botão da esquerda vira **Ver de novo**
- Tem botão **Pular** / **Ver de novo** + botão **✕** (mclose) para fechar
- Auto-show na primeira visita (`localStorage: gliffoo_tutdone`)

## Edge Function — `daily-word`

- **URL:** `https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word`
- **Auth:** `verify_jwt: false` (pública)
- **Versão deployada:** v4
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
CICLO_DIF = ["facil","facil","medio","medio","dificil","dificil","muito_dificil"]
// Dom=facil, Seg=facil, Ter=medio, Qua=medio, Qui=dificil, Sex=dificil, Sab=muito_dificil
```

### Banco de palavras (Chat A — ✅ concluído)

O banco `PALAVRAS` está **duplicado** entre `index.html` e `supabase/functions/daily-word/index.ts` — ao atualizar o banco, ambos precisam ser atualizados em sincronia.

```
PALAVRAS = {
  facil:         400 palavras (4L)
  medio:         400 palavras (5L)
  dificil:       371 palavras (6L)
  muito_dificil: 300 palavras (7L)
}
DICIONARIO: ~6579 palavras cobrindo 4L–7L para validação
```

- Fonte de verdade: `data/word_bank_final.json`
- `dicionarioValido(word)`: checa DICIONARIO (4L–7L) primeiro; fallback para PALAVRAS
- `data/words_ptbr_year.json`: agenda 365 dias (2026-03-07 a 2027-03-06), v2, CICLO correto
  - Verificado: hoje (2026-03-07, sáb) = EFLUVIO / muito_dificil / puzzle 431 ✓

## Estrutura do Projeto

```
gliffo/
├── .gitignore
├── README.md
├── index.html          (~6424L - jogo completo)
├── curadoria.html      (ferramenta de curadoria do banco)
├── sw.js               (service worker PWA)
├── manifest.json       (PWA manifest)
├── icons/              (ícones PWA)
├── data/
│   ├── word_bank_final.json     (134 KB - fonte de verdade do banco)
│   └── words_ptbr_year.json     (52 KB  - agenda anual → vai pro Supabase Storage)
├── docs/
│   ├── glifo_contexto.md
│   └── resumo_banco.md
└── supabase/
    └── functions/
        └── daily-word/
            └── index.ts         (Edge Function v3, deployada)
```

## Pendente (em ordem de prioridade)

### ✅ Chat A — Banco de Palavras & Dicionário (CONCLUÍDO)

1. ✅ Banco curado PT-BR aplicado em `index.html` e `index.ts`
2. ✅ Dicionário 4L–7L (~6579 entradas) aplicado em `index.html`
3. ✅ CICLO_DIF corrigido em ambos (Dom=facil…Sab=muito_dificil)
4. ✅ `dicionarioValido()` corrigido para cobrir todos os tamanhos
5. ✅ Edge Function v3 deployada e verificada
6. ✅ `words_ptbr_year.json` regenerado com CICLO correto (v2)

### ✅ Chat B — Supabase Storage (CONCLUÍDO)

1. ✅ Bucket público `data` criado no Supabase Storage
2. ✅ `words_ptbr_year.json` hospedado em `storage/v1/object/public/data/words_ptbr_year.json`
3. ✅ Edge Function v4: lookup por data no schedule → fallback on-the-fly
4. ✅ Cache em memória do schedule entre invocações quentes (timeout 3s)
5. ✅ Verificado: hoje=EFLUVIO/muito_dificil/431 (Storage ✓) + data fora do range=fallback ✓

### Chat C — Tutorial

6. Atualizar passo 6/7 do tutorial (swap foi removido — agora é cursor não-linear)
7. Demonstrar o novo sistema de input no tutorial

### Chat D — Streak & Estatísticas

8. Sistema de streak de dias consecutivos
9. Distribuição de tentativas, taxa de vitória
10. Compartilhar resultado com emojis estilo Wordle

### Chat E — PWA (parcialmente pronto)

- `manifest.json` e `sw.js` já existem

11. Verificar/completar manifest (theme_color, ícones, display: standalone)
12. Verificar service worker (cache offline)
13. Meta tags no index.html (theme-color, apple-touch-icon)

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
- Leia o docs/glifo_contexto.md antes de qualquer alteração
- Trabalhe diretamente no index.html — arquivo único (~6424 linhas) sem dependências
- Mantenha a identidade visual: DM Serif Display + DM Sans, paleta âmbar, temas dark/light
- Preserve todas as funcionalidades já implementadas
- Prefira edições cirúrgicas (str_replace) a reescritas completas

Linguagem: interface sempre em PT-BR. Comunicação pode ser em português.
Código: JS vanilla, sem frameworks. CSS com variáveis do :root.
```

---

### ~~Chat B~~ — ✅ Concluído (bucket `data` criado, v4 deployada)

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
Frente: completar a PWA.

Já existem: manifest.json, sw.js, icons/
Verificar e completar:
1. manifest.json — nome "glif.foo", display: standalone, theme_color: #f5a623, ícones corretos
2. sw.js — cache do index.html para offline, estratégia network-first para HTML
3. Meta tags no index.html — theme-color, apple-touch-icon, viewport
```
