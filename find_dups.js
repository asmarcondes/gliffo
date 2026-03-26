const fs = require('fs');

['config.js', 'app.js'].forEach(file => {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const found = [];
  lines.forEach((l, i) => {
    if (/^\s*(const|let|var)\s+LETTER_SEGS/.test(l) ||
        /^\s*(const|let|var)\s+LETTERS\s+=/.test(l) ||
        /^\s*(const|let|var)\s+GLYPH_COLORS/.test(l) ||
        /^\s*(const|let|var)\s+DICIONARIO/.test(l) ||
        /^\s*(const|let|var)\s+CICLO_DIF/.test(l) ||
        /^\s*(const|let|var)\s+SCORE_RANGE/.test(l)) {
      found.push({ line: i + 1, code: l.trim().substring(0, 70) });
    }
  });
  if (found.length) {
    console.log('\n=== ' + file + ' ===');
    found.forEach(f => console.log('  L' + f.line + ': ' + f.code));
  }
});
