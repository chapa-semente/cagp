// src/lib/viewTransitionNames.ts — Elemento compartilhado entre páginas (DESIGN.md › Movimento).
// O título de um item de lista e o título da página que ele abre recebem o mesmo view-transition-name:
// na troca, o título "viaja" da linha até o cabeçalho (e volta ao retornar), como no iOS.
// Regra: um nome por página. As linhas de lista só recebem o nome na hora (scripts/sharedTitle.ts).

/** Nome estável a partir de um caminho ("/cagp/estagio/" → "vt-title-cagp-estagio"). */
export function vtTitleName(path: string): string {
  const clean = (path.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
  const slug = clean === '/' ? 'home' : clean.replace(/^\//, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  return `vt-title-${slug}`;
}
