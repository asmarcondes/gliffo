# Prompt: Gliffo Arena — Especificação da Interface

> Use este documento como especificação de **identidade visual e layout** para criar a interface da **Gliffo Arena**, o modo multiplayer do jogo de palavras **Gliffo** (glif.foo). O foco é a aparência, disposição e comportamento visual — não a implementação técnica do backend.

---

## 1. Conceito

**Gliffo** é um jogo de decodificação de glifos. Um **glifo** é um desenho formado pela sobreposição de traçados SVG — um por letra de uma palavra secreta. O desafio é descobrir a palavra observando o desenho composto.

**Gliffo Arena** é o modo multiplayer: dois times competem para decodificar seus próprios glifos. A interface se inspira no layout do **Codenames** — painel de times nas laterais, campo central de jogo — mas com a identidade visual e mecânica do Gliffo.

---

## 2. Identidade Visual

### Tokens de cor (CSS custom properties)

```css
:root {
  /* Âmbar — time A e destaque principal */
  --amber-400: #f5a623;
  --amber-500: #e8940a;

  /* Quartzo — time B */
  --quartz: #7c8cff;
  --quartz-hi: #9da8ff;

  /* Feedback */
  --correct: #4a9d6f; /* Verde — letra no lugar certo */
  --found: #e8940a; /* Âmbar — letra presente, lugar errado */

  /* Glyph colors — cores por letra (ordem da palavra) */
  --gc0: #f5a623; /* âmbar */
  --gc1: #9b8fe8; /* lavanda */
  --gc2: #e87a6b; /* coral */
  --gc3: #5bbfa0; /* menta */
  --gc4: #6baee8; /* céu */
  --gc5: #e8b45b; /* ouro */

  /* Cor neutra do glifo antes de decodificar */
  --glyph: #f0ebe4; /* dark mode: quase-branco cremoso */
  /* --glyph: #1c1814;  light mode: tinta quase-preta */

  /* Superfícies (dark mode) */
  --bg: #141210;
  --bg2: #1a1714;
  --surface: #1e1b18;
  --surface2: #252118;
  --surface3: #2c271f;
  --border: #302b22;
  --border2: #3a342a;
  --text: #f0ebe4;
  --text2: #9a9080;
  --text3: #5a5248;
  --shadow: rgba(0, 0, 0, 0.5);
}
```

### Tipografia

- **Corpo:** DM Sans (Google Fonts)
- **Logo / títulos:** DM Serif Display
- **Logo:** `glif.foo` — `glif` + `.` âmbar + `foo` | subscript `arena` em badge rounded

### Glifo — como é feito

Cada letra da palavra é um SVG `viewBox="0 0 200 200"` (traçados `stroke`, sem `fill`). Todos os SVGs ficam **empilhados** (`position: absolute; top:0; left:0; width:100%; height:100%`), criando a ilusão de um único desenho complexo.

**Estado neutro:** todos os traçados na cor `--glyph` (quase-branco).  
**Letra "presente" (lugar errado):** traçado ganha a cor da posição (`--gc0` para letra 0, `--gc1` para letra 1, etc.).  
**Letra "correta" (lugar certo):** a camada SVG **desaparece** do glifo (a palavra simplifica).

---

