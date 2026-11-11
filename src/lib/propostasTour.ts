// src/lib/propostasTour.ts — Roteiro do tour opcional das 14 propostas (decisão de 10/11/2026).
// Cada proposta da Carta-Programa (CartaPropostaInteractive › CARTA_PROPOSTAS_DATA) é ligada à diretoria
// que a puxa e a uma fala dessa diretoria. As falas são trechos literais de
// _referencias/briefing_do_site.md; nada aqui foi inventado. `art` escolhe a animação vetorial da tela.
import type { TourLeaderId } from '@/lib/sementeTour';

export type PropostaArt =
  | 'contas' | 'reunioes' | 'site' | 'cnpj' | 'seguranca' | 'patrimonio' | 'calouros'
  | 'entidades' | 'eventos' | 'cursos' | 'empresa' | 'comunicacao' | 'produtos' | 'escuta';

export interface PropostaStop {
  /** id da proposta na Carta-Programa (1 a 14). */
  id: number;
  /** Título curto, na língua do estudante. */
  titulo: string;
  /** O compromisso em uma frase (resumo fiel do texto da carta). */
  compromisso: string;
  leaderId: TourLeaderId;
  /** Trecho literal do briefing da diretoria. */
  fala: string;
  art: PropostaArt;
  /** Onde o site já mostra essa proposta em ação (ou o modelo dela). */
  prova?: { label: string; href: string; simulado?: boolean };
}

/** Os 4 eixos da carta viram os 4 estágios da planta, cada um com seu bloco de cor. */
export const PROPOSTA_EIXOS = [
  { id: 1, nome: 'Transparência e gestão', estagio: 'Raiz', bg: '#8A4B2A', fg: '#FFFFFF', tinta: '#FE8812' },
  { id: 2, nome: 'Cultura e bem viver', estagio: 'Broto', bg: '#6DB33F', fg: '#1F1F1F', tinta: '#5B2A85' },
  { id: 3, nome: 'Acadêmico, carreira e formação política', estagio: 'Planta', bg: '#266264', fg: '#FFFFFF', tinta: '#FE8812' },
  { id: 4, nome: 'Comunicação, institucional e arrecadação', estagio: 'Fruto', bg: '#FFC83D', fg: '#1F1F1F', tinta: '#5B2A85' },
] as const;

