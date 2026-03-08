const PALAVRAS: Record<string, string[]> = {
  facil: [
    "ACAO", "AGIR", "AGUA", "ALHO", "ALMA", "ALTA", "ALTO", "ALVO", "AMAR", "AMEM",
    "AMOR", "ANEL", "ANJO", "ANOS", "AQUI", "ARCO", "AREA", "ARMA", "ARTE", "ATOR",
    "AULA", "AUTO", "AZUL", "BASE", "BEBE", "BELA", "BELO", "BENS", "BICO", "BOAS",
    "BOCA", "BOLA", "BOLO", "BONS", "BOTA", "BUDA", "CABO", "CACA", "CADA", "CAES",
    "CAFE", "CAIR", "CAMA", "CAOS", "CAPA", "CARA", "CARO", "CASA", "CASO", "CEDO",
    "CENA", "CEUS", "CHAO", "CIMA", "COLA", "COLO", "COMO", "COPA", "COPO", "CRER",
    "CRUZ", "CUBO", "CURA", "DADO", "DANO", "DATA", "DEDO", "DEUS", "DIAS", "DICA",
    "DOCE", "DOIS", "DONA", "DONO", "DOSE", "DOZE", "DUAS", "DURA", "DURO", "EIXO",
    "ERRO", "ERVA", "EURO", "FACA", "FACE", "FALA", "FAMA", "FASE", "FATO", "FEIO",
    "FIEL", "FILA", "FINA", "FINO", "FINS", "FIOS", "FITA", "FIXA", "FIXO", "FLOR",
    "FOCO", "FOFO", "FOGO", "FOME", "FONE", "FORA", "FOTO", "FRIA", "FRIO", "FUGA",
    "FUMO", "GAMA", "GATA", "GATO", "GELO", "GRAU", "GUIA", "HOJE", "HORA", "ILHA",
    "INOX", "IRMA", "ISCA", "ISTO", "ITEM", "JATO", "JOGO", "JUIZ", "JURI", "LADO",
    "LAGO", "LATA", "LAVA", "LEAO", "LEIS", "LEVE", "LIGA", "LIMA", "LIXO", "LOBO",
    "LOGO", "LOJA", "LONA", "LOTE", "LULA", "LUPA", "LUTA", "LUXO", "MAIA", "MAIO",
    "MAIS", "MALA", "MANO", "MAOS", "MAPA", "MATA", "MATO", "MAUS", "MEDO", "MEIA",
    "MEIO", "MENU", "MESA", "META", "MEUS", "MITO", "MOCA", "MODA", "MODO", "MORA",
    "MOTO", "MUDA", "MURO", "NETO", "NEVE", "NOME", "NOTA", "NOVA", "NOVE", "NOVO",
    "OBRA", "OCIO", "ODIO", "OITO", "OLEO", "OLHO", "ONDA", "ONDE", "ORAL", "OURO",
    "OVOS", "PAIS", "PANO", "PAPA", "PAPO", "PATO", "PECA", "PELE", "PENA", "PESO",
    "PIOR", "PISO", "PIVO", "POLO", "POVO", "PURA", "PURO", "QUAL", "QUEM", "RACA",
    "RAIO", "RAIZ", "RAMO", "RARO", "REAL", "REDE", "REIS", "RETA", "RICA", "RICO",
    "RIOS", "RODA", "ROSA", "ROTA", "RUIM", "RUMO", "SACO", "SAGA", "SAIA", "SAIR",
    "SALA", "SAPO", "SECA", "SECO", "SEDE", "SEIS", "SELO", "SETE", "SOFA", "SOJA",
    "SOLO", "SOMA", "SONO", "SONS", "SOPA", "SUCO", "TACA", "TAXA", "TELA", "TEMA",
    "TEOR", "TESE", "TETO", "TIME", "TIPO", "TIRA", "TIRO", "TOCA", "TODA", "TODO",
    "TOPO", "TREM", "TRES", "TRIO", "USAR", "UTIL", "VAGA", "VALE", "VARA", "VELA",
    "VIAS", "VICE", "VIDA", "VILA", "VIVA", "VIVO", "VOAR", "VOTO", "ZERO", "ZONA",
    "ZOOM",
  ],
  medio: [
    "ABRIL", "ABRIR", "ACIDO", "ACIMA", "ACOES", "ADEUS", "AGORA", "AJUDA", "ALBUM", "AMBAR",
    "AMIGA", "AMIGO", "ANDAR", "APELO", "APOIO", "AREAS", "ARFAR", "ARTES", "ATRAS", "ATRIZ",
    "ATUAL", "AUTOR", "BAIXA", "BAIXO", "BANCO", "BANDA", "BANHO", "BARCO", "BASTA", "BATER",
    "BEBER", "BEIJO", "BEIRA", "BELAS", "BISPO", "BLUSA", "BOLSA", "BRACO", "BREVE", "BRIGA",
    "BROTO", "BUSCA", "CABOS", "CAIXA", "CALDO", "CALOR", "CAMPO", "CANAL", "CAPAZ", "CAPIM",
    "CARGO", "CARNE", "CARRO", "CARTA", "CASAL", "CASAS", "CASOS", "CAUSA", "CERCA", "CERTA",
    "CERTO", "CHAVE", "CHEFE", "CHEIA", "CHEIO", "CHUVA", "CINCO", "CINZA", "CIRCO", "CITAR",
    "CIVIL", "CLARO", "CLIMA", "CLIPE", "CLUBE", "COBRA", "COBRE", "COISA", "COLAR", "COLMO",
    "COMER", "COMUM", "CONTA", "CONTO", "COPIA", "CORES", "CORPO", "CORTE", "CORVO", "COSTA",
    "COURO", "CRIAR", "CRIME", "CRISE", "CULPA", "CULTO", "CURSO", "CURVA", "CUSTO", "DADOS",
    "DEDAL", "DENTE", "DICAS", "DIETA", "DISCO", "DIZER", "DOBRA", "DOCES", "DORES", "DRAMA",
    "DUPLA", "DUPLO", "EPOCA", "ESSAS", "ESSES", "ESTAR", "ESTES", "ETICA", "EXTRA", "FACIL",
    "FAIXA", "FALAR", "FALHA", "FALTA", "FARPA", "FASES", "FATOR", "FATOS", "FAVOR", "FAZER",
    "FEBRE", "FEIRA", "FEITO", "FELIZ", "FESTA", "FIBRA", "FICAR", "FICHA", "FILHA", "FILHO",
    "FILME", "FINAL", "FIRME", "FLOCO", "FOLHA", "FONTE", "FORCA", "FORMA", "FORNO", "FORTE",
    "FORUM", "FOSSO", "FRACO", "FRASE", "FRETE", "FRUTA", "FUGIR", "FUNDO", "GALHO", "GANSO",
    "GARCA", "GARFO", "GEADA", "GENIO", "GENTE", "GERAL", "GLOBO", "GOLFO", "GOLPE", "GOSTO",
    "GRACA", "GRADE", "GRAMA", "GRAUS", "GRUPO", "GRUTA", "HAVER", "HEROI", "HOMEM", "HORAS",
    "HOTEL", "HUMOR", "IDADE", "IDEAL", "IDEIA", "IGNEO", "IGUAL", "INFRA", "IRMAO", "JEITO",
    "JESUS", "JOGAR", "JOGOS", "JOVEM", "JUIZO", "JULHO", "JUNHO", "JUNTO", "JUSTA", "LANCA",
    "LANCE", "LAPIS", "LAZER", "LEGAL", "LEITE", "LENDA", "LENHA", "LESAO", "LETRA", "LEVAR",
    "LIDAR", "LIDER", "LIGAR", "LINDA", "LINDO", "LINHA", "LISTA", "LIVRE", "LIVRO", "LOCAL",
    "LONGE", "LONGO", "LOUCA", "LUCRO", "LUGAR", "LUZES", "MAIOR", "MANGA", "MANHA", "MARCA",
    "MARCO", "MEDIA", "MEDIO", "MENOR", "MENOS", "MENTE", "MESMA", "MESMO", "METAL", "MINAS",
    "MINHA", "MOLDE", "MORTE", "MUDAR", "MUITO", "MUNDO", "NATAL", "NEGAR", "NEGRO", "NEVOA",
    "NIVEL", "NOBRE", "NOCAO", "NOITE", "NOMES", "NORTE", "NOVAS", "NUVEM", "OBRAS", "OBTER",
    "OGIVA", "OLHAR", "OLHOS", "ONTEM", "OPCAO", "OPTAR", "ORDEM", "OTIMO", "OUVIR", "PADRE",
    "PAGAR", "PALCO", "PAPEL", "PARES", "PARTE", "PARTO", "PASSO", "PECAS", "PEDIR", "PEDRA",
    "PEGAR", "PELOS", "PENAL", "PERNA", "PERTO", "PESCA", "PIANO", "PIRES", "PISTA", "PLANO",
    "PLENA", "PLENO", "POBRE", "PODER", "POETA", "POLEN", "PORTA", "PORTO", "POUCO", "POUSO",
    "PRACA", "PRAIA", "PRATA", "PRATO", "PRAZO", "PRECO", "PRESA", "PRESO", "PRETA", "PRETO",
    "PROVA", "QUASE", "QUEDA", "RADIO", "RAIVA", "RAZAO", "REAIS", "REDES", "REFEM", "REINO",
    "RENDA", "RESTO", "RISCO", "ROUPA", "SABER", "SABOR", "SAIDA", "SANTA", "SANTO", "SAUDE",
    "SECAO", "SENHA", "SERIA", "SERIE", "SERIO", "SERRA", "SETOR", "SEXTA", "SINAL", "SONHO",
    "SORTE", "SUAVE", "SUBIR", "SUITE", "SUPER", "TARDE", "TEMAS", "TEMPO", "TENIS", "TENUE",
    "TERCA", "TERMO", "TERRA", "TESTE", "TIPOS", "TIRAR", "TODAS", "TODOS", "TOMAR", "TROCA",
    "TURMA", "UNHAS", "UNIAO", "UNICA", "UNICO", "UTEIS", "VAGAS", "VALOR", "VELHA", "VELHO",
    "VENDA", "VERAO", "VERDE", "VEZES", "VIDAS", "VIDEO", "VISAO", "VISTA", "VISTO", "VIVER",
    "VOCES", "VOLTA",
  ],
  dificil: [
    "ABAIXO", "ABERTO", "ABISMO", "ABRACO", "ACERVO", "ACESSO", "ACORDO", "AFINAL", "AGOSTO", "AJUDAR",
    "AJUSTE", "ALBUNS", "ALEGRE", "ALGUNS", "ALTURA", "AMIGOS", "AMORES", "ANFORA", "ANTIGO", "APESAR",
    "AQUILO", "ARGILA", "ARIDEZ", "ARTIGO", "ARVORE", "ASTUTO", "BAIRRO", "BAIXAR", "BASICO", "BEIJOS",
    "BELEZA", "BOTECO", "BRACOS", "BRANCO", "BRILHO", "BRINDE", "BURACO", "BUSCAR", "CABECA", "CABELO",
    "CADEIA", "CAMBIO", "CAMPUS", "CANELA", "CANETA", "CARROS", "CARTAO", "CARTAZ", "CAVALO", "CEBOLA",
    "CENTRO", "CHARCO", "CHARME", "CHAVES", "CHEGAR", "CHEIRO", "CHINES", "CHOQUE", "CHUMBO", "CHUVAS",
    "CIDADE", "CINEMA", "CITADO", "CLAMOR", "CLARAO", "CLAROS", "CLASSE", "CLIQUE", "COBAIA", "COBICA",
    "CODIGO", "COISAS", "COLEGA", "COLETA", "COLHER", "COLUNA", "COMIGO", "COMITE", "COMPRA", "COMUNS",
    "CONCHA", "CONTAR", "CONTAS", "CONTER", "CORTES", "CORUJA", "CRISTA", "CRISTO", "CUIDAR", "CURSOS",
    "DANCAR", "DEBATE", "DEDALO", "DEFESA", "DEIXAR", "DEMAIS", "DESEJO", "DESSAS", "DESSES", "DESTES",
    "DIANTE", "DIARIO", "DIESEL", "DILEMA", "DIRETA", "DIRETO", "DOENCA", "DROGAS", "DUENDE", "DUVIDA",
    "EDICAO", "EDITAL", "EDITAR", "EDITOR", "EFEITO", "EFICAZ", "ENFASE", "ENIGMA", "ENSINO", "ENTRAR",
    "ENVIAR", "EQUIPE", "ESCALA", "ESCOLA", "ESCUDO", "ESCURO", "ESPACO", "ESPADA", "ESPUMA", "ESTADO",
    "ESTILO", "ESTIMA", "ESTOJO", "ESTUDO", "EVENTO", "EVITAR", "EXIGUO", "EXTASE", "FABULA", "FALCAO",
    "FECHAR", "FEIJAO", "FEITOS", "FERIAS", "FERIDA", "FIGURA", "FILHOS", "FILMES", "FILTRO", "FISCAL",
    "FISICA", "FLECHA", "FLORES", "FOLHAS", "FORCAS", "FORMAS", "FRANCO", "FRASCO", "FREIRA", "FRENTE",
    "FRUTAS", "FULCRO", "FUNCAO", "FUNDOS", "FUTURO", "GALERA", "GANHAR", "GAZELA", "GERAIS", "GESTAO",
    "GESTOR", "GOSTAR", "GRANDE", "GRATIS", "GRAVES", "GREMIO", "GRUPOS", "GUARDA", "GUERRA", "HEROIS",
    "HOMENS", "HOTEIS", "HUMANO", "IGREJA", "IMAGEM", "INDICE", "INGLES", "INICIO", "INOCUO", "JARDIM",
    "JORNAL", "JOVENS", "JUDEUS", "JULGAR", "JUNTAS", "LABIOS", "LACUNA", "LEGAIS", "LEITOR", "LETRAS",
    "LIGADO", "LIMPAR", "LINGUA", "LINHAS", "LIVRES", "LIVROS", "LOCAIS", "LOGICA", "MACULA", "MANTER",
    "MANUAL", "MARIDO", "MATRIZ", "MAXIMO", "MAZELA", "MEDICA", "MEDICO", "MEDIDA", "MELHOR", "MENINA",
    "MENSAL", "MINGUA", "MINHAS", "MINIMO", "MISSAO", "MODELO", "MOEDAS", "MORADA", "MOTIVO", "MUITAS",
    "MUITOS", "MULHER", "MUSICA", "MUSICO", "NACOES", "NASCER", "NEGROS", "NOMADE", "NORMAL", "NUBLAR",
    "NUCLEO", "NUMERO", "OCULTO", "OFERTA", "OFICIO", "ONIBUS", "OPCOES", "ORIGEM", "PACOTE", "PADRAO",
    "PAGINA", "PAINEL", "PAISES", "PALIDO", "PAREDE", "PARQUE", "PARTES", "PARTIR", "PASSAR", "PASTOR",
    "PECADO", "PEDACO", "PEDIDO", "PEDRAS", "PENEDO", "PENSAR", "PERDAO", "PERDER", "PERFIL", "PERIGO",
    "PEROLA", "PESADO", "PESSOA", "PILOTO", "PINTAR", "PIORES", "PISTAO", "POBRES", "POESIA", "POMBAL",
    "PONTOS", "PORTAL", "PORTAS", "POSTAR", "POUCOS", "PRANTO", "PRATOS", "PRAZER", "PREDIO", "PREMIO",
    "PRESSA", "PREVIA", "PRISAO", "PRISMA", "PROEZA", "PRONTO", "PROTON", "PUNHAL", "QUADRO", "QUANTO",
    "QUARTA", "QUARTO", "QUATRO", "QUEBRA", "QUEIJO", "QUILHA", "QUINTA", "QUINZE", "RAIZES", "RAPIDO",
    "RAZOES", "REGIAO", "REGRAS", "RESTIA", "RESUMO", "ROUPAS", "RUNICO", "SABADO", "SANGUE", "SANTOS",
    "SECULO", "SEGUIR", "SEGURA", "SEGURO", "SEMANA", "SENADO", "SENHOR", "SENTIR", "SEXUAL", "SOBRIO",
    "SOCIAL", "SOLENE", "TACITO", "TALVEZ", "TAREFA", "TEATRO", "TECIDO", "TENTAR", "TEORIA", "TERMOS",
    "TEXTOS", "TITULO", "TONICO", "TORNAR", "TRECHO", "TRILHA", "ULTIMA", "ULTIMO", "UMBRAL", "UNIDAS",
    "UNIDOS", "VARIAS", "VARIOS", "VENDAS", "VENDER", "VERSAO", "VESTIR", "VIAGEM", "VIDEOS", "VISITA",
    "VOLTAR", "ZENITE",
  ],
  muito_dificil: [
    "ABOBADA", "ABSURDO", "ADESIVO", "ADULTOS", "AGENCIA", "ALEGRIA", "ANALISE", "ANIMAIS", "AQUELES", "ARQUIVO",
    "ARTIGOS", "ASPECTO", "ASSIDUO", "ASSUNTO", "ATAVICO", "ATENCAO", "ATRAVES", "AUMENTO", "AUTORES", "AVENIDA",
    "BARULHO", "BOLETIM", "BRAVURA", "BRUXEDO", "CADERNO", "CADINHO", "CAMINHO", "CANFORA", "CAPITAL", "CARDEAL",
    "CASTELO", "CELEUMA", "CELULAR", "CENARIO", "CENTRAL", "CERTEZA", "CETACEO", "CIDADES", "CIENCIA", "CINTURA",
    "CIZANIA", "CLIENTE", "CODORNA", "COLOCAR", "COMBATE", "COMECAR", "COMEDIA", "COMPRAR", "COMPRAS", "CONDUTA",
    "CONLUIO", "CONSIGO", "CONSUMO", "CONTATO", "CORAGEM", "COSTUME", "COZINHA", "CREDITO", "CRIACAO", "CRIANCA",
    "CRISTAL", "CRISTAO", "CUIDADO", "CULTURA", "DEBAIXO", "DECISAO", "DELICIA", "DESAFIO", "DESFILE", "DESTINO",
    "DEVASSO", "DIFICIL", "DIGITAL", "DIRECAO", "DIREITO", "DIRETOR", "DISPUTA", "DITONGO", "DOLARES", "DOMINGO",
    "DURANTE", "DUVIDAS", "ECLIPSE", "EDITORA", "EFEMERO", "EFLUVIO", "EMBUSTE", "EMPREGO", "EMPRESA", "ENERGIA",
    "ENTANTO", "ENTRADA", "ENTREGA", "ESCOLAR", "ESCOLAS", "ESCOLHA", "ESCRITA", "ESCRITO", "ESPECIE", "ESPELHO",
    "ESPORTE", "ESTADIO", "ESTADOS", "ESTAGIO", "ESTIGMA", "ESTRADA", "ESTRELA", "ESTUDAR", "ESTUDIO", "ESTUDOS",
    "EXCLUIR", "EXEMPLO", "FABRICA", "FALACIA", "FAMILIA", "FARINHA", "FATORES", "FECHADA", "FECHADO", "FEDERAL",
    "FERIADO", "FIDUCIA", "FIGURAS", "FISSURA", "FLAGELO", "FORMULA", "FRANCES", "FRENESI", "FRIVOLO", "FUNESTO",
    "FUTEBOL", "GERACAO", "GOVERNO", "GRAFICO", "GRANDES", "HERESIA", "HORARIO", "HUMANOS", "IMAGENS", "INFORME",
    "INGLESA", "INICIAL", "INTEGRO", "INTEIRO", "JANEIRO", "JANGADA", "JAPONES", "JARDINS", "JOGADOR", "JUSTICA",
    "LAGARTA", "LEITURA", "LIMPEZA", "LINGUAS", "LISONJA", "LUCIFER", "LUGUBRE", "MAIORES", "MAIORIA", "MALOGRO",
    "MAQUINA", "MATERIA", "MEDICOS", "MEMBROS", "MEMORIA", "MENINAS", "MERCADO", "MILAGRE", "MILHOES", "MILITAR",
    "MIRAGEM", "MISTICO", "MISTURA", "MOCINHO", "MODELOS", "MOMENTO", "MONARCA", "MORINGA", "MOSTRAR", "MUDANCA",
    "MUNDIAL", "MUSICAL", "NATURAL", "NEGOCIO", "NEMESIS", "NUCLEAR", "NUMEROS", "OBLIVIO", "OBLONGO", "OFERTAS",
    "OFICIAL", "OMINOSO", "OPINIAO", "ORVALHO", "OUTUBRO", "PADROES", "PALAVRA", "PARCELA", "PAREDES", "PARTIDA",
    "PARTIDO", "PASSADO", "PELAGEM", "PEQUENA", "PEQUENO", "PERFIDO", "PERFUME", "PERIODO", "PERMITE", "PESSOAL",
    "PESSOAS", "PILATES", "PIMENTA", "PINTURA", "PIRANHA", "PISCINA", "PLACEBO", "PLACIDO", "POBREZA", "POLICIA",
    "POPULAR", "POSICAO", "POSTURA", "PRATICA", "PRATICO", "PRECISA", "PRECISO", "PRESSAO", "PROCURA", "PRODUTO",
    "PROJETO", "PROPRIA", "PROPRIO", "PROXIMA", "PROXIMO", "PUBLICA", "PUBLICO", "PUTRIDO", "QUARTOS", "QUERIDA",
    "QUERIDO", "QUESTAO", "QUIMERA", "QUINTAL", "RALADOR", "RECEBER", "RECEITA", "RECURSO", "REDUCAO", "RELACAO",
    "RELATOS", "RESULTA", "REUNIAO", "REVISAO", "REVISTA", "RIQUEZA", "ROMANCE", "SEGUIDA", "SEGUIDO", "SEGUNDA",
    "SELECAO", "SENADOR", "SENHORA", "SENTIDO", "SERVICO", "SIMPLES", "SISTEMA", "SOLUCAO", "SOMBRIO", "SOMENTE",
    "SUCESSO", "SUJEITO", "SUPORTE", "SUPREMO", "TAMANHO", "TAREFAS", "TECLADO", "TECNICA", "TECNICO", "TEMPERA",
    "TERMICA", "TORCIDA", "TRAFEGO", "TRAFICO", "TREFEGO", "TURISMO", "ULTIMAS", "UNIDADE", "USUARIO", "VALORES",
    "VEICULO", "VERDADE", "VESPERA", "VESTIDO", "VIAGENS", "VINCULO", "VIRTUDE", "VITORIA", "VONTADE", "VORTICE",
  ],
};

