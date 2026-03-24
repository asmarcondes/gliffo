// ═══════════════════════════════════════════════
// ALPHABET
// ═══════════════════════════════════════════════
const LETTERS = {
  A: {
    paths: ["M 5 200 L 100 0 L 195 200", "M 0 100 L 200 100"],
    lc: "butt",
    lj: "miter",
  },
  B: {
    paths: [
      "M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 82.0 L 177.0 100.0 L 5.0 100.0 L 177.0 100.0 L 195.0 118.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z",
      "M 5.0 5.0 L 5.0 195.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  C: {
    paths: [
      "M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 195.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  D: {
    paths: [
      "M 5.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 5.0 195.0 Z",
    ],
    lc: "butt",
    lj: "miter",
  },
  E: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  F: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 0.0 5.0 L 200.0 5.0 M 0.0 100.0 L 200.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  G: {
    paths: [
      "M 195.0 100.0 L 195.0 195.0 L 5.0 195.0 L 5.0 5.0 L 195.0 5.0",
      "M 100.0 100.0 L 195.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  H: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0 M 195.0 0.0 L 195.0 200.0 M 0.0 100.0 L 200.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  I: {
    paths: [
      "M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  J: {
    paths: [
      "M 195.0 0.0 L 195.0 200.0 M 0.0 195.0 L 200.0 195.0 M 5.0 195.0 L 5.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  K: {
    paths: [
      "M 5 0 L 5 200",
      "M 5 100 L 100 100",
      "M 100 100 L 195 5",
      "M 100 100 L 195 195",
    ],
    lc: "butt",
    lj: "bevel",
  },
  L: {
    paths: ["M 5.0 0.0 L 5.0 195.0 L 200.0 195.0"],
    lc: "butt",
    lj: "miter",
  },
  M: {
    paths: [
      "M 5.0 195.0 L 5.0 5.0 L 97.5 97.5 L 102.5 97.5 L 195.0 5.0 L 195.0 195.0",
      "M 100.0 97.5 L 100.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
  },
  N: {
    paths: [
      "M 5.0 200.0 L 5.0 5.0 L 195.0 195.0 L 195.0 200.0",
      "M 5.0 5.0 L 5.0 0.0",
      "M 195.0 195.0 L 195.0 0.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  O: {
    paths: [
      "M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z",
    ],
    lc: "butt",
    lj: "miter",
    ml: 8,
  },
  P: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  Q: {
    paths: [
      "M 23.0 5.0 L 177.0 5.0 L 195.0 23.0 L 195.0 177.0 L 177.0 195.0 L 23.0 195.0 L 5.0 177.0 L 5.0 23.0 Z",
      "M 100.0 100.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
    ml: 8,
  },
  R: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 5.0 5.0 L 195.0 5.0 L 195.0 100.0 L 5.0 100.0",
      "M 100.0 100.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  S: {
    paths: [
      "M 200.0 5.0 L 0.0 5.0 M 5.0 5.0 L 5.0 100.0 M 0.0 100.0 L 200.0 100.0 M 195.0 100.0 L 195.0 195.0 M 0.0 195.0 L 200.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  T: {
    paths: ["M 0.0 5.0 L 200.0 5.0 M 100.0 0.0 L 100.0 200.0"],
    lc: "butt",
    lj: "miter",
  },
  U: {
    paths: [
      "M 5.0 0.0 L 5.0 200.0",
      "M 195.0 0.0 L 195.0 200.0",
      "M 5.0 195.0 L 195.0 195.0",
    ],
    lc: "butt",
    lj: "miter",
  },
  V: { paths: ["M 5 0 L 100 200 L 195 0"], lc: "butt", lj: "miter" },
  W: {
    paths: [
      "M 5.0 195.0 L 5.0 5.0 L 97.5 97.5 L 102.5 97.5 L 195.0 5.0 L 195.0 195.0",
      "M 100.0 97.5 L 100.0 100.0",
    ],
    lc: "square",
    lj: "miter",
    ml: 6,
    transform: "translate(0 200) scale(1 -1)",
  },
  X: {
    paths: ["M 5.0 5.0 L 195.0 195.0 M 195.0 5.0 L 5.0 195.0"],
    lc: "butt",
    lj: "bevel",
  },
  Y: {
    paths: [
      "M 5.0 5.0 L 100.0 100.0 L 195.0 5.0",
      "M 100.0 100.0 L 100.0 200.0",
    ],
    lc: "butt",
    lj: "bevel",
  },
  Z: {
    paths: ["M 5.0 5.0 L 195.0 5.0 L 5.0 195.0 L 195.0 195.0"],
    lc: "butt",
    lj: "bevel",
  },
};

function makeSVG(letter, color, extraStyle) {
  const def = LETTERS[letter.toUpperCase()];
  if (!def) return null;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Letra ${letter.toUpperCase()}`);
  const title = document.createElementNS(ns, "title");
  title.textContent = `Letra ${letter.toUpperCase()}`;
  svg.appendChild(title);
  if (extraStyle) svg.style.cssText = extraStyle;
  const g = document.createElementNS(ns, "g");
  g.setAttribute("fill", "none");
  g.setAttribute("stroke", color);
  g.setAttribute("stroke-width", "10");
  g.setAttribute("stroke-linecap", def.lc || "butt");
  g.setAttribute("stroke-linejoin", def.lj || "miter");
  g.setAttribute("stroke-miterlimit", String(def.ml || 4));
  if (def.transform) g.setAttribute("transform", def.transform);
  def.paths.forEach((d) => {
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", d);
    g.appendChild(p);
  });
  svg.appendChild(g);
  return svg;
}

// ═══════════════════════════════════════════════
// DICIONÁRIO — pré-populado sync c/ PALAVRAS; substituído por JSON completo async
// ═══════════════════════════════════════════════
// Pré-populado logo abaixo, após definição de PALAVRAS (ver loadDicionario())
let DICIONARIO = new Set();
let dicReady = false; // true após Set populado com léxico completo
// ═══════════════════════════════════════════════
// BANCO DE PALAVRAS PT-BR — rotação diária
// Tamanho define dificuldade:
//   Dom → 4 letras (Fácil)
//   Seg/Ter → 5 letras (Médio)
//   Qua/Qui → 6 letras (Difícil)
//   Sex/Sáb → 7 letras (Muito Difícil)
// ═══════════════════════════════════════════════
const PALAVRAS = {
  facil: [
    "ACAO",
    "AGIR",
    "AGUA",
    "ALHO",
    "ALMA",
    "ALTA",
    "ALTO",
    "ALVO",
    "AMAR",
    "AMEM",
    "AMOR",
    "ANEL",
    "ANJO",
    "ANOS",
    "AQUI",
    "ARCO",
    "AREA",
    "ARMA",
    "ARTE",
    "ATOR",
    "AULA",
    "AUTO",
    "AZUL",
    "BASE",
    "BEBE",
    "BELA",
    "BELO",
    "BENS",
    "BICO",
    "BOAS",
    "BOCA",
    "BOLA",
    "BOLO",
    "BONS",
    "BOTA",
    "BUDA",
    "CABO",
    "CACA",
    "CADA",
    "CAES",
    "CAFE",
    "CAIR",
    "CAMA",
    "CAOS",
    "CAPA",
    "CARA",
    "CARO",
    "CASA",
    "CASO",
    "CEDO",
    "CENA",
    "CEUS",
    "CHAO",
    "CIMA",
    "COLA",
    "COLO",
    "COMO",
    "COPA",
    "COPO",
    "CRER",
    "CRUZ",
    "CUBO",
    "CURA",
    "DADO",
    "DANO",
    "DATA",
    "DEDO",
    "DEUS",
    "DIAS",
    "DICA",
    "DOCE",
    "DOIS",
    "DONA",
    "DONO",
    "DOSE",
    "DOZE",
    "DUAS",
    "DURA",
    "DURO",
    "EIXO",
    "ERRO",
    "ERVA",
    "EURO",
    "FACA",
    "FACE",
    "FALA",
    "FAMA",
    "FASE",
    "FATO",
    "FEIO",
    "FIEL",
    "FILA",
    "FINA",
    "FINO",
    "FINS",
    "FIOS",
    "FITA",
    "FIXA",
    "FIXO",
    "FLOR",
    "FOCO",
    "FOFO",
    "FOGO",
    "FOME",
    "FONE",
    "FORA",
    "FOTO",
    "FRIA",
    "FRIO",
    "FUGA",
    "FUMO",
    "GAMA",
    "GATA",
    "GATO",
    "GELO",
    "GRAU",
    "GUIA",
    "HOJE",
    "HORA",
    "ILHA",
    "INOX",
    "IRMA",
    "ISCA",
    "ISTO",
    "ITEM",
    "JATO",
    "JOGO",
    "JUIZ",
    "JURI",
    "LADO",
    "LAGO",
    "LATA",
    "LAVA",
    "LEAO",
    "LEIS",
    "LEVE",
    "LIGA",
    "LIMA",
    "LIXO",
    "LOBO",
    "LOGO",
    "LOJA",
    "LONA",
    "LOTE",
    "LULA",
    "LUPA",
    "LUTA",
    "LUXO",
    "MAIA",
    "MAIO",
    "MAIS",
    "MALA",
    "MANO",
    "MAOS",
    "MAPA",
    "MATA",
    "MATO",
    "MAUS",
    "MEDO",
    "MEIA",
    "MEIO",
    "MENU",
    "MESA",
    "META",
    "MEUS",
    "MITO",
    "MOCA",
    "MODA",
    "MODO",
    "MORA",
    "MOTO",
    "MUDA",
    "MURO",
    "NETO",
    "NEVE",
    "NOME",
    "NOTA",
    "NOVA",
    "NOVE",
    "NOVO",
    "OBRA",
    "OCIO",
    "ODIO",
    "OITO",
    "OLEO",
    "OLHO",
    "ONDA",
    "ONDE",
    "ORAL",
    "OURO",
    "OVOS",
    "PAIS",
    "PANO",
    "PAPA",
    "PAPO",
    "PATO",
    "PECA",
    "PELE",
    "PENA",
    "PESO",
    "PIOR",
    "PISO",
    "PIVO",
    "POLO",
    "POVO",
    "PURA",
    "PURO",
    "QUAL",
    "QUEM",
    "RACA",
    "RAIO",
    "RAIZ",
    "RAMO",
    "RARO",
    "REAL",
    "REDE",
    "REIS",
    "RETA",
    "RICA",
    "RICO",
    "RIOS",
    "RODA",
    "ROSA",
    "ROTA",
    "RUIM",
    "RUMO",
    "SACO",
    "SAGA",
    "SAIA",
    "SAIR",
    "SALA",
    "SAPO",
    "SECA",
    "SECO",
    "SEDE",
    "SEIS",
    "SELO",
    "SETE",
    "SOFA",
    "SOJA",
    "SOLO",
    "SOMA",
    "SONO",
    "SONS",
    "SOPA",
    "SUCO",
    "TACA",
    "TAXA",
    "TELA",
    "TEMA",
    "TEOR",
    "TESE",
    "TETO",
    "TIME",
    "TIPO",
    "TIRA",
    "TIRO",
    "TOCA",
    "TODA",
    "TODO",
    "TOPO",
    "TREM",
    "TRES",
    "TRIO",
    "USAR",
    "UTIL",
    "VAGA",
    "VALE",
    "VARA",
    "VELA",
    "VIAS",
    "VICE",
    "VIDA",
    "VILA",
    "VIVA",
    "VIVO",
    "VOAR",
    "VOTO",
    "ZERO",
    "ZONA",
    "ZOOM",
  ],
  medio: [
    "ABRIL",
    "ABRIR",
    "ACIDO",
    "ACIMA",
    "ACOES",
    "ADEUS",
    "AGORA",
    "AJUDA",
    "ALBUM",
    "AMBAR",
    "AMIGA",
    "AMIGO",
    "ANDAR",
    "APELO",
    "APOIO",
    "AREAS",
    "ARFAR",
    "ARTES",
    "ATRAS",
    "ATRIZ",
    "ATUAL",
    "AUTOR",
    "BAIXA",
    "BAIXO",
    "BANCO",
    "BANDA",
    "BANHO",
    "BARCO",
    "BASTA",
    "BATER",
    "BEBER",
    "BEIJO",
    "BEIRA",
    "BELAS",
    "BISPO",
    "BLUSA",
    "BOLSA",
    "BRACO",
    "BREVE",
    "BRIGA",
    "BROTO",
    "BUSCA",
    "CABOS",
    "CAIXA",
    "CALDO",
    "CALOR",
    "CAMPO",
    "CANAL",
    "CAPAZ",
    "CAPIM",
    "CARGO",
    "CARNE",
    "CARRO",
    "CARTA",
    "CASAL",
    "CASAS",
    "CASOS",
    "CAUSA",
    "CERCA",
    "CERTA",
    "CERTO",
    "CHAVE",
    "CHEFE",
    "CHEIA",
    "CHEIO",
    "CHUVA",
    "CINCO",
    "CINZA",
    "CIRCO",
    "CITAR",
    "CIVIL",
    "CLARO",
    "CLIMA",
    "CLIPE",
    "CLUBE",
    "COBRA",
    "COBRE",
    "COISA",
    "COLAR",
    "COLMO",
    "COMER",
    "COMUM",
    "CONTA",
    "CONTO",
    "COPIA",
    "CORES",
    "CORPO",
    "CORTE",
    "CORVO",
    "COSTA",
    "COURO",
    "CRIAR",
    "CRIME",
    "CRISE",
    "CULPA",
    "CULTO",
    "CURSO",
    "CURVA",
    "CUSTO",
    "DADOS",
    "DEDAL",
    "DENTE",
    "DICAS",
    "DIETA",
    "DISCO",
    "DIZER",
    "DOBRA",
    "DOCES",
    "DORES",
    "DRAMA",
    "DUPLA",
    "DUPLO",
    "EPOCA",
    "ESSAS",
    "ESSES",
    "ESTAR",
    "ESTES",
    "ETICA",
    "EXTRA",
    "FACIL",
    "FAIXA",
    "FALAR",
    "FALHA",
    "FALTA",
    "FARPA",
    "FASES",
    "FATOR",
    "FATOS",
    "FAVOR",
    "FAZER",
    "FEBRE",
    "FEIRA",
    "FEITO",
    "FELIZ",
    "FESTA",
    "FIBRA",
    "FICAR",
    "FICHA",
    "FILHA",
    "FILHO",
    "FILME",
    "FINAL",
    "FIRME",
    "FLOCO",
    "FOLHA",
    "FONTE",
    "FORCA",
    "FORMA",
    "FORNO",
    "FORTE",
    "FORUM",
    "FOSSO",
    "FRACO",
    "FRASE",
    "FRETE",
    "FRUTA",
    "FUGIR",
    "FUNDO",
    "GALHO",
    "GANSO",
    "GARCA",
    "GARFO",
    "GEADA",
    "GENIO",
    "GENTE",
    "GERAL",
    "GLOBO",
    "GOLFO",
    "GOLPE",
    "GOSTO",
    "GRACA",
    "GRADE",
    "GRAMA",
    "GRAUS",
    "GRUPO",
    "GRUTA",
    "HAVER",
    "HEROI",
    "HOMEM",
    "HORAS",
    "HOTEL",
    "HUMOR",
    "IDADE",
    "IDEAL",
    "IDEIA",
    "IGNEO",
    "IGUAL",
    "INFRA",
    "IRMAO",
    "JEITO",
    "JESUS",
    "JOGAR",
    "JOGOS",
    "JOVEM",
    "JUIZO",
    "JULHO",
    "JUNHO",
    "JUNTO",
    "JUSTA",
    "LANCA",
    "LANCE",
    "LAPIS",
    "LAZER",
    "LEGAL",
    "LEITE",
    "LENDA",
    "LENHA",
    "LESAO",
    "LETRA",
    "LEVAR",
    "LIDAR",
    "LIDER",
    "LIGAR",
    "LINDA",
    "LINDO",
    "LINHA",
    "LISTA",
    "LIVRE",
    "LIVRO",
    "LOCAL",
    "LONGE",
    "LONGO",
    "LOUCA",
    "LUCRO",
    "LUGAR",
    "LUZES",
    "MAIOR",
    "MANGA",
    "MANHA",
    "MARCA",
    "MARCO",
    "MEDIA",
    "MEDIO",
    "MENOR",
    "MENOS",
    "MENTE",
    "MESMA",
    "MESMO",
    "METAL",
    "MINAS",
    "MINHA",
    "MOLDE",
    "MORTE",
    "MUDAR",
    "MUITO",
    "MUNDO",
    "NATAL",
    "NEGAR",
    "NEGRO",
    "NEVOA",
    "NIVEL",
    "NOBRE",
    "NOCAO",
    "NOITE",
    "NOMES",
    "NORTE",
    "NOVAS",
    "NUVEM",
    "OBRAS",
    "OBTER",
    "OGIVA",
    "OLHAR",
    "OLHOS",
    "ONTEM",
    "OPCAO",
    "OPTAR",
    "ORDEM",
    "OTIMO",
    "OUVIR",
    "PADRE",
    "PAGAR",
    "PALCO",
    "PAPEL",
    "PARES",
    "PARTE",
    "PARTO",
    "PASSO",
    "PECAS",
    "PEDIR",
    "PEDRA",
    "PEGAR",
    "PELOS",
    "PENAL",
    "PERNA",
    "PERTO",
    "PESCA",
    "PIANO",
    "PIRES",
    "PISTA",
    "PLANO",
    "PLENA",
    "PLENO",
    "POBRE",
    "PODER",
    "POETA",
    "POLEN",
    "PORTA",
    "PORTO",
    "POUCO",
    "POUSO",
    "PRACA",
    "PRAIA",
    "PRATA",
    "PRATO",
    "PRAZO",
    "PRECO",
    "PRESA",
    "PRESO",
    "PRETA",
    "PRETO",
    "PROVA",
    "QUASE",
    "QUEDA",
    "RADIO",
    "RAIVA",
    "RAZAO",
    "REAIS",
    "REDES",
    "REFEM",
    "REINO",
    "RENDA",
    "RESTO",
    "RISCO",
    "ROUPA",
    "SABER",
    "SABOR",
    "SAIDA",
    "SANTA",
    "SANTO",
    "SAUDE",
    "SECAO",
    "SENHA",
    "SERIA",
    "SERIE",
    "SERIO",
    "SERRA",
    "SETOR",
    "SEXTA",
    "SINAL",
    "SONHO",
    "SORTE",
    "SUAVE",
    "SUBIR",
    "SUITE",
    "SUPER",
    "TARDE",
    "TEMAS",
    "TEMPO",
    "TENIS",
    "TENUE",
    "TERCA",
    "TERMO",
    "TERRA",
    "TESTE",
    "TIPOS",
    "TIRAR",
    "TODAS",
    "TODOS",
    "TOMAR",
    "TROCA",
    "TURMA",
    "UNHAS",
    "UNIAO",
    "UNICA",
    "UNICO",
    "UTEIS",
    "VAGAS",
    "VALOR",
    "VELHA",
    "VELHO",
    "VENDA",
    "VERAO",
    "VERDE",
    "VEZES",
    "VIDAS",
    "VIDEO",
    "VISAO",
    "VISTA",
    "VISTO",
    "VIVER",
    "VOCES",
    "VOLTA",
  ],
  dificil: [
    "ABAIXO",
    "ABERTO",
    "ABISMO",
    "ABRACO",
    "ACERVO",
    "ACESSO",
    "ACORDO",
    "AFINAL",
    "AGOSTO",
    "AJUDAR",
    "AJUSTE",
    "ALBUNS",
    "ALEGRE",
    "ALGUNS",
    "ALTURA",
    "AMIGOS",
    "AMORES",
    "ANFORA",
    "ANTIGO",
    "APESAR",
    "AQUILO",
    "ARGILA",
    "ARIDEZ",
    "ARTIGO",
    "ARVORE",
    "ASTUTO",
    "BAIRRO",
    "BAIXAR",
    "BASICO",
    "BEIJOS",
    "BELEZA",
    "BOTECO",
    "BRACOS",
    "BRANCO",
    "BRILHO",
    "BRINDE",
    "BURACO",
    "BUSCAR",
    "CABECA",
    "CABELO",
    "CADEIA",
    "CAMBIO",
    "CAMPUS",
    "CANELA",
    "CANETA",
    "CARROS",
    "CARTAO",
    "CARTAZ",
    "CAVALO",
    "CEBOLA",
    "CENTRO",
    "CHARCO",
    "CHARME",
    "CHAVES",
    "CHEGAR",
    "CHEIRO",
    "CHINES",
    "CHOQUE",
    "CHUMBO",
    "CHUVAS",
    "CIDADE",
    "CINEMA",
    "CITADO",
    "CLAMOR",
    "CLARAO",
    "CLAROS",
    "CLASSE",
    "CLIQUE",
    "COBAIA",
    "COBICA",
    "CODIGO",
    "COISAS",
    "COLEGA",
    "COLETA",
    "COLHER",
    "COLUNA",
    "COMIGO",
    "COMITE",
    "COMPRA",
    "COMUNS",
    "CONCHA",
    "CONTAR",
    "CONTAS",
    "CONTER",
    "CORTES",
    "CORUJA",
    "CRISTA",
    "CRISTO",
    "CUIDAR",
    "CURSOS",
    "DANCAR",
    "DEBATE",
    "DEDALO",
    "DEFESA",
    "DEIXAR",
    "DEMAIS",
    "DESEJO",
    "DESSAS",
    "DESSES",
    "DESTES",
    "DIANTE",
    "DIARIO",
    "DIESEL",
    "DILEMA",
    "DIRETA",
    "DIRETO",
    "DOENCA",
    "DROGAS",
    "DUENDE",
    "DUVIDA",
    "EDICAO",
    "EDITAL",
    "EDITAR",
    "EDITOR",
    "EFEITO",
    "EFICAZ",
    "ENFASE",
    "ENIGMA",
    "ENSINO",
    "ENTRAR",
    "ENVIAR",
    "EQUIPE",
    "ESCALA",
    "ESCOLA",
    "ESCUDO",
    "ESCURO",
    "ESPACO",
    "ESPADA",
    "ESPUMA",
    "ESTADO",
    "ESTILO",
    "ESTIMA",
    "ESTOJO",
    "ESTUDO",
    "EVENTO",
    "EVITAR",
    "EXIGUO",
    "EXTASE",
    "FABULA",
    "FALCAO",
    "FECHAR",
    "FEIJAO",
    "FEITOS",
    "FERIAS",
    "FERIDA",
    "FIGURA",
    "FILHOS",
    "FILMES",
    "FILTRO",
    "FISCAL",
    "FISICA",
    "FLECHA",
    "FLORES",
    "FOLHAS",
    "FORCAS",
    "FORMAS",
    "FRANCO",
    "FRASCO",
    "FREIRA",
    "FRENTE",
    "FRUTAS",
    "FULCRO",
    "FUNCAO",
    "FUNDOS",
    "FUTURO",
    "GALERA",
    "GANHAR",
    "GAZELA",
    "GERAIS",
    "GESTAO",
    "GESTOR",
    "GOSTAR",
    "GRANDE",
    "GRATIS",
    "GRAVES",
    "GREMIO",
    "GRUPOS",
    "GUARDA",
    "GUERRA",
    "HEROIS",
    "HOMENS",
    "HOTEIS",
    "HUMANO",
    "IGREJA",
    "IMAGEM",
    "INDICE",
    "INGLES",
    "INICIO",
    "INOCUO",
    "JARDIM",
    "JORNAL",
    "JOVENS",
    "JUDEUS",
    "JULGAR",
    "JUNTAS",
    "LABIOS",
    "LACUNA",
    "LEGAIS",
    "LEITOR",
    "LETRAS",
    "LIGADO",
    "LIMPAR",
    "LINGUA",
    "LINHAS",
    "LIVRES",
    "LIVROS",
    "LOCAIS",
    "LOGICA",
    "MACULA",
    "MANTER",
    "MANUAL",
    "MARIDO",
    "MATRIZ",
    "MAXIMO",
    "MAZELA",
    "MEDICA",
    "MEDICO",
    "MEDIDA",
    "MELHOR",
    "MENINA",
    "MENSAL",
    "MINGUA",
    "MINHAS",
    "MINIMO",
    "MISSAO",
    "MODELO",
    "MOEDAS",
    "MORADA",
    "MOTIVO",
    "MUITAS",
    "MUITOS",
    "MULHER",
    "MUSICA",
    "MUSICO",
    "NACOES",
    "NASCER",
    "NEGROS",
    "NOMADE",
    "NORMAL",
    "NUBLAR",
    "NUCLEO",
    "NUMERO",
    "OCULTO",
    "OFERTA",
    "OFICIO",
    "ONIBUS",
    "OPCOES",
    "ORIGEM",
    "PACOTE",
    "PADRAO",
    "PAGINA",
    "PAINEL",
    "PAISES",
    "PALIDO",
    "PAREDE",
    "PARQUE",
    "PARTES",
    "PARTIR",
    "PASSAR",
    "PASTOR",
    "PECADO",
    "PEDACO",
    "PEDIDO",
    "PEDRAS",
    "PENEDO",
    "PENSAR",
    "PERDAO",
    "PERDER",
    "PERFIL",
    "PERIGO",
    "PEROLA",
    "PESADO",
    "PESSOA",
    "PILOTO",
    "PINTAR",
    "PIORES",
    "PISTAO",
    "POBRES",
    "POESIA",
    "POMBAL",
    "PONTOS",
    "PORTAL",
    "PORTAS",
    "POSTAR",
    "POUCOS",
    "PRANTO",
    "PRATOS",
    "PRAZER",
    "PREDIO",
    "PREMIO",
    "PRESSA",
    "PREVIA",
    "PRISAO",
    "PRISMA",
    "PROEZA",
    "PRONTO",
    "PROTON",
    "PUNHAL",
    "QUADRO",
    "QUANTO",
    "QUARTA",
    "QUARTO",
    "QUATRO",
    "QUEBRA",
    "QUEIJO",
    "QUILHA",
    "QUINTA",
    "QUINZE",
    "RAIZES",
    "RAPIDO",
    "RAZOES",
    "REGIAO",
    "REGRAS",
    "RESTIA",
    "RESUMO",
    "ROUPAS",
    "RUNICO",
    "SABADO",
    "SANGUE",
    "SANTOS",
    "SECULO",
    "SEGUIR",
    "SEGURA",
    "SEGURO",
    "SEMANA",
    "SENADO",
    "SENHOR",
    "SENTIR",
    "SEXUAL",
    "SOBRIO",
    "SOCIAL",
    "SOLENE",
    "TACITO",
    "TALVEZ",
    "TAREFA",
    "TEATRO",
    "TECIDO",
    "TENTAR",
    "TEORIA",
    "TERMOS",
    "TEXTOS",
    "TITULO",
    "TONICO",
    "TORNAR",
    "TRECHO",
    "TRILHA",
    "ULTIMA",
    "ULTIMO",
    "UMBRAL",
    "UNIDAS",
    "UNIDOS",
    "VARIAS",
    "VARIOS",
    "VENDAS",
    "VENDER",
    "VERSAO",
    "VESTIR",
    "VIAGEM",
    "VIDEOS",
    "VISITA",
    "VOLTAR",
    "ZENITE",
  ],
  muito_dificil: [
    "ABOBADA",
    "ABSURDO",
    "ADESIVO",
    "ADULTOS",
    "AGENCIA",
    "ALEGRIA",
    "ANALISE",
    "ANIMAIS",
    "AQUELES",
    "ARQUIVO",
    "ARTIGOS",
    "ASPECTO",
    "ASSIDUO",
    "ASSUNTO",
    "ATAVICO",
    "ATENCAO",
    "ATRAVES",
    "AUMENTO",
    "AUTORES",
    "AVENIDA",
    "BARULHO",
    "BOLETIM",
    "BRAVURA",
    "BRUXEDO",
    "CADERNO",
    "CADINHO",
    "CAMINHO",
    "CANFORA",
    "CAPITAL",
    "CARDEAL",
    "CASTELO",
    "CELEUMA",
    "CELULAR",
    "CENARIO",
    "CENTRAL",
    "CERTEZA",
    "CETACEO",
    "CIDADES",
    "CIENCIA",
    "CINTURA",
    "CIZANIA",
    "CLIENTE",
    "CODORNA",
    "COLOCAR",
    "COMBATE",
    "COMECAR",
    "COMEDIA",
    "COMPRAR",
    "COMPRAS",
    "CONDUTA",
    "CONLUIO",
    "CONSIGO",
    "CONSUMO",
    "CONTATO",
    "CORAGEM",
    "COSTUME",
    "COZINHA",
    "CREDITO",
    "CRIACAO",
    "CRIANCA",
    "CRISTAL",
    "CRISTAO",
    "CUIDADO",
    "CULTURA",
    "DEBAIXO",
    "DECISAO",
    "DELICIA",
    "DESAFIO",
    "DESFILE",
    "DESTINO",
    "DEVASSO",
    "DIFICIL",
    "DIGITAL",
    "DIRECAO",
    "DIREITO",
    "DIRETOR",
    "DISPUTA",
    "DITONGO",
    "DOLARES",
    "DOMINGO",
    "DURANTE",
    "DUVIDAS",
    "ECLIPSE",
    "EDITORA",
    "EFEMERO",
    "EFLUVIO",
    "EMBUSTE",
    "EMPREGO",
    "EMPRESA",
    "ENERGIA",
    "ENTANTO",
    "ENTRADA",
    "ENTREGA",
    "ESCOLAR",
    "ESCOLAS",
    "ESCOLHA",
    "ESCRITA",
    "ESCRITO",
    "ESPECIE",
    "ESPELHO",
    "ESPORTE",
    "ESTADIO",
    "ESTADOS",
    "ESTAGIO",
    "ESTIGMA",
    "ESTRADA",
    "ESTRELA",
    "ESTUDAR",
    "ESTUDIO",
    "ESTUDOS",
    "EXCLUIR",
    "EXEMPLO",
    "FABRICA",
    "FALACIA",
    "FAMILIA",
    "FARINHA",
    "FATORES",
    "FECHADA",
    "FECHADO",
    "FEDERAL",
    "FERIADO",
    "FIDUCIA",
    "FIGURAS",
    "FISSURA",
    "FLAGELO",
    "FORMULA",
    "FRANCES",
    "FRENESI",
    "FRIVOLO",
    "FUNESTO",
    "FUTEBOL",
    "GERACAO",
    "GOVERNO",
    "GRAFICO",
    "GRANDES",
    "HERESIA",
    "HORARIO",
    "HUMANOS",
    "IMAGENS",
    "INFORME",
    "INGLESA",
    "INICIAL",
    "INTEGRO",
    "INTEIRO",
    "JANEIRO",
    "JANGADA",
    "JAPONES",
    "JARDINS",
    "JOGADOR",
    "JUSTICA",
    "LAGARTA",
    "LEITURA",
    "LIMPEZA",
    "LINGUAS",
    "LISONJA",
    "LUCIFER",
    "LUGUBRE",
    "MAIORES",
    "MAIORIA",
    "MALOGRO",
    "MAQUINA",
    "MATERIA",
    "MEDICOS",
    "MEMBROS",
    "MEMORIA",
    "MENINAS",
    "MERCADO",
    "MILAGRE",
    "MILHOES",
    "MILITAR",
    "MIRAGEM",
    "MISTICO",
    "MISTURA",
    "MOCINHO",
    "MODELOS",
    "MOMENTO",
    "MONARCA",
    "MORINGA",
    "MOSTRAR",
    "MUDANCA",
    "MUNDIAL",
    "MUSICAL",
    "NATURAL",
    "NEGOCIO",
    "NEMESIS",
    "NUCLEAR",
    "NUMEROS",
    "OBLIVIO",
    "OBLONGO",
    "OFERTAS",
    "OFICIAL",
    "OMINOSO",
    "OPINIAO",
    "ORVALHO",
    "OUTUBRO",
    "PADROES",
    "PALAVRA",
    "PARCELA",
    "PAREDES",
    "PARTIDA",
    "PARTIDO",
    "PASSADO",
    "PELAGEM",
    "PEQUENA",
    "PEQUENO",
    "PERFIDO",
    "PERFUME",
    "PERIODO",
    "PERMITE",
    "PESSOAL",
    "PESSOAS",
    "PILATES",
    "PIMENTA",
    "PINTURA",
    "PIRANHA",
    "PISCINA",
    "PLACEBO",
    "PLACIDO",
    "POBREZA",
    "POLICIA",
    "POPULAR",
    "POSICAO",
    "POSTURA",
    "PRATICA",
    "PRATICO",
    "PRECISA",
    "PRECISO",
    "PRESSAO",
    "PROCURA",
    "PRODUTO",
    "PROJETO",
    "PROPRIA",
    "PROPRIO",
    "PROXIMA",
    "PROXIMO",
    "PUBLICA",
    "PUBLICO",
    "PUTRIDO",
    "QUARTOS",
    "QUERIDA",
    "QUERIDO",
    "QUESTAO",
    "QUIMERA",
    "QUINTAL",
    "RALADOR",
    "RECEBER",
    "RECEITA",
    "RECURSO",
    "REDUCAO",
    "RELACAO",
    "RELATOS",
    "RESULTA",
    "REUNIAO",
    "REVISAO",
    "REVISTA",
    "RIQUEZA",
    "ROMANCE",
    "SEGUIDA",
    "SEGUIDO",
    "SEGUNDA",
    "SELECAO",
    "SENADOR",
    "SENHORA",
    "SENTIDO",
    "SERVICO",
    "SIMPLES",
    "SISTEMA",
    "SOLUCAO",
    "SOMBRIO",
    "SOMENTE",
    "SUCESSO",
    "SUJEITO",
    "SUPORTE",
    "SUPREMO",
    "TAMANHO",
    "TAREFAS",
    "TECLADO",
    "TECNICA",
    "TECNICO",
    "TEMPERA",
    "TERMICA",
    "TORCIDA",
    "TRAFEGO",
    "TRAFICO",
    "TREFEGO",
    "TURISMO",
    "ULTIMAS",
    "UNIDADE",
    "USUARIO",
    "VALORES",
    "VEICULO",
    "VERDADE",
    "VESPERA",
    "VESTIDO",
    "VIAGENS",
    "VINCULO",
    "VIRTUDE",
    "VITORIA",
    "VONTADE",
    "VORTICE",
  ],
};

// Pré-popula DICIONARIO sync com PALAVRAS (garante validação mínima imediata)
// e substitui pelo léxico completo de forma assíncrona (localStorage → fetch)
(function loadDicionario() {
  // Fase 1 — sync: todas as palavras do banco jogável (cobertura imediata)
  DICIONARIO = new Set(Object.values(PALAVRAS).flat());

  // Fase 2 — async: léxico completo (38.6k palavras 4L–7L)
  try {
    const cached = localStorage.getItem("gliffoo_dic");
    if (cached) {
      DICIONARIO = new Set(JSON.parse(cached));
      dicReady = true;
      return;
    }
  } catch (_) {
    if (window._dbg) console.warn("[glif] localStorage dic cache read", _);
  }
  fetch("data/dicionario.json")
    .then((r) => r.json())
    .then((words) => {
      DICIONARIO = new Set(words);
      dicReady = true;
      try {
        localStorage.setItem("gliffoo_dic", JSON.stringify(words));
      } catch (_) {
        if (window._dbg) console.warn("[glif] localStorage dic cache write", _);
      }
    })
    .catch(() => {
      dicReady = true; // fallback a PALAVRAS (já no Set)
    });
})();

// Ciclo semanal de dificuldade (0=Dom, 1=Seg, ..., 6=Sáb)
// Inspirado no glyph.today: dificuldade baseada em sobreposição visual dos shapes
// Score visual: ~40 (fácil) → ~75 (muito difícil)
const CICLO_DIF = [
  "facil", // Dom
  "facil", // Seg
  "medio", // Ter
  "medio", // Qua
  "dificil", // Qui
  "dificil", // Sex
  "muito_dificil", // Sáb
];

// Faixas de score visual por nível (calibradas no modelo do glyph.today)
const SCORE_RANGE = {
  facil: { min: 40, max: 56, letras: [4, 5] },
  medio: { min: 54, max: 62, letras: [5, 6] },
  dificil: { min: 60, max: 68, letras: [5, 6] },
  muito_dificil: { min: 62, max: 80, letras: [7] },
};

// ═══════════════════════════════════════════════
// SCORE DE DIFICULDADE VISUAL
// Baseado na sobreposição dos shapes SVG entre letras únicas da palavra
// Letras repetidas reduzem o score (glifo mais simples de ler)
// Escala aproximada: 40 (fácil) → 75 (muito difícil)
// ═══════════════════════════════════════════════
const LETTER_SEGS = {
  A: new Set(["diag_L", "diag_R", "h_mid"]),
  B: new Set(["v_L", "h_T", "h_M", "h_B", "arc_TR", "arc_BR"]),
  C: new Set(["h_T", "v_L", "h_B"]),
  D: new Set(["v_L", "h_T", "h_B", "arc_R"]),
  E: new Set(["v_L", "h_T", "h_M", "h_B"]),
  F: new Set(["v_L", "h_T", "h_M"]),
  G: new Set(["v_L", "h_T", "h_B", "arc_R", "h_M_R"]),
  H: new Set(["v_L", "v_R", "h_M"]),
  I: new Set(["h_T", "v_C", "h_B"]),
  J: new Set(["v_R", "h_B", "v_L_low"]),
  K: new Set(["v_L", "h_M", "diag_TR", "diag_BR"]),
  L: new Set(["v_L", "h_B"]),
  M: new Set(["v_L", "v_R", "diag_CL", "diag_CR"]),
  N: new Set(["v_L", "v_R", "diag_C"]),
  O: new Set(["arc_all"]),
  P: new Set(["v_L", "h_T", "h_M", "arc_TR"]),
  Q: new Set(["arc_all", "diag_BR"]),
  R: new Set(["v_L", "h_T", "h_M", "arc_TR", "diag_BR"]),
  S: new Set(["h_T", "v_L_up", "h_M", "v_R_dn", "h_B"]),
  T: new Set(["h_T", "v_C"]),
  U: new Set(["v_L", "v_R", "h_B"]),
  V: new Set(["diag_L", "diag_R"]),
  W: new Set(["v_L", "v_R", "diag_CL", "diag_CR"]),
  X: new Set(["diag_L", "diag_R_inv"]),
  Y: new Set(["diag_L_up", "diag_R_up", "v_C_dn"]),
  Z: new Set(["h_T", "diag_C", "h_B"]),
};

function scoreVisual(word) {
  const all = word
    .toUpperCase()
    .split("")
    .filter((l) => LETTER_SEGS[l]);
  // Letras únicas (preservando a primeira ocorrência)
  const unicas = [...new Set(all)];
  const n = unicas.length;
  if (n < 2) return 50;

  // Jaccard entre cada par de letras únicas
  let somaOverlap = 0,
    pares = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = LETTER_SEGS[unicas[i]],
        b = LETTER_SEGS[unicas[j]];
      const inter = [...a].filter((x) => b.has(x)).length;
      const union = new Set([...a, ...b]).size;
      somaOverlap += inter / union;
      pares++;
    }
  }
  const avgOverlap = somaOverlap / pares;

  // Repetições tornam o glifo mais simples (menos elementos únicos)
  const repeticoes = all.length - n;

  // Fórmula calibrada para escala ~40-75
  return 45 + avgOverlap * 35 + n * 2 - repeticoes * 5;
}

const DAILY_WORD_URL_REMOTE =
  "https://ppssfweuotjgcfejdznn.supabase.co/functions/v1/daily-word";
const DAILY_WORD_URL_LOCAL = "http://127.0.0.1:54321/functions/v1/daily-word";

function isLocalRuntime() {
  return (
    location.protocol === "file:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
}

function resolveDailyWordUrl() {
  try {
    const override = localStorage.getItem("gliffoo_daily_word_url");
    if (override) return override;
  } catch (error) {
    console.warn("[glif] não foi possível ler override da URL diária", error);
  }

  return isLocalRuntime() ? DAILY_WORD_URL_LOCAL : DAILY_WORD_URL_REMOTE;
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function baseDateSaoPaulo() {
  const hoje = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function puzzleInfoPorOffset(offset) {
  const EPOCA = new Date("2026-03-08T00:00:00-03:00");
  const alvo = new Date(baseDateSaoPaulo().getTime() + offset * 86400000);
  const diasDesdeEpoca = Math.floor((alvo - EPOCA) / 86400000);
  return {
    dia: diasDesdeEpoca + 1,
    data: alvo,
    dateStr: formatIsoDate(alvo),
    difficulty: CICLO_DIF[alvo.getDay()],
  };
}

function difficultyLabelFor(difficulty) {
  return (
    {
      facil: "Fácil",
      medio: "Médio",
      dificil: "Difícil",
      muito_dificil: "Muito Difícil",
    }[difficulty] || difficulty
  );
}

function hashSeed(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index++) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function buildLocalPuzzle(info) {
  const difficulty = info.difficulty;
  const pool = PALAVRAS[difficulty] || PALAVRAS.medio;
  const seed = hashSeed(`${info.dateStr}:${difficulty}`);
  const word = pool[seed % pool.length];
  return {
    ...info,
    word,
    difficulty,
    difficultyLabel: difficultyLabelFor(difficulty),
    localFallback: true,
  };
}

async function fetchPuzzleByDate(dateStr) {
  const baseUrl = resolveDailyWordUrl();
  const url = new URL(baseUrl);
  if (dateStr) url.searchParams.set("date", dateStr);
  const timeoutMs = baseUrl === DAILY_WORD_URL_LOCAL ? 1500 : 4000;
  const resp = await fetchWithTimeout(
    url.toString(),
    { cache: "no-store" },
    timeoutMs,
  );
  if (!resp.ok) throw new Error(`daily-word ${resp.status}`);
  const data = await resp.json();
  if (
    !data ||
    typeof data.word !== "string" ||
    typeof data.date !== "string" ||
    typeof data.difficulty !== "string"
  ) {
    throw new Error("daily-word payload inválido");
  }
  return {
    word: data.word.toUpperCase(),
    dia: Number(data.puzzle),
    data: new Date(`${data.date}T00:00:00-03:00`),
    dateStr: data.date,
    difficulty: data.difficulty,
    difficultyLabel: data.difficultyLabel,
  };
}

async function fetchPuzzleByOffset(offset) {
  const info = puzzleInfoPorOffset(offset);
  try {
    const puzzle = await fetchPuzzleByDate(info.dateStr);
    return {
      ...info,
      ...puzzle,
      dia: Number.isFinite(puzzle.dia) ? puzzle.dia : info.dia,
    };
  } catch (error) {
    console.warn("[glif] usando fallback local do puzzle:", error);
    return buildLocalPuzzle(info);
  }
}

function applyPuzzleWord(word) {
  WORD = word;
  WL = WORD.split("");
  WN = WL.length;
  Object.keys(colorOf).forEach((k) => delete colorOf[k]);
  WL.forEach((l, i) => {
    if (!colorOf[l]) colorOf[l] = GLYPH_COLORS[i % GLYPH_COLORS.length];
  });
}

function setPuzzleReady(ready) {
  PUZZLE_READY = ready;
  const decodeBtn = document.querySelector(".dbtn");
  if (decodeBtn) decodeBtn.disabled = !ready;
}

function applyPuzzleInfo(info) {
  CURRENT_PUZZLE = info;
  applyPuzzleWord(info.word);
  setPuzzleReady(true);
}

function showPuzzleLoadError(message) {
  setPuzzleReady(false);
  const daily = document.getElementById("daily-stack");
  const yours = document.getElementById("your-stack");
  const meta = document.getElementById("header-meta");
  if (meta) meta.textContent = "Falha ao carregar o puzzle";
  if (daily) {
    daily.innerHTML =
      '<div style="padding:1.25rem;text-align:center;color:var(--text3)">Não foi possível carregar o glifo de hoje.</div>';
  }
  if (yours) yours.innerHTML = "";
  setFb(message, "err");
}

// Validação multi-tamanho: aceita palavras do banco atual + dicionário 5L
function dicionarioValido(word) {
  // DICIONARIO cobre 4L–7L (~38.6k entradas — léxico fserb/pt-br + Chat A)
  if (DICIONARIO.has(word)) return true;
  // Fallback: qualquer palavra do banco de jogo também é válida
  return (
    PALAVRAS.facil.includes(word) ||
    PALAVRAS.medio.includes(word) ||
    PALAVRAS.dificil.includes(word) ||
    PALAVRAS.muito_dificil.includes(word)
  );
}

function guessEspecialValido(word) {
  const EE_GAME_NAMES = { GLIF: 4, GLIFO: 5, GLIFFO: 6 };
  if (word in EE_GAME_NAMES && EE_GAME_NAMES[word] === WN) return true;
  if (word === "DRONE") return true;
  return ["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"].includes(word);
}

let CURRENT_PUZZLE = null;
let PUZZLE_READY = false;
let WORD = "";
let WL = [],
  WN = 0;
const GLYPH_COLORS = [
  "#f5a623",
  "#9b8fe8",
  "#e87a6b",
  "#5bbfa0",
  "#6baee8",
  "#e8b45b",
  "#a0c878",
];
const colorOf = {}; // mutado ao trocar de puzzle

let G = {
  typed: [],
  cursor: 0,
  attempts: [],
  decoded: new Set(),
  found: new Set(),
  keyUsed: false,
  keyPos: new Set(),
  done: false,
  won: false,
  selKey: null,
  _flipping: false,
  _flipGen: 0,
};

// ─── Modo Arquivo ───────────────────────────────
let ARQUIVO_MODO = false;
let ARQUIVO_PUZZLENUM = null;
let ARQUIVO_DATA = null;

// ─── Modo Prática ────────────────────────────────
let PRATICA_MODO = false;

// ─── Animações UI ────────────────────────────────
let _kbStaggered = false; // stagger do teclado só na primeira build
let _kbDelegate = false; // event delegation configurada uma vez

function glyphStroke() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--glyph")
      .trim() || "#f0ebe4"
  );
}

// ═══════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════
function renderDaily(revealedIndices) {
  const c = document.getElementById("daily-stack");
  const s = glyphStroke();

  if (!HARD_MODE && revealedIndices && revealedIndices.length > 0) {
    // Animação já foi disparada em sincronia com o flip — apenas reconstrói o stack
    c.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      if (G.decoded.has(i) || G.keyPos.has(i)) continue;
      const l = WL[i];
      const color = G.found.has(l) ? colorOf[l] : s;
      const svg = makeSVG(
        l,
        color,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) {
        svg.setAttribute("data-idx", i);
        c.appendChild(svg);
      }
    }
  } else {
    c.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      // Em Hard Mode: mostra todas as camadas, inclusive as já decodificadas
      if (!HARD_MODE && (G.decoded.has(i) || G.keyPos.has(i))) continue;
      const l = WL[i];
      const color = G.found.has(l) ? colorOf[l] : s;
      const svg = makeSVG(
        l,
        color,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) {
        svg.setAttribute("data-idx", i);
        c.appendChild(svg);
      }
    }
  }
}

function renderYours() {
  const c = document.getElementById("your-stack");
  c.innerHTML = "";
  const s = glyphStroke();

  // Só renderiza letras que o usuário digitou nesta tentativa
  // (ignora posições auto-preenchidas por decoded/keyPos)
  for (let i = G.typed.length - 1; i >= 0; i--) {
    if (G.decoded.has(i) || G.keyPos.has(i)) continue;
    const l = G.typed[i];
    if (!l) continue;
    // Sem dica de cor: só mostra cor quando a letra estiver na posição correta (decoded)
    const svg = makeSVG(
      l,
      s,
      "position:absolute;top:0;left:0;width:100%;height:100%;",
    );
    if (svg) {
      svg.setAttribute("data-idx", i);
      c.appendChild(svg);
    }
  }
}

function buildAtts() {
  const row = document.getElementById("atts-row");
  const cls = (i) =>
    "adot" +
    (i < G.attempts.length
      ? " used"
      : !G.done && i === G.attempts.length
        ? " cur"
        : "");
  const existing = row.querySelectorAll(".adot");
  if (existing.length === 4) {
    existing.forEach((d, i) => {
      d.className = cls(i);
    });
    return;
  }
  // Primeira montagem
  const lbl = row.querySelector(".att-label");
  row.innerHTML = "";
  if (lbl) row.appendChild(lbl);
  for (let i = 0; i < 4; i++) {
    const d = document.createElement("div");
    d.className = cls(i);
    row.appendChild(d);
  }
}

function buildBoxes(popIdx = -1) {
  const c = document.getElementById("lboxes");
  c.innerHTML = "";
  // Ajusta tamanho dos slots conforme número de letras
  const maxW = WN <= 4 ? 82 : WN === 5 ? 76 : WN === 6 ? 64 : 54;
  const rad = WN <= 5 ? 11 : WN === 6 ? 9 : 7;
  document.documentElement.style.setProperty("--lbox-max", maxW + "px");
  document.documentElement.style.setProperty("--lbox-rad", rad + "px");
  const s = glyphStroke();
  for (let i = 0; i < WN; i++) {
    const b = document.createElement("div");
    b.className = "lbox";
    const isDecoded = G.decoded.has(i) || G.keyPos.has(i);
    if (isDecoded) {
      b.classList.add("decoded");
      if (HARD_MODE) {
        b.style.background = "var(--surface2)";
      } else {
        b.style.background = colorOf[WL[i]];
      }
      if (G.keyPos.has(i) && !G.decoded.has(i)) b.classList.add("kused");
      const svg = makeSVG(WL[i], HARD_MODE ? s : "#fff");
      if (svg) {
        svg.style.cssText =
          "width:65%;height:65%;" + (HARD_MODE ? "opacity:0.55;" : "");
        svg.setAttribute("aria-hidden", "true");
        b.appendChild(svg);
      }
      const status =
        G.keyPos.has(i) && !G.decoded.has(i)
          ? "revelada pela chave"
          : "confirmada";
      b.setAttribute(
        "aria-label",
        `Posição ${i + 1} — letra ${WL[i]}, ${status}`,
      );
    } else if (G.typed[i]) {
      const svg = makeSVG(G.typed[i], s);
      if (svg) {
        svg.style.cssText = "width:65%;height:65%;";
        svg.setAttribute("aria-hidden", "true");
        b.appendChild(svg);
      }
      if (i === G.cursor && !G.done) b.classList.add("active");
      b.style.cursor = "pointer";
      b.setAttribute("aria-label", `Posição ${i + 1} — letra ${G.typed[i]}`);
      b.onclick = (() => {
        const idx = i;
        return () => {
          if (!G.done) moveCursor(idx);
        };
      })();
    } else {
      if (!G.decoded.has(i) && !G.keyPos.has(i) && i === G.cursor && !G.done)
        b.classList.add("active");
      if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.done) {
        b.style.cursor = "text";
        b.onclick = (() => {
          const idx = i;
          return () => moveCursor(idx);
        })();
      }
      b.setAttribute("aria-label", `Posição ${i + 1} — vazia`);
    }
    c.appendChild(b);
    if (i === popIdx) {
      b.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.12)", offset: 0.35 },
          { transform: "scale(0.94)", offset: 0.7 },
          { transform: "scale(1)" },
        ],
        { duration: 180, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" },
      );
    }
  }
}

function moveCursor(idx) {
  if (G.done) return;
  G.cursor = idx;
  refresh();
}

function buildKB() {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⌫", "Z", "X", "C", "V", "B", "N", "M", "↵"],
  ];
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = "krow";
    r.forEach((k) => {
      const b = document.createElement("button");
      b.className = "kbtn" + (k.length > 1 ? " wide" : "");
      b.textContent = k;
      const kLabel =
        k === "⌫" ? "Apagar" : k === "↵" ? "Confirmar" : `Letra ${k}`;
      b.setAttribute("aria-label", kLabel);
      b.dataset.key = k;
      row.appendChild(b);
    });
    kb.appendChild(row);
  });
  // Event delegation — configura uma vez; sobrevive ao kb.innerHTML rebuild
  if (!_kbDelegate) {
    _kbDelegate = true;
    kb.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-key]");
      if (!btn || btn.disabled) return;
      btn.classList.remove("tap");
      btn.getBoundingClientRect();
      btn.classList.add("tap");
      handleKey(btn.dataset.key);
    });
  }
  // Stagger de entrada — só na primeira renderização (carregamento inicial)
  if (!_kbStaggered && typeof anime !== "undefined") {
    _kbStaggered = true;
    const btns = kb.querySelectorAll(".kbtn");
    btns.forEach((b) => {
      b.style.opacity = "0";
    });
    anime({
      targets: btns,
      opacity: [0, 1],
      translateY: [10, 0],
      scale: [0.82, 1],
      duration: 280,
      delay: anime.stagger(18),
      easing: "easeOutBack",
    });
  }
  // Atualiza --kb-h para padding-bottom correto no mobile
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--kb-h",
      kb.offsetHeight + "px",
    );
  });
}

function _makeHrow(a, animate) {
  const row = document.createElement("div");
  row.className = "hrow" + (animate ? " hrow-new" : "");
  const wc = document.createElement("div");
  wc.className = "hw";
  wc.textContent = a.word;
  const dc = document.createElement("div");
  dc.className = "dcell";
  a.decoded.forEach((p) => {
    const d = document.createElement("div");
    d.className = "hdot";
    d.style.background = HARD_MODE ? "var(--text-muted)" : colorOf[WL[p]];
    dc.appendChild(d);
  });
  const fc = document.createElement("div");
  fc.className = "dcell";
  a.found.forEach((l) => {
    const d = document.createElement("div");
    d.className = "hdot";
    d.style.background = HARD_MODE ? "var(--text-muted)" : colorOf[l];
    fc.appendChild(d);
  });
  row.appendChild(wc);
  row.appendChild(dc);
  row.appendChild(fc);
  return row;
}

function buildHistory(skipLast = false) {
  if (!G.attempts.length) return;
  document.getElementById("history").style.display = "block";
  const rows = document.getElementById("hrows");
  rows.innerHTML = "";
  const atts = skipLast ? G.attempts.slice(0, -1) : G.attempts;
  [...atts].reverse().forEach((a) => {
    rows.appendChild(_makeHrow(a, false));
  });
}

function prependHistoryRow(attempt) {
  const histEl = document.getElementById("history");
  const rows = document.getElementById("hrows");
  histEl.style.display = "block";
  const row = _makeHrow(attempt, true);
  rows.insertBefore(row, rows.firstChild);
  setTimeout(() => row.classList.remove("hrow-new"), 950);
}

function refresh(popIdx = -1) {
  buildBoxes(popIdx);
  renderDaily();
  renderYours();
}

// ═══════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════
function nextCursor(from) {
  // Procura próximo slot vazio a partir de `from` (sem wrap)
  for (let i = from; i < WN; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.typed[i]) return i;
  }
  // Wrap: volta do início procurando vazio
  for (let i = 0; i < from; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i) && !G.typed[i]) return i;
  }
  // Todos preenchidos — fica no slot atual (from - 1, ou seja, o que acabou de ser digitado)
  const last = from - 1;
  if (last >= 0 && !G.decoded.has(last) && !G.keyPos.has(last)) return last;
  // fallback: primeiro editável
  for (let i = 0; i < WN; i++) {
    if (!G.decoded.has(i) && !G.keyPos.has(i)) return i;
  }
  return WN;
}
function prevCursor(from) {
  // Recua cursor para posição editável anterior
  let c = from - 1;
  while (c >= 0 && (G.decoded.has(c) || G.keyPos.has(c))) c--;
  return c;
}

function handleKey(k) {
  if (!PUZZLE_READY) return;
  if (G.done || G._flipping) return;

  if (k === "⌫") {
    let apagou = false;
    let c = G.cursor;
    if (
      c >= 0 &&
      c < WN &&
      G.typed[c] &&
      !G.decoded.has(c) &&
      !G.keyPos.has(c)
    ) {
      // Slot preenchido → só apaga, cursor fica aqui
      G.typed[c] = undefined;
      apagou = true;
    } else {
      // Slot vazio → recua cursor para o anterior editável (pula decoded/keyPos)
      let prev = c - 1;
      while (prev >= 0 && (G.decoded.has(prev) || G.keyPos.has(prev))) prev--;
      if (prev >= 0) {
        G.cursor = prev;
        if (G.typed[prev]) {
          G.typed[prev] = undefined;
          apagou = true;
        }
      }
    }
    document.getElementById("lboxes").classList.remove("invalid");
    refresh();
    if (apagou) calcWarns();
    else setFb("", "");
    return;
  }

  if (k === "↵") {
    decode();
    return;
  }

  // Letra: escreve na posição do cursor e avança
  let c = G.cursor;
  // Se cursor inválido (swap cancelado por tecla), vai pro próximo vazio
  if (c < 0 || c >= WN) c = nextCursor(0);
  // Pula apenas posições auto-preenchidas (decoded/keyPos), não slots com letra do usuário
  while (c < WN && (G.decoded.has(c) || G.keyPos.has(c))) c++;
  if (c >= WN) return; // sem espaço

  G.typed[c] = k;
  G.cursor = nextCursor(c + 1);
  refresh(c);
  calcWarns();
  haptic(30);
  // Bounce animation com anime.js
  const slotEl = document.getElementById("lboxes").children[c];
  if (slotEl) animateBounceLetter(slotEl);
}

function calcWarns() {
  let posErrada = [];
  if (!HARD_MODE) {
    // Apenas avisa sobre letras já tentadas na mesma posição (sem conceito de "eliminada")
    for (let i = 0; i < WN; i++) {
      const l = G.typed[i];
      if (!l || G.decoded.has(i) || G.keyPos.has(i)) continue;
      if (G.attempts.some((a) => a.word[i] === l && !a.decoded.includes(i)))
        posErrada.push({ l, i });
    }
    if (posErrada.length > 0) {
      const letras = [...new Set(posErrada.map(({ l }) => l))].join(", ");
      setFb(
        `⚠ ${letras} já ${posErrada.length > 1 ? "foram tentadas" : "foi tentada"} nessa posição`,
        "warn",
      );
    }
  }

  // Validação quando todos os campos preenchidos
  const full = Array.from({ length: WN }, (_, i) =>
    G.decoded.has(i) || G.keyPos.has(i) ? WL[i] : G.typed[i] || null,
  );
  if (full.every((x) => x)) {
    const guess = full.join("");
    if (!dicionarioValido(guess) && !guessEspecialValido(guess)) {
      setFb("Palavra não encontrada no dicionário.", "err");
      document.getElementById("lboxes").classList.add("invalid");
    } else {
      document.getElementById("lboxes").classList.remove("invalid");
      if (posErrada.length === 0) setFb("", "");
    }
  } else {
    document.getElementById("lboxes").classList.remove("invalid");
    if (posErrada.length === 0) setFb("", "");
  }
}

// Escapa caracteres HTML especiais para uso seguro em innerHTML
function _htmlEsc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

function haptic(pattern) {
  try {
    navigator.vibrate && navigator.vibrate(pattern);
  } catch (e) {
    if (window._dbg) console.warn("[glif] haptic", e);
  }
}

// ═══════════════════════════════════════════════
// DECODE

// ═══════════════════════════════════════════════
// ANIME.JS MICRO-INTERACTIONS (Chat O)
// ═══════════════════════════════════════════════

// Flip reveal com rotateY — visual mais impactante que scaleY
// Shake da linha com anime.js — para palavra inválida
function animateShakeRow() {
  if (typeof anime === "undefined") return;
  const lboxes = document.getElementById("lboxes");
  if (!lboxes) return;
  anime({
    targets: lboxes,
    translateX: [-8, 8, -8, 8, 0],
    duration: 280,
    easing: "easeInOutQuad",
  });
}

// Bounce ao digitar letra
function animateBounceLetter(slotEl) {
  if (typeof anime === "undefined") return;
  anime({
    targets: slotEl,
    scale: [1, 1.12, 0.98, 1.05, 1],
    duration: 240,
    easing: "easeOutElastic(1, 0.6)",
  });
}

// ═══════════════════════════════════════════════
function decode() {
  if (!PUZZLE_READY) {
    setFb("Aguarde o puzzle carregar.", "err");
    return;
  }
  if (G.done) return;
  if (!AUDIO_MUTED) _getAC(); // aquece o contexto antes dos flips
  const full = Array.from({ length: WN }, (_, i) =>
    G.decoded.has(i) || G.keyPos.has(i) ? WL[i] : G.typed[i] || null,
  );
  if (full.some((x) => !x)) {
    setFb("Complete todas as letras antes de decodificar.", "err");
    haptic(80);
    animateShakeRow();
    return;
  }
  const guess = full.join("");
  // Easter egg: digitar o nome do jogo (adaptado ao tamanho da palavra)
  const EE_GAME_NAMES = { GLIF: 4, GLIFO: 5, GLIFFO: 6 };
  const EE_GAME_MSGS = {
    GLIF: "Isso não é uma palavra… mas tem estilo. 🐊",
    GLIFO: "Quase o nome do jogo. Muito criativo. 🐊",
    GLIFFO: "Isso não é uma palavra... mas aprecio a autoestima. 🐊",
  };
  if (guess in EE_GAME_NAMES && EE_GAME_NAMES[guess] === WN) {
    queueAch("ee_gliffo");
    setFb(EE_GAME_MSGS[guess], "err");
    haptic(80);
    return;
  }
  // Easter egg rádio: digitar DRONE abre Drone Zone tocando
  if (guess === "DRONE" && typeof mfpShow === "function") {
    queueAch("ee_drone");
    const bar = document.getElementById("mfp-bar");
    const isOpen = bar && !bar.hasAttribute("hidden");
    if (!isOpen) {
      window._mfpEEChannel && window._mfpEEChannel(0, true);
      mfpShow();
      showEEToast("📡 Drone Zone ativado... sintonizando o cosmos.");
    } else {
      showEEToast("📡 Já tá no ar!");
    }
  }
  // Easter egg espacial: NAVE/MARTE/ASTRO/OVNI/LASER
  // — só 1 palavra nova conta por jogo (dia)
  // — jogo abre apenas ao completar as 5 (desbloqueio permanente)
  const EE_INV_WORDS = ["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"];
  if (EE_INV_WORDS.includes(guess)) {
    const SEEN_KEY = "gliffoo_ee_inv_seen";
    const UNLOCK_KEY = "gliffoo_ee_invaders_unlocked";
    const TODAY_KEY = "gliffoo_ee_inv_today";
    // Se já desbloqueou as 5: abre sempre
    if (localStorage.getItem(UNLOCK_KEY)) {
      queueAch("ee_invaders");
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(0, true);
        mfpShow();
      }
      openInvadersGame();
      showEEToast("👾 Invasão espacial!");
    } else {
      let seen;
      try {
        seen = new Set(JSON.parse(localStorage.getItem(SEEN_KEY)) || []);
      } catch {
        seen = new Set();
      }
      const today = new Date().toISOString().slice(0, 10);
      const alreadyCollected = seen.has(guess);
      const usedToday = localStorage.getItem(TODAY_KEY) === today;
      if (!alreadyCollected && !usedToday) {
        seen.add(guess);
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
        localStorage.setItem(TODAY_KEY, today);
        if (seen.size === EE_INV_WORDS.length) {
          localStorage.setItem(UNLOCK_KEY, "1");
          queueAch("ee_invaders");
          if (typeof mfpShow === "function") {
            window._mfpEEChannel && window._mfpEEChannel(0, true);
            mfpShow();
          }
          openInvadersGame();
          showEEToast(
            "🏆 Todas as 5 palavras encontradas! Bem-vindo, Comandante! 👾",
          );
        } else {
          const remaining = EE_INV_WORDS.length - seen.size;
          showEEToast(
            "📡 " +
              seen.size +
              "/5 palavras espaciais... faltam " +
              remaining +
              "!",
          );
        }
      }
    }
  }
  // Validação de dicionário
  if (!dicionarioValido(guess)) {
    setFb("Palavra não encontrada no dicionário.", "err");
    haptic(80);
    document.getElementById("lboxes").classList.add("invalid");
    animateShakeRow();
    return;
  }
  document.getElementById("lboxes").classList.remove("invalid");
  const dec = [],
    fnd = [],
    fndPos = [];

  // Two-pass para tratar duplicatas corretamente (igual ao Wordle)
  // 1ª passagem: posições exatas
  const estoque = [...WL]; // cópia mutável para controlar consumo
  full.forEach((l, i) => {
    if (l === WL[i]) {
      dec.push(i);
      estoque[i] = null; // consumido
    }
  });
  // 2ª passagem: letras existentes mas fora do lugar
  full.forEach((l, i) => {
    if (dec.includes(i)) return; // já acertou posição
    const idx = estoque.indexOf(l);
    if (idx !== -1) {
      fnd.push(l);
      fndPos.push(i); // posição correta para share
      estoque[idx] = null; // consumido — não pode ser usado de novo
    }
  });
  // Resultado por posição para a animação de flip
  const posResult = new Array(WN).fill("miss");
  const estoque2 = [...WL];
  full.forEach((l, i) => {
    if (l === WL[i]) {
      posResult[i] = "correct";
      estoque2[i] = null;
    }
  });
  full.forEach((l, i) => {
    if (posResult[i] === "correct") return;
    const idx = estoque2.indexOf(l);
    if (idx !== -1) {
      posResult[i] = "found";
      estoque2[idx] = null;
    }
  });

  // Mostrar histórico existente antes de iniciar o flip
  if (G.attempts.length) buildHistory();

  // Flip reveal — cada slot gira individualmente esquerda→direita
  const FLIP_MS = 380,
    STAGGER_MS = 120;
  G._flipping = true;
  // Remove cursor indicator during flip animation
  document
    .querySelectorAll("#lboxes .lbox.active")
    .forEach((el) => el.classList.remove("active"));
  const flipGen = ++G._flipGen;
  const flipSlots = document.getElementById("lboxes").children;
  const stroke = glyphStroke();
  // Pré-calcula os tempos absolutos do Web Audio para cada tick
  // (sample-accurate, sem depender de quando o callback JS executa)
  const acNow = !AUDIO_MUTED ? _getAC().currentTime : 0;
  for (let i = 0; i < WN; i++) {
    if (G.decoded.has(i) || G.keyPos.has(i)) continue;
    const slot = flipSlots[i];
    const res = posResult[i];
    const delay = i * STAGGER_MS;
    ((slot, i, res) => {
      setTimeout(() => {
        slot.style.willChange = "transform";
        slot.style.transition = `transform ${FLIP_MS / 2}ms ease-in`;
        slot.style.transform = "scaleY(0)";
        // Fade-out da camada correspondente em "Seu Glifo" em sincronia com o flip
        const ys = document.getElementById("your-stack");
        const ysvg = ys && ys.querySelector(`[data-idx="${i}"]`);
        if (ysvg) {
          ysvg.style.transition = `opacity ${FLIP_MS / 2}ms ease-in`;
          ysvg.style.opacity = "0";
        }
        setTimeout(() => {
          slot.innerHTML = "";
          if (res === "correct") {
            slot.style.background = colorOf[WL[i]];
            slot.style.borderColor = "transparent";
            const svg = makeSVG(WL[i], "#fff");
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;";
              slot.appendChild(svg);
            }
            // Anima camada do Glifo do Dia em sincronia com o tile correto
            if (!HARD_MODE) {
              const dc = document.getElementById("daily-stack");
              const dsv = dc && dc.querySelector(`[data-idx="${i}"]`);
              if (dsv) {
                void dsv.offsetWidth;
                dsv.style.transition =
                  "opacity 0.55s ease-out, transform 0.55s ease-out";
                dsv.style.opacity = "0";
                dsv.style.transform = "scale(1.3) translateY(-12px)";
              }
            }
          } else if (res === "found") {
            // Sem dica de cor — mesma aparência que "miss"
            slot.style.background = "var(--surface2)";
            slot.style.borderColor = "var(--border2)";
            const svg = makeSVG(full[i], stroke);
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;opacity:0.5;";
              slot.appendChild(svg);
            }
          } else {
            // Letra errada — slot neutro sem conceito de "eliminação"
            slot.style.background = "var(--surface2)";
            slot.style.borderColor = "var(--border2)";
            const svg = makeSVG(full[i], stroke);
            if (svg) {
              svg.style.cssText = "width:65%;height:65%;opacity:0.5;";
              slot.appendChild(svg);
            }
          }
          slot.style.transition = `transform ${FLIP_MS / 2}ms ease-out`;
          slot.style.transform = "scaleY(1)";
          eePlayFlipTick(res, acNow + (delay + FLIP_MS / 2) / 1000);
          // Pop suave nos slots corretos via CSS keyframe (sem anime.js para evitar conflito)
          if (res === "correct") {
            setTimeout(
              () => {
                slot.style.transition = "";
                slot.style.transform = "";
                slot.style.willChange = "";
                void slot.offsetWidth; // força reflow limpo
                slot.classList.add("flip-correct-pop");
                slot.addEventListener(
                  "animationend",
                  () => slot.classList.remove("flip-correct-pop"),
                  { once: true },
                );
              },
              FLIP_MS / 2 + 30,
            );
          } else {
            setTimeout(
              () => {
                slot.style.willChange = "";
              },
              FLIP_MS / 2 + 50,
            );
          }
        }, FLIP_MS / 2);
      }, delay);
    })(slot, i, res);
  }

  // Após todos os flips: aplica estado e reconstrói UI
  const totalFlip = (WN - 1) * STAGGER_MS + FLIP_MS + 420;
  setTimeout(() => {
    if (G._flipGen !== flipGen) return; // jogo foi resetado durante animação
    G._flipping = false;
    dec.forEach((p) => G.decoded.add(p));
    fnd.forEach((l) => G.found.add(l));
    G.attempts.push({
      word: guess,
      decoded: dec,
      found: fnd,
      foundPos: fndPos,
    });

    if (G.decoded.size === WN) {
      G.done = G.won = true;
      G.typed = WL.slice();
      buildBoxes();
      renderDaily(); // sem arg: evita timer de 620ms que sobrescreveria iso
      renderYours();
      buildHistory(true); // skip last — prependHistoryRow adiciona com animação
      prependHistoryRow(G.attempts[G.attempts.length - 1]);
      buildAtts();
      buildKB();
      salvarEstado();
      haptic([80, 60, 150]);
      eePlayFanfare();
      // Stagger pop nos slots antes do overlay aparecer
      if (typeof anime !== "undefined") {
        anime({
          targets: document.querySelectorAll("#lboxes .lbox"),
          keyframes: [
            { scale: 1 },
            { scale: 1.16 },
            { scale: 0.94 },
            { scale: 1 },
          ],
          duration: 360,
          delay: anime.stagger(55),
          easing: "easeOutElastic(1, 0.5)",
        });
      }
      setTimeout(() => winAnim(), 380);
      setTimeout(() => eeThematicWord(), 500);
      setTimeout(() => eePalindromeReveal(), 1800);
      // Easter egg: vitória com música tocando
      (function () {
        const bar = document.getElementById("mfp-bar");
        const audio = bar && window._mfpAudio ? window._mfpAudio : null;
        const isPlaying =
          bar &&
          !bar.hasAttribute("hidden") &&
          bar.classList.contains("show") &&
          typeof mfpTogglePlay === "function" &&
          window._mfpIsPlaying &&
          window._mfpIsPlaying();
        if (isPlaying) {
          queueAch("ee_trilha");
          setTimeout(
            () => showEEToast("🌟 Vitória com trilha sonora! 🎶"),
            2200,
          );
        }
      })();
      // Easter egg: insomniac — vitória entre 02:00 e 03:59 (horário SP)
      (function () {
        const spHour = parseInt(
          new Date().toLocaleString("en-US", {
            timeZone: "America/Sao_Paulo",
            hour: "numeric",
            hour12: false,
          }),
          10,
        );
        if (spHour >= 2 && spHour < 4) {
          queueAch("ee_insomniac");
          setTimeout(() => {
            setFb("Ainda acordado às " + spHour + "h? 🌙 Vai dormir!", "ok");
            setTimeout(() => setFb("", ""), 5000);
          }, 2600);
        }
      })();
      return;
    }
    if (G.attempts.length >= 4) {
      G.done = true;
      G.typed = [];
      G.cursor = nextCursor(0);
      buildBoxes();
      renderDaily(dec);
      renderYours();
      buildHistory();
      buildAtts();
      salvarEstado();
      haptic([150, 50, 150]);
      eePlayTrombone();
      setTimeout(() => loseMod(), 400);
      return;
    }

    salvarEstado();
    G.typed = [];
    G.cursor = nextCursor(0);
    G.keyUsed = false;
    setFb("", "");
    G.selKey = null;
    document.getElementById("key-dot").classList.add("show");
    document.getElementById("lboxes").classList.remove("invalid");
    let i2 = 0;
    while (i2 < WN && (G.decoded.has(i2) || G.keyPos.has(i2))) {
      G.typed.push(WL[i2]);
      i2++;
    }
    buildBoxes();
    // Animação de entrada apenas nos slots decoded de RODADAS ANTERIORES
    // (os de dec acabaram de flipar — não precisam de animação extra)
    const newSlots = document.getElementById("lboxes").children;
    for (let i = 0; i < WN; i++) {
      const s = newSlots[i];
      if (s && s.classList.contains("decoded") && !dec.includes(i)) {
        setTimeout(() => {
          s.classList.add("decoded-enter");
          setTimeout(() => s.classList.remove("decoded-enter"), 250);
        }, i * 50);
      }
    }
    renderDaily(dec);
    renderYours();
    prependHistoryRow(G.attempts[G.attempts.length - 1]);
    buildAtts();
    buildKB();
  }, totalFlip);
}

function setFb(msg, type) {
  const el = document.getElementById("fbmsg");
  el.textContent = msg;
  el.className = "fbmsg " + (type || "");
}

// ═══════════════════════════════════════════════
// DECODER KEY
// ═══════════════════════════════════════════════
function openKeyModal() {
  if (G.done) return;
  if (G.keyUsed) {
    setFb("Já usou a chave nesta tentativa.", "err");
    return;
  }
  G.selKey = null;
  document.getElementById("kuse-btn").disabled = true;
  const boxes = document.getElementById("kboxes");
  boxes.innerHTML = "";
  for (let i = 0; i < WN; i++) {
    const b = document.createElement("div");
    const used = G.decoded.has(i) || G.keyPos.has(i);
    b.className = "kbox" + (used ? " used" : "");
    if (used) {
      b.style.background = colorOf[WL[i]];
      const svg = makeSVG(WL[i], "#fff");
      if (svg) {
        svg.style.cssText = "width:58%;height:58%;";
        b.appendChild(svg);
      }
    } else {
      b.textContent = "?";
      b.setAttribute("tabindex", "0");
      b.setAttribute("role", "button");
      b.setAttribute("aria-label", `Revelar posição ${i + 1}`);
      const activate = () => {
        document
          .querySelectorAll(".kbox")
          .forEach((x) => x.classList.remove("sel"));
        b.classList.add("sel");
        G.selKey = i;
        document.getElementById("kuse-btn").disabled = false;
      };
      b.onclick = activate;
      b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(); } };
    }
    boxes.appendChild(b);
  }
  openM("key-modal");
  requestAnimationFrame(() => {
    const firstFree = boxes.querySelector(".kbox:not(.used)");
    if (firstFree) firstFree.focus();
  });
}

function useKey() {
  if (G.selKey === null) return;
  const pos = G.selKey,
    letter = WL[pos];
  G.keyPos.add(pos);
  G.keyUsed = true;
  document.getElementById("key-dot").classList.remove("show");
  G.typed = [];
  G.cursor = nextCursor(0);
  let i = 0;
  while (i < WN && (G.decoded.has(i) || G.keyPos.has(i))) {
    G.typed.push(WL[i]);
    i++;
  }
  closeM("key-modal");
  setFb(`🔑 "${letter}" revelado na posição ${pos + 1}`, "key");
  buildBoxes();
  renderDaily([pos]);
  renderYours();
}

function handleOverlayClick(e, id) {
  if (e.target === e.currentTarget) closeM(id);
}

function handleOverlayKeydown(e, id) {
  if (e.key === "Escape") {
    e.preventDefault();
    closeM(id);
  }
}

// Focus-trap helpers for modals
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let _modalTrapHandler = null;
let _modalPrevFocus = null;
function _installTrap(modal) {
  _modalPrevFocus = document.activeElement;
  const getFocusable = () => Array.from(modal.querySelectorAll(FOCUSABLE));
  // Focus first focusable element
  const first = getFocusable()[0];
  if (first) first.focus();
  _modalTrapHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      const overlay = modal.closest(".moverlay") || modal;
      if (overlay.id) closeM(overlay.id);
      return;
    }
    if (e.key !== "Tab") return;
    const els = getFocusable();
    if (!els.length) return;
    const fi = els[0],
      la = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === fi) {
        e.preventDefault();
        la.focus();
      }
    } else {
      if (document.activeElement === la) {
        e.preventDefault();
        fi.focus();
      }
    }
  };
  modal.addEventListener("keydown", _modalTrapHandler);
}
function _removeTrap(modal) {
  if (_modalTrapHandler) {
    modal.removeEventListener("keydown", _modalTrapHandler);
    _modalTrapHandler = null;
  }
  if (_modalPrevFocus && typeof _modalPrevFocus.focus === "function") {
    _modalPrevFocus.focus();
    _modalPrevFocus = null;
  }
}

function closeM(id) {
  const el = document.getElementById(id);
  el.classList.remove("show");
  el.setAttribute("aria-hidden", "true");
  _removeTrap(el.querySelector(".modal") || el);
}
function openM(id) {
  const el = document.getElementById(id);
  el.classList.add("show");
  el.setAttribute("aria-hidden", "false");
  _installTrap(el.querySelector(".modal") || el);
}

// ═══════════════════════════════════════════════
// WIN ANIMATION
// ═══════════════════════════════════════════════
let _winOverlay = null; // singleton — garante cleanup entre testes
let WIN_FINALE = "C"; // variações do finale: current | A | B | C | D | E
function winAnim() {
  // Remove overlay anterior se existir (retest no debug)
  if (_winOverlay) {
    _winOverlay.remove();
    _winOverlay = null;
  }
  const yc = document.getElementById("your-stack");

  // Cria overlay fixo sobre o jogo (igual ao tutorial)
  const overlay = document.createElement("div");
  _winOverlay = overlay;
  overlay.style.cssText = `
          position:fixed; inset:0; z-index:800;
          display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0); transition:background 0.35s ease;
          pointer-events:none;
        `;

  const stage = document.createElement("div");
  stage.style.cssText = `
          width:min(55vw,55vh,320px); aspect-ratio:1;
          perspective:600px; perspective-origin:50% 40%;
        `;
  const stack = document.createElement("div");
  stack.style.cssText = `
          position:relative; width:100%; height:100%;
          transform-style:preserve-3d;
        `;
  stage.appendChild(stack);
  overlay.appendChild(stage);
  document.body.appendChild(overlay);
  // Fade para fundo semi-opaco — dois rAFs garantem que o browser
  // pintou o estado inicial (transparent) antes de transicionar
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      overlay.style.background = "rgba(0,0,0,0.72)";
    }),
  );

  const Z_STEP = 32;
  const half = ((WN - 1) * Z_STEP) / 2;
  const ISO_IN = 650;
  const ISO_HOLD = 250; // pausa no pico — reduzido
  const ISO_OUT = 450; // colapso — mais rápido
  const STAGGER = 300; // stagger entre layers — mais rápido
  let isoTimer = null;
  let idx = WN - 1; // começa da última letra (camada de baixo) → sobe até a primeira

  function addLayer() {
    const zVal = half - idx * Z_STEP;
    const layer = document.createElement("div");
    layer.className = "iso-layer";
    layer.style.setProperty("--iso-z", zVal + "px");
    layer.style.zIndex = WN - idx;
    layer.style.opacity = "0";
    layer.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    layer.style.transition = "none";
    const svg = makeSVG(WL[idx], colorOf[WL[idx]]);
    if (svg) {
      svg.style.cssText = "width:90%;height:90%;";
      layer.appendChild(svg);
    }
    stack.appendChild(layer);

    // Double-rAF idêntico ao runIso
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        layer.style.transition = `transform ${ISO_IN}ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease`;
        layer.style.transform = `translateZ(${zVal}px) rotateX(45deg) rotateZ(-30deg)`;
        layer.style.opacity = "1";
      }),
    );

    idx--;
    if (idx >= 0) {
      isoTimer = setTimeout(addLayer, STAGGER);
    } else {
      // Confetti no pico — quando todas as layers chegaram
      setTimeout(eeCanvasConfetti, ISO_IN + 60);
      // Todas as layers → pausa → colapsa
      isoTimer = setTimeout(() => {
        const layers = [...stack.querySelectorAll(".iso-layer")];
        _doWinFinale(stage, stack, layers, overlay, yc, ISO_OUT);
      }, ISO_IN + ISO_HOLD);
    }
  }
  // Variação C: pula o ISO inteiro, vai direto para o finale
  if (WIN_FINALE === "C") {
    eeCanvasConfetti();
    _doWinFinale(stage, stack, [], overlay, yc, ISO_OUT);
  } else {
    addLayer();
  }
}

// ─── win finale variations ───────────────────────────────────────────
function _winReveal(overlay, yc) {
  if (_winOverlay !== overlay) return; // se já foi substituído, aborta
  overlay.style.transition = "opacity 0.4s ease";
  overlay.style.opacity = "0";
  const dc = document.getElementById("daily-stack");
  if (dc) {
    dc.innerHTML = "";
    for (let i = WN - 1; i >= 0; i--) {
      const s = makeSVG(
        WL[i],
        colorOf[WL[i]],
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (s) dc.appendChild(s);
    }
    dc.classList.add("win-glow", "win-reveal");
    dc.addEventListener(
      "animationend",
      () => dc.classList.remove("win-reveal"),
      { once: true },
    );
  }
  yc.innerHTML = "";
  for (let i = WN - 1; i >= 0; i--) {
    const s = makeSVG(
      WL[i],
      colorOf[WL[i]],
      "position:absolute;top:0;left:0;width:100%;height:100%;",
    );
    if (s) yc.appendChild(s);
  }
  yc.classList.add("win-glow", "win-reveal");
  yc.addEventListener("animationend", () => yc.classList.remove("win-reveal"), {
    once: true,
  });
  setTimeout(() => {
    if (_winOverlay === overlay) {
      overlay.remove();
      _winOverlay = null;
    }
    winMod();
  }, 900);
}

function _doWinFinale(stage, stack, layers, overlay, yc, ISO_OUT) {
  if (_winOverlay !== overlay) return; // abortado
  const f = WIN_FINALE;
  // Troca SVGs para colorido e layers para pose flat
  const swapFlat = () =>
    layers.forEach((lay, li) => {
      lay.style.transition = "none";
      lay.style.opacity = "1";
      lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
      lay.innerHTML = "";
      const sv = makeSVG(WL[WN - 1 - li], colorOf[WL[WN - 1 - li]]);
      if (sv) {
        sv.style.cssText = "width:90%;height:90%;";
        lay.appendChild(sv);
      }
    });

  if (f === "A") {
    // ── A: ZOOM EXPLOSÃO ──────────────────────────────────────────────────
    // Composição inteira EXPLODE em direção à câmera (scale 20×, fade),
    // depois versão colorida nasce do centro com spring vistoso.
    stage.style.transition = "transform 550ms ease-in, opacity 450ms ease-in";
    stage.style.transform = "scale(20)";
    stage.style.opacity = "0";
    setTimeout(() => {
      swapFlat();
      stage.style.transition = "none";
      stage.style.transform = "scale(0.15)";
      stage.style.opacity = "0";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          stage.style.transition =
            "transform 680ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease";
          stage.style.transform = "scale(1)";
          stage.style.opacity = "1";
          setTimeout(() => _winReveal(overlay, yc), 700);
        }),
      );
    }, 560);
  } else if (f === "B") {
    // ── B: CASCATA ────────────────────────────────────────────────────────
    // Composição ISO some, depois cards coloridos caem do topo
    // UM A UM com stagger 180ms — claramente sequencial.
    stage.style.transition = "opacity 200ms ease-in";
    stage.style.opacity = "0";
    setTimeout(() => {
      swapFlat();
      // Posiciona todas as layers acima do viewport
      layers.forEach((lay) => {
        lay.style.transform =
          "translateZ(0px) translateY(-200px) rotateX(0deg) rotateZ(0deg)";
        lay.style.opacity = "0";
      });
      stage.style.transition = "none";
      stage.style.opacity = "1";
      // Cai da camada de cima (layers[WN-1]) para a de baixo (layers[0])
      [...layers].reverse().forEach((lay, ri) => {
        setTimeout(
          () => {
            lay.style.transition =
              "transform 440ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease";
            lay.style.transform =
              "translateZ(0px) translateY(0px) rotateX(0deg) rotateZ(0deg)";
            lay.style.opacity = "1";
          },
          60 + ri * 180,
        );
      });
      setTimeout(() => _winReveal(overlay, yc), 60 + layers.length * 180 + 480);
    }, 210);
  } else if (f === "C") {
    // ── C: RÉPLICA DO TUTORIAL ────────────────────────────────────────────
    // Começa direto com a palavra inteira (sem ISO) → stagger pop →
    // spread → billboard → converge → reset
    if (!window.anime) {
      _winReveal(overlay, yc);
      return;
    }

    // Fundo ainda transparent (ISO foi pulado) → escurece imediatamente
    overlay.style.transition = "none";
    overlay.style.background = "rgba(0,0,0,0.82)";
    // Neutraliza o stage (remove perspective ISO) e oculta o stack vazio
    stage.style.cssText =
      "width:min(55vw,55vh,320px);aspect-ratio:1;display:flex;align-items:center;justify-content:center;";
    stack.style.cssText = "display:none;";

    const stageW = stage.offsetWidth || 260;
    const N = WL.length;
    const GAP = 10;
    // Tile fixo (~70px) independente do nº de letras — letras se espalham no spread
    const TILE_SZ = Math.round(Math.min(stageW * 0.27, 80));

    // Estrutura idêntica ao tutorial: perspWrap → wordRow → wrapOuter[]
    const perspWrap = document.createElement("div");
    perspWrap.style.cssText =
      "perspective:700px;perspective-origin:50% 50%;display:flex;justify-content:center;width:100%;overflow:visible;";
    const wordRow = document.createElement("div");
    wordRow.style.cssText = `display:flex;justify-content:center;gap:${GAP}px;transform-style:preserve-3d;will-change:transform;`;
    perspWrap.appendChild(wordRow);
    stage.appendChild(perspWrap);

    // Tiles coloridos — estado inicial = vem de cima, pequenino
    const tiles = WL.map((letter) => {
      const wrapOuter = document.createElement("div");
      wrapOuter.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;display:flex;align-items:center;justify-content:center;transform-style:preserve-3d;flex-shrink:0;`;
      const sv = makeSVG(letter, colorOf[letter]);
      if (sv) {
        sv.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;`;
        wrapOuter.appendChild(sv);
      }
      wordRow.appendChild(wrapOuter);
      anime.set(wrapOuter, { opacity: 0, translateY: -14, scale: 0.65 });
      return wrapOuter;
    });
    tiles.forEach((w, i) => {
      w.style.zIndex = String(N - i);
    });

    // Entrada stagger pop — igual ao tutorial (easeOutBack)
    anime({
      targets: tiles,
      opacity: 1,
      translateY: 0,
      scale: 1,
      duration: 480,
      delay: anime.stagger(120),
      easing: "easeOutBack",
      complete: () => {
        if (_winOverlay !== overlay) return;
        const rowCenterX = wordRow.offsetWidth / 2;
        const targetTX = tiles.map(
          (el) => rowCenterX - (el.offsetLeft + el.offsetWidth / 2),
        );
        // ── FASE 1: afasta as letras
        anime({
          targets: tiles,
          translateX: (el, i) => (i - (N - 1) / 2) * 52,
          duration: 700,
          easing: "easeOutCubic",
          complete: () => {
            if (_winOverlay !== overlay) return;
            // ── FASE 2: billboard (wordRow +Y / tiles -Y simultaneamente)
            anime({
              targets: wordRow,
              rotateY: 90,
              duration: 2200,
              easing: "easeInOutQuad",
            });
            anime({
              targets: tiles,
              rotateY: -90,
              duration: 2200,
              easing: "easeInOutQuad",
              complete: () => {
                if (_winOverlay !== overlay) return;
                // ── FASE 3a: convergem ao centro
                anime({
                  targets: tiles,
                  translateX: (el, i) => targetTX[i],
                  duration: 900,
                  easing: "easeInOutQuad",
                  complete: () => {
                    if (_winOverlay !== overlay) return;
                    // ── FASE 3b: desfaz rotação
                    anime({
                      targets: wordRow,
                      rotateY: 0,
                      duration: 900,
                      easing: "easeInOutSine",
                    });
                    anime({
                      targets: tiles,
                      rotateY: 0,
                      duration: 900,
                      easing: "easeInOutSine",
                      complete: () => {
                        if (_winOverlay !== overlay) return;
                        setTimeout(() => _winReveal(overlay, yc), 200);
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  } else if (f === "D") {
    // ── D: FLASH BRANCO ───────────────────────────────────────────────────
    // Composição some rápido, tela CORTA para branco puro,
    // versão colorida materializa com spring. Arquétipo de corte de filme.
    stage.style.transition = "opacity 120ms ease-in";
    stage.style.opacity = "0";
    setTimeout(() => {
      overlay.style.transition = "background 50ms linear";
      overlay.style.background = "#ffffff";
      setTimeout(() => {
        swapFlat();
        stage.style.transform = "scale(0.4)";
        overlay.style.transition = "background 450ms ease-out";
        overlay.style.background = "rgba(0,0,0,0.82)";
        stage.style.transition =
          "transform 650ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease";
        stage.style.transform = "scale(1)";
        stage.style.opacity = "1";
        setTimeout(() => _winReveal(overlay, yc), 670);
      }, 80);
    }, 130);
  } else if (f === "E") {
    // ── E: COIN-FLIP (técnica do tutorial) ───────────────────────────────
    // Igual à animação "juntar as letras" do tutorial:
    // O glifo ISO gira rotateY até ficar de fio (90°, invisível),
    // troca para colors + flat, depois abre do outro lado com spring.
    if (!window.anime) {
      swapFlat();
      setTimeout(() => _winReveal(overlay, yc), 400);
      return;
    }
    overlay.style.perspective = "700px";
    overlay.style.perspectiveOrigin = "50% 50%";
    // Fase 1: fecha (gira até 90° = invisível)
    anime({
      targets: stage,
      rotateY: 90,
      duration: 520,
      easing: "easeInCubic",
      complete: () => {
        if (_winOverlay !== overlay) return;
        // Na virada: troca cores e achata as layers
        swapFlat();
        // Fase 2: abre do outro lado com spring
        anime({
          targets: stage,
          rotateY: 0,
          duration: 700,
          easing: "easeOutBack",
          complete: () => {
            if (_winOverlay !== overlay) return;
            setTimeout(() => _winReveal(overlay, yc), 80);
          },
        });
      },
    });
  } else {
    // ── CURRENT: implosão suave original ──────────────────────────────────
    layers.forEach((lay) => {
      lay.style.transition = `opacity 0.18s ease, transform ${ISO_OUT}ms cubic-bezier(0.22,1.2,0.36,1)`;
      lay.style.opacity = "0.06";
      lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    });
    setTimeout(() => {
      layers.forEach((lay) => {
        lay.style.transition = "opacity 0.35s ease";
        lay.style.opacity = "1";
      });
      setTimeout(() => _winReveal(overlay, yc), 100);
    }, ISO_OUT + 60);
  }
}

// ═══════════════════════════════════════════════
// PERSISTÊNCIA DIÁRIA
// ═══════════════════════════════════════════════
function dataHoje() {
  // en-CA produz YYYY-MM-DD nativamente, sem risco de timezone flip
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}

function numeroPuzzle() {
  const EPOCA = new Date("2026-03-08T00:00:00-03:00");
  const hoje = baseDateSaoPaulo();
  return Math.floor((hoje - EPOCA) / 86400000) + 1;
}

// ═══════════════════════════════════════════════
// ESTATÍSTICAS — histórico persistente
// ═══════════════════════════════════════════════
function carregarStats() {
  try {
    const raw = localStorage.getItem("gliffoo_stats");
    return raw
      ? JSON.parse(raw)
      : {
          jogados: 0,
          vitorias: 0,
          streakAtual: 0,
          streakMax: 0,
          ultimaVitoria: null,
          distribuicao: { 1: 0, 2: 0, 3: 0, 4: 0, X: 0 },
        };
  } catch (e) {
    console.warn("[glif] loadStats erro:", e);
    return {
      jogados: 0,
      vitorias: 0,
      streakAtual: 0,
      streakMax: 0,
      ultimaVitoria: null,
      distribuicao: { 1: 0, 2: 0, 3: 0, 4: 0, X: 0 },
    };
  }
}

function atualizarStats(won, tentativas) {
  // Não conta no modo arquivo nem prática
  if (ARQUIVO_MODO || PRATICA_MODO) return;
  // Só atualiza uma vez por puzzle (evita duplicar se modal reabrir)
  const jaContou = localStorage.getItem("gliffoo_stats_date");
  if (jaContou === dataHoje()) return;

  const s = carregarStats();
  const hoje = dataHoje();

  // Streak: verifica se jogou ontem
  // Deriva ontemStr a partir de dataHoje() por aritmética de string —
  // evita bugs de timezone (toISOString converte para UTC)
  const [hy, hm, hd] = dataHoje().split("-").map(Number);
  const ontemStr = new Date(Date.UTC(hy, hm - 1, hd - 1))
    .toISOString()
    .slice(0, 10);

  s.jogados++;
  if (won) {
    s.vitorias++;
    const chave = String(tentativas);
    s.distribuicao[chave] = (s.distribuicao[chave] || 0) + 1;
    // Streak
    if (s.ultimaVitoria === ontemStr) {
      s.streakAtual++;
    } else if (s.ultimaVitoria !== hoje) {
      s.streakAtual = 1;
    }
    s.streakMax = Math.max(s.streakMax, s.streakAtual);
    s.ultimaVitoria = hoje;
  } else {
    s.distribuicao["X"] = (s.distribuicao["X"] || 0) + 1;
    // Derrota sempre quebra streak (padrão Wordle)
    s.streakAtual = 0;
  }

  localStorage.setItem("gliffoo_stats", JSON.stringify(s));
  localStorage.setItem("gliffoo_stats_date", hoje);

  // Verifica conquistas após salvar stats atualizadas
  const firstAtt = G.attempts[0];
  checkAchievements({
    won,
    attempts: tentativas,
    stats: s,
    shared: false,
    guess: G.attempts.length ? G.attempts[G.attempts.length - 1].word : null,
    firstDec: firstAtt ? firstAtt.decoded.length : 0,
    firstFnd: firstAtt ? firstAtt.found.length : 0,
  });
  // Badge exclusivo para quem jogou durante o beta
  if (Date.now() < BETA_END_DATE) {
    localStorage.setItem(BETA_KEY, "true");
    queueAch("beta_tester");
  }
}

function salvarEstado() {
  if (ARQUIVO_MODO) {
    salvarEstadoArquivo();
    return;
  }
  if (PRATICA_MODO) return; // prática não persiste
  const data = {
    date: dataHoje(),
    word: WORD,
    typed: G.typed,
    attempts: G.attempts,
    decoded: [...G.decoded],
    found: [...G.found],
    keyPos: [...G.keyPos],
    done: G.done,
    won: G.won,
    keyUsed: G.keyUsed,
  };
  localStorage.setItem("gliffoo_state", JSON.stringify(data));
}

function carregarEstado() {
  try {
    const raw = localStorage.getItem("gliffoo_state");
    if (!raw) return false;
    const data = JSON.parse(raw);
    // Só restaura se for do dia certo com a mesma palavra
    if (data.date !== dataHoje() || data.word !== WORD) return false;
    G.typed = data.typed || [];
    G.attempts = data.attempts || [];
    G.decoded = new Set(data.decoded || []);
    G.found = new Set(data.found || []);
    G.keyPos = new Set(data.keyPos || []);
    G.done = data.done || false;
    G.won = data.won || false;
    G.keyUsed = data.keyUsed || false;
    return true;
  } catch (e) {
    console.warn("[glif] carregarEstado erro:", e);
    return false;
  }
}

function winMod() {
  salvarEstado();
  atualizarStats(true, G.attempts.length);
  const s = carregarStats();
  const midCard = ARQUIVO_MODO
    ? `<div class="stat-card"><div class="stat-val">📅</div><div class="stat-lbl">Arquivo #${ARQUIVO_PUZZLENUM}</div></div>`
    : PRATICA_MODO
      ? `<div class="stat-card"><div class="stat-val">🎯</div><div class="stat-lbl">Modo Prática</div></div>`
      : `<div class="stat-card"><div class="stat-val">${s.streakAtual}<span style="font-size:1rem"> 🔥</span></div><div class="stat-lbl">Sequência</div></div>`;
  document.getElementById("win-stats").innerHTML = `
    <div class="stat-card"><div class="stat-val">${G.attempts.length}<span style="font-size:1rem;color:var(--text3)">/4</span></div><div class="stat-lbl">Tentativas</div></div>
    ${midCard}
    <div class="stat-card"><div class="stat-val" style="font-size:1.2rem;letter-spacing:0.1em">${_htmlEsc(WORD)}</div><div class="stat-lbl">Palavra</div></div>`;
  buildShareGrid("win-share");
  const wCB = document.getElementById("win-countdown-block");
  const noCountdown = ARQUIVO_MODO || PRATICA_MODO;
  if (wCB) wCB.style.display = noCountdown ? "none" : "";
  if (!noCountdown) iniciarCountdown("win-countdown");
  const winDef = document.getElementById("win-def");
  if (winDef) winDef.href = `https://www.dicio.com.br/${WORD.toLowerCase()}/`;
  openM("win-modal");
}

function loseMod() {
  salvarEstado();
  atualizarStats(false, 0);
  document.getElementById("lose-word").textContent = WORD;
  const loseDef = document.getElementById("lose-def");
  if (loseDef) loseDef.href = `https://www.dicio.com.br/${WORD.toLowerCase()}/`;
  buildShareGrid("lose-share");
  const lCB = document.getElementById("lose-countdown-block");
  const noCountdownL = ARQUIVO_MODO || PRATICA_MODO;
  if (lCB) lCB.style.display = noCountdownL ? "none" : "";
  if (!noCountdownL) iniciarCountdown("lose-countdown");
  openM("lose-modal");
}

// Countdown para o próximo glifo
let _cdTimer = null;
function iniciarCountdown(elId) {
  if (_cdTimer) clearInterval(_cdTimer);
  function tick() {
    const el = document.getElementById(elId);
    if (!el) return;
    const agora = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
      }),
    );
    const amanha = new Date(agora);
    amanha.setHours(24, 0, 0, 0);
    const diff = amanha - agora;
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
  }
  tick();
  _cdTimer = setInterval(tick, 1000);
}

function buildShareGrid(id) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = "";

  const resultado = G.won ? `${G.attempts.length}/4` : "X/4";
  const s2 = carregarStats();
  const titulo = getTituloStreak(s2.streakAtual);

  const header = document.createElement("div");
  header.style.cssText =
    "font-size:0.78rem;color:var(--text2);font-weight:600;margin-bottom:2px;letter-spacing:0.04em;";
  const _n = ARQUIVO_MODO ? ARQUIVO_PUZZLENUM : numeroPuzzle();
  const _arqTag = ARQUIVO_MODO ? " (arquivo)" : "";
  header.textContent = `joguei glif.foo #${_n}${_arqTag} — ${resultado}`;
  c.appendChild(header);

  const rankLine = document.createElement("div");
  rankLine.style.cssText =
    "font-size:0.75rem;color:var(--text3);margin-bottom:8px;";
  rankLine.textContent = `${titulo.emoji} ${titulo.nome}`;
  c.appendChild(rankLine);

  G.attempts.forEach((a) => {
    const row = document.createElement("div");
    row.style.cssText =
      "font-size:1.25rem;line-height:1.5;letter-spacing:0.1em;";
    let emojis = "";
    for (let i = 0; i < WN; i++) {
      if (a.decoded.includes(i)) emojis += G.keyPos.has(i) ? "🔑" : "✅";
      else if (new Set(a.foundPos || []).has(i)) emojis += "\ud83d\udd0d";
      else emojis += "⬛";
    }
    row.textContent = emojis;
    c.appendChild(row);
  });
}

function share() {
  const n = ARQUIVO_MODO ? ARQUIVO_PUZZLENUM : numeroPuzzle();
  const arqTag = ARQUIVO_MODO ? " (arquivo)" : PRATICA_MODO ? " (prática)" : "";
  const resultado = G.won ? `${G.attempts.length}/4` : "X/4";
  const s2 = carregarStats();
  const titulo = getTituloStreak(s2.streakAtual);
  const lines = [
    `joguei glif.foo #${n}${arqTag}${HARD_MODE ? " 🔥" : ""} — ${resultado}`,
    `${titulo.emoji} ${titulo.nome}`,
    "",
  ];
  G.attempts.forEach((a) => {
    let l = "";
    for (let i = 0; i < WN; i++) {
      if (a.decoded.includes(i)) l += G.keyPos.has(i) ? "🔑" : "✅";
      else if (new Set(a.foundPos || []).has(i)) l += "\ud83d\udd0d";
      else l += "⬛";
    }
    lines.push(l);
  });
  lines.push("");
  lines.push("https://glif.foo");
  navigator.clipboard?.writeText(lines.join("\n")).then(() => {
    const el = document.querySelector(".moverlay.show .copied");
    if (el) {
      el.style.display = "block";
      setTimeout(() => (el.style.display = "none"), 2500);
    }
    // Conquista: compartilhou resultado
    queueAch("spread_the_word");
  });
}

// ═══════════════════════════════════════════════
// SHARE PASSPORT
// ═══════════════════════════════════════════════
function makeGlyphDataURL(letters, strokeColor, size) {
  let inner = "";
  for (let i = letters.length - 1; i >= 0; i--) {
    const def = LETTERS[letters[i].toUpperCase()];
    if (!def) continue;
    const xform = def.transform ? ` transform="${def.transform}"` : "";
    const px = def.paths.map((d) => `<path d="${d}"/>`).join("");
    inner +=
      `<g fill="none" stroke="${strokeColor}" stroke-width="10"` +
      ` stroke-linecap="${def.lc || "butt"}" stroke-linejoin="${def.lj || "miter"}"` +
      ` stroke-miterlimit="${def.ml || 4}"${xform}>${px}</g>`;
  }
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"` +
    ` width="${size}" height="${size}">${inner}</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
}

function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "glifoo-passaporte.png";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

async function sharePassport() {
  const btn = document.querySelector(".passport-share-btn");
  const origLabel = "📸 Compartilhar passaporte";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ Gerando…";
  }
  try {
    const s = carregarStats();
    const pct = s.jogados > 0 ? Math.round((s.vitorias / s.jogados) * 100) : 0;
    const titulo = getTituloStreak(s.streakAtual);

    // ── Square 1:1 — funciona em WhatsApp status, Instagram feed e stories ──
    const W = 640,
      H = 640,
      SC = 2;
    const cv = document.createElement("canvas");
    cv.width = W * SC;
    cv.height = H * SC;
    const ctx = cv.getContext("2d");
    ctx.scale(SC, SC);

    const PAD = 36;
    const AMBER = "#f5a623";
    const TEXT = "#f0ebe4";
    const DIM = "#8a7f74";
    const BORDER = "#3a342a";
    const FONT = '"DM Sans", "Inter", system-ui, sans-serif';
    const SERIF = '"DM Serif Display", Georgia, serif';

    // Garantir que as fontes customizadas estejam carregadas antes de desenhar
    await Promise.all([
      document.fonts.load(`normal 20px ${SERIF}`),
      document.fonts.load(`300 13px ${FONT}`),
    ]).catch(() => {});

    // Pre-load glyph image before drawing
    const glyphImg = await new Promise((resolve) => {
      const url = makeGlyphDataURL(WL, "#f0ebe4", 92);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });

    // ── Background ────────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 18);
    ctx.clip();

    const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
    bg.addColorStop(0, "#252118");
    bg.addColorStop(1, "#2c271f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(W, 0, 0, W, 0, 200);
    glow.addColorStop(0, "rgba(245,166,35,0.12)");
    glow.addColorStop(1, "rgba(245,166,35,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Glyph watermark grande — centro-direita
    if (glyphImg) {
      const gs = 180;
      ctx.globalAlpha = 0.035;
      ctx.drawImage(glyphImg, W - PAD - gs + 20, H / 2 - gs / 2, gs, gs);
      ctx.globalAlpha = 1;
    }

    ctx.restore();

    // Card border
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, W - 1, H - 1, 18);
    ctx.stroke();

    // ── Header ────────────────────────────────────────
    let y = PAD;
    ctx.textAlign = "left";

    // Logo: "glif.foo" — serif para glif+ponto (ponto âmbar), sans pequeno para foo
    ctx.font = `normal 20px ${SERIF}`;
    ctx.fillStyle = TEXT;
    const glifW = ctx.measureText("glif").width;
    ctx.fillText("glif", PAD, y + 18);
    ctx.fillStyle = AMBER;
    const dotW = ctx.measureText(".").width;
    ctx.fillText(".", PAD + glifW, y + 18);
    ctx.fillStyle = TEXT;
    ctx.font = `300 12px ${FONT}`;
    // "foo" alinhado ao centro vertical de "glif" (topo aprox. y+2, altura 20px → centro y+12)
    // Para 12px sans: baseline ≈ centro + 4px
    ctx.textBaseline = "middle";
    ctx.fillText("foo", PAD + glifW + dotW + 1, y + 9);
    ctx.textBaseline = "alphabetic";

    ctx.font = `600 10px ${FONT}`;
    ctx.fillStyle = "#5a5049";
    ctx.fillText("PASSAPORTE DO JOGADOR", PAD, y + 36);

    // Glyph pequeno no header (canto topo-direito)
    if (glyphImg) {
      const gs = 34;
      ctx.globalAlpha = 0.18;
      ctx.drawImage(glyphImg, W - PAD - gs, PAD + 2, gs, gs);
      ctx.globalAlpha = 1;
    }

    y += 60;

    // ── Stats grid 2×2 ────────────────────────────────
    const goldenStats = loadGoldenStats();
    const statsData = [
      { val: pct + "%", lbl: "Vitórias" },
      { val: String(goldenStats.total) + " ✨", lbl: "Dourados" },
      { val: s.streakAtual + " 🔥", lbl: "Sequência" },
      { val: String(s.streakMax), lbl: "Recorde" },
    ];
    const gapC = 10;
    const cardW = (W - PAD * 2 - gapC) / 2;
    const cardH = 100;

    statsData.forEach((st, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cx = PAD + col * (cardW + gapC);
      const cy = y + row * (cardH + gapC);

      ctx.fillStyle = "#1d1a14";
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 11);
      ctx.fill();
      ctx.strokeStyle = "#2a251d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx + 0.5, cy + 0.5, cardW - 1, cardH - 1, 11);
      ctx.stroke();

      ctx.font = `bold 28px ${FONT}`;
      ctx.fillStyle = TEXT;
      ctx.textAlign = "center";
      ctx.fillText(st.val, cx + cardW / 2, cy + 52);
      ctx.font = `11px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.fillText(st.lbl, cx + cardW / 2, cy + 74);
    });

    y += 2 * cardH + gapC + 16;

    // ── Rank banner ───────────────────────────────────
    const bannerH = 56;
    ctx.fillStyle = "#2b2218";
    ctx.beginPath();
    ctx.roundRect(PAD, y, W - PAD * 2, bannerH, 11);
    ctx.fill();
    ctx.strokeStyle = "#4a3a1f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(PAD + 0.5, y + 0.5, W - PAD * 2 - 1, bannerH - 1, 11);
    ctx.stroke();

    ctx.font = "22px serif";
    ctx.fillStyle = TEXT;
    ctx.textAlign = "left";
    ctx.fillText(titulo.emoji, PAD + 14, y + bannerH / 2 + 8);

    const textOffX = PAD + 50;
    ctx.font = `bold 15px ${FONT}`;
    ctx.fillStyle = AMBER;
    ctx.fillText(titulo.nome, textOffX, y + bannerH / 2 - 2);

    if (titulo.proximo) {
      const thresholds = [3, 7, 14, 21, 30, 60, 100, 365];
      const idx = thresholds.findIndex((t) => s.streakAtual < t);
      const prev = idx > 0 ? thresholds[idx - 1] : 0;
      const cur = thresholds[idx];
      const pctBarVal = (s.streakAtual - prev) / (cur - prev);

      ctx.font = `10px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.fillText(
        `Faltam ${titulo.faltam} dia${titulo.faltam !== 1 ? "s" : ""} para ${titulo.proximo}`,
        textOffX,
        y + bannerH / 2 + 15,
      );

      const barX2 = W - PAD - 80;
      const barW2 = 70;
      const barY2 = y + bannerH / 2 - 4;
      ctx.fillStyle = BORDER;
      ctx.beginPath();
      ctx.roundRect(barX2, barY2, barW2, 6, 3);
      ctx.fill();
      ctx.fillStyle = AMBER;
      ctx.beginPath();
      ctx.roundRect(barX2, barY2, Math.max(barW2 * pctBarVal, 5), 6, 3);
      ctx.fill();
    }

    y += bannerH + 16;

    // ── Divider ───────────────────────────────────────
    ctx.strokeStyle = BORDER;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, y);
    ctx.lineTo(W - PAD, y);
    ctx.stroke();
    y += 14;

    // ── Distribution ──────────────────────────────────
    ctx.font = `600 9px ${FONT}`;
    ctx.fillStyle = "#5a5049";
    ctx.textAlign = "left";
    ctx.fillText("DISTRIBUIÇÃO DE TENTATIVAS", PAD, y + 9);
    y += 18;

    const chaves = ["1", "2", "3", "4", "X"];
    const maxVal = Math.max(1, ...chaves.map((k) => s.distribuicao[k] || 0));
    const tentativaAtual =
      G.done && G.won
        ? String(G.attempts.length)
        : G.done && !G.won
          ? "X"
          : null;
    const rowH = 19,
      rowGap = 4;
    const keyColW = 18;
    const barStartX = PAD + keyColW + 8;
    const barAreaW = W - PAD - barStartX - 10;

    chaves.forEach((k, i) => {
      const val = s.distribuicao[k] || 0;
      const frac = val / maxVal;
      const isCur = k === tentativaAtual;
      const ry = y + i * (rowH + rowGap);

      ctx.font = `11px ${FONT}`;
      ctx.fillStyle = DIM;
      ctx.textAlign = "center";
      ctx.fillText(k, PAD + keyColW / 2, ry + rowH - 4);

      const bw = Math.max(barAreaW * frac, 24);
      ctx.fillStyle = isCur ? "#4a9d6f" : val > 0 ? "#c17f20" : "#2e281f";
      ctx.beginPath();
      ctx.roundRect(barStartX, ry, bw, rowH, rowH / 2);
      ctx.fill();

      ctx.font = `bold 11px ${FONT}`;
      ctx.fillStyle = isCur || val > 0 ? "#1d1a14" : DIM;
      ctx.textAlign = "left";
      ctx.fillText(String(val), barStartX + 10, ry + rowH - 4);
    });

    // ── Footer ────────────────────────────────────────
    ctx.font = `9px ${FONT}`;
    ctx.fillStyle = "#4a3f35";
    ctx.textAlign = "center";
    ctx.fillText(
      "Estatísticas refletem apenas a primeira tentativa do dia  •  glif.foo",
      W / 2,
      H - 16,
    );

    // ── Export ────────────────────────────────────────
    // toBlob como Promise: preserva o user gesture no iOS Safari (microtask vs macrotask)
    const blob = await new Promise((resolve, reject) =>
      cv.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("toBlob falhou"))),
        "image/png",
      ),
    );
    const file = new File([blob], "glifoo-passaporte.png", {
      type: "image/png",
    });

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: "glif.foo — Passaporte",
        });
      } catch (e) {
        if (e.name !== "AbortError") downloadBlob(blob);
      }
    } else {
      downloadBlob(blob);
    }
  } catch (err) {
    console.error("sharePassport:", err);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = origLabel;
    }
  }
}

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === "dark";
  html.dataset.theme = isDark ? "light" : "dark";
  saveConfig({ theme: isDark ? "light" : "dark" });
  syncConfigUI();
  refresh();
}

// ── Configurações ──
const CONFIG_KEY = "gliffoo_config";
let HARD_MODE = false;
let AUDIO_MUTED = false;
function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {};
  } catch {
    return {};
  }
}
function saveConfig(patch) {
  const c = { ...loadConfig(), ...patch };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
}
function syncConfigUI() {
  const isDark = document.documentElement.dataset.theme === "dark";
  const sw = document.getElementById("cfg-theme-switch");
  const sub = document.getElementById("cfg-theme-sub");
  const icon = document.getElementById("cfg-theme-icon");
  if (sw) sw.classList.toggle("on", isDark);
  if (sub) sub.textContent = isDark ? "Ativado" : "Desativado";
  if (icon) icon.textContent = isDark ? "🌙" : "☀️";
  const hardSw = document.getElementById("cfg-hard-switch");
  const hardSub = document.getElementById("cfg-hard-sub");
  if (hardSw) hardSw.classList.toggle("on", HARD_MODE);
  if (hardSub) hardSub.textContent = HARD_MODE ? "Ativado" : "Desativado";
  const soundSw = document.getElementById("cfg-sound-switch");
  const soundSub = document.getElementById("cfg-sound-sub");
  const soundIcon = document.getElementById("cfg-sound-icon");
  if (soundSw) soundSw.classList.toggle("on", !AUDIO_MUTED);
  if (soundSub) soundSub.textContent = AUDIO_MUTED ? "Desativado" : "Ativado";
  if (soundIcon) soundIcon.textContent = AUDIO_MUTED ? "🔇" : "🔊";
}
function applyHardMode() {
  const btn = document.getElementById("key-btn");
  if (btn) btn.style.display = HARD_MODE ? "none" : "";
}
function toggleHardMode() {
  if (G.attempts.length > 0 && !G.done) {
    setFb("Não é possível mudar o Modo Difícil durante uma partida.", "warn");
    return;
  }
  HARD_MODE = !HARD_MODE;
  saveConfig({ hardMode: HARD_MODE });
  syncConfigUI();
  applyHardMode();
  buildHeaderMeta();
}
function toggleMuteAudio() {
  AUDIO_MUTED = !AUDIO_MUTED;
  saveConfig({ audioMuted: AUDIO_MUTED });
  syncConfigUI();
}
function openConfig() {
  syncConfigUI();
  openM("config-modal");
}
function initConfig() {
  const c = loadConfig();
  if (c.theme) document.documentElement.dataset.theme = c.theme;
  HARD_MODE = !!c.hardMode;
  AUDIO_MUTED = !!c.audioMuted;
  applyHardMode();
  if (Date.now() < BETA_END_DATE) {
    const badge = document.getElementById("ea-badge");
    if (badge) badge.style.display = "inline-block";
    const ea = document.getElementById("cfg-ea-section");
    if (ea)
      ea.innerHTML = `<div class="cfg-ea-info"><strong>Acesso Antecipado</strong> — estatísticas serão resetadas no lançamento oficial em <strong>jun/2026</strong>.</div>`;
  }
}

// ═══════════════════════════════════════════════
// KEYBOARD
// ═══════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  if (document.querySelector(".moverlay.show")) return;
  if (!document.getElementById("tutorial-overlay").classList.contains("hidden"))
    return;
  const k = e.key.toUpperCase();
  if (e.key === "Backspace") handleKey("⌫");
  else if (e.key === "Enter") handleKey("↵");
  else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    if (G.done) return;
    e.preventDefault();
    const dir = e.key === "ArrowLeft" ? -1 : 1;
    let c = G.cursor + dir;
    // Pula decoded/keyPos na direção escolhida
    while (c >= 0 && c < WN && (G.decoded.has(c) || G.keyPos.has(c))) c += dir;
    if (c >= 0 && c < WN) moveCursor(c);
  } else if (/^[A-Z]$/.test(k)) handleKey(k);
});

// ═══════════════════════════════════════════════
// MODAL DE ESTATÍSTICAS
// ═══════════════════════════════════════════════
function getTituloStreak(streak) {
  if (streak >= 365)
    return {
      emoji: "⚡",
      nome: "Guardião dos Glifos",
      proximo: null,
      faltam: 0,
    };
  if (streak >= 100)
    return {
      emoji: "🔮",
      nome: "Oráculo",
      proximo: "Guardião dos Glifos",
      faltam: 365 - streak,
    };
  if (streak >= 60)
    return {
      emoji: "👑",
      nome: "Hierofante",
      proximo: "Oráculo",
      faltam: 100 - streak,
    };
  if (streak >= 30)
    return {
      emoji: "🎓",
      nome: "Erudito dos Glifos",
      proximo: "Hierofante",
      faltam: 60 - streak,
    };
  if (streak >= 21)
    return {
      emoji: "🧩",
      nome: "Mestre dos Enigmas",
      proximo: "Erudito dos Glifos",
      faltam: 30 - streak,
    };
  if (streak >= 14)
    return {
      emoji: "📚",
      nome: "Linguista",
      proximo: "Mestre dos Enigmas",
      faltam: 21 - streak,
    };
  if (streak >= 7)
    return {
      emoji: "🔑",
      nome: "Criptógrafo",
      proximo: "Linguista",
      faltam: 14 - streak,
    };
  if (streak >= 3)
    return {
      emoji: "🎯",
      nome: "Decodificador",
      proximo: "Criptógrafo",
      faltam: 7 - streak,
    };
  return {
    emoji: "🔰",
    nome: "Novato",
    proximo: "Decodificador",
    faltam: 3 - streak,
  };
}

function openStats() {
  const s = carregarStats();
  const pct = s.jogados > 0 ? Math.round((s.vitorias / s.jogados) * 100) : 0;

  // Cards no passaporte (4 colunas)
  const gs2 = loadGoldenStats();
  document.getElementById("stats-grid-main").innerHTML = `
    <div class="stat-card"><div class="stat-val">${pct}%</div><div class="stat-lbl">Vitórias</div></div>
    <div class="stat-card"><div class="stat-val">✨ ${gs2.total}</div><div class="stat-lbl">Dourados</div></div>
    <div class="stat-card"><div class="stat-val">${s.streakAtual}🔥</div><div class="stat-lbl">Sequência</div></div>
    <div class="stat-card"><div class="stat-val">${s.streakMax}</div><div class="stat-lbl">Recorde</div></div>`;

  // Rank banner
  const titulo = getTituloStreak(s.streakAtual);
  const rankEl = document.getElementById("stats-rank-banner");
  if (rankEl) {
    if (titulo.proximo) {
      const thresholds = [3, 7, 14, 21, 30, 60, 100, 365];
      const idx = thresholds.findIndex((t) => s.streakAtual < t);
      const prev = idx > 0 ? thresholds[idx - 1] : 0;
      const cur = thresholds[idx];
      const pctBar = Math.round(((s.streakAtual - prev) / (cur - prev)) * 100);
      rankEl.innerHTML = `<div class="rank-banner">
  <div class="rank-emoji">${titulo.emoji}</div>
  <div class="rank-info">
    <div class="rank-name">${titulo.nome}</div>
    <div class="rank-next">Faltam ${titulo.faltam} dia${titulo.faltam !== 1 ? "s" : ""} para ${titulo.proximo}</div>
  </div>
  <div class="rank-bar-wrap"><div class="rank-bar" style="width:${pctBar}%"></div></div>
</div>`;
    } else {
      rankEl.innerHTML = `<div class="rank-banner">
  <div class="rank-emoji">${titulo.emoji}</div>
  <div class="rank-info"><div class="rank-name">${titulo.nome}</div></div>
</div>`;
    }
  }

  // Glifo decorativo no passaporte
  const pg = document.getElementById("passport-glyph");
  if (pg) {
    pg.innerHTML = "";
    const stroke = glyphStroke();
    for (let i = WN - 1; i >= 0; i--) {
      const svg = makeSVG(
        WL[i],
        stroke,
        "position:absolute;top:0;left:0;width:100%;height:100%;",
      );
      if (svg) pg.appendChild(svg);
    }
  }

  // Distribuição
  const distrib = document.getElementById("stats-distrib");
  distrib.innerHTML = "";
  const chaves = ["1", "2", "3", "4", "X"];
  const maxVal = Math.max(1, ...chaves.map((k) => s.distribuicao[k] || 0));
  const tentativaAtual =
    G.done && G.won ? String(G.attempts.length) : G.done && !G.won ? "X" : null;

  chaves.forEach((k) => {
    const val = s.distribuicao[k] || 0;
    const pct2 = Math.round((val / maxVal) * 100);
    const isCur = k === tentativaAtual;
    const row = document.createElement("div");
    row.className = "distrib-row";
    row.innerHTML = `
      <div class="distrib-key">${k}</div>
      <div class="distrib-bar-wrap">
        <div class="distrib-bar${isCur ? " cur" : ""}" style="width:${Math.max(pct2, 8)}%">
          <span>${val}</span>
        </div>
      </div>`;
    distrib.appendChild(row);
  });

  // Share section removida — substituída pelo botão "Compartilhar passaporte"
  const statsShareSection = document.getElementById("stats-share-section");
  if (statsShareSection) statsShareSection.innerHTML = "";

  openM("stats-modal");

  // Conquistas inline (renderiza DEPOIS de mostrar o modal)
  requestAnimationFrame(() => {
    renderConquistas();
    const earned = loadAch();
    const cnt = Object.keys(earned).length;
    const countEl = document.getElementById("ach-count-tab");
    if (countEl)
      countEl.textContent =
        cnt > 0 ? cnt + " / " + Object.keys(ACH_MAP).length : "";
    // Garante scroll no topo APÓS renderizar tudo
    const body = document.getElementById("stats-scroll-body");
    if (body) body.scrollTop = 0;
  });
}
// ═══════════════════════════════════════════════

// Paletas por seção
const ACH_PALETTES = {
  violet: {
    dark: "#1e1550",
    mid: "#2d1f6e",
    rim: "#7c5cff",
    ribbon: "#6d44ff",
    rdark: "#3d1fa8",
    ray: "#c4b5fd",
    dot: "#a78bfa",
  },
  orange: {
    dark: "#431407",
    mid: "#7c2d12",
    rim: "#f97316",
    ribbon: "#ea580c",
    rdark: "#7c2d12",
    ray: "#fed7aa",
    dot: "#fb923c",
  },
  gold: {
    dark: "#3a1f00",
    mid: "#713f12",
    rim: "#eab308",
    ribbon: "#ca8a04",
    rdark: "#713f12",
    ray: "#fef08a",
    dot: "#facc15",
  },
  blue: {
    dark: "#0c1e4a",
    mid: "#1e3a8a",
    rim: "#3b82f6",
    ribbon: "#2563eb",
    rdark: "#1e3a8a",
    ray: "#bfdbfe",
    dot: "#60a5fa",
  },
  amber: {
    dark: "#451a03",
    mid: "#78350f",
    rim: "#f59e0b",
    ribbon: "#d97706",
    rdark: "#92400e",
    ray: "#fde68a",
    dot: "#fbbf24",
  },
  pink: {
    dark: "#2d0019",
    mid: "#831843",
    rim: "#ec4899",
    ribbon: "#be185d",
    rdark: "#500724",
    ray: "#fbcfe8",
    dot: "#f472b6",
  },
  teal: {
    dark: "#042f2e",
    mid: "#134e4a",
    rim: "#14b8a6",
    ribbon: "#0d9488",
    rdark: "#0f3a38",
    ray: "#99f6e4",
    dot: "#2dd4bf",
  },
  indigo: {
    dark: "#172554",
    mid: "#312e81",
    rim: "#6366f1",
    ribbon: "#4f46e5",
    rdark: "#312e81",
    ray: "#c7d2fe",
    dot: "#818cf8",
  },
};

// Ícones SVG inline (Lucide-style, 24×24)
const ACH_ICONS = {
  key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>',
  flame:
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  share:
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  trophy:
    '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  skull:
    '<path d="M12 2C6.5 2 2 6.5 2 12v5h4v3h12v-3h4v-5c0-5.5-4.5-10-10-10z"/><line x1="8" y1="19" x2="8" y2="22"/><line x1="16" y1="19" x2="16" y2="22"/><circle cx="9" cy="10" r="1.5" fill="currentColor"/><circle cx="15" cy="10" r="1.5" fill="currentColor"/>',
  sparkles:
    '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
  crown: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
  compass:
    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  landmark:
    '<line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
  coffee:
    '<path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>',
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  hourglass:
    '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
  shuffle:
    '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.5 2.2"/><path d="M22 18h-5.9c-1.3 0-2.5-.7-3.2-1.8l-.8-1.3"/><path d="m18 14 4 4-4 4"/>',
  beach:
    '<path d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"/><path d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"/><path d="M5 22h14"/>',
  clover:
    '<path d="M16.17 7.83 2 22"/><path d="M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"/><path d="m7.83 7.83 8.34 8.34"/>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>',
  swords:
    '<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/>',
  zzz: '<path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>',
  sandwich:
    '<path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"/><path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"/><path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2"/><path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"/>',
  mirror:
    '<circle cx="12" cy="10" r="8"/><path d="M12 18v4"/><path d="M7 22h10"/>',
  check2: '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
  headphones:
    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2z"/><path d="M3 19a2 2 0 0 0 2 2h1v-8H5a2 2 0 0 0-2 2z"/>',
  joystick:
    '<path d="M12 5v4"/><circle cx="12" cy="4" r="2"/><path d="M7 10h10a4 4 0 0 1 4 4v3a3 3 0 0 1-3 3h-1l-2-3H9l-2 3H6a3 3 0 0 1-3-3v-3a4 4 0 0 1 4-4z"/><path d="M8 14h.01"/><path d="M16 14h.01"/>',
  broadcast:
    '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.7 16.3a6 6 0 0 1 0-8.6"/><path d="M16.3 7.7a6 6 0 0 1 0 8.6"/><path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2"/><circle cx="12" cy="12" r="2"/>',
  flask:
    '<path d="M9 3h6v7.5l4.5 7.5a1 1 0 0 1-.9 1.5H5.4a1 1 0 0 1-.9-1.5L9 10.5V3z"/><line x1="6.5" y1="14" x2="17.5" y2="14"/>',
};

// Definição das conquistas
const ACHIEVEMENTS = [
  {
    section: "Fundadores",
    palette: "teal",
    items: [
      {
        id: "beta_tester",
        name: "Fundador Beta",
        icon: "flask",
        desc: "Jogou durante o período beta do glif.foo",
      },
    ],
  },
  {
    section: "Primeiros Passos",
    palette: "violet",
    items: [
      {
        id: "first_decode",
        name: "Primeira Decodificação",
        icon: "key",
        desc: "Decodifique seu primeiro Glifo",
      },
      {
        id: "on_a_roll",
        name: "Embalo",
        icon: "flame",
        desc: "3 vitórias consecutivas",
      },
      {
        id: "spread_the_word",
        name: "Espalhe a Palavra",
        icon: "share",
        desc: "Compartilhe seu resultado",
      },
    ],
  },
  {
    section: "Sequências",
    palette: "orange",
    items: [
      {
        id: "streak_7",
        name: "Guerreiro Semanal",
        icon: "trophy",
        desc: "7 vitórias consecutivas",
      },
      {
        id: "streak_30",
        name: "Devoto do Mês",
        icon: "flame",
        desc: "30 vitórias consecutivas",
      },
      {
        id: "streak_100",
        name: "Centenário",
        icon: "zap",
        desc: "100 vitórias consecutivas",
      },
      {
        id: "streak_365",
        name: "Imortal",
        icon: "skull",
        desc: "365 vitórias consecutivas",
      },
    ],
  },
  {
    section: "Glifos Dourados",
    palette: "gold",
    items: [
      {
        id: "golden_touch",
        name: "Toque de Midas",
        icon: "sparkles",
        desc: "Vença sem usar a Chave Decodificadora",
      },
      {
        id: "golden_5",
        name: "Midas",
        icon: "sparkles",
        desc: "5 Glifos Dourados decodificados",
      },
      {
        id: "golden_week",
        name: "Hat Trick",
        icon: "trophy",
        desc: "3 Glifos Dourados consecutivos",
      },
      {
        id: "golden_30",
        name: "Dourado",
        icon: "crown",
        desc: "30 Glifos Dourados decodificados",
      },
    ],
  },
  {
    section: "Dedicação",
    palette: "blue",
    items: [
      {
        id: "games_10",
        name: "Começando Bem",
        icon: "compass",
        desc: "10 Glifos decodificados",
      },
      {
        id: "games_50",
        name: "Frequentador",
        icon: "calendar",
        desc: "50 Glifos decodificados",
      },
      {
        id: "games_100",
        name: "Devoto",
        icon: "book",
        desc: "100 Glifos decodificados",
      },
      {
        id: "games_365",
        name: "Obcecado",
        icon: "landmark",
        desc: "365 Glifos decodificados",
      },
      {
        id: "coffee_break",
        name: "Café da Manhã",
        icon: "coffee",
        desc: "Decodifique antes das 10h — 10 vezes",
      },
      {
        id: "fast_break",
        name: "Pontualidade",
        icon: "rocket",
        desc: "Jogue na 1ª hora após a virada — 10 vezes",
      },
    ],
  },
  {
    section: "Momentos Especiais",
    palette: "amber",
    hideDesc: true,
    items: [
      {
        id: "comeback_kid",
        name: "Virada",
        icon: "hourglass",
        desc: "Decodifique na última tentativa",
      },
      {
        id: "echo",
        name: "Eco",
        icon: "shuffle",
        desc: "Tente um anagrama da resposta",
      },
      {
        id: "weekend_warrior",
        name: "Fim de Semana",
        icon: "beach",
        desc: "Decodifique sábado E domingo na mesma semana",
      },
      {
        id: "lucky_7",
        name: "Lucky 7",
        icon: "clover",
        desc: "Decodifique uma palavra de 7 letras",
      },
    ],
  },
  {
    section: "Peculiaridades",
    palette: "pink",
    hideDesc: true,
    items: [
      {
        id: "night_owl",
        name: "Coruja",
        icon: "moon",
        desc: "Decodifique após meia-noite",
      },
      {
        id: "early_bird",
        name: "Madrugador",
        icon: "sun",
        desc: "Decodifique antes das 7h",
      },
      {
        id: "insomniac",
        name: "Insone",
        icon: "zzz",
        desc: "Decodifique entre 2h e 4h da manhã",
      },
      {
        id: "persistent",
        name: "Persistente",
        icon: "swords",
        desc: "Vença após 1ª tentativa sem nenhuma letra",
      },
      {
        id: "sandwich",
        name: "Sanduíche",
        icon: "sandwich",
        desc: "Acerte só a 1ª e a última letra na 1ª tentativa",
      },
      {
        id: "palindrome",
        name: "Espelho",
        icon: "mirror",
        desc: "Tente um palíndromo",
      },
      {
        id: "double_trouble",
        name: "Duplo Trouble",
        icon: "check2",
        desc: "Decodifique uma palavra com letras duplas",
      },
    ],
  },
  {
    section: "Rádio",
    palette: "teal",
    items: [
      {
        id: "foco_total",
        name: "Foco Total",
        icon: "headphones",
        desc: "Decodifique com a rádio tocando",
      },
    ],
  },
  {
    section: "Segredos",
    palette: "indigo",
    hideDesc: true,
    items: [
      {
        id: "ee_gliffo",
        name: "Autoestima Glífica",
        icon: "sparkles",
        desc: "Digite GLIF, GLIFO ou GLIFFO como tentativa",
      },
      {
        id: "ee_drone",
        name: "Drone Zone",
        icon: "broadcast",
        desc: "Digite DRONE para sintonizar a rádio cósmica",
      },
      {
        id: "ee_invaders",
        name: "Comandante Espacial",
        icon: "joystick",
        desc: "Desbloqueie o Space Invaders encontrando as 5 palavras",
      },
      {
        id: "ee_radio_word",
        name: "Glifo Musical",
        icon: "headphones",
        desc: "Vença com uma palavra do dia temática de música",
      },
      {
        id: "ee_trilha",
        name: "Trilha Sonora",
        icon: "headphones",
        desc: "Vença com a rádio tocando",
      },
      {
        id: "ee_pal_reveal",
        name: "Espelho Secreto",
        icon: "mirror",
        desc: "Dispare a animação especial de palíndromo",
      },
      {
        id: "ee_insomniac",
        name: "Plantão da Madrugada",
        icon: "moon",
        desc: "Vença entre 2h e 4h para ouvir a bronca noturna",
      },
      {
        id: "ee_arco",
        name: "Déjà Vu",
        icon: "book",
        desc: "Encontre o easter egg da palavra ARCO",
      },
      {
        id: "ee_konami",
        name: "Konami",
        icon: "joystick",
        desc: "Digite o código clássico",
      },
      {
        id: "ee_snake",
        name: "Cobra no Logo",
        icon: "shuffle",
        desc: "Abra o Snake clicando no ponto do logo",
      },
      {
        id: "ee_foo",
        name: "Foo Nervoso",
        icon: "sparkles",
        desc: "Irrite o foo do logo com 5 cliques",
      },
      {
        id: "ee_radio_random",
        name: "Canal Surpresa",
        icon: "broadcast",
        desc: "Clique 5 vezes no botão de rádio do footer",
      },
    ],
  },
  {
    section: "Caçada",
    palette: "violet",
    items: [
      {
        id: "secrets_1",
        name: "Primeiro Segredo",
        icon: "key",
        desc: "Descubra seu primeiro easter egg oculto",
      },
      {
        id: "secrets_6",
        name: "Caça-Glifos",
        icon: "compass",
        desc: "Descubra 6 segredos diferentes",
      },
      {
        id: "secrets_all",
        name: "Arquivo Completo",
        icon: "crown",
        desc: "Descubra todos os 12 segredos rastreados",
      },
    ],
  },
];

const ACH_MAP = {};
ACHIEVEMENTS.forEach((s) =>
  s.items.forEach((a) => {
    ACH_MAP[a.id] = {
      ...a,
      section: s.section,
      palette: s.palette,
      hideDesc: s.hideDesc,
    };
  }),
);
const ACH_TOTAL = Object.keys(ACH_MAP).length;
const SECRET_DISCOVERY_IDS = [
  "ee_gliffo",
  "ee_drone",
  "ee_invaders",
  "ee_radio_word",
  "ee_trilha",
  "ee_pal_reveal",
  "ee_insomniac",
  "ee_arco",
  "ee_konami",
  "ee_snake",
  "ee_foo",
  "ee_radio_random",
];
const ACH_KEY = "gliffoo_ach_v1";
// ── BETA: altere a data abaixo para encerrar o beta e zerar as stats ──
const BETA_END_DATE = new Date("2026-06-01T00:00:00-03:00").getTime();
const BETA_KEY = "gliffoo_beta_v1";
const BETA_RESET_KEY = "gliffoo_beta_reset_done";

function loadAch() {
  try {
    return JSON.parse(localStorage.getItem(ACH_KEY)) || {};
  } catch {
    return {};
  }
}
function saveAch(earned) {
  localStorage.setItem(ACH_KEY, JSON.stringify(earned));
}

function countSecrets(earned) {
  return SECRET_DISCOVERY_IDS.filter((id) => earned[id]).length;
}

function checkSecretMilestones(earned) {
  const found = countSecrets(earned);
  if (found >= 1) queueAch("secrets_1");
  if (found >= 6) queueAch("secrets_6");
  if (found >= SECRET_DISCOVERY_IDS.length) queueAch("secrets_all");
}

// ── Popup toast ──
let _achPopTimer = null;
let _achQueue = [];
let _achShowing = false;

function showAchPopup(ach) {
  document.getElementById("ach-popup-icon").textContent = ach.emoji || "🏅";
  document.getElementById("ach-popup-name").textContent = ach.name;
  document.getElementById("ach-popup-desc").textContent = ach.desc;
  const popup = document.getElementById("ach-popup");
  // Confetti
  const colors = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#6baee8"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    const sz = 5 + Math.random() * 7;
    p.style.cssText = `position:fixed;width:${sz}px;height:${sz}px;background:${colors[i % 5]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};bottom:${100 + Math.random() * 80}px;left:${30 + Math.random() * 40}%;pointer-events:none;z-index:400;animation:confPop 0.9s ease-out forwards;--tx:${(Math.random() - 0.5) * 140}px;--ty:${-50 - Math.random() * 80}px;animation-delay:${Math.random() * 0.25}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1300);
  }
  if (_achPopTimer) clearTimeout(_achPopTimer);
  popup.classList.add("show");
  _achPopTimer = setTimeout(() => popup.classList.remove("show"), 3800);
}

function queueAch(id) {
  if (!ACH_MAP[id]) return;
  const earned = loadAch();
  if (earned[id]) return;
  earned[id] = Date.now();
  saveAch(earned);
  if (SECRET_DISCOVERY_IDS.includes(id)) checkSecretMilestones(earned);
  // Emoji para popup
  const emojiMap = {
    beta_tester: "🧪",
    first_decode: "🔑",
    on_a_roll: "🔥",
    spread_the_word: "📤",
    streak_7: "🏅",
    streak_30: "🪵",
    streak_100: "⚡",
    streak_365: "💀",
    golden_touch: "✨",
    golden_5: "🥇",
    golden_week: "🎩",
    golden_30: "👑",
    games_10: "🧭",
    games_50: "📅",
    games_100: "📖",
    games_365: "🏛️",
    coffee_break: "☕",
    fast_break: "👟",
    comeback_kid: "⏳",
    echo: "🔀",
    weekend_warrior: "🏖️",
    lucky_7: "🍀",
    night_owl: "🌙",
    early_bird: "🌅",
    insomniac: "😴",
    persistent: "⚔️",
    sandwich: "🥪",
    palindrome: "🪞",
    double_trouble: "✌️",
    foco_total: "🎧",
    ee_gliffo: "🐊",
    ee_drone: "📡",
    ee_invaders: "👾",
    ee_radio_word: "🎶",
    ee_trilha: "🌟",
    ee_pal_reveal: "↔️",
    ee_insomniac: "🌙",
    ee_arco: "👀",
    ee_konami: "🕹️",
    ee_snake: "🐍",
    ee_foo: "😤",
    ee_radio_random: "🎲",
    secrets_1: "🔎",
    secrets_6: "🧭",
    secrets_all: "🗃️",
  };
  const ach = { ...ACH_MAP[id], emoji: emojiMap[id] || "🏅" };
  _achQueue.push(ach);
  processAchQueue();
}

function processAchQueue() {
  if (_achShowing || !_achQueue.length) return;
  _achShowing = true;
  const ach = _achQueue.shift();
  setTimeout(() => {
    showAchPopup(ach);
    setTimeout(() => {
      _achShowing = false;
      processAchQueue();
    }, 4300);
  }, 700);
}

// ── Verificação de conquistas ──
function checkAchievements({
  won,
  attempts,
  stats,
  shared,
  guess,
  firstDec,
  firstFnd,
}) {
  const hour = new Date().getHours();

  // ── Primeiros Passos ──
  if (won && stats.vitorias === 1) queueAch("first_decode");
  if (won && stats.streakAtual >= 3) queueAch("on_a_roll");
  if (shared) queueAch("spread_the_word");

  // ── Sequências ──
  if (won && stats.streakAtual >= 7) queueAch("streak_7");
  if (won && stats.streakAtual >= 30) queueAch("streak_30");
  if (won && stats.streakAtual >= 100) queueAch("streak_100");
  if (won && stats.streakAtual >= 365) queueAch("streak_365");

  // ── Glifos Dourados (sem usar a chave) ──
  if (won && !G.keyPos.size) {
    queueAch("golden_touch");
    const gs = loadGoldenStats();
    gs.total++;
    gs.consec++;
    saveGoldenStats(gs);
    if (gs.total >= 5) queueAch("golden_5");
    if (gs.total >= 30) queueAch("golden_30");
    if (gs.consec >= 3) queueAch("golden_week");
  } else if (won && G.keyPos.size) {
    const gs = loadGoldenStats();
    gs.consec = 0;
    saveGoldenStats(gs);
  }

  // ── Dedicação ──
  if (won && stats.jogados >= 10) queueAch("games_10");
  if (won && stats.jogados >= 50) queueAch("games_50");
  if (won && stats.jogados >= 100) queueAch("games_100");
  if (won && stats.jogados >= 365) queueAch("games_365");
  if (won && hour < 10) bumpTimedAch("coffee_break", 10);
  if (won && hour === 0) bumpTimedAch("fast_break", 10);

  // ── Momentos Especiais ──
  if (won && attempts === 4) queueAch("comeback_kid");
  if (won && WN === 7) queueAch("lucky_7");
  // Checa todas as tentativas da partida (não só a última)
  if (G.attempts.some((a) => achIsAnagram(a.word, WORD))) queueAch("echo");
  if (won && achCheckWeekend()) queueAch("weekend_warrior");

  // ── Peculiaridades ──
  if (won && (hour >= 23 || hour < 1)) queueAch("night_owl");
  if (won && hour >= 2 && hour < 4) queueAch("insomniac");
  if (won && hour < 7) queueAch("early_bird");
  if (won && firstDec === 0 && firstFnd === 0 && attempts > 1)
    queueAch("persistent");
  if (G.attempts.some((a) => achIsSandwich(a.word))) queueAch("sandwich");
  if (G.attempts.some((a) => achIsPalindrome(a.word))) queueAch("palindrome");
  if (won && achHasDouble(WORD)) queueAch("double_trouble");
  // ── Rádio ──
  if (
    won &&
    typeof window._mfpIsPlaying === "function" &&
    window._mfpIsPlaying()
  )
    queueAch("foco_total");
}

// ── Helpers de conquistas ──
const GOLDEN_KEY = "gliffoo_gold_v1";
function loadGoldenStats() {
  try {
    return (
      JSON.parse(localStorage.getItem(GOLDEN_KEY)) || {
        total: 0,
        consec: 0,
      }
    );
  } catch {
    return { total: 0, consec: 0 };
  }
}
function saveGoldenStats(g) {
  localStorage.setItem(GOLDEN_KEY, JSON.stringify(g));
}

function bumpTimedAch(id, threshold) {
  const k = "gliffoo_timed_" + id;
  const n = Number.parseInt(localStorage.getItem(k) || "0") + 1;
  localStorage.setItem(k, n);
  if (n >= threshold) queueAch(id);
}

function checkBetaReset() {
  if (Date.now() < BETA_END_DATE) return;
  if (localStorage.getItem(BETA_RESET_KEY)) return;
  // Preserva apenas o badge de beta nas conquistas
  const allAch = loadAch();
  const kept = {};
  if (allAch["beta_tester"]) kept["beta_tester"] = allAch["beta_tester"];
  saveAch(kept);
  // Zera todas as estatísticas
  localStorage.removeItem("gliffoo_stats");
  localStorage.removeItem("gliffoo_stats_date");
  localStorage.removeItem(GOLDEN_KEY);
  Object.keys(localStorage)
    .filter((k) => k.startsWith("gliffoo_timed_"))
    .forEach((k) => localStorage.removeItem(k));
  localStorage.setItem(BETA_RESET_KEY, "true");
}

function achIsAnagram(a, b) {
  return (
    a !== b &&
    a.length === b.length &&
    a.split("").sort().join("") === b.split("").sort().join("")
  );
}
function achIsPalindrome(w) {
  return w.length > 2 && w === w.split("").reverse().join("");
}
function achIsSandwich(g) {
  if (g.length < 3) return false;
  return (
    g[0] === WORD[0] &&
    g[g.length - 1] === WORD[g.length - 1] &&
    g
      .slice(1, -1)
      .split("")
      .every((l, i) => l !== WORD[i + 1])
  );
}
function achHasDouble(w) {
  for (let i = 0; i < w.length - 1; i++) if (w[i] === w[i + 1]) return true;
  return false;
}
function achCheckWeekend() {
  const k = "gliffoo_wknd_v1";
  // Usa a data de SP (não o timezone do sistema)
  const [y, m, d] = dataHoje().split("-").map(Number);
  const nowSP = new Date(y, m - 1, d);
  const dow = nowSP.getDay();
  const wk = achWeekNum(nowSP);
  try {
    const d = JSON.parse(localStorage.getItem(k)) || {};
    if (dow === 6) d[wk + "_s"] = true;
    if (dow === 0) d[wk + "_u"] = true;
    localStorage.setItem(k, JSON.stringify(d));
    return !!(d[wk + "_s"] && d[wk + "_u"]);
  } catch {
    return false;
  }
}
function achWeekNum(d) {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  dt.setUTCDate(dt.getUTCDate() + 4 - (dt.getUTCDay() || 7));
  const ys = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  return Math.ceil(((dt - ys) / 86400000 + 1) / 7);
}

// ── Render das medalhas no modal ──
function makeCoinSVG(iconKey, p) {
  const paths = ACH_ICONS[iconKey] || ACH_ICONS.trophy;
  const rays = [
    0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270,
    292.5, 315, 337.5,
  ]
    .map((a) => {
      const r = (a * Math.PI) / 180,
        x1 = 36 + 28.2 * Math.cos(r),
        y1 = 36 + 28.2 * Math.sin(r),
        x2 = 36 + 34 * Math.cos(r),
        y2 = 36 + 34 * Math.sin(r);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${p.ray}" stroke-width="1.2" stroke-linecap="round"/>`;
    })
    .join("");
  return `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
    <circle cx="36" cy="36" r="34" fill="${p.dark}" stroke="${p.rim}" stroke-width="3.5"/>
    <g opacity="0.4">${rays}</g>
    <circle cx="36" cy="36" r="28.22" fill="none" stroke="${p.rim}" stroke-width="0.8" stroke-dasharray="3.5 2.5" opacity="0.45"/>
    <circle cx="36" cy="36" r="26.18" fill="${p.mid}"/>
    <circle cx="36" cy="36" r="26.18" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.2"/>
    <g transform="translate(22,22)"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg></g>
  </svg>`;
}

function makeRibbonHTML(name, p) {
  return `<div class="ach-ribbon">
    <span class="ach-ribbon-text" style="color:${p.ribbon}">${name}</span>
  </div>`;
}

function renderConquistas() {
  const earned = loadAch();
  const earnedCount = Object.keys(earned).length;
  const secretCount = countSecrets(earned);
  const list = document.getElementById("conquistas-list");
  const total = document.getElementById("ach-total-line");
  const tab = document.getElementById("ach-count-tab");
  if (tab) tab.textContent = earnedCount > 0 ? `${earnedCount}` : "";
  if (!list) return;
  list.innerHTML = "";

  ACHIEVEMENTS.forEach((sec) => {
    const p = ACH_PALETTES[sec.palette];
    const div = document.createElement("div");
    div.className = "ach-section";
    const hdr = document.createElement("div");
    hdr.className = "ach-section-header";
    const secEarned = sec.items.filter((a) => earned[a.id]).length;
    hdr.innerHTML = `<div class="ach-section-dot" style="background:${p.dot}"></div>
      <div class="ach-section-label">${sec.section}</div>
      <div class="ach-section-line"></div>
      <div class="ach-count-badge" style="color:${p.dot}">${secEarned}/${sec.items.length}</div>`;
    div.appendChild(hdr);
    const grid = document.createElement("div");
    grid.className = "ach-grid";
    sec.items.forEach((a) => {
      const isEarned = !!earned[a.id];
      const badge = document.createElement("div");
      badge.className = "ach-badge" + (isEarned ? "" : " locked");
      const desc = !isEarned && sec.hideDesc ? "???" : a.desc;
      const descClass =
        !isEarned && sec.hideDesc ? "ach-desc hidden-desc" : "ach-desc";
      badge.style.setProperty("--ach-color", p.ribbon);
      badge.innerHTML = `
        <div class="ach-coin${isEarned ? "" : " locked"}">${makeCoinSVG(a.icon, p)}</div>
        <div class="ach-badge-text">
          ${makeRibbonHTML(a.name, p)}
          <div class="${descClass}">${desc}</div>
        </div>`;
      grid.appendChild(badge);
    });
    div.appendChild(grid);
    list.appendChild(div);
  });

  if (total)
    total.innerHTML = `<strong>${earnedCount}</strong> de <strong>${ACH_TOTAL}</strong> conquistas desbloqueadas · <strong>${secretCount}/${SECRET_DISCOVERY_IDS.length}</strong> segredos encontrados`;
}

// switchStatsTab: removido — view única

// ═══════════════════════════════════════════════
// INIT
async function bootstrapGame() {
  initConfig();
  checkBetaReset();

  try {
    setFb("Carregando glifo de hoje...", "");
    const info = await fetchPuzzleByOffset(0);
    applyPuzzleInfo(info);
  } catch (e) {
    console.warn("[glif] bootstrapGame erro:", e);
    showPuzzleLoadError(
      "Não foi possível carregar o glifo de hoje. Tente novamente em instantes.",
    );
    return;
  }

  carregarEstado();
  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(CURRENT_PUZZLE ? CURRENT_PUZZLE.data : undefined);
  setFb("", "");

  const pParam = new URLSearchParams(location.search).get("p");
  if (pParam) {
    const pNum = parseInt(pParam, 10);
    const hoje = numeroPuzzle();
    history.replaceState(null, "", location.pathname);
    if (!isNaN(pNum) && pNum >= 1 && pNum < hoje) {
      await startArquivoMode(pNum - hoje);
    }
  }

  if (WORD === "ARCO" && !ARQUIVO_MODO && !G.done) {
    queueAch("ee_arco");
    setTimeout(() => setFb("Essa é a palavra do tutorial… 👀", ""), 1400);
  }

  if (G.done) {
    buildHistory();
    setTimeout(() => {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

// Badge de data + dificuldade no header
function buildHeaderMeta(refDate) {
  const base =
    refDate ||
    new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
      }),
    );
  const dataFmt = base
    .toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    .replace(".", "")
    .toUpperCase();
  const diaSemana = base.getDay();
  const CICLO_NAMES = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
    muito_dificil: "Muito Difícil",
  };
  const _VALID_DIFFS = new Set(["facil", "medio", "dificil", "muito_dificil"]);
  const difficulty =
    (_VALID_DIFFS.has(CURRENT_PUZZLE?.difficulty) &&
      CURRENT_PUZZLE.difficulty) ||
    CICLO_DIF[diaSemana];
  const difficultyLabel =
    CURRENT_PUZZLE?.difficultyLabel || CICLO_NAMES[difficulty] || "Puzzle";
  const label = `${_htmlEsc(difficultyLabel)} · ${WN} letras`;
  const meta = document.getElementById("header-meta");
  if (ARQUIVO_MODO) {
    meta.innerHTML = `
    <span class="arquivo-badge">📅 Arquivo #${ARQUIVO_PUZZLENUM}</span>
    <span class="header-date">${dataFmt}</span>
    <span class="dif-badge ${difficulty}">${label}</span>`;
  } else if (PRATICA_MODO) {
    meta.innerHTML = `
    <span class="arquivo-badge" style="background:var(--surface3)">🎯 Prática</span>
    <span class="dif-badge ${difficulty}">${label}</span>`;
  } else {
    const pNum = numeroPuzzle();
    const specialBadge = [100, 365, 1000].includes(pNum)
      ? `<span class="arquivo-badge" style="background:var(--amber-400);color:#000">✨ Puzzle #${pNum}</span>`
      : "";
    meta.innerHTML = `
    <span class="header-date">${dataFmt}</span>
    ${specialBadge}
    <span class="dif-badge ${difficulty}">${label}</span>${
      HARD_MODE
        ? `
    <span class="hard-badge">🔥 Difícil</span>`
        : ""
    }`;
  }
}
void bootstrapGame();

// ═══════════════════════════════════════════════
// TUTORIAL v3 — 7 steps, show > tell
// Word: BOLA
// ═══════════════════════════════════════════════
const TW = "BOLA";
const TWL = ["B", "O", "L", "A"];
const TC = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b"];
const tcOf = {};
TWL.forEach((l, i) => {
  tcOf[l] = TC[i];
});

// Demo word ARCO para o tutorial
const TDL = ["A", "R", "C", "O"];
const tdOf = { A: TC[0], R: TC[1], C: TC[2], O: TC[3] };

// Variáveis do desafio interativo (mudam em case 3 para AMOR)
let iWord = "BOLA";
let iLetters = TWL;
let iColorOf = tcOf;

let tutStep = 0;
let tutTimers = [];
let currentActionToken = null;
let _chatLastAt = 0; // timestamp when last chatMsg bubble was shown
let _chatLastReadMs = 0; // estimated read time for that message
let _byeToken = null;
let onTutSolved = null;
let onTutGiveUp = null;

function tClear() {
  tutTimers.forEach(clearTimeout);
  tutTimers = [];
  tStopProgress();
  _chatLastAt = 0;
  _chatLastReadMs = 0;
}
function tStartProgress(durationMs) {
  const btn = document.getElementById("tut-next-btn");
  if (!btn) return;
  btn.style.setProperty("--fill-dur", durationMs + "ms");
  btn.classList.remove("auto-filling");
  void btn.offsetWidth;
  btn.classList.add("auto-filling");
}
function tStopProgress() {
  const btn = document.getElementById("tut-next-btn");
  if (!btn) return;
  btn.classList.remove("auto-filling");
}
function tDelay(fn, ms) {
  const t = setTimeout(fn, ms);
  tutTimers.push(t);
  return t;
}

function newToken() {
  if (currentActionToken) currentActionToken.cancelled = true;
  currentActionToken = { cancelled: false };
  return currentActionToken;
}
function tSleep(ms, token) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      if (token && token.cancelled) reject("cancelled");
      else resolve();
    }, ms);
    tutTimers.push(t);
  });
}
function tStroke() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--glyph")
      .trim() || "#f0ebe4"
  );
}

