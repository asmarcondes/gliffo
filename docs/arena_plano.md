# Gliffo Arena — Plano de Design Completo

> **Modo multiplayer em tempo real** para [glif.foo](https://glif.foo)  
> Branch: `feat/arena-multiplayer` | Status: implementação em curso

---

## 1. Visão Geral

Dois times se enfrentam em turnos para decodificar **glifos** (sobreposições de letras SVG). Cada time propõe palavras, vota coletivamente e avança de nível conforme acerta.

### Inspirações
- Codenames (proposta coletiva, votação por consenso)
- Wordle (feedback two-pass: ✅ presente na posição, 🟡 presente fora, ⬜ ausente)
- Gliffo single-player (motor de glifos SVG pré-existente)

---

## 2. Times & Papéis

| Elemento | Detalhe |
|---|---|
| Times | **Âmbar** 🟡 e **Quartzo** 🔵 |
| Jogadores | 1–6 por time (mínimo 1v1 para iniciar) |
| Espectadores | Podem assistir, reagir (🔥 😮 👀), sem votar |
| Host | Primeiro jogador a criar a sala; controla fases |
| Capitão de turno | Rotaciona a cada turno pelo índice; badge visual, sem privilégios |

---

## 3. Fluxo de Jogo

### 3.1 Lobby
1. Host cria sala → código `GLIF-XX` gerado
2. Jogadores entram pelo código ou link direto `?sala=GLIFXX`
3. Host configura regras (timers, power-ups, regressão, compensação)
4. Host clica "Iniciar Partida" → todos navegam para a tela de jogo via Realtime

### 3.2 Loop principal (por turno)

```
between → propose → vote → feedback → (between | finished)
```

| Fase | Descrição | Quem age |
|---|---|---|
| **between** | Intervalo entre turnos; host inicia rodada | Host |
| **propose** | Timer ativo; cada membro escreve sua proposta de palavra | Time ativo |
| **vote** | Propostas reveladas; cada membro vota na melhor | Time ativo |
| **feedback** | Palavra correta revelada + feedback two-pass por letra | Todos |
| **finished** | Fim de jogo; banner de vencedor, revanche | Host |

### 3.3 Alternância de turno
- Times se alternam a cada turno: `A → B → A → B → …`
- `turn_number` incrementa a cada `doNextTurn()`

### 3.4 Acerto e nível
- **Acerto** = proposta escolhida por votação bate exatamente a palavra alvo
- Acerto → time avança 1 nível (escala 1–7)
- Erro → mantém nível; se opção `regress=true` → regride 1 nível (mínimo 1)
- Atingir nível 8 = vitória imediata

### 3.5 Vitória e desempate
- Quem chegar ao **nível 8** primeiro vence
- Empate (ambas chegam no mesmo turno): desempate por `team_x_time_ms` (menor tempo total nas fases de proposta ganha)
- Se ainda empate: `winner = 'draw'`

---

## 4. Sistema de Níveis e Palavras

| Nível | Tamanho | Pool |
|---|---|---|
| 1–2 | 4 letras | `facil` |
| 3–4 | 5 letras | `medio` |
| 5–6 | 6 letras | `dificil` |
| 7 | 7 letras ⭐ | `muito_dificil` |

Palavra sorteada pela edge function `arena-word` (evita repetições via `arena_proposals` anteriores).

---

## 5. Sistema de Power-ups

### 5.1 Catálogo

| Emoji | Nome | Efeito |
|---|---|---|
| 🌫️ | Névoa | Embaralha visualmente 2 camadas do glifo adversário por 30s |
| 🪞 | Espelho | Espelha o glifo adversário (transform: scaleX(-1)) por 30s |
| ⏱️ | Relógio | Rouba 20s do timer do time adversário |
| 👁️ | Votos Ocultos | Oculta a contagem individual de votos para os adversários por 1 rodada |
| ✨ | Revelar | Revela a posição de 1 letra no glifo para o próprio time |
| ⚡ | Turbo | Adiciona 30s ao timer do próprio time |
| 🛡️ | Escudo | Bloqueia o próximo power-up recebido do adversário |
| 🎲 | Última Chance | Permite nova fase de proposta no mesmo glifo (fallback especial) |

### 5.2 Como ganhar power-ups (host aplica)

| Condição | Recompensa |
|---|---|
| Acerto na primeira tentativa do turno | 2 power-ups aleatórios |
| Tempo > 50% restante ao enviar proposta | +1 power-up aleatório |
| Nível aumentado (qualquer acerto) | +1 power-up aleatório |
| Acerto com ≥ 80% tempo restante (clutch) | +1 Última Chance 🎲 especial |

### 5.3 Regras de fila
- Máximo **3 power-ups** por time na fila
- Excedente é descartado
- Power-up pode ser usado nas fases `propose` ou `vote`
- Escudo se ativa ao usar; cancela automaticamente ao bloquear 1 efeito

### 5.4 Armazenamento
- `team_a_powerups JSONB` — array de strings, ex: `["turbo","nevoa","escudo"]`
- `team_b_powerups JSONB` — idem
- `active_fx JSONB` — efeitos ativos neste turno

---

## 6. Motor de Palavras (Two-Pass Algorithm)

Idêntico ao single-player `index.html`:

```
Pass 1 — corretos (posição exata)
Pass 2 — presentes (letra existe, posição diferente)
Restantes — ausentes
```

Implementado na edge function `arena-result` e também como fallback client-side em `twoPassClient()`.

---

## 7. Configurações da Sala (host)

| Opção | Valores | Padrão |
|---|---|---|
| Timer proposta | 30s / 45s / 60s | 45s |
| Timer votação | 15s / 20s / 30s | 20s |
| Power-ups habilitados | on/off | on |
| Falha regride nível | on/off | off |
| Compensação Time B | Nenhuma / +Tentativa / +15s | Nenhuma |

Compensação para o Time B existe porque o Time A sempre joga primeiro.

---

## 8. Arquitetura Técnica

### 8.1 Stack
- **Frontend**: Single HTML file (`arena.html`), sem framework, Supabase JS v3
- **Backend**: Supabase (database + Realtime + Edge Functions)
- **Realtime**: PostgreSQL changes + Presence + Broadcast

### 8.2 Tabelas

```sql
arena_rooms       -- sala, estado, config, níveis, palavras, power-ups
arena_players     -- jogadores, time, online/offline
arena_proposals   -- propostas de palavras por turno
arena_votes       -- votos em propostas por turno
```

### 8.3 Edge Functions

| Função | Endpoint | Descrição |
|---|---|---|
| `arena-word` | `POST /functions/v1/arena-word` | Sorteia palavra por nível, evita repetições |
| `arena-result` | `POST /functions/v1/arena-result` | Two-pass, atualiza nível/tentativas/winner |

### 8.4 Channels Supabase

| Canal | Tipo | Propósito |
|---|---|---|
| `arena:{roomId}` | Presence + PG Changes + Broadcast | Canal principal da sala |
| evento `feedback` | Broadcast | Resultado two-pass para todos os clientes |
| evento `power_use` | Broadcast | Power-up usado; todos aplicam efeito visual |
| evento `chat_A` / `chat_B` | Broadcast | Chat privado por time |
| evento `react` | Broadcast | Reações de espectadores (emoji flutuante) |

---

## 9. Estado Client-side

### Objeto de sessão `S`
```js
const S = {
  nick, roomId, roomCode, room, players, onlineIds,
  isHost, myTeam, channel, busy
}
```

### Globais de jogo
```js
let G_proposals = [];        // arena_proposals do turno atual
let G_votes = {};            // { [proposalId]: [playerIds] }
let G_myVote = null;
let G_proposalSubmitted = false;
let G_timerInterval = null;
let G_feedbackData = null;   // { feedback, correct, chosenWord }
let G_roundStartMs = 0;      // timestamp inicio da fase propose (para tiebreaker)
// Power-ups
let G_shieldActive = false;
let G_fogActive = false;
let G_mirrorActive = false;
let G_hiddenVotes = false;
let G_revealSlot = null;
```

---

## 10. Polish & UX

| Feature | Detalhe |
|---|---|
| Confete de nível | Partículas coloridas na cor do time ao acertar |
| Shake de urgência | Animação shake no `#phase-card` ao ≤10s restantes |
| Capitão de turno | Badge "👑 Capitão" rotaciona por `turn_number % teamSize` |
| Chat de time | Canal broadcast privado por time; painel flutuante |
| Reações de espectador | 🔥 😮 👀 flutuam ao clicar (broadcast para todos) |
| Timer visual | Barra animada + countdown, fica vermelha ao ≤10s |
| Presença | Ponto verde/cinza por jogador via Supabase Presence |
| Revanche | Host reinicia do zero mantendo times |
| Reconexão | Jogador que reconecta retoma time e estado automaticamente |

---

## 11. Roadmap / Decisões Abertas

### Implementado ✅
- [x] Branch `feat/arena-multiplayer`
- [x] SQL migration (4 tabelas + RLS + Realtime)
- [x] Lobby completo (HTML/CSS/JS, Presence, config)
- [x] Edge Function `arena-word`
- [x] Edge Function `arena-result`
- [x] Motor de jogo: between, propose, vote, feedback, finished
- [x] Glifo SVG renderizado (LETTERS + makeSVG + renderGlyph)
- [x] Scoreboard 7 pips por time + turn emblem
- [x] Timer bar animado com `phase_deadline`
- [x] Revanche + voltar ao lobby
- [x] Power-ups: fila, ganho, 8 efeitos visuais
- [x] Capitão de turno (badge rotativo)
- [x] Polish: confetes, shake de urgência, chat de time, reações

### Pendente / Futuro 🔮
- [ ] Modo torneio (bracket automático)
- [ ] Placar histórico por jogador (persistência entre partidas)
- [ ] Palavras temáticas (deck customizado pelo host)
- [ ] Modo de observação split-screen (iframe dois times)
- [ ] Notificação push quando é sua vez (Web Push API)
- [ ] Replay da partida (log de todos os turnos)

### Decisões tomadas durante o design
| Questão | Decisão |
|---|---|
| Votação por letra ou por palavra? | Por palavra completa (proposta → votação → resultado) |
| Regressão padrão? | OFF (host pode habilitar) |
| Peso do capitão? | Igual (puramente visual) |
| Palavra revelada ao adversário ao errar? | Sim, ao fim da fase feedback |
| Compensação Time B padrão? | Nenhuma (host pode ativar) |

---

## 12. Deploy

### Banco de dados
```bash
# Aplicado via MCP (tabelas confirmadas existentes)
supabase db push --linked
```

### Edge Functions
```bash
npx --yes supabase functions deploy arena-word --project-ref ppssfweuotjgcfejdznn
npx --yes supabase functions deploy arena-result --project-ref ppssfweuotjgcfejdznn
```

### Supabase Project
- **ID**: `ppssfweuotjgcfejdznn`
- **URL**: `https://ppssfweuotjgcfejdznn.supabase.co`
- **Anon Key**: `sb_publishable_6qrOSWi3JCwuQeBtCgDEOw_UgjWhTMk`
