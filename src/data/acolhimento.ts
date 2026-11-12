// src/data/acolhimento.ts — Fonte única dos horários e contatos do turno noturno (eixo Acolhimento).
// Mantenha os horários aqui. /curso, /calouros e /permanencia leem deste arquivo.
// Fontes: _referencias/documentos-oficiais/assistencia-estudantil-e-alimentacao.md (RU e circular),
// _referencias/documentos-oficiais/vida-academica-e-servicos.md (vigilância), CursoColegiado (secretaria e CEAG).

import type { CagpIconName } from '@/lib/cagpIcons';

export interface NoturnoItem {
  id: string;
  icon: CagpIconName;
  label: string;
  /** Faixa de horário em texto, exibida em Poppins tabular. */
  horario: string;
  /** Uma linha de orientação prática. */
  detalhe: string;
  /** Janela de funcionamento para o selo "aberto agora" (HH:MM, dias da semana 0=dom). */
  janela?: { abre: string; fecha: string; dias: number[] };
  href?: string;
  hrefLabel?: string;
}

const DIAS_UTEIS = [1, 2, 3, 4, 5];

export const NOTURNO_HOJE: NoturnoItem[] = [
  {
    id: 'ru-jantar',
    icon: 'utensils',
    label: 'Jantar no RU Setorial II',
    horario: '17h10–19h30',
    detalhe: 'Fica perto do ICB, subida a partir da FAFICH. Chegando às 18h30, vá direto: a catraca fecha às 19h30.',
    janela: { abre: '17:10', fecha: '19:30', dias: DIAS_UTEIS },
  },
  {
    id: 'circular',
    icon: 'bus',
    label: 'Ônibus interno (linhas 2 e 3)',
    horario: 'até 22h50',
    detalhe: 'Gratuito. Últimas partidas da Escola de Música: 22h10, 22h30 e 22h50. Paradas e mapa em Guias › Ônibus internos.',
  },
  {
    id: 'ceag',
    icon: 'door-open',
    label: 'CEAG — protocolo de requerimentos',
    horario: '08h–22h',
    detalhe: 'FAFICH, 2º andar, em frente aos caixas eletrônicos. Trancamento, regime especial, colação e atestados.',
    janela: { abre: '08:00', fecha: '22:00', dias: DIAS_UTEIS },
  },
  {
    id: 'vigilancia',
    icon: 'shield',
    label: 'Vigilância universitária',
    horario: '24h',
    detalhe: 'Para acompanhar trajetos à noite ou pedir socorro no campus (SAMU via ramal).',
    href: 'tel:+553134094444',
    hrefLabel: '(31) 3409-4444',
  },
];

/**
 * Fonte única dos contatos do curso. Nenhuma página escreve e-mail, sala, horário ou nome de quem
 * atende por conta própria: importa daqui. Secretaria conferida em
 * `_referencias/documentos-oficiais/secretaria-e-procedimentos.md` (outubro de 2026).
 */
export const ATENDIMENTO_CURSO = {
  secretaria: {
    label: 'Secretaria do Colegiado',
    atendentes: 'Wander Wenceslau Pereira / Ubirajara Dutra',
    atendentesCurto: 'Wander e Ubirajara',
    salaCurta: 'sala F-2039',
    sala: 'FAFICH, 2º andar, sala F-2039',
    horario: 'Quarta, 13h–19h',
    email: 'gestaopublica@ufmg.br',
    telefone: '(31) 3409-3826',
    /** Caminho para quem só chega à noite. */
    alternativaNoturna: 'Não consegue ir na quarta à tarde? Mande e-mail ou protocole no CEAG até 22h.',
  },
  coordenacao: {
    label: 'Coordenação do curso',
    nome: 'Profª Isabele Batista Mitozo',
    email: 'coordgestaopublicaufmg@gmail.com',
  },
  ceag: {
    label: 'CEAG',
    local: 'FAFICH, 2º andar, em frente aos caixas eletrônicos',
    horario: 'Segunda a sexta, 8h–22h',
  },
  cagp: {
    label: 'Sala do CAGP',
    sala: 'FAFICH, 1º andar, ao lado da entrada da rampa',
    canal: '/ouvidoria',
  },
} as const;

/** Nomes canônicos das páginas do eixo. Use os mesmos no menu, no H1, no <title> e na navegação anterior/próxima. */
export const PAGINAS_ACOLHIMENTO = {
  curso: { titulo: 'O Curso de Gestão Pública', curto: 'Curso', href: '/curso' },
  calouros: { titulo: 'Guia do Calouro', curto: 'Calouros', href: '/calouros' },
  permanencia: { titulo: 'Permanência & Noturno', curto: 'Permanência', href: '/permanencia' },
  pesquisa: { titulo: 'Pesquisa & Extensão', curto: 'Pesquisa', href: '/pesquisa' },
} as const;

/**
 * Horários do campus à noite em formato de máquina: a home ("Hoje à noite") e a folha Campus agora
 * leem daqui, então o texto e o "aberto agora" nunca divergem.
 * Jantar: assistencia-estudantil-e-alimentacao.md (RU Setorial II, 17h10 às 19h30, dias úteis).
 * Circular: últimas partidas do período letivo (linhas 2 e 3, saindo da Escola de Música), copiadas de
 * src/data/onibusInternos.json (site oficial da UFMG). Retrato estático: a home não calcula "próximo ônibus".
 */
export const CAMPUS_HORARIOS = {
  jantar: { abre: '17:10', fecha: '19:30', dias: DIAS_UTEIS, texto: '17h10–19h30', local: 'RU Setorial II' },
  almoco: { texto: '11h–14h' },
  circular: { ultimasSaidas: ['22:10', '22:30', '22:50'], texto: 'até 22h50', linhas: 'linhas 2 e 3, gratuito' },
} as const;