function tStack(id, letters, colorFn, fadeIn) {
  tStackEl(document.getElementById(id), letters, colorFn, fadeIn);
}

function tStackEl(el, letters, colorFn, fadeIn) {
  if (!el) return;
  el.innerHTML = "";
  for (let i = letters.length - 1; i >= 0; i--) {
    const l = letters[i];
    if (!l) continue;
    const col = colorFn ? colorFn(l, i) : tStroke();
    const st = fadeIn
      ? "position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.5s;"
      : "position:absolute;top:0;left:0;width:100%;height:100%;";
    const svg = makeSVG(l, col, st);
    if (svg) {
      el.appendChild(svg);
      if (fadeIn) requestAnimationFrame(() => (svg.style.opacity = "1"));
    }
  }
}

function tSlots(id, letters, decoded) {
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = "";
  const s = tStroke();
  letters.forEach((l, i) => {
    const el = document.createElement("div");
    el.className = "tut-slot";
    if (decoded && decoded.has(i)) {
      el.classList.add("correct");
      el.style.background = tcOf[l] || TC[i % 4];
      const svg = makeSVG(l, "#fff");
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    } else {
      const svg = makeSVG(l, s);
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    }
    c.appendChild(el);
  });
}

// ── CONFETTI ──
function tutConfetti(el) {
  const colors = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    const size = 5 + Math.random() * 7;
    p.style.cssText = `position:absolute;width:${size}px;height:${size}px;
      background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      top:50%;left:50%;pointer-events:none;z-index:999;
      animation:confPop 0.8s ease-out forwards;
      --tx:${(Math.random() - 0.5) * 120}px;--ty:${-40 - Math.random() * 80}px;
      animation-delay:${Math.random() * 0.2}s;`;
    el.style.position = "relative";
    el.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}

