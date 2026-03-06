# glif.foo — Contexto do Projeto

## O que é

Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Estrutura do Repositório

```
GLIFFO/
├── icons/           ← ícones PWA (apple-touch-icon, favicons)
├── tools/           ← utilitários de desenvolvimento
├── .gitignore
├── glifo_contexto.md
├── index.html       ← arquivo principal (single-file: HTML + CSS + JS)
├── manifest.json    ← PWA manifest
├── README.md
└── sw.js            ← Service Worker (PWA, cache offline)
```

## Stack

- **Single-file:** `index.html` na raiz — HTML + CSS + JS, sem dependências externas, sem build step
- Fontes: DM Serif Display + DM Sans (Google Fonts)
- SVG gerado programaticamente via `makeSVG(letter, color, style)`

## Identidade Visual

- **Paleta:** âmbar/laranja como cor de acento (`#f5a623` / `#e8940a`)
- **Temas:** dark (padrão) e light, togglável via botão no header
- **Tipografia:** DM Serif Display (títulos/valores) + DM Sans (corpo/UI)
- **Scrollbar:** customizada em âmbar, fina (6px)
- **Cores de feedback por letra:** cada letra recebe uma cor única e consistente durante toda a sessão (array `GLYPH_COLORS`: âmbar, lavanda, coral, mint, sky)

## Mecânica do Jogo

- Palavra do dia com 5 letras — selecionada por `palavraDoDia()` baseada em hash da data
- 4 tentativas (`G.attempts`)
- **Feedback por posição:**
  - Letra na posição certa → some do Glifo do Dia, slot fica colorido
  - Letra existe mas posição errada → acende colorida no Glifo do Dia
  - Letra não existe → eliminada do teclado (opacidade reduzida)
- **Validação de dicionário:** só aceita palavras do `DICIONARIO` (Set com ~800 palavras PT-BR); aviso em tempo real ao preencher última letra
- **Swap de letras:** toca em dois slots preenchidos para trocar de posição (`G.swapSel`)
- **Chave Decodificadora:** 1 por tentativa, revela uma letra escolhida pelo jogador (`G.keyUsed`, `G.keyPos`)
- **Glifo do Dia** vs **Seu Glifo:** dois painéis lado a lado, atualizados ao vivo
- **Header meta:** exibe data atual e badge de dificuldade do dia

## Banco de Palavras e Dificuldade

```js
const PALAVRAS = {
  facil:         [...],  // ~50 palavras
  medio:         [...],  // ~12 palavras
  dificil:       [...],  // ~6 palavras
  muito_dificil: [...],  // ~1 palavra
};

// Ciclo semanal (0=Dom, 1=Seg, ..., 6=Sáb)
const CICLO_DIF = ['muito_dificil','facil','facil','medio','medio','dificil','dificil'];
```

- Índice calculado por hash determinístico do dia desde época (2025-01-01)
- Badge no header indica nível: Fácil / Médio / Difícil / Muito Difícil

## Persistência (localStorage)

| Chave                | Conteúdo                                                     |
| -------------------- | ------------------------------------------------------------ |
| `gliffoo_state`      | Estado completo do puzzle do dia (restaurado ao reabrir)     |
| `gliffoo_stats`      | Histórico acumulado: jogados, vitórias, streak, distribuição |
| `gliffoo_stats_date` | Data da última atualização de stats (evita dupla contagem)   |
| `gliffoo_tutdone`    | Flag de tutorial já visto                                    |

## Estado do Jogo (objeto G)

```js
G = {
  typed: [], // letras digitadas na tentativa atual
  attempts: [], // histórico de tentativas
  decoded: new Set(), // posições decodificadas (corretas)
  found: new Set(), // letras encontradas (posição errada)
  elim: new Set(), // letras eliminadas
  keyUsed: false, // chave já usada nesta tentativa
  keyPos: new Set(), // posições reveladas pela chave
  done: false, // jogo terminado
  won: false, // jogador venceu
  selKey: null, // posição selecionada na chave
  swapSel: null, // slot selecionado para swap
};
```

## Modais

| Modal         | Trigger            | Conteúdo                                      |
| ------------- | ------------------ | --------------------------------------------- |
| `key-modal`   | Botão 🔑 no header | Seleção de posição para revelar letra         |
| `win-modal`   | Vitória            | Stats da partida + streak + countdown + share |
| `lose-modal`  | Derrota            | Palavra correta + countdown + share           |
| `stats-modal` | Botão 📊 no header | Stats acumuladas + distribuição de tentativas |

## Tutorial (7 passos)

Palavra de demonstração: **BOLA** (B=âmbar, O=lavanda, L=mint, A=coral)

