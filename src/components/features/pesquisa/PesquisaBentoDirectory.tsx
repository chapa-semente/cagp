import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BentoGrid, type BentoItem } from '@/components/boldkit/blocks/bento-grid';
import { route } from '@/lib/paths';
import { tactileSpring } from '@/lib/motion';

type Eixo = 'politicas_estado' | 'legislativo_justica' | 'democracia_genero';

interface ResearchCenterItem {
  id: string;
  sigla: string;
  nome: string;
  eixo: Eixo;
  eixoLabel: string;
  /** Quem responde pelo grupo, com o papel que a fonte dá (coordenação, líder, docente vinculado). */
  lider: string;
  tema: string;
  tags: string[];
  span?: 'large' | 'tall' | 'wide' | 'normal';
  accent?: 'primary' | 'secondary' | 'accent' | 'card';
  /** Canal principal do grupo (site, página ou rede social) e o rótulo do botão. */
  url: string;
  urlLabel: string;
  /** Segundo canal, quando o grupo tem. */
  url2?: string;
  url2Label?: string;
  iconClass: string;
}

// Fonte dos dados (conferidos em 12/11/2026): página "Grupos de Pesquisa" do PPGCP/UFMG
// (https://ppgcp.fafich.ufmg.br/grupopesq.php) e os canais de cada grupo, linkados no cartão.
// Só entra aqui o que essas páginas dizem. Sem link próprio no ar, o botão leva à ficha do grupo no PPGCP.
const PPGCP_GRUPOS = 'https://ppgcp.fafich.ufmg.br/grupopesq.php';

