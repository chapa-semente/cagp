// talentConstants.ts - Constantes do Banco de Talentos e Marcadores de Orgulho

export interface TalentCategory {
  key: string;
  label: string;
}

export const TALENT_CATEGORIES: readonly TalentCategory[] = [
  { key: 'pol_pub', label: 'Políticas Públicas & Planejamento' },
  { key: 'orcamento', label: 'Orçamento & Finanças Públicas' },
  { key: 'gestao_pessoas', label: 'Gestão de Pessoas no Setor Público' },
  { key: 'licitacoes', label: 'Licitações, Contratos & Compras' },
  { key: 'cidades', label: 'Cidades & Políticas Urbanas' },
  { key: 'saude', label: 'Saúde Pública & Gestão do SUS' },
  { key: 'educacao', label: 'Educação Pública & Fundeb' },
  { key: 'govtech', label: 'Tecnologia Pública & GovTech' },
  { key: 'dados', label: 'Ciência de Dados & Avaliação' },
  { key: 'terceiro_setor', label: 'Terceiro Setor & MROSC' },
  { key: 'rel_inst', label: 'Relações Institucionais & Legislativo' },
  { key: 'clima', label: 'Meio Ambiente & Sustentabilidade' },
] as const;

export interface PrideOption {
  key: string;
  label: string;
}

export const PRIDE_OPTIONS: readonly PrideOption[] = [
  { key: 'none', label: 'Nenhum' },
  { key: 'lgbt', label: 'LGBTQIAPN+' },
  { key: 'trans', label: 'Trans' },
  { key: 'gay', label: 'Gay' },
  { key: 'bisexual', label: 'Bissexual' },
  { key: 'lesbian', label: 'Lésbica' },
  { key: 'nonbinary', label: 'Não-Binárie' },
  { key: 'pansexual', label: 'Pansexual' },
  { key: 'asexual', label: 'Assexual' },
] as const;

export interface AvatarPresetOption {
  id: string;
  label: string;
  bg: string;
  icon?: string;
  color: string;
  text?: string;
}

export const AVATAR_PRESETS: readonly AvatarPresetOption[] = [
  // Só cores da Semente (DESIGN.md › Colors). Rubro e azul ficam fora: são selo institucional e status.
  { id: 'candangos', label: 'Candangos', bg: '#5B2A85', icon: 'bi-bank', color: '#FE8812' },
  { id: 'monogram', label: 'Iniciais', bg: '#266264', text: 'Iniciais', color: '#FFFFFF' },
  { id: 'fafich', label: 'FAFICH', bg: '#FE8812', icon: 'bi-building', color: '#1F1F1F' },
  { id: 'republica', label: 'República', bg: '#EFE7F6', icon: 'bi-house-heart-fill', color: '#5B2A85' },
  { id: 'formando', label: 'Formando', bg: '#5B2A85', icon: 'bi-mortarboard-fill', color: '#FFFFFF' },
  { id: 'pesquisador', label: 'Pesquisa', bg: '#134E4A', icon: 'bi-person-badge-fill', color: '#FE8812' },
  { id: 'estudante_f', label: 'Estudante 1', bg: '#FFEEDB', icon: 'bi-person-standing-dress', color: '#5B2A85' },
  { id: 'estudante_m', label: 'Estudante 2', bg: '#E2EDEA', icon: 'bi-person-fill', color: '#134E4A' },
] as const;
