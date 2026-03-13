Como rodar o jogo localmente

Opção A — usando Node (recomendado se tiver Node.js instalado)

1. Abra um terminal na pasta do projeto (onde está `index.html`).
2. Rode:

```
npm install
npm start
```

3. Abra no navegador: `http://localhost:8080`

Opção B — usando Python (se não tiver Node)

1. Abra um terminal na pasta do projeto.
2. Rode:

```
python -m http.server 8080
```

3. Abra no navegador: `http://localhost:8080`

Observações

- O jogo usa recursos que exigem servir via HTTP (service worker, módulos, etc.), portanto abrir `index.html` via `file://` não funcionará corretamente.
- Se preferir recarregamento automático ao salvar, use `live-server` em vez do `http-server`:

	- Instalar globalmente: `npm i -g live-server`
	- Rodar: `live-server --port=8080 --no-browser`

	Ou usar sem instalar (via npx): `npx live-server --port=8080 --no-browser --watch=.`
