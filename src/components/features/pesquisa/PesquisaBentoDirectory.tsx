import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BentoGrid, type BentoItem } from '@/components/boldkit/blocks/bento-grid';
import { route } from '@/lib/paths';
import { tactileSpring } from '@/lib/motion';

interface ResearchCenterItem {
  id: string;
  sigla: string;
  nome: string;
  eixo: 'politicas_estado' | 'legislativo_justica' | 'democracia_genero';
  eixoLabel: string;
  lider: string;
  tema: string;
  tags: string[];
  span?: 'large' | 'tall' | 'wide' | 'normal';
  accent?: 'primary' | 'secondary' | 'accent' | 'card';
  url: string;
  iconClass: string;
}

const NUCLEOS_DCP: ResearchCenterItem[] = [
  {
    id: 'publicus',
    sigla: 'PUBLICUS',
    nome: 'PUBLICUS — Núcleo de Estudos em Gestão e Políticas Públicas',
    eixo: 'politicas_estado',
    eixoLabel: 'Eixo 1 • Gestão & Políticas Públicas',
    lider: 'Coord.: Profa. Dra. Telma Maria Gonçalves Menicucci',
    tema: 'Referência nacional em políticas sociais, Sistema Único de Saúde (SUS), reformas do Estado, capacidades estatais e arranjos federativos no Brasil.',
    tags: ['Políticas Sociais', 'SUS & Saúde', 'Capacidades Estatais', 'Federalismo', 'Até 90h AAC'],
    span: 'wide',
    accent: 'primary',
    url: 'https://www.fafich.ufmg.br/dcp/',
    iconClass: 'bi-building-gear text-[#5B2A85]',
  },
  {
    id: 'ceppi',
    sigla: 'CEPPI',
    nome: 'CEPPI — Centro de Pesquisas em Política e Internet',
    eixo: 'politicas_estado',
    eixoLabel: 'Eixo 1 • GovTech & Transparência',
    lider: 'Coord.: Profa. Dra. Isabele Batista Mitozo (Coord. Colegiado GP)',
    tema: 'Governo digital, transparência ativa, e-Gov, participação online, mídias sociais no setor público e enfrentamento à desinformação.',
    tags: ['Governo Aberto', 'Transparência', 'Deliberação Digital', 'e-Gov'],
    span: 'normal',
    accent: 'accent',
    url: 'https://www.fafich.ufmg.br/ceppi/',
    iconClass: 'bi-globe2 text-[#FE8812]',
  },
  {
    id: 'nesth',
    sigla: 'NESTH',
    nome: 'NESTH — Núcleo de Estudos Sobre o Trabalho Humano',
    eixo: 'politicas_estado',
    eixoLabel: 'Eixo 1 • Burocracia & Trabalho',
    lider: 'Coord.: Prof. Carlos Roberto Horta e Profa. Flávia Alves',
    tema: 'Relações de trabalho na administração pública, ergonomia funcional, sindicalismo no setor público e carreiras de Estado.',
    tags: ['Burocracia Pública', 'Gestão de Pessoas', 'Carreiras de Estado'],
    span: 'normal',
    accent: 'card',
    url: 'https://www.fafich.ufmg.br/dcp/',
    iconClass: 'bi-person-workspace text-secondary',
  },
  {
    id: 'cel',
    sigla: 'CEL',
    nome: 'CEL — Centro de Estudos Legislativos',
    eixo: 'legislativo_justica',
    eixoLabel: 'Eixo 2 • Legislativo & Coalizões',
    lider: 'Coord.: Profa. Dra. Magna Maria Inácio',
    tema: 'Processo decisório no Congresso Nacional e assembleias estaduais (ALMG), presidencialismo de coalizão, emendas orçamentárias e relações Executivo-Legislativo.',
    tags: ['Processo Legislativo', 'Presidencialismo de Coalizão', 'Orçamento Público'],
    span: 'wide',
    accent: 'secondary',
    url: 'https://www.fafich.ufmg.br/cel/',
    iconClass: 'bi-bank2 text-secondary',
  },
  {
    id: 'femjusp',
    sigla: 'FEMJUSP',
    nome: 'FEMJUSP — Feminismos, Justiça e Segurança Pública',
    eixo: 'legislativo_justica',
    eixoLabel: 'Eixo 2 • Justiça & Segurança',
    lider: 'Coord.: Profa. Dra. Ludmila Mendonça Lopes Ribeiro (Subcoord. GP)',
    tema: 'Sistema de justiça criminal, fluxo de homicídios, violência de gênero, atuação policial e avaliação de políticas penitenciárias.',
    tags: ['Segurança Pública', 'Justiça Criminal', 'Gênero & Violência'],
    span: 'normal',
    accent: 'primary',
    url: 'https://www.fafich.ufmg.br/dcp/',
    iconClass: 'bi-shield-shaded text-[#5B2A85]',
  },
  {
    id: 'margem',
    sigla: 'MARGEM & OJB',
    nome: 'MARGEM & Observatório da Justiça Brasileira (OJB)',
    eixo: 'legislativo_justica',
    eixoLabel: 'Eixo 2 • Judiciário & Democracia',
    lider: 'Coord.: Prof. Dr. Leonardo Avritzer & Grupo MARGEM',
    tema: 'Instituições judiciais, judicialização de políticas públicas, ativismo do STF, transições democráticas e teoria crítica.',
    tags: ['Judiciário & Política', 'STF', 'Teoria Democrática'],
    span: 'normal',
    accent: 'card',
    url: 'https://www.fafich.ufmg.br/margem/',
    iconClass: 'bi-balance-scale text-[#1F1F1F]',
  },
  {
    id: 'ripperp',
    sigla: 'RIPPERP',
    nome: 'RIPPERP — Rede de Pesquisa em Política Externa e RI',
    eixo: 'legislativo_justica',
    eixoLabel: 'Eixo 2 • Paradiplomacia & RI',
    lider: 'Coord.: Prof. Dr. Dawisson Belém Lopes',
    tema: 'Cooperação internacional sul-sul, diplomacia pública federativa de estados e municípios, e organizações internacionais.',
    tags: ['Política Externa', 'Diplomacia Federativa', 'Organizações Internacionais'],
    span: 'normal',
    accent: 'accent',
    url: 'https://www.fafich.ufmg.br/dcp/',
    iconClass: 'bi-compass-fill text-[#134E4A]',
  },
  {
    id: 'prodep',
    sigla: 'PRODEP',
    nome: 'PRODEP — Projeto Democracia Participativa',
    eixo: 'democracia_genero',
    eixoLabel: 'Eixo 3 • Participação Social',
    lider: 'Coord.: Prof. Dr. Leonardo Avritzer',
    tema: 'Orçamento participativo, conselhos gestores de políticas públicas (saúde, assistência, cidades) e conferências nacionais.',
    tags: ['Orçamento Participativo', 'Conselhos Gestores', 'Controle Social'],
    span: 'normal',
    accent: 'card',
    url: 'https://www.fafich.ufmg.br/prodep/',
    iconClass: 'bi-people-fill text-[#5B2A85]',
  },
  {
    id: 'inct-iddc',
    sigla: 'INCT / IDDC',
    nome: 'INCT — Instituto da Democracia e Democratização da Comunicação',
    eixo: 'democracia_genero',
    eixoLabel: 'Eixo 3 • INCT / CNPq / FAPEMIG',
    lider: 'Rede Nacional sediada no DCP/FAFICH/UFMG',
    tema: 'Pesquisa eleitoral comparada, barômetro da confiança nas instituições republicanas e integridade do debate público.',
    tags: ['Opinião Pública', 'Comunicação Pública', 'INCT / CNPq'],
    span: 'wide',
    accent: 'primary',
    url: 'https://www.institutodademocracia.org/',
    iconClass: 'bi-megaphone-fill text-[#5B2A85]',
  },
  {
    id: 'nepem',
    sigla: 'NEPEM',
    nome: 'NEPEM — Núcleo de Estudos e Pesquisas sobre a Mulher',
    eixo: 'democracia_genero',
    eixoLabel: 'Eixo 3 • Gênero & Direitos Humanos',
    lider: 'Coord.: Profa. Dra. Marlise Matos',
    tema: 'Representação política feminina, transversalidade de gênero em planos plurianuais (PPA), orçamento sensível a gênero e interseccionalidade.',
    tags: ['Mulheres na Política', 'Orçamento & Gênero', 'Direitos Humanos'],
    span: 'normal',
    accent: 'secondary',
    url: 'https://www.fafich.ufmg.br/nepem/',
    iconClass: 'bi-gender-female text-secondary',
  },
  {
    id: 'cecomp',
    sigla: 'CECOMP',
    nome: 'CECOMP — Centro de Estudos do Comportamento Político',
    eixo: 'democracia_genero',
    eixoLabel: 'Eixo 3 • Comportamento Eleitoral',
    lider: 'Coord.: Prof. Dr. Mario Fuks',
    tema: 'Cultura política, comportamento eleitoral, polarização, engajamento cívico juvenil e métodos quantitativos em pesquisas de opinião.',
    tags: ['Cultura Política', 'Comportamento Eleitoral', 'Métodos Quantitativos'],
    span: 'normal',
    accent: 'accent',
    url: 'https://www.fafich.ufmg.br/cecomp/',
    iconClass: 'bi-bar-chart-line-fill text-[#134E4A]',
  },
];