## 3. Layout Geral — Inspiração Codenames

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← voltar    [logo glif.foo arena]    ⚙ config   💬 chat    🌙      │  ← header
├──────────────┬──────────────────────────────────────┬───────────────┤
│              │                                      │               │
│  PAINEL      │       CAMPO DE JOGO CENTRAL          │  PAINEL       │
│  TIME ÂMBAR  │                                      │  TIME QUARTZO │
│              │   [Glifo A]    ↔    [Glifo B]        │               │
│  🟡 jogadores│                                      │  🔵 jogadores │
│  ────────    │   ┌─ FASE ───────────────────────┐   │  ──────────── │
│  pontuação   │   │  cards de proposta + votação  │   │  pontuação    │
│  nível       │   └──────────────────────────────┘   │  nível        │
│  power-ups   │                                      │  power-ups    │
│              │   [input / ação do usuário]           │               │
└──────────────┴──────────────────────────────────────┴───────────────┘
│  scoreboard / progresso das tentativas                               │  ← footer strip
└─────────────────────────────────────────────────────────────────────┘
```

**Em mobile** (< 640px): layout em coluna. Painéis de time colapsam em abas ou carrossel. Campo central ocupa 100% da largura.

---

## 4. Painéis de Time (laterais)

Cada painel contém:

- **Nome do time** com emoji de cor (`🟡 Time Âmbar` / `🔵 Time Quartzo`)
- **Lista de jogadores online** — avatar (inicial do nick) + nickname + indicador online (ponto verde pulsante)
- **Capitão da rodada** — badge 👑 ao lado do nome
- **Pontuação / Nível atual** — ex: "Nível 3" com barra de progresso discreta
- **Power-ups disponíveis** — botões pill compactos com emoji e label. Clicável apenas quando é a vez do time e o jogador tem o power-up
- **Indicador de tentativas restantes** — 4 bolinhas (●●●●), cada acerto errado esvazia uma

O painel do **time ativo** (vez de decodificar) tem `outline` ou `glow` na cor do time. O outro painel fica levemente `opacity: 0.6`.

---

## 5. Campo Central — Dois Glifos Simultâneos

Ambos os glifos ficam **sempre visíveis** na tela central lado a lado, mesmo sendo um de cada time:

```
┌──────────────────────┐    ┌──────────────────────┐
│    GLIFO TIME Â      │    │    GLIFO TIME Q       │
│   [card 180×180px]   │    │   [card 180×180px]    │
│                      │    │                       │
│  ● ● ● ●  (letras)    │    │  ● ● ● ●  (letras)   │
└──────────────────────┘    └──────────────────────┘
     TIME ÂMBAR                   TIME QUARTZO
    TURNO ATIVO ←                  aguardando
```

- O glifo do time **ativo** é maior / destacado (scale ligeiramente maior, border âmbar pulsante)
- O glifo do **outro time** aparece menor, com opacity reduzida, e mostra apenas as letras descobertas até agora (camadas removidas das tentativas anteriores)
- Abaixo de cada glifo: fileira de **slots de letras vazios** (como caixinhas) indicando a quantidade de letras — **não revela as letras, só a quantidade**
- Abaixo dos slots: contagem de tentativas: `Tentativa 2 de 4`

### Mecânica de evolução do glifo

À medida que o time erra/acerta tentativas, o glifo **se transforma** na tela para todos verem:

- Letra correta (mesmo lugar): camada **desaparece** do glifo com animação `fadeOut` (200ms)
- Letra presente (lugar errado): camada **ganha cor** `--gcN` (onde N = posição na palavra) com animação `colorPulse`
- Letra ausente: sem mudança visual

---

## 6. Mecânica — Fases da Rodada

### 6.1 BETWEEN (tela de transição entre turnos)

- Exibe qual time vai jogar
- Countdown de 3s antes de iniciar automaticamente (ou botão do host)
- Mostra o histórico de tentativas do turno anterior em forma de resumo

### 6.2 PROPOSE — Sugestão de palavras

**Duração:** configurável (padrão 45s). Timer mostrado como barra de progresso no topo do campo central.

**Layout da fase:**

```
┌──── GLIFO DA RODADA ────┐    ┌──── SEU GLIFO (live) ───┐
│                         │    │                          │
│  [glifo neutro --glyph] │    │  [glifo da sua proposta, │
│  (o da palavra secreta) │    │   também em --glyph,     │
│                         │    │   montando em tempo real] │
│  ● ● ● ●  (N slots)     │    │  _ _ _ _  (slots da sua  │
│                         │    │           proposta)       │
└─────────────────────────┘    └──────────────────────────┘
                 ↑ compara os dois!

[ input  grande  e  centralizado  — foco  automático ]

[ENVIAR PROPOSTA]

