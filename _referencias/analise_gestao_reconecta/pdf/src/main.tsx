// Entrada do montador de PDF. ?doc=boletim|relatorio escolhe o documento; ?pag={...} traz as páginas do
// sumário (segunda passada de gerar-pdf.mjs); ?final tira o adesivo de rascunho.
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import '@fontsource/permanent-marker/400.css';
import './documento.css';
import boletimMd from '../../boletim_e_nota_de_metodo.md?raw';
import relatorioMd from '../../relatorio_longo.md?raw';
import { Documento } from './Documento';

import boletim2Md from '../../boletim_carta_2027.md?raw';
import relatorio2Md from '../../relatorio_carta_2027.md?raw';

const DOCS = {
  boletim: { tipo: 'boletim', md: boletimMd, titulo: 'Boletim da gestão Reconecta · Chapa Semente' },
  relatorio: { tipo: 'relatorio', md: relatorioMd, titulo: 'Um ano de gestão Reconecta no CAGP · Chapa Semente' },
  boletim2: { tipo: 'boletim', md: boletim2Md, titulo: 'Boletim da carta 2026-2027 da Reconecta · Chapa Semente' },
  relatorio2: { tipo: 'relatorio', md: relatorio2Md, titulo: 'A carta 2026-2027 da Chapa Reconecta · Chapa Semente' },
} as const;

const q = new URLSearchParams(location.search);
const id = (q.get('doc') ?? 'relatorio') as keyof typeof DOCS;
const doc = DOCS[id] ?? DOCS.relatorio;
let paginas: Record<string, number> = {};
try { paginas = JSON.parse(q.get('pag') ?? '{}'); } catch { /* sem páginas na primeira passada */ }

document.documentElement.dataset.doc = id;
document.documentElement.dataset.tipo = doc.tipo;
document.title = doc.titulo;

createRoot(document.getElementById('raiz')!).render(
  <Documento doc={doc.tipo} md={doc.md} paginas={paginas} rascunho={q.has('rascunho')} />,
);