const EIXO_FILTERS = [
  { id: 'todos', label: 'Todos os Núcleos (11)' },
  { id: 'politicas_estado', label: '1. Gestão & Políticas Públicas (3)' },
  { id: 'legislativo_justica', label: '2. Legislativo, Justiça & RI (4)' },
  { id: 'democracia_genero', label: '3. Democracia, Gênero & Opinião (4)' },
];

export const PesquisaBentoDirectory: React.FC = () => {
  const [activeEixo, setActiveEixo] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNucleos = NUCLEOS_DCP.filter((n) => {
    const matchesEixo = activeEixo === 'todos' || n.eixo === activeEixo;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      n.sigla.toLowerCase().includes(q) ||
      n.nome.toLowerCase().includes(q) ||
      n.lider.toLowerCase().includes(q) ||
      n.tema.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q));
    return matchesEixo && matchesQuery;
  });

  const bentoItems: BentoItem[] = filteredNucleos.map((n) => ({
    title: n.nome,
    badge: n.sigla,
    meta: `${n.eixoLabel} • ${n.lider}`,
    description: n.tema,
    tags: n.tags,
    span: activeEixo === 'todos' && !searchQuery ? n.span : 'normal',
    accent: n.accent,
    href: n.url,
    ctaLabel: `Portal ${n.sigla}`,
    external: true,
    secondaryHref: route('/acg#calculadora'),
    secondaryLabel: 'Simular 90h AAC',
    icon: <i className={`bi ${n.iconClass} text-xl`} aria-hidden="true" />,
  }));

  return (
    <div className="space-y-6 my-4 text-foreground">
      {/* Barra de Filtros Responsivos & Busca Instantânea */}
      <div className="p-5 bg-white border-2 border-[#1F1F1F] rounded-2xl shadow-[6px_6px_0_0_#1F1F1F] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-[#1F1F1F] pb-4">
          <div>
            <h2 className="font-head text-lg sm:text-2xl font-black text-[#1F1F1F] m-0">
              Explore os 11 Laboratórios &amp; Núcleos de Pesquisa
            </h2>
            <p className="text-xs text-gray-800 font-body font-medium mt-0.5 m-0">
              Filtre por eixo temático ou busque por professor, sigla ou área de interesse para Iniciação Científica (até 90h AAC) e Extensão:
            </p>
          </div>

          <div className="w-full md:w-72">
            <label htmlFor="pesquisa-search-input" className="sr-only">
              Buscar núcleo, docente ou tema
            </label>
            <div className="relative">
              <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-sm" aria-hidden="true" />
              <input
                id="pesquisa-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar sigla, docente, SUS, legislativo..."
                className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl border-3 border-[#1F1F1F] bg-card font-mono text-base md:text-sm font-bold text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B2A85] focus-visible:ring-offset-2 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Botões de Filtro com Alvos Táteis 44x44pt */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filtrar núcleos por eixo de pesquisa">
          {EIXO_FILTERS.map((f) => {
            const isSelected = activeEixo === f.id;
            return (
              <motion.button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                whileHover={{ y: -2 }}
                whileTap={{ x: 2, y: 2 }}
                transition={tactileSpring}
                onClick={() => setActiveEixo(f.id)}
                className={`min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs font-black uppercase border-3 border-[#1F1F1F] cursor-pointer transition-colors active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#5B2A85] text-white shadow-[3px_3px_0_0_#1F1F1F]'
                    : 'bg-white text-[#1F1F1F] hover:bg-[#F4F2EC] shadow-[2px_2px_0_0_#1F1F1F]'
                }`}
              >
                {f.label}
              </motion.button>
            );
          })}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Limpar campo de busca"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FEE2E2] hover:bg-[#FECACA] active:translate-x-0.5 active:translate-y-0.5 text-[#991B1B] font-mono text-xs font-black uppercase border-2 border-[#1F1F1F] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 inline-flex items-center gap-1.5"
            >
              <span>Limpar Busca</span>
              <i className="bi bi-x-circle-fill text-sm" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Grade Bento Animada (bento-grid.tsx) */}
      {bentoItems.length > 0 ? (
        <BentoGrid items={bentoItems} className="py-0 px-0 md:px-0 lg:px-0" />
      ) : (
        <div className="p-8 bg-white border-2 border-[#1F1F1F] rounded-xl text-center space-y-3 shadow-[3px_3px_0_0_#1F1F1F]">
          <p className="font-head text-base font-black uppercase text-[#1F1F1F] m-0">
            Nenhum núcleo encontrado para &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveEixo('todos');
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#5B2A85] hover:bg-[#4A216E] active:translate-x-0.5 active:translate-y-0.5 text-white font-head text-xs font-black uppercase border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Mostrar Todos os 11 Núcleos
          </button>
        </div>
      )}

      {/* Destaque Eleitoral Chapa Semente: Propostas 9 e 12 (Divulgação Ativa de Bolsas de IC & Eventos com Núcleos) */}
      <div className="p-5 sm:p-6 bg-[#ffffff] border-2 border-[#1F1F1F] rounded-2xl shadow-[6px_6px_0_0_#1F1F1F] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#5B2A85] text-white font-mono text-xs font-black uppercase border-2 border-[#1F1F1F]">
              PROPOSTAS 9 E 12 • PESQUISA, EXTENSÃO &amp; RADAR DE BOLSAS
            </span>
            <span className="font-mono text-xs font-bold text-secondary">Chapa Semente 2026</span>
          </div>
          <h4 className="font-head text-base sm:text-lg font-black text-[#1F1F1F] m-0">
            Divulgação Ativa de Editais PIBIC/PROEX e Integração do Turno Noturno aos Laboratórios
          </h4>
          <p className="text-xs text-gray-800 leading-relaxed font-body font-medium m-0">
            Muitas vagas de Iniciação Científica (R$ 700/mês + até 90h de AAC) passavam despercebidas pelos estudantes do noturno. A <strong>Chapa Semente</strong> centraliza a divulgação imediata de editais (Proposta 12) e articula seminários diretos entre os 11 núcleos do DCP e a graduação (Proposta 9).
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={route('/noticias')}
            className="min-h-[44px] px-4 py-2.5 bg-white hover:bg-[#F4F2EC] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-[#1F1F1F] rounded-xl font-head text-xs uppercase font-black tracking-wider inline-flex items-center justify-center gap-1.5 no-underline border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Radar de Editais &amp; Bolsas</span>
          </a>
          <a
            href={route('/chapa-semente#propostas')}
            className="min-h-[44px] px-4 py-2.5 bg-card hover:bg-muted active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-foreground rounded-xl font-head text-xs uppercase font-black tracking-wider inline-flex items-center justify-center gap-1.5 no-underline border-3 border-border shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Ler as propostas 9 e 12</span>
          </a>
        </div>
      </div>
    </div>
  );
};
