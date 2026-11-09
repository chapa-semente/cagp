import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeobrutalistMotionCard } from '@/components/ui/neobrutalist-motion-card';
import { ButtonGroup } from '@/components/ui/button-group';
import { tactileSpring } from '@/lib/motion';
import { downloadPresetIcs } from '@/lib/calendar/icsGenerator';
import { asset } from '@/lib/paths';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Copy, Link2, Sparkles, CheckCircle2, CalendarCheck } from 'lucide-react';
import { CagpIcon } from '@/components/ui/CagpIcon';

export interface PropostaItem {
  id: number;
  eixoId: 1 | 2 | 3 | 4;
  eixoName: string;
  eixoBadge: string;
  eixoColor: string;
  title: string;
  summary: string;
  fullText: string;
  tags: string[];
}

export const CARTA_PROPOSTAS_DATA: PropostaItem[] = [
  {
    id: 1,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Prestação de Contas Trimestral',
    summary: 'Publicação trimestral de boletins detalhando todas as entradas, saídas e aplicações financeiras.',
    fullText: 'A Gestão se compromete com a publicação trimestral de boletins detalhando todas as movimentações financeiras (entradas, saídas, aplicações, etc) do caixa da Entidade.',
    tags: ['Finanças', 'Transparência Ativa', 'RREO', 'Boletim'],
  },
  {
    id: 2,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Reuniões Ordinárias Mensais Abertas e Fechadas',
    summary: 'Reuniões mensais internas e abertas a todos os discentes, com atas públicas das decisões tomadas.',
    fullText: 'A Gestão irá se reunir mensalmente em reuniões fechadas (somente para integrantes da chapa) e em reuniões abertas (permitidos todos os alunos do curso), com publicização das decisões tomadas.',
    tags: ['Participação', 'Democracia Direta', 'Atas Públicas', 'Colegiado'],
  },
  {
    id: 3,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Site do Curso de Gestão Pública (Compromisso Público)',
    summary: 'Criação e entrega da plataforma completa do curso independente do resultado da eleição.',
    fullText: 'A Chapa Semente se compromete em criar e disponibilizar, mesmo em uma eventual derrota eleitoral, um site para o curso de Gestão Pública. Neste site se concentrarão informações sobre a Universidade (questões relativas à vivência universitária) e sobre o Curso de Gestão Pública, além de um portal de transparência para publicação das decisões das reuniões e dos boletins de prestação de contas.',
    tags: ['Compromisso Público', 'Plataforma Digital', 'Superapp', 'Código Aberto'],
  },
  {
    id: 4,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Abertura do CNPJ do CAGP',
    summary: 'Formalização e registro do CA como personalidade jurídica própria (associação sem fins lucrativos).',
    fullText: 'Conforme previsto no Regimento Interno/Estatuto da Entidade, a Gestão irá se comprometer com a formalização e o efetivo cadastro do CA como personalidade jurídica própria (associação civil sem fins lucrativos).',
    tags: ['Institucional', 'Jurídico', 'Associação Civil', 'Independência'],
  },
  {
    id: 5,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Políticas de Segurança e Escaninhos Discentes',
    summary: 'Medidas de proteção contra furtos no CA em parceria com DCE/DA FAFICH e estudo de escaninhos.',
    fullText: 'Serão estudadas, junto do Diretório Central Estudantil da UFMG (DCE-UFMG), o Diretório Acadêmico Idalísio Aranha (DA FAFICH-UFMG) e a administração da Faculdade de Filosofia e Ciências Humanas (FAFICH-UFMG) a adoção de medidas de segurança para evitar e coibir os furtos de itens pessoais dos estudantes que frequentam as dependências do Centro Acadêmico de Gestão Pública. Estas medidas serão estudadas durante a Gestão e se comprometerão, acima de tudo, com os limites legais e as normas de convivência dentro do ambiente universitário. Além do mais, anexamente proposta de Revitalização participativa do patrimônio do CA, será estudada a possibilidade de adição de escaninhos para estudantes dentro das dependências da entidade, tendo em vista experiências exitosas em outros espaços dentro do Campus Pampulha da UFMG.',
    tags: ['Segurança', 'Escaninhos', 'FAFICH', 'DCE UFMG', 'Convivência'],
  },
  {
    id: 6,
    eixoId: 1,
    eixoName: 'Transparência e Gestão',
    eixoBadge: 'Eixo 1',
    eixoColor: '#5B2A85',
    title: 'Revitalização Participativa do Patrimônio do CA',
    summary: 'Votação aberta com o corpo discente sobre melhorias e reformas patrimoniais (Reserva do Possível).',
    fullText: 'Durante as reuniões trimestrais abertas, a Gestão decidirá questões de revitalização patrimonial a serem perseguidas. Serão votadas, junto ao corpo discente, o que do patrimônio da entidade deverá ser revitalizado ou adquirido durante a gestão, tendo em vista uma política de Reserva do Possível.',
    tags: ['Patrimônio', 'Votação Direta', 'Reserva do Possível', 'Espaço Físico'],
  },
  {
    id: 7,
    eixoId: 2,
    eixoName: 'Cultura e Bem Viver Universitário',
    eixoBadge: 'Eixo 2',
    eixoColor: '#FE8812',
    title: 'Política de Recepção de Calouros e Integração',
    summary: 'Nova cultura de acolhimento e eventos de integração com parcerias com TEMAS, SENATUS e Atlética.',
    fullText: 'Compreendendo que a permanência estudantil transcende a esfera patrimonial, a Gestão irá se comprometer com uma nova cultura de recepção de calouros e a organização de eventos (acadêmicos ou não) para integrar o corpo discente. Serão estudadas parcerias com instituições externas, como o TEMAS - Simulações Temáticas da Universidade Federal de Minas Gerais, a Sociedade de Debates da UFMG (SENATUS) e a Associação Atlética da FAFICH, IGC e FAE da UFMG, dentre outras, para a realização destas atividades.',
    tags: ['Calouros', 'Integração', 'SENATUS', 'TEMAS', 'Atlética FAFICH'],
  },
  {
    id: 8,
    eixoId: 2,
    eixoName: 'Cultura e Bem Viver Universitário',
    eixoBadge: 'Eixo 2',
    eixoColor: '#FE8812',
    title: 'Contato e Articulação com Entidades Estudantis',
    summary: 'Diálogo permanente com atores do Movimento Estudantil sem aparelhamento, em defesa do curso.',
    fullText: 'A Gestão irá se comprometer com a ideia de que uma entidade estudantil combativa exige constante diálogo com os diversos atores dentro do Movimento Estudantil, o que não significa alinhamento ideológico. Essa interlocução é fundamental para garantir a fluidez nas negociações e uma articulação rápida e eficaz em momentos de crise para o enfrentamento de pautas comuns. Ademais, a atuação política ativa e contínua previne um futuro aparelhamento do espaço, resguardando seu propósito essencial de garantir a efetiva representação dos estudantes do Curso de Gestão Pública.',
    tags: ['Representação', 'Apartidarismo', 'Movimento Estudantil', 'Autonomia'],
  },
  {
    id: 9,
    eixoId: 3,
    eixoName: 'Desenvolvimento Acadêmico & Carreira',
    eixoBadge: 'Eixo 3',
    eixoColor: '#266264',
    title: 'Parcerias para Eventos Acadêmicos e Painéis',
    summary: 'Parcerias com órgãos públicos, projetos de extensão, OSCs e egressos para debates transversais.',
    fullText: 'A Gestão irá se comprometer com a prospecção de parcerias com órgãos públicos, projetos de extensão, organizações da sociedade civil (OSC\'s) e personalidades do campo de públicas (egressas ou não) para a realização de eventos, palestras e rodas de conversa sobre temas transversais da Gestão Pública.',
    tags: ['Eventos', 'Extensão', 'Egressos', 'Setor Público', 'Carreiras'],
  },
  {
    id: 10,
    eixoId: 3,
    eixoName: 'Desenvolvimento Acadêmico & Carreira',
    eixoBadge: 'Eixo 3',
    eixoColor: '#266264',
    title: 'Cursos Livres de Curta Duração',
    summary: 'Cursos abertos à comunidade com foco em ciência política, políticas públicas e análise de dados.',
    fullText: 'A Gestão irá se comprometer com a organização de cursos livres de curta duração em temas transversais, com destaque para a ciência política. Os cursos serão abertos à comunidade.',
    tags: ['Cursos Livres', 'Ciência Política', 'Capacitação', 'Comunidade'],
  },
  {
    id: 11,
    eixoId: 3,
    eixoName: 'Desenvolvimento Acadêmico & Carreira',
    eixoBadge: 'Eixo 3',
    eixoColor: '#266264',
    title: 'Apoio à Empresa Júnior de Gestão Pública',
    summary: 'Apoio pleno à estruturação da EJ de Gestão Pública, impulsionando a experiência profissional.',
    fullText: 'A Gestão irá se comprometer em prestar apoio amplo a estruturação da empresa júnior do Curso de Gestão Pública, em observância aos limites da atuação da entidade, entendendo que essa é uma iniciativa que agrega muito na experiência acadêmica e formação profissional dos estudantes.',
    tags: ['Empresa Júnior', 'Consultoria Pública', 'Empreendedorismo', 'Prática'],
  },
  {
    id: 12,
    eixoId: 4,
    eixoName: 'Comunicação e Institucional',
    eixoBadge: 'Eixo 4',
    eixoColor: '#9E2424',
    title: 'Comunicação Ativa de Oportunidades',
    summary: 'Divulgação contínua de estágios, bolsas, concursos públicos, pesquisa, extensão e calendário discente.',
    fullText: 'A Gestão se compromete em desenvolver uma comunicação ativa e informativa para os estudantes, com conteúdos sobre oportunidades acadêmicas e profissionais, estágios, concursos, bolsas, pesquisa, extensão, atualidades e temas relevantes para a área. Também se compromete em buscar parcerias com outras entidades para divulgar projetos, ações e resultados do Centro Acadêmico, além de criar um calendário de publicações e incentivar a participação dos discentes na produção de conteúdo.',
    tags: ['Estágios', 'Bolsas', 'Concursos', 'Pesquisa & Extensão'],
  },
  {
    id: 13,
    eixoId: 4,
    eixoName: 'Comunicação e Institucional',
    eixoBadge: 'Eixo 4',
    eixoColor: '#9E2424',
    title: 'Linha de Produtos Personalizados do CAGP',
    summary: 'Camisetas, canecas, ecobags e adesivos sob demanda e pré-venda a preços populares.',
    fullText: 'A Gestão irá se comprometer em criar uma linha de produtos personalizados do curso, como camisetas, canecas, ecobags, adesivos, bottons e outros itens. Serão realizadas consultas com os estudantes para definir produtos, estampas e preços, priorizando opções acessíveis e modelos de produção sob demanda ou pré-venda, para reduzir custos e evitar desperdícios.',
    tags: ['Identidade Discente', 'Produtos do CA', 'Arrecadação', 'Sustentabilidade'],
  },
  {
    id: 14,
    eixoId: 4,
    eixoName: 'Comunicação e Institucional',
    eixoBadge: 'Eixo 4',
    eixoColor: '#9E2424',
    title: 'Canais Permanentes de Escuta e Acolhimento',
    summary: 'Canais abertos para acolher dúvidas, demandas e sugestões, incentivando a participação nas decisões.',
    fullText: 'A Gestão irá se comprometer com a criação de canais permanentes de escuta e diálogo para o acolhimento contínuo de dúvidas, demandas e sugestões discentes. Além disso, a entidade garantirá a ampla transparência mediante a divulgação periódica das iniciativas vigentes e dos encaminhamentos institucionais, associada à elaboração de materiais informativos para esclarecer a estrutura da representação discente e incentivar a participação popular nas deliberações universitárias.',
    tags: ['Ouvidoria Discente', 'Escuta Ativa', 'Acolhimento', 'Controle Social'],
  },
];

