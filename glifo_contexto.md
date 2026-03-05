# glif.foo — Contexto do Projeto

## O que é
Jogo de palavras PT-BR inspirado no Wordle, com uma mecânica visual única: as letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em 4 tentativas, guiado pelo feedback visual do glifo.

## Stack
- **Single-file:** `glifo_ptbr.html` — HTML + CSS + JS, sem dependências externas
- Fontes: DM Serif Display + DM Sans (Google Fonts)
- SVG gerado programaticamente via `makeSVG(letter, color, style)`

## Identidade Visual
- **Paleta:** âmbar/laranja como cor de acento (`#f5a623` / `#e8940a`)
- **Temas:** dark (padrão) e light, togglável
- **Tipografia:** DM Serif Display (títulos) + DM Sans (corpo)
- **Scrollbar:** customizada em âmbar, fina (6px)
- **Cores de feedback por letra:** cada letra recebe uma cor única e consistente durante toda a sessão (array `GLYPH_COLORS`)

## Mecânica do Jogo
- Palavra do dia com `WN` letras (atualmente 5 letras, palavra placeholder: SINAL)
- 4 tentativas (`G.attempts`)
- **Feedback por posição:**
  - Letra na posição certa → some do Glifo do Dia, slot fica colorido
  - Letra existe mas posição errada → acende colorida no Glifo do Dia
  - Letra não existe → eliminada do teclado
- **Swap de letras:** toca em dois slots preenchidos para trocar de posição (implementado no jogo e no tutorial)
- **Chave Decodificadora:** 1 por tentativa, revela uma letra escolhida pelo jogador (`G.keyUsed`, `G.keyPos`)
- **Glifo do Dia** vs **Seu Glifo:** dois painéis lado a lado, atualizados ao vivo

## Estado do Jogo (objeto G)
```js
G = {
  typed: [],          // letras digitadas na tentativa atual
  attempts: [],       // histórico de tentativas
  decoded: new Set(), // posições decodificadas (corretas)
  found: new Set(),   // letras encontradas (posição errada)
  elim: new Set(),    // letras eliminadas
  keyUsed: false,     // chave já usada nesta tentativa
  keyPos: new Set(),  // posições reveladas pela chave
  done: false,        // jogo terminado
  won: false,         // jogador venceu
  selKey: null,       // posição selecionada na chave
  swapSel: null       // slot selecionado para swap
}
```

## Tutorial (7 passos)
Palavra de demonstração: **BOLA** (B=âmbar, O=lavanda, L=mint, A=coral)

| Passo | Conteúdo | Interação |
|-------|----------|-----------|
| 1/7 | Glifo pulsando — "o que é isso?" | Botão Próximo |
| 2/7 | Animação ISO em loop — A→L→O→B chegando em perspectiva, colapsa para plano | Botão Próximo (animação não bloqueia) |
| 3/7 | Digita VALE ao vivo, Seu Glifo se forma | Botão Próximo |
| 4/7 | Feedback VALE vs BOLA: V⬜ A🟡 L✅(some) E⬜ — slot L colorido | Botão Próximo |
| 5/7 | Cor única por letra — A colorido como pista | Botão Próximo |
| 6/7 | Interação obrigatória: reorganiza letras para formar BOLA (botão bloqueado até acertar, confetti ao resolver) | **Bloqueado até resolver** |
| 7/7 | Vitória: B some do Daily, ambos BOLA colorido, 3 cards resumo | "Jogar agora! 🎮" |

### Detalhes técnicos do tutorial
- Palavra: `TW='BOLA'`, `TWL=['B','O','L','A']`, cores: `TC=['#f5a623','#9b8fe8','#5bbfa0','#e87a6b']`
- Auto-show na primeira visita (`localStorage: gliffoo_tutdone`)
- Reabre pelo botão ❓ (Ajuda)
- Animação ISO: `preserve-3d` durante explosão, muda para `flat` antes do colapso (resolve bug de z-order)
- z-index por layer: `TWL.length - bi` (B=4 topo, A=1 base)

## Animação ISO (passo 2 do tutorial)
```
Explode:  cubic-bezier(0.34, 1.56, 0.64, 1) — spring rápido
Colapsa:  cubic-bezier(0.22, 1.2, 0.36, 1)  — queda suave
Loop:     explode → layers chegam 1 a 1 (750ms cada) → pausa → colapsa → flat 1.6s → fade out → reinicia
```

## Funções Principais
| Função | O que faz |
|--------|-----------|
| `makeSVG(l, color, style)` | Gera SVG de uma letra |
| `buildBoxes()` | Renderiza slots de entrada + lógica de swap |
| `handleSwapClick(i)` | Gerencia seleção e troca de letras nos slots |
| `buildKB()` | Renderiza teclado virtual |
| `renderDaily()` | Atualiza Glifo do Dia |
| `renderYours()` | Atualiza Seu Glifo |
| `decode()` | Processa tentativa, calcula feedback |
| `winAnim()` | Animação de vitória |
| `openTutorial()` / `closeTutorial()` | Controle do tutorial |
| `renderStep(step)` | Renderiza passo específico do tutorial |
| `runIso(onDone)` | Animação isométrica em loop (onDone=null para loop infinito) |

## Pendente (em ordem de prioridade)
1. **Banco de palavras PT-BR real + rotação diária** — palavra muda por dia, baseada em hash da data
2. **Validação de dicionário** — só aceitar palavras reais na tentativa
3. **Sistema de streak e estatísticas** — dias consecutivos, distribuição de tentativas, compartilhar resultado
4. **PWA / versão mobile nativa** — manifest, service worker, ícones

## Decisões de Design Tomadas
- Tutorial usa BOLA (4 letras) para demonstração, jogo usa palavras de 5 letras
- Swap de letras implementado tanto no tutorial quanto no jogo real (consistência)
- Tutorial não avança automaticamente — usuário sempre controla o ritmo
- Único bloqueio no tutorial: passo 6 (interação BOLA) — bloqueio é o aprendizado
- Scrollbar do tutorial contida dentro do painel arredondado (overflow:hidden no .tut-panel, scroll em .tut-panel-scroll interno)
