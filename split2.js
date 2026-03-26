const fs = require('fs');

const lines = fs.readFileSync('app.js', 'utf8').split(/\r?\n/);
let config = [];
let cloud = [];
let graphics = [];
let app = [];

let current = 'config';

for (let i = 0; i < lines.length; i++) {
  let lineNum = i + 1;

  if (lineNum === 1) current = 'config';
  else if (lineNum === 638) current = 'graphics';
  else if (lineNum === 933) current = 'app';
  else if (lineNum === 1077) current = 'graphics';
  else if (lineNum === 2055) current = 'app';
  else if (lineNum === 3979) current = 'cloud';
  else if (lineNum === 4159) current = 'app';

  if (current === 'config') config.push(lines[i]);
  else if (current === 'graphics') graphics.push(lines[i]);
  else if (current === 'cloud') cloud.push(lines[i]);
  else app.push(lines[i]);
}

fs.writeFileSync('config.js', config.join('\n'), 'utf8');
fs.writeFileSync('graphics.js', graphics.join('\n'), 'utf8');
fs.writeFileSync('cloud.js', cloud.join('\n'), 'utf8');
fs.writeFileSync('app.js', app.join('\n'), 'utf8');

console.log(`Config: ${config.length} linhas`);
console.log(`Graphics: ${graphics.length} linhas`);
console.log(`Cloud: ${cloud.length} linhas`);
console.log(`App: ${app.length} linhas`);
console.log(`Total: ${config.length + graphics.length + cloud.length + app.length}/${lines.length}`);
