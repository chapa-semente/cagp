// src/lib/propostasDeEstudantes.ts — Propostas que vieram de estudantes (desde 22/11/2026).
//
// A regra da série está no plano de execução (seção 6.3): ideia de estudante que a Semente assume vira
// proposta com número próprio (E1, E2…), fora das 14 da carta, com o nome de quem sugeriu (se a pessoa
// quiser) e o mesmo tratamento das outras: ficha, datas, custo, quem responde e plano B.
//
// O plano de cada uma (datas, custo, metas, riscos) vem do PDF, por scripts/plano-para-site.mjs
// (src/data/planoExecucao.json › deEstudantes). Aqui fica só o que é do site: o crédito, de onde veio a
// ideia, como a chapa respondeu e as fontes que a pesquisa achou, cada uma com a data em que foi lida.
// Proposta nova: o boletim "eN-nome.md" e a ficha "EN" no plano, o script, um item aqui e a página
// de três linhas src/pages/propostas/eN.astro. A nº 2 (24/11/2026) é a primeira que já nasceu no ar.
import type { DesenhoDeProposta } from '@/components/features/semente/DesenhosDaChapa';
import { PLANO_DE_ESTUDANTES, type PlanoDeEstudante } from '@/lib/planoExecucao';

export interface FonteDaIdeia {
  /** O que a fonte mostra, numa linha. */
  rotulo: string;
  /** Quem publicou e quando. */
  quem: string;
  href: string;
}

export interface PropostaDeEstudante {
  /** "e1": também o fim do endereço (/propostas/e1) e o nome do banner (proposta-e1). */
  id: string;
  numero: number;
  titulo: string;
  /** O que muda, numa frase: é a primeira coisa que a página diz. */
  impacto: string;
  /** Quem sugeriu, do jeito que topou aparecer. */
  quem: { nome: string; periodo: string };
  quando: { curto: string; extenso: string };
  /** Onde a ideia chegou. */
  onde: string;
  /** O que a pessoa apontou, nas palavras da chapa (sem aspas: não é citação). */
  oQueApontou: string;
  /** A frase da pessoa, literal e entre aspas. Só entra com a autorização dela. */
  fala?: string;
  /** O que a chapa respondeu e fez com a ideia. */
  resposta: string;
  art: DesenhoDeProposta;
  /** A parte da proposta que já dá para usar no site: vira o botão principal da página. */
  acao?: { rotulo: string; href: string; icone: string };
  /** O nome do link que leva ao plano. Proposta já entregue não tem cronograma: tem custo e plano B. */
  rotuloDoPlano?: string;
  /** De onde vêm os dados da página e o que ainda falta confirmar: abre a lista de fontes. */
  fontesTexto: string;
  /** As páginas que a pesquisa leu. Ninguém nelas foi procurado ainda. */
  fontes: FonteDaIdeia[];
  /** Data em que as fontes foram lidas. */
  lidoEm: string;
  plano: PlanoDeEstudante;
}

const planoDe = (id: string): PlanoDeEstudante => {
  const plano = PLANO_DE_ESTUDANTES.find((p) => p.id === id);
  if (!plano) throw new Error(`Falta o plano da proposta de estudante "${id}": rode node scripts/plano-para-site.mjs`);
  return plano;
};

