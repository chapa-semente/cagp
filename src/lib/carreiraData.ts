// src/lib/carreiraData.ts — Dados Canônicos de Vagas, Competências e Propostas de Carreira (Super App CAGP UFMG)
import type { VaultData } from './storage/studentVault';

export type TalentosProfile = VaultData<'cagp_carreira_talentos_v1'>;

export interface VacancyItem {
  id: string;
  agency: string;
  role: string;
  hours: string;
  allowance: string;
  periodReq: string;
  status: string;
  link: string;
  tag: 'Estadual' | 'Municipal' | 'Controle' | 'OSCs';
  proposalLink: string;
  featured?: boolean;
}

export const AREAS = [
  'Planejamento Governamental',
  'Orçamento & Finanças Públicas',
  'Licitações & Contratos (Lei 14.133)',
  'Gestão de Pessoas no Setor Público',
  'Análise de Dados & Políticas Baseadas em Evidências',
  'Políticas Sociais, Direitos Humanos & Saúde',
  'Educação, Cultura & Cidades Inteligentes',
  'Terceiro Setor, OSCs & Captação de Recursos (MROSC)',
];

export const SUGGESTED_SKILLS = [
  'SEI! (Sistema Eletrônico de Informações)',
  'Lei 14.133/2021 (Licitações)',
  'Orçamento Público (PPA/LDO/LOA)',
  'MROSC (Lei 13.019)',
  'Excel / Power BI',
  'R / Python para Dados Públicos',
  'Redação Oficial',
  'Avaliação de Políticas Públicas',
];

export const SEMENTE_CAREER_PROPOSALS = [
  {
    num: 'Proposta 09',
    eixo: 'Eixo 3 • Desenvolvimento & Carreira',
    title: 'Parcerias com Órgãos Públicos, OSCs & Egressos',
    desc: 'Realização periódica de painéis, oficinas práticas e seminários conectando estudantes a gestores da SEPLAG, PBH, TCE-MG, ALMG, terceiro setor (OSCs) e egressos do curso.',
    badge: 'Networking Público',
    color: 'bg-primary text-white',
    icon: 'bi-building-check',
  },
  {
    num: 'Proposta 11',
    eixo: 'Eixo 3 • Empreendedorismo Público',
    title: 'Apoio Amplo à Fundação da Empresa Júnior de GP',
    desc: 'Articulação institucional, assessoria jurídica do CA e apoio logístico para fundar e estruturar a Empresa Júnior de Gestão Pública da UFMG — projetos reais de consultoria pública desde o 1º período.',
    badge: 'Empresa Júnior GP',
    color: 'bg-[#134E4A] text-white',
    icon: 'bi-rocket-takeoff-fill',
  },
  {
    num: 'Proposta 12',
    eixo: 'Eixo 4 • Comunicação Ativa',
    title: 'Divulgação Ágil de Vagas, Estágios, Bolsas e Concursos',
    desc: 'Radar permanente de editais de estágio, programas de trainee em gestão pública (Vetores, FJP), bolsas de extensão/IC e concursos com alertas diretos no SuperApp.',
    badge: 'Mural de Vagas Ativo',
    color: 'bg-[#FE8812] text-[#16181d]',
    icon: 'bi-megaphone-fill',
  },
];

