const PALAVRAS: Record<string, string[]> = {
  facil: [
    "ABRE", "ACAO", "AGIR", "AGUA", "ALHO", "ALMA", "ALTA", "ALTO", "ALVO", "AMAR",
    "AMOR", "ANDA", "ANEL", "ANJO", "ANTE", "ARCO", "AREA", "ARMA", "ARTE", "ASIA",
    "ATOR", "ATUA", "AULA", "AUTO", "AZUL", "BALA", "BASE", "BATA", "BATE", "BEBE",
    "BELA", "BELO", "BENS", "BETO", "BICO", "BOAS", "BOCA", "BOLA", "BOLO", "BONS",
    "BOTA", "BULE", "CABE", "CABO", "CACA", "CAES", "CAFE", "CAIO", "CAMA", "CANA",
    "CAOS", "CAPA", "CARA", "CARO", "CASA", "CASE", "CASO", "CEDO", "CEGO", "CENA",
    "CHAO", "CIMA", "CINE", "COCA", "COLA", "COLO", "COMA", "COME", "COPA", "COPO",
    "COTA", "CRER", "CRIA", "CRUZ", "CUBO", "CURA", "DADO", "DALI", "DAMA", "DANO",
    "DEDO", "DEUS", "DICA", "DIGO", "DITA", "DOCE", "DONA", "DONO", "DOSE", "DOZE",
    "DURA", "DURO", "EIXO", "ERRO", "ERVA", "FACA", "FADA", "FADO", "FALA", "FAMA",
    "FARO", "FASE", "FATO", "FAVA", "FAVO", "FAZE", "FEIO", "FENO", "FIEL", "FIGO",
    "FILA", "FINA", "FINO", "FINS", "FIOS", "FITA", "FIXA", "FIXO", "FLOR", "FOCA",
    "FOCO", "FOFA", "FOFO", "FOGO", "FOLE", "FOME", "FONE", "FORA", "FORO", "FRIA",
    "FRIO", "FUGA", "FUMO", "FURO", "GADO", "GAFE", "GALO", "GAMA", "GATA", "GATO",
    "GELO", "GEMA", "GERA", "GIRA", "GIRL", "GIRO", "GOLO", "GOTA", "GRAO", "GRAU",
    "GRID", "GUIA", "GULA", "GUME", "HALL", "HIGH", "HINO", "HITS", "HOJE", "HORA",
    "ILHA", "IRIS", "IRMA", "ISCA", "ISOL", "ISSO", "ITEM", "JATO", "JAZZ", "JOGA",
    "JOGO", "JOIO", "JUBA", "JUIZ", "JURI", "JURO", "LACA", "LACO", "LAGO", "LAMA",
    "LATA", "LAVA", "LEAL", "LEAO", "LEIO", "LEIS", "LEME", "LEOA", "LEVA", "LEVE",
    "LHES", "LIDA", "LIGA", "LIMA", "LIRA", "LISA", "LIXO", "LOBO", "LODO", "LOJA",
    "LONA", "LOTE", "LUPA", "LUTA", "LUVA", "LUXO", "MACA", "MALA", "MAMA", "MANO",
    "MAOS", "MAPA", "MARE", "MATA", "MATE", "MATO", "MEDO", "MEIA", "MENU", "MERA",
    "MESA", "META", "MICO", "MINA", "MIRA", "MITO", "MODA", "MODO", "MOLA", "MOLE",
    "MORA", "MORO", "MOTA", "MOTO", "MOVE", "MUDA", "MURO", "NABO", "NADA", "NAVE",
    "NEGA", "NETO", "NEVE", "NOEL", "NOME", "NOTA", "NOVA", "NOVE", "NOVO", "NUCA",
    "OBRA", "OCIO", "ODIO", "OITO", "OLEO", "OLHA", "OLHE", "OLHO", "ONDA", "ONZE",
    "ORAL", "ORAR", "OSSO", "OUCA", "OURO", "OUVI", "OVOS", "PACA", "PAGA", "PAGO",
    "PAIS", "PANO", "PAPA", "PAPO", "PART", "PATA", "PATO", "PEDI", "PEGA", "PEGO",
    "PELE", "PENA", "PERA", "PERU", "PESO", "PICO", "PIOR", "PIPA", "PISO", "PIVO",
    "PNEU", "POCO", "POVO", "PROL", "PURA", "PURO", "PUXA", "QUAO", "RABO", "RACA",
    "RAIO", "RAIZ", "RAMA", "RAMO", "RARA", "RARO", "RATO", "REAL", "REDE", "REIS",
    "REMO", "RETA", "RICA", "RICO", "RIOS", "RITO", "ROBO", "RODA", "ROLO", "ROSA",
    "ROTA", "ROTO", "ROXO", "RUGA", "RUIM", "RUMO", "SACO", "SAGA", "SALA", "SAPO",
    "SECA", "SECO", "SEDA", "SEDE", "SEIO", "SEIS", "SELA", "SELO", "SEMI", "SENA",
    "SETE", "SINO", "SOBE", "SOFA", "SOJA", "SOMA", "SONO", "SONS", "SOPA", "SUCO",
    "SURF", "TACA", "TAIS", "TALO", "TAVA", "TAXA", "TAXI", "TEIA", "TELA", "TEMA",
    "TENS", "TEOR", "TERA", "TESE", "TESO", "TETO", "TEUS", "TIDO", "TIRA", "TIRO",
    "TIVE", "TOFU", "TOLO", "TOMA", "TOME", "TOPO", "TRAS", "TRAZ", "TREM", "TRES",
    "TRIO", "TUBO", "UNHA", "UNIR", "URSO", "USOS", "UTIL", "VACA", "VAGA", "VALE",
    "VARA", "VASO", "VEIO", "VEJO", "VELA", "VELO", "VERA", "VETO", "VIDA", "VILA",
  ],
  medio: [
    "ABUSO", "ACENO", "ACHAR", "AGUDO", "AJUDA", "ALADO", "ALBUM", "ALTAR", "ALUNO", "AMAGO",
    "AMBAR", "AMEBA", "AMENO", "AMIGA", "AMIGO", "AMORA", "AMPLA", "AMPLO", "ANDAR", "ANDOR",
    "ANGRA", "ANTRO", "ANZOL", "AREIA", "ARFAR", "AROMA", "ASTRO", "ATRAS", "ATRIZ", "ATUAL",
    "AUDIO", "AUTOR", "AVARO", "AVEIA", "AVISO", "BABAO", "BAIXA", "BAIXO", "BALAO", "BANCO",
    "BANDA", "BANDO", "BANHA", "BANHO", "BARBA", "BARCO", "BARDO", "BARRA", "BARRO", "BASTA",
    "BEIJO", "BERCO", "BLOCO", "BOCAL", "BOLSA", "BOMBA", "BORDO", "BOTAO", "BRACO", "BRAVO",
    "BREVE", "BROCA", "BROTO", "BRUNO", "BURRO", "BUSCA", "CACHO", "CACTO", "CAIXA", "CALDO",
    "CALMO", "CALOR", "CALVO", "CAMPO", "CANAL", "CANTO", "CAPAZ", "CAPIM", "CARGA", "CARGO",
    "CARNE", "CARPA", "CARRO", "CARTA", "CASAL", "CASAS", "CASCA", "CASOS", "CASTA", "CAULE",
    "CAUSA", "CEARA", "CENTO", "CERCA", "CERCO", "CERRO", "CERTA", "CERTO", "CETRO", "CHAGA",
    "CHAMA", "CHAPA", "CHAVE", "CHEFE", "CHEIA", "CHEIO", "CHUVA", "CICLO", "CINCO", "CIRCO",
    "CISCO", "CIVIL", "CLARA", "CLARO", "CLIMA", "CLUBE", "COBRA", "COISA", "COLAR", "COLMO",
    "COMUM", "CONTO", "COPIA", "CORAL", "CORES", "COROA", "CORPO", "CORTE", "CORVO", "COSMO",
    "COSTA", "COURO", "CREDO", "CREME", "CRIAR", "CRIME", "CRISE", "CRIVO", "CULPA", "CUNHA",
    "CURSO", "CURTA", "CURTO", "CURVA", "CUSTA", "CUSTO", "DANCA", "DAQUI", "DATAS", "DEDAL",
    "DEIXA", "DEIXE", "DENSO", "DENTE", "DICAS", "DIETA", "DISCO", "DIZIA", "DOBRA", "DRAMA",
    "DUELO", "DUPLA", "ENTRA", "ENVIO", "EPOCA", "ERROS", "ETAPA", "ETICA", "EXAME", "FACIL",
    "FACTO", "FAINA", "FAIXA", "FALAR", "FALHA", "FARDO", "FARPA", "FARSA", "FARTO", "FATOS",
    "FAVOR", "FAZIA", "FEITA", "FELIZ", "FENDA", "FERRO", "FESTA", "FILHA", "FILHO", "FILME",
    "FINCA", "FIRME", "FISGA", "FLOCO", "FLORA", "FOLHA", "FOMOS", "FONTE", "FORCA", "FORJA",
    "FORNO", "FORTE", "FORUM", "FOSCO", "FOSSO", "FRASE", "FREIO", "FRETE", "FRUTA", "FUMAR",
    "FUNDO", "FUNGO", "FUNIL", "GALHO", "GANHA", "GANSO", "GARCA", "GARFO", "GARRA", "GENIO",
    "GENRO", "GLEBA", "GLOBO", "GOIAS", "GOLFO", "GOLPE", "GOMES", "GORDO", "GORJA", "GOSTA",
    "GOSTO", "GRACA", "GRADE", "GRAMA", "GRANA", "GRAVE", "GRIPE", "GROTA", "GRUTA", "HIATO",
    "HORAS", "HORTA", "HOTEL", "HUMOR", "ICONE", "IDADE", "IDEAL", "IDEIA", "IGNEO", "IGUAL",
    "INDIO", "IRMAO", "ITENS", "JAPAO", "JEITO", "JOGOS", "JOVEM", "JUNTO", "JUSTA", "LADAO",
    "LANCA", "LARGO", "LAZER", "LEGAL", "LEIRA", "LEITE", "LENHA", "LENTO", "LETAL", "LETRA",
    "LIDER", "LIGHT", "LIMBO", "LINDA", "LINHA", "LISTA", "LIVOR", "LIVRE", "LIVRO", "LOCAL",
    "LONGA", "LONGE", "LONGO", "LOUCA", "LUCRO", "LUGAR", "MACAO", "MAGRO", "MALHA", "MALTE",
    "MANGA", "MANHA", "MANSO", "MANTO", "MARCA", "MASSA", "MEDIA", "MEDIO", "MENOR", "MENTE",
    "MESES", "METAL", "METRO", "MIDIA", "MILHA", "MINAS", "MIRRA", "MOLDE", "MOLHO", "MONTE",
    "MORAL", "MORRO", "MORTE", "MORTO", "MOTOR", "MUDAR", "MUNDO", "MUSEU", "MUSGO", "MUTUO",
    "NAFTA", "NATAL", "NAVIO", "NEGRA", "NEGRO", "NERVO", "NINFA", "NIVEL", "NOCAO", "NOMES",
    "NORTE", "NOTAS", "NOVAS", "NOVOS", "OBRAS", "OBTER", "OCASO", "OGIVA", "OLHAR", "OLHOS",
    "ONTEM", "OPACO", "OPCAO", "ORCAR", "ORDEM", "ORGAO", "ORGIA", "OTIMO", "PADRE", "PALCO",
    "PALMO", "PAPEL", "PARAR", "PARIS", "PASMO", "PASSA", "PASSO", "PASTA", "PAULA", "PECAS",
    "PEDIR", "PEDIU", "PEDRA", "PEGAR", "PEIXE", "PENAL", "PENSA", "PENSO", "PERDA", "PERDE",
    "PERTO", "PIANO", "PLACA", "PLANO", "PODIA", "POLEN", "POLVO", "POMBA", "PONTA", "PONTE",
    "PONTO", "PORCO", "PORTA", "PORTO", "POSSA", "POSSE", "POSSO", "POSTO", "POTRO", "POUSO",
    "PRACA", "PRAIA", "PRATA", "PRAZO", "PRECO", "PRESA", "PRESO", "PRETA", "PRETO", "PRIMA",
  ],
  dificil: [
    "ABAIXO", "ABERTA", "ABERTO", "ABISMO", "ABRACO", "ACERVO", "ACESSO", "ACORDO", "ACUCAR", "AGENDA",
    "AGENTE", "ALCOVE", "ALEGRE", "ALMOCO", "ALTURA", "ALUGAR", "AMANHA", "AMIGOS", "ANFORA", "ANIMAL",
    "ANTIGO", "APESAR", "AQUILO", "ARGILA", "ARIDEZ", "ARTIGO", "ARVORE", "ASTUCE", "ASTUTO", "ATAQUE",
    "BAIRRO", "BAIXAR", "BELEZA", "BIBLIA", "BONITO", "BOTECO", "BOTICA", "BRANCA", "BRANCO", "BRANDA",
    "BRASIL", "BRINDE", "CABECA", "CABELO", "CALADO", "CALCIO", "CAMARA", "CAMBIO", "CAMISA", "CANELA",
    "CANETA", "CARROS", "CARTAO", "CARTAZ", "CAVALO", "CHARCO", "CHEGAR", "CHUMBO", "CIDADE", "CINEMA",
    "CLAMOR", "CLARAO", "CLIQUE", "COBAIA", "COBICA", "COLEGA", "COLUNA", "COMECO", "COMIDA", "COMIGO",
    "COMUNS", "CONCHA", "CONTAR", "CORUJA", "CRIADO", "CRISTO", "CUSTOS", "DANIEL", "DEBATE", "DECADA",
    "DECANO", "DEDALO", "DEFESA", "DEIXAR", "DEMAIS", "DESEJA", "DESEJO", "DESIGN", "DESSES", "DESTES",
    "DEVERA", "DEVIDO", "DIANTE", "DIARIO", "DILEMA", "DIRETO", "DOENCA", "DORMIR", "DRAGAO", "DROGAS",
    "DUENDE", "DUVIDA", "EDICAO", "EDITAL", "EFEITO", "ENFASE", "ENIGMA", "ENORME", "ENSINO", "ENVIAR",
    "EQUIPA", "ERRADO", "ESCOLA", "ESCUDO", "ESFERA", "ESPACO", "ESPADA", "ESPERA", "ESPIGA", "ESPOSA",
    "ESPUMA", "ESTARA", "ESTAVA", "ESTEJA", "ESTILO", "ESTOJO", "ESTUDO", "EVENTO", "EVITAR", "EXIGUO",
    "EXTASE", "FABULA", "FALCAO", "FECHAR", "FERIAS", "FERIDA", "FESTAS", "FIGURA", "FILMES", "FISCAL",
    "FISICA", "FISICO", "FLANCO", "FLECHA", "FLORES", "FORMAS", "FRAGIL", "FRASCO", "FREIRA", "FRENTE",
    "FULCRO", "FUNCAO", "FUTURO", "GALERA", "GALOPE", "GANHAR", "GAZELA", "GENERO", "GERAIS", "GERMES",
    "GESTAO", "GLOBAL", "GRACAS", "GRANDE", "GRANEL", "GRATIS", "GROSSO", "GRUPOS", "GUARDA", "GUERRA",
    "HOMENS", "HOTEIS", "HUMANO", "IGREJA", "IMAGEM", "IMOVEL", "IMPETO", "INDICE", "INICIO", "INOCUO",
    "INTIMO", "INVEJA", "JAMAIS", "JANELA", "JANTAR", "JARDIM", "JORNAL", "JURADO", "LACUNA", "LAGUNA",
    "LEITOR", "LEMBRA", "LEMBRO", "LETRAO", "LIMITE", "LINGUA", "LOCAIS", "MACULA", "MADURO", "MAGICA",
    "MALUCO", "MANTER", "MANUAL", "MARCAS", "MARCOS", "MARIDO", "MAXIMO", "MAZELA", "MEDICA", "MEDICO",
    "MEDIDA", "MELHOR", "MEMBRO", "MENINA", "MENINO", "MESTRE", "METADE", "METODO", "MIGUEL", "MILHAR",
    "MINGUA", "MINHAS", "MINIMA", "MINIMO", "MISSAO", "MOLHES", "MORADA", "MORREU", "MOSTRA", "MOTIVO",
    "MULHER", "MUSICA", "NASCEU", "NIVEIS", "NOMADE", "NORMAL", "NORMAS", "NUMERO", "OBJETO", "OCULTO",
    "OFERTA", "OFICIO", "ONIBUS", "ONLINE", "OPCOES", "ORACAO", "ORGAOS", "ORIGEM", "PADRAO", "PAGINA",
    "PAISES", "PAIXAO", "PALIDO", "PARECE", "PAREDE", "PARQUE", "PARTES", "PARTIR", "PASSAR", "PASSOS",
    "PASTOR", "PECADO", "PEDACO", "PEDIDO", "PENEDO", "PENSAR", "PERDAO", "PERDER", "PERDEU", "PERFIL",
    "PEROLA", "PILOTO", "PISTAO", "PLASMA", "PODERA", "POESIA", "POMBAL", "PONTOS", "PORTAL", "PORTAS",
    "POSSUI", "PRANTO", "PRAZER", "PREMIO", "PRESSA", "PRISAO", "PRISMA", "PROEZA", "PRONTA", "PRONTO",
    "PROTON", "PUNHAL", "QUADRO", "QUANTO", "QUARTA", "QUARTO", "QUATRO", "QUEIJO", "QUENTE", "QUERER",
    "QUERIA", "QUILHA", "QUINTA", "QUISER", "RAPIDO", "RAPOSA", "RECEBE", "RECIFE", "REGIAO", "REGIME",
    "REGRAS", "RESUMO", "REVELA", "RISCOS", "RUNICO", "SACADA", "SALTAR", "SANGUE", "SECULO", "SEGUIR",
    "SEGURO", "SELETO", "SEMANA", "SENADO", "SENHOR", "SENTIR", "SERVIR", "SESSAO", "SEXUAL", "SOBRIO",
    "SOCIAL", "SOLENE", "TABELA", "TACITO", "TALVEZ", "TAMBOR", "TANTAS", "TAPETE", "TEATRO", "TECIDO",
    "TELADO", "TENTAR", "TEORIA", "TERMOS", "TESTES", "TIGELA", "TITULO", "TONICO", "TORNAR", "TORNOU",
    "TRATAR", "TRAZER", "TRUNFO", "ULTIMA", "ULTIMO", "UMBRAL", "VARIOS", "VENCER", "VENDER", "VENENO",
    "VERBAL", "VEREDA", "VERSAO", "VIAGEM", "VIRADA", "VISITA", "VISUAL", "VOLTAR", "VOLUME", "VULCAO",
    "ZENITE",
  ],
  muito_dificil: [
    "ABOBADA", "ABOCADO", "ABONADO", "AGENCIA", "ALEGRIA", "AMIZADE", "ANALISE", "ANIMAIS", "ARQUIVO", "ARTISTA",
    "ASSIDUO", "ASSUNTO", "ATAVICO", "ATENCAO", "ATENDER", "ATITUDE", "ATUACAO", "AUMENTO", "AVENIDA", "BATERIA",
    "BRAVURA", "BRUXEDO", "CADINHO", "CAMINHO", "CAMPEAO", "CANFORA", "CAPITAL", "CARATER", "CARDEAL", "CARINHO",
    "CELEUMA", "CELULAR", "CENARIO", "CENTRAL", "CERTEZA", "CETACEO", "CHAMADA", "CHAMADO", "CHEGADA", "CHIMERA",
    "CIENCIA", "CLIENTE", "COLECAO", "COLOCAR", "COLOQUE", "COLOSSO", "COMANDO", "COMBATE", "COMECAR", "CONDADO",
    "CONDENA", "CONHECA", "CONHECE", "CONJUGE", "CONLUIO", "CONSIGO", "CONSOLO", "CONSUMO", "CONTATO", "CORACAO",
    "CORRIDA", "COZINHA", "CREDITO", "CRIACAO", "CRIANCA", "CRISTAL", "CRITICA", "CUIDADO", "CULTURA", "CURADOR",
    "DECISAO", "DECRETO", "DESAFIO", "DESENHO", "DESTINO", "DEVASSO", "DEVERIA", "DIFICIL", "DIGITAL", "DIRECAO",
    "DIREITA", "DIREITO", "DIRETOR", "DITONGO", "DIVISAO", "DOMINGO", "DURACAO", "ECLIPSE", "EDITORA", "EFEMERO",
    "EFLUVIO", "EMBLEMA", "EMBUSTE", "EMPRESA", "ENCANTO", "ENERGIA", "ENIGMAS", "ENTRADA", "ENTREGA", "ESCOLAR",
    "ESCOLHA", "ESCRITA", "ESCRITO", "ESFORCO", "ESPACOS", "ESPECIE", "ESPELHO", "ESPERAR", "ESPORTE", "ESTACAO",
    "ESTIGMA", "ESTIVER", "ESTRADA", "ESTRELA", "ESTUDAR", "ESTUDOS", "EXEMPLO", "EXISTEM", "EXPLICA", "FALACIA",
    "FARINHA", "FAZENDA", "FEDERAL", "FIDUCIA", "FISSURA", "FLAGELO", "FORMATO", "FORMIGA", "FRENESI", "FRIVOLO",
    "FUNESTO", "FUTEBOL", "GALERIA", "GORJETA", "GRANDES", "HERESIA", "HORARIO", "HUMANOS", "IMAGENS", "IMPACTO",
    "IMPORTA", "INICIAL", "INTEGRO", "INTEIRO", "INTERNA", "INTERNO", "JANGADA", "JOGADOR", "JUSTICA", "LAGARTA",
    "LEITURA", "LEMBRAR", "LIGACAO", "LIMPEZA", "LISONJA", "LUGUBRE", "MADEIRA", "MAIORES", "MAIORIA", "MALOGRO",
    "MANEIRA", "MAQUINA", "MARCELO", "MATERIA", "MELIFUO", "MELODIA", "MEMBROS", "MEMORIA", "MERCADO", "MILAGRE",
    "MILHOES", "MINERAL", "MIRAGEM", "MISTICO", "MOCINHO", "MODELOS", "MOMENTO", "MONARCA", "MORINGA", "MOTIVOS",
    "MUDANCA", "MUNDIAL", "MUSICAL", "NAQUELE", "NATURAL", "NEGOCIO", "NOTICIA", "NUMEROS", "OBLIVIO", "OBLONGO",
    "OFERECE", "OFERTAS", "OFICIAL", "OMINOSO", "OPINIAO", "ORVALHO", "PALAVRA", "PARECER", "PARECIA", "PARTIDA",
    "PARTIDO", "PEDACOS", "PELAGEM", "PEQUENA", "PEQUENO", "PERDIDO", "PERFIDO", "PERIODO", "PERMITA", "PERMITE",
    "PESSOAL", "PESSOAS", "PIRANHA", "PISCINA", "PLACIDO", "PLANETA", "PLATEIA", "PODERIA", "POLVORA", "POPULAR",
    "POSICAO", "POSSUEM", "PRATICA", "PRECISA", "PRESSAO", "PROCURA", "PRODUTO", "PROJETO", "PROPINA", "PROPRIA",
    "PROXIMA", "PROXIMO", "PUBLICA", "PUBLICO", "PUTRIDO", "QUADROS", "QUERIDA", "QUIMERA", "QUINTAL", "RALADOR",
    "RECANTO", "RECEBER", "RECEBEU", "RECEITA", "RECENTE", "RECORDE", "REDUCAO", "REFUTOU", "RELACAO", "REPUDIO",
    "RESERVA", "RETORNO", "RETRATO", "REUNIAO", "REVISTA", "RICARDO", "ROTEIRO", "SAGRADO", "SALARIO", "SALAZAR",
    "SANTANA", "SAUDADE", "SEDUZIR", "SEGUIDA", "SELECAO", "SENHORA", "SENTIDO", "SERVICO", "SIMPLES", "SIMULAR",
    "SOFRIDO", "SOLUCAO", "SOMBRIO", "SOMENTE", "SUCESSO", "SUPORTE", "SUPREMO", "TAMANHO", "TECNICA", "TECNICO",
    "TEMPERA", "TERRENO", "TESOURO", "TIMIDEZ", "TOPICOS", "TORNADO", "TREFEGO", "TURISMO", "ULTIMAS", "UNIDADE",
    "USUARIO", "VEICULO", "VENDIDO", "VERDADE", "VESPERA", "VESTIDO", "VIAGENS", "VIGIADO", "VINCULO", "VIRTUAL",
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
  // Época: 2025-01-01 (UTC)
  const EPOCA = new Date("2025-01-01T00:00:00Z");

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

  const result = palavraDoDia(dateParam);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      // Cache até fim do dia UTC (não expõe a palavra no header)
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