// ── ISO: letra por letra ──
let isoLoop = null;
function stopIso() {
  if (isoLoop) {
    clearTimeout(isoLoop);
    isoLoop = null;
  }
}

function runIso(onDone, token) {
  stopIso();
  const stack = document.getElementById("iso-stack");
  if (!stack) return;
  const lbl = document.getElementById("iso-lbl");
  const zVals = [60, 20, -20, -60]; // B O L A top→bottom
  const buildOrder = [3, 2, 1, 0]; // A L O B (bottom to top)
  const layerLabels = [
    "A — base do glifo",
    "L — terceira camada",
    "O — segunda camada",
    "B — topo do glifo",
  ];

  stack.innerHTML = "";
  stack.style.transformStyle = "preserve-3d";
  // Começa collapsed (flat) para cada layer entrar já na posição exploded
  stack.classList.remove("exploded", "collapsed");

  let idx = 0;
  function addLayer() {
    if (token && token.cancelled) return;
    const bi = buildOrder[idx],
      l = TWL[bi];
    const layer = document.createElement("div");
    layer.className = "iso-layer";
    layer.style.transformStyle = "preserve-3d";
    layer.style.setProperty("--iso-z", zVals[bi] + "px");
    layer.style.zIndex = TWL.length - bi;
    layer.style.opacity = "0";
    // Inicia sem a classe exploded → translateZ(0), então aplicamos exploded
    // e forçamos dois frames para garantir transição suave
    layer.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
    layer.style.transition = "none";
    const svg = makeSVG(l, tcOf[l]);
    if (svg) {
      svg.style.cssText = "width:90%;height:90%;";
      layer.appendChild(svg);
    }
    stack.appendChild(layer);
    if (lbl) lbl.textContent = layerLabels[idx];

    // Double-rAF: primeiro frame registra posição inicial, segundo anima
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (token && token.cancelled) return;
        layer.style.transition = "";
        layer.style.transform = `translateZ(${zVals[bi]}px) rotateX(45deg) rotateZ(-30deg)`;
        layer.style.opacity = "1";
      }),
    );

    idx++;
    if (idx < buildOrder.length) {
      isoLoop = setTimeout(addLayer, 780);
    } else {
      // Todas as layers visíveis — pausa e colapsa
      if (lbl) lbl.textContent = "Juntas formam o glifo!";
      isoLoop = setTimeout(() => {
        if (token && token.cancelled) return;
        const layers = [...stack.querySelectorAll(".iso-layer")];
        // Colapso animado: opacidade cai para ~0.08 enquanto o transform anima
        // (layers se cruzam em 3D mas ficam quase invisíveis — artefato imperceptível)
        layers.forEach((lay) => {
          lay.style.transition =
            "opacity 0.2s ease, transform 0.65s cubic-bezier(0.22,1.2,0.36,1)";
          lay.style.opacity = "0.08";
          lay.style.transform = "translateZ(0px) rotateX(0deg) rotateZ(0deg)";
        });
        // Após o transform terminar, restaura opacidade já em flat
        isoLoop = setTimeout(() => {
          if (token && token.cancelled) return;
          if (lbl) lbl.textContent = "B·O·L·A";
          layers.forEach((lay) => {
            lay.style.transition = "opacity 0.4s ease";
            lay.style.opacity = "1";
          });
          // Pausa mostrando o glifo flat, depois recomeça
          isoLoop = setTimeout(() => {
            if (token && token.cancelled) return;
            if (onDone) {
              onDone();
              return;
            }
            layers.forEach((lay) => {
              lay.style.transition = "opacity 0.3s ease";
              lay.style.opacity = "0";
            });
            isoLoop = setTimeout(() => {
              if (token && token.cancelled) return;
              runIso(null, token);
            }, 350);
          }, 2000);
        }, 700);
      }, 1000);
    }
  }
  addLayer();
}

