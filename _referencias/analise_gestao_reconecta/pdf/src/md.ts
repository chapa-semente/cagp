// Leitor mínimo do Markdown dos dois documentos. Além do básico, entende:
//   ::quadro Título | ::tabela Título | ::figura tipo | Título   (abre um elemento numerado)
//   ::fonte Texto                                                (fecha o elemento)
//   ::local, ::data, ::palavras-chave                            (metadados)
//   > texto                                                      (nota destacada)
//   ==palavra==                                                  (a caneta da chapa, no título)
export type Bloco =
  | { t: 'h'; n: number; texto: string }
  | { t: 'p'; texto: string }
  | { t: 'lista'; ord: boolean; itens: string[] }
  | { t: 'nota'; texto: string }
  | { t: 'elemento'; classe: 'quadro' | 'tabela' | 'figura'; tipo: string; titulo: string; cab: string[]; linhas: string[][]; fonte: string }
  | { t: 'meta'; chave: string; valor: string }
  | { t: 'hr' };

const celulas = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export function ler(md: string): Bloco[] {
  const texto = md.split('<!-- NÃO PUBLICAR')[0].replace(/<!--[\s\S]*?-->/g, '');
  const ls = texto.split('\n');
  const out: Bloco[] = [];
  let i = 0;
  const tabela = () => {
    const rows: string[][] = [];
    while (i < ls.length && ls[i].startsWith('|')) rows.push(celulas(ls[i++]));
    return { cab: rows[0] ?? [], linhas: rows.slice(2) };
  };
  while (i < ls.length) {
    const l = ls[i];
    if (!l.trim()) { i++; continue; }
    const h = l.match(/^(#{1,4}) (.*)$/);
    if (h) { out.push({ t: 'h', n: h[1].length, texto: h[2].trim() }); i++; continue; }
    if (l.trim() === '---') { out.push({ t: 'hr' }); i++; continue; }
    const el = l.match(/^::(quadro|tabela|figura) (.*)$/);
    if (el) {
      i++;
      let tipo = el[1];
      let titulo = el[2].trim();
      if (el[1] === 'figura') { const [a, ...b] = titulo.split('|'); tipo = a.trim(); titulo = b.join('|').trim(); }
      while (i < ls.length && !ls[i].trim()) i++;
      const tb = i < ls.length && ls[i].startsWith('|') ? tabela() : { cab: [], linhas: [] };
      while (i < ls.length && !ls[i].trim()) i++;
      let fonte = '';
      if (i < ls.length && ls[i].startsWith('::fonte ')) fonte = ls[i++].slice(8).trim();
      out.push({ t: 'elemento', classe: el[1] as 'quadro' | 'tabela' | 'figura', tipo, titulo, ...tb, fonte });
      continue;
    }
    const meta = l.match(/^::([a-zç-]+) (.*)$/);
    if (meta) { out.push({ t: 'meta', chave: meta[1], valor: meta[2].trim() }); i++; continue; }
    if (l.startsWith('> ')) {
      const par: string[] = [];
      while (i < ls.length && ls[i].startsWith('> ')) par.push(ls[i++].slice(2).trim());
      out.push({ t: 'nota', texto: par.join(' ') });
      continue;
    }
    if (/^(- |\d+\. )/.test(l)) {
      const ord = !l.startsWith('- ');
      const itens: string[] = [];
      while (i < ls.length && /^(- |\d+\. )/.test(ls[i])) itens.push(ls[i++].replace(/^(- |\d+\. )/, ''));
      out.push({ t: 'lista', ord, itens });
      continue;
    }
    const par: string[] = [];
    while (i < ls.length && ls[i].trim() && !/^(#{1,4} |\||- |\d+\. |---\s*$|::|> )/.test(ls[i])) par.push(ls[i++].trim());
    out.push({ t: 'p', texto: par.join(' ') });
  }
  return out;
}

/** Texto sem marcação, para rótulos e comparações. */
export const puro = (s: string) => s.replace(/\*\*|\*|`|==/g, '').trim();

/** "84,5" → 84.5; "1.616" → 1616. */
export const numero = (s: string) => Number(puro(s).replace(/\./g, '').replace(',', '.'));

/** CSV simples com aspas. */
export function lerCsv(texto: string): Record<string, string>[] {
  const linhas: string[][] = [];
  let campo = '', linha: string[] = [], aspas = false;
  for (let k = 0; k < texto.length; k++) {
    const c = texto[k];
    if (aspas) {
      if (c === '"' && texto[k + 1] === '"') { campo += '"'; k++; } else if (c === '"') aspas = false; else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === ',') { linha.push(campo); campo = ''; }
    else if (c === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else if (c !== '\r') campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...resto] = linhas;
  return resto.filter((r) => r.length === cab.length).map((r) => Object.fromEntries(cab.map((c, j) => [c, r[j]])));
}
