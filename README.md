# glif.foo

Jogo diário de palavras em português. As letras da palavra do dia se empilham em camadas formando um **glifo geométrico SVG** — estude as formas sobrepostas e decodifique a palavra escondida em até 4 tentativas.

🎮 **[Jogar em glif.foo](https://glif.foo)**

---

## Mecânica

- Cada letra tem uma **cor única** e consistente durante toda a sessão
- Letra na **posição certa** → some do Glifo do Dia ✨
- Letra na palavra mas **posição errada** → acende colorida no glifo
- Letra **não existe** → eliminada do teclado
- **Swap** — toque em dois slots preenchidos para trocar de posição
- **Chave Decodificadora** 🔑 — 1 por tentativa, revela uma letra à sua escolha

## Stack

- Single-file HTML + CSS + JS — sem frameworks, sem dependências
- SVG gerado programaticamente via `makeSVG()`
- Fontes: DM Serif Display + DM Sans (Google Fonts)
- PWA: offline-capable, instalável no celular

## Estrutura

```
/                   ← raiz de deploy (GitHub Pages / Vercel / Netlify)
├── index.html
├── manifest.json
├── sw.js
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   ├── apple-touch-icon.png
│   └── favicon-32.png
└── src/            ← fonte de desenvolvimento
    └── glifo_ptbr.html
```

> O arquivo `index.html` na raiz é sempre uma cópia do `src/glifo_ptbr.html` após cada sessão de desenvolvimento.

## Deploy

Funciona em qualquer host estático com HTTPS (necessário para Service Worker):

- **GitHub Pages** — repositório público, `Settings > Pages > branch main / root`
- **Vercel** — `vercel --prod`
- **Netlify** — drag & drop da pasta raiz

## Desenvolvimento local

```bash
# Servidor local com HTTPS não é necessário para desenvolver,
# mas o SW só registra em localhost ou HTTPS
npx serve .
# ou
python3 -m http.server 8080
```

## Roadmap

- [ ] Banco de palavras expandido (meta: 365+ para cobrir um ano sem repetição)
- [ ] Dicionário de tentativas completo (~50k palavras PT-BR)
- [ ] Modo arquivo — jogar puzzles anteriores
- [ ] Sistema de contas e streak cross-device

## Licença

© 2026 glif.foo — Todos os direitos reservados.