export const CURATED_VACANCIES: VacancyItem[] = [
  {
    id: 'v1',
    agency: 'SEPLAG-MG (Secretaria de Estado de Planejamento e Gestão)',
    role: 'Estágio em Monitoramento de Políticas Públicas e Gestão Estratégica',
    hours: '30h semanais',
    allowance: 'R$ 1.250 + Auxílio Transporte',
    periodReq: 'A partir do 3º período',
    status: 'Inscrições Abertas',
    link: 'https://planejamento.mg.gov.br',
    tag: 'Estadual',
    proposalLink: 'Proposta 12 • Radar de Vagas',
    featured: true,
  },
  {
    id: 'v2',
    agency: 'Prefeitura Municipal de Belo Horizonte (PBH)',
    role: 'Estágio em Planejamento Urbano, Orçamento e Descentralização Regional',
    hours: '20h ou 30h semanais',
    allowance: 'R$ 1.100 + Transporte',
    periodReq: 'Do 2º ao 8º período',
    status: 'Banco Contínuo',
    link: 'https://prefeitura.pbh.gov.br',
    tag: 'Municipal',
    proposalLink: 'Proposta 12 • Radar de Vagas',
    featured: true,
  },
  {
    id: 'v3',
    agency: 'Tribunal de Contas do Estado de Minas Gerais (TCE-MG)',
    role: 'Apoio à Fiscalização, Controle Externo e Avaliação de Políticas Municipais',
    hours: '30h semanais',
    allowance: 'R$ 1.400 + Benefícios',
    periodReq: 'A partir do 4º período',
    status: 'Edital Semestral',
    link: 'https://tce.mg.gov.br',
    tag: 'Controle',
    proposalLink: 'Proposta 09 & 12 • Órgãos',
    featured: true,
  },
  {
    id: 'v4',
    agency: 'Ministério Público de Minas Gerais (MPMG)',
    role: 'Estágio em Centros de Apoio Operacional de Políticas Públicas (CAOP)',
    hours: '30h semanais',
    allowance: 'R$ 1.350 + Seguro + Recesso',
    periodReq: 'A partir do 3º período',
    status: 'Processo Seletivo',
    link: 'https://mpmg.mp.br',
    tag: 'Controle',
    proposalLink: 'Proposta 12 • Radar de Vagas',
  },
  {
    id: 'v5',
    agency: 'Assembleia Legislativa de Minas Gerais (ALMG)',
    role: 'Apoio às Comissões Permanentes e Consultoria Temática de Políticas Públicas',
    hours: '20h semanais (Horário Flexível)',
    allowance: 'R$ 1.500 + Benefícios',
    periodReq: 'A partir do 5º período',
    status: 'Banco de Talentos',
    link: 'https://almg.gov.br',
    tag: 'Estadual',
    proposalLink: 'Proposta 09 • Parcerias',
  },
  {
    id: 'v6',
    agency: 'Rede de OSCs & Terceiro Setor de Belo Horizonte (MROSC)',
    role: 'Gestão de Projetos Sociais, Captação de Recursos e Prestação de Contas',
    hours: '20h ou 30h semanais',
    allowance: 'R$ 1.200 a R$ 1.600',
    periodReq: 'Qualquer período',
    status: 'Vagas Contínuas',
    link: 'https://mrosc.org.br',
    tag: 'OSCs',
    proposalLink: 'Proposta 09 • Terceiro Setor',
  },
];

export const STATUS_LABELS: Record<TalentosProfile['stageStatus'], string> = {
  buscando_estagio: 'Buscando Estágio',
  estagiando_nao_obrigatorio: 'Em Estágio Não Obrigatório (Lei 11.788)',
  estagiando_obrigatorio: 'Em Estágio Obrigatório (300h)',
  servidor_art41: 'Aproveitamento Servidor (Art. 41)',
  concluido: 'Estágio Concluído',
};

export function generateTalentosSummary(profile: TalentosProfile): string {
  const statusLabel = STATUS_LABELS[profile.stageStatus] || profile.stageStatus;
  return [
    'PERFIL DISCENTE — BACHARELADO EM GESTÃO PÚBLICA (FAFICH/UFMG)',
    `Status: ${statusLabel} (${profile.weeklyHoursAvailable}h semanais)`,
    profile.interestAreas.length > 0 ? `Áreas de Atuação: ${profile.interestAreas.join(' • ')}` : '',
    profile.skills.length > 0 ? `Competências Técnicas: ${profile.skills.join(', ')}` : '',
    profile.interestedInEmpresaJunior ? 'Interesse Ativo: Fundação da Empresa Júnior de Gestão Pública UFMG' : '',
    profile.lattesUrl ? `Lattes: ${profile.lattesUrl}` : '',
    profile.linkedinUrl ? `LinkedIn: ${profile.linkedinUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}
