import React from 'react';
import { motion } from 'motion/react';
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineCard,
} from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { asset, route } from '@/lib/paths';
import {
  photoCardHover,
  photoCardTap,
  tactileSpring,
  staggerContainer,
  staggerItem,
} from '@/lib/motion';

interface HistoricalMilestone {
  year: string;
  title: string;
  tag: string;
  status: 'completed' | 'current' | 'upcoming';
  desc: string;
  highlight?: boolean;
}

const CANDANGOS_TIMELINE: HistoricalMilestone[] = [
  {
    year: '1959',
    title: 'Monumento "Os Candangos" (Dois Guerreiros) — Bruno Giorgi',
    tag: 'ORIGEM SEMIÓTICA • BRASÍLIA/DF',
    status: 'completed',
    desc: 'Inaugurada na Praça dos Três Poderes, a escultura em bronze de 8 metros de Bruno Giorgi homenageia os trabalhadores que ergueram a nova capital. Inspira diretamente a marca oficial do CAGP: o Estado como construção coletiva, o prumo republicano e os pilares democráticos.',
    highlight: true,
  },
  {
    year: '2009',
    title: 'Criação do Bacharelado em Gestão Pública na UFMG (REUNI)',
    tag: 'FUNDAÇÃO • DCP / FAFICH',
    status: 'completed',
    desc: 'Instituído no âmbito do REUNI no Departamento de Ciência Política (Conceito 7 CAPES) da FAFICH/UFMG, ofertando 80 vagas anuais no turno noturno e dando origem ao Centro Acadêmico de Gestão Pública (CAGP).',
  },
  {
    year: '2015',
    title: 'Reconhecimento MEC Nota 4 & Consolidação no Campo de Públicas',
    tag: 'EXCELÊNCIA • CPC / ENADE',
    status: 'completed',
    desc: 'O curso conquista Nota 4 no Conceito Preliminar de Curso (CPC/MEC) e consolida-se no cluster nacional de Gestão de Políticas Públicas (ao lado de USP, UFABC e UFRN).',
  },
  {
    year: '2020',
    title: 'Reforma do Projeto Pedagógico (PPC 2020 • Versão N-20229)',
    tag: 'CURRÍCULO VIGENTE • 3.000H',
    status: 'completed',
    desc: 'Modernização curricular estruturada em 3.000 horas (200 créditos em 10 semestres), com 3 percursos formativos, 300h de Formação em Extensão Obrigatória (DCP 195/196) e até 300h de AAC.',
  },
];

interface PublicCareerCard {
  id: string;
  esfera: 'Federal' | 'Estadual MG' | 'Legislativo & Controle' | 'Internacional & 3º Setor';
  cargo: string;
  orgao: string;
  remuneracaoInicial: string;
  remuneracaoTopo: string;
  ingresso: string;
  insercaoUFMG: string;
  atribuicoes: string[];
  corDestaque: string;
}