─── lista de quem já enviou ───
✓ Machado   ⋯ Joana   ✓ Pedro (capitão 👑)
```

**Mecânica do input (crítica — igual ao single player):**

O coração da fase Propose é a comparação em tempo real entre o glifo-alvo e o glifo que o jogador está compondo:

1. **Glifo da rodada** (esquerda/topo): sempre visível, em `--glyph` neutro (branco). É o glifo que o time precisa decifrar. As camadas já reveladas de tentativas anteriores refletem o estado atual.

2. **Glifo live da proposta** (direita/baixo): começa **vazio**. Conforme o jogador digita letra a letra:
   - Cada letra digitada **adiciona** a camada SVG correspondente ao glifo de preview, em `--glyph` (neutro)
   - Se apagar uma letra: a camada SVG da última letra **desaparece** imediatamente
   - O glifo se constrói e desconstrói em tempo real, sincronizado com o cursor do input
   - O tamanho do card de preview é **idêntico** ao do glifo da rodada — para comparação visual direta
   - Abaixo do preview: **slots de letras** preenchem com a letra (SVG da letra em miniatura, cor neutra)

3. **Sensação de comparação**: o jogador quer saber se o glifo que ele está compondo "parece" com o glifo-alvo. Essa comparação visual lado a lado é o coração do jogo — o previw ao vivo versus a forma-alvo.

4. Ao **enviar a proposta**: o preview do glifo congela, o input some, aparece `✔ Proposta enviada! Aguardando…`. O glifo da proposta congelado **permanece visível** para o próprio jogador até a fase de votação começar.

- O **capitão da rodada** tem badge especial 👑 — no tie de votos, a proposta do capitão vence
- Qualquer membro do time pode propor
- Enter = enviar

### 6.3 VOTE — Votação

Quando todos enviaram (ou o timer expirou):

**Layout:**

```
┌─────── GLIFO DA RODADA ────────────────────────────────────────────┐
│  [glifo neutro, estado atual — letras já descobertas refletidas]   │
│  tamanho médio, sempre visível no topo durante toda a votação      │
└────────────────────────────────────────────────────────────────────┘

[cards de proposta em grid — cada card mostra o GLIFO da palavra]

┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   [GLIFO de   │  │   [GLIFO de   │  │   [GLIFO de   │
│    CAMPO]     │  │    MANTO]     │  │    MONTE]     │
│               │  │               │  │               │
│    CAMPO      │  │    MANTO      │  │    MONTE      │
│  por Machado  │  │  por Joana    │  │  por Pedro 👑 │
│   👤 👤 👤   │  │   👤          │  │               │
│    3 votos    │  │   1 voto      │  │   0 votos     │
└───────────────┘  └───────────────┘  └───────────────┘
     ↑ meu voto (border pulsante na cor do time)
```

**Por que mostrar o glifo de cada proposta?**
O votante precisa **comparar visualmente**: o glifo-alvo (topo da tela) vs. o glifo de cada proposta (nos cards). A palavra sozinha não é suficiente — o glifo da proposta pode parecer mais ou menos com o da rodada, e essa é a informação que importa para votar.

**Especificação dos cards de votação:**

- **Tamanho:** o glifo dentro do card ocupa o card inteiro (ou ~75% com padding)
- **Cor:** `--glyph` neutro — NÃO usa as cores `--gcN`. O objetivo é comparar formas, não cores
- **Palavra escrita** abaixo do glifo, em fonte grande e bold
- **Nome do proponente** menor, abaixo da palavra, com badge 👑 se capitão
- **Contagem de votos**: avatares circulares empilhados (até 3) + número. Ex: `👤👤+5`
- **Clique no card = voto imediato**, borda acende na cor do time com animação `cursorPulse`
- **Mudar voto**: clique em outro card — borda anterior apaga, nova acende
- Se `votos_ocultos` (power-up adversário): contador mostra `?` para o time adversário
- Minha própria proposta pode receber meu voto normalmente
- O glifo no card **é idêntico ao que aparecia no preview** durante o Propose — reforça a coerência

**Animação de transição Propose → Vote:**

- As propostas enviadas (que estavam como `✔ Enviado`) "voam" para seus cards
- Cards entram com `slideUp` + `fadeIn` escalonados (50ms de delay entre cada um)

**Todo mundo vota** — time ativo e adversário. Resultado conta apenas votos do time da rodada.

### 6.4 DECODE — Envio para decodificar

Após o timer de votação expirar (ou host avançar):

- A proposta vencedora (mais votos; tie → voto do capitão; sem votes → aleatório) é selecionada
- Animação: o card vencedor escala e brilha, os outros desvanecem
- A palavra é avaliada e o resultado chega para todos
- O glifo se **transforma** em tempo real (animação letra a letra):
  - Cada letra revela seu status com `flip` de 300ms
  - Corretas: camada some do glifo (fadeOut)
  - Presentes: camada ganha cor (colorPulse)

### 6.5 FEEDBACK — Resultado da tentativa

```
✅ Acertou! / ❌ Não foi dessa vez

[glifo colorido/revelado da palavra]

[slots B O L A — caixinhas com letra e cor de status (verde = certo, âmbar = presente, cinza = ausente)]

"A palavra era: BOLA"

[reações: 🔥 😮 👀]