export const PROPOSTA_STOPS: PropostaStop[] = [
  {
    id: 1,
    titulo: 'Prestação de contas a cada três meses',
    compromisso: 'Um boletim trimestral com todas as entradas, saídas e aplicações do caixa do CA.',
    leaderId: 'vitoria',
    fala: 'Transparência ativa: cada entrada e saída do caixa acessível em tempo real.',
    art: 'contas',
    prova: { label: 'Ver o modelo do portal', href: '/transparencia', simulado: true },
  },
  {
    id: 2,
    titulo: 'Reunião aberta todo mês',
    compromisso: 'Reuniões mensais da gestão, com encontros abertos a todos os alunos e decisões publicadas.',
    leaderId: 'larissa',
    fala: 'Informação não é privilégio de grupo de amigos; é direito de todo estudante.',
    art: 'reunioes',
  },
  {
    id: 3,
    titulo: 'O site do curso',
    compromisso: 'Ideia nossa, construída há muito tempo: informação da UFMG e do curso num lugar só, com portal de transparência.',
    leaderId: 'gabriel',
    fala: 'Menos improviso de diretoria, mais legado para os estudantes.',
    art: 'site',
    prova: { label: 'Abrir os guias', href: '/guias' },
  },
  {
    id: 4,
    titulo: 'CNPJ para o CAGP',
    compromisso: 'Formalizar o centro acadêmico como associação civil sem fins lucrativos, como manda o regimento.',
    leaderId: 'lara',
    fala: 'Os direitos e trâmites do curso explicados para quem não tem tempo a perder.',
    art: 'cnpj',
  },
  {
    id: 5,
    titulo: 'Segurança na sala do CA',
    compromisso: 'Estudar com DCE, DA e FAFICH medidas contra furtos e a instalação de escaninhos para estudantes.',
    leaderId: 'larissa',
    fala: 'A gestão existe para servir a todas as salas.',
    art: 'seguranca',
  },
  {
    id: 6,
    titulo: 'Você vota no que o CA reforma',
    compromisso: 'Nas reuniões abertas, os estudantes decidem o que revitalizar ou comprar, dentro do que o caixa permite.',
    leaderId: 'vitoria',
    fala: 'Não aceitamos caixas com prestações de contas vagas ou saldo parado sem uso.',
    art: 'patrimonio',
  },
  {
    id: 7,
    titulo: 'Recepção de calouros de verdade',
    compromisso: 'Uma nova cultura de acolhimento e eventos de integração, com parcerias dentro da UFMG.',
    leaderId: 'paloma',
    fala: 'Cultura e integração no horário de quem trabalha.',
    art: 'calouros',
    prova: { label: 'Abrir o guia do calouro', href: '/calouros' },
  },
  {
    id: 8,
    titulo: 'Diálogo com o movimento estudantil',
    compromisso: 'Conversa constante com as outras entidades, sem alinhamento ideológico, para agir rápido nas pautas comuns.',
    leaderId: 'italo',
    fala: 'Centro Acadêmico articulado, transparente e combativo.',
    art: 'entidades',
  },
  {
    id: 9,
    titulo: 'Eventos com quem faz gestão pública',
    compromisso: 'Parcerias com órgãos públicos, extensão, OSCs e egressos para palestras e rodas de conversa.',
    leaderId: 'mariana',
    fala: 'Oportunidade que você não vê é oportunidade perdida.',
    art: 'eventos',
  },
  {
    id: 10,
    titulo: 'Cursos livres abertos à comunidade',
    compromisso: 'Cursos curtos em temas transversais, com destaque para a ciência política.',
    leaderId: 'italo',
    fala: 'Independência política com eficiência técnica: debate e formação ao alcance de todos.',
    art: 'cursos',
  },
  {
    id: 11,
    titulo: 'Apoio à empresa júnior',
    compromisso: 'Apoio amplo à estruturação da empresa júnior de Gestão Pública, dentro dos limites do CA.',
    leaderId: 'livia',
    fala: "É 'old' que a gente merece um curso descomplicado: manual prático e currículo a um clique.",
    art: 'empresa',
  },
  {
    id: 12,
    titulo: 'Comunicação que informa',
    compromisso: 'Estágios, concursos, bolsas, pesquisa e extensão divulgados o tempo todo, com calendário do curso.',
    leaderId: 'joao',
    fala: 'Menos ruído, mais seriedade: o portal oficial do estudante de Gestão Pública.',
    art: 'comunicacao',
    prova: { label: 'Ver o modelo do mural', href: '/noticias', simulado: true },
  },
  {
    id: 13,
    titulo: 'Produtos do CAGP',
    compromisso: 'Camisetas, canecas, ecobags e adesivos escolhidos com os estudantes, sob demanda e a preço acessível.',
    leaderId: 'vitoria',
    fala: 'O estudante trabalhador e o fumpista sustentam a universidade no dia a dia e precisam de retorno concreto.',
    art: 'produtos',
  },
  {
    id: 14,
    titulo: 'Canal permanente de escuta',
    compromisso: 'Canais fixos para dúvidas, demandas e sugestões, com retorno público do que foi encaminhado.',
    leaderId: 'joao',
    fala: 'Sua voz vira pauta: canal permanente de escuta discente integrado ao site.',
    art: 'escuta',
    prova: { label: 'Abrir a ouvidoria', href: '/ouvidoria' },
  },
];

export const START_PROPOSTAS_TOUR = 'cagp:start-propostas-tour';