const CARREIRAS_COMPARATIVAS: PublicCareerCard[] = [
  {
    id: 'eppgg-fed',
    esfera: 'Federal',
    cargo: 'EPPGG Federal & Analista de Planejamento e Orçamento (APO)',
    orgao: 'Ministério da Gestão (MGI) & Ministério do Planejamento (MPO)',
    remuneracaoInicial: 'R$ 20.924,80',
    remuneracaoTopo: 'R$ 29.832,94',
    ingresso: 'Concurso Nacional Unificado (CNU) + Curso de Formação na ENAP (Brasília)',
    insercaoUFMG: '15% dos egressos no Executivo Federal',
    atribuicoes: [
      'Formulação, implementação e avaliação ex-ante/ex-post de políticas nacionais',
      'Elaboração do PPA, LDO e LOA federal e governança de dados governamentais',
      'Direção e assessoramento superior (DAS/FCE) em ministérios e autarquias',
    ],
    corDestaque: '#5B2A85',
  },
  {
    id: 'eppgg-mg',
    esfera: 'Estadual MG',
    cargo: 'Especialista em Políticas Públicas e Gestão Governamental (EPPGG-MG)',
    orgao: 'SEPLAG-MG, Secretarias de Estado & Prefeitura de BH (PBH)',
    remuneracaoInicial: 'R$ 7.600 a R$ 11.200',
    remuneracaoTopo: 'R$ 18.500+',
    ingresso: 'Concurso Público Estadual (SEPLAG) ou Processos Seletivos de Gestão Municipal',
    insercaoUFMG: '37% no Executivo Estadual + 13% Municipal',
    atribuicoes: [
      'Gestão estratégica na Cidade Administrativa de MG e secretarias municipais',
      'Monitoramento de metas, compras públicas (Lei 14.133) e parcerias com OSCs (MROSC)',
      'Desenho de políticas de saúde (SUS), educação, assistência social e desenvolvimento regional',
    ],
    corDestaque: '#9E2424',
  },
  {
    id: 'legislativo-controle',
    esfera: 'Legislativo & Controle',
    cargo: 'Consultor Legislativo & Auditor de Controle Externo / Interno',
    orgao: 'ALMG, CMBH, Câmara/Senado, TCE-MG, CGU e TCU',
    remuneracaoInicial: 'R$ 13.800 a R$ 26.000',
    remuneracaoTopo: 'R$ 33.000+',
    ingresso: 'Concursos de Consultoria Parlamentar e Tribunais de Contas (Nível Superior)',
    insercaoUFMG: 'Forte base em Processo Legislativo (CEL/DCP)',
    atribuicoes: [
      'Redação técnica de projetos de lei, emendas orçamentárias e pareceres constitucionais',
      'Auditoria operacional de programas públicos e fiscalização de contratos administrativos',
      'Assessoria técnica a comissões parlamentares e ouvidorias públicas',
    ],
    corDestaque: '#134E4A',
  },
  {
    id: 'consultoria-osc',
    esfera: 'Internacional & 3º Setor',
    cargo: 'Especialista em Projetos, GovTechs & Organismos Multilaterais',
    orgao: 'PNUD/ONU, UNESCO, BID, Fundações, Institutos e Consultorias',
    remuneracaoInicial: 'R$ 6.500 a R$ 14.000',
    remuneracaoTopo: 'R$ 22.000+',
    ingresso: 'Seleções técnicas por competência, editais de cooperação internacional (ONU) e mercado',
    insercaoUFMG: '18% em Consultorias Especializadas e 3º Setor',
    atribuicoes: [
      'Avaliação de impacto econométrico e desenho de indicadores sociais e ESG',
      'Captação de recursos, gestão de convênios e transformação digital em prefeituras',
      'Coordenação de projetos sociais em ONGs, fundações e institutos de pesquisa',
    ],
    corDestaque: '#FE8812',
  },
];

