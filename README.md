# glif.foo 🔷

> Jogo de palavras PT-BR com glifos geométricos — inspirado no Wordle

## O que é

As letras da palavra do dia são empilhadas em camadas formando um **glifo geométrico SVG**. O jogador tenta descobrir a palavra em **4 tentativas**, guiado pelo feedback visual do glifo.

## Como jogar

- Cada letra ganha uma **cor única** e consistente durante a sessão
- Letra na posição certa → some do Glifo do Dia, slot fica colorido
- Letra existe mas posição errada → acende colorida no Glifo do Dia
- Letra não existe → eliminada do teclado virtual
- Use a **Chave Decodificadora** (1 por tentativa) para revelar uma letra
- Toque em dois slots preenchidos para **trocar de posição**

## Stack

Single-file sem dependências externas: `glifo_ptbr.html` (HTML + CSS + JS vanilla)

- Fontes: DM Serif Display + DM Sans (Google Fonts)
- SVG gerado programaticamente
- Temas dark/light
- Tutorial interativo de 7 passos

## Roadmap

- [ ] Banco de palavras PT-BR real + rotação diária
- [ ] Validação de dicionário
- [ ] Sistema de streak e estatísticas
- [ ] PWA / versão mobile nativa

## Como rodar

Abra o arquivo `glifo_ptbr.html` diretamente no browser — não precisa de servidor ou build.

---

*Desenvolvido com ♥ em PT-BR*