export const PROPOSTAS_DE_ESTUDANTES: PropostaDeEstudante[] = [
  {
    id: 'e1',
    numero: 1,
    titulo: 'Ações sociais além da UFMG',
    impacto:
      'O curso passa a ter ação social com data: gincana solidária nas duas recepções de calouros, campanha do agasalho em maio e junho e de brinquedos até 8 de outubro, com prestação de contas de cada doação.',
    quem: { nome: 'Gustavo Pacheco', periodo: '1º período' },
    quando: { curto: '22/11/2026', extenso: '22 de novembro de 2026' },
    onde: 'no grupo de estudantes do curso',
    oQueApontou:
      'Nenhuma proposta da carta incentivava ou coordenava ações sociais para pessoas de fora da UFMG, como arrecadar e distribuir roupas e brinquedos. Ele lembrou da Engenharia Solidária, da Escola de Engenharia, e dos Engenheiros Sem Fronteiras de Belo Horizonte.',
    resposta:
      'A chapa respondeu no mesmo dia que a ideia entraria na carta. Ela entrou no plano de execução com data, custo zero para o caixa, quem responde, plano B e o nome dele.',
    art: 'solidaria',
    fontesTexto:
      'A ideia é do Gustavo. Os exemplos de quem já faz ação social na UFMG e em Belo Horizonte vêm destas páginas, lidas em 22/11/2026. Nenhum desses grupos foi procurado ainda: é por eles que a gestão começa.',
    fontes: [
      {
        rotulo: 'Engenharia Solidária: gincana com os calouros, item de higiene valendo ponto',
        quem: 'UFMG, 5 mar. 2015',
        href: 'https://www.ufmg.br/online/arquivos/037421.shtml',
      },
      {
        rotulo: 'Campanhas do agasalho com ponto de coleta nos campi Pampulha e Saúde',
        quem: 'UFMG, 26 jun. 2026',
        href: 'https://www.ufmg.br/comunicacao/noticias/servicos/campanhas-do-agasalho-mobilizam-comunidade-academica/',
      },
      {
        rotulo: 'A campanha do agasalho do Departamento de Ciência da Computação',
        quem: 'UFMG, 26 jun. 2025',
        href: 'https://www.ufmg.br/comunicacao/noticias/servicos/dcc-promove-campanha-de-doacao-de-agasalhos-e-cobertores/',
      },
      {
        rotulo: 'Brincar Terapêutico, da Enfermagem: brinquedos para a pediatria do Odilon Behrens',
        quem: 'PROEX/UFMG, 2024',
        href: 'https://www.ufmg.br/proex/noticia/projeto-de-extensao-arrecada-brinquedos-para-pediatria-hospitalar-do-odilon-behrens/',
      },
      {
        rotulo: 'Engenheiros Sem Fronteiras de BH: postes solares na Vila Acaba Mundo',
        quem: 'Congresso dos Engenheiros Sem Fronteiras, 2018',
        href: 'https://doity.com.br/anais/cbesf2018/trabalho/73007',
      },
    ],
    lidoEm: '22/11/2026',
    plano: planoDe('e1'),
  },
  {
    id: 'e2',
    numero: 2,
    titulo: 'Calculadora de faltas',
    impacto:
      'Você sabe, antes de faltar, quantos dias ainda pode perder em cada disciplina. A calculadora já está no ar, com a regra dos 75% de presença e a fonte na mesma página.',
    quem: { nome: 'Luiz Carlos', periodo: '4º período' },
    quando: { curto: '23/11/2026', extenso: '23 de novembro de 2026' },
    onde: 'em mensagem para a chapa',
    oQueApontou: 'Ele pediu uma calculadora de faltas no site do curso, para depois da eleição.',
    // O Luiz autorizou o nome, o período e a frase (confirmado pelo Gabriel em 24/11/2026).
    fala: 'Amigo! O site é sensacional!! Pós eleição e no mandato dá para implementar uma calculadora de falta?',
    resposta:
      'Dava, e não foi preciso esperar a eleição: o site do curso não depende de mandato. A calculadora entrou no ar no dia seguinte, e a ideia foi para o plano de execução com o nome dele.',
    art: 'faltas',
    acao: { rotulo: 'Abrir a calculadora', href: '/faltas', icone: 'bi-calculator' },
    // Só o registro da sugestão, já entregue: sem entregas novas com data (pedido do Gabriel, 24/11/2026).
    rotuloDoPlano: 'Custo e plano B',
    fontesTexto:
      'A ideia é do Luiz. A regra dos 75% de presença e o que acontece com quem passa do limite vêm das Normas Gerais de Graduação da UFMG, lidas em 24/11/2026. A calculadora usa a carga horária cheia da disciplina, e o registro que vale é o do professor.',
    fontes: [
      {
        rotulo: 'Normas Gerais de Graduação: presença mínima de 75% e o que acontece com quem não alcança (arts. 11, 12, 15, 87 e 93)',
        quem: 'UFMG, Resolução Complementar CEPE nº 01/2018',
        href: 'https://www.ufmg.br/prograd/wp-content/uploads/2024/07/ResCepeComp0118.pdf',
      },
      {
        rotulo: 'Onde a UFMG publica as normas de graduação e as resoluções que as completam',
        quem: 'Pró-Reitoria de Graduação da UFMG',
        href: 'https://www.ufmg.br/prograd/normas-gerais-de-graduacao-e-resolucoes/',
      },
    ],
    lidoEm: '24/11/2026',
    plano: planoDe('e2'),
  },
];

export const rotaDaPropostaDeEstudante = (p: Pick<PropostaDeEstudante, 'id'>) => `/propostas/${p.id}`;

const semHtml = (s: string) =>
  s.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

/** O resumo do cartão (o mesmo dos cartões das 14): primeira entrega, quem responde e plano B. */
export function resumoDaPropostaDeEstudante(p: PropostaDeEstudante) {
  const primeiro = p.plano.quando[0];
  const riscos = p.plano.secoes.find((s) => s.titulo.toLowerCase().includes('errado'));
  const lista = riscos?.blocos.find((b): b is { lista: { forte: string; texto: string }[] } => 'lista' in b)?.lista[0];
  const forte = lista ? semHtml(lista.forte) : '';
  return {
    primeiraData: primeiro ? semHtml(primeiro.forte) : '',
    primeiraEntrega: primeiro ? semHtml(primeiro.texto) : '',
    quemResponde: semHtml(p.plano.quemResponde),
    // "Falta gente para tocar a campanha. O CAGP vira ponto de coleta…": o risco já termina em ponto.
    planoB: lista ? `${forte}${/[.!?]$/.test(forte) ? ' ' : ': '}${semHtml(lista.texto)}` : '',
  };
}

/** O nome do link para o plano da proposta ("Cronograma e plano B", a não ser que ela diga outro). */
export const rotuloDoPlano = (p: Pick<PropostaDeEstudante, 'rotuloDoPlano'>) => p.rotuloDoPlano ?? 'Cronograma e plano B';
/** O mesmo link dentro de um cartão: "Ver cronograma e plano B". */
export const verOPlano = (p: Pick<PropostaDeEstudante, 'rotuloDoPlano'>) => {
  const rotulo = rotuloDoPlano(p);
  return `Ver ${rotulo.charAt(0).toLowerCase()}${rotulo.slice(1)}`;
};

/** O convite que fecha todo lugar onde a série aparece. */
export const CONVITE_IDEIA = {
  titulo: 'Faltou alguma coisa na carta?',
  texto: 'Manda pelo Fala com a gente. Se a Semente assumir a ideia, ela entra no plano com data, custo e o seu nome.',
  rotulo: 'Mandar minha ideia',
  /** O formulário já abre em "Tenho uma ideia". */
  href: '/ouvidoria?tipo=ideia',
} as const;
