import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { resolveCagpIconName } from '@/lib/cagpIcons';

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
    eixoColor: '#5B2A86',
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
    eixoColor: '#5B2A86',
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
    eixoColor: '#5B2A86',
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
    eixoColor: '#5B2A86',
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
    eixoColor: '#5B2A86',
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
    eixoColor: '#5B2A86',
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
    eixoColor: '#FF8811',
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
    eixoColor: '#FF8811',
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
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
      {/* 1. COMPROMISSO INSTITUCIONAL DESTAQUE */}
      <Card className="border-3 border-[#16181d] bg-[#FFFDF9] shadow-[4px_4px_0_0_#5B2A86] p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-[#5B2A86] text-white font-mono text-[10px] uppercase">
                Compromisso Irrevogável • Proposta 3
              </Badge>
              <Badge variant="accent" className="bg-[#FF8811] text-[#16181d] font-bold text-[10px] uppercase">
                Eleições CAGP 2026
              </Badge>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#16181d] m-0">
              Site do Curso de Gestão Pública Disponível para Toda a Comunidade
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#16181d]/90 leading-relaxed max-w-3xl m-0">
              A <strong>Chapa Semente</strong> assume o compromisso solene de que este portal — com todas as ferramentas de percurso, calculadora de 600h, guia de estágio, acervo documental e transparência — <strong>será entregue integralmente à comunidade e à gestão eleita, independentemente do resultado das urnas</strong>.
            </p>
          </div>
          <a
            href="#propostas-grid"
            className="px-4 py-2.5 rounded-xl bg-[#5B2A86] hover:bg-[#4A216E] text-white border-2 border-[#16181d] font-heading font-black text-xs uppercase tracking-wide shrink-0 shadow-[2px_2px_0_0_#16181d] no-underline transition-all"
          >
            Explorar 14 Propostas ↓
          </a>
        </div>
      </Card>

      {/* 2. FILTROS E BUSCA */}
      <div id="propostas-grid" className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[3px_3px_0_0_#16181d] space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
            <Button
              type="button"
              size="sm"
              variant={selectedEixo === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedEixo('all')}
              className={selectedEixo === 'all' ? 'bg-[#5B2A86] text-white font-extrabold' : ''}
            >
              Todas (14)
            </Button>
            <Button
              type="button"
              size="sm"
              variant={selectedEixo === 1 ? 'default' : 'outline'}
              onClick={() => setSelectedEixo(1)}
              className={selectedEixo === 1 ? 'bg-[#5B2A86] text-white font-extrabold' : ''}
            >
              Eixo 1: Transparência
            </Button>
            <Button
              type="button"
              size="sm"
              variant={selectedEixo === 2 ? 'default' : 'outline'}
              onClick={() => setSelectedEixo(2)}
              className={selectedEixo === 2 ? 'bg-[#FF8811] text-[#16181d] font-extrabold' : ''}
            >
              Eixo 2: Cultura
            </Button>
            <Button
              type="button"
              size="sm"
              variant={selectedEixo === 3 ? 'default' : 'outline'}
              onClick={() => setSelectedEixo(3)}
              className={selectedEixo === 3 ? 'bg-[#266264] text-white font-extrabold' : ''}
            >
              Eixo 3: Carreiras
            </Button>
            <Button
              type="button"
              size="sm"
              variant={selectedEixo === 4 ? 'default' : 'outline'}
              onClick={() => setSelectedEixo(4)}
              className={selectedEixo === 4 ? 'bg-[#9E2424] text-white font-extrabold' : ''}
            >
              Eixo 4: Comunicação
            </Button>
          </div>

          <div className="w-full sm:w-72">
            <Input
              type="search"
              placeholder="Buscar nas 14 propostas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs h-10 border-2 border-[#16181d]"
            />
          </div>
        </div>
      </div>

      {/* 3. GRID DE PROPOSTAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPropostas.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <Card
              key={item.id}
              className="border-3 border-[#16181d] bg-white shadow-[3px_3px_0_0_#16181d] hover:shadow-[5px_5px_0_0_#16181d] transition-all flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg text-white flex items-center justify-center font-heading font-black text-xs border-2 border-[#16181d] shadow-[1px_1px_0_0_#16181d]"
                      style={{ backgroundColor: item.eixoColor }}
                    >
                      {item.id}
                    </span>
                    <Badge variant="outline" className="border-2 border-[#16181d] text-[10px] font-bold">
                      {item.eixoName}
                    </Badge>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
                    {item.eixoBadge}
                  </span>
                </div>
                <CardTitle className="font-heading text-base font-black uppercase text-[#16181d] leading-snug">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-sans text-[#16181d]/85 leading-relaxed m-0">
                    {item.summary}
                  </p>

                  {isExpanded && (
                    <div className="mt-3 p-3 rounded-lg bg-[#f4f5f7] border-2 border-[#16181d] text-xs font-sans text-[#16181d] leading-relaxed">
                      <strong>Texto Integral da Carta-Programa:</strong>
                      <p className="mt-1 m-0">{item.fullText}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FFFDF9] border border-[#16181d] text-[10px] font-mono font-semibold text-[#16181d]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="text-[11px] font-heading font-extrabold uppercase text-[#5B2A86] hover:underline cursor-pointer"
                    >
                      {isExpanded ? '▲ Recolher detalhes' : '▼ Ver texto integral'}
                    </button>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Proposta {item.id}/14
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