// ── TYPING ──
let typingTimer = null;
function stopTyping() {
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
}
function startTyping(word, slotsId, yoursId, interval, onDone, token) {
  stopTyping();
  const typed = [];
  tSlots(slotsId, new Array(TWL.length).fill(""), null);
  if (yoursId) tStack(yoursId, [], null);
  let i = 0;
  function next() {
    if (token && token.cancelled) return;
    if (i < word.length) {
      typed.push(word[i++]);
      // render slots with typed so far, rest empty
      const disp = [...typed, ...new Array(TWL.length - typed.length).fill("")];
      tSlots(slotsId, disp, null);
      if (yoursId) tStack(yoursId, typed, () => tStroke());
      typingTimer = setTimeout(next, interval);
    } else if (onDone) {
      typingTimer = setTimeout(onDone, 600);
    }
  }
  typingTimer = setTimeout(next, 500);
}

// ── PULSE color on glyph ──
function pulseColor(stackId, letter, onDone) {
  tStack(stackId, TWL, () => tStroke());
  const pulses = [
    [300, tcOf[letter]],
    [700, tStroke()],
    [1050, tcOf[letter]],
  ];
  pulses.forEach(([delay, col]) => {
    tDelay(() => {
      const c = document.getElementById(stackId);
      if (!c) return;
      c.querySelectorAll("svg").forEach((svg, svgIdx) => {
        // svgIdx in DOM: last letter = index 0 (A=first in DOM since rendered bottom-up reversed)
        // TWL reversed for DOM: A=0,L=1,O=2,B=3
        const domLetter = TWL[TWL.length - 1 - svgIdx];
        if (domLetter === letter) {
          svg
            .querySelectorAll("path")
            .forEach((p) => p.setAttribute("stroke", col));
          svg.style.filter =
            col !== tStroke() ? `drop-shadow(0 0 5px ${col})` : "";
        }
      });
    }, delay);
  });
  if (onDone) tDelay(onDone, 1600);
}

