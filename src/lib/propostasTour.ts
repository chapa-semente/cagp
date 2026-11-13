// src/lib/propostasTour.ts — Roteiro do tour opcional das 14 propostas (decisão de 10/11/2026).
// Cada proposta da Carta-Programa (CartaPropostaInteractive › CARTA_PROPOSTAS_DATA) é ligada à diretoria
// que a puxa e a um `porque`, texto da chapa (sem aspas) escrito a partir da carta, do briefing e das atas.
// Até 12/11/2026 era uma fala literal do briefing atribuída à diretoria. `art` escolhe o desenho da tela.
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
  /**
   * Por que a chapa defende a proposta, em uma ou duas frases. É texto da Semente, não fala de ninguém:
   * aparece sem aspas, ao lado de quem toca a proposta (decisão do Gabriel em 12/11/2026: não citar
   * literalmente; reformular a partir da carta, do briefing e das atas).
   */
  porque: string;
  art: PropostaArt;
  /**
   * O que a Semente já fez desta proposta antes da eleição (decisão do Gabriel em 13/11/2026: o tour
   * aponta o que já foi feito, e só isso; nada sobre outra chapa ou gestão). `selo` é o adesivo:
   * "Já no ar" quando a coisa existe no site e dá pra usar hoje; "Já começou" quando há trabalho feito
   * mas a entrega depende da gestão. Proposta sem `jaFeito` ainda não começou, e a tela diz isso.
   * Cada texto tem que ser conferível no site ou na seção "O que a Chapa Semente já fez" do relatório
   * em `_referencias/analise_gestao_reconecta/`; bagagem de integrante entra em forma coletiva, sem nome.
   */
  jaFeito?: { selo: PropostaSelo; texto: string };
  /** Onde o site já mostra essa proposta em ação (ou o modelo dela). */
  prova?: { label: string; href: string; simulado?: boolean };
}

export type PropostaSelo = 'Já no ar' | 'Já começou';

/** O que a tela diz quando a proposta ainda não tem nada feito. */
export const PROPOSTA_SEM_INICIO = 'Essa só dá pra começar de dentro do CA.';

/**
 * Os 4 eixos da carta viram os 4 estágios da planta. Desde 12/11/2026 (noite) o tour tem uma tela por
 * eixo: a cor do eixo aparece só no adesivo, e `gancho` é a dor do estudante que abre a tela.
 */
export const PROPOSTA_EIXOS = [
  { id: 1, nome: 'Transparência e gestão', estagio: 'Raiz', bg: '#8A4B2A', fg: '#FFFFFF', tinta: '#FE8812', de: 1, ate: 6, gancho: 'Sabe pra onde vai o dinheiro do CA?' },
  { id: 2, nome: 'Cultura e bem viver', estagio: 'Broto', bg: '#6DB33F', fg: '#1F1F1F', tinta: '#5B2A85', de: 7, ate: 8, gancho: 'Chegou no curso e ninguém te recebeu?' },
  { id: 3, nome: 'Acadêmico, carreira e formação política', estagio: 'Planta', bg: '#266264', fg: '#FFFFFF', tinta: '#FE8812', de: 9, ate: 11, gancho: 'Estágio, curso, evento: quem te avisa?' },
  { id: 4, nome: 'Comunicação, institucional e arrecadação', estagio: 'Fruto', bg: '#FFC83D', fg: '#1F1F1F', tinta: '#5B2A85', de: 12, ate: 14, gancho: 'CA que só aparece em calourada e eleição? Isso tem nome: ghosting.' },
] as const;

