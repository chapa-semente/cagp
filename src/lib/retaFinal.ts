// retaFinal.ts — As etapas da reta final (estágio, TCC, colação), fora do componente para o painel
// de /meu-curso mostrar a próxima etapa sem carregar o checklist inteiro. Dono do checklist: /formatura.
import { asset, route } from '@/lib/paths';

/** Etapas que são uma disciplina: ficam prontas sozinhas quando ela está marcada em Meu curso. */
export const ETAPA_DISCIPLINA: Record<string, string> = {
  rf_estagio_dcp135: 'DCP 135',
  rf_estagio_dcp136: 'DCP 136',
  rf_tcc_dcp089: 'DCP 089',
  rf_tcc_banca: 'DCP 137',
};

export interface RetaFinalStep {
  id: string;
  category: 'estagio' | 'tcc' | 'colacao';
  categoryLabel: string;
  periodTag: string;
  title: string;
  desc: string;
  normativeRef: string;
  actionHref?: string;
  actionLabel?: string;
  isDownload?: boolean;
}

export const RETA_FINAL_STEPS: RetaFinalStep[] = [
  {
    id: 'rf_estagio_plano',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '7º Período • DCP 135',
    title: '1. Homologar TCE + Plano de Atividades ou Protocolar Aproveitamento Servidor (Art. 41)',
    desc: 'Submeter via Google Forms do Colegiado o Termo de Compromisso assinado ou o Requerimento de Aproveitamento Servidor com declaração da chefia.',
    normativeRef: 'Arts. 29 e 41 • Regulamento N-20229',
    actionHref: route('/estagio') + '#art41',
    actionLabel: 'Simular Art. 41',
  },
  {
    id: 'rf_estagio_dcp135',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '7º Período • 180h',
    title: '2. Integralizar Estágio Supervisionado A (DCP 135 — 180h / 12 créditos)',
    desc: 'Entregar o Relatório Parcial/Semestral ou Memorial de Experiência Profissional no Moodle para fechamento da nota de DCP 135.',
    normativeRef: 'Resolução GP nº 01/2019',
    actionHref: asset('/documentos/estagio-modelo-relatorio-semestral.docx'),
    actionLabel: 'Modelo Relatório (.DOCX)',
    isDownload: true,
  },
  {
    id: 'rf_estagio_dcp136',
    category: 'estagio',
    categoryLabel: 'Estágio 300h',
    periodTag: '8º Período • 120h',
    title: '3. Integralizar Estágio Supervisionado B (DCP 136 — 120h / 8 créditos)',
    desc: 'Concluir as 300h obrigatórias com a aprovação do Relatório Final de Estágio ou Relatório de Atividades do Art. 41.',
    normativeRef: 'Total: 300h (20 créditos)',
    actionHref: asset('/documentos/estagio-modelo-relatorio-final.docx'),
    actionLabel: 'Relatório Final (.DOCX)',
    isDownload: true,
  },
  {
    id: 'rf_tcc_orientador',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: 'Pré-9º Período',
    title: '4. Colher Assinatura no Termo de Aceite de Orientador(a) de TCC',
    desc: 'Formalizar o aceite com docente do DCP (respeitando o limite de 4 orientandos por professor) e entregar na Secretaria (Sala F-2039) antes da matrícula em DCP 089.',
    normativeRef: 'Arts. 21 e 22 • Obrigatório para DCP 089',
    actionHref: asset('/documentos/termo-aceite-orientador-tcc.pdf'),
    actionLabel: 'Modelo de Aceite (PDF)',
    isDownload: true,
  },
  {
    id: 'rf_tcc_dcp089',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: '9º Período • 60h',
    title: '5. Aprovação no Projeto de TCC (DCP 089 — 60h / 4 créditos)',
    desc: 'Definir uma das 4 modalidades do Art. 19 (Monografia, Artigo Científico, Intervenção Governamental ou IC) e qualificar o projeto.',
    normativeRef: 'Art. 19 • 4 Modalidades',
    actionHref: route('/tcc') + '#modalidades',
    actionLabel: 'Comparar Modalidades',
  },
  {
    id: 'rf_tcc_banca',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: '10º Período • 120h',
    title: '6. Defesa Pública perante Banca Examinadora (DCP 137 — 120h / 8 créditos)',
    desc: 'Depositar a versão de defesa até 15 dias antes da sessão pública e obter nota igual ou superior a 60 pontos perante a banca (orientador + avaliador).',
    normativeRef: 'Arts. 24 a 27 • Regulamento N-20229',
    actionHref: route('/tcc') + '#cronograma',
    actionLabel: 'Ver Linha do Tempo',
  },
  {
    id: 'rf_tcc_deposito',
    category: 'tcc',
    categoryLabel: 'TCC 180h',
    periodTag: 'Pós-Defesa • F-2039',
    title: '7. Depósito da Versão Final em PDF e Ficha Catalográfica',
    desc: 'Incorporar as recomendações da banca e enviar o PDF definitivo à Secretaria do Colegiado para emissão da ata de conclusão.',
    normativeRef: 'Art. 28 • Homologação Final',
    actionHref: route('/tcc') + '#termo-aceite',
    actionLabel: 'Regras de Depósito',
  },
  {
    id: 'rf_colacao_600h',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Até o 9º/10º Período',
    title: '8. Protocolar 300h de Extensão + 300h de AAC (Respeitando os 120 Dias)',
    desc: 'Confirmar que todos os certificados de formação livre, eventos e extensão foram lançados no SIGA sem prescrição pelo Art. 15.',
    normativeRef: '600h Flexíveis • PPC 2020',
    actionHref: route('/acg'),
    actionLabel: 'Abrir Calculadora 600h',
  },
  {
    id: 'rf_colacao_enade',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Semestre de Formatura',
    title: '9. Regularidade no ENADE, Nada Consta da Biblioteca e Quitação Eleitoral',
    desc: 'Verificar ausência de pendências no Sistema de Bibliotecas UFMG, Questionário do Estudante ENADE (se ano de ciclo) e dados civis no SIGA.',
    normativeRef: 'Exigência DRCA / UFMG',
    actionHref: route('/documentos'),
    actionLabel: 'Ver Prazos DRCA',
  },
  {
    id: 'rf_colacao_assinatura',
    category: 'colacao',
    categoryLabel: 'Colação & DRCA',
    periodTag: 'Solenidade FAFICH',
    title: '10. Requerimento de Colação de Grau na Seção de Ensino & Cadastro no Banco de Talentos',
    desc: 'Assinar a lista oficial de prováveis formandos da FAFICH e cadastrar seu currículo no Banco de Talentos de Gestão Pública.',
    normativeRef: 'Diploma de Bacharel em Gestão Pública',
    actionHref: route('/carreira/talentos'),
    actionLabel: 'Cadastrar Currículo',
  },
];

/** Uma etapa está feita se foi marcada no checklist ou se a disciplina dela já está cursada na grade. */
export function etapaFeita(id: string, checks: Record<string, boolean>, cursadas: string[]): boolean {
  return Boolean(checks[id]) || Boolean(ETAPA_DISCIPLINA[id] && cursadas.includes(ETAPA_DISCIPLINA[id]));
}