// ── DISAPPEAR animation ──
function animDisappear(stackId, letter, onDone) {
  tStack(stackId, TWL, () => tStroke());
  tDelay(() => {
    const c = document.getElementById(stackId);
    if (!c) return;
    c.querySelectorAll("svg").forEach((svg, svgIdx) => {
      const domLetter = TWL[TWL.length - 1 - svgIdx];
      if (domLetter === letter) {
        svg.style.transition = "opacity 0.6s, transform 0.6s";
        svg.style.opacity = "0";
        svg.style.transform = "scale(1.2)";
        tDelay(() => {
          svg.remove();
          if (onDone) onDone();
        }, 650);
      }
    });
  }, 500);
}

// ── INTERACT (step 5) — cursor não-linear ──
let iTyped = ["", "", "", ""],
  iCursor = 0,
  iConfirmed = new Set(), // índices de slots pré-confirmados (não editáveis)
  iWrongCount = 0, // easter egg: contador de letras erradas
  tutKeyHandler = null;
let tutInteractReady = false; // set by case 2 for path C (DEDO first)

function removeTutKeyHandler() {
  if (tutKeyHandler) {
    document.removeEventListener("keydown", tutKeyHandler);
    tutKeyHandler = null;
  }
}
function installTutKeyHandler() {
  removeTutKeyHandler();
  tutKeyHandler = (e) => {
    if (iTyped.join("") === iWord) return;
    const k = e.key.toUpperCase();
    if (k === "BACKSPACE") {
      e.preventDefault();
      if (!iConfirmed.has(iCursor) && iTyped[iCursor]) {
        iTyped[iCursor] = "";
      } else if (iCursor > 0) {
        let prev = iCursor - 1;
        while (prev > 0 && iConfirmed.has(prev)) prev--;
        if (!iConfirmed.has(prev)) {
          iCursor = prev;
          iTyped[iCursor] = "";
        }
      }
      buildInteract();
    } else if (k === "ARROWLEFT") {
      let prev = iCursor - 1;
      while (prev >= 0 && iConfirmed.has(prev)) prev--;
      if (prev >= 0) {
        iCursor = prev;
        buildInteract();
      }
    } else if (k === "ARROWRIGHT") {
      let next = iCursor + 1;
      while (next <= 3 && iConfirmed.has(next)) next++;
      if (next <= 3) {
        iCursor = next;
        buildInteract();
      }
    } else if (/^[A-Z]$/.test(k)) {
      if (iConfirmed.has(iCursor)) return; // protege slot confirmado
      // Easter egg: conta letras erradas
      const expected = iLetters.map((l, i) => (iConfirmed.has(i) ? null : l));
      if (expected[iCursor] && k !== expected[iCursor]) iWrongCount++;
      iTyped[iCursor] = k;
      // Avança para o próximo slot vazio, ou o seguinte
      let next = -1;
      for (let i = iCursor + 1; i < 4; i++) {
        if (!iTyped[i]) {
          next = i;
          break;
        }
      }
      if (next === -1)
        for (let i = 0; i < 4; i++) {
          if (!iTyped[i]) {
            next = i;
            break;
          }
        }
      if (next !== -1) iCursor = next;
      buildInteract();
    }
  };
  document.addEventListener("keydown", tutKeyHandler);
}

function buildInteract() {
  const c = document.getElementById("ts5-interact");
  if (!c) return;
  c.innerHTML = "";
  const s = tStroke();
  iTyped.forEach((l, i) => {
    const el = document.createElement("div");
    el.className = "tut-slot";
    const confirmed = iConfirmed.has(i);
    el.style.cursor = confirmed ? "default" : l ? "pointer" : "text";
    el.style.transition = "box-shadow 0.12s";
    if (confirmed) {
      // Slot pré-confirmado: fundo verde, sem cursor de edição
      el.style.background = iColorOf[l];
      el.style.borderColor = "transparent";
      const svg = makeSVG(l, "#fff");
      if (svg) {
        svg.style.cssText = "width:65%;aspect-ratio:1;";
        el.appendChild(svg);
      }
    } else {
      if (i === iCursor) {
        el.style.boxShadow = "0 0 0 2px var(--amber-400)";
        el.style.background = "rgba(245,166,35,0.08)";
      }
      if (l) {
        const svg = makeSVG(l, s);
        if (svg) {
          svg.style.cssText = "width:65%;aspect-ratio:1;";
          el.appendChild(svg);
        }
      }
    }
    el.onclick = () => {
      if (!confirmed) {
        iCursor = i;
        buildInteract();
      }
    };
    c.appendChild(el);
  });
  tStack(
    "ts5-yours",
    iTyped.filter((l, i) => l && !iConfirmed.has(i)),
    () => tStroke(),
  );

  const hint = document.getElementById("ts5-hint");
  const btn = document.getElementById("tut-next-btn");
  const skipBtn = document.getElementById("tut-skip-btn");
  const solved = iTyped.join("") === iWord;
  if (solved) {
    if (hint) {
      hint.innerHTML = "";
    }
    const slots = c.querySelectorAll(".tut-slot");
    iLetters.forEach((l, i) => {
      slots[i].style.background = iColorOf[l];
      slots[i].style.borderColor = "transparent";
      slots[i].style.boxShadow = "";
      const sv = slots[i].querySelector("svg");
      if (sv)
        sv.querySelectorAll("path").forEach((p) =>
          p.setAttribute("stroke", "#fff"),
        );
    });
    tStack("ts5-yours", iLetters, (l) => iColorOf[l], true);
    tutConfetti(c);
    const title6 = document.getElementById("ts6-title");
    if (title6) {
      title6.style.cssText =
        "transition:opacity 0.3s;opacity:0;text-align:center;font-size:0.9rem;font-weight:700;color:var(--text);";
      title6.style.display = "";
      setTimeout(() => {
        title6.innerHTML = `🎉 <strong style="color:var(--amber-400)">${iWord}!</strong> Agora você sabe jogar!`;
        title6.style.opacity = "1";
      }, 350);
    }
    removeTutKeyHandler();
    const scards = document.getElementById("ts5-scards");
    if (scards) {
      scards.style.pointerEvents = "auto";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (scards.style.opacity = "1")),
      );
    }
    if (typeof onTutSolved === "function") {
      const cb = onTutSolved;
      onTutSolved = null;
      cb();
    }
  } else {
    const filled = iTyped.filter(Boolean).length;
    if (hint) {
      if (iWrongCount >= 2) {
        hint.innerHTML =
          "😂 se você não acerta nem esses, não perde seu tempo jogando não...";
      } else {
        hint.textContent =
          filled === 0
            ? "ontouchstart" in window
              ? "Toque num slot e comece a digitar"
              : "Clique num slot e comece a digitar"
            : `${filled}/4 letras — forme ${iWord}`;
      }
      hint.style.color = "var(--text3)";
    }
    if (iWrongCount >= 2) {
      if (typeof onTutGiveUp === "function") {
        const cb = onTutGiveUp;
        onTutGiveUp = null;
        cb();
      }
    }
  }
}

// ── STEP 3 helper: insere item no TOPO do container com animação max-height ──
function ts3Prepend(container, dotStyle, innerHtml) {
  const item = document.createElement("div");
  item.className = "tut-result-item";
  item.style.cssText =
    "max-height:0;overflow:hidden;opacity:0;transition:max-height 0.45s ease,opacity 0.45s ease;";
  item.innerHTML = `<div class="tut-result-dot" style="${dotStyle}"></div><div>${innerHtml}</div>`;
  container.insertBefore(item, container.firstChild);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      item.style.maxHeight = "120px";
      item.style.opacity = "1";
    }),
  );
  return item;
}

// ── STEP RENDERER ──
// ── Chat helpers (outer scope so sadGoodbye can also use them) ──
function scrollFeed() {
  const feed = document.getElementById("tut-chat-feed");
  requestAnimationFrame(() => {
    if (feed) feed.scrollTop = feed.scrollHeight;
  });
}
// Estimates how long a message takes to read (extra delay before next message).
// Returns 0–1000ms proportional to text length beyond a 30-char baseline.
function readDelay(html) {
  const len = html.replace(/<[^>]+>/g, "").length;
  return Math.max(0, Math.min(len * 20 - 600, 1000));
}

// Splits the text content of `el` into 2–4 visible chunks that reveal
// sequentially every 230ms, giving a "streaming" reading feel.
// Operates on innerHTML so inline HTML tags (strong, a, s…) are preserved.
function revealInChunks(el) {
  const text = el.textContent || "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 3) return; // short message — show immediately
  const n = Math.max(2, Math.min(4, Math.ceil(words.length / 6)));
  const breakAt = new Set();
  const wpc = Math.ceil(words.length / n);
  for (let i = wpc; i < words.length; i += wpc) {
    if (breakAt.size < n - 1) breakAt.add(i);
  }
  // Walk raw innerHTML char-by-char; insert span boundaries between words
  const raw = el.innerHTML;
  let result = '<span class="tut-chunk">';
  let inTag = false,
    inWord = false,
    wordIdx = 0;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === "<") {
      inTag = true;
      result += c;
      continue;
    }
    if (c === ">") {
      inTag = false;
      result += c;
      continue;
    }
    if (inTag) {
      result += c;
      continue;
    }
    const isSpace = c === " " || c === "\n" || c === "\t";
    if (!isSpace && !inWord) {
      inWord = true;
      if (breakAt.has(wordIdx)) {
        result += '</span><span class="tut-chunk">';
      }
    } else if (isSpace && inWord) {
      inWord = false;
      wordIdx++;
    }
    result += c;
  }
  result += "</span>";
  el.innerHTML = result;
  el.querySelectorAll(".tut-chunk").forEach((s, i) => {
    const t = setTimeout(() => s.classList.add("show"), i * 230);
    tutTimers.push(t);
  });
}

// Shows typing indicator at `showDelay`, then atomically replaces it with a message bubble at `msgDelay`.
// Returns the indicator id so callers can optionally replace it manually (pass msgHtml=null to skip).
function chatTypingThenMsg(id, showDelay, msgHtml, msgDelay, token) {
  tDelay(() => {
    if (token && token.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    // Reuse any existing typing indicator (e.g. decodingEl from glyph phase)
    const existing = feed.querySelector(".tut-typing:not([id])");
    if (existing) {
      existing.id = id;
      return; // already visible — just tag it and move on
    }
    const el = document.createElement("div");
    el.id = id;
    el.className = "tut-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(el);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.classList.add("show");
        scrollFeed();
        setTimeout(scrollFeed, 200);
      }),
    );
  }, showDelay);
  if (msgHtml != null) {
    tDelay(() => {
      if (token && token.cancelled) return;
      const feed = document.getElementById("tut-chat-feed");
      if (!feed) return;
      const indicator = document.getElementById(id);
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = msgHtml;
      if (indicator) {
        feed.replaceChild(div, indicator);
      } else {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
          revealInChunks(div);
        }),
      );
    }, msgDelay);
  }
}
function chatMsg(html, delay) {
  const TYPING_LEAD = 600; // show indicator this many ms before message appears
  let typingEl = null;

  const appendTyping = (feed) => {
    if (typingEl) return;
    // Reuse any typing indicator already in the feed (e.g. decodingEl from glyph phase)
    const existing = feed.querySelector(".tut-typing");
    if (existing) {
      typingEl = existing;
      return;
    }
    typingEl = document.createElement("div");
    typingEl.className = "tut-typing";
    typingEl.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(typingEl);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (typingEl) typingEl.classList.add("show");
        scrollFeed();
      }),
    );
  };

  // Pre-show typing indicator TYPING_LEAD ms before the message is due
  if (delay > TYPING_LEAD) {
    tDelay(() => {
      if (currentActionToken && currentActionToken.cancelled) return;
      const feed = document.getElementById("tut-chat-feed");
      if (feed) appendTyping(feed);
    }, delay - TYPING_LEAD);
  }

  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    // Extra wait if previous message was long and the user may not have finished reading
    const extra = Math.max(0, _chatLastAt + _chatLastReadMs - Date.now());
    // If we're about to wait extra and have no indicator yet, show one now
    if (!typingEl && extra > 300) appendTyping(feed);
    const doShow = () => {
      _chatLastAt = Date.now();
      _chatLastReadMs = readDelay(html);
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = html;
      if (typingEl && typingEl.parentNode) {
        feed.replaceChild(div, typingEl);
        typingEl = null;
      } else {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
          revealInChunks(div);
        }),
      );
    };
    if (extra > 50) {
      const t = setTimeout(doShow, extra);
      tutTimers.push(t);
    } else {
      doShow();
    }
  }, delay);
}
// Insere bolha do usuário de forma síncrona (não depende de token)
// e chama cb após 400ms — evita que tClear()/newToken() no onClick cancele a UI.
function chatUserNow(text, cb) {
  const feed = document.getElementById("tut-chat-feed");
  if (!feed) {
    if (cb) setTimeout(cb, 400);
    return;
  }
  const div = document.createElement("div");
  div.className = "tut-bubble-right";
  div.textContent = text;
  feed.appendChild(div);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      div.classList.add("show");
      scrollFeed();
    }),
  );
  if (cb) {
    const t = setTimeout(cb, 400);
    tutTimers.push(t); // track so tClear() can cancel on close/reopen
  }
}

function chatUser(text, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const div = document.createElement("div");
    div.className = "tut-bubble-right";
    div.textContent = text;
    feed.appendChild(div);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        div.classList.add("show");
        scrollFeed();
      }),
    );
  }, delay);
}
function chatCard(buildFn, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const card = document.createElement("div");
    card.className = "tut-chat-card";
    buildFn(card);
    feed.appendChild(card);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        card.classList.add("show");
        scrollFeed();
      }),
    );
  }, delay);
}

// ── Tutorial State Machine ────────────────────────────────────────────
const TUT = {
  // Current state id. Set via TUT.setState() before calling chatChoices().
  // States: 'idle' | 's0_question' | 's0_yes_branch' | 's0_no_branch'
  //       | 'sad_walk' | 'comeback'
  //       | 'step_1' | 'step_2' | ... | 'step_6' | 'done'
  state: "idle",

  // Holds the active choices row + array so free-input can re-ask them.
  data: { currentChoices: null, currentRow: null },

  setState(id, extraData) {
    this.state = id;
    if (extraData) Object.assign(this.data, extraData);
  },

  // Called by the hijack whenever the user "sends" something.
  // Override behaviour per-state; default: dismiss + re-ask same choices.
  // Set _freeInputOverride to replace for a specific state (e.g. comeback/bajulador).
  _freeInputOverride: null,

  freeInput(typed) {
    if (this._freeInputOverride) {
      this._freeInputOverride(typed);
      return;
    }
    // 'comeback' has its own bajulador hijack installed by showByeInput()
    // so this path is only reached for all other waiting states.
    const { currentChoices, currentRow } = this.data;
    if (!currentChoices) return;
    if (currentRow && currentRow.parentNode) currentRow.remove();
    tClear();
    newToken();
    chatUser(typed, 0);
    const DISMISS = [
      "Ok, qualquer coisa vou avisando... \uD83D\uDC4D",
      "T\u00E1 bom, sem press\u00E3o! \uD83D\uDE05",
      "Entendido, pode deixar \uD83D\uDC40",
      "Ah tudo bem, sem compromisso \uD83D\uDE0C",
      "Certo, certo... \uD83E\uDD14",
      "Hmm, ok \uD83D\uDE10",
      "Anotado \uD83D\uDCDD",
      "Tudo bem, relaxa \uD83D\uDE4F",
      "Ok ok, sem prob \uD83D\uDE0E",
      "Combinado \uD83E\uDD1D",
    ];
    const REASK = [
      "...mas voc\u00EA j\u00E1 jogou o Termo ou n\u00E3o? \uD83D\uDE05",
      "Ah espera \u2014 voc\u00EA jogou o Termo ou n\u00E3o?",
      "Ok mas me responde isso: j\u00E1 jogou ou n\u00E3o jogou?",
      "...s\u00F3 preciso saber: Termo sim ou Termo n\u00E3o? \uD83E\uDD13",
      "Mas espera, voc\u00EA conhece o Termo?",
      "Ei, ainda n\u00E3o me respondeu: j\u00E1 jogou Termo? \uD83D\uDC40",
      "Uma coisa s\u00F3: j\u00E1 jogou o Termo alguma vez?",
      "Antes de continuar \u2014 Termo: sim ou n\u00E3o? \uD83D\uDE05",
    ];
    chatMsg(DISMISS[Math.floor(Math.random() * DISMISS.length)], 800);
    tDelay(() => {
      if (currentActionToken && currentActionToken.cancelled) return;
      chatMsg(REASK[Math.floor(Math.random() * REASK.length)], 0);
      chatChoices(currentChoices, 600);
    }, 2000);
  },
};
// ─────────────────────────────────────────────────────────────────────

function chatSetChoices(choices) {
  const feed = document.getElementById("tut-chat-feed");
  const choicesEl = document.getElementById("tut-chat-choices");
  if (!feed || !choicesEl) return;
  choicesEl.innerHTML = "";
  const row = document.createElement("div");
  row.className = "tut-choices";
  choices.forEach(({ label, secondary, onClick }) => {
    const b = document.createElement("button");
    b.className = "tut-choice-btn" + (secondary ? " secondary" : "");
    b.textContent = label;
    b.onclick = () => {
      row.querySelectorAll("button").forEach((x) => (x.disabled = true));
      row.remove();
      TUT.data.currentRow = null;
      const _fs = document.getElementById("tut-bye-send");
      if (_fs) {
        _fs.classList.add("thinking");
        _fs.disabled = true;
        _fs.classList.remove("ready");
      }
      chatUserNow(b.textContent, onClick);
    };
    row.appendChild(b);
  });
  feed.appendChild(row);

  function onChoicesReady() {
    // Store for re-ask on free-input
    TUT.data.currentChoices = choices;
    TUT.data.currentRow = row;
    const _fs = document.getElementById("tut-bye-send");
    if (_fs) {
      _fs.classList.remove("thinking");
    }
    // Install hijack: delegate to state machine
    _installHijack((typed) => TUT.freeInput(typed));
  }

  if (window.anime) {
    row.style.opacity = "1";
    row.style.transform = "none";
    const btns = row.querySelectorAll(".tut-choice-btn");
    btns.forEach((b) => {
      b.style.opacity = "0";
    });
    anime({
      targets: btns,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(80, { start: 50 }),
      duration: 360,
      easing: "easeOutBack",
      begin: () => scrollFeed(),
      complete: () => onChoicesReady(),
    });
  } else {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        row.classList.add("show");
        scrollFeed();
        onChoicesReady();
      }),
    );
  }
}
function chatChoices(choices, delay) {
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    chatSetChoices(choices);
  }, delay);
}