| Passo | Conteúdo                                                                   | Interação                             |
| ----- | -------------------------------------------------------------------------- | ------------------------------------- |
| 1/7   | Glifo pulsando — "o que é isso?"                                           | Botão Próximo                         |
| 2/7   | Animação ISO em loop — A→L→O→B chegando em perspectiva, colapsa para plano | Botão Próximo (animação não bloqueia) |
| 3/7   | Digita VALE ao vivo, Seu Glifo se forma                                    | Botão Próximo                         |
| 4/7   | Feedback VALE vs BOLA: V⬜ A🟡 L✅(some) E⬜ — slot L colorido             | Botão Próximo                         |
| 5/7   | Cor única por letra — A colorido como pista                                | Botão Próximo                         |
| 6/7   | Interação obrigatória: reorganiza letras para formar BOLA                  | **Bloqueado até resolver**            |
| 7/7   | Vitória: B some do Daily, ambos BOLA colorido, 3 cards resumo              | "Jogar agora! 🎮"                     |

### Detalhes técnicos do tutorial

- Palavra: `TW='BOLA'`, `TWL=['B','O','L','A']`, cores: `TC=['#f5a623','#9b8fe8','#5bbfa0','#e87a6b']`
- Auto-show na primeira visita (`localStorage: gliffoo_tutdone`)
- Reabre pelo botão ❓ no header
- `closeTutorial()` reseta estado completo do jogo (evita estado sujo pós-tutorial)
- `currentActionToken` / `newToken()`: sistema de cancelamento de animações assíncronas
- Animação ISO: `preserve-3d` durante explosão → muda para `flat` antes do colapso (resolve bug de z-order)
- z-index por layer: `TWL.length - bi` (B=4 topo, A=1 base)

## Animação ISO (passo 2 do tutorial)

```
Explode:  cubic-bezier(0.34, 1.56, 0.64, 1) — spring rápido
Colapsa:  cubic-bezier(0.22, 1.2, 0.36, 1)  — queda suave
Loop:     explode → layers chegam 1 a 1 (750ms cada) → pausa → colapsa → flat 1.6s → fade out → reinicia
```

## Funções Principais

| Função                                 | O que faz                                                        |
| -------------------------------------- | ---------------------------------------------------------------- |
| `makeSVG(l, color, style)`             | Gera SVG de uma letra                                            |
| `palavraDoDia()`                       | Retorna a palavra do dia via hash da data + ciclo de dificuldade |
| `buildBoxes()`                         | Renderiza slots de entrada + lógica de swap                      |
| `handleSwapClick(i)`                   | Gerencia seleção e troca de letras nos slots                     |
| `buildKB()`                            | Renderiza teclado virtual                                        |
| `renderDaily()`                        | Atualiza Glifo do Dia                                            |
| `renderYours()`                        | Atualiza Seu Glifo                                               |
| `decode()`                             | Processa tentativa, valida dicionário, calcula feedback          |
| `winAnim()`                            | Animação de vitória letra por letra                              |
| `winMod()` / `loseMod()`               | Abre modal de resultado e atualiza stats                         |
| `iniciarCountdown(elId)`               | Countdown para o próximo glifo (tick a cada 1s)                  |
| `salvarEstado()` / `carregarEstado()`  | Persiste/restaura estado do puzzle                               |
| `carregarStats()` / `atualizarStats()` | Gerencia histórico acumulado                                     |
| `openStats()`                          | Abre modal de estatísticas com distribuição                      |
| `share()`                              | Copia resultado formatado (emojis) para clipboard                |
| `openTutorial()` / `closeTutorial()`   | Controle do tutorial                                             |
| `renderStep(step)`                     | Renderiza passo específico do tutorial                           |
| `runIso(onDone, token)`                | Animação isométrica em loop (onDone=null para loop infinito)     |
| `buildHeaderMeta()`                    | Popula data e badge de dificuldade no header                     |

## Layout Desktop

Grid de 3 colunas em `@media (min-width: 768px)`:

- Col 1: Glifo do Dia
- Col 2: Seu Glifo
- Col 3: Área do jogo (slots + teclado + histórico)

## PWA

- `manifest.json` + `sw.js` (Service Worker com cache offline)
- `apple-touch-icon` + favicons em `/icons/`
- Registrado via `navigator.serviceWorker.register('/sw.js')`
- `viewport-fit=cover` + `overscroll-behavior: none` para iOS

## Pendente (em ordem de prioridade)

1. **Expandir banco de palavras** — aumentar listas de médio/difícil/muito difícil
2. **Conquistas / badges** — sistema de achievements baseado em streaks e performance
3. **Compartilhar com imagem** — gerar OG image dinâmica do resultado
4. **Analytics** — rastrear palavras mais difíceis, taxa de abandono por tentativa

## Decisões de Design Tomadas

- Tutorial usa BOLA (4 letras) para demonstração, jogo usa palavras de 5 letras
- Swap de letras implementado tanto no tutorial quanto no jogo real (consistência)
- Tutorial não avança automaticamente — usuário sempre controla o ritmo
- Único bloqueio no tutorial: passo 6 (interação BOLA) — bloqueio é o aprendizado
- Scrollbar do tutorial contida dentro do painel arredondado (`overflow:hidden` no `.tut-panel`, scroll em `.tut-panel-scroll` interno)
- Validação de dicionário em tempo real (ao preencher última letra) + ao submeter
- `closeTutorial()` sempre reseta `G` do zero para evitar estado inconsistente
