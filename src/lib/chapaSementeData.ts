// src/lib/chapaSementeData.ts — Os 12 integrantes da Chapa Semente
// Baseado estritamente em _referencias/documentos-oficiais/briefing_do_site.md

import { asset, route } from '@/lib/paths';

export interface LeaderInfo {
  id: string;
  name: string;
  role: string;
  tagline: string;
  /** Fala do próprio integrante. Ausente quando ainda não temos a fala dele. */
  quote?: string;
  painPoint: string;
  solution: string;
  photoFilename?: string;
  /** Ponto focal do retrato (CSS object-position). Padrão: 'center 30%'. */
  photoPosition?: string;
  initials: string;
  deptColor: string;
  badgeBg: string;
  toolLabel: string;
  toolHref: string;
  targetId: string;
}

/** Número da Semente na eleição do CAGP 2026 (divulgado em 11/11/2026). */
export const CHAPA_NUMERO = 2;
/** Como se pede o voto: "Chapa 2". */
export const CHAPA_ROTULO = `Chapa ${CHAPA_NUMERO}`;
/** Nome completo para títulos e rótulos: "Chapa 2 · Semente". */
export const CHAPA_NOME = `${CHAPA_ROTULO} · Semente`;

export const CHAPA_LEADERS: LeaderInfo[] = [
  {
    id: 'gabriel',
    name: 'Gabriel Sathler',
    role: 'Presidente',
    tagline: 'Criador e Programador do Super App',
    quote:
      'Centro Acadêmico não pode ser terra arrasada a cada troca de mandato. O Super App é a garantia de que as informações do curso pertencem a todos os estudantes, e não a uma diretoria. A ideia é nossa, e a gente constrói isso há muito tempo.',
    painPoint:
      'A cada eleição o centro acadêmico perde histórico, arquivos e contatos, deixando os estudantes reféns do improviso da gestão vigente.',
    solution:
      'Infraestrutura perene, pensada e construída pela chapa, com alimentação simples em Markdown para o curso de Gestão Pública.',
    photoFilename: 'Gabriel Sathler.jpg',
    initials: 'GS',
    deptColor: 'bg-purple-600 text-white border-purple-800',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    toolLabel: 'Ver o guia do site',
    toolHref: route('/transparencia'),
    targetId: 'cagp-home-banner-semente',
  },
  {
    id: 'larissa',
    name: 'Larissa Prado',
    role: 'Vice-Presidente',
    tagline: 'Acolhimento Discente & Ouvidoria Permanente',
    quote:
      'Chegar a uma universidade imensa sem saber para onde correr gera angústia real. O Centro Acadêmico não pode funcionar como uma panelinha que só conversa entre si. A gestão existe para servir a todas as salas.',
    painPoint:
      'O desamparo de quem vem de fora ou ingressa sem conhecer ninguém, deparando-se com um centro acadêmico fechado em círculos de amizade.',
    solution:
      'Hub de acolhimento estudantil, mapas do campus, guia de recepção de calouros e canal de ouvidoria permanente ("Reclame Aqui GP").',
    photoFilename: 'Larissa Prado.png',
    initials: 'LP',
    deptColor: 'bg-amber-700 text-white border-amber-900',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    toolLabel: 'Falar com o CA',
    toolHref: route('/ouvidoria'),
    targetId: 'cagp-shortcut-ouvidoria',
  },
  {
    id: 'livia',
    name: 'Lívia Martins',
    role: 'Assessora da Presidência',
    tagline: 'Idealizadora do Manual "Como se Formar" & Diretora de Arte',
    quote:
      'É "old" que o curso tem potencial, mas é evidente também que o estudante se perde diante de portais confusos. Chega de poluição visual: manual prático e currículo a um clique.',
    painPoint:
      'Sobrecarga cognitiva e formato inacessível do portal da universidade, somados ao isolamento profissional de quem não sabe como validar estágios ou se formar.',
    solution:
      'Manual prático descomplicado, estilo neobrutalista moderno e banco de currículos integrado para inserção profissional discente.',
    photoFilename: 'Livia Martins.jpeg',
    photoPosition: 'center 22%',
    initials: 'LM',
    deptColor: 'bg-emerald-600 text-white border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    toolLabel: 'Ver carreira e vagas',
    toolHref: route('/carreira'),
    targetId: 'cagp-shortcut-carreira',
  },
  {
    id: 'mariana',
    name: 'Mariana Presti',
    role: 'Diretora Acadêmica',
    tagline: 'Pesquisa Aberta & 11 Núcleos do DCP',
    quote:
      'Planilhas abandonadas no Drive não formam pesquisadores. Oportunidade que você não vê é oportunidade perdida: seu currículo e suas bolsas começam abertas no site.',
    painPoint:
      'O confinamento da pesquisa acadêmica e a dependência de planilhas de Drive esquecidas para achar editais e grupos de pesquisa.',
    solution:
      'Centralização aberta de todos os 11 núcleos do DCP, laboratórios de pesquisa e oportunidades de bolsas de iniciação científica (PIBIC) em tempo real.',
    photoFilename: 'MarianaPresti.jpeg',
    initials: 'MP',
    deptColor: 'bg-blue-600 text-white border-blue-800',
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    toolLabel: 'Ver os núcleos de pesquisa',
    toolHref: route('/pesquisa'),
    targetId: 'cagp-shortcut-pesquisa',
  },
  {
    id: 'nilo',
    name: 'Nilo Neto',
    role: 'Vice-Diretor Acadêmico',
    tagline: 'Iniciação Científica & Fortalecimento Acadêmico',
    quote:
      'A formação acadêmica em Gestão Pública se consolida na ponte entre a teoria de sala de aula e a prática da pesquisa. Nosso papel é aproximar o estudante de todas as portas que a universidade oferece.',
    painPoint:
      'Desconhecimento dos caminhos para ingressar na iniciação científica e falta de suporte para novos pesquisadores no curso.',
    solution:
      'Mapeamento de grupos de pesquisa, editais de fomento científico e apoio aos percursos acadêmicos dos discentes.',
    photoFilename: 'Nilo Neto.png',
    initials: 'NN',
    deptColor: 'bg-sky-700 text-white border-sky-900',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    toolLabel: 'Ver os núcleos de pesquisa',
    toolHref: route('/pesquisa'),
    targetId: 'cagp-shortcut-pesquisa',
  },
  {
    id: 'joao',
    name: 'João Pedro Fragoso',
    role: 'Diretor de Marketing e Comunicação',
    tagline: 'Seriedade Institucional & Escuta de Ementas',
    quote:
      'Comunicação de Centro Acadêmico é muito mais do que postar convite de festa no Instagram. Gestão Pública pede profundidade, seriedade e diálogo. Sua voz vira pauta.',
    painPoint:
      'Uma comunicação superficial restrita a cobrir eventos de festa, sem espaço para acolhimento de denúncias ou divulgação científica.',
    solution:
      'Portal oficial de notícias, canal de escuta para reportar disciplinas com ementas defasadas diretamente ao Colegiado e vídeos demonstrativos.',
    photoFilename: 'João Pedro Fragoso.jpg',
    initials: 'JF',
    deptColor: 'bg-rose-700 text-white border-rose-900',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    toolLabel: 'Ver o mural',
    toolHref: route('/noticias'),
    targetId: 'cagp-home-news-feed',
  },
  {
    id: 'vitoria',
    name: 'Vitória Moraes',
    role: 'Diretora Financeira',
    tagline: 'Transparência Centavo a Centavo & Tutoriais FUMP',
    quote:
      'O estudante trabalhador e o fumpista sustentam a universidade no dia a dia e precisam de retorno concreto. Não aceitamos caixas opacos ou saldo parado sem uso.',
    painPoint:
      'Caixas opacos com movimentações obscuras e falta de orientação prática para obtenção de auxílios socioeconômicos da assistência estudantil.',
    solution:
      'Portal da Transparência em tempo real centavo a centavo e tutoriais passo a passo para requerimento de benefícios da FUMP e estágio.',
    photoFilename: 'Vitoria.png',
    initials: 'VM',
    deptColor: 'bg-emerald-700 text-white border-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    toolLabel: 'Ver a transparência',
    toolHref: route('/transparencia'),
    targetId: 'cagp-shortcut-transparencia',
  },
  {
    id: 'klaus',
    name: 'Klaus',
    role: 'Vice-Diretor Financeiro',
    tagline: 'Caixa Aberto & Prestação de Contas',
    painPoint:
      'Saldo parado e movimentações que ninguém consegue acompanhar deixam o estudante sem saber o que o centro acadêmico faz com o dinheiro da turma.',
    solution:
      'Modelo do Portal da Transparência (hoje com lançamentos de exemplo): o livro-caixa do CAGP aberto lançamento a lançamento, para qualquer estudante conferir.',
    photoFilename: 'Klaus.jpg',
    photoPosition: 'center 30%',
    initials: 'K',
    deptColor: 'bg-emerald-700 text-white border-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    toolLabel: 'Ver a transparência',
    toolHref: route('/transparencia'),
    targetId: 'cagp-member-klaus',
  },
  {
    id: 'italo',
    name: 'Ítalo de Morais',
    role: 'Diretor de Articulação e Assuntos Políticos',
    tagline: 'Autonomia Política, Eficiência & Cursos Livres',
    quote:
      'Autonomia e articulação começam na capacidade de resolver os problemas do curso sem gastar rios de dinheiro com terceiros. Debate e formação ao alcance de todos.',
    painPoint:
      'O isolamento institucional do CA, a falta de formação crítica ampla e o desperdício de recursos contratando terceiros para serviços básicos.',
    solution:
      'Solução de hospedagem técnica em cooperação discente, divulgação aberta de cursos livres de ciência política e defesa da independência do CA.',
    photoFilename: 'Italo.jpeg',
    photoPosition: 'center 45%',
    initials: 'IM',
    deptColor: 'bg-cyan-700 text-white border-cyan-900',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    toolLabel: 'Ver cursos que contam horas',
    toolHref: route('/cursos'),
    targetId: 'cagp-shortcut-cursos',
  },
  {
    id: 'lara',
    name: 'Lara Soares',
    role: 'Diretora Jurídica',
    tagline: 'Estágio sem Travas & Segurança Burocrática',
    quote:
      'Poucas coisas causam tanto estresse na graduação quanto conseguir uma vaga de estágio e ver o contrato parado sem saber a quem recorrer. O caminho formal está esquematizado.',
    painPoint:
      'A insegurança e o desgaste burocrático de perder estágios ou ter contratos travados por desconhecimento das regras institucionais da UFMG.',
    solution:
      'Roteiro de preenchimento de Termos de Compromisso de Estágio (TCE), minutas para download e instruções claras para dispensa do Artigo 41.',
    photoFilename: 'Lara.png',
    initials: 'LS',
    deptColor: 'bg-indigo-700 text-white border-indigo-900',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    toolLabel: 'Ver o guia de estágio',
    toolHref: route('/estagio') + '#art41',
    targetId: 'cagp-shortcut-estagio',
  },
  {
    id: 'paloma',
    name: 'Paloma Correia',
    role: 'Diretora de Cultura',
    tagline: 'Voz do Turno Noturno & Integração na FAFICH',
    quote:
      'Gestão Pública é um curso noturno, feito por quem trabalha o dia inteiro e não pode comparecer a eventos às duas da tarde. Nossa cultura universitária respeita o tempo do aluno trabalhador.',
    painPoint:
      'Atividades de convivência marcadas em horários incompatíveis com o turno da noite e falta de acolhimento nos espaços da universidade.',
    solution:
      'Calendário cultural planejado para o período noturno, integração permanente e defesa das linhas do Circular 22:30.',
    photoFilename: 'Paloma.jpeg',
    photoPosition: 'center 28%',
    initials: 'PC',
    deptColor: 'bg-orange-700 text-white border-orange-900',
    badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
    toolLabel: 'Ver FUMP e vida no noturno',
    toolHref: route('/permanencia'),
    targetId: 'cagp-shortcut-permanencia',
  },
  {
    id: 'alice',
    name: 'Alice Maurício',
    role: 'Vice-Diretora de Cultura',
    tagline: 'Acolhimento de Calouros & Tutoriais Ingressantes',
    quote:
      'Como caloura, sei o quanto é desafiador chegar à UFMG sem saber por onde começar. Os tutoriais e o acolhimento do CAGP precisam falar a língua de quem acabou de ingressar.',
    painPoint:
      'Calouros e ingressantes sem referências sobre os espaços da universidade, trâmites e vida estudantil.',
    solution:
      'Tutoriais descomplicados e validados por quem acabou de ingressar, cronograma cultural antecipado e apoio de recepção discente.',
    photoFilename: 'Alice.png',
    initials: 'AM',
    deptColor: 'bg-amber-600 text-white border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    toolLabel: 'Ver o guia do calouro',
    toolHref: route('/'),
    targetId: 'cagp-shortcut-permanencia',
  },
];

