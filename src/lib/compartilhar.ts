// src/lib/compartilhar.ts — Os textos que saem do site e o gesto de compartilhar (roda no navegador).
//
// A mensagem responde o pedido (o corpo vem de src/lib/previas.ts, com o emoji do assunto), traz o link
// e fecha chamando pro voto: "Vote Chapa 2! Faz o S!", a data e o lugar da eleição e, até ele acontecer,
// o debate. Emoji só existe aqui, no texto que vai pro WhatsApp (decisão do Gabriel em 11/11/2026): a
// tela do site continua sem emoji. A chamada muda sozinha com a data, para nenhum link ficar pedindo
// voto depois da eleição.
import { CHAPA_NOME, DEBATE_DATA, DEBATE_HORA, GRITO } from '@/lib/chapaSementeData';

export type TomDeCompartilhar = 'util' | 'convite' | 'voto';
export type FaseDaEleicao = 'antes' | 'dia' | 'depois';

const FIM_DO_DEBATE = Date.parse('2026-11-24T23:59:59-03:00');
const PRIMEIRO_DIA = Date.parse('2026-11-25T00:00:00-03:00');
const FIM_DA_VOTACAO = Date.parse('2026-11-26T22:30:00-03:00');

/**
 * Variação "É hoje" nos dias 25 e 26/11. Fica desligada até a Junta Eleitoral confirmar que mensagem em
 * grupo nesses dias não conta como campanha (o edital veda campanha no 1º andar da FAFICH nos dois dias).
 */
export const VARIACAO_DO_DIA_DA_ELEICAO = false;

export function faseDaEleicao(agora: number = Date.now()): FaseDaEleicao {
  if (agora > FIM_DA_VOTACAO) return 'depois';
  if (VARIACAO_DO_DIA_DA_ELEICAO && agora >= PRIMEIRO_DIA) return 'dia';
  return 'antes';
}

const ONDE_E_QUANDO = 'das 17h às 22h30, na sala do CAGP (FAFICH)';

/** A chamada de voto que fecha toda mensagem: o grito, a eleição e, até o dia 24, o debate. */
export function chamadaDeVoto(fase: FaseDaEleicao = faseDaEleicao(), agora: number = Date.now()): string[] {
  if (fase === 'depois') return [];
  if (fase === 'dia') return [`🗳️ *É hoje! ${GRITO}* 🌱`, `📍 Até 22h30, na sala do CAGP (FAFICH). Leve documento com foto.`];
  return [
    `🗳️ *${GRITO}* 🌱`,
    `📅 Eleição do CAGP: 25 e 26/11, ${ONDE_E_QUANDO}.`,
    ...(agora <= FIM_DO_DEBATE ? [`🎤 Debate das chapas: ${DEBATE_DATA}, às ${DEBATE_HORA}.`] : []),
  ];
}

/** As linhas finais da mensagem. Asteriscos e sublinhados viram negrito e itálico no WhatsApp. */
export function assinatura(tom: TomDeCompartilhar, fase: FaseDaEleicao = faseDaEleicao(), agora: number = Date.now()): string {
  if (fase === 'depois') return tom === 'voto' ? '' : '🌱 _Tá no site do curso de Gestão Pública._';
  const autoria = tom === 'voto' ? [] : [tom === 'util' ? `🌱 _Tá no site do curso, feito pela ${CHAPA_NOME}._` : `💜🧡 _Feito pela ${CHAPA_NOME}._`];
  const lembrete = tom === 'voto' && fase === 'antes' ? ['🪪 Leve documento com foto.'] : [];
  return [...autoria, ...chamadaDeVoto(fase, agora), ...lembrete].join('\n');
}

export interface Mensagem {
  /** O que a mensagem diz antes do link (uma ou duas linhas). */
  corpo: string;
  /** Endereço absoluto. */
  url: string;
  tom?: TomDeCompartilhar;
}

export function montarMensagem({ corpo, url, tom = 'util' }: Mensagem, fase: FaseDaEleicao = faseDaEleicao(), agora: number = Date.now()): string {
  const fim = assinatura(tom, fase, agora);
  return [corpo, url, ...(fim ? ['', fim] : [])].join('\n');
}

/** Endereço absoluto de um caminho que já traz o caminho-base (o que `route()` e `asset()` devolvem). */
export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, window.location.origin).href;
}

/** Corpo da declaração de voto (story, status e fim do tour). */
export function corpoDoVoto(): string {
  return `💜🧡 Eu voto *${CHAPA_NOME}* pro CAGP.\n💻 Antes de pedir voto, a chapa fez o site do curso:`;
}

/** Corpo do convite de quem pôs o site na tela inicial. */
export function corpoDoAppInstalado(): string {
  return '📲 Instalei no celular o site do curso de Gestão Pública: calculadora das 600h, grade com pré-requisitos e os guias de estágio e FUMP.';
}

export type ResultadoDoCompartilhar = 'enviado' | 'whatsapp' | 'cancelado';

/** Abre o menu de compartilhar do celular; onde ele não existe, abre o WhatsApp com a mensagem pronta. */
export async function compartilhar(mensagem: Mensagem & { titulo?: string }): Promise<ResultadoDoCompartilhar> {
  const text = montarMensagem(mensagem);
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: mensagem.titulo, text });
      return 'enviado';
    } catch (erro) {
      if ((erro as DOMException)?.name === 'AbortError') return 'cancelado';
    }
  }
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  return 'whatsapp';
}

export async function copiarTexto(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    return false;
  }
}
