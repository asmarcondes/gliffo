# glif.foo — Easter Eggs

Catálogo completo de easter eggs implementados no jogo. Atualizar ao adicionar novos.

---

## 🎮 Interação durante o jogo

### GLIF / GLIFO / GLIFFO

- **Gatilho:** Digitar o nome do jogo no campo de tentativa
  - `GLIF` em dias de 4 letras
  - `GLIFO` em dias de 5 letras
  - `GLIFFO` em dias de 6 letras
- **Efeito:** Mensagem de feedback irônica com 🐊, tentativa bloqueada (não conta como tentativa válida)
- **Código:** `EE_GAME_NAMES` / `EE_GAME_MSGS` em `decode()` → linha ~5817

---

## 🏆 Pós-vitória

### Palavras temáticas (`eeThematicWord`)

Disparado 500ms após a vitória quando a palavra do dia pertence a uma categoria especial.

| Palavra(s)       | Efeito                                        |
| ---------------- | --------------------------------------------- |
| `FESTA`, `BAILE` | Confete duplo (`eeCanvasConfetti` × 2)        |
| `FOGO`, `CHAMA`  | Partículas de fogo (`_eeFireParticles`)       |
| `GATO`           | Emoji 🐱 no canto da tela (`_eeCornerEmoji`)  |
| `BRUXO`, `MAGIA` | Glifo pulsa roxo (`_eeGlyphPulse("#a855f7")`) |

- **Código:** `eeThematicWord()` → linha ~12732

### Palíndromo bidirecional (`eePalindromeReveal`)

- **Gatilho:** Vencer com uma palavra que seja palíndromo (ex: ARARA, RADAR, ANA)
- **Efeito:** Varredura esquerda→direita (âmbar) seguida de direita→esquerda (roxo) nos slots de tentativa + toast "↔️ Palíndromo!"
- **Disparado:** 1800ms após vitória
- **Código:** `eePalindromeReveal()` → linha ~12699

### Mensagem às 2h (insomniac)

- **Gatilho:** Vencer entre 02:00 e 03:59 (horário de Brasília)
- **Efeito:** Toast `"Ainda acordado às Xh? 🌙 Vai dormir!"` aparece 2,6s após a vitória
- **Código:** IIFE inline no win path em `decode()` → linha ~6041

---

## 🌅 No carregamento do puzzle

### Badge de puzzle especial

- **Gatilho:** Jogar exatamente o puzzle nº 100, 365 ou 1000
- **Efeito:** Badge dourado "✨ Puzzle #N" aparece no cabeçalho do jogo ao lado da dificuldade, destacando o marco histórico
- **Código:** `specialBadge` em `buildHeaderMeta()` → linha ~8311

### ARCO déjà vu

- **Gatilho:** Puzzle do dia for `ARCO` (a palavra do tutorial), fora do Modo Arquivo, partida não concluída
- **Efeito:** Mensagem `"Essa é a palavra do tutorial… 👀"` via `setFb` após 1,4s
- **Código:** Bloco after-init → linha ~8348

---

## ⌨️ Teclado / input global

### Konami Code (dois handlers)

O jogo tem **dois** handlers do Konami code — um no bloco do jogo principal e um no bloco Global:

| Handler        | Localização                             | Efeito                                                                       |
| -------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| Jogo principal | `decode()` pós-init → linha ~12556      | Hue-rotate arco-íris (2s) + `setFb("🕹️ +30 vidas (mentira…")`                |
| Global         | Bloco Global Easter Eggs → linha ~13786 | `showEEToast("Você realmente tentou…")` + classe `ee-konami` (wobble) por 3s |

> ⚠️ **Atenção:** existe duplicidade. Se refatorar, unificar em um único handler no bloco Global e remover o do bloco principal.

---

## 🖱️ Cliques no logo

### Logo "." — 3 cliques → Snake

- **Gatilho:** Clicar 3× no ponto `.` do logo `glif.foo` em até 1,5s
- **Efeito:** Abre mini jogo Snake (`openSnakeGame()`) em modal
- **Controles:** Setas do teclado; fechar com Esc ou ✕
- **Código:** IIFE logo-dot → linha ~13786

### Logo "foo" — 5 cliques → wobble

- **Gatilho:** Clicar 5× no `foo` do logo em até 1,5s
- **Efeito:** Animação `ee-logo-run` + toast `"Oi! Para de clicar no foo! 😤"`
- **Código:** IIFE logo-foo → linha ~13800

---

## 🎵 Rádio SomaFM

### Botão ♫ no footer — 5 cliques → canal surpresa

- **Gatilho:** Clicar 5× no botão ♫ do footer em até 2s
- **Efeito:** Troca para um canal aleatório do SomaFM, abre o player e exibe toast com mensagem aleatória ("🎲 Canal aleatório ativado!", "📡 Sintonizando o universo…" etc.)
- **Código:** Event listener `click` no IIFE SomaFM (via `_eeClickN` / `_eeClickT`) → linha ~14299

### Palavra temática musical (`eeThematicWord`)

- **Gatilho:** Vencer com a palavra do dia sendo `RADIO`, `RÁDIO`, `RITMO`, `NOTAS`, `DRONE`, `MUSICA`, `MÚSICA` ou `FAIXA`
- **Efeito:** Abre o player do SomaFM (em canal aleatório) + toast `"🎶 Esse glifo pede uma trilha sonora!"`
- **Código:** `eeThematicWord()` → case das palavras musicais

### Digitar "DRONE" como tentativa