[↩ Tentar Novamente (1/4)]   [Desistir → Próximo Turno]
```

- Se acertou: confete na cor do time, botão "Próximo Turno →" apenas
- Se errou e há tentativas restantes: "↩ Tentar Novamente (N/4)" + "Desistir" menor
- Se esgotou 4 tentativas: "Próximo Turno →" apenas
- O time adversário vê a mesma tela mas não tem os botões de controle

### 6.6 FINISHED — Fim do jogo

- Banner com time vencedor, confete
- Placar final
- Botões: "Revanche" / "Nova sala"

---

## 7. Detalhes de Interação

### Comportamento visual em tempo real

Todos os eventos atualizam a tela sem recarregar a página — o design deve suportar essas mudanças visuais instantâneas:

- Novo jogador entra → aparece no painel lateral com animação `slideIn`
- Proposta enviada → `✓` ao lado do nome, contador atualiza
- Voto dado → o número no card sobe com animação `pop`
- Timer → barra de progresso animada (`transition: width 1s linear`)
- Fase muda → transição suave entre layouts (ex: `fade + scale`)
- Glifo muda (letra descoberta) → animação na camada SVG afetada

### Timer

- Barra de progresso horizontal no topo do campo central
- Cor: âmbar ou quartzo (do time ativo)
- Nos últimos 10s: pulsa vermelho (`#e87a6b`) e contador numérico aparece
- Se `turbo` (power-up): barra estende animada
- Se `relogio` (power-up): barra encurta animada

### Micro-interações obrigatórias

| Ação                   | Animação                                                            |
| ---------------------- | ------------------------------------------------------------------- |
| Digitar letra no input | Camada SVG aparece no glifo-preview (`fadeIn` 80ms) + slot preenche |
| Apagar letra no input  | Camada SVG some do glifo-preview (`fadeOut` 80ms) + slot esvazia    |
| Enviar proposta        | `checkmark` slide + `scale(1.05)` no item da lista; preview congela |
| Transição Propose→Vote | Propostas "voam" para os cards: `slideUp` + `fadeIn` escalonados    |
| Votar                  | Card selecionado `scale(1.04)` + border pulsa na cor do time        |
| Mudar voto             | Deselect com `scale(0.97)`, select novo com `scale(1.04)`           |
| Card vencedor revelado | `scale(1.1)` + `glow` na cor do time; outros cards `opacity:0.3`    |
| Acerto (letra certa)   | Camada SVG no glifo `fadeOut(200ms)`                                |
| Letra presente         | Camada SVG `colorPulse(400ms)` → permanece colorida                 |
| Power-up ativo         | Badge do power-up na tela com `slideDown` + descrição               |
| Reação enviada         | Emoji flutua e sobe da tela pelas bordas                            |
| Timer últimos 10s      | Contador numérico aparece, cor vira coral                           |
| Jogador entra          | Linha no painel `slideIn` de cima                                   |
| Jogador sai            | Linha fica `opacity:0.4`, ponto online apaga                        |
| Vencedor revelado      | Confete + banner `scaleIn`                                          |

### Glifo Live — comportamento visual esperado

Este é o componente visual mais importante da fase Propose:

- A cada letra digitada no input: uma nova camada SVG aparece no card de preview (`fadeIn` 80ms)
- A cada letra apagada: a última camada SVG desaparece (`fadeOut` 80ms)
- Glifo do preview usa cor `--glyph` neutro — sem cores `--gcN`
- Slots abaixo do preview: cada slot mostra o SVG da letra digitada (tamanho ~65% do slot), em `--text2`
- Os slots existem apenas para as letras já digitadas (crescem com a palavra, não são fixos)
- O glifo nos cards de votação é visualmente idêntico ao preview que o proponente viu ao digitar

### Power-ups

Disponíveis durante a fase PROPOSE ou entre turnos:

| Emoji | Nome          | Efeito                                                                       |
| ----- | ------------- | ---------------------------------------------------------------------------- |
| 🌫️    | Névoa         | Embaralha 2 camadas de cor no glifo adversário por 30s                       |
| 🪞    | Espelho       | Espelha horizontalmente o glifo adversário por 30s                           |
| ⏱️    | Relógio       | Rouba 20s do timer adversário                                                |
| 👁️    | Votos Ocultos | Oculta os números de voto para o adversário nesta rodada                     |
| ✨    | Revelar       | Revela a posição correta de 1 letra no glifo do próprio time (fica colorida) |
| ⚡    | Turbo         | +30s no timer do próprio time                                                |
| 🛡️    | Escudo        | Bloqueia o próximo power-up adversário                                       |
| 🎲    | Última Chance | Abre nova rodada de propostas para o mesmo glifo (consome 1 tentativa)       |

Power-ups são ganhos ao acertar (mais por acerto rápido) e ao completar níveis.

