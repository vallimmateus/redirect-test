const fs = require('fs');
const path = require('path');

const redirectsDir = path.join(__dirname, '../content/redirects');
const outputPath = path.join(__dirname, '..', 'public', '_redirects');

let redirects = '';

fs.readdirSync(redirectsDir).forEach(file => {
  const fileContent = fs.readFileSync(path.join(redirectsDir, file), 'utf-8');
  const from = fileContent.match(/from: (.+)/)?.[1];
  const to = fileContent.match(/to: (.+)/)?.[1];
  const status = fileContent.match(/status: (\d+)/)?.[1] || '301';

  if (from && to) {
    redirects += `${from} ${to} ${status}\n`;
  }
});

fs.writeFileSync(outputFile, redirects);
console.log('Arquivo de redirects gerado com sucesso!');
