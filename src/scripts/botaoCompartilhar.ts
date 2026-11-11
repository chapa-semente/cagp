// src/scripts/botaoCompartilhar.ts — Liga todo botão de compartilhar do site (um ouvinte só, no documento).
//
//   data-compartilhar            abre o menu de compartilhar (ou o WhatsApp) com a mensagem montada
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

function lerMensagem(el: HTMLElement) {
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
