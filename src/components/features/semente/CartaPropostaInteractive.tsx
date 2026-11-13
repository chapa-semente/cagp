import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NeobrutalistMotionCard } from '@/components/ui/neobrutalist-motion-card';
import { tactileSpring } from '@/lib/motion';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Copy, Link2 } from '@/components/ui/icons';
import { useMasonryColumns } from '@/components/ui/expand';
import { route } from '@/lib/paths';
import { montarMensagem, urlAbsoluta } from '@/lib/compartilhar';
import { PROPOSTA_STOPS } from '@/lib/propostasTour';

// O adesivo de cada cartão vem do tour (`jaFeito.selo`): uma fonte só para "o que já foi feito".
const SELO_DA_PROPOSTA = new Map(PROPOSTA_STOPS.map((p) => [p.id, p.jaFeito?.selo]));

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
    fullText: 'A Gestão se compromete com a publicação trimestral de boletins detalhando todas as movimentações financeiras (entradas, saídas, aplicações, etc) do caixa da Entidade. O portal da transparência já está estruturado, com as informações publicadas na hora, a cada lançamento.',
    tags: ['Finanças', 'Transparência', 'Boletim'],
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
    title: 'Site do Curso de Gestão Pública (já no ar)',
    summary: 'O site do curso é ideia nossa, construído pela chapa há muito tempo. Já está no ar e pertence ao curso.',
    fullText: 'A Chapa Semente idealizou e construiu o site do curso de Gestão Pública, um projeto nosso, pensado e desenvolvido há muito tempo, que já está no ar e pertence ao curso, não a um mandato: o site vai continuar funcionando, porque não depende de mandato. Neste site se concentram informações sobre a Universidade (questões relativas à vivência universitária) e sobre o Curso de Gestão Pública, além de um portal de transparência para publicação das decisões das reuniões e dos boletins de prestação de contas, na hora, a cada lançamento.',
    tags: ['Compromisso Público', 'Plataforma Digital', 'Super App', 'Feito pela Chapa'],
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
    summary: 'Cursos curtos e abertos à comunidade, em temas transversais, com destaque para a ciência política.',
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
    eixoColor: '#A85300',
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
    eixoColor: '#A85300',
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
    eixoColor: '#A85300',
    title: 'Canais Permanentes de Escuta e Acolhimento',
    summary: 'Canais abertos para acolher dúvidas, demandas e sugestões, incentivando a participação nas decisões.',
    fullText: 'A Gestão irá se comprometer com a criação de canais permanentes de escuta e diálogo para o acolhimento contínuo de dúvidas, demandas e sugestões discentes. Além disso, a entidade garantirá a ampla transparência mediante a divulgação periódica das iniciativas vigentes e dos encaminhamentos institucionais, associada à elaboração de materiais informativos para esclarecer a estrutura da representação discente e incentivar a participação popular nas deliberações universitárias.',
    tags: ['Ouvidoria Discente', 'Escuta Ativa', 'Acolhimento', 'Controle Social'],
  },
];

const countEixo = (id: number) => CARTA_PROPOSTAS_DATA.filter((p) => p.eixoId === id).length;
const EIXO_FILTERS: { id: number | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'Todas', count: CARTA_PROPOSTAS_DATA.length },
  { id: 1, label: 'Transparência e gestão', count: countEixo(1) },
  { id: 2, label: 'Cultura e bem viver', count: countEixo(2) },
  { id: 3, label: 'Acadêmico e carreira', count: countEixo(3) },
  { id: 4, label: 'Comunicação', count: countEixo(4) },
];