export const CursoCandangosAndTimeline: React.FC = () => {
  return (
    <section className="space-y-8 my-6 text-foreground" aria-label="Memória dos Candangos de 1959, Linha do Tempo e Carreiras Públicas">
      {/* 1. Dossiê Editorial Ampliado: Os Candangos de 1959 & A Identidade da Gestão Pública na UFMG */}
      <div className="p-5 sm:p-7 bg-white border-2 border-[#1F1F1F] rounded-2xl shadow-[8px_8px_0_0_#1F1F1F] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-3 border-[#1F1F1F] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md bg-[#9E2424] text-white font-mono text-xs font-black uppercase border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F]">
                MEMÓRIA HISTÓRICA • BRUNO GIORGI (1959)
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#5B2A85] text-white font-mono text-xs font-black uppercase border-2 border-[#1F1F1F]">
                SÍMBOLO OFICIAL DO CAGP UFMG
              </span>
            </div>
            <h2 className="font-head text-xl sm:text-2xl md:text-3xl font-black text-[#1F1F1F] m-0">
              Os Candangos de 1959 &amp; A Construção Democrática do Estado
            </h2>
            <p className="text-xs sm:text-sm text-gray-800 mt-1 m-0 font-body font-medium max-w-4xl">
              Por que o monumento <em>Dois Guerreiros ("Os Candangos")</em>, inaugurado em 1959 na Praça dos Três Poderes, batiza a identidade visual do Bacharelado em Gestão Pública da FAFICH/UFMG?
            </p>
          </div>
          <span className="px-3.5 py-2 rounded-xl bg-[#1F1F1F] text-white font-mono text-xs font-black uppercase shrink-0 border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#FE8812]">
            1959 → 2009 → 2026
          </span>
        </div>

        {/* Molduras Editoriais Grandes (Fotos Históricas Ampliadas com photoCardHover) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            <motion.div
              whileHover={photoCardHover}
              whileTap={photoCardTap}
              className="cagp-photo-frame relative aspect-[16/10] min-h-[280px] sm:min-h-[360px] w-full rounded-xl border-3 border-[#1F1F1F] shadow-[8px_8px_0_0_#1F1F1F] overflow-hidden bg-[#F4F2EC]"
            >
              <img
                src={asset('/imagens/os-candangos.jpg')}
                alt="Monumento Os Candangos (Dois Guerreiros) de Bruno Giorgi (1959) na Praça dos Três Poderes em Brasília"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/25 to-transparent pointer-events-none" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#9E2424] text-white font-mono font-black text-xs uppercase tracking-wider border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F]">
                PRAÇA DOS TRÊS PODERES • 1959
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-head font-black text-base sm:text-xl leading-tight m-0">
                  &ldquo;Dois Guerreiros&rdquo; (Os Candangos) — Escultura em Bronze de Bruno Giorgi
                </h3>
                <p className="font-mono text-xs text-white m-0">
                  Patrimônio Cultural da Humanidade (UNESCO) • Símbolo da soberania popular e do trabalho coletivo que ergue o Estado brasileiro.
                </p>
              </div>
            </motion.div>

            <div className="p-4 rounded-xl border-2 border-[#1F1F1F] bg-[#ffffff] shadow-[3px_3px_0_0_#1F1F1F] flex items-center gap-4">
              <img
                src={asset('/logos/cagp/01_vertical_fundo_claro.svg')}
                alt="Logotipo Oficial do CAGP estilizando Os Candangos"
                className="w-16 h-16 object-contain rounded-lg border-2 border-[#1F1F1F] bg-white p-1.5 shrink-0"
              />
              <p className="text-xs text-[#1F1F1F] font-body font-medium leading-relaxed m-0">
                <strong>Da Escultura de 1959 ao Símbolo do CAGP (2009):</strong> O traço geométrico rubro (<code>#9E2424</code>) do Centro Acadêmico une os dois guerreiros pelo prumo republicano central, lembrando a cada estudante que gerir a coisa pública é servir ao povo trabalhador.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <motion.div
              whileHover={photoCardHover}
              whileTap={photoCardTap}
              className="cagp-photo-frame relative aspect-[4/3] min-h-[280px] sm:min-h-[360px] w-full rounded-xl border-3 border-[#1F1F1F] shadow-[8px_8px_0_0_#1F1F1F] overflow-hidden bg-[#F4F2EC] flex-1"
            >
              <img
                src={asset('/imagens/semente/foto_campus_universitario.jpg')}
                alt="Prédio da FAFICH e Campus Pampulha da UFMG — Sede do Bacharelado em Gestão Pública desde 2009"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/25 to-transparent pointer-events-none" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#5B2A85] text-white font-mono font-black text-xs uppercase tracking-wider border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F]">
                FAFICH / UFMG • REUNI 2009
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-head font-black text-base sm:text-lg leading-tight m-0">
                  Território do Campo de Públicas na UFMG
                </h3>
                <p className="font-mono text-xs text-white m-0">
                  Departamento de Ciência Política (Conceito 7 CAPES) • 426 estudantes ativos no turno noturno.
                </p>
              </div>
            </motion.div>

            <div className="p-4 rounded-xl border-2 border-[#1F1F1F] bg-[#EFE7F6] shadow-[3px_3px_0_0_#1F1F1F] space-y-1.5">
              <span className="font-mono text-xs font-black uppercase text-[#5B2A85] block">
                SEMIÓTICA TRÍPLICE • CANDANGOS + SEMENTE + UFMG
              </span>
              <p className="text-xs text-[#1F1F1F] font-body font-medium leading-relaxed m-0">
                A <strong>Chapa Semente</strong> honra o legado dos Candangos de 1959 com trabalho real: entregamos o portal e as calculadoras do curso funcionando antes mesmo das urnas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Linha do Tempo Histórica Animada (timeline.tsx + motion/react) */}
      <div className="p-5 sm:p-7 bg-white border-2 border-[#1F1F1F] rounded-2xl shadow-[6px_6px_0_0_#1F1F1F] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#1F1F1F] pb-3">
          <div>
            <span className="font-mono text-xs font-black uppercase text-secondary block">
              LINHA DO TEMPO INTERATIVA • TIMELINE.TSX
            </span>
            <h3 className="font-head text-lg sm:text-2xl font-black text-[#1F1F1F] m-0">
              Trajetória Histórica: De 1959 à Gestão Pública na UFMG (2026)
            </h3>
          </div>
          <Badge variant="default" className="font-mono">
            5 Marcos Estruturantes
          </Badge>
        </div>

        <motion.div
          variants={staggerContainer(0.07)}
        >
          <Timeline orientation="vertical" className="w-full pt-2">
            {CANDANGOS_TIMELINE.map((milestone, idx) => (
              <motion.div key={milestone.year} variants={staggerItem}>
                <TimelineItem status={milestone.status}>
                  <TimelineHeader className="flex-col items-center mr-2 sm:mr-4">
                    <TimelineTime className="font-mono font-black text-xs sm:text-sm text-[#1F1F1F] bg-[#FEF3C7] px-2.5 py-1 rounded-md border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F] mb-2">
                      {milestone.year}
                    </TimelineTime>
                    <TimelineDot
                      status={milestone.status}
                      size="md"
                      className={
                        milestone.highlight
                          ? 'bg-[#FE8812] text-[#1F1F1F] border-3 border-[#1F1F1F]'
                          : 'bg-[#5B2A85] text-white border-3 border-[#1F1F1F]'
                      }
                    >
                      <span className="font-mono text-xs font-black">{idx + 1}</span>
                    </TimelineDot>
                    {idx < CANDANGOS_TIMELINE.length - 1 && (
                      <TimelineConnector status="completed" className="min-h-14" />
                    )}
                  </TimelineHeader>

                  <TimelineContent className="pb-6">
                    <TimelineCard
                      className={`rounded-xl border-2 border-[#1F1F1F] p-4 sm:p-5 shadow-[3px_3px_0_0_#1F1F1F] ${
                        milestone.highlight ? 'bg-[#FFF8F6] border-[#9E2424]' : 'bg-white'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <TimelineTitle className="font-head text-sm sm:text-base font-black text-[#1F1F1F] m-0">
                          {milestone.title}
                        </TimelineTitle>
                        <span className="px-2.5 py-0.5 rounded-md bg-[#1F1F1F] text-white font-mono text-xs font-bold uppercase">
                          {milestone.tag}
                        </span>
                      </div>
                      <TimelineDescription className="text-xs sm:text-sm text-gray-800 font-body font-medium leading-relaxed m-0">
                        {milestone.desc}
                      </TimelineDescription>
                    </TimelineCard>
                  </TimelineContent>
                </TimelineItem>
              </motion.div>
            ))}
          </Timeline>
        </motion.div>
      </div>

      {/* Ponte Direta para Egressos & Central de Carreira */}
      <div className="p-5 rounded-2xl bg-[#ffffff] border-2 border-[#1F1F1F] shadow-[5px_5px_0_0_#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-head text-base sm:text-lg font-black text-[#1F1F1F] m-0">
            Carreiras Públicas, Salários &amp; Inserção no Mercado
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 font-body font-medium m-0">
            Compare remuneração (EPPGG Federal, EPPGG-MG, Municípios e Consultorias) e veja dados oficiais de empregabilidade dos egressos na aba dedicada a Egressos.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href="#egressos"
            className="min-h-[44px] px-4 py-2 bg-secondary hover:bg-secondary-hover text-white rounded-xl font-head text-xs uppercase font-black tracking-wider inline-flex items-center justify-center gap-1.5 no-underline border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>Ver Egressos &amp; Salários →</span>
          </a>
          <a
            href={route('/carreira')}
            className="min-h-[44px] px-4 py-2 bg-white hover:bg-[#F4F2EC] text-[#1F1F1F] rounded-xl font-head text-xs uppercase font-black tracking-wider inline-flex items-center justify-center gap-1.5 no-underline border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>Central de Carreira</span>
          </a>
        </div>
      </div>
    </section>
  );
};
