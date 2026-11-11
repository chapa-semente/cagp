// src/lib/previas.ts — A prévia de link de cada endereço (título, descrição, banner e mensagem pronta).
//
// Fonte única: src/data/compartilhamento.json para as páginas, documentos e normas; propostas e pessoas
// são montadas a partir dos próprios dados da chapa. O BaseLayout escreve as etiquetas og:/twitter: com
// o que sai daqui, e os botões de compartilhar usam a mesma mensagem. Só roda no build (nada disto vai
// para o navegador). Os JPGs são gerados por scripts/generate-og.mjs.
import dados from '@/data/compartilhamento.json';
import maisPedidos from '@/data/documentosMaisPedidos.json';
import { CHAPA_LEADERS, CHAPA_NOME, type LeaderInfo } from '@/lib/chapaSementeData';
import { normalizePathname } from '@/lib/navigationRegistry';
import { asset } from '@/lib/paths';
import { PROPOSTA_STOPS, type PropostaStop } from '@/lib/propostasTour';
import { TOUR_STOPS, type TourLeaderId } from '@/lib/sementeTour';

export type TomDeCompartilhar = 'util' | 'convite' | 'voto';

export interface Previa {
  /** og:title: o gancho, sem o sufixo do site. */
  titulo: string;
  /** og:description. */
  descricao: string;
  /** Nome do JPG em public/og/, sem extensão. */
  imagem: string;
  /** Corpo da mensagem de compartilhar (o link e a assinatura entram no navegador). */
  mensagem: string;
  tom: TomDeCompartilhar;
}

interface PaginaJson {
  titulo: string;
  descricao: string;
  /** Abre a mensagem de compartilhar (só no texto que sai do site). */
  emoji?: string;
  imagem: string;
  mensagem?: string;
}

/** O emoji de cada proposta, pela ilustração que o tour das propostas já usa. */
const EMOJI_DA_PROPOSTA: Record<PropostaStop['art'], string> = {
  contas: '💰', reunioes: '🤝', site: '💻', cnpj: '🧾', seguranca: '🔒', patrimonio: '🛠️', calouros: '🎉',
  entidades: '✊', eventos: '🎤', cursos: '📚', empresa: '🚀', comunicacao: '📣', produtos: '👕', escuta: '👂',
};

interface DocumentoPedido {
  id: string;
  nome: string;
  descricao: string;
  arquivo: string;
  editavel?: string;
}

const PAGINAS = dados.paginas as Record<string, PaginaJson>;
const DOCUMENTOS = dados.documentos as Record<string, { curto: string }>;
const NORMAS = dados.normas as Record<string, { curto: string }>;

export const DOCUMENTOS_PEDIDOS: (DocumentoPedido & { grupo: string; guia: string })[] = maisPedidos.grupos.flatMap((g) =>
  (g.documentos as DocumentoPedido[]).map((d) => ({ ...d, grupo: g.titulo, guia: g.guia })),
);

/** Endereço do banner, com a versão no fim: o WhatsApp guarda a prévia antiga de um endereço. */
export function imagemOg(nome: string): string {
  return `${asset(`/og/${nome}.jpg`)}?v=${dados.versao}`;
}

/** Nome curto do documento ("TCE com convênio"), para o título da prévia e a mensagem. */
export function nomeCurtoDoDocumento(id: string): string {
  return DOCUMENTOS[id]?.curto ?? DOCUMENTOS_PEDIDOS.find((d) => d.id === id)?.nome ?? id;
}

export function previaDoDocumento(doc: DocumentoPedido): Previa {
  const curto = nomeCurtoDoDocumento(doc.id);
  const formatos = doc.editavel ? 'PDF e Word' : 'PDF';
  return {
    titulo: `${curto}: ${formatos} pra baixar`,
    descricao: `${doc.descricao} No site do curso de Gestão Pública, feito pela ${CHAPA_NOME}.`,
    imagem: `doc-${doc.id}`,
    mensagem: `📄 *${curto}*\n${formatos} pra baixar:`,
    tom: 'util',
  };
}