const NUCLEOS_DCP: ResearchCenterItem[] = [
  {
    id: 'publicus',
    sigla: 'PUBLICUS',
    nome: 'PUBLICUS — Núcleo de Estudos em Gestão e Políticas Públicas',
    eixo: 'politicas_estado',
    eixoLabel: 'Gestão & políticas públicas',
    lider: 'Coord.: Telma Menicucci · vice: Márcia Miranda Soares',
    tema: 'Criado em 2011 por professores do DCP. Pesquisa análise de políticas públicas, federalismo e relações intergovernamentais, políticas sociais, burocracia e gestão pública. Faz extensão com órgãos públicos e apoia o Programa de Imersão, que envolve alunos de Gestão Pública.',
    tags: ['Políticas sociais', 'Federalismo', 'Burocracia', 'Programa de Imersão'],
    span: 'wide',
    accent: 'primary',
    url: `${PPGCP_GRUPOS}#9`,
    urlLabel: 'PUBLICUS no PPGCP',
    iconClass: 'bi-building-gear text-primary',
  },
  {
    id: 'ceppi',
    sigla: 'CEPPI',
    nome: 'CEPPI — Centro de Pesquisas em Política e Internet',
    eixo: 'politicas_estado',
    eixoLabel: 'Política & internet',
    lider: 'Docente: Marcus Abílio Pereira',
    tema: 'Estuda o uso da internet por parlamentos e parlamentares, o ativismo político com tecnologias digitais e a governança digital. Faz reuniões semanais na sala 304 do anexo da FAFICH e já teve alunos de Gestão Pública na equipe.',
    tags: ['Governança digital', 'Parlamento online', 'Ativismo digital'],
    span: 'normal',
    accent: 'accent',
    url: 'https://inctdd.org/rede/grupos/ceppi-centro-de-pesquisas-em-politica-e-internet/',
    urlLabel: 'Página do CEPPI',
    url2: 'https://www.facebook.com/CeppiUfmg/',
    url2Label: 'Facebook',
    iconClass: 'bi-globe2 text-accent',
  },
  {
    id: 'decode',
    sigla: 'DECODE',
    nome: 'DECODE — Grupo de Pesquisa em Democracia e Comunicação Digital',
    eixo: 'politicas_estado',
    eixoLabel: 'Democracia digital',
    lider: 'Coord.: Isabele Batista Mitozo',
    tema: 'Investiga como a digitalização do cotidiano muda as funções das instituições do Estado, as inovações democráticas e o comportamento político. Reúne também pesquisadoras da UFPR, da Câmara dos Deputados e do Aláfia Lab.',
    tags: ['Estado digital', 'Inovações democráticas', 'INCT.DD'],
    span: 'normal',
    accent: 'card',
    url: 'https://www.instagram.com/decode_ufmg/',
    urlLabel: 'Instagram do DECODE',
    iconClass: 'bi-cpu text-secondary',
  },
  {
    id: 'cel',
    sigla: 'CEL',
    nome: 'CEL — Centro de Estudos Legislativos',
    eixo: 'legislativo_justica',
    eixoLabel: 'Legislativo & partidos',
    lider: 'Coord. (segundo o PPGCP): Carlos Ranulfo Melo',
    tema: 'Grupo registrado no CNPq em 2002. Pesquisa o Legislativo nacional e local, suas relações com o Executivo e o Judiciário, partidos, sistemas eleitorais, lobby e grupos de interesse. Fica no anexo da FAFICH, 2º andar, sala 206, e abre seleção de graduandos para o Grupo de Estudos Poder Local.',
    tags: ['Estudos legislativos', 'Executivo e presidências', 'Lobby', 'Poder local'],
    span: 'wide',
    accent: 'secondary',
    url: 'https://www.centroestudoslegislativos.com.br/',
    urlLabel: 'Site do CEL',
    url2: 'mailto:celufmg@gmail.com',
    url2Label: 'E-mail',
    iconClass: 'bi-bank2 text-secondary',
  },
  {
    id: 'femjusp',
    sigla: 'FEMJUSP',
    nome: 'Rede Femjusp — Rede Feminina de Estudos de Violência, Justiça e Prisões',
    eixo: 'legislativo_justica',
    eixoLabel: 'Violência, justiça & prisões',
    lider: 'Coord.: Ana Paula Vasconcelos Gonçalves e Ludmila Ribeiro',
    tema: 'Fundada em 2025 por pesquisadoras de várias áreas. Estuda violência, sistema prisional e socioeducativo e segurança pública sob a perspectiva da desigualdade de gênero: feminicídio, tempo de processamento de crimes letais, familiares de pessoas presas. Tem graduanda de Gestão Pública na equipe.',
    tags: ['Segurança pública', 'Justiça criminal', 'Violência de gênero'],
    span: 'normal',
    accent: 'primary',
    url: 'https://femjusp.com.br/sobre',
    urlLabel: 'Site da Femjusp',
    iconClass: 'bi-shield-shaded text-primary',
  },
  {
    id: 'ojb',
    sigla: 'OJB',
    nome: 'OJB — Observatório da Justiça no Brasil e na América Latina',
    eixo: 'legislativo_justica',
    eixoLabel: 'Judiciário & política',
    lider: 'Coord.: Marjorie Corrêa Marona',
    tema: 'Fundado em 2010. Pesquisa acesso à justiça, reforma institucional, o impacto político do sistema de justiça (em especial o STF), Ministério Público, Defensoria e comportamento judicial. Hoje acompanha as audiências públicas no STF e os Tribunais de Justiça estaduais.',
    tags: ['STF', 'Acesso à justiça', 'Ministério Público'],
    span: 'normal',
    accent: 'card',
    url: 'https://www.facebook.com/ojbAL.UFMG',
    urlLabel: 'Facebook do OJB',
    iconClass: 'bi-building-check text-foreground',
  },
  {
    id: 'margem',
    sigla: 'MARGEM',
    nome: 'MARGEM — Grupo de Pesquisa em Democracia e Justiça',
    eixo: 'legislativo_justica',
    eixoLabel: 'Democracia & justiça',
    lider: 'Docentes do DCP: Eleonora Cunha, Ricardo Fabrino Mendonça e Cristiano Rodrigues',
    tema: 'Faz pesquisa conceitual e empírica sobre os obstáculos ao avanço democrático e as experiências de injustiça que atravessam práticas e instituições sociais, com pluralismo de métodos e de áreas.',
    tags: ['Teoria democrática', 'Justiça', 'Pluralismo metodológico'],
    span: 'normal',
    accent: 'accent',
    url: 'https://grupomargemufmg.wordpress.com/',
    urlLabel: 'Site do MARGEM',
    iconClass: 'bi-signpost-split text-petroleo-deep',
  },
  {
    id: 'ripperp',
    sigla: 'RIPPERP',
    nome: 'RIPPERP — Rede Interinstitucional de Pesquisa em Política Externa e Regime Político',
    eixo: 'legislativo_justica',
    eixoLabel: 'Política externa',
    lider: 'Líder: Dawisson Belém Lopes',
    tema: 'Estuda as relações entre a política doméstica e a política externa, na fronteira entre Ciência Política e Relações Internacionais: instituições internacionais e regionais, meio ambiente, direitos humanos e segurança internacional.',
    tags: ['Política externa', 'Instituições internacionais', 'Relações Internacionais'],
    span: 'normal',
    accent: 'card',
    url: 'https://politicaexterna2015.wordpress.com/participantes/',
    urlLabel: 'Site da RIPPERP',
    iconClass: 'bi-compass-fill text-petroleo-deep',
  },
  {
    id: 'prodep',
    sigla: 'PRODEP',
    nome: 'PRODEP — Projeto Democracia Participativa',
    eixo: 'democracia_genero',
    eixoLabel: 'Participação social',
    lider: 'Coord.: Leonardo Avritzer',
    tema: 'Núcleo de ensino, pesquisa e extensão do DCP, criado em 2002. Pesquisa democracia e instituições participativas, inovações democráticas, gestão participativa, movimentos sociais e participação na internet. É o laboratório sede do Instituto da Democracia e da Democratização da Comunicação (INCT), que faz a pesquisa A Cara da Democracia.',
    tags: ['Instituições participativas', 'Movimentos sociais', 'Controle social', 'INCT'],
    span: 'wide',
    accent: 'primary',
    url: 'https://www.facebook.com/prodepufmg/',
    urlLabel: 'Facebook do PRODEP',
    url2: 'https://www.institutodademocracia.org/',
    url2Label: 'Site do INCT',
    iconClass: 'bi-people-fill text-primary',
  },
  {
    id: 'nepem',
    sigla: 'NEPEM',
    nome: 'NEPEM — Núcleo de Estudos e Pesquisas sobre a Mulher',
    eixo: 'democracia_genero',
    eixoLabel: 'Gênero & feminismo',
    lider: 'Coord. geral: Marlise Matos',
    tema: 'Fundado em 1984, interdisciplinar e ligado à FAFICH: foi o terceiro núcleo de gênero e feminismo criado em universidades brasileiras. Pesquisa participação política e autonomia econômica das mulheres, feminicídio e políticas públicas de gênero, e mantém projetos de extensão e ciclos de estudos abertos.',
    tags: ['Mulheres na política', 'Políticas de gênero', 'Extensão'],
    span: 'normal',
    accent: 'secondary',
    url: 'https://www.instagram.com/nepemufmg/',
    urlLabel: 'Instagram do NEPEM',
    url2: 'https://linktr.ee/nepem.ufmg',
    url2Label: 'Links',
    iconClass: 'bi-gender-female text-secondary',
  },
  {
    id: 'cecomp',
    sigla: 'CECOMP',
    nome: 'CECOMP — Centro de Estudos do Comportamento Político',
    eixo: 'democracia_genero',
    eixoLabel: 'Comportamento político',
    lider: 'Fundador: Mario Fuks',
    tema: 'Começou em 2012 e reúne professores e estudantes de graduação, mestrado e doutorado. Pesquisa legitimidade democrática, socialização política, comportamento eleitoral, antipartidarismo, ideologia e participação política. Discute os trabalhos em reuniões abertas ao grupo e organiza um ciclo anual de palestras.',
    tags: ['Comportamento eleitoral', 'Opinião pública', 'Legitimidade democrática'],
    span: 'normal',
    accent: 'accent',
    url: 'https://www.facebook.com/CeComPolitico',
    urlLabel: 'Facebook do CECOMP',
    url2: 'mailto:cecomp@outlook.com',
    url2Label: 'E-mail',
    iconClass: 'bi-bar-chart-line-fill text-petroleo-deep',
  },
];