export const PROPOSTA_STOPS: PropostaStop[] = [
  {
    id: 1,
    titulo: 'Prestação de contas a cada três meses',
    compromisso: 'Um boletim trimestral com todas as entradas, saídas e aplicações do caixa do CA.',
    leaderId: 'vitoria',
    porque: 'O dinheiro do CA é seu. O livro-caixa é atualizado a cada lançamento e, a cada três meses, sai um boletim fácil de ler.',
    art: 'contas',
    jaFeito: { selo: 'Já começou', texto: 'O portal de transparência já está montado: livro-caixa, gráficos e planilha pra baixar. Os números são de exemplo até a gente ter as contas do CA.' },
    prova: { label: 'Abrir o portal', href: '/transparencia', simulado: true },
  },
  {
    id: 2,
    titulo: 'Reunião aberta todo mês',
    compromisso: 'Reuniões mensais da gestão, com encontros abertos a todos os alunos e decisões publicadas.',
    leaderId: 'larissa',
    porque: 'Decisão do CA não é assunto de grupo de amigos: todo mês tem reunião aberta, e o que foi decidido é publicado.',
    art: 'reunioes',
  },
  {
    id: 3,
    titulo: 'O site do curso',
    compromisso: 'Ideia nossa, construída há muito tempo: informação da UFMG e do curso num lugar só, com portal de transparência.',
    leaderId: 'gabriel',
    porque: 'A informação do curso fica com os estudantes, não com a diretoria da vez.',
    art: 'site',
    jaFeito: { selo: 'Já no ar', texto: 'É este site: guias de estágio, horas complementares, TCC, permanência e ônibus, mais os documentos do curso num lugar só.' },
    prova: { label: 'Abrir os guias', href: '/guias' },
  },
  {
    id: 4,
    titulo: 'CNPJ para o CAGP',
    compromisso: 'Formalizar o centro acadêmico como associação civil sem fins lucrativos, como manda o regimento.',
    leaderId: 'lara',
    porque: 'O regimento já manda o CAGP ser uma associação formal. Falta alguém fazer.',
    art: 'cnpj',
  },
  {
    id: 5,
    titulo: 'Segurança na sala do CA',
    compromisso: 'Estudar com DCE, DA e FAFICH medidas contra furtos e a instalação de escaninhos para estudantes.',
    leaderId: 'larissa',
    porque: 'Deixar suas coisas na sala do CA não pode ser aposta. Segurança e escaninhos entram em estudo com a FAFICH.',
    art: 'seguranca',
  },
  {
    id: 6,
    titulo: 'Você vota no que o CA reforma',
    compromisso: 'Nas reuniões abertas, os estudantes decidem o que revitalizar ou comprar, dentro do que o caixa permite.',
    leaderId: 'vitoria',
    porque: 'Dinheiro parado no caixa não serve a ninguém. O que reformar ou comprar se decide com você, em reunião aberta.',
    art: 'patrimonio',
  },
  {
    id: 7,
    titulo: 'Recepção de calouros de verdade',
    compromisso: 'Uma nova cultura de acolhimento e eventos de integração, com parcerias dentro da UFMG.',
    leaderId: 'paloma',
    porque: 'Ninguém deveria chegar no curso sem ser recebido, muito menos quem estuda à noite.',
    art: 'calouros',
    jaFeito: { selo: 'Já no ar', texto: 'O guia do calouro já existe: os primeiros 30 dias na UFMG, onde fica cada sala do curso e a quem recorrer.' },
    prova: { label: 'Abrir o guia do calouro', href: '/calouros' },
  },
  {
    id: 8,
    titulo: 'Diálogo com o movimento estudantil',
    compromisso: 'Conversa constante com as outras entidades, sem alinhamento ideológico, para agir rápido nas pautas comuns.',
    leaderId: 'italo',
    porque: 'Conversa com todas as entidades, sem dever nada a nenhuma.',
    art: 'entidades',
    jaFeito: { selo: 'Já começou', texto: 'Tem gente nossa que disputa o DA da FAFICH na chapa Nise da Silveira, de independentes, com integrantes dos centros acadêmicos de História, Antropologia e Comunicação.' },
  },
  {
    id: 9,
    titulo: 'Eventos com quem faz gestão pública',
    compromisso: 'Parcerias com órgãos públicos, extensão, OSCs e egressos para palestras e rodas de conversa.',
    leaderId: 'mariana',
    porque: 'Quem já trabalha com gestão pública vem contar como é: órgãos, OSCs e egressos.',
    art: 'eventos',
  },
  {
    id: 10,
    titulo: 'Cursos livres abertos à comunidade',
    compromisso: 'Cursos curtos em temas transversais, com destaque para a ciência política.',
    leaderId: 'italo',
    porque: 'Formação política e técnica aberta a qualquer pessoa, do curso ou de fora.',
    art: 'cursos',
  },
  {
    id: 11,
    titulo: 'Apoio à empresa júnior',
    compromisso: 'Apoio amplo à estruturação da empresa júnior de Gestão Pública, dentro dos limites do CA.',
    leaderId: 'livia',
    porque: 'A empresa júnior é dos estudantes, não de uma chapa. O CA entra como apoio.',
    art: 'empresa',
    jaFeito: { selo: 'Já começou', texto: 'Tem gente nossa que ajudou a construir a Empresa Júnior.' },
  },
  {
    id: 12,
    titulo: 'Comunicação que informa',
    compromisso: 'Estágios, concursos, bolsas, pesquisa e extensão divulgados o tempo todo, com calendário do curso.',
    leaderId: 'joao',
    porque: 'Estágio, concurso, bolsa e prazo avisados sempre, não só quando tem festa.',
    art: 'comunicacao',
    jaFeito: { selo: 'Já no ar', texto: 'As vagas que chegam no grupo Conexão Gestão Pública já ficam no site, com o anúncio como chegou e o prazo.' },
    prova: { label: 'Ver as vagas', href: '/carreira/vagas' },
  },
  {
    id: 13,
    titulo: 'Produtos do CAGP',
    compromisso: 'Camisetas, canecas, ecobags e adesivos escolhidos com os estudantes, sob demanda e a preço acessível.',
    leaderId: 'vitoria',
    porque: 'Camiseta, caneca e ecobag escolhidas por você, feitas sob demanda e a preço que cabe no bolso.',
    art: 'produtos',
  },
  {
    id: 14,
    titulo: 'Canal permanente de escuta',
    compromisso: 'Canais fixos para dúvidas, demandas e sugestões, com retorno público do que foi encaminhado.',
    leaderId: 'joao',
    porque: 'Sua dúvida ou reclamação tem para onde ir, e a resposta volta em público.',
    art: 'escuta',
    jaFeito: { selo: 'Já no ar', texto: 'O Fala com a gente já recebe crítica, erro e ideia sobre o site. A gente começou por nós.' },
    prova: { label: 'Mandar uma crítica ao site agora', href: '/ouvidoria' },
  },
];

/** Quantas das 14 já têm algo feito (a página da chapa e o tour contam a partir daqui). */
export const PROPOSTAS_FEITAS = PROPOSTA_STOPS.filter((p) => p.jaFeito).length;

export const START_PROPOSTAS_TOUR = 'cagp:start-propostas-tour';