export const CartaPropostaInteractive: React.FC = () => {
  const [selectedEixo, setSelectedEixo] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const propostasGridRef = useMasonryColumns<HTMLDivElement>();
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
      {/* 2. FILTROS POR EIXO (4 EIXOS) E BUSCA */}
      <div id="propostas-grid" className="space-y-3">
        <div className="flex flex-col-reverse gap-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por eixo">
            {EIXO_FILTERS.map((f) => {
              const active = selectedEixo === f.id;
              return (
                <button
                  key={String(f.id)}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedEixo(f.id)}
                  className={`min-h-[44px] px-3 rounded-lg border-2 border-border text-sm font-bold transition-all cursor-pointer ${
                    active ? 'bg-primary text-white shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-white text-foreground shadow-sm hover:bg-muted'
                  }`}
                >
                  {f.label} <span className="tabular-nums">({f.count})</span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:max-w-sm">
            <Input
              type="search"
              placeholder="Buscar nas 14 propostas"
              aria-label="Buscar nas 14 propostas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-base min-h-[48px] border-3 border-border"
            />
          </div>
        </div>
      </div>

      {/* 3. GRID DE PROPOSTAS COM ANIMATEPRESENCE (TRANSIÇÃO ELÁSTICA SEM REDUÇÃO DE MOVIMENTO) */}
      <motion.div ref={propostasGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* A carta fica aberta na página (13/11/2026): os cartões já nascem visíveis, sem esperar o JS. */}
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredPropostas.map((item) => {
            const isProposta3 = item.id === 3;
            const selo = isProposta3 ? 'Já entregue: é este site' : SELO_DA_PROPOSTA.get(item.id);
            return (
              <motion.div
                key={item.id}
                layout="position"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={tactileSpring}
                id={`proposta-${item.id}`}
              >
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <div>
                      <NeobrutalistMotionCard
                        className={`border-3 border-border transition-all flex flex-col justify-between cursor-context-menu overflow-hidden ${
                          isProposta3
                            ? 'bg-background shadow-[6px_6px_0_0_#FE8812] ring-2 ring-accent'
                            : 'bg-card shadow-md hover:shadow-xl'
                        }`}
                      >
                        <CardHeader className="p-4 pb-2 space-y-2">
                          {selo && (
                            <div className="flex items-center justify-between gap-2 pb-1">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent text-foreground border-2 border-border shadow-sm text-xs font-bold uppercase tracking-[0.04em] -rotate-1">
                                {selo}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm tabular-nums border-2 border-border"
                                style={{ backgroundColor: item.eixoColor, color: item.eixoColor === '#FE8812' ? '#1F1F1F' : '#FFFFFF' }}
                              >
                                {item.id}
                              </span>
                              <Badge variant="outline" className="border-2 border-border text-xs font-bold bg-white">
                                {item.eixoName}
                              </Badge>
                            </div>
                          </div>
                          <CardTitle className="font-heading text-lg font-bold text-foreground leading-snug">
                            {item.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <p className="text-base font-sans font-bold text-foreground leading-snug m-0">
                              {item.summary}
                            </p>
                            {/* O texto inteiro da carta fica à vista: nada de "ler mais" (13/11/2026). */}
                            <div className="font-sans space-y-1">
                              <p className="m-0 font-heading text-sm font-bold text-foreground">Na carta-programa</p>
                              <p className="m-0 text-base text-content-secondary leading-relaxed [text-wrap:pretty]">{item.fullText}</p>
                            </div>
                          </div>

                          <div className="border-t-2 border-border/15">
                            <a
                              href={route(`/propostas/${item.id}`)}
                              className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-bold text-primary underline underline-offset-[0.22em]"
                              aria-label={`Abrir e compartilhar a proposta ${item.id}`}
                            >
                              Abrir e mandar
                              <i className="bi bi-arrow-right" aria-hidden="true" />
                            </a>
                          </div>
                        </CardContent>
                      </NeobrutalistMotionCard>
                    </div>
                  </ContextMenuTrigger>

                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => {
                      const shareText = montarMensagem({
                        corpo: `🌱 *Proposta ${item.id} da Chapa 2 · Semente: ${item.title}*\n${item.summary}`,
                        url: urlAbsoluta(route(`/propostas/${item.id}`)),
                        tom: 'convite',
                      });
                      navigator.clipboard.writeText(shareText);
                      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(15);
                      (window as any).cagpToast?.(`Proposta ${item.id} copiada para divulgação!`, 'bi-clipboard-check');
                    }}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Texto para Compartilhar
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => {
                      const url = urlAbsoluta(route(`/propostas/${item.id}`));
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

      {filteredPropostas.length === 0 && (
        <div className="p-8 text-center rounded-xl border-2 border-border bg-white">
          <p className="font-heading text-base font-bold uppercase text-foreground">
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