const contarEixo = (eixo: Eixo) => NUCLEOS_DCP.filter((n) => n.eixo === eixo).length;

const EIXO_FILTERS = [
  { id: 'todos', label: `Todos os núcleos (${NUCLEOS_DCP.length})` },
  { id: 'politicas_estado', label: `1. Gestão, Estado & digital (${contarEixo('politicas_estado')})` },
  { id: 'legislativo_justica', label: `2. Legislativo, justiça & RI (${contarEixo('legislativo_justica')})` },
  { id: 'democracia_genero', label: `3. Democracia, gênero & opinião (${contarEixo('democracia_genero')})` },
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
    ctaLabel: n.urlLabel,
    external: true,
    secondaryHref: n.url2,
    secondaryLabel: n.url2Label,
    secondaryExternal: Boolean(n.url2 && !n.url2.startsWith('mailto:')),
    icon: <i className={`bi ${n.iconClass} text-xl`} aria-hidden="true" />,
  }));

  return (
    <div className="space-y-6 my-4 text-foreground">
      {/* Barra de Filtros Responsivos & Busca Instantânea */}
      <div className="p-5 bg-white border-2 border-border rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-border pb-4">
          <div>
            <h2 className="font-head text-lg sm:text-2xl font-black text-foreground m-0">
              Explore os 11 Laboratórios &amp; Núcleos de Pesquisa
            </h2>
            <p className="text-xs text-gray-800 font-body font-medium mt-0.5 m-0">
              Filtre por eixo ou busque por professor, sigla ou tema. Cada cartão leva ao canal do próprio grupo. A relação completa está na{' '}
              <a href={PPGCP_GRUPOS} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                página de grupos de pesquisa do PPGCP
              </a>
              .
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
                placeholder="Buscar sigla, docente, tema..."
                className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl border-3 border-border bg-card font-mono text-base md:text-sm font-bold text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
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
                className={`min-h-[44px] px-4 py-2 rounded-xl font-mono text-xs font-black uppercase border-3 border-border cursor-pointer transition-colors active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-foreground hover:bg-background shadow-sm'
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
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-destructive-tint hover:bg-destructive-tint active:translate-x-0.5 active:translate-y-0.5 text-destructive font-mono text-xs font-black uppercase border-2 border-border cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 inline-flex items-center gap-1.5"
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
        <div className="p-8 bg-white border-2 border-border rounded-xl text-center space-y-3 shadow-md">
          <p className="font-head text-base font-black uppercase text-foreground m-0">
            Nenhum núcleo encontrado para &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveEixo('todos');
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover active:translate-x-0.5 active:translate-y-0.5 text-white font-head text-xs font-black uppercase border-3 border-border shadow-md cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Mostrar Todos os 11 Núcleos
          </button>
        </div>
      )}

      {/* Destaque Eleitoral Chapa Semente: Propostas 9 e 12 (Divulgação Ativa de Bolsas de IC & Eventos com Núcleos) */}
      <div className="p-5 sm:p-6 bg-white border-2 border-border rounded-2xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-primary text-white font-mono text-xs font-black uppercase border-2 border-border">
              PROPOSTAS 9 E 12 • PESQUISA, EXTENSÃO &amp; RADAR DE BOLSAS
            </span>
            <span className="font-mono text-xs font-bold text-secondary">Chapa 2 · Semente</span>
          </div>
          <h4 className="font-head text-base sm:text-lg font-black text-foreground m-0">
            Divulgação Ativa de Editais PIBIC/PROEX e Integração do Turno Noturno aos Laboratórios
          </h4>
          <p className="text-xs text-gray-800 leading-relaxed font-body font-medium m-0">
            Muitas vagas de Iniciação Científica (R$ 700/mês + até 90h de AAC) passavam despercebidas pelos estudantes do noturno. A <strong>Chapa Semente</strong> centraliza a divulgação imediata de editais (Proposta 12) e articula seminários diretos entre os 11 núcleos do DCP e a graduação (Proposta 9).
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={route('/noticias')}
            className="min-h-[44px] px-4 py-2.5 bg-white hover:bg-background active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-foreground rounded-xl font-head text-xs uppercase font-black tracking-wider inline-flex items-center justify-center gap-1.5 no-underline border-3 border-border shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Editais e bolsas</span>
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
