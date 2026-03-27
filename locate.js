const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split(/\r?\n/);
['carregarStats', 'salvarStats', 'ultimaVitoria', 'streakAtual', 'loadStatsFromCloud', 'saveStatsToCloud'].forEach(s => {
  const idx = lines.findIndex(l => l.includes(s));
  if (idx !== -1) console.log('L' + (idx+1) + ': ' + lines[idx].trim().substring(0, 85));
  else console.log(s + ': NAO ENCONTRADO');
});
