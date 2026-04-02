
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
  try {
    localStorage.setItem(ACH_KEY, JSON.stringify(earned));
  } catch (e) {
    console.warn("[glif] falha ao salvar conquistas", e);
  }
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
  
  // Sincroniza conquista recém-ganha na nuvem (fire-and-forget)
  if (!ARQUIVO_MODO && !PRATICA_MODO) {
      apiEdgeFunction("save-achievements", "POST", { achievements: [id] }).catch(() => {});
  }
  
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
  try {
    localStorage.setItem(GOLDEN_KEY, JSON.stringify(g));
  } catch (e) {
    console.warn("[glif] falha ao salvar stats dourados", e);
  }
}

function bumpTimedAch(id, threshold) {
  const k = "gliffoo_timed_" + id;
  const n = Number.parseInt(localStorage.getItem(k) || "0") + 1;
  localStorage.setItem(k, n);
  
  // Sincroniza contador na nuvem
  if (!ARQUIVO_MODO && !PRATICA_MODO) {
      apiEdgeFunction("save-achievements", "POST", { counters: [{ id, value: n }] }).catch(() => {});
  }
  
  if (n >= threshold) queueAch(id);
}

// CARREGA E FAZ MERGE DE DADOS DA NUVEM NO BOOT
async function loadStatsFromCloud() {
  const token = getAuthToken();
  if (!token) return;

  const { data, error } = await apiEdgeFunction("my-stats", "GET");
  if (error || !data) return;

  const { stats: cloudStats, achievements: cloudAchs, counters: cloudCounters } = data;
  
  // 1. Merge das conquistas (União absoluta)
  if (cloudAchs?.length > 0) {
      const localAchs = loadAch();
      let hasChanges = false;
      cloudAchs.forEach(ach => {
          if (!localAchs[ach.ach_id]) {
              localAchs[ach.ach_id] = new Date(ach.earned_at).getTime();
              hasChanges = true;
          }
      });
      if (hasChanges) saveAch(localAchs);
  }

  // 2. Merge dos counters (Maior valor prevalece)
  if (cloudCounters?.length > 0) {
      cloudCounters.forEach(c => {
          const k = "gliffoo_timed_" + c.counter_id;
          const localVal = Number.parseInt(localStorage.getItem(k) || "0");
          if (c.value > localVal) {
              localStorage.setItem(k, c.value);
          }
      });
  }

  // 3. Merge do user_stats
  if (cloudStats) {
      const localStats = carregarStats();
      let hasStatsChanges = false;

      // Se a cloud tem MAIS jogos jogados, copia tudo da cloud para local
      if (cloudStats.games_played > localStats.jogados) {
          localStats.jogados = cloudStats.games_played;
          localStats.vitorias = cloudStats.games_won;
          localStats.streakAtual = cloudStats.streak;
          localStats.streakMax = cloudStats.max_streak;
          localStats.ultimaVitoria = cloudStats.last_played;
          if (cloudStats.distribution) localStats.distribuicao = cloudStats.distribution;
          hasStatsChanges = true;
          
          if (cloudStats.golden_total || cloudStats.golden_consec) {
              saveGoldenStats({ total: cloudStats.golden_total || 0, consec: cloudStats.golden_consec || 0 });
          }
      } 
      // Se cloud e local divergem, mas nenhum é nitidamente "o mais atualizado", confia no maior streak
      else if (cloudStats.games_played === localStats.jogados) {
          if (cloudStats.streak > localStats.streakAtual) {
              localStats.streakAtual = cloudStats.streak;
              hasStatsChanges = true;
          }
          if (cloudStats.max_streak > localStats.streakMax) {
              localStats.streakMax = cloudStats.max_streak;
              hasStatsChanges = true;
          }
      }

      if (hasStatsChanges) {
          try {
              localStorage.setItem("gliffoo_stats", JSON.stringify(localStats));
              if (localStats.ultimaVitoria) localStorage.setItem("gliffoo_stats_date", localStats.ultimaVitoria);
          } catch(e) {}
      } else if (localStats.jogados > (cloudStats?.games_played || 0)) {
          // Local é mais rico! Força um UPSERT silencioso (sync atrasado)
          syncStats(false, 0).catch(() => {}); 
      }
  }
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
