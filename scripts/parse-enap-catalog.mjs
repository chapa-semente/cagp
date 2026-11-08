import fs from 'node:fs';
import path from 'node:path';

const csvPath = path.resolve('_referencias/catalogo_enap.csv');
const outDir = path.resolve('src/data');
const outPath = path.resolve('src/data/curatedEnapCourses.json');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/);
const header = lines[0].split('|');

const courses = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const cols = line.split('|');
  if (cols.length < 7) continue;

  const id = cols[0].trim();
  const title = cols[1]?.trim() || '';
  const axis = cols[2]?.trim() || 'Gestão Pública Geral';
  const certifier = cols[4]?.trim() || 'ENAP / EV.G';
  const hours = parseInt(cols[6]?.trim() || '0', 10);
  const summary = cols[9]?.trim() || '';

  if (title && hours > 0) {
    courses.push({
      id,
      title,
      axis,
      certifier,
      hours,
      summary: summary.slice(0, 220) + (summary.length > 220 ? '...' : ''),
      link: `https://www.escolavirtual.gov.br/curso/${id}`,
    });
  }
}

fs.writeFileSync(outPath, JSON.stringify(courses, null, 2), 'utf-8');
console.log(`Sucesso: ${courses.length} cursos gerados em ${outPath}`);
