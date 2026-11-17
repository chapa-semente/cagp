// src/scripts/botaoCompartilhar.ts — Liga todo botão de compartilhar do site (um ouvinte só, no documento).
//
//   data-compartilhar            abre o menu de compartilhar (ou o WhatsApp) com a mensagem montada
//   data-compartilhar="pagina"   manda a página aberta agora: lê o texto das metas que o BaseLayout
//                                escreve (cagp:mensagem, cagp:tom, og:title). É o botão do cabeçalho e
//                                do trilho, que ficam parados enquanto o conteúdo troca.
//   data-copiar-mensagem         copia a mesma mensagem (para colar em legenda ou em outro app)
//
// O botão traz: data-corpo (o texto antes do link), data-url (caminho com o caminho-base),
// data-tom (util | convite | voto) e data-titulo. Componente: src/components/ui/BotaoCompartilhar.astro.
import { compartilhar, copiarTexto, montarMensagem, urlAbsoluta, type TomDeCompartilhar } from '@/lib/compartilhar';

declare global {
  interface Window {
    __cagpCompartilharLigado?: boolean;
  }
}

const meta = (seletor: string) => document.querySelector<HTMLMetaElement>(seletor)?.content ?? '';

function lerMensagem(el: HTMLElement) {
  if (el.dataset.compartilhar === 'pagina') {
    return {
      titulo: meta('meta[property="og:title"]') || document.title,
      corpo: meta('meta[name="cagp:mensagem"]') || document.title,
      url: urlAbsoluta(window.location.pathname),
      tom: (meta('meta[name="cagp:tom"]') as TomDeCompartilhar) || 'util',
    };
  }
  return {
    titulo: el.dataset.titulo,
    corpo: el.dataset.corpo ?? '',
    url: urlAbsoluta(el.dataset.url || window.location.pathname),
    tom: (el.dataset.tom as TomDeCompartilhar) || 'util',
  };
}

const aviso = (texto: string, icone: string) => (window as any).cagpToast?.(texto, icone, 2600);

if (!window.__cagpCompartilharLigado) {
  window.__cagpCompartilharLigado = true;
  document.addEventListener('click', async (ev) => {
    const alvo = ev.target as HTMLElement | null;
    const enviar = alvo?.closest<HTMLElement>('[data-compartilhar]');
    if (enviar) {
      ev.preventDefault();
      await compartilhar(lerMensagem(enviar));
      return;
    }
    const copiar = alvo?.closest<HTMLElement>('[data-copiar-mensagem]');
    if (copiar) {
      ev.preventDefault();
      const texto = copiar.dataset.texto ?? montarMensagem(lerMensagem(copiar));
      const ok = await copiarTexto(texto);
      aviso(ok ? 'Texto copiado. É só colar.' : 'Não deu pra copiar. Tente de novo.', ok ? 'bi-clipboard-check' : 'bi-clipboard');
    }
  });
}