function renderStep(step, noClear) {
  tClear();
  stopTyping();
  removeTutKeyHandler();
  stopIso();
  const token = newToken();

  const feed = document.getElementById("tut-chat-feed");
  const choicesEl = document.getElementById("tut-chat-choices");
  if (!feed || !choicesEl) return;

  const _byeWrap = document.getElementById("tut-bye-input-wrap");
  if (_byeWrap) {
    TUT._freeInputOverride = null;
    const _i = _byeWrap.querySelector(".tut-fake-input");
    const _s = _byeWrap.querySelector(".tut-fake-send");
    if (_i) {
      _i.value = "";
      _i.style.height = "auto";
    }
    if (_s) {
      _s.disabled = true;
      _s.classList.remove("ready");
      _s.classList.add("thinking");
    }
  }

  if (!noClear) {
    const old = document.getElementById("ts0-arrow-overlay");
    if (old) {
      if (old._cleanup) old._cleanup();
      old.remove();
    }
    feed.innerHTML = "";
  }
  choicesEl.innerHTML = "";

  function makeGlyphPanel(label) {
    const panel = document.createElement("div");
    panel.className = "tut-glyph-panel";
    const lbl = document.createElement("div");
    lbl.className = "tut-glyph-label";
    lbl.textContent = label;
    const stage = document.createElement("div");
    stage.className = "tut-gstage";
    const stack = document.createElement("div");
    stack.className = "tut-gstack";
    stage.appendChild(stack);
    panel.appendChild(lbl);
    panel.appendChild(stage);
    return { panel, stack };
  }
  function makeGlyphSingle(label, width) {
    const wrap = document.createElement("div");
    wrap.className = "tut-glyph-single";
    wrap.style.width = width || "200px";
    const lbl = document.createElement("div");
    lbl.className = "tut-glyph-label";
    lbl.textContent = label;
    const stage = document.createElement("div");
    stage.className = "tut-gstage";
    const stack = document.createElement("div");
    stack.className = "tut-gstack";
    stage.appendChild(stack);
    wrap.appendChild(lbl);
    wrap.appendChild(stage);
    return { wrap, stack };
  }
  function makeDemoRow(word, certas, encontradas) {
    const row = document.createElement("div");
    row.className = "hrow";
    const wc = document.createElement("div");
    wc.className = "hw";
    wc.textContent = word;
    const dc = document.createElement("div");
    dc.className = "dcell";
    certas.forEach((l) => {
      const d = document.createElement("div");
      d.className = "hdot";
      d.style.background = tdOf[l];
      dc.appendChild(d);
    });
    const fc = document.createElement("div");
    fc.className = "dcell";
    encontradas.forEach((l) => {
      const d = document.createElement("div");
      d.className = "hdot";
      d.style.background = tdOf[l];
      fc.appendChild(d);
    });
    row.appendChild(wc);
    row.appendChild(dc);
    row.appendChild(fc);
    return row;
  }

  // ── Helpers reutilizados nos desfechos ───────────────────────────
  function buildSummaryCards(card) {
    card.style.cssText += "background:transparent;border:none;padding:4px 0;";
    const scards = document.createElement("div");
    scards.className = "tut-summary-cards";
    scards.innerHTML =
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83C\uDFAF</div><div class="tut-scard-text">4 TENTATIVAS por jogo</div></div>' +
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83D\uDCC5</div><div class="tut-scard-text">1 PALAVRA POR DIA</div></div>' +
      '<div class="tut-scard"><div class="tut-scard-icon">\uD83D\uDD11</div><div class="tut-scard-text">1 CHAVE por tentativa para revelar uma letra</div></div>';
    card.appendChild(scards);
  }
  function chatFinale(afterWin, cardsDelay, btnDelay, verDeNovoMsgOverride) {
    chatCard(buildSummaryCards, cardsDelay);
    tDelay(() => {
      if (token.cancelled) return;
      const verDeNovoMsg =
        verDeNovoMsgOverride ||
        (afterWin
          ? "Você gabaritou e ainda quer ver de novo?! \uD83E\uDD26"
          : "Você não vai com a minha cara? \uD83D\uDE24");
      chatChoices(
        [
          {
            label: "Jogar agora! \uD83C\uDFAE",
            onClick: () => closeTutorial(),
          },
          {
            label: "Ver de novo \uD83D\uDD01",
            secondary: true,
            onClick: () => {
              tClear();
              chatMsg(verDeNovoMsg, 0);
              tDelay(() => {
                closeTutorial();
                setTimeout(() => openTutorial(), 400);
              }, 1800);
            },
          },
        ],
        0,
      );
    }, btnDelay);
  }

  switch (step) {
    case 0: {
      chatMsg(
        "Bem-vindo ao <strong style='color:var(--amber-400)'>Gliffo</strong>! \uD83D\uDC4B",
        200,
      );
      let boardCardEl = null;
      chatCard((card) => {
        boardCardEl = card;
        card.style.cssText +=
          "background:#121213;border-color:var(--border2);align-self:center;display:inline-flex;flex-direction:column;align-items:center;gap:3px;padding:8px 10px 10px;";
        const lbl = document.createElement("div");
        lbl.style.cssText =
          "font-size:0.58rem;font-weight:700;letter-spacing:0.14em;color:#818384;margin-bottom:4px;";
        lbl.textContent = "TERMO";
        card.appendChild(lbl);
        const termoData = [
          [
            ["P", "#3a3a3c"],
            ["I", "#3a3a3c"],
            ["N", "#3a3a3c"],
            ["G", "#b59f3b"],
            ["O", "#538d4e"],
          ],
          [
            ["T", "#b59f3b"],
            ["O", "#538d4e"],
            ["R", "#3a3a3c"],
            ["S", "#b59f3b"],
            ["O", "#538d4e"],
          ],
          [
            ["G", "#538d4e"],
            ["O", "#538d4e"],
            ["S", "#538d4e"],
            ["T", "#538d4e"],
            ["O", "#538d4e"],
          ],
        ];
        const allCells = [];
        termoData.forEach((row) => {
          const rowEl = document.createElement("div");
          rowEl.className = "tut-termo-row";
          row.forEach(([letter, bg]) => {
            const cell = document.createElement("div");
            cell.className = "tut-termo-cell";
            cell.style.cssText =
              "background:#3a3a3c;transform:scaleY(0);transition:transform 0.18s ease-in;";
            cell.dataset.bg = bg;
            cell.dataset.letter = letter;
            rowEl.appendChild(cell);
            allCells.push(cell);
          });
          card.appendChild(rowEl);
        });
        allCells.forEach((cell, idx) => {
          tDelay(
            () => {
              if (token.cancelled) return;
              cell.style.transition = "transform 0.16s ease-in";
              cell.style.transform = "scaleY(0)";
              setTimeout(() => {
                cell.style.background = cell.dataset.bg;
                cell.textContent = cell.dataset.letter;
                cell.style.transition = "transform 0.16s ease-out";
                cell.style.transform = "scaleY(1)";
              }, 160);
            },
            400 + Math.floor(idx / 5) * 700 + (idx % 5) * 60,
          );
        });
      }, 1200);
      chatMsg("J\u00E1 jogou o <strong>Termo</strong>?", 4100);
      tDelay(() => {
        if (token.cancelled || !boardCardEl) return;
        const bubbles = feed.querySelectorAll(".tut-bubble-left");
        const qBubble = bubbles[bubbles.length - 1];
        if (!qBubble) return;

        const ns = "http://www.w3.org/2000/svg";
        const svgEl = document.createElementNS(ns, "svg");
        svgEl.id = "ts0-arrow-overlay";
        svgEl.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:10;overflow:visible;";
        const mainPath = document.createElementNS(ns, "path");
        mainPath.setAttribute("fill", "none");
        mainPath.setAttribute("stroke", "#e879b9");
        mainPath.setAttribute("stroke-width", "2.5");
        mainPath.setAttribute("stroke-linecap", "round");
        const headPath = document.createElementNS(ns, "path");
        headPath.setAttribute("fill", "none");
        headPath.setAttribute("stroke", "#e879b9");
        headPath.setAttribute("stroke-width", "2.5");
        headPath.setAttribute("stroke-linecap", "round");
        svgEl.appendChild(mainPath);
        svgEl.appendChild(headPath);
        const overlayEl = document.querySelector(".tutorial-overlay");
        (overlayEl || document.body).appendChild(svgEl);

        const ah = 11;
        function updateArrowPaths() {
          const br = qBubble.getBoundingClientRect();
          const cr = boardCardEl.getBoundingClientRect();
          const fr = feed.getBoundingClientRect();
          // Esconde se o card saiu da área visível do feed
          if (cr.bottom < fr.top || cr.top > fr.bottom) {
            svgEl.style.opacity = "0";
            return 0;
          }
          svgEl.style.opacity = "1";
          const sx = br.right + 8;
          const sy = br.top + br.height * 0.45;
          const ex = cr.left + cr.width / 2;
          const ey = cr.bottom + 10;
          const cp1x = sx + 38,
            cp1y = sy;
          const cp2x = ex,
            cp2y = ey + 50;
          const tx = ex - cp2x,
            ty = ey - cp2y;
          const tang = Math.atan2(ty, tx);
          const a1 = tang + Math.PI + 0.4;
          const a2 = tang + Math.PI - 0.4;
          mainPath.setAttribute(
            "d",
            `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`,
          );
          headPath.setAttribute(
            "d",
            `M ${ex} ${ey} L ${ex + ah * Math.cos(a1)} ${ey + ah * Math.sin(a1)} M ${ex} ${ey} L ${ex + ah * Math.cos(a2)} ${ey + ah * Math.sin(a2)}`,
          );
          return Math.round(mainPath.getTotalLength());
        }

        // Initial draw with animation
        const pLen = updateArrowPaths();
        const hLen = Math.round(headPath.getTotalLength());
        mainPath.style.cssText = `stroke-dasharray:${pLen};stroke-dashoffset:${pLen};animation:ts0DrawPath 0.8s cubic-bezier(0.4,0,0.3,1) 0.05s forwards;`;
        headPath.style.cssText = `stroke-dasharray:${hLen};stroke-dashoffset:${hLen};animation:ts0DrawPath 0.25s ease-out 0.75s forwards;`;

        // After animation ends, track scroll to keep arrow aligned
        setTimeout(() => {
          mainPath.style.cssText = "";
          headPath.style.cssText = "";
          updateArrowPaths();
          feed.addEventListener("scroll", updateArrowPaths);
          svgEl._cleanup = () =>
            feed.removeEventListener("scroll", updateArrowPaths);
        }, 1100);
      }, 4250);
      TUT.setState("s0_question");
      chatChoices(
        [
          {
            label: "Sim, joguei bastante!",
            onClick: () => {
              chatMsg(
                "\u00D3timo! O Gliffo tem a mesma ideia \u2014 adivinhar a palavra do dia.",
                700,
              );
              chatMsg(
                "S\u00F3 que aqui a resposta j\u00E1 est\u00E1 na tela, codificada como um <strong>glifo</strong>. Um pouco mais <s>dif\u00EDcil</s> desafiador \uD83D\uDE08",
                1500,
              );
              chatMsg("Deixa eu te mostrar como funciona!", 2300);
              TUT.setState("s0_yes_branch");
              chatChoices(
                [
                  {
                    label: "Quero ver! \uD83C\uDFA8",
                    onClick: () => tutNext(),
                  },
                  {
                    label: "Parece complicado... vou sair!",
                    secondary: true,
                    onClick: () => sadGoodbye(),
                  },
                ],
                3100,
              );
            },
          },
          {
            label: "Nunca ouvi falar",
            secondary: true,
            onClick: () => {
              chatMsg(
                '<a href="https://term.ooo" target="_blank" rel="noopener">Termo</a> \u00E9 um jogo de adivinhar palavras \u2014 voc\u00EA v\u00EA s\u00F3 as cores das respostas para chegar na solu\u00E7\u00E3o.',
                700,
              );
              chatMsg(
                "Gliffo faz (quase) o mesmo. Aqui temos que decifrar os desenhos que as letras formam!",
                1500,
              );
              TUT.setState("s0_no_branch");
              chatChoices(
                [
                  {
                    label: "Quero tentar! \uD83C\uDFA8",
                    onClick: () => tutNext(),
                  },
                  {
                    label: "Parece complicado... vou sair!",
                    secondary: true,
                    onClick: () => sadGoodbye(),
                  },
                ],
                2600,
              );
            },
          },
        ],
        5500,
      );
      break;
    }

    case 1: {
      TUT.setState("step_1");
      chatMsg("Cada letra tem um glifo único. Veja a palavra BOLA!", 200);

      // perspWrap → wordRow (preserve-3d) → wrappers (preserve-3d, só SVG transparente)
      let perspWrap, wordRow, cardRef;
      const tileWrappers = []; // outer wrappers (rotateY counter)
      const tileData = []; // { wrapOuter, svgEl, letter } para colorir depois

      // Tile size: 96px capped so 4 tiles + 3 gaps fit across the panel width
      const _panelW = Math.min(480, window.innerWidth) - 64; // ~32px feed pad + 32px card pad
      const TILE_SZ = Math.floor(Math.min(96, (_panelW - 30) / 4)); // 30 = 3 * 10px gaps

      chatCard((card) => {
        cardRef = card;
        card.style.overflow = "visible";
        card.style.cssText +=
          "display:flex;flex-direction:column;gap:10px;align-items:center;justify-content:center;padding:22px 10px;";

        // Perspectiva 3D — será usado no flip
        perspWrap = document.createElement("div");
        perspWrap.style.cssText =
          "perspective:700px;perspective-origin:50% 50%;width:calc(100% + 20px);margin:0 -10px;display:flex;justify-content:center;overflow:visible;";

        wordRow = document.createElement("div");
        wordRow.style.cssText =
          "display:flex;justify-content:center;gap:10px;transform-style:preserve-3d;will-change:transform;";
        perspWrap.appendChild(wordRow);
        card.appendChild(perspWrap);
      }, 1200);

      // Tiles 3D — aparecem um a um com camadas de extrusão
      TWL.forEach((l, i) => {
        tDelay(
          () => {
            if (token.cancelled || !wordRow) return;

            // Wrapper transparente — só SVG, sem fundo nem extrusão
            const wrapOuter = document.createElement("div");
            wrapOuter.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;display:flex;align-items:center;justify-content:center;transform-style:preserve-3d;`;

            const svg = makeSVG(l, tStroke());
            if (svg) {
              svg.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;flex-shrink:0;`;
              wrapOuter.appendChild(svg);
            }
            const tl = null; // sem label

            tileWrappers.push(wrapOuter);
            tileData.push({
              wrapOuter,
              svgEl: svg,
              label: tl,
              letter: l,
            });
            wordRow.appendChild(wrapOuter);
            // Entrada fluída: surge de cima com pop de escala
            anime.set(wrapOuter, {
              opacity: 0,
              translateY: -14,
              scale: 0.65,
            });
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                anime({
                  targets: wrapOuter,
                  opacity: 1,
                  translateY: 0,
                  scale: 1,
                  duration: 480,
                  easing: "easeOutBack",
                });
              }),
            );
            scrollFeed();
          },
          1400 + i * 320,
        );
      });

      const allIn1 = 1400 + TWL.length * 320;
      chatMsg("Para entender melhor... Vamos juntar as letras!", allIn1 + 400);

      tDelay(() => {
        if (token.cancelled) return;
        chatChoices([
          {
            label: "Juntar as letras \uD83E\uDDE9",
            onClick: () => {
              if (!wordRow || !window.anime) {
                // Fallback sem anime — pula animação e segue
                scrollFeed();
                newToken();
                chatChoices(
                  [
                    {
                      label: "Entendi! \u2192",
                      onClick: () => tutNext(),
                    },
                  ],
                  600,
                );
                return;
              }

              // ── FASE 0: colorir as letras uma a uma (scale pop)
              const N = tileWrappers.length;
              const wordRowOrigStyle =
                "display:flex;justify-content:center;gap:10px;transform-style:preserve-3d;will-change:transform;";
              const perspWrapOrigStyle =
                "perspective:700px;perspective-origin:50% 50%;width:calc(100% + 20px);margin:0 -10px;display:flex;justify-content:center;overflow:visible;";
              let activeSplitRow = null;
              let phaseRan = false;
              let replayCount = 0;

              const runPhases = () => {
                const doRun = () => {
                  if (perspWrap.parentNode !== cardRef) {
                    cardRef.insertBefore(perspWrap, cardRef.firstChild);
                  }
                  wordRow.style.cssText = wordRowOrigStyle;
                  perspWrap.style.cssText = perspWrapOrigStyle;
                  tileWrappers.forEach((w) => {
                    w.style.position = "";
                    w.style.top = "";
                    w.style.left = "";
                    w.style.width = TILE_SZ + "px";
                    w.style.height = TILE_SZ + "px";
                    w.style.transform = "";
                    w.style.opacity = phaseRan ? "0" : "1";
                  });
                  anime.set(tileWrappers, { translateX: 0, rotateY: 0 });
                  anime.set([wordRow], { rotateY: 0 });

                  const rowCenterX = wordRow.offsetWidth / 2;
                  const targetTX = tileWrappers.map(
                    (el) => rowCenterX - (el.offsetLeft + el.offsetWidth / 2),
                  );
                  tileWrappers.forEach((w, idx) => {
                    w.style.zIndex = String(tileWrappers.length - idx);
                  });
                  if (phaseRan) {
                    anime({
                      targets: tileWrappers,
                      opacity: 1,
                      duration: 400,
                      delay: anime.stagger(60),
                      easing: "easeOutQuad",
                      complete: () =>
                        setTimeout(() => runAnimation(targetTX), 600),
                    });
                  } else {
                    runAnimation(targetTX);
                  }
                };

                // Reset: fade out o splitRow atual antes de reconstruir
                if (activeSplitRow && activeSplitRow.parentNode) {
                  anime({
                    targets: activeSplitRow,
                    opacity: 0,
                    duration: 350,
                    easing: "easeInQuad",
                    complete: () => {
                      if (activeSplitRow && activeSplitRow.parentNode)
                        activeSplitRow.parentNode.removeChild(activeSplitRow);
                      activeSplitRow = null;
                      doRun();
                    },
                  });
                } else {
                  doRun();
                }
              };

              const runAnimation = (targetTX) => {
                // ── FASE 1: afasta as letras
                anime({
                  targets: tileWrappers,
                  translateX: (el, i) => (i - (N - 1) / 2) * 52,
                  duration: 700,
                  easing: "easeOutCubic",
                  complete: () => {
                    // ── FASE 2: billboard
                    anime({
                      targets: wordRow,
                      rotateY: 90,
                      duration: 2200,
                      easing: "easeInOutQuad",
                    });
                    anime({
                      targets: tileWrappers,
                      rotateY: -90,
                      duration: 2200,
                      easing: "easeInOutQuad",
                      complete: () => {
                        // ── FASE 3a: convergem
                        anime({
                          targets: tileWrappers,
                          translateX: (el, i) => targetTX[i],
                          duration: 900,
                          easing: "easeInOutQuad",
                          complete: () => {
                            // ── FASE 3b: desfaz rotação
                            anime({
                              targets: wordRow,
                              rotateY: 0,
                              duration: 900,
                              easing: "easeInOutSine",
                            });
                            anime({
                              targets: tileWrappers,
                              rotateY: 0,
                              duration: 900,
                              easing: "easeInOutSine",
                              complete: () => {
                                scrollFeed();

                                // ── SPLIT
                                setTimeout(() => {
                                  if (!cardRef) return;
                                  wordRow.style.cssText = `position:relative;width:${TILE_SZ}px;height:${TILE_SZ}px;transform-style:preserve-3d;`;
                                  tileWrappers.forEach((w) => {
                                    w.style.position = "absolute";
                                    w.style.top = "0";
                                    w.style.left = "0";
                                    w.style.width = TILE_SZ + "px";
                                    w.style.height = TILE_SZ + "px";
                                    w.style.transform = "none";
                                  });
                                  perspWrap.style.cssText =
                                    "perspective:700px;perspective-origin:50% 50%;flex-shrink:0;";

                                  const splitRow =
                                    document.createElement("div");
                                  activeSplitRow = splitRow;
                                  splitRow.style.cssText = `position:relative;display:flex;justify-content:center;align-items:center;width:100%;height:${TILE_SZ}px;`;

                                  const leftCol = document.createElement("div");
                                  leftCol.style.cssText =
                                    "position:absolute;display:flex;align-items:center;";
                                  cardRef.removeChild(perspWrap);
                                  leftCol.appendChild(perspWrap);

                                  const rightCol =
                                    document.createElement("div");
                                  rightCol.style.cssText =
                                    "position:absolute;display:flex;align-items:center;";
                                  const rightStack =
                                    document.createElement("div");
                                  rightStack.style.cssText = `position:relative;width:${TILE_SZ}px;height:${TILE_SZ}px;`;
                                  tileData.forEach(({ letter }) => {
                                    const s = makeSVG(letter, tStroke());
                                    if (s) {
                                      s.style.cssText = `width:${TILE_SZ}px;height:${TILE_SZ}px;position:absolute;top:0;left:0;`;
                                      rightStack.appendChild(s);
                                    }
                                  });
                                  rightCol.appendChild(rightStack);

                                  // Botão replay
                                  const replayBtn =
                                    document.createElement("button");
                                  replayBtn.innerHTML = "&#8635;";
                                  replayBtn.title = "Repetir animação";
                                  replayBtn.style.cssText =
                                    "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:34px;height:34px;border:1px solid var(--border);background:var(--surface);color:var(--text3);border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;z-index:10;transition:background 0.2s,color 0.2s;opacity:0;pointer-events:none;";
                                  splitRow.appendChild(replayBtn);
                                  splitRow.appendChild(rightCol);
                                  splitRow.appendChild(leftCol);
                                  cardRef.insertBefore(
                                    splitRow,
                                    cardRef.firstChild,
                                  );

                                  requestAnimationFrame(() =>
                                    requestAnimationFrame(() => {
                                      anime({
                                        targets: leftCol,
                                        translateX: -62,
                                        duration: 700,
                                        easing: "easeOutCubic",
                                      });
                                      anime({
                                        targets: rightCol,
                                        translateX: 62,
                                        duration: 700,
                                        easing: "easeOutCubic",
                                        complete: () => {
                                          // Mostra o botão replay no centro após split
                                          anime({
                                            targets: replayBtn,
                                            opacity: 1,
                                            duration: 300,
                                            easing: "easeOutQuad",
                                          });
                                          replayBtn.style.pointerEvents =
                                            "auto";
                                          replayBtn.addEventListener(
                                            "mouseover",
                                            () => {
                                              replayBtn.style.background =
                                                "var(--surface2)";
                                              replayBtn.style.color =
                                                "var(--text1)";
                                            },
                                          );
                                          replayBtn.addEventListener(
                                            "mouseout",
                                            () => {
                                              replayBtn.style.background =
                                                "var(--surface)";
                                              replayBtn.style.color =
                                                "var(--text3)";
                                            },
                                          );
                                          replayBtn.addEventListener(
                                            "click",
                                            () => {
                                              replayCount++;
                                              if (replayCount >= 3) {
                                                replayBtn.innerHTML =
                                                  "\uD83D\uDE2C";
                                                replayBtn.title =
                                                  "T\u00e1, pode parar...";
                                              }
                                              runPhases();
                                            },
                                          );
                                          if (!phaseRan) {
                                            phaseRan = true;
                                            scrollFeed();
                                            chatMsg(
                                              "Todas as letras empilhadas formam o glifo da palavra.",
                                              200,
                                            );
                                            chatMsg(
                                              "A ordem importa: BOLA \u2260 LOBA.",
                                              1200,
                                            );
                                            // Card comparativo BOLA vs LOBA
                                            chatCard((card) => {
                                              card.style.cssText +=
                                                "display:flex;justify-content:center;gap:20px;align-items:center;padding:12px;";
                                              [
                                                ["BOLA", ["B", "O", "L", "A"]],
                                                ["LOBA", ["L", "O", "B", "A"]],
                                              ].forEach(([word, letters]) => {
                                                const col =
                                                  document.createElement("div");
                                                col.style.cssText =
                                                  "display:flex;flex-direction:column;align-items:center;gap:6px;";
                                                const lbl =
                                                  document.createElement("div");
                                                lbl.textContent = word;
                                                lbl.style.cssText =
                                                  "font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:var(--text3);";
                                                const stack =
                                                  document.createElement("div");
                                                stack.style.cssText =
                                                  "position:relative;width:96px;height:96px;";
                                                // empilhar de trás para frente (última letra = base)
                                                [...letters]
                                                  .reverse()
                                                  .forEach((l) => {
                                                    const s = makeSVG(
                                                      l,
                                                      tcOf[l],
                                                    );
                                                    if (s) {
                                                      s.style.cssText =
                                                        "width:96px;height:96px;position:absolute;top:0;left:0;";
                                                      stack.appendChild(s);
                                                    }
                                                  });
                                                col.appendChild(lbl);
                                                col.appendChild(stack);
                                                card.appendChild(col);
                                              });
                                            }, 1900);
                                            setTimeout(() => {
                                              newToken();
                                              chatChoices(
                                                [
                                                  {
                                                    label: "Entendi! \u2192",
                                                    onClick: () => tutNext(),
                                                  },
                                                ],
                                                400,
                                              );
                                              // Easter egg: hover se repetiu (qualquer replay)
                                              setTimeout(() => {
                                                const btn =
                                                  document.querySelector(
                                                    ".tut-choice-btn",
                                                  );
                                                if (btn) {
                                                  const orig = btn.textContent;
                                                  btn.addEventListener(
                                                    "mouseenter",
                                                    () => {
                                                      if (replayCount >= 3)
                                                        btn.textContent =
                                                          "Vai logo, vai! \uD83D\uDE24";
                                                      else if (replayCount >= 1)
                                                        btn.textContent =
                                                          "Caraca, voc\u00ea \u00e9 um g\u00eanio!";
                                                    },
                                                  );
                                                  btn.addEventListener(
                                                    "mouseleave",
                                                    () => {
                                                      btn.textContent = orig;
                                                    },
                                                  );
                                                }
                                              }, 600);
                                            }, 3200);
                                          }
                                        },
                                      });
                                      scrollFeed();
                                    }),
                                  );
                                }, 600);
                              },
                            });
                          },
                        });
                      },
                    });
                  },
                });
              }; // fim runAnimation

              tileData.forEach(({ label }) => {
                if (label) label.style.opacity = "0";
              });

              let colored = 0;
              tileData.forEach(({ svgEl, letter }, i) => {
                setTimeout(() => {
                  if (!svgEl || !svgEl.parentNode) return;
                  svgEl.style.transition =
                    "transform 0.2s ease-in, opacity 0.2s";
                  svgEl.style.transform = "scale(0.6)";
                  svgEl.style.opacity = "0";
                  setTimeout(() => {
                    const newSvg = makeSVG(letter, tcOf[letter]);
                    if (!newSvg) return;
                    newSvg.style.cssText = svgEl.style.cssText;
                    newSvg.style.transform = "scale(0.6)";
                    newSvg.style.opacity = "0";
                    newSvg.style.transition =
                      "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s";
                    svgEl.parentNode.replaceChild(newSvg, svgEl);
                    tileData[i].svgEl = newSvg;
                    requestAnimationFrame(() =>
                      requestAnimationFrame(() => {
                        newSvg.style.transform = "scale(1)";
                        newSvg.style.opacity = "1";
                      }),
                    );
                    colored++;
                    if (colored === tileData.length) {
                      setTimeout(() => runPhases(), 400);
                    }
                  }, 200);
                }, i * 450);
              });
            },
          },
        ]);
      }, allIn1 + 2000);
      break;
    }

    case 2: {
      TUT.setState("step_2");
      chatMsg(
        "Agora veja <em>esse</em> Glifo do Dia. O que ser\u00E1? \uD83E\uDD14",
        200,
      );
      let stack2;
      chatCard((card) => {
        card.style.cssText +=
          "display:flex;justify-content:center;background:transparent;border:none;padding:0;";
        const { wrap, stack } = makeGlyphSingle(
          "Glifo do Dia \u2014 ???",
          "200px",
        );
        stack2 = stack;
        card.appendChild(wrap);
      }, 500);
      tDelay(() => {
        if (!token.cancelled && stack2) tStackEl(stack2, TDL, () => tStroke());
      }, 600);

      // ── Interactive guess section ────────────────────────────────
      const tried2 = new Set();
      const histEntries2 = [];
      // Phase 1 choices (reveal found letters). Phase 2 choices (lock O at slot 3).
      const WORDS2_P1 = ["LOTE", "RUDE", "POSE"];
      const WORDS2_P2 = ["RATO", "CALO", "VASO"];
      const wLetters2 = {
        LOTE: ["L", "O", "T", "E"],
        RUDE: ["R", "U", "D", "E"],
        POSE: ["P", "O", "S", "E"],
        RATO: ["R", "A", "T", "O"],
        CALO: ["C", "A", "L", "O"],
        VASO: ["V", "A", "S", "O"],
      };
      // Per-slot result against ARCO = [A(0),R(1),C(2),O(3)]
      const wSlots2 = {
        LOTE: ["miss", "found", "miss", "miss"],
        RUDE: ["found", "miss", "miss", "miss"],
        POSE: ["miss", "found", "miss", "miss"],
        RATO: ["found", "found", "miss", "correct"],
        CALO: ["found", "found", "miss", "correct"],
        VASO: ["miss", "found", "miss", "correct"],
      };
      const wCorrect2 = {
        LOTE: [],
        RUDE: [],
        POSE: [],
        RATO: ["O"],
        CALO: ["O"],
        VASO: ["O"],
      };
      const wFound2 = {
        LOTE: ["O"],
        RUDE: ["R"],
        POSE: ["O"],
        RATO: ["R", "A"],
        CALO: ["C", "A"],
        VASO: ["A"],
      };
      const _p2Msg = `A letra <strong style="color:${tdOf["O"]}">O</strong> foi decifrada! ✅ Quando uma letra está no lugar certo, ela <strong>some do Glifo</strong> — o desenho fica mais simples, e o jogo fica mais fácil.`;
      const wMsg2 = {
        LOTE: `O Glifo coloriu! Uma letra existe na palavra — mas está na posição errada. 🕵️`,
        RUDE: `Encontramos o <strong style="color:${tdOf["R"]}">R</strong>! Ele existe na palavra, mas está fora do lugar. Isso é raro — letras incomuns são pistas valiosas! 🔎`,
        POSE: `O Glifo coloriu! Uma letra existe na palavra — mas está na posição errada. 🕵️`,
        RATO: _p2Msg,
        CALO: _p2Msg,
        VASO: _p2Msg,
      };

      // Letters remaining in glyph (O removed once RATO/CALO/VASO tried)
      function glStack2() {
        const p2Done =
          tried2.has("RATO") || tried2.has("CALO") || tried2.has("VASO");
        return p2Done ? ["A", "R", "C"] : TDL;
      }
      // Colors for glyph based on found letters so far
      function glColor2() {
        const f = new Set();
        if (tried2.has("LOTE") || tried2.has("POSE")) f.add("O");
        if (tried2.has("RUDE")) f.add("R");
        if (tried2.has("RATO")) {
          f.add("R");
          f.add("A");
        }
        if (tried2.has("CALO")) {
          f.add("C");
          f.add("A");
        }
        if (tried2.has("VASO")) f.add("A");
        return (l) => (f.has(l) ? tdOf[l] : tStroke());
      }

      function runGuess2(word) {
        const num2 = tried2.size + 1;
        const letters2 = wLetters2[word];
        const isP2 = WORDS2_P2.includes(word);
        // Capture state BEFORE registering this guess
        const stackBefore2 = glStack2();
        const colorBefore2 = glColor2();
        tried2.add(word);
        histEntries2.push({
          word,
          correct: wCorrect2[word],
          found: wFound2[word],
        });
        // State AFTER
        const stackAfter2 = glStack2();
        const colorAfter2 = glColor2();

        const nextDelay2 = 4300;

        // Banana boy walks right→left on the very first guess (fires bbMidCb near end)
        let bbMidCb = null;
        if (num2 === 1) {
          tDelay(() => {
            if (!window.lottie) {
              if (bbMidCb) bbMidCb();
              return;
            }
            const panel = document.querySelector(
              "#tutorial-overlay .tut-panel",
            );
            if (!panel) return;
            const BB_W = 160;
            const bbDiv = document.createElement("div");
            bbDiv.style.cssText =
              [
                "position:absolute",
                "bottom:0",
                "right:-" + BB_W + "px",
                "width:" + BB_W + "px",
                "height:" + BB_W + "px",
                "z-index:10",
                "cursor:pointer",
                "will-change:right",
              ].join(";") + ";";
            panel.style.position = "relative";
            panel.style.overflow = "hidden";
            panel.appendChild(bbDiv);
            const bbInst = lottie.loadAnimation({
              container: bbDiv,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: _bananaBoyData || undefined,
              path: _bananaBoyData ? undefined : "animations/banana_boy.json",
            });
            const panelW = panel.offsetWidth || 480;
            const DIST = panelW + BB_W;
            const T_WALK = 7500;
            const eio = (p) => -(Math.cos(Math.PI * p) - 1) / 2;
            let t0 = null,
              midFired = false,
              bbStopped = false;
            // Easter egg: clicar na banana — ela vira e volta
            const _bbClick = () => {
              if (bbStopped) return;
              bbStopped = true;
              bbDiv.removeEventListener("click", _bbClick);
              bbDiv.style.cursor = "default";
              // Insert the easter egg bubble before the bb-typing indicator (if visible)
              const feed = document.getElementById("tut-chat-feed");
              const typingEl = document.getElementById("bb-typing");
              const eggBubble = document.createElement("div");
              eggBubble.className = "tut-bubble-left";
              eggBubble.textContent = "Ei! O menino só passa, não morde! 🍌";
              if (feed && typingEl) {
                feed.insertBefore(eggBubble, typingEl);
              } else if (feed) {
                feed.appendChild(eggBubble);
              }
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  eggBubble.classList.add("show");
                  scrollFeed();
                }),
              );
              if (!midFired) {
                midFired = true;
                if (bbMidCb) setTimeout(bbMidCb, 1200);
              }
              // Flip horizontally and animate back to the right
              bbDiv.style.transform = "scaleX(-1)";
              const startRight = parseFloat(bbDiv.style.right) || 0;
              const returnDist = startRight + BB_W; // distance back off-screen right
              const T_RETURN = Math.max(
                1200,
                (returnDist / DIST) * T_WALK * 0.6,
              );
              let r0 = null;
              const doReturn = (ts) => {
                if (!r0) r0 = ts;
                const p = Math.min((ts - r0) / T_RETURN, 1);
                bbDiv.style.right =
                  (startRight - eio(p) * returnDist).toFixed(0) + "px";
                if (p < 1) {
                  requestAnimationFrame(doReturn);
                  return;
                }
                if (bbInst) bbInst.destroy();
                bbDiv.remove();
              };
              requestAnimationFrame(doReturn);
            };
            bbDiv.addEventListener("click", _bbClick);
            const doFrame = (ts) => {
              if (bbStopped) return;
              if (!t0) t0 = ts;
              const t = ts - t0;
              if (!midFired && t >= T_WALK * 0.85) {
                midFired = true;
                if (bbMidCb) bbMidCb();
              }
              if (t >= T_WALK) {
                bbDiv.removeEventListener("click", _bbClick);
                if (bbInst) bbInst.destroy();
                bbDiv.remove();
                return;
              }
              bbDiv.style.right =
                (-BB_W + eio(Math.min(t / T_WALK, 1)) * DIST).toFixed(0) + "px";
              requestAnimationFrame(doFrame);
            };
            requestAnimationFrame(doFrame);
          }, nextDelay2 + 1000);
        }

        let gSt2, wSt2, slEl2, hEl2;
        chatCard((card) => {
          card.style.cssText += "display:flex;flex-direction:column;gap:10px;";
          const row = document.createElement("div");
          row.className = "tut-glyph-row";
          const { panel: dp2, stack: ds2 } = makeGlyphPanel("Glifo do Dia");
          gSt2 = ds2;
          const { panel: gp2, stack: gs2 } = makeGlyphPanel(word);
          wSt2 = gs2;
          row.appendChild(dp2);
          row.appendChild(gp2);
          card.appendChild(row);
          slEl2 = document.createElement("div");
          slEl2.className = "tut-slots";
          slEl2.style.justifyContent = "center";
          letters2.forEach(() => {
            const el = document.createElement("div");
            el.className = "tut-slot";
            // letters animated in one-by-one after card appears
            slEl2.appendChild(el);
          });
          card.appendChild(slEl2);
          hEl2 = document.createElement("div");
          hEl2.style.cssText =
            "border:1px solid var(--border);border-radius:10px;overflow:hidden;opacity:0;transition:opacity 0.4s;";
          const hHdr = document.createElement("div");
          hHdr.className = "hdr";
          hHdr.innerHTML =
            "<span>Tentativa</span><span>Certas</span><span>Encontradas</span>";
          hEl2.appendChild(hHdr);
          // Rows rendered invisible so height is set from the start
          [...histEntries2].reverse().forEach((e) => {
            const row = makeDemoRow(e.word, e.correct, e.found);
            row.style.opacity = "0";
            hEl2.appendChild(row);
          });
          card.appendChild(hEl2);
        }, 400);

        // Show daily glyph before-state; right glyph builds incrementally
        tDelay(() => {
          if (token.cancelled) return;
          tStackEl(gSt2, stackBefore2, colorBefore2);
        }, 500);

        // Show typing indicator alongside the card (signals typing is coming)
        let decodingEl = null;
        tDelay(() => {
          if (token.cancelled) return;
          const feed = document.getElementById("tut-chat-feed");
          if (!feed) return;
          decodingEl = document.createElement("div");
          decodingEl.className = "tut-typing";
          decodingEl.innerHTML = "<span></span><span></span><span></span>";
          feed.appendChild(decodingEl);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              decodingEl.classList.add("show");
              scrollFeed();
            }),
          );
        }, 600);

        // Animate letters into slots one by one; each letter also grows the right glyph
        letters2.forEach((l, i) => {
          tDelay(
            () => {
              if (token.cancelled || !slEl2) return;
              // Slot: add letter with pop animation
              const slot = slEl2.children[i];
              if (!slot) return;
              const sv = makeSVG(l, tStroke());
              if (sv) {
                sv.style.cssText = "width:65%;aspect-ratio:1;";
                slot.appendChild(sv);
              }
              slot.classList.remove("tap");
              void slot.offsetWidth;
              slot.classList.add("tap");
              scrollFeed();
              // Remove typing indicator when last letter lands
              // (kept alive — chatMsg will claim the existing .tut-typing instead)
              // Right glyph: prepend letter's SVG layer so letter[0] ends on top
              if (wSt2) {
                const wSvg = makeSVG(
                  l,
                  tStroke(),
                  "position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.3s;",
                );
                if (wSvg) {
                  wSt2.insertBefore(wSvg, wSt2.firstChild);
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                      wSvg.style.opacity = "1";
                    }),
                  );
                }
              }
            },
            1100 + i * 350,
          );
        });

        // Animate slots revealing result + update right glyph per letter
        tDelay(() => {
          if (token.cancelled || !slEl2) return;
          const slots2 = [...slEl2.children];
          letters2.forEach((l, i) => {
            const status = wSlots2[word][i];
            setTimeout(() => {
              const el = slots2[i];
              if (!el) return;
              // Slot flip in
              el.style.transition = "transform 0.19s ease-in";
              el.style.transform = "scaleY(0)";
              setTimeout(() => {
                // Slot reveal
                el.innerHTML = "";
                if (status === "correct") {
                  el.style.background = tdOf[l];
                  el.style.borderColor = "transparent";
                  const sv = makeSVG(l, "#fff");
                  if (sv) {
                    sv.style.cssText =
                      "width:65%;aspect-ratio:1;display:block;";
                    el.appendChild(sv);
                  }
                } else {
                  el.style.background = "var(--surface2)";
                  el.style.borderColor = "var(--border2)";
                  const sv = makeSVG(l, tStroke());
                  if (sv) {
                    sv.style.cssText =
                      "width:65%;aspect-ratio:1;display:block;opacity:0.5;";
                    el.appendChild(sv);
                  }
                }
                void el.offsetWidth; // force reflow so flip-back transition fires
                el.style.transition = "transform 0.19s ease-out";
                el.style.transform = "scaleY(1)";
                // Right glyph: fade all letters out as slots reveal
                const wSvgIdx = letters2.length - 1 - i;
                const wSvgEl = wSt2 && wSt2.children[wSvgIdx];
                if (wSvgEl) {
                  wSvgEl.style.transition = "opacity 0.3s";
                  wSvgEl.style.opacity = "0";
                }
              }, 190);
            }, i * 200);
          });
        }, 3100);

        // Update glyph after all slots have finished flipping
        // Slots: start 3100ms + i*200ms offset + 380ms flip = last done ~4080ms
        tDelay(() => {
          if (token.cancelled) return;
          if (isP2) {
            // O locks — animate O disappearing from glyph (svgIdx 0 in DOM)
            const oSvg = gSt2 && gSt2.querySelectorAll("svg")[0];
            if (oSvg) {
              oSvg.style.transition = "opacity 0.6s, filter 0.6s";
              oSvg.style.opacity = "0";
              oSvg.style.filter = "blur(4px)";
              tDelay(() => {
                if (oSvg) oSvg.remove();
              }, 650);
            }
            tDelay(() => {
              tStackEl(gSt2, stackAfter2, colorAfter2);
              // Ghost O — dashed pulsing outline where O used to be
              const ghostSvg = makeSVG(
                "O",
                tdOf["O"],
                "position:absolute;top:0;left:0;width:100%;height:100%;",
              );
              if (ghostSvg && gSt2) {
                const g = ghostSvg.querySelector("g");
                if (g) {
                  g.setAttribute("stroke-width", "4");
                  g.setAttribute("stroke-dasharray", "5 8");
                  g.setAttribute("stroke-linecap", "round");
                }
                ghostSvg.classList.add("tut-ghost-o");
                gSt2.appendChild(ghostSvg);
              }
            }, 700);
          } else {
            // Phase 1 word: glyph gains found color
            tStackEl(gSt2, stackAfter2, colorAfter2);
          }
        }, 4300);

        tDelay(() => {
          if (token.cancelled || !hEl2) return;
          hEl2.style.opacity = "1";
          [...hEl2.querySelectorAll(".hrow")].forEach((row, i) => {
            row.style.transition = "opacity 0.4s";
            setTimeout(
              () => {
                row.style.opacity = "1";
              },
              i * 150 + 50,
            );
          });
          // Pulse found slots and history dots to draw attention
          if (!isP2) {
            const foundDots = [
              ...hEl2.querySelectorAll(".dcell:last-child .hdot"),
            ];
            const pulseEls = [...foundDots];
            setTimeout(() => {
              pulseEls.forEach((el) => el.classList.add("tut-found-pulse"));
            }, 200);
            setTimeout(() => {
              pulseEls.forEach((el) => el.classList.remove("tut-found-pulse"));
            }, 1500); // stop 300ms before Quaaase
          }
        }, 4400);

        if (isP2) {
          // Explain O locking, then player confirms before CARO curiosity
          chatMsg(wMsg2[word], nextDelay2 + 300);

          // CARO comparison sequence — extracted so birra flow can also call it
          const startCaro = (cameFromBirra) => {
            // Compute which letters the player discovered across both guesses
            const coloredSet = new Set();
            tried2.forEach((w) => wFound2[w].forEach((l) => coloredSet.add(l)));
            coloredSet.delete("O"); // O is always correct/decoded after P2
            const coloredArr = [...coloredSet];
            const unknownInGlyph = ["A", "R", "C"].filter(
              (l) => !coloredSet.has(l),
            );

            // Shared BOLA ≠ LOBA → CARO/ARCO panels → "Entendido" choice.
            // `base` = ms delay for the first BOLA message (relative to now).
            const continueBolaSeq = (base) => {
              let caroGst, arcoGst;
              chatMsg(
                `Lembra de <strong>BOLA ≠ LOBA</strong> lá em cima? É exatamente isso aqui — mesmas letras, ordem diferente. Ficamos com 2 opções: <strong>CARO</strong> e <strong>ARCO</strong>.`,
                base,
              );
              chatMsg(
                `Mas olha a pegadinha: o glifo deles é idêntico! 😯 Ambas têm A, C, O, R — só a ordem muda.`,
                base + 900,
              );
              chatCard((card) => {
                card.style.cssText +=
                  "display:flex;flex-direction:column;gap:10px;";
                const caroRow = document.createElement("div");
                caroRow.className = "tut-glyph-row";
                const { panel: cp, stack: cs } = makeGlyphPanel("CARO");
                caroGst = cs;
                const { panel: ap, stack: as_ } = makeGlyphPanel("ARCO");
                arcoGst = as_;
                caroRow.appendChild(cp);
                caroRow.appendChild(ap);
                card.appendChild(caroRow);
              }, base + 1500);
              // Color both glyphs identically (same ARCO colors) to show they're the same
              tDelay(() => {
                if (token.cancelled) return;
                tStackEl(caroGst, ["C", "A", "R", "O"], (l) => tdOf[l]);
                tStackEl(arcoGst, TDL, (l) => tdOf[l]);
              }, base + 1800);
              tDelay(() => {
                if (token.cancelled) return;
                chatChoices([
                  {
                    label: "Entendido — e agora? 🤔",
                    onClick: () => {
                      chatMsg(
                        `Se essa palavra fosse mais difícil, você poderia usar a <strong>Chave 🔑</strong> — ela revela a letra numa posição que você escolher. Mas tenho certeza que você não precisa dela pra essa palavra ridiculamente fácil, né? 😏`,
                        200,
                      );
                      let tutKeyRevealedPos = null;
                      const launchInteractive = (delay) => {
                        // Interactive slots — user types ARCO or CARO letter by letter
                        tDelay(() => {
                          if (token.cancelled) return;
                          iWord = "ARCO";
                          iLetters = TDL;
                          iColorOf = tdOf;
                          iTyped = ["", "", "", ""];
                          iConfirmed = new Set();
                          // O (last slot) is always decoded — pre-confirm it
                          const oPos = TDL.length - 1;
                          iTyped[oPos] = TDL[oPos];
                          iConfirmed.add(oPos);
                          if (tutKeyRevealedPos !== null) {
                            iTyped[tutKeyRevealedPos] = TDL[tutKeyRevealedPos];
                            iConfirmed.add(tutKeyRevealedPos);
                          }
                          iWrongCount = -999; // disable easter egg
                          iCursor = 0;
                          while (
                            iCursor < TDL.length &&
                            iConfirmed.has(iCursor)
                          )
                            iCursor++;
                          onTutGiveUp = null;
                          tutInteractReady = true;

                          const feed = document.getElementById("tut-chat-feed");
                          if (!feed) return;

                          const wrap = document.createElement("div");
                          wrap.className = "tut-bubble-right";

                          const staticHint = document.createElement("p");
                          staticHint.id = "ts5-hint";
                          staticHint.style.cssText =
                            "font-size:0.76rem;color:var(--text3);margin:0 0 8px;text-align:center;";
                          staticHint.textContent =
                            "ARCO ou CARO? Só a ordem certa decifra o glifo ↵";
                          wrap.appendChild(staticHint);

                          const slotsEl = document.createElement("div");
                          slotsEl.id = "ts5-interact";
                          slotsEl.className = "tut-slots";
                          slotsEl.style.justifyContent = "center";
                          wrap.appendChild(slotsEl);

                          const confirmBtn = document.createElement("button");
                          confirmBtn.className = "tut-choice-btn";
                          confirmBtn.style.cssText =
                            "margin-top:8px;width:100%;font-size:0.82rem;padding:6px 12px;";
                          confirmBtn.textContent = "Confirmar ↵";
                          wrap.appendChild(confirmBtn);

                          const kbd = document.createElement("div");
                          kbd.id = "tut-kbd";
                          kbd.className = "tut-kbd";
                          // Only show letters that haven't been confirmed yet
                          const remainingLetters = [
                            ...new Set(
                              TDL.filter((_, i) => !iConfirmed.has(i)),
                            ),
                          ];
                          const fireKey = (key) =>
                            tutKeyHandler?.({
                              key,
                              preventDefault: () => {},
                            });
                          remainingLetters.forEach((letter) => {
                            const btn = document.createElement("button");
                            btn.className = "tut-kbd-btn";
                            btn.type = "button";
                            btn.textContent = letter;
                            btn.addEventListener("pointerdown", (e) => {
                              e.preventDefault();
                              fireKey(letter);
                            });
                            kbd.appendChild(btn);
                          });
                          const bksp = document.createElement("button");
                          bksp.className = "tut-kbd-btn";
                          bksp.type = "button";
                          bksp.textContent = "⌫";
                          bksp.style.minWidth = "52px";
                          bksp.addEventListener("pointerdown", (e) => {
                            e.preventDefault();
                            fireKey("Backspace");
                          });
                          kbd.appendChild(bksp);
                          wrap.appendChild(kbd);

                          feed.appendChild(wrap);
                          requestAnimationFrame(() =>
                            requestAnimationFrame(() => {
                              wrap.classList.add("show");
                              scrollFeed();
                            }),
                          );

                          const handleNonArco = () => {
                            if (!iTyped.every(Boolean)) return;
                            const typed = iTyped.join("");
                            if (typed === "ARCO") return; // auto-handled by buildInteract
                            removeTutKeyHandler();
                            tutInteractReady = false;
                            if (confirmBtn.parentNode) confirmBtn.remove();
                            document.getElementById("tut-kbd")?.remove();
                            if (typed === "CARO") {
                              const zoada = cameFromBirra
                                ? `Sério?! Você disse que estava confuso... e ainda errou! Isso é talento. 😂`
                                : `Quase! Era <strong>ARCO</strong> — as letras eram as mesmas, mas a ordem importa! 😄`;
                              chatMsg(zoada, 300);
                              chatMsg(
                                `A palavra do dia é <strong>ARCO</strong>. Óbvio, né? 😏`,
                                1400,
                              );
                              chatMsg(
                                `Mas agora você sabe como funciona! Bora jogar? 🎮`,
                                2400,
                              );
                              const caroMsg = cameFromBirra
                                ? "Depois de toda aquela birra... errou CARO... e ainda quer revisar?! \uD83D\uDE2D"
                                : "Você não vai com a minha cara? \uD83D\uDE24";
                              chatFinale(false, 2900, 3400, caroMsg);
                            } else {
                              chatMsg(
                                `Hmm... nem era uma das opções! 😅 Era <strong>ARCO</strong>.`,
                                300,
                              );
                              chatMsg(
                                `Mas agora você sabe como funciona! Bora jogar? 🎮`,
                                1500,
                              );
                              chatFinale(false, 2000, 2500);
                            }
                          };

                          confirmBtn.onclick = handleNonArco;

                          onTutSolved = () => {
                            tutInteractReady = false;
                            if (confirmBtn.parentNode) confirmBtn.remove();
                            document.getElementById("tut-kbd")?.remove();
                            tutConfetti(feed);
                            chatMsg(
                              `Isso aí! 🎉 Era <strong>ARCO</strong>! Você conseguiu!`,
                              300,
                            );
                            chatMsg(
                              `Mandou bem! Agora você sabe jogar. 🏆`,
                              1400,
                            );
                            chatFinale(true, 1900, 2500);
                          };

                          buildInteract();
                          installTutKeyHandler();

                          // Patch: add Enter key for non-ARCO submissions
                          const baseHandler = tutKeyHandler;
                          document.removeEventListener("keydown", baseHandler);
                          const caroKeyHandler = (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleNonArco();
                            } else {
                              baseHandler(e);
                            }
                          };
                          tutKeyHandler = caroKeyHandler;
                          document.addEventListener("keydown", caroKeyHandler);
                        }, delay);
                      }; // end launchInteractive
                      tDelay(() => {
                        if (token.cancelled) return;
                        chatSetChoices([
                          {
                            label: "Claro que não! 💪",
                            onClick: () => launchInteractive(400),
                          },
                          {
                            label: "Quero usar a Chave 🔑",
                            secondary: true,
                            onClick: () => {
                              chatMsg(
                                `Ok, mas fique sabendo que isso ficará marcado pra sempre em minha memória... 📝`,
                                0,
                              );
                              chatCard((card) => {
                                card.style.cssText += "gap:10px;";
                                const lbl = document.createElement("p");
                                lbl.style.cssText =
                                  "margin:0 0 2px;font-size:0.78rem;color:var(--text3);text-align:center;";
                                lbl.textContent =
                                  "Escolha a posição que quer revelar:";
                                card.appendChild(lbl);
                                const boxRow = document.createElement("div");
                                boxRow.className = "kboxes";
                                boxRow.style.marginBottom = "8px";
                                const kboxEls = [];
                                let selPos = null;
                                let revBtn;
                                // O (last position) is already decoded — mark as used
                                const tutKeyUsed = new Set([TDL.length - 1]);
                                TDL.forEach((letter, pos) => {
                                  const b = document.createElement("div");
                                  const isUsed = tutKeyUsed.has(pos);
                                  b.className =
                                    "kbox" + (isUsed ? " used" : "");
                                  if (isUsed) {
                                    b.style.background = tdOf[letter];
                                    b.style.borderColor = "transparent";
                                    const svg = makeSVG(letter, "#fff");
                                    if (svg) {
                                      svg.style.cssText =
                                        "width:62%;height:62%;";
                                      b.appendChild(svg);
                                    }
                                  } else {
                                    b.textContent = "?";
                                    b.onclick = () => {
                                      kboxEls.forEach((x) =>
                                        x.classList.remove("sel"),
                                      );
                                      b.classList.add("sel");
                                      selPos = pos;
                                      revBtn.disabled = false;
                                    };
                                  }
                                  kboxEls.push(b);
                                  boxRow.appendChild(b);
                                });
                                card.appendChild(boxRow);
                                revBtn = document.createElement("button");
                                revBtn.className = "kuse-btn";
                                revBtn.disabled = true;
                                revBtn.textContent = "Revelar 🔑";
                                revBtn.onclick = () => {
                                  if (selPos === null) return;
                                  const letter = TDL[selPos];
                                  const color = tdOf[letter];
                                  kboxEls.forEach((b, i) => {
                                    b.onclick = null;
                                    if (i === selPos) {
                                      b.classList.remove("sel");
                                      b.style.background = color;
                                      b.style.borderColor = "transparent";
                                      b.style.cursor = "default";
                                      b.textContent = "";
                                      const svg = makeSVG(letter, "#fff");
                                      if (svg) {
                                        svg.style.cssText =
                                          "width:62%;height:62%;";
                                        b.appendChild(svg);
                                      }
                                    } else {
                                      b.style.opacity = "0.3";
                                      b.style.cursor = "default";
                                    }
                                  });
                                  revBtn.disabled = true;
                                  revBtn.style.opacity = "0.5";
                                  tutKeyRevealedPos = selPos;
                                  launchInteractive(900);
                                };
                                card.appendChild(revBtn);
                              }, 1000);
                            },
                          },
                        ]);
                      }, 1200);
                    },
                  },
                ]);
              }, base + 2300);
            }; // end continueBolaSeq

            if (coloredArr.length === 3) {
              chatMsg(
                `O glifo ficou com 3 letras — e <strong>todas estão coloridas</strong>! ✨ Você descobriu que <strong>A</strong>, <strong>C</strong> e <strong>R</strong> existem na palavra, e <strong>O</strong> está na posição certa.`,
                200,
              );
              continueBolaSeq(1200);
            } else if (unknownInGlyph.length === 1) {
              const [miss] = unknownInGlyph;
              const found2Str = coloredArr
                .map((l) => `<strong>${l}</strong>`)
                .join(" e ");
              // Keep a reference to the bubble so "Eu descobri?" can redact it
              let introBubble = null;
              const introHtmlVisible = `Temos <strong>2 letras coloridas</strong> no glifo — você descobriu que ${found2Str} existem na palavra, e <strong>O</strong> está no lugar certo. Falta o <strong>${miss}</strong>... mas entre nós: ele também está lá 🤫.`;
              const introHtmlMasked = `Temos <strong>2 letras coloridas</strong> no glifo — você descobriu que <strong>◆</strong> e <strong>◆</strong> existem na palavra, e <strong>O</strong> está no lugar certo. Falta o <strong>◆</strong>... mas entre nós: ele também está lá 🤫.`;
              tDelay(() => {
                if (token.cancelled) return;
                const feed = document.getElementById("tut-chat-feed");
                if (!feed) return;
                introBubble = document.createElement("div");
                introBubble.className = "tut-bubble-left";
                introBubble.innerHTML = introHtmlVisible;
                feed.appendChild(introBubble);
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => {
                    introBubble.classList.add("show");
                    scrollFeed();
                  }),
                );
              }, 200);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices([
                  {
                    label: "Ok",
                    onClick: () => continueBolaSeq(300),
                  },
                  {
                    label: "Eu descobri? 🔍",
                    secondary: true,
                    onClick: () => {
                      // Redact the letters in the existing bubble
                      if (introBubble) introBubble.innerHTML = introHtmlMasked;
                      chatMsg(
                        `Sim... VOCÊ! Sem ajuda, eu não disse NADA 🙊`,
                        300,
                      );
                      tDelay(() => {
                        if (token.cancelled) return;
                        continueBolaSeq(200);
                      }, 1800);
                    },
                  },
                ]);
              }, 1200);
            } else {
              const [l1] = coloredArr;
              chatMsg(
                `Só conseguimos <strong>1 letra colorida</strong> — sabemos que <strong>${l1}</strong> existe na palavra, e <strong>O</strong> está no lugar certo. Com um spoilerim: <strong>C</strong> e <strong>R</strong> também estão lá! 🤫 Ou seja: <strong>A, C, O</strong> e <strong>R</strong>.<br><br>No jogo de verdade não revelamos qual é a letra colorida — você precisa descobrir olhando o glifo: às vezes ela fica no topo da pilha (bem óbvio!), às vezes aparecem só alguns traços coloridos lá no fundo. 🎨`,
                200,
              );
              continueBolaSeq(1200);
            }
          };

          // "Birra" flow — tutorial makes a fuss before relenting
          const irParaTermo = () => {
            window.open("https://term.ooo", "_blank", "noopener");
          };
          const birraRound3 = () => {
            chatMsg(
              `...........tá. Mas fique sabendo que eu tô fazendo um <em>enorme</em> favor. 😤`,
              0,
            );
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Muito obrigado! 🙏",
                  onClick: () => {
                    startCaro(true);
                  },
                },
              ]);
            }, 1400);
          };
          const birraRound2 = () => {
            chatMsg(`Hmm. Não sei não... você me parece muito suspeito. 🤨`, 0);
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Eu juro que entendo! Pode continuar! 🤞",
                  onClick: () => {
                    birraRound3();
                  },
                },
                {
                  label: "Ok, pro Termo mesmo... 🚪",
                  onClick: () => {
                    chatMsg(`Boa escolha. 😤`, 0);
                    setTimeout(irParaTermo, 800);
                  },
                },
              ]);
            }, 1400);
          };
          const birraRound1 = () => {
            chatMsg(
              `Fala sério! Mais explicado do que isso? Vai jogar <a href="https://term.ooo" target="_blank" rel="noopener">Termo</a>, vai! 😄`,
              0,
            );
            tDelay(() => {
              chatSetChoices([
                {
                  label: "Mas eu gosto mais do Gliffo! 🥺",
                  onClick: () => {
                    birraRound2();
                  },
                },
                {
                  label: "Tá bem, vou mesmo... 🚪",
                  onClick: () => {
                    chatMsg(`Boa viagem! 👋`, 0);
                    setTimeout(irParaTermo, 800);
                  },
                },
              ]);
            }, 1400);
          };

          chatChoices(
            [
              {
                label: "Acho que já sei! 🧠",
                onClick: () => {
                  startCaro(false);
                },
              },
              {
                label: "Estou confuso ainda... 😵",
                secondary: true,
                onClick: () => {
                  birraRound1();
                },
              },
            ],
            nextDelay2 + 1500,
          );
        } else {
          chatTypingThenMsg(
            "pre-typing",
            2400,
            `Quase lá! 🔎 Glifos coloridos indicam que a letra <strong>existe</strong> na palavra — mas está na posição errada.`,
            nextDelay2 + 500,
            token,
          );
          chatTypingThenMsg("bb-typing", nextDelay2 + 1000, null, null, token);
          const showP2 = () => {
            const feed = document.getElementById("tut-chat-feed");
            const indicator = document.getElementById("bb-typing");
            const div = document.createElement("div");
            div.className = "tut-bubble-left";
            const p1FoundCount = wFound2[word].length;
            div.innerHTML = `Temos <strong>${p1FoundCount}</strong> letra${p1FoundCount !== 1 ? "s" : ""} colorida${p1FoundCount !== 1 ? "s" : ""} no glifo — o jogo não vai te dizer qual é: vai ter que descobrir. 🕵️`;
            if (feed && indicator) {
              feed.replaceChild(div, indicator);
            } else if (feed) {
              feed.appendChild(div);
            }
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                div.classList.add("show");
                scrollFeed();
              }),
            );
            tDelay(() => {
              if (token.cancelled) return;
              chatMsg(`Vamos tentar outra palavra! 🔄`, 0);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices(
                  WORDS2_P2.map((w) => ({
                    label: w,
                    onClick: () => runGuess2(w),
                  })),
                );
              }, 900);
            }, 1000);
          };
          if (num2 === 1) {
            bbMidCb = showP2;
          } else {
            tDelay(() => {
              if (!token.cancelled) showP2();
            }, nextDelay2 + 2400);
          }
        }
      }

      chatChoices(
        [
          {
            label: "Quero tentar descobrir!",
            onClick: () => {
              chatMsg("Qual palavra tentar primeiro?", 200);
              tDelay(() => {
                if (token.cancelled) return;
                chatSetChoices(
                  WORDS2_P1.map((w) => ({
                    label: w,
                    onClick: () => runGuess2(w),
                  })),
                );
              }, 800);
            },
          },
        ],
        2000,
      );
      break;
    }
  }
}