// Ciclo semanal de dificuldade (0=Dom, 1=Seg, ..., 6=Sáb)
const CICLO_DIF = ["facil","facil","medio","medio","dificil","dificil","muito_dificil"];

const CICLO_LABELS: Record<string, string> = {
  facil:         "Fácil",
  medio:         "Médio",
  dificil:       "Difícil",
  muito_dificil: "Muito Difícil",
};

function palavraDoDia(dateStr?: string): {
  word: string;
  nivel: string;
  nivelLabel: string;
  puzzle: number;
  date: string;
} {
  // Época: 2026-03-08 (UTC) — dia 0 = puzzle #1
  const EPOCA = new Date("2026-03-08T00:00:00Z");

  // Usa a data fornecida (YYYY-MM-DD) ou hoje em UTC
  const hoje = dateStr
    ? new Date(dateStr + "T00:00:00Z")
    : new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");

  const diasDesdeEpoca = Math.floor((hoje.getTime() - EPOCA.getTime()) / 86400000);
  const diaSemana = hoje.getUTCDay(); // 0=Dom
  const nivel = CICLO_DIF[diaSemana];
  const lista = PALAVRAS[nivel];

  // Hash determinístico (mesmo algoritmo do index.html)
  const idx = ((diasDesdeEpoca * 2654435761) >>> 0) % lista.length;

  return {
    word: lista[idx],
    nivel,
    nivelLabel: CICLO_LABELS[nivel],
    puzzle: diasDesdeEpoca + 1,
    date: hoje.toISOString().slice(0, 10),
  };
}