export const CartaPropostaInteractive: React.FC = () => {
  const [selectedEixo, setSelectedEixo] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(3);
  const [otpCode, setOtpCode] = useState('');
  const [votePledged, setVotePledged] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('cagp_semente_vote_pledge_v1') === 'true';
    } catch {
      return false;
    }
  });

  const handlePledgeVote = () => {
    setVotePledged(true);
    try {
      localStorage.setItem('cagp_semente_vote_pledge_v1', 'true');
    } catch {}
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cagp:open-credenciamento'));
      (window as any).cagpToast?.('Compromisso de voto registrado para 25 e 26/11!', 'bi-check2-circle');
    }
  };

  const filteredPropostas = useMemo(() => {
    return CARTA_PROPOSTAS_DATA.filter((item) => {
      const matchEixo = selectedEixo === 'all' || item.eixoId === selectedEixo;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.fullText.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchEixo && matchSearch;
    });
  }, [selectedEixo, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 1. COMPROMISSO INSTITUCIONAL DESTAQUE (PROPOSTA 3 MATERIALIZADA) COM FOTOGRAFIA AMPLIADA */}
      <Card className="border-3 border-[#16181d] bg-[#ffffff] shadow-[8px_8px_0_0_#FE8812] p-5 sm:p-6 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FE8812] text-[#16181d] font-heading font-black text-xs uppercase border-2 border-[#16181d] shadow-[3px_3px_0_0_#16181d] -rotate-1">
                <Sparkles className="w-3.5 h-3.5" />
                CARIMBO DOURADO • PROPOSTA 3 JÁ MATERIALIZADA
              </span>
              <Badge variant="secondary" className="bg-[#5B2A85] text-white font-mono text-xs uppercase border-2 border-[#16181d]">
                Votação: 25 e 26 de Novembro
              </Badge>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-[#16181d] m-0">
              Este SuperApp <span className="font-accent font-normal normal-case tracking-normal text-primary text-[1.15em]">já é</span> a Proposta 3 Entregue para Toda a Comunidade
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#16181d]/90 leading-relaxed max-w-3xl m-0">
              Enquanto campanhas tradicionais prometem no papel, a <strong>Chapa Semente</strong> construiu e entregou antecipadamente o <strong>SuperApp do Curso de Gestão Pública</strong> — com grafo curricular, calculadora de 600h, simulador do Art. 41, livro-caixa aberto e acervo de 80 documentos. <strong>Vote Chapa Semente nos dias 25 e 26 de Novembro no CAGP!</strong>
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePledgeVote}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FE8812] hover:bg-[#e67300] text-[#16181d] border-3 border-[#16181d] font-heading font-black text-xs uppercase tracking-wide max-w-full text-left shadow-[4px_4px_0_0_#16181d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer transition-all"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{votePledged ? 'Compromisso Confirmado (25 e 26/11)' : 'Firmar Compromisso de Voto (25 e 26/11)'}</span>
              </button>
              <button
                type="button"
                onClick={() => downloadPresetIcs('eleicoes-cagp-2026')}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5B2A85] hover:bg-[#4A216E] text-white border-3 border-[#16181d] font-heading font-black text-xs uppercase tracking-wide max-w-full text-left shadow-[4px_4px_0_0_#16181d] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer transition-all"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Salvar Votação 25 e 26/11 na Agenda (.ICS)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="cagp-photo-frame relative aspect-[4/5] min-h-[260px] w-full rounded-xl border-3 border-[#16181d] shadow-[8px_8px_0_0_#16181d] overflow-hidden bg-[#5B2A85]">
              <img
                src={asset('/imagens/semente/post_01_propostas_david.jpg')}
                alt="Propostas da Chapa Semente — Germinar o CAGP"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#FE8812] text-[#16181d] font-mono text-xs font-black uppercase border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d]">
                14 Propostas Auditáveis
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. FILTROS POR EIXO (4 EIXOS) E BUSCA */}
      <div id="propostas-grid" className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            <ButtonGroup orientation="horizontal" className="rounded-xl overflow-hidden border-3 border-[#16181d] shadow-sm">
              <Button
                type="button"
                size="sm"
                variant={selectedEixo === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedEixo('all')}
                className={`min-h-[44px] rounded-none border-none text-xs font-head uppercase font-bold ${selectedEixo === 'all' ? 'bg-primary text-white font-extrabold' : ''}`}
              >
                Todas (14)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedEixo === 1 ? 'default' : 'outline'}
                onClick={() => setSelectedEixo(1)}
                className={`min-h-[44px] rounded-none border-none text-xs font-head uppercase font-bold ${selectedEixo === 1 ? 'bg-primary text-white font-extrabold' : ''}`}
              >
                Eixo 1: Gestão (6)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedEixo === 2 ? 'default' : 'outline'}
                onClick={() => setSelectedEixo(2)}
                className={`min-h-[44px] rounded-none border-none text-xs font-head uppercase font-bold ${selectedEixo === 2 ? 'bg-accent text-foreground font-extrabold' : ''}`}
              >
                Eixo 2: Cultura (2)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedEixo === 3 ? 'default' : 'outline'}
                onClick={() => setSelectedEixo(3)}
                className={`min-h-[44px] rounded-none border-none text-xs font-head uppercase font-bold ${selectedEixo === 3 ? 'bg-teal-700 text-white font-extrabold' : ''}`}
              >
                Eixo 3: Carreira (3)
              </Button>
              <Button
                type="button"
                size="sm"
                variant={selectedEixo === 4 ? 'default' : 'outline'}
                onClick={() => setSelectedEixo(4)}
                className={`min-h-[44px] rounded-none border-none text-xs font-head uppercase font-bold ${selectedEixo === 4 ? 'bg-secondary text-white font-extrabold' : ''}`}
              >
                Eixo 4: Comunicação (3)
              </Button>
            </ButtonGroup>
          </div>

          <div className="w-full sm:w-72">
            <Input
              type="search"
              placeholder="Buscar nas 14 propostas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs min-h-[44px] border-3 border-[#16181d]"
            />
          </div>
        </div>
      </div>

      {/* 3. GRID DE PROPOSTAS COM ANIMATEPRESENCE (TRANSIÇÃO ELÁSTICA SEM REDUÇÃO DE MOVIMENTO) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPropostas.map((item) => {
            const isExpanded = expandedId === item.id;
            const isProposta3 = item.id === 3;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={tactileSpring}
                id={`proposta-${item.id}`}
              >
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <div className="h-full">
                      <NeobrutalistMotionCard
                        className={`h-full border-3 border-[#16181d] transition-all flex flex-col justify-between cursor-context-menu overflow-hidden ${
                          isProposta3
                            ? 'bg-[#FFFDF5] shadow-[6px_6px_0_0_#FE8812] ring-2 ring-[#FE8812]'
                            : 'bg-card shadow-[4px_4px_0_0_#16181d] hover:shadow-[6px_6px_0_0_#16181d]'
                        }`}
                      >
                        <CardHeader className="p-4 pb-2 space-y-2">
                          {isProposta3 && (
                            <div className="flex items-center justify-between gap-2 pb-1">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FE8812] text-[#16181d] border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] font-mono text-xs font-black uppercase -rotate-1">
                                <Sparkles className="w-3 h-3" />
                                ESTE SUPERAPP JÁ MATERIALIZADO • ENTREGUE!
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-7 h-7 rounded-lg text-white flex items-center justify-center font-heading font-black text-xs border-2 border-[#16181d] shadow-xs"
                                style={{ backgroundColor: item.eixoColor }}
                              >
                                {item.id}
                              </span>
                              <Badge variant="outline" className="border-2 border-[#16181d] text-xs font-bold">
                                {item.eixoName}
                              </Badge>
                            </div>
                            <span className="font-mono text-xs font-bold text-muted-foreground uppercase">
                              {item.eixoBadge}
                            </span>
                          </div>
                          <CardTitle className="font-heading text-base font-black text-foreground leading-snug">
                            {item.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-sans text-content-secondary leading-relaxed m-0">
                              {item.summary}
                            </p>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={tactileSpring}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-3 p-3 rounded-lg bg-white border-2 border-[#16181d] text-xs font-sans text-foreground leading-relaxed shadow-xs space-y-2">
                                    <strong>Texto Integral da Carta-Programa:</strong>
                                    <p className="mt-1 m-0">{item.fullText}</p>
                                    {isProposta3 && (
                                      <div className="pt-2 border-t border-[#16181d]/20 flex flex-wrap gap-2">
                                        <button
                                          type="button"
                                          onClick={handlePledgeVote}
                                          className="min-h-[40px] px-3 py-1.5 rounded-lg bg-[#FE8812] text-[#16181d] border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] font-heading font-black text-xs uppercase cursor-pointer"
                                        >
                                          Votar Chapa Semente em 25 e 26/11 →
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-border">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-[#ffffff] border border-border text-xs font-mono font-semibold text-foreground"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <button
                                type="button"
                                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                className="min-h-[36px] text-xs font-heading font-extrabold uppercase text-primary hover:underline cursor-pointer bg-transparent border-none p-0"
                              >
                                {isExpanded ? '▲ Recolher detalhes' : '▼ Ver texto integral'}
                              </button>
                              <span className="text-xs font-mono text-muted-foreground">
                                Proposta {item.id}/14
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </NeobrutalistMotionCard>
                    </div>
                  </ContextMenuTrigger>

                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                      <CagpIcon name="file-text" className="w-4 h-4 mr-2" />
                      {isExpanded ? 'Recolher Detalhes' : 'Ver Texto Integral'}
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => {
                      const shareText = `Proposta ${item.id} Chapa Semente: ${item.title}\n\n${item.summary}\n\nConheça no Super App: ${window.location.href}`;
                      navigator.clipboard.writeText(shareText);
                      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(15);
                      (window as any).cagpToast?.(`Proposta ${item.id} copiada para divulgação!`, 'bi-clipboard-check');
                    }}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Texto para Compartilhar
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => {
                      const url = `${window.location.origin}/chapa-semente#proposta-${item.id}`;
                      navigator.clipboard.writeText(url);
                      (window as any).cagpToast?.(`Link da Proposta ${item.id} copiado!`, 'bi-link-45deg');
                    }}>
                      <Link2 className="w-4 h-4 mr-2" />
                      Copiar Link Direto
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 4. SIMULAÇÃO DE CREDENCIAMENTO COM INPUT-OTP */}
      <div className="p-6 bg-card border-3 border-border rounded-xl shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-head uppercase font-bold text-accent tracking-wider block">
              Participação Estudantil Direta
            </span>
            <h3 className="font-head text-base font-black text-foreground m-0">
              Credenciamento Eleitoral &amp; Token de Assembleia
            </h3>
            <p className="text-xs text-muted-foreground m-0 font-sans max-w-xl">
              Digite seu token de 4 dígitos para assinar simbolicamente o compromisso com as propostas da Chapa Semente e atas oficiais do CAGP.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-center">
            <InputOTP maxLength={4} value={otpCode} onChange={setOtpCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            {otpCode.length === 4 && (
              <span className="text-xs font-mono font-bold px-2.5 py-1.5 bg-teal-700 text-white rounded-lg border-2 border-border shadow-xs">
                Válido
              </span>
            )}
          </div>
        </div>
      </div>

      {filteredPropostas.length === 0 && (
        <div className="p-8 text-center rounded-xl border-3 border-[#16181d] bg-white">
          <p className="font-heading text-base font-bold uppercase text-[#16181d]">
            Nenhuma proposta encontrada para o filtro selecionado.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedEixo('all');
              setSearchQuery('');
            }}
            className="mt-3"
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};