function tutNext() {
  renderStep(++tutStep, true);
}
function sadGoodbye() {
  if (_byeToken) {
    _byeToken.cancelled = true;
    _byeToken = null;
  }
  const token = { cancelled: false };
  _byeToken = token;
  TUT.setState("sad_walk");
  tClear();
  stopTyping();
  stopIso();
  if (currentActionToken) {
    currentActionToken.cancelled = true;
    currentActionToken = null;
  }

  // Clear choices immediately so nothing is clickable during the walk
  const choicesEl = document.getElementById("tut-chat-choices");
  if (choicesEl) choicesEl.innerHTML = "";

  // Mensagem imediata para preencher o tempo de carregamento do boneco
  newToken();
  chatMsg("Poxa\u2026 \uD83E\uDD79", 0);
  // Typing indicator enquanto o boneco anda
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const typing = document.createElement("div");
    typing.id = "tut-bye-typing";
    typing.className = "tut-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    feed.appendChild(typing);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        typing.classList.add("show");
        feed.scrollTop = feed.scrollHeight;
      }),
    );
  }, 600);

  const panel = document.querySelector("#tutorial-overlay .tut-panel");

  // The panel is position:relative implicitly — we need it to clip and contain the cat
  panel.style.position = "relative";
  panel.style.overflow = "hidden"; // already set in CSS but ensure it

  // lottie-web: reutiliza div pré-renderizado ou cria novo
  const CAT_W = 160;
  let catDiv, lottieInst;
  if (_sadLottie) {
    // já renderizado: apenas reposiciona no painel
    catDiv = _sadLottie.div;
    lottieInst = _sadLottie.inst;
    _sadLottie = null;
    catDiv.id = "tut-bye-cat";
    catDiv.style.cssText =
      [
        "position:absolute",
        "bottom:0",
        "left:-" + CAT_W + "px",
        "width:" + CAT_W + "px",
        "height:" + CAT_W + "px",
        "z-index:10",
        "pointer-events:none",
        "will-change:left",
      ].join(";") + ";";
    panel.appendChild(catDiv);
  } else {
    // fallback: cria do zero
    catDiv = document.createElement("div");
    catDiv.id = "tut-bye-cat";
    catDiv.style.cssText =
      [
        "position:absolute",
        "bottom:0",
        "left:-" + CAT_W + "px",
        "width:" + CAT_W + "px",
        "height:" + CAT_W + "px",
        "z-index:10",
        "pointer-events:none",
        "will-change:left",
      ].join(";") + ";";
    panel.appendChild(catDiv);
    lottieInst = window.lottie
      ? lottie.loadAnimation({
          container: catDiv,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: _sadWalkingData || undefined,
          path: _sadWalkingData ? undefined : "animations/sad_walking.json",
        })
      : null;
  }

  const panelW = panel.offsetWidth || 480;
  const DIST = panelW + CAT_W;
  const T_WALK = 7500; // ms to cross panel
  const T_MSG = T_WALK * 0.75; // dispara mensagens a 75% do percurso
  const eio = (p) => -(Math.cos(Math.PI * p) - 1) / 2; // ease-in-out sine

  let rafId = null,
    t0 = null,
    msgsFired = false;
  const doFrame = (ts) => {
    if (token.cancelled) return;
    if (!t0) t0 = ts;
    const t = ts - t0;

    // Dispara mensagens antes do fim do percurso
    if (!msgsFired && t >= T_MSG) {
      msgsFired = true;
      // Replace typing indicator atomically with first message
      const feed = document.getElementById("tut-chat-feed");
      const typingEl = document.getElementById("tut-bye-typing");
      _byeToken = null;
      newToken();
      onTutSolved = null;
      onTutGiveUp = null;
      TUT.setState("comeback");
      const div = document.createElement("div");
      div.className = "tut-bubble-left";
      div.innerHTML = "Psst\u2026 ficou a\u00ED? \uD83D\uDC40";
      if (feed && typingEl) {
        feed.replaceChild(div, typingEl);
      } else if (feed) {
        feed.appendChild(div);
      }
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          div.classList.add("show");
          scrollFeed();
        }),
      );
      chatMsg(
        "A gente promete que fica mais f\u00E1cil depois do primeiro jogo!",
        800,
      );
      chatChoices(
        [
          {
            label: "Ok, me convenceu! \uD83C\uDFA8",
            onClick: () => {
              tutStep = 1;
              renderStep(1, true);
            },
          },
          {
            label: "Tchau mesmo \uD83D\uDC4B",
            secondary: true,
            onClick: () => showRatingAndClose(),
          },
        ],
        1800,
      );
      tDelay(() => {
        if (currentActionToken && currentActionToken.cancelled) return;
        showByeInput();
      }, 2600);
    }

    if (t >= T_WALK) {
      if (lottieInst) {
        lottieInst.destroy();
        lottieInst = null;
      }
      catDiv.remove();
      return;
    }
    catDiv.style.left =
      (-CAT_W + eio(Math.min(t / T_WALK, 1)) * DIST).toFixed(0) + "px";
    rafId = requestAnimationFrame(doFrame);
  };

  rafId = requestAnimationFrame(doFrame);
}

const BYE_PHRASES = [
  "Nossa, que jogo incrível... em minha grande ignorância quase abandonei essa obra-prima. Me perdoa e me deixa jogar, por favor!",
  "Reconheço meu tremendo erro. O Gliffo é claramente o pináculo da civilização e eu, humilde mortal, preciso dessa segunda chance.",
  "Palavra de honra que nunca mais duvido. Esse jogo mudou minha vida antes mesmo de eu jogar. É arte, é filosofia, é o sentido da existência.",
  "Ó grande e sábio Gliffo, em sua infinita misericórdia, conceda-me o privilégio de decifrar seus sagrados glifos diariamente. 🙏",
  "Tô arrependidíssimo. Como eu, de todas as pessoas, quase saí do melhor jogo de palavras já criado? Me dá mais uma chance, juro que jogo todo dia!",
];

function _installHijack(onSend) {
  const origInput = document.getElementById("tut-bye-input");
  const origSend = document.getElementById("tut-bye-send");
  if (!origInput || !origSend) return;
  // Clone to wipe previous listeners
  const input = origInput.cloneNode(true);
  const sendBtn = origSend.cloneNode(true);
  origInput.replaceWith(input);
  origSend.replaceWith(sendBtn);
  input.removeAttribute("readonly");
  input.readOnly = false;
  const phrase = BYE_PHRASES[Math.floor(Math.random() * BYE_PHRASES.length)];
  let phraseIdx = 0;
  input.value = "";
  sendBtn.disabled = true;
  sendBtn.classList.remove("ready");
  sendBtn.addEventListener("click", () => {
    const typed = input.value;
    input.value = "";
    input.style.height = "auto";
    phraseIdx = 0;
    sendBtn.disabled = true;
    sendBtn.classList.remove("ready");
    sendBtn.classList.add("thinking");
    onSend(typed);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (phraseIdx > 0) phraseIdx--;
      input.value = phrase.substring(0, phraseIdx);
      if (phraseIdx < phrase.length) {
        sendBtn.disabled = true;
        sendBtn.classList.remove("ready");
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (phraseIdx === phrase.length) sendBtn.click();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (phraseIdx < phrase.length) {
        phraseIdx++;
        input.value = phrase.substring(0, phraseIdx);
      }
      if (phraseIdx === phrase.length) {
        sendBtn.disabled = false;
        sendBtn.classList.add("ready");
      }
    }
    // auto-resize
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  });
}

function showByeInput() {
  const bajuladoCallback = (typed) => {
    chatUser(typed, 0);
    tDelay(() => {
      chatMsg(
        "\uD83E\uDD73 Sabia que voc\u00EA ia entender! Vamos l\u00E1?",
        0,
      );
      chatChoices(
        [
          {
            label: "Vamos! \uD83C\uDFA8",
            onClick: () => {
              tutStep = 1;
              renderStep(1, true);
            },
          },
        ],
        800,
      );
    }, 300);
  };
  // Override TUT.freeInput for comeback state: bajulador instead of dismiss+reask
  TUT._freeInputOverride = bajuladoCallback;
  _installHijack((typed) => TUT.freeInput(typed));
  // Only focus the input on non-touch devices (focus on mobile opens the native keyboard)
  if (!("ontouchstart" in window)) {
    setTimeout(() => {
      const inp = document.getElementById("tut-bye-input");
      if (inp) inp.focus();
    }, 50);
  }
}

function tutSkipOrRestart() {
  closeTutorial();
}
function showRatingAndClose() {
  tClear();
  newToken();
  chatMsg(
    "Antes de ir \u2014 s\u00F3 uma perguntinha r\u00E1pida! \uD83D\uDE07",
    600,
  );
  chatMsg(
    "De <strong>0 a 10</strong>, como voc\u00EA avalia nosso tutorial?",
    1400,
  );
  tDelay(() => {
    if (currentActionToken && currentActionToken.cancelled) return;
    const feed = document.getElementById("tut-chat-feed");
    if (!feed) return;
    const wrap = document.createElement("div");
    wrap.style.cssText =
      "display:flex;flex-wrap:nowrap;gap:3px;padding:4px 0;width:100%;box-sizing:border-box;";

    const scores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    scores.forEach((n) => {
      const b = document.createElement("button");
      b.className = "tut-choice-btn" + (n < 7 ? " secondary" : "");
      b.style.cssText =
        "min-width:0;padding:5px 2px;font-size:0.78rem;flex:1 1 0;border-radius:8px;line-height:1;";
      b.textContent = String(n);
      b.dataset.score = n;
      wrap.appendChild(b);

      if (n !== 10) {
        b.addEventListener("mouseenter", (e) => {
          if (b._fled) return;
          b._fled = true;
          b.style.pointerEvents = "none";

          const rect = b.getBoundingClientRect();
          const wrapRect = wrap.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - e.clientX;
          const dy = cy - e.clientY;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const dist = 70 + Math.random() * 60;
          const rawTx = (dx / len) * dist + (Math.random() - 0.5) * 40;
          const rawTy = (dy / len) * dist + (Math.random() - 0.5) * 40;
          // Clamp horizontal so button never exits the wrap width
          const maxLeft = wrapRect.left - rect.left;
          const maxRight = wrapRect.right - rect.right;
          const tx = Math.max(maxLeft, Math.min(maxRight, rawTx));
          const ty = rawTy;
          const rot = (Math.random() - 0.5) * 80;

          anime({
            targets: b,
            translateX: tx,
            translateY: ty,
            rotate: rot,
            opacity: 0.2,
            duration: 160,
            easing: "easeOutQuad",
          });
        });
      }

      b.addEventListener("click", () => {
        if (b._fled) return;
        card.remove();
        const picked = parseInt(b.dataset.score);
        const msg =
          picked === 10
            ? "\uD83E\uDD73 Que alegria! Obrigado pelo feedback!"
            : picked >= 6
              ? "Obrigado! A gente vai trabalhar pra chegar no 10 \uD83D\uDE04"
              : "Poxa... pelo menos foi honesto \uD83D\uDE4F Vamos melhorar!";
        chatUserNow(String(picked), () => {
          newToken();
          chatMsg(msg, 200);
          tDelay(() => closeTutorial(), 2000);
        });
      });
    });

    const card = document.createElement("div");
    card.className = "tut-chat-card show";
    card.style.cssText += "padding:10px 12px;";
    card.appendChild(wrap);
    feed.appendChild(card);
    feed.scrollTop = feed.scrollHeight;
  }, 2200);
}

function closeTutorial() {
  TUT.setState("done");
  TUT._freeInputOverride = null;
  // 1. Cancela todas as animações pendentes
  if (_byeToken) {
    _byeToken.cancelled = true;
    _byeToken = null;
  }
  const _byeCat = document.getElementById("tut-bye-cat");
  if (_byeCat) _byeCat.remove();
  const _byeInput = document.getElementById("tut-bye-input-wrap");
  if (_byeInput) {
    const _i = _byeInput.querySelector(".tut-fake-input");
    const _s = _byeInput.querySelector(".tut-fake-send");
    if (_i) {
      _i.value = "";
      _i.style.height = "auto";
    }
    if (_s) {
      _s.disabled = true;
      _s.classList.remove("ready");
      _s.classList.add("thinking");
    }
  }
  // dotLottie cleanup handled via token.cancelled check in doFrame
  const _byeScene = document.getElementById("tut-bye-scene");
  if (_byeScene) _byeScene.remove();
  const _tutPanel = document.querySelector("#tutorial-overlay .tut-panel");
  if (_tutPanel) _tutPanel.removeAttribute("style");
  tClear();
  stopTyping();
  stopIso();
  removeTutKeyHandler();
  if (currentActionToken) {
    currentActionToken.cancelled = true;
    currentActionToken = null;
  }

  // 2. Fecha o overlay
  document.getElementById("tutorial-overlay").classList.add("hidden");

  // 2b. Limpa o chat para próxima abertura
  const _oldArrow = document.getElementById("ts0-arrow-overlay");
  if (_oldArrow) {
    if (_oldArrow._cleanup) _oldArrow._cleanup();
    _oldArrow.remove();
  }
  const feed = document.getElementById("tut-chat-feed");
  const choices = document.getElementById("tut-chat-choices");
  if (feed) feed.innerHTML = "";
  if (choices) choices.innerHTML = "";
  onTutSolved = null;
  onTutGiveUp = null;

  // 3. Reset limpo do estado do jogo (evita estado sujo após tutorial)
  G.typed = [];
  G.cursor = nextCursor(0);
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;

  // 4. Reconstrói UI do jogo do zero
  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();

  // 5. Persiste flag de tutorial visto
  localStorage.setItem("gliffoo_tutdone", "1");
}
let _sadWalkingData = null; // pre-fetched lottie JSON
let _sadLottie = null; // { div, inst } pré-renderizado offscreen
let _bananaBoyData = null; // pre-fetched lottie JSON
function _prepareSadLottie(data) {
  if (!window.lottie || _sadLottie) return;
  const div = document.createElement("div");
  div.style.cssText =
    "position:fixed;left:-9999px;top:-9999px;width:160px;height:160px;";
  document.body.appendChild(div);
  const inst = lottie.loadAnimation({
    container: div,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: data,
  });
  _sadLottie = { div, inst };
}
function openTutorial(startStep) {
  tutStep = startStep || 0;
  document.getElementById("tutorial-overlay").classList.remove("hidden");
  renderStep(tutStep);
}
function _dbgTutStep(step) {
  openTutorial(step);
}
window.addEventListener("load", () => {
  // Pré-carrega e pré-renderiza animação do personagem triste
  if (window.fetch) {
    fetch("animations/sad_walking.json")
      .then((r) => r.json())
      .then((d) => {
        _sadWalkingData = d;
        _prepareSadLottie(d);
      })
      .catch(() => {});
    fetch("animations/banana_boy.json")
      .then((r) => r.json())
      .then((d) => {
        _bananaBoyData = d;
      })
      .catch(() => {});
  }
  if (!localStorage.getItem("gliffoo_tutdone"))
    setTimeout(() => openTutorial(), 500);
  // Registra Service Worker (PWA)
  if ("serviceWorker" in navigator) {
    const isLocalServiceWorkerRuntime =
      location.protocol === "file:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";

    if (isLocalServiceWorkerRuntime) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations.map((registration) => registration.unregister()),
          ),
        )
        .catch(() => {});

      if ("caches" in window) {
        caches
          .keys()
          .then((keys) =>
            Promise.all(
              keys
                .filter((key) => key.startsWith("glifo-static-"))
                .map((key) => caches.delete(key)),
            ),
          )
          .catch(() => {});
      }
    } else {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {});
    }
  }
});
document.querySelector('.hbtn[title="Ajuda"]').onclick = () => openTutorial();

// ═══════════════════════════════════════════════
// MODO ARQUIVO — puzzles anteriores
// ═══════════════════════════════════════════════
function palavraPorDia(offset) {
  return puzzleInfoPorOffset(offset);
}

function openArquivo() {
  buildArquivoList();
  openM("arquivo-modal");
}

function buildArquivoList() {
  const body = document.getElementById("arquivo-body");
  if (!body) return;
  body.innerHTML = "";

  if (ARQUIVO_MODO || PRATICA_MODO) {
    const btnHoje = document.createElement("button");
    btnHoje.className = "arquivo-hoje-btn";
    btnHoje.textContent = "\u2190 Voltar ao Puzzle de Hoje";
    btnHoje.onclick = () => {
      closeM("arquivo-modal");
      if (PRATICA_MODO) exitPraticaMode();
      else exitArquivoMode();
    };
    body.appendChild(btnHoje);
  }

  const dbgOffset = window._dbgGetOffset ? window._dbgGetOffset() : 0;

  // Real today (PT-BR timezone, no debug offset)
  const todayBase = baseDateSaoPaulo();
  // Simulated today (debug offset applied)
  const todayActual = new Date(todayBase.getTime() + dbgOffset * 86400000);

  // Epoch — puzzle #1 = Sunday 2026-03-08
  const EPOCA_DATE = new Date("2026-03-08T00:00:00-03:00");
  const epochDay = new Date(
    EPOCA_DATE.getFullYear(),
    EPOCA_DATE.getMonth(),
    EPOCA_DATE.getDate(),
  );

  // Sunday of the current (simulated) week
  const curSunday = new Date(
    todayActual.getTime() - todayActual.getDay() * 86400000,
  );
  curSunday.setHours(0, 0, 0, 0);

  const numWeeks = Math.round((curSunday - epochDay) / (7 * 86400000)) + 1;

  const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\u00e1b"];

  const calWrap = document.createElement("div");
  calWrap.className = "arquivo-cal-wrap";

  // Day-of-week header (shown once, sticky at top)
  const dayHeader = document.createElement("div");
  dayHeader.className = "arquivo-cal-header";
  DAY_LABELS.forEach((lbl) => {
    const d = document.createElement("div");
    d.className = "arquivo-cal-daylabel";
    d.textContent = lbl;
    dayHeader.appendChild(d);
  });
  calWrap.appendChild(dayHeader);

  // Iterate weeks, newest first (top of list)
  for (let w = numWeeks - 1; w >= 0; w--) {
    const weekSunday = new Date(epochDay.getTime() + w * 7 * 86400000);

    // Show a month label when the month changes going downward
    const weekAbove = new Date(weekSunday.getTime() + 7 * 86400000);
    const showMonthLabel =
      w === numWeeks - 1 || weekSunday.getMonth() !== weekAbove.getMonth();
    if (showMonthLabel) {
      const mlabel = document.createElement("div");
      mlabel.className = "arquivo-cal-monthlabel";
      const mn = weekSunday
        .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
        .toLowerCase();
      mlabel.textContent = mn.charAt(0).toUpperCase() + mn.slice(1);
      calWrap.appendChild(mlabel);
    }

    const weekRow = document.createElement("div");
    weekRow.className = "arquivo-cal-week";

    for (let d = 0; d < 7; d++) {
      const dayDate = new Date(weekSunday.getTime() + d * 86400000);
      const cell = document.createElement("div");

      // Days before the epoch: empty placeholder to keep grid alignment
      if (dayDate < epochDay) {
        cell.className = "arquivo-cell empty";
        weekRow.appendChild(cell);
        continue;
      }

      const daysFromRealToday = Math.round((dayDate - todayBase) / 86400000);
      const isFuture = daysFromRealToday > dbgOffset;
      const isToday = daysFromRealToday === dbgOffset;

      if (isFuture) {
        cell.className = "arquivo-cell future";
        weekRow.appendChild(cell);
        continue;
      }

      // Past or today
      const info = palavraPorDia(daysFromRealToday);
      const isActive = ARQUIVO_MODO && info.dia === ARQUIVO_PUZZLENUM;

      // Load completion state
      let status = "new";
      let attempts = null;
      let usedKey = false;
      if (isToday) {
        const raw = localStorage.getItem("gliffoo_state");
        if (raw) {
          try {
            const ds = JSON.parse(raw);
            usedKey = !!(ds.keyUsed || (ds.keyPos && ds.keyPos.length > 0));
            if (ds.done) {
              status = ds.won ? "won" : "lost";
              attempts = ds.won && ds.attempts ? ds.attempts.length : null;
            } else if (ds.attempts && ds.attempts.length > 0) {
              status = "progress";
            }
          } catch (_) {
            if (window._dbg)
              console.warn("[glif] arquivo parse daily state", _);
          }
        }
      } else {
        const raw = localStorage.getItem("gliffoo_archive_" + info.dia);
        if (raw) {
          try {
            const sd = JSON.parse(raw);
            usedKey = !!(sd.keyUsed || (sd.keyPos && sd.keyPos.length > 0));
            if (sd.done) {
              status = sd.won ? "won" : "lost";
              attempts = sd.won
                ? typeof sd.attempts === "number"
                  ? sd.attempts
                  : null
                : null;
            } else {
              status = "progress";
            }
          } catch (_) {
            if (window._dbg)
              console.warn("[glif] arquivo parse archive state", _);
          }
        }
      }

      const isFirstTry = status === "won" && attempts === 1 && !usedKey;

      cell.className =
        "arquivo-cell " +
        status +
        (isFirstTry ? " first-try" : "") +
        (isToday ? " today" : "") +
        (isActive ? " active" : "");

      // Accessibility tooltip
      const DIFF_LABELS_TIP = {
        facil: "F\u00e1cil",
        medio: "M\u00e9dio",
        dificil: "Dif\u00edcil",
        muito_dificil: "Muito Dif\u00edcil",
      };
      const keyTag = usedKey ? " \uD83D\uDDDD" : "";
      const statusTip = isFirstTry
        ? "\u2B50 Primeira tentativa!" + keyTag
        : status === "won"
          ? "\u2705 Ganho em " + (attempts || "?") + "/4" + keyTag
          : status === "lost"
            ? "\u274C Falhou"
            : status === "progress"
              ? "\u23F3 Em jogo"
              : "N\u00e3o jogado";
      const dateTip = dayDate.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      cell.title = "#" + info.dia + " \u00b7 " + dateTip + "\n" + statusTip;

      // Puzzle number (top-left, tiny)
      const numEl = document.createElement("span");
      numEl.className = "arquivo-cell-num";
      numEl.textContent = "#" + info.dia;
      cell.appendChild(numEl);

      // Key badge (top-right), shown when key was used
      if (usedKey) {
        const keyEl = document.createElement("span");
        keyEl.className = "arquivo-cell-key";
        keyEl.textContent = "\uD83D\uDDDD";
        cell.appendChild(keyEl);
      }

      // Main icon (center)
      const iconEl = document.createElement("span");
      iconEl.className = "arquivo-cell-icon";
      if (isFirstTry) {
        iconEl.textContent = "\u2605"; // ★
      } else if (status === "won") {
        const used = Math.min(attempts || 4, 4);
        iconEl.textContent = "\u25CF".repeat(used) + "\u25CB".repeat(4 - used);
      } else if (status === "lost") {
        iconEl.textContent = "\u2715";
      } else if (status === "progress") {
        iconEl.textContent = "\u00B7\u00B7\u00B7";
      }
      cell.appendChild(iconEl);

      // "hoje" corner badge
      if (isToday) {
        const hojeEl = document.createElement("span");
        hojeEl.className = "arquivo-cell-hoje";
        hojeEl.textContent = "hoje";
        cell.appendChild(hojeEl);
      }

      // Click handler
      if (isToday) {
        cell.onclick = () => {
          if (ARQUIVO_MODO) exitArquivoMode();
          closeM("arquivo-modal");
        };
      } else {
        cell.onclick = (function (off) {
          return function () {
            closeM("arquivo-modal");
            startArquivoMode(off);
          };
        })(daysFromRealToday);
      }

      weekRow.appendChild(cell);
    }

    calWrap.appendChild(weekRow);
  }

  body.appendChild(calWrap);
}

async function startArquivoMode(offset) {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle do arquivo...", "");
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] startArquivoMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível carregar esse puzzle do arquivo.", "err");
    return;
  }

  ARQUIVO_MODO = true;
  PRATICA_MODO = false;
  ARQUIVO_PUZZLENUM = info.dia;
  ARQUIVO_DATA = info.data;
  applyPuzzleInfo(info);

  // Reset G
  G.typed = [];
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;
  G._flipping = false;
  G._flipGen++;

  // Load saved archive state (if any)
  carregarEstadoArquivo(info.dia);

  G.cursor = nextCursor(0);

  // Key dot state
  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  // Close open modals
  [
    "win-modal",
    "lose-modal",
    "key-modal",
    "stats-modal",
    "config-modal",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("show");
      el.setAttribute("aria-hidden", "true");
    }
  });

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

async function exitArquivoMode() {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle atual...", "");
    const offset = window._dbgGetOffset ? window._dbgGetOffset() : 0;
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] exitArquivoMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível voltar ao puzzle atual.", "err");
    return;
  }

  ARQUIVO_MODO = false;
  ARQUIVO_PUZZLENUM = null;
  ARQUIVO_DATA = null;
  applyPuzzleInfo(info);

  _resetGState();
  carregarEstado();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

function _resetGState() {
  G.typed = [];
  G.attempts = [];
  G.decoded = new Set();
  G.found = new Set();
  G.keyUsed = false;
  G.keyPos = new Set();
  G.done = false;
  G.won = false;
  G.selKey = null;
  G._flipping = false;
  G._flipGen++;
}

function _recolorWord() {
  Object.keys(colorOf).forEach((k) => delete colorOf[k]);
  WL.forEach((l, i) => {
    if (!colorOf[l]) colorOf[l] = GLYPH_COLORS[i % GLYPH_COLORS.length];
  });
}

function _closeAllModals() {
  [
    "win-modal",
    "lose-modal",
    "key-modal",
    "stats-modal",
    "config-modal",
  ].forEach((id) => closeM(id));
}

function startPraticaMode() {
  // Escolhe palavra aleatória de qualquer dificuldade
  const todas = Object.values(PALAVRAS).flat();
  CURRENT_PUZZLE = null;
  applyPuzzleWord(todas[Math.floor(Math.random() * todas.length)]);
  setPuzzleReady(true);

  PRATICA_MODO = true;
  ARQUIVO_MODO = false;

  _resetGState();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta();
  setFb("", "");
}

async function exitPraticaMode() {
  let info;
  try {
    setPuzzleReady(false);
    setFb("Carregando puzzle atual...", "");
    const offset = window._dbgGetOffset ? window._dbgGetOffset() : 0;
    info = await fetchPuzzleByOffset(offset);
  } catch (e) {
    console.warn("[glif] exitPraticaMode erro:", e);
    setPuzzleReady(true);
    setFb("Não foi possível voltar ao puzzle atual.", "err");
    return;
  }

  PRATICA_MODO = false;
  applyPuzzleInfo(info);

  _resetGState();
  carregarEstado();
  G.cursor = nextCursor(0);

  const kd = document.getElementById("key-dot");
  if (kd) kd.classList.toggle("show", !G.keyUsed);

  _closeAllModals();

  buildAtts();
  buildBoxes();
  buildKB();
  renderDaily();
  renderYours();
  buildHeaderMeta(info.data);
  setFb("", "");

  if (G.done) {
    buildHistory();
    setTimeout(function () {
      if (G.won) winMod();
      else loseMod();
    }, 600);
  }
}

