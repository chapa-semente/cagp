// src/lib/nomeDisciplina.ts — Nome de disciplina em caixa de frase.
// O SIGA e o ementário trazem os nomes em CAIXA ALTA ("TÓPICOS EM CONTABILIDADE B"). Na tela, caixa
// alta é grito (DESIGN.md › The Shout Only Rule); título de ficha fala em caixa de frase.
const MINUSCULAS = new Set(['a', 'à', 'ao', 'aos', 'as', 'às', 'da', 'das', 'de', 'do', 'dos', 'e', 'em', 'na', 'nas', 'no', 'nos', 'o', 'os', 'ou', 'para', 'por', 'com', 'um', 'uma']);
const ROMANO = /^(i{1,3}|iv|v|vi{0,3}|ix|x)$/i;

export function nomeDisciplina(nome: string): string {
  // Só mexe em nome que veio inteiro em maiúsculas; nome já escrito certo passa como está.
  if (!nome || nome !== nome.toLocaleUpperCase('pt-BR')) return nome;
  return nome
    .toLocaleLowerCase('pt-BR')
    .split(/(\s+|-)/)
    .map((p, i, partes) => {
      if (!p.trim() || p === '-') return p;
      // A última palavra de uma letra é a turma ("Políticas Sociais A"), não o artigo.
      if (p.length === 1 && i === partes.length - 1) return p.toLocaleUpperCase('pt-BR');
      // Letra solta (turma A, B) e algarismo romano continuam em maiúscula.
      if (p.length === 1 && i > 0 && !MINUSCULAS.has(p)) return p.toLocaleUpperCase('pt-BR');
      if (ROMANO.test(p) && i > 0 && p.length <= 4 && !MINUSCULAS.has(p)) return p.toLocaleUpperCase('pt-BR');
      if (i > 0 && MINUSCULAS.has(p)) return p;
      return p.charAt(0).toLocaleUpperCase('pt-BR') + p.slice(1);
    })
    .join('');
}
