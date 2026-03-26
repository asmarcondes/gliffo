const fs = require('fs');
const vm = require('vm');

const files = ['config.js', 'graphics.js', 'cloud.js', 'app.js'];
const codes = files.map(f => ({ name: f, code: fs.readFileSync(f, 'utf8') }));

function makeEl() {
  const cl = { toggle: ()=>{}, add: ()=>{}, remove: ()=>{}, contains: ()=>false };
  const el = { classList: cl, style: {}, addEventListener: ()=>{}, appendChild: ()=>makeEl(), removeChild: ()=>{}, setAttribute: ()=>{}, getAttribute: ()=>null, textContent: '', innerHTML: '', value: '', disabled: false, children: [], parentNode: null, offsetWidth: 0, offsetHeight: 0, scrollTop: 0, scrollHeight: 0, getBoundingClientRect: ()=>({top:0,left:0,width:0,height:0}) };
  el.querySelector = ()=>makeEl();
  el.querySelectorAll = ()=>[];
  el.closest = ()=>null;
  el.insertBefore = ()=>makeEl();
  el.getContext = ()=>({ fillRect: ()=>{}, clearRect: ()=>{}, drawImage: ()=>{}, beginPath: ()=>{}, stroke: ()=>{}, fill: ()=>{}, arc: ()=>{}, moveTo: ()=>{}, lineTo: ()=>{}, fillText: ()=>{}, measureText: ()=>({width:0}), save: ()=>{}, restore: ()=>{}, translate: ()=>{}, scale: ()=>{}, rotate: ()=>{} });
  return el;
}

function makeAudio() {
  return { play: ()=>Promise.resolve(), pause: ()=>{}, src: '', volume: 1, loop: false, currentTime: 0, paused: true, duration: 0, addEventListener: ()=>{}, removeEventListener: ()=>{} };
}

const context = {
  location: { hostname: 'localhost', protocol: 'http:' },
  navigator: { clipboard: { writeText: async () => {} }, userAgent: '' },
  history: { pushState: ()=>{} },
  document: {
    addEventListener: ()=>{}, removeEventListener: ()=>{}, getElementById: ()=>makeEl(),
    querySelector: ()=>makeEl(), querySelectorAll: ()=>[], createElementNS: ()=>makeEl(),
    createElement: ()=>makeEl(), documentElement: makeEl(), body: makeEl(), head: makeEl(),
    title: ''
  },
  localStorage: { getItem: ()=>null, setItem: ()=>{}, removeItem: ()=>{} },
  sessionStorage: { getItem: ()=>null, setItem: ()=>{}, removeItem: ()=>{} },
  setTimeout: ()=>{}, setInterval: ()=>{}, clearTimeout: ()=>{}, clearInterval: ()=>{},
  requestAnimationFrame: ()=>{}, cancelAnimationFrame: ()=>{},
  addEventListener: ()=>{}, removeEventListener: ()=>{}, dispatchEvent: ()=>{},
  CustomEvent: function(n, o) { this.type=n; }, Event: function(n) { this.type=n; },
  KeyboardEvent: function(n, o) { this.type=n; },
  fetch: async ()=>({ ok: true, json: async ()=>[], text: async ()=>'' }),
  console: console, URL: URL, Math: Math, Date: Date, Set: Set, Map: Map, Promise: Promise,
  Object: Object, String: String, Number: Number, Array: Array, Boolean: Boolean,
  JSON: JSON, RegExp: RegExp, Error: Error, TypeError: TypeError, ReferenceError: ReferenceError,
  decodeURIComponent: decodeURIComponent, encodeURIComponent: encodeURIComponent,
  isNaN: isNaN, isFinite: isFinite, parseInt: parseInt, parseFloat: parseFloat, Intl: Intl,
  Audio: function(src) { return makeAudio(); },
  HTMLCanvasElement: function() {},
  IntersectionObserver: function(cb, opts) { return { observe: ()=>{}, disconnect: ()=>{} }; },
  MutationObserver: function(cb) { return { observe: ()=>{}, disconnect: ()=>{} }; },
  ResizeObserver: function(cb) { return { observe: ()=>{}, disconnect: ()=>{} }; },
  anime: Object.assign(function(opts) { return { play: ()=>{}, restart: ()=>{}, pause: ()=>{}, reverse: ()=>{} }; }, {
    stagger: (n) => 0,
    random: (min, max) => min,
    timeline: (opts) => ({ add: function() { return this; } }),
    set: () => {},
    remove: () => {},
    running: []
  }),
  supabase: { createClient: ()=>({ auth: { onAuthStateChange: ()=>{}, signInAnonymously: async()=>({data:null,error:null}), getSession: async()=>({data:{session:null},error:null}) } }) }
};

// Espelhar context como window (igual ao browser)
context.window = context;
context.window._dbg = false;
context.window.location = context.location;
context.self = context;
context.globalThis = context;

vm.createContext(context);

let allOk = true;
for (const { name, code } of codes) {
  process.stdout.write(`\n-> ${name}... `);
  try {
    vm.runInContext(code, context);
    process.stdout.write('OK\n');
  } catch(e) {
    process.stdout.write('ERRO\n');
    console.error('   Mensagem:', e.message);
    const stack = (e.stack || '').split('\n');
    console.error('   Stack:', stack.slice(1,4).join('\n   '));
    allOk = false;
    break;
  }
}
if (allOk) console.log('\nSUCESSO: todos os 4 módulos compilam e cruzam referencias sem erros!');