export function previaDaProposta(p: PropostaStop): Previa {
  return {
    titulo: `Proposta ${p.id} de ${PROPOSTA_STOPS.length}: ${p.titulo}`,
    descricao: `${p.compromisso} ${CHAPA_NOME}, eleição do CAGP em 25 e 26/11.`,
    imagem: `proposta-${p.id}`,
    mensagem: `${EMOJI_DA_PROPOSTA[p.art]} *Proposta ${p.id} da ${CHAPA_NOME}: ${p.titulo}*\n${p.compromisso}`,
    tom: 'convite',
  };
}

/** A fala curta e literal do briefing que o tour das propostas já atribui à pessoa (nem todos têm). */
export function falaCurta(id: string): string | undefined {
  return PROPOSTA_STOPS.find((p) => p.leaderId === id)?.fala;
}

export function previaDaPessoa(leader: LeaderInfo): Previa {
  const parada = TOUR_STOPS[leader.id as TourLeaderId];
  const fala = falaCurta(leader.id);
  const primeiroNome = leader.name.split(' ')[0];
  return {
    titulo: `${leader.name}, ${leader.role} · Chapa 2`,
    descricao: `${parada.hook} Conheça ${primeiroNome} e as outras ${CHAPA_LEADERS.length - 1} pessoas da Semente.`,
    imagem: `pessoa-${leader.id}`,
    mensagem: `💜🧡 ${leader.name} concorre ao CAGP pela ${CHAPA_NOME} como ${leader.role}.${fala ? `\n💬 “${fala}”` : ''}`,
    tom: 'convite',
  };
}

function daPagina(p: PaginaJson, rota: string): Previa {
  const campanha = rota === '/' || rota === '/chapa-semente' || rota === '/gestao';
  const corpo = p.mensagem ?? p.titulo;
  return { titulo: p.titulo, descricao: p.descricao, imagem: p.imagem, mensagem: p.emoji ? `${p.emoji} ${corpo}` : corpo, tom: campanha ? 'convite' : 'util' };
}

/** A prévia do endereço. Rota sem entrada própria cai no banner padrão. */
export function previaDaRota(pathname: string): Previa {
  const rota = normalizePathname(pathname);
  const pagina = PAGINAS[rota];
  if (pagina) return daPagina(pagina, rota);

  const doc = rota.match(/^\/doc\/([\w-]+)$/);
  if (doc) {
    const achado = DOCUMENTOS_PEDIDOS.find((d) => d.id === doc[1]);
    if (achado) return previaDoDocumento(achado);
  }

  const norma = rota.match(/^\/documentos\/([\w-]+)$/);
  if (norma && NORMAS[norma[1]]) {
    const curto = NORMAS[norma[1]].curto;
    return {
      titulo: `${curto}: leia sem baixar o PDF`,
      descricao: `O documento oficial transcrito pra ler no celular, com o PDF original. No site do curso, feito pela ${CHAPA_NOME}.`,
      imagem: `norma-${norma[1]}`,
      mensagem: `📜 *${curto}*\nDá pra ler no celular, sem baixar o PDF:`,
      tom: 'util',
    };
  }

  const proposta = rota.match(/^\/propostas\/(\d+)$/);
  if (proposta) {
    const achada = PROPOSTA_STOPS.find((p) => p.id === Number(proposta[1]));
    if (achada) return previaDaProposta(achada);
  }

  const pessoa = rota.match(/^\/chapa-semente\/(\w+)$/);
  if (pessoa) {
    const achada = CHAPA_LEADERS.find((l) => l.id === pessoa[1]);
    if (achada) return previaDaPessoa(achada);
  }

  // Notícia de exemplo não ganha banner próprio: usa o do mural, que leva o adesivo de modelo.
  if (rota.startsWith('/noticias/')) return daPagina(PAGINAS['/noticias'], '/noticias');

  return { ...dados.padrao, mensagem: `${dados.padrao.emoji} ${dados.padrao.titulo}`, tom: 'util' };
}
