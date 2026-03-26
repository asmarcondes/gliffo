const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
const search = [
  'const LETTERS = {', 
  'function makeSVG(', 
  'const CICLO_DIF = [', 
  'function resolveDailyWordUrl', 
  'async function fetchPuzzleByDate', 
  'async function loadStatsFromCloud', 
  'function getAuthToken',
  'function runInvaders',
  'function runSnake',
  'let G = {',
  'const G = {',
  'let DICIONARIO'
];
search.forEach(s => {
  const i = lines.findIndex(l => l.includes(s));
  console.log(s + ' -> Line ' + (i !== -1 ? i + 1 : 'NOT FOUND'));
});