---

## 8. Progressão e Placar

- **Nível** (1–7): sobe ao acertar. Nível mais alto = palavras mais longas/difíceis
- **Tentativas**: 4 por palavra. Indicadas por bolinhas no painel e no campo central
- **Alternância**: times alternam a decodificação a cada turno (não a cada tentativa)
- **Tiebreaker**: se ao fim dos turnos o placar estiver igual, o time mais rápido (tempo total de acertos) vence

### Scoreboard (footer strip)

Barra horizontal sempre visível no rodapé:

```
🟡 Âmbar   Nível 3   ●●●○   ←→   🔵 Quartzo   Nível 2   ●●●●
```

- Bolinhas = tentativas restantes na palavra atual
- Níveis coloridos com suas cores de time

---

## 9. Lobby (pré-jogo)

### Tela de boas-vindas

- Logo `glif.foo arena` centralizado
- Dois botões grandes: **Criar Sala** / **Entrar em Sala**
- Campo de nickname (salvo em localStorage)

### Sala (lobby)

Layout de dois painéis (lado a lado no desktop, abas no mobile):

```
┌─────────────────────┐    ┌─────────────────────┐
│   🟡 TIME ÂMBAR     │    │   🔵 TIME QUARTZO    │
│                     │    │                      │
│  [avatar] Nick_1 👑 │    │  [avatar] Nick_3     │
│  [avatar] Nick_2    │    │  [   Entrar no time  ]│
│  [   Entrar no time ]│    │                      │
└─────────────────────┘    └─────────────────────┘

Código da sala: XKPF   [copiar link]

Configurações (host only):
  ⏱ Timer Proposta: [30s][45s][60s]
  🗳 Timer Votação: [15s][20s][30s]
  ⚡ Power-ups: [ON][OFF]

[🚀 Iniciar Partida]  ← apenas host, habilitado quando ≥ 1 jogador por time
```

- Clicar em "Entrar no time" move o jogador para aquele time (troca livre antes de iniciar)
- Jogadores online mostram ponto verde pulsante
- Código de sala grande e copiável com 1 clique
- Link de convite copiável

---

## 10. Chat e Reações

- **Chat** flutuante (botão canto inferior direito com badge de não-lidos)
- Separado por time: cada time tem seu canal de chat privado
- **Reações** rápidas: 🔥 😮 👀 — aparecem flutuando pela tela e visíveis para todos

---

## 11. Fluxo de Telas

```
Bem-vindo → Criar/Entrar → Lobby (escolher time) → Configurar (host)
  → Iniciar Partida
    → [BETWEEN] Vez do Time X
      → [PROPOSE 45s] Todos do time X propõem palavras
        → [VOTE 20s] Todos votam nos cards de proposta
          → [DECODE] Proposta vencedora é avaliada
            → [FEEDBACK] Resultado + glifo colorido
              → Acertou? → sobe nível, Próximo Turno
              → Errou + tentativas restantes? → Tentar Novamente (mesma palavra)
              → Errou + esgotou tentativas? → Próximo Turno
    → Time B joga...
    → Após N turnos ou nível 7 → [FINISHED] Vencedor
```

---

## 13. Especificações Técnicas

- **HTML/CSS/JS puro** — sem frameworks
- **Supabase JS v2** (UMD bundle local em `vendor/supabase.min.js`)
- **Google Fonts**: `DM Sans:wght@400;500;600;700` + `DM Serif Display`
- Dark mode por padrão (`data-theme="dark"` no `<body>`), toggle disponível
- Mobile-first — mínimo de 320px de largura
- **PWA**: manifest.json + service worker
- Sem dependência de backend próprio além do Supabase
- PLAYER_ID persistido em `localStorage`
- Sem `alert()` — usar toasts internos

### Variáveis de ambiente (hardcoded ou .env)

```js
const SUPA_URL = "https://<project>.supabase.co";
const SUPA_KEY = "<anon-key>";
```

---

## 14. O que NÃO replicar da versão atual

A versão atual da arena (`arena.html`) tem problemas de layout:

- Interface em coluna única (mobile-only) — precisa virar layout de 3 colunas (Codenames)
- Glifo aparecia colorido desde o início — deve começar neutro (branco), só ganha cor após feedback
- Fase de proposta não mostrava mini-glifo live do que o jogador está digitando
- Votação em tela separada da proposta — deve ser na mesma tela com o glifo visível

---

_Documento gerado em: Março 2026 — Gliffo Arena especificação de interface_