function leaderById(id: string): LeaderInfo {
  const found = CHAPA_LEADERS.find((l) => l.id === id);
  if (!found) throw new Error(`Integrante desconhecido: ${id}`);
  return found;
}

const AVAILABLE_LEADER_PHOTOS = new Set([
  'Gabriel Sathler.jpg',
  'Livia Martins.jpeg',
  'Larissa Prado.png',
  'MarianaPresti.jpeg',
  'Nilo Neto.png',
  'João Pedro Fragoso.jpg',
  'Vitoria.png',
  'Italo.jpeg',
  'Lara.png',
  'Paloma.jpeg',
  'Klaus.jpg',
  'Alice.png',
]);

/**
 * Retrato do integrante já reduzido (webp de 640px, ou miniatura de 220px para avatares).
 * Os originais em /images/chapa/ chegam a 4 MB cada e não são mais servidos pelas páginas:
 * as versões leves ficam em /images/chapa/tour/<id>.webp (as mesmas do tour).
 */
export function getLeaderPhotoUrl(filename?: string, size: 'full' | 'thumb' = 'full'): string | null {
  if (!filename || !AVAILABLE_LEADER_PHOTOS.has(filename)) return null;
  const leader = CHAPA_LEADERS.find((l) => l.photoFilename === filename);
  if (!leader) return null;
  return asset(`/images/chapa/tour/${leader.id}${size === 'thumb' ? '-thumb' : ''}.webp`);
}

// O roteiro do tour da chapa vive em src/lib/sementeTour.ts.

export const CHAPA_SEMENTE_LEADERS = CHAPA_LEADERS;

