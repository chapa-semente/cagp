// src/lib/estagios.ts — O ciclo da planta como sistema de cor do site (decisão de 10/11/2026).
// Cada aba da navegação é um estágio: Hoje = semente, Guias = raiz, Chapa = broto, Meu curso = planta,
// Mais = fruto. O estágio pinta a cabeça de página, o "solo" (fundo), as sombras e o ramo que cresce
// com a rolagem. As variáveis CSS equivalentes vivem em src/styles/estagios.css.
import { getItemByPath, type AxisId } from '@/lib/navigationRegistry';

export type EstagioId = 'semente' | 'raiz' | 'broto' | 'planta' | 'fruto';

export interface Estagio {
  id: EstagioId;
  nome: string;
  /** Quanto da planta já cresceu (1 a 5): decide o que o desenho mostra. */
  nivel: 1 | 2 | 3 | 4 | 5;
  bg: string;
  fg: string;
  /** Cores do desenho sobre o bloco `bg`. */
  folha: string;
  raiz: string;
  fruto: string;
  semente: string;
}

export const ESTAGIOS: Record<AxisId, Estagio> = {
  hoje: { id: 'semente', nome: 'Semente', nivel: 1, bg: '#5B2A85', fg: '#FFFFFF', folha: '#6DB33F', raiz: '#FFC83D', fruto: '#FFC83D', semente: '#FE8812' },
  guias: { id: 'raiz', nome: 'Raiz', nivel: 2, bg: '#8A4B2A', fg: '#FFFFFF', folha: '#6DB33F', raiz: '#FFC83D', fruto: '#FFC83D', semente: '#FE8812' },
  chapa: { id: 'broto', nome: 'Broto', nivel: 3, bg: '#6DB33F', fg: '#1F1F1F', folha: '#5B2A85', raiz: '#FFFFFF', fruto: '#FE8812', semente: '#FE8812' },
  curso: { id: 'planta', nome: 'Planta', nivel: 4, bg: '#266264', fg: '#FFFFFF', folha: '#6DB33F', raiz: '#FFC83D', fruto: '#FE8812', semente: '#FE8812' },
  mais: { id: 'fruto', nome: 'Fruto', nivel: 5, bg: '#FFC83D', fg: '#1F1F1F', folha: '#266264', raiz: '#8A4B2A', fruto: '#5B2A85', semente: '#FE8812' },
};

export function estagioDaRota(pathname: string): Estagio {
  return ESTAGIOS[getItemByPath(pathname)?.axis.id ?? 'hoje'];
}
