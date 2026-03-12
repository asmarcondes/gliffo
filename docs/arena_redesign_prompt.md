# Prompt: Gliffo Arena — Redesign da Interface

> Use este documento como especificação completa para construir a interface da **Gliffo Arena**, o modo multiplayer do jogo de palavras **Gliffo** (glif.foo). Implemente em HTML/CSS/JS puro (sem frameworks), mantendo compatibilidade com Supabase Realtime para o multiplayer.

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
  --correct: #4a9d6f;   /* Verde — letra no lugar certo */
  --found:   #e8940a;   /* Âmbar — letra presente, lugar errado */

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
  --bg:       #141210;
  --bg2:      #1a1714;
  --surface:  #1e1b18;
  --surface2: #252118;
  --surface3: #2c271f;
  --border:   #302b22;
  --border2:  #3a342a;
  --text:     #f0ebe4;
  --text2:    #9a9080;
  --text3:    #5a5248;
  --shadow:   rgba(0,0,0,0.5);
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
- **Power-ups disponíveis** — botões pill compactos com emoji e label. Clicável apenas quando é a vez do time e o joueur tem o power-up
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
[Glifo da Rodada — destaque]     [mini-preview: seu glifo enquanto digita]

[slots: __ __ __ __ ]  ← caixinhas mostrando qtd de letras

[input de texto — grande, centralizado]
   └─ conforme digita, os slots preenchem com a letra
   └─ um mini-glifo ao lado mostra o glifo da palavra digitada em tempo real

[ENVIAR PROPOSTA]

─── lista de quem já enviou ───
✓ Machado   ⋯ Joana   ✓ Pedro (capitão 👑)
```

**Mecânica do input:**
- O campo de texto é **grande e central** — toca o teclado nativo no mobile
- Conforme o jogador digita, os `slots` preenchem com as letras digitadas (estilo `lbox` do jogo solo — caixinha com a letra em SVG)
- Ao lado (ou abaixo em mobile) um **mini-glifo live**: mostra o glifo formado pela palavra digitada até agora, em tempo real. Esse glifo é mostrado em cor neutra (--glyph), apenas esboçando a forma — não é o glifo-alvo
- Qualquer membro do time pode enviar uma proposta
- A proposta é enviada quando clica em "Enviar Proposta" ou aperta Enter
- Após enviar: o `input` some, aparece "✔ Proposta enviada! Aguardando…"
- O **capitão da rodada** tem badge especial 👑 — no tie de votos, a proposta do capitão vence

### 6.3 VOTE — Votação
Quando todos enviaram (ou o timer expirou):

**Layout:**
```
[Glifo da Rodada — visível, menor, canto superior]

[cards de proposta em grid]
┌─────────┐  ┌─────────┐  ┌─────────┐
│  CAMPO  │  │  MANTO  │  │  MONTE  │
│ mini-gl │  │ mini-gl │  │ mini-gl │
│ 👤 3    │  │ 👤 1    │  │ 👤 0   │
└─────────┘  └─────────┘  └─────────┘
  ↑ meu voto (pulsante)
```

- Cada card de proposta mostra: **palavra** grande, **mini-glifo** da palavra proposta (neutro), **contagem de votos** (número de avatars ou contagem), e quem propôs
- **Clique no card = voto imediato** — não precisa confirmar
- **Mudar voto**: clicar em outro card deseleciona o anterior (sem recarregar)
- O card com **meu voto** fica com border pulsante (`cursorPulse`) na cor do time
- Se `votos_ocultos` (power-up do adversário): só vê `?` no lugar dos números de voto

**Todo mundo vota** — não só o time ativo. O time adversário vota para "ajudar" ou "atrapalhar" (mas o resultado conta apenas os votos do time ativo? — ou média total? Use votação aberta a todos, conta apenas o time da rodada).

Em mobile: cards empilhados em coluna.

### 6.4 DECODE — Envio para decodificar
Após o timer de votação expirar (ou host avançar):
- A proposta vencedora (mais votos; tie → voto do capitão; sem votes → aleatório) é selecionada
- Animação: o card vencedor escala e brilha, os outros desvanecem
- A palavra é submetida à edge function `arena-result`
- O glifo se **transforma** em tempo real (animação letra a letra):
  - Cada letra revela seu status com `flip` de 300ms
  - Corretas: camada some do glifo (fadeOut)
  - Presentes: camada ganha cor (colorPulse)

### 6.5 FEEDBACK — Resultado da tentativa
```
✅ Acertou! / ❌ Não foi dessa vez