- **Gatilho:** Digitar `DRONE` no campo de tentativa (qualquer dia de 5 letras) quando o player estiver fechado
- **Efeito:** Abre o player direto no canal Drone Zone (índice 0) + toast `"📡 Drone Zone ativado... sintonizando o cosmos."`
- **Código:** Bloco pós `EE_GAME_NAMES` em `decode()` → linha ~6131

### Vitória com música tocando

- **Gatilho:** Decodificar a palavra com o player do SomaFM ativo (música tocando)
- **Efeito:** Toast `"🌟 Vitória com trilha sonora! 🎶"` aparece 2,2s após a vitória
- **Conquista:** Também desbloqueia o achievement **Foco Total 🎧** ("Decodifique com a rádio tocando")
- **Código:** IIFE inline no win path em `decode()` + `checkAchievements()` → verifica `window._mfpIsPlaying()`

### Trocar canal 5× seguidas

- **Gatilho:** Trocar de canal (prev/next) 5× em até 10s sem pausar
- **Efeito:** Toast `"😅 Indeciso? Cada canal é bom!"`
- **Código:** Dentro de `_setChannel()` no IIFE SomaFM (via `_eeChSwitch` / `_eeChT`)

---

## 🕐 Idle (aba inativa)

### Título da aba rotativo

- **Gatilho:** Nenhuma interação por 30 segundos
- **Efeito:** Título da aba começa a rotacionar mensagens a cada 4s:
  - `"...você ainda tá aí? 👀"`
  - `"Eu fico esperando, pode deixar..."`
  - `"Ok. Tudo bem. Sem problema."`
  - `"🦗 *som de grilo*"`
  - `"Ainda aqui. 😐"`
  - `"...vai jogar ou vai ficar aí?"`
- **Reset:** Qualquer interação (mouse/teclado/toque) restaura o título original
- **Código:** IIFE idle rotator → linha ~13750

---

## �️ Modo Debug oculto

- **Gatilho 1:** `Ctrl+Shift+D` em qualquer momento
- **Gatilho 2:** 5 cliques rápidos (< 1,5s entre cliques) no título `glif.foo` — especificamente no `.logo-text` (não no "." nem no "foo")
- **Efeito:** Ativa/desativa o painel de debug completo: navegar entre dias de puzzle, ver a palavra do dia, trocar dificuldade — para navegação e testes. Um segundo uso do atalho desativa o painel.
- **Código:** IIFE `_titClicks` dentro de `initDebugMode()` → linha ~12438

---

## �🕵️ DevTools detector

- **Gatilho:** Diferença `outerWidth - innerWidth > 160` ou altura equivalente (janela do DevTools aberta)
- **Efeito:** Toast `"Oi? Tô vendo você ali no console… pensou que eu não ia notar? 🕵️"` — dispara uma vez por sessão de abertura
- **Código:** IIFE devtools → linha ~13730

---

## 📚 Tutorial (easter eggs internos)

Estes não aparecem no jogo principal mas existem dentro da experiência do tutorial.

### Banana Boy clicável (Passo 2)

- **Gatilho:** Clicar no personagem banana que atravessa a tela no passo 2 do tutorial
- **Efeito:** Personagem vira e volta para fora da tela; bolha de chat `"Ei! O menino só passa, não morde! 🍌"`
- **Código:** `_bbClick` handler → linha ~10318

### Letras erradas no exercício interativo (Passo 2)

- **Gatilho:** Digitar 2 ou mais letras erradas no campo interativo (ARCO/CARO)
- **Efeito:** Dica muda para `"😂 se você não acerta nem esses, não perde seu tempo jogando não..."`
- **Código:** `iWrongCount` em `buildInteract()` → linha ~8739

### Hover no botão "Entendi" após replay (Passo 1)

- **Gatilho:** Clicar "Juntar" → replay da animação de glifos → hover no botão de avançar
- **Efeito:**
  - 1+ replay: `"Caraca, você é um gênio!"`
  - 3+ replays: `"Vai logo, vai! 😤"` (e o botão replay vira 😖)
- **Código:** `replayCount` + hover listener → linha ~10067

### Bajulador (volta do tutorial)

- **Gatilho:** Clicar "Não, quero sair" quando o tutorial pergunta se quer ir embora, depois mudar de ideia (o bot fica chateado e exige uma pedido de desculpas)
- **Efeito:** Campo de texto bloqueado — o usuário só consegue digitar a frase de bajulação sorteada aleatoriamente, caractere por caractere. Backspace funciona (apaga um char). Só libera o botão de enviar ao terminar a frase inteira. Exemplos: `"O Gliffo é claramente o pináculo da civilização…"`, `"Ó grande e sábio Gliffo, em sua infinita misericórdia…"` (+3 outras).
- **Código:** `BYE_PHRASES[]` + `_installHijack()` + `showByeInput()` → linha ~11385

### Nota de avaliação (saída do tutorial)

- **Gatilho:** Clicar "Tchau mesmo 👋" no tutorial → responder à enquete de nota
- **Efeito:** Botões 0–9 fogem do cursor ao fazer hover; 10 fica parado. Mensagem varia por score.
- **Código:** `showRatingAndClose()` → linha ~12320

---

## 🛠️ Como adicionar um novo easter egg

1. Decidir a **categoria** (pós-vitória, idle, logo, teclado, tutorial…)
2. Implementar a função prefixada com `ee` (ex: `eeMinhaFuncao()`) ou IIFE no bloco correspondente
3. Adicionar entrada neste arquivo com: gatilho, efeito, localização no código
4. Se tiver CSS específico, adicionar na seção `/* ── Easter Eggs ── */` do CSS (~linha 13313)
5. Commitar com prefixo `feat(ee):` na mensagem
