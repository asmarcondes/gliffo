# Gliffo Design System

A small React component library extracted from the **glif.foo** game UI. It
reproduces Gliffo's visual language — warm dark/light themes, the amber accent,
DM Serif Display + DM Sans typography, and the recurring components — as reusable,
typed-by-convention React components that consume CSS custom properties.

> Extracted from the game's `app.css`/`index.html`. The game itself is untouched;
> this folder is self-contained.

## Layout

```
design-system/
├── tokens.css          # :root + [data-theme] custom properties (the single source of truth)
├── components.css      # class-based styles for every component, all using the tokens
├── components/         # React components (.jsx), CSS-variable based
│   ├── index.js        # barrel export
│   ├── Button.jsx      IconButton.jsx   Logo.jsx        Badge.jsx
│   ├── Toggle.jsx      ConfigRow.jsx    GlyphPanel.jsx  LetterBox.jsx
│   ├── Keyboard.jsx    Modal.jsx        StatGrid.jsx    CountdownBlock.jsx
│   ├── FeedbackMessage.jsx  AuthCTA.jsx  AchievementPopup.jsx
│   ├── PassportCard.jsx     TutorialPanel.jsx
├── preview.html        # gallery page: every component, dark + light
├── preview.src.jsx     # source for the gallery (mirrors components/*)
├── preview.compiled.js # esbuild output that preview.html loads (no CDN Babel)
└── README.md
```

## Usage

1. Load the DM fonts (Google Fonts: `DM Serif Display`, `DM Sans`).
2. Import the stylesheets once at your app root, **tokens first**:

   ```js
   import "gliffo-design-system/tokens.css";
   import "gliffo-design-system/components.css";
   ```

3. Wrap your tree in an element that sets the theme and the scope class:

   ```jsx
   import { Button, Modal, GlyphPanel } from "gliffo-design-system/components";

   <div data-theme="dark" className="gf-scope">
     <Button variant="primary">Decodificar</Button>
   </div>
   ```

   Switch `data-theme` between `"dark"` and `"light"` to retheme — every token
   updates automatically.

## Theming idiom

This is a **CSS-variable** design system — there are no utility classes to learn
and you don't pass design values as props. The look comes from the tokens in
`tokens.css`:

- **Color:** `--bg`, `--surface`, `--surface2/3`, `--border`, `--border2`,
  `--text`, `--text2`, `--text3`, the `--amber-50…600` accent scale, feedback
  colors `--found` / `--correct` / `--wrong`, and the six glyph colors
  `--gc0…gc5`. All theme-aware except the amber/glyph scales (constant by design).
- **Type:** `--font-serif` (DM Serif Display — titles, stat values, the timer)
  and `--font-sans` (DM Sans — everything else).

To style your own layout glue, read from these variables
(`color: var(--text2)`, `background: var(--surface2)`, …) so it tracks the theme.

## Components

| Component | Source class | Notes |
|---|---|---|
| `Logo` | `.logo` | The glif.foo wordmark |
| `Button` | `.dbtn` / `.sbtn` / `.passport-share-btn` / `.auth-btn` | `variant`: primary · share · outline · auth |
| `IconButton` | `.hbtn` | `accent`, `dot`; pass a 24×24 stroke `<svg>` |
| `Badge` | `.dif-badge` / `.early-access-badge` | `difficulty` or `variant="ea"` |
| `Toggle` | `.cfg-switch` | controlled `checked`/`onChange` |
| `ConfigRow` / `ConfigDivider` | `.cfg-row` | icon + label + sub + `control`/`chevron` |
| `GlyphPanel` | `.gpanel` | tile + floating tag; `daily` for amber tag |
| `LetterBox` / `LetterBoxes` | `.lbox` | `active`, `decoded`, `kused` |
| `Keyboard` | `.keyboard` | `keyStates`, `onKey` |
| `Modal` + parts | `.moverlay`/`.modal` | bottom-sheet on mobile, centered on desktop |
| `StatGrid` / `StatCard` | `.stats-grid` | 3-up by default |
| `PassportCard` | `.passport-card` | gradient card, 4-up grid, footer slot |
| `CountdownBlock` | `.countdown-block` | serif tabular timer |
| `FeedbackMessage` | `.fbmsg` | `tone`: found · err · key · warn |
| `AuthCTA` | `.auth-cta` | save-progress prompt |
| `AchievementPopup` | `.ach-popup` | toast |
| `TutorialPanel` | `.tut-panel` | chat-style onboarding shell |

## Preview

Serve the folder and open `preview.html` — it renders every component in dark
and light, side by side. (`preview.html` loads `preview.compiled.js`; serving
over HTTP is required because the page loads React from a CDN.)

```
# from the design-system/ folder
pnpm dlx serve .                 # then open the printed URL → /preview.html
```

To change the gallery, edit `preview.src.jsx` and rebuild:

```
pnpm dlx esbuild preview.src.jsx --bundle --jsx=transform \
  --jsx-factory=React.createElement --jsx-fragment=React.Fragment \
  --loader:.jsx=jsx --outfile=preview.compiled.js
```

## Syncing to Claude Design (claude.ai/design)

Because these are real React components with a stylesheet that flows from a
single token file, this library is now in shape to be imported into a
claude.ai/design project via the `/design-sync` workflow, so Claude's design
agent can build new Gliffo-branded screens out of these exact components.