[glifo colorido/revelado da palavra]

[slots B O L A — estilo lbox com SVG colorido de status]

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

### Real-time (Supabase Realtime)
Todos os eventos devem aparecer na tela **sem recarregar**:
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
| Ação | Animação |
|------|----------|
| Enviar proposta | `checkmark` slide + `scale(1.05)` no item da lista |
| Votar | Card selecionado `scale(1.04)` + border pulsa |
| Mudar voto | Deselect com `scale(0.97)`, select novo com `scale(1.04)` |
| Acerto (letra certa) | Camada SVG no glifo `fadeOut(200ms)` |
| Letra presente | Camada SVG `colorPulse(400ms)` → permanece colorida |
| Power-up ativo | Badge do power-up na tela com `slideDown` + descrição |
| Reação enviada | Emoji flutua e sobe da tela pelas bordas |
| Timer últimos 10s | Contador numérico aparece, cor vira coral |
| Jogador entra | Linha no painel `slideIn` de cima |
| Jogador sai | Linha fica `opacity:0.4`, ponto online apaga |
| Vencedor revelado | Confete + banner `scaleIn` |

### Power-ups
Disponíveis durante a fase PROPOSE ou entre turnos:

| Emoji | Nome | Efeito |
|-------|------|--------|
| 🌫️ | Névoa | Embaralha 2 camadas de cor no glifo adversário por 30s |
| 🪞 | Espelho | Espelha horizontalmente o glifo adversário por 30s |
| ⏱️ | Relógio | Rouba 20s do timer adversário |
| 👁️ | Votos Ocultos | Oculta os números de voto para o adversário nesta rodada |
| ✨ | Revelar | Revela a posição correta de 1 letra no glifo do próprio time (fica colorida) |
| ⚡ | Turbo | +30s no timer do próprio time |
| 🛡️ | Escudo | Bloqueia o próximo power-up adversário |
| 🎲 | Última Chance | Abre nova rodada de propostas para o mesmo glifo (consome 1 tentativa) |

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

## 11. Backend (Supabase)

### Tabelas relevantes
```sql
arena_rooms (
  id uuid, code text, status text, phase text,
  current_turn text,  -- 'A' ou 'B'
  turn_number int,
  team_a_word text, team_b_word text,
  team_a_level int, team_b_level int,
  team_a_attempts int, team_b_attempts int,
  team_a_powerups text[], team_b_powerups text[],
  team_a_time_ms int, team_b_time_ms int,
  phase_deadline timestamptz,
  config jsonb, winner text, active_fx jsonb
)

arena_players (
  id uuid, room_id uuid, nickname text, team text,
  is_host bool, online bool, joined_at timestamptz
)

arena_proposals (
  id uuid, room_id uuid, turn_number int,
  team text, player_id uuid, nickname text, word text,
  created_at timestamptz
)

arena_votes (
  id uuid, room_id uuid, proposal_id uuid,
  player_id uuid, team text
)
```

### Edge Functions
- `arena-word`: sorteia palavra dado nível e time (pesa pelo banco curado)
- `arena-result`: avalia guess, retorna `{feedback, correct, word}`

### Realtime
- Canal Supabase por sala: `arena:{roomId}`
- `postgres_changes` em `arena_rooms`, `arena_players`, `arena_proposals`
- `broadcast` para: `feedback`, `power_use`, `chat_A`, `chat_B`, `react`
- `presence` para indicadores de online

---

## 12. Fluxo Resumido

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
const SUPA_URL = "https://<project>.supabase.co"
const SUPA_KEY = "<anon-key>"
```

---

## 14. O que NÃO replicar da versão atual

A versão atual da arena (`arena.html`) tem problemas de layout:
- Interface em coluna única (mobile-only) — precisa virar layout de 3 colunas (Codenames)
- Glifo aparecia colorido desde o início — deve começar neutro (branco), só ganha cor após feedback
- Fase de proposta não mostrava mini-glifo live do que o jogador está digitando
- Votação em tela separada da proposta — deve ser na mesma tela com o glifo visível

---

*Documento gerado em: Março 2026 — Gliffo Arena v2 redesign spec*