function _purgeOldArchive(max = 60) {
  const keys = Object.keys(localStorage)
    .filter((k) => k.startsWith("gliffoo_archive_"))
    .map((k) => ({
      k,
      n: parseInt(k.replace("gliffoo_archive_", ""), 10),
    }))
    .filter((o) => !isNaN(o.n))
    .sort((a, b) => b.n - a.n);
  keys.slice(max).forEach((o) => localStorage.removeItem(o.k));
}

function salvarEstadoArquivo() {
  if (!ARQUIVO_PUZZLENUM) return;
  const data = {
    puzzleNum: ARQUIVO_PUZZLENUM,
    word: WORD,
    typed: G.typed,
    attempts: G.attempts.length,
    decoded: [...G.decoded],
    found: [...G.found],
    keyPos: [...G.keyPos],
    done: G.done,
    won: G.won,
    keyUsed: G.keyUsed,
    attHistory: G.attempts,
  };
  localStorage.setItem(
    "gliffoo_archive_" + ARQUIVO_PUZZLENUM,
    JSON.stringify(data),
  );
  _purgeOldArchive();
}

function carregarEstadoArquivo(puzzleNum) {
  try {
    const raw = localStorage.getItem("gliffoo_archive_" + puzzleNum);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.word !== WORD) return false;
    G.attempts = data.attHistory || [];
    G.decoded = new Set(data.decoded || []);
    G.found = new Set(data.found || []);
    G.keyPos = new Set(data.keyPos || []);
    G.done = data.done || false;
    G.won = data.won || false;
    G.keyUsed = data.keyUsed || false;
    // Restore typed for in-progress: re-fill decoded/keyPos slots
    if (!G.done) {
      G.typed = [];
      let i = 0;
      while (i < WN && (G.decoded.has(i) || G.keyPos.has(i))) {
        G.typed.push(WL[i]);
        i++;
      }
    } else {
      G.typed = G.attempts.length
        ? G.attempts[G.attempts.length - 1].word.split("")
        : [];
    }
    return true;
  } catch (e) {
    console.warn("[glif] carregarEstadoArquivo erro:", e);
    return false;
  }
}

// ═══════════════════════════════════════════════
// MODO DEBUG — navegação entre dias
// Ativar: Ctrl+Shift+D  ou  clique 5x no título
// ═══════════════════════════════════════════════
(function initDebugMode() {
  let _dbgOffset = 0; // dias em relação a hoje (0=hoje, -1=ontem, +1=amanhã)
  // WIN_FINALE — declarada junto a _winOverlay (escopo compartilhado)
  let _dbgActive = false;
  const ATIVA_KEY = "gliffoo_debug";

  function palavraPorOffset(offset) {
    return puzzleInfoPorOffset(offset);
  }

  async function resetParaDebug(offset) {
    let info;
    try {
      setPuzzleReady(false);
      setFb("Carregando puzzle...", "");
      info = await fetchPuzzleByOffset(offset);
    } catch (e) {
      console.warn("[glif] resetParaDebug erro:", e);
      setPuzzleReady(true);
      setFb("Não foi possível carregar esse puzzle.", "err");
      return;
    }

    applyPuzzleInfo(info);
    _resetGState();
    G.cursor = nextCursor(0);
    // Fechar modais se abertos
    [
      "win-modal",
      "lose-modal",
      "key-modal",
      "stats-modal",
      "config-modal",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("show");
        el.setAttribute("aria-hidden", "true");
      }
    });
    // Re-renderizar
    buildAtts();
    buildBoxes();
    buildKB();
    renderDaily();
    renderYours();
    buildHeaderMeta(info.data); // atualiza data + badge de dificuldade
    await atualizarPainel();
  }

  async function atualizarPainel() {
    const el = (id) => document.getElementById(id);
    if (!el("dbg-word-display")) return; // DOM ainda não pronto
    let info;
    try {
      info = await fetchPuzzleByOffset(_dbgOffset);
    } catch {
      el("dbg-word-display").textContent = "erro";
      el("dbg-day-num").textContent = "--";
      return;
    }
    el("dbg-word-display").textContent = info.word;
    el("dbg-day-num").textContent = "#" + info.dia;
    const offsetLabel =
      _dbgOffset === 0
        ? "hoje"
        : _dbgOffset > 0
          ? "+" + _dbgOffset + " dia(s)"
          : _dbgOffset + " dia(s)";
    el("dbg-offset-display").textContent = offsetLabel;
    const d = info.data;
    const dataStr = d.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    el("dbg-date-display").textContent =
      dataStr + " · " + info.difficulty.replace("_", " ");
  }

  function ativarDebug() {
    if (_dbgActive) return;
    _dbgActive = true;
    document.body.classList.add("debug-mode");
    localStorage.setItem(ATIVA_KEY, "1");
    console.log("[glif] Modo debug ativado. Ctrl+Shift+D para desativar.");
    void atualizarPainel();
  }

  function desativarDebug() {
    _dbgActive = false;
    document.body.classList.remove("debug-mode");
    localStorage.removeItem(ATIVA_KEY);
    const panel = document.getElementById("debug-panel");
    if (panel) panel.classList.remove("open");
    // Restaurar palavra do dia real
    if (_dbgOffset !== 0) {
      _dbgOffset = 0;
      void resetParaDebug(0);
    }
  }

  // Expor eventos para ativar/desativar externamente
  document.body.addEventListener("_dbgAtivar", ativarDebug);
  document.body.addEventListener("_dbgDesativar", desativarDebug);

  // Expor offset para o Modo Arquivo (testes)
  window._dbgGetOffset = () => _dbgOffset;

  // Mostrar botão header em localhost/file
  window.addEventListener("load", () => {
    const isLocal =
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.protocol === "file:";
    const btn = document.getElementById("hbtn-debug");
    if (btn && isLocal) btn.style.display = "";
  });

  // Restaurar estado debug persistido (após load para DOM estar pronto)
  if (localStorage.getItem(ATIVA_KEY)) {
    _dbgActive = true;
    document.body.classList.add("debug-mode");
    window.addEventListener("load", () => void atualizarPainel(), {
      once: true,
    });
  }

  // Atalho: Ctrl+Shift+D
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      e.preventDefault();
      if (_dbgActive) desativarDebug();
      else ativarDebug();
    }
  });

  // Ativar por 5 cliques no título (easter egg)
  let _titClicks = 0,
    _titTimer = null;
  const titulo =
    document.querySelector(".logo-text") || document.querySelector("h1");
  if (titulo) {
    titulo.addEventListener("click", () => {
      _titClicks++;
      clearTimeout(_titTimer);
      if (_titClicks >= 5) {
        _titClicks = 0;
        if (_dbgActive) desativarDebug();
        else ativarDebug();
      } else {
        _titTimer = setTimeout(() => {
          _titClicks = 0;
        }, 1500);
      }
    });
  }

  // Botão toggle e controles — aguardar DOM completo pois HTML está após este script
  window.addEventListener("load", () => {
    const toggle = document.getElementById("debug-toggle");
    if (toggle)
      toggle.addEventListener("click", () => {
        const panel = document.getElementById("debug-panel");
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) void atualizarPainel();
      });

    const safe = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    };
    safe("dbg-prev", (e) => {
      e.currentTarget.blur();
      _dbgOffset--;
      void resetParaDebug(_dbgOffset);
    });
    safe("dbg-next", (e) => {
      e.currentTarget.blur();
      _dbgOffset++;
      void resetParaDebug(_dbgOffset);
    });
    safe("dbg-today", (e) => {
      e.currentTarget.blur();
      _dbgOffset = 0;
      void resetParaDebug(0);
    });
    safe("dbg-close", () => {
      document.getElementById("debug-panel").classList.remove("open");
    });
    // Win finale selector
    ["current", "A", "B", "C", "D", "E"].forEach((v) => {
      safe(`dbg-fin-${v}`, () => {
        WIN_FINALE = v;
        document
          .querySelectorAll(".dbg-fin-btn")
          .forEach((b) => b.classList.remove("dbg-fin-active"));
        document.getElementById(`dbg-fin-${v}`).classList.add("dbg-fin-active");
      });
    });
    safe("dbg-fin-test", () => {
      // Remove qualquer overlay pendente antes de testar
      if (_winOverlay) {
        _winOverlay.remove();
        _winOverlay = null;
      }
      // Fecha modal de vitória se estiver aberto
      const wm = document.getElementById("win-modal");
      if (wm) {
        wm.classList.remove("show");
        wm.setAttribute("aria-hidden", "true");
      }
      G.done = G.won = true;
      G.decoded = new Set([...Array(WN).keys()]);
      winAnim();
    });
    safe("dbg-clear", () => {
      if (
        !confirm(
          "Apagar TODOS os dados locais (estado, estatísticas, conquistas, configurações) e recarregar?",
        )
      )
        return;
      Object.keys(localStorage)
        .filter((k) => k.startsWith("gliffoo_"))
        .forEach((k) => localStorage.removeItem(k));
      location.reload();
    });
    for (let s = 0; s <= 6; s++) {
      safe(`dbg-tut-${s}`, () => _dbgTutStep(s));
    }
    // Easter Eggs no debug
    safe("dbg-ee-snake", () => openSnakeGame());
    safe("dbg-ee-invaders", () => {
      localStorage.removeItem("gliffoo_ee_invaders");
      localStorage.removeItem("gliffoo_ee_inv_seen");
      localStorage.removeItem("gliffoo_ee_invaders_unlocked");
      openInvadersGame();
    });
    safe("dbg-ee-confetti", () => eeCanvasConfetti && eeCanvasConfetti());
    safe("dbg-ee-fire", () => _eeFireParticles && _eeFireParticles());
    safe("dbg-ee-radio", () => {
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(undefined, true);
        mfpShow();
      }
    });
    safe("dbg-ee-toast", () => showEEToast("🧨 Toast de debug ativado!", 3000));
  });
})();

// ── Easter egg audio & confetti helpers ──
// AudioContext singleton — evita latência de inicialização por chamada
let _ac = null;
function _getAC() {
  if (!_ac || _ac.state === "closed")
    _ac = new (window.AudioContext || window.webkitAudioContext)();
  if (_ac.state === "suspended") _ac.resume();
  return _ac;
}
// Pré-aquece o AudioContext na primeira interação do usuário
// (garante que o contexto está pronto antes do primeiro áudio)
document.body.addEventListener(
  "pointerdown",
  () => {
    if (!AUDIO_MUTED)
      try {
        _getAC();
      } catch (e) {
        if (window._dbg) console.warn("[glif] AudioContext warmup", e);
      }
  },
  { once: true, passive: true },
);

// Easter egg: Konami Code → efeito arco-íris + mensagem
(function () {
  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let _kBuf = [];
  document.addEventListener("keydown", (e) => {
    _kBuf.push(e.key);
    if (_kBuf.length > KONAMI.length) _kBuf.shift();
    if (_kBuf.join(",") === KONAMI.join(",")) {
      _kBuf = [];
      // Aplicar efeito arco-íris no root por 2s
      const root = document.documentElement;
      root.style.transition = "filter 0.3s";
      root.style.filter = "hue-rotate(0deg)";
      let angle = 0;
      const step = () => {
        angle = (angle + 6) % 360;
        root.style.filter = `hue-rotate(${angle}deg)`;
      };
      const raf = setInterval(step, 16);
      setTimeout(() => {
        clearInterval(raf);
        root.style.filter = "";
        root.style.transition = "";
      }, 2000);
      setFb("🕹️ +30 vidas (mentira, mas valeu a tentativa)", "ok");
      setTimeout(() => setFb("", ""), 4000);
    }
  });
})();

function eePlayFanfare() {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    // Reverb sintético: impulso de sala curta gerado por código
    const irLen = Math.floor(A.sampleRate * 0.55);
    const irBuf = A.createBuffer(1, irLen, A.sampleRate);
    const irData = irBuf.getChannelData(0);
    for (let j = 0; j < irLen; j++)
      irData[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / irLen, 2.8);
    const conv = A.createConvolver();
    conv.buffer = irBuf;
    const dry = A.createGain();
    dry.gain.value = 0.72;
    const wet = A.createGain();
    wet.gain.value = 0.32;
    dry.connect(A.destination);
    conv.connect(wet);
    wet.connect(A.destination);
    const notes = [261.6, 329.6, 392.0, 523.3]; // C E G C'
    notes.forEach((freq, noteIdx) => {
      setTimeout(() => {
        const o = A.createOscillator(),
          g = A.createGain();
        o.connect(g);
        g.connect(dry);
        g.connect(conv);
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, A.currentTime);
        g.gain.linearRampToValueAtTime(0.22, A.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, A.currentTime + 0.38);
        o.start();
        o.stop(A.currentTime + 0.38);
      }, noteIdx * 80);
    });
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee fanfare", e2);
  }
}
function eePlayTrombone() {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    const o = A.createOscillator(),
      g = A.createGain();
    o.connect(g);
    g.connect(A.destination);
    o.type = "sawtooth";
    o.frequency.setValueAtTime(380, A.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, A.currentTime + 0.7);
    g.gain.setValueAtTime(0.18, A.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, A.currentTime + 0.7);
    o.start();
    o.stop(A.currentTime + 0.7);
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee trombone", e2);
  }
}
function eePlayFlipTick(result, at) {
  if (AUDIO_MUTED) return;
  try {
    const A = _getAC();
    // Usa tempo agendado pelo scheduler do Web Audio (sample-accurate)
    // Se 'at' já passou (lag extremo), toca imediatamente
    const t = Math.max(at, A.currentTime);
    const o = A.createOscillator(),
      g = A.createGain();
    o.connect(g);
    g.connect(A.destination);
    o.type = "sine";
    if (result === "correct") {
      // Bell curto — nota alta, prazeroso
      o.frequency.setValueAtTime(880, t);
      o.frequency.exponentialRampToValueAtTime(1320, t + 0.08);
      g.gain.setValueAtTime(0.13, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.start(t);
      o.stop(t + 0.2);
    } else {
      // Tick neutro — click seco
      o.frequency.setValueAtTime(600, t);
      o.frequency.exponentialRampToValueAtTime(320, t + 0.03);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      o.start(t);
      o.stop(t + 0.05);
    }
  } catch (e2) {
    if (window._dbg) console.warn("[glif] ee flipTick", e2);
  }
}
// Fallback offline: confetti CSS puro (posição fixa, cobre a tela)
function _eeLocalConfetti() {
  const colors = ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 8;
    p.style.cssText =
      `position:fixed;width:${size}px;height:${size}px;` +
      `background:${colors[i % colors.length]};` +
      `border-radius:${Math.random() > 0.5 ? "50%" : "2px"};` +
      `left:${20 + Math.random() * 60}vw;top:${58 + Math.random() * 12}vh;` +
      `pointer-events:none;z-index:9999;` +
      `animation:confPop ${0.8 + Math.random() * 0.6}s ease-out forwards;` +
      `--tx:${(Math.random() - 0.5) * 280}px;` +
      `--ty:${-80 - Math.random() * 200}px;` +
      `animation-delay:${Math.random() * 0.35}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}

// ── Easter eggs: palavras temáticas ──
// Easter egg: palíndromo — varredura bidirecional nos lboxes
function eePalindromeReveal() {
  if (!achIsPalindrome(WORD)) return;
  queueAch("ee_pal_reveal");
  const boxes = [...document.querySelectorAll("#lboxes .lbox")];
  if (!boxes.length) return;
  // Forward sweep (left→right)
  boxes.forEach((b, i) => {
    setTimeout(() => {
      b.style.transition = "transform 0.15s ease-out, box-shadow 0.15s";
      b.style.transform = "scale(1.22)";
      b.style.boxShadow = "0 0 10px var(--amber-400)";
      setTimeout(() => {
        b.style.transform = "";
        b.style.boxShadow = "";
      }, 200);
    }, i * 90);
  });
  // Reverse sweep (right→left) after a pause
  const delay = boxes.length * 90 + 350;
  [...boxes].reverse().forEach((b, i) => {
    setTimeout(
      () => {
        b.style.transition = "transform 0.15s ease-out, box-shadow 0.15s";
        b.style.transform = "scale(1.22)";
        b.style.boxShadow = "0 0 10px #9b8fe8";
        setTimeout(() => {
          b.style.transform = "";
          b.style.boxShadow = "";
        }, 200);
      },
      delay + i * 90,
    );
  });
  setTimeout(
    () => setFb("↔️ Palíndromo!", "ok"),
    delay + boxes.length * 90 + 150,
  );
  setTimeout(() => setFb("", ""), delay + boxes.length * 90 + 3000);
}

function eeThematicWord() {
  if (["FESTA", "BAILE"].includes(WORD)) {
    setTimeout(eeCanvasConfetti, 200);
    setTimeout(eeCanvasConfetti, 550);
  } else if (["FOGO", "CHAMA"].includes(WORD)) {
    _eeFireParticles();
  } else if (WORD === "GATO") {
    _eeCornerEmoji("🐱");
  } else if (["BRUXO", "MAGIA"].includes(WORD)) {
    _eeGlyphPulse("#a855f7");
  } else if (
    [
      "RADIO",
      "R\u00c1DIO",
      "RITMO",
      "NOTAS",
      "DRONE",
      "MUSICA",
      "M\u00daSICA",
      "FAIXA",
    ].includes(WORD)
  ) {
    queueAch("ee_radio_word");
    // Easter egg rádio: abre player tocando + toast
    setTimeout(() => {
      if (typeof mfpShow === "function") {
        window._mfpEEChannel && window._mfpEEChannel(undefined, true);
        mfpShow();
        showEEToast("🎶 Esse glifo pede uma trilha sonora!");
      }
    }, 700);
  } else if (["NAVE", "MARTE", "ASTRO", "OVNI", "LASER"].includes(WORD)) {
    // Easter egg espacial: removido do eeThematicWord — gatilho está no decode()
  }
}
function _eeFireParticles() {
  const colors = ["#ff4500", "#ff8c00", "#ffa500", "#ff6347"];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    const size = 7 + Math.random() * 12;
    p.style.cssText =
      `position:fixed;width:${size}px;height:${size}px;` +
      `background:${colors[Math.floor(Math.random() * colors.length)]};` +
      `border-radius:50% 50% 50% 0;` +
      `left:${20 + Math.random() * 60}vw;bottom:${3 + Math.random() * 10}vh;` +
      `pointer-events:none;z-index:9999;` +
      `animation:confPop ${0.9 + Math.random() * 0.7}s ease-out forwards;` +
      `--tx:${(Math.random() - 0.5) * 120}px;` +
      `--ty:${-120 - Math.random() * 200}px;` +
      `animation-delay:${Math.random() * 0.5}s;`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1900);
  }
}
function _eeCornerEmoji(emoji) {
  const el = document.createElement("div");
  el.textContent = emoji;
  el.style.cssText =
    `position:fixed;bottom:24px;right:24px;font-size:3rem;` +
    `z-index:9999;pointer-events:none;` +
    `animation:eeCornerPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.5s";
    setTimeout(() => el.remove(), 550);
  }, 2800);
}
function _eeGlyphPulse(color) {
  const layers = document.querySelectorAll("#glyph-stage .glayer");
  layers.forEach((l) => {
    l.style.transition = "filter 0.4s ease";
    l.style.filter = `drop-shadow(0 0 18px ${color}) hue-rotate(200deg)`;
    setTimeout(() => {
      l.style.filter = "";
      setTimeout(() => (l.style.transition = ""), 450);
    }, 1400);
  });
}

function eeCanvasConfetti() {
  const fire = () =>
    window.confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#f5a623", "#9b8fe8", "#5bbfa0", "#e87a6b", "#60a5fa"],
    });
  if (window.confetti) {
    fire();
    return;
  }
  const sc = document.createElement("script");
  sc.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
  sc.onload = fire;
  sc.onerror = _eeLocalConfetti; // fallback offline
  document.head.appendChild(sc);
}

/* ════════════════════════════════════════════
         GLOBAL EASTER EGGS
         ════════════════════════════════════════════ */

// ── Toast helper ──
function showEEToast(msg, ms) {
  const t = document.getElementById("eetoast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._eet);
  t._eet = setTimeout(() => t.classList.remove("show"), ms || 5000);
}

// ── Snake minigame ──
function openSnakeGame() {
  const modal = document.getElementById("snake-modal");
  modal.classList.add("show");
  const canvas = document.getElementById("snake-canvas");
  const ctx2d = canvas.getContext("2d");
  const CELLS = 20,
    CS = 10;
  let snake, dir, food, score, loop;

  function placeFood() {
    do {
      food = {
        x: Math.floor(Math.random() * CELLS),
        y: Math.floor(Math.random() * CELLS),
      };
    } while (snake.some((s) => s.x === food.x && s.y === food.y));
  }
  function resetSnake() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    dir = { x: 1, y: 0 };
    score = 0;
    document.getElementById("snake-score").textContent = "🍎 0";
    placeFood();
  }
  function drawSnake() {
    const bg =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--surface")
        .trim() || "#fff";
    ctx2d.fillStyle = bg;
    ctx2d.fillRect(0, 0, 200, 200);
    ctx2d.fillStyle = "#f5a623";
    ctx2d.fillRect(food.x * CS, food.y * CS, CS - 1, CS - 1);
    snake.forEach((s, i) => {
      ctx2d.fillStyle = i === 0 ? "#5bbfa0" : "#9b8fe8";
      ctx2d.fillRect(s.x * CS, s.y * CS, CS - 1, CS - 1);
    });
  }
  function tick() {
    const h = {
      x: (snake[0].x + dir.x + CELLS) % CELLS,
      y: (snake[0].y + dir.y + CELLS) % CELLS,
    };
    if (snake.some((s) => s.x === h.x && s.y === h.y)) {
      clearInterval(loop);
      ctx2d.fillStyle = "rgba(0,0,0,0.55)";
      ctx2d.fillRect(0, 0, 200, 200);
      ctx2d.fillStyle = "#fff";
      ctx2d.textAlign = "center";
      ctx2d.font = "bold 13px monospace";
      ctx2d.fillText("Game Over 💀", 100, 90);
      ctx2d.font = "10px monospace";
      ctx2d.fillText("clique para jogar de novo", 100, 112);
      canvas.style.cursor = "pointer";
      canvas.onclick = () => {
        canvas.onclick = null;
        canvas.style.cursor = "default";
        startSnake();
      };
      return;
    }
    snake.unshift(h);
    if (h.x === food.x && h.y === food.y) {
      score++;
      document.getElementById("snake-score").textContent = "🍎 " + score;
      placeFood();
    } else {
      snake.pop();
    }
    drawSnake();
  }
  function startSnake() {
    clearInterval(loop);
    resetSnake();
    drawSnake();
    loop = setInterval(tick, 120);
  }

  const kh = (e) => {
    const map = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    if (map[e.key]) {
      const nd = map[e.key];
      if (nd.x !== -dir.x || nd.y !== -dir.y) dir = nd;
      e.preventDefault();
    }
    if (e.key === "Escape") closeSnake();
  };
  function closeSnake() {
    clearInterval(loop);
    document.removeEventListener("keydown", kh);
    modal.classList.remove("show");
  }
  document.addEventListener("keydown", kh);
  document.getElementById("snake-close").onclick = closeSnake;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSnake();
  });
  startSnake();
}

// ── Space Invaders minigame ──
function openInvadersGame() {
  const modal = document.getElementById("invaders-modal");
  modal.classList.add("show");
  const canvas = document.getElementById("invaders-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const COLS = 8,
    ROWS = 3;
  const AW = 22,
    AH = 16,
    GAP_X = 6,
    GAP_Y = 10;
  const PW = 28,
    PH = 10;
  const ALIEN_OFF_X = 16;

  let player, aliens, bullets, aBullets, score, lives;
  let alienDir, alienSpeed, aBulletTimer, shootCD, wave;
  let gameOver, keys;

  function placeAliens() {
    aliens = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        aliens.push({
          x: ALIEN_OFF_X + c * (AW + GAP_X),
          y: 20 + r * (AH + GAP_Y),
          alive: true,
          type: r === 0 ? 2 : r === 1 ? 1 : 0,
        });
  }

  function reset() {
    player = { x: W / 2 - PW / 2, y: H - 18 };
    bullets = [];
    aBullets = [];
    score = 0;
    lives = 3;
    wave = 1;
    alienDir = 1;
    alienSpeed = 0.55;
    aBulletTimer = 40;
    shootCD = 0;
    gameOver = false;
    keys = {};
    placeAliens();
    updateHUD();
  }

  function updateHUD() {
    document.getElementById("invaders-score").innerHTML =
      "\ud83d\udc7e " + score + " &nbsp; \u2764\ufe0f " + lives;
  }

  function getCSS(v) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(v)
      .trim();
  }

  function drawAlien(a) {
    const clr = ["#9b8fe8", "#5bbfa0", "#f5a623"][a.type];
    const bg = getCSS("--surface") || "#1a1a2e";
    ctx.fillStyle = clr;
    ctx.fillRect(a.x + 3, a.y + 3, AW - 6, AH - 6);
    ctx.fillRect(a.x + 5, a.y, 3, 4);
    ctx.fillRect(a.x + AW - 8, a.y, 3, 4);
    ctx.fillRect(a.x, a.y + 5, 4, 4);
    ctx.fillRect(a.x + AW - 4, a.y + 5, 4, 4);
    ctx.fillStyle = bg;
    ctx.fillRect(a.x + 7, a.y + 5, 3, 3);
    ctx.fillRect(a.x + AW - 10, a.y + 5, 3, 3);
  }

  function drawPlayer() {
    ctx.fillStyle = "#5bbfa0";
    ctx.fillRect(player.x + 6, player.y + 4, PW - 12, PH - 4);
    ctx.fillRect(player.x + 11, player.y, PW - 22, 6);
    ctx.fillRect(player.x + PW / 2 - 1, player.y - 5, 3, 7);
  }

  function tick() {
    if (gameOver) return;

    if (keys["ArrowLeft"] || keys["a"]) player.x = Math.max(0, player.x - 3);
    if (keys["ArrowRight"] || keys["d"])
      player.x = Math.min(W - PW, player.x + 3);

    if ((keys[" "] || keys["ArrowUp"]) && shootCD <= 0 && bullets.length < 2) {
      bullets.push({ x: player.x + PW / 2 - 1, y: player.y - 5 });
      shootCD = 20;
    }
    if (shootCD > 0) shootCD--;

    bullets = bullets.filter((b) => {
      b.y -= 7;
      return b.y > -8;
    });

    const living = aliens.filter((a) => a.alive);
    if (!living.length) {
      wave++;
      alienSpeed = Math.min(2.2, 0.55 + wave * 0.28);
      placeAliens();
      updateHUD();
      return;
    }

    let hitEdge = false;
    living.forEach((a) => {
      a.x += alienDir * alienSpeed;
      if (a.x + AW >= W - 1 || a.x <= 1) hitEdge = true;
    });
    if (hitEdge) {
      alienDir *= -1;
      living.forEach((a) => (a.y += 12));
    }

    if (--aBulletTimer <= 0 && living.length) {
      const s = living[Math.floor(Math.random() * living.length)];
      aBullets.push({ x: s.x + AW / 2 - 1, y: s.y + AH });
      aBulletTimer = Math.max(18, 45 - wave * 4);
    }
    aBullets = aBullets.filter((b) => {
      b.y += 3;
      return b.y < H + 8;
    });

    // Player bullets hit aliens
    outer: for (let bi = bullets.length - 1; bi >= 0; bi--) {
      const b = bullets[bi];
      for (let ai = 0; ai < aliens.length; ai++) {
        const a = aliens[ai];
        if (!a.alive) continue;
        if (
          b.x < a.x + AW &&
          b.x + 3 > a.x &&
          b.y < a.y + AH &&
          b.y + 8 > a.y
        ) {
          a.alive = false;
          bullets.splice(bi, 1);
          score += (a.type + 1) * 10;
          updateHUD();
          continue outer;
        }
      }
    }

    // Alien bullets hit player
    for (let bi = aBullets.length - 1; bi >= 0; bi--) {
      const b = aBullets[bi];
      if (
        b.x < player.x + PW &&
        b.x + 3 > player.x &&
        b.y < player.y + PH &&
        b.y + 8 > player.y
      ) {
        aBullets.splice(bi, 1);
        if (--lives <= 0) {
          gameOver = true;
          draw();
          showGO();
          return;
        }
        updateHUD();
      }
    }

    // Aliens reach player line
    if (living.some((a) => a.y + AH >= player.y - 2)) {
      gameOver = true;
      draw();
      showGO();
      return;
    }

    draw();
  }

  function draw() {
    const bg = getCSS("--surface") || "#1a1a2e";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // Starfield
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let i = 0; i < 35; i++)
      ctx.fillRect((i * 83 + 11) % W, (i * 47 + 3) % H, 1, 1);
    aliens.forEach((a) => {
      if (a.alive) drawAlien(a);
    });
    drawPlayer();
    ctx.fillStyle = "#f5a623";
    bullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 8));
    ctx.fillStyle = "#e87a6b";
    aBullets.forEach((b) => ctx.fillRect(b.x, b.y, 3, 7));
  }

  function showGO() {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "bold 13px monospace";
    ctx.fillText("Game Over \ud83d\udc80", W / 2, H / 2 - 14);
    ctx.font = "10px monospace";
    ctx.fillText("Pontuação: " + score, W / 2, H / 2 + 4);
    ctx.fillText("clique para tentar de novo", W / 2, H / 2 + 22);
    canvas.style.cursor = "pointer";
    canvas.onclick = () => {
      canvas.onclick = null;
      canvas.style.cursor = "default";
      clearInterval(loop);
      reset();
      loop = setInterval(tick, 1000 / 50);
    };
  }

  let loop;
  function start() {
    clearInterval(loop);
    reset();
    loop = setInterval(tick, 1000 / 50);
  }

  const kd = (e) => {
    keys[e.key] = true;
    if ([" ", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();
    if (e.key === "Escape") close();
  };
  const ku = (e) => {
    delete keys[e.key];
  };

  function close() {
    clearInterval(loop);
    document.removeEventListener("keydown", kd);
    document.removeEventListener("keyup", ku);
    modal.classList.remove("show");
  }

  document.addEventListener("keydown", kd);
  document.addEventListener("keyup", ku);
  document.getElementById("invaders-close").onclick = close;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  start();
}

// ── Konami Code ──
(function () {
  const SEQ = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let p = 0;
  document.addEventListener("keydown", (e) => {
    if (e.key === SEQ[p]) {
      p++;
      if (p === SEQ.length) {
        p = 0;
        queueAch("ee_konami");
        showEEToast(
          "Você realmente tentou código de trapaça num jogo de palavras... 🤦 Respeito.",
        );
        document.body.classList.add("ee-konami");
        setTimeout(() => document.body.classList.remove("ee-konami"), 3000);
      }
    } else {
      p = e.key === SEQ[0] ? 1 : 0;
    }
  });
})();

// ── DevTools detector ──
(function () {
  let open = false;
  setInterval(() => {
    const is =
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160;
    if (is && !open) {
      open = true;
      showEEToast(
        "Oi? Tô vendo você ali no console... pensou que eu não ia notar? 🕵️",
      );
    } else if (!is) open = false;
  }, 2500);
})();

// ── Idle tab title rotator ──
(function () {
  const ORIG = document.title;
  const msgs = [
    "...você ainda tá aí? 👀",
    "Eu fico esperando, pode deixar...",
    "Ok. Tudo bem. Sem problema.",
    "🦗 *som de grilo*",
    "Ainda aqui. 😐",
    "...vai jogar ou vai ficar aí?",
  ];
  let idleT = null,
    rotT = null,
    mi = 0;
  function startRot() {
    mi = 0;
    rotT = setInterval(() => {
      document.title = msgs[mi++ % msgs.length];
    }, 4000);
  }
  function reset() {
    clearTimeout(idleT);
    clearInterval(rotT);
    document.title = ORIG;
    idleT = setTimeout(startRot, 30000);
  }
  ["mousemove", "keydown", "click", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, reset, { passive: true }),
  );
  reset();
})();

// ── Logo "." → 3 cliques = Snake ──
(function () {
  const dot = document.querySelector(".logo-dot");
  if (!dot) return;
  dot.title = "";
  let n = 0,
    t = null;
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    n++;
    clearTimeout(t);
    if (n >= 3) {
      n = 0;
      queueAch("ee_snake");
      openSnakeGame();
    } else
      t = setTimeout(() => {
        n = 0;
      }, 1500);
  });
})();

// ── Logo "foo" → 5 cliques = wobble + toast ──
(function () {
  const foo = document.querySelector(".logo-foo");
  if (!foo) return;
  let n = 0,
    t = null;
  foo.addEventListener("click", (e) => {
    e.preventDefault();
    n++;
    clearTimeout(t);
    if (n >= 5) {
      n = 0;
      queueAch("ee_foo");
      foo.classList.remove("ee-logo-run");
      void foo.offsetWidth;
      foo.classList.add("ee-logo-run");
      showEEToast("Oi! Para de clicar no foo! 😤");
      foo.addEventListener(
        "animationend",
        () => foo.classList.remove("ee-logo-run"),
        { once: true },
      );
    } else {
      t = setTimeout(() => {
        n = 0;
      }, 1500);
    }
  });
})();

// ── SomaFM Player ──────────────────────────────────────────────────────
(function () {
  const MFP_KEY = "gliffoo_mfp";
  const SOMA_CHANNELS = [
    {
      name: "Drone Zone",
      desc: "Ambient espacial",
      url: "https://ice1.somafm.com/dronezone-128-mp3",
    },
    {
      name: "Groove Salad",
      desc: "Downtempo / eletrônico",
      url: "https://ice1.somafm.com/groovesalad-128-mp3",
    },
    {
      name: "Space Station",
      desc: "Ambient / sci-fi",
      url: "https://ice1.somafm.com/spacestation-128-mp3",
    },
    {
      name: "Suburbs of Goa",
      desc: "Chillout / world",
      url: "https://ice1.somafm.com/suburbsofgoa-128-mp3",
    },
    {
      name: "Sonic Universe",
      desc: "Jazz fusão / nu-jazz",
      url: "https://ice1.somafm.com/sonicuniverse-128-mp3",
    },
  ];

  let _st = { idx: 0 };
  let _eeClickN = 0,
    _eeClickT = null; // EE: 5 cliques no botão ♫
  let _eeChSwitch = 0,
    _eeChT = null; // EE: trocar canal 5x
  const _audio = new Audio();
  _audio.preload = "none";

  function _save() {
    try {
      localStorage.setItem(MFP_KEY, JSON.stringify(_st));
    } catch {}
  }
  function _updateUI() {
    const ch = SOMA_CHANNELS[_st.idx];
    const titleEl = document.getElementById("mfp-title");
    const playBtn = document.getElementById("mfp-play");
    if (titleEl) titleEl.textContent = ch.name + " \u2014 " + ch.desc;
    if (playBtn)
      playBtn.innerHTML = _audio.paused
        ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>'
        : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
  }
  function _setChannel(idx, play) {
    _st.idx = idx;
    _audio.src = SOMA_CHANNELS[idx].url;
    _audio.load();
    if (play) _audio.play().catch(() => {});
    _updateUI();
    _save();
    // EE: trocar canal 5x em 10s
    clearTimeout(_eeChT);
    _eeChSwitch++;
    _eeChT = setTimeout(() => {
      _eeChSwitch = 0;
    }, 10000);
    if (_eeChSwitch >= 5) {
      _eeChSwitch = 0;
      setTimeout(() => showEEToast("😅 Indeciso? Cada canal é bom!"), 300);
    }
  }
  function mfpTogglePlay() {
    if (_audio.paused) {
      if (!_audio.src) _setChannel(_st.idx, true);
      else _audio.play().catch(() => {});
    } else {
      _audio.pause();
    }
  }
  function mfpNext() {
    _setChannel((_st.idx + 1) % SOMA_CHANNELS.length, !_audio.paused);
  }
  function mfpPrev() {
    _setChannel(
      (_st.idx - 1 + SOMA_CHANNELS.length) % SOMA_CHANNELS.length,
      !_audio.paused,
    );
  }
  function mfpShow() {
    const bar = document.getElementById("mfp-bar");
    if (!bar) return;
    bar.removeAttribute("hidden");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        bar.classList.add("show");
        document.body.classList.add("mfp-open");
      }),
    );
    if (!_audio.src) _setChannel(_st.idx, false);
    _updateUI();
  }
  function mfpHide() {
    const bar = document.getElementById("mfp-bar");
    if (!bar) return;
    bar.classList.remove("show");
    document.body.classList.remove("mfp-open");
    _audio.pause();
    setTimeout(() => bar.setAttribute("hidden", ""), 350);
    _save();
    _updateUI();
  }

  _audio.addEventListener("play", _updateUI);
  _audio.addEventListener("pause", _updateUI);

  // Restore from localStorage
  try {
    const saved = JSON.parse(localStorage.getItem(MFP_KEY));
    if (
      saved &&
      Number.isInteger(saved.idx) &&
      saved.idx >= 0 &&
      saved.idx < SOMA_CHANNELS.length
    )
      _st.idx = saved.idx;
  } catch {}

  window.mfpShow = mfpShow;
  window.mfpHide = mfpHide;
  window.mfpTogglePlay = mfpTogglePlay;
  window.mfpNext = mfpNext;
  window.mfpPrev = mfpPrev;
  // Expose helpers for easter eggs
  window._mfpIsPlaying = () => !_audio.paused;
  window._mfpEEChannel = (idx, play) => {
    const i =
      idx !== undefined
        ? idx
        : Math.floor(Math.random() * SOMA_CHANNELS.length);
    _setChannel(i, !!play);
  };
  // EE footer btn: 5 cliques em 2s → canal aleatório + toast
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".footer-mfp-btn")) return;
    clearTimeout(_eeClickT);
    _eeClickN++;
    _eeClickT = setTimeout(() => {
      _eeClickN = 0;
    }, 2000);
    if (_eeClickN >= 5) {
      _eeClickN = 0;
      queueAch("ee_radio_random");
      const ni = Math.floor(Math.random() * SOMA_CHANNELS.length);
      _setChannel(ni, !_audio.paused);
      mfpShow();
      const msgs = [
        "🎲 Canal aleatório ativado!",
        "📡 Sintonizando o universo…",
        "🎶 Surpresa! " + SOMA_CHANNELS[ni].name,
      ];
      showEEToast(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  });
  _updateUI();
})();