// URL pública do JSON hospedado no Supabase Storage
const SCHEDULE_URL =
  "https://ppssfweuotjgcfejdznn.supabase.co/storage/v1/object/public/data/words_ptbr_year.json";

// Cache em memória do schedule (reaproveitado entre invocações quentes)
let scheduleCache: { days: Array<{ date: string; word: string; nivel: string; nivelLabel: string; puzzle: number }> } | null = null;

async function palavraDoDiaSchedule(dateStr: string): Promise<ReturnType<typeof palavraDoDia> | null> {
  try {
    if (!scheduleCache) {
      const resp = await fetch(SCHEDULE_URL, { signal: AbortSignal.timeout(3000) });
      if (!resp.ok) return null;
      scheduleCache = await resp.json();
    }
    const entry = scheduleCache!.days.find((d) => d.date === dateStr);
    return entry ?? null;
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  // CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Parâmetro opcional ?date=YYYY-MM-DD (para debug / modo arquivo)
  const url = new URL(req.url);
  const dateParam = url.searchParams.get("date") ?? undefined;

  // Valida formato se fornecido
  if (dateParam && !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return new Response(JSON.stringify({ error: "Invalid date format. Use YYYY-MM-DD" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Data alvo (UTC)
  const targetDate = dateParam ??
    new Date().toISOString().slice(0, 10);

  // 1. Tenta lookup no schedule hospedado no Storage
  let result = await palavraDoDiaSchedule(targetDate);

  // 2. Fallback: cálculo on-the-fly com banco hardcoded
  if (!result) {
    result = palavraDoDia(targetDate);
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
