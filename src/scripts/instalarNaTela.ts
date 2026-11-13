// src/scripts/instalarNaTela.ts — liga o bloco "Deixe o site na tela inicial" ao aparelho.
// A marcação vem pronta de InstalarNaTela.tsx; aqui só se escolhe o caminho que vale neste celular
// (src/lib/pwa/instalacao.ts) e se trata os três toques: instalar, copiar o link e "Agora não".

import { isMobileDevice, modoDeInstalar, onInstallPromptChange, triggerInstallPrompt, type ModoDeInstalar } from '@/lib/pwa/instalacao';

const CHAVE_DISPENSADO = 'cagp_instalar_dispensado_v1';

type JanelaDoSite = Window & {
  __cagpInstalarNaTela?: boolean;
  cagpToast?: (mensagem: string, icone?: string, duracao?: number) => void;
};

/** A pessoa instalou nesta visita: o navegador segue aberto, mas não há mais o que ensinar. */
let instalouAgora = false;
let pararDeOuvir: (() => void) | null = null;

function dispensado(): boolean {
  try {
    return localStorage.getItem(CHAVE_DISPENSADO) === '1';
  } catch {
    return false;
  }
}

function pintar(bloco: HTMLElement): void {
  const modo: ModoDeInstalar = instalouAgora ? 'pronto' : modoDeInstalar();
  bloco.dataset.instalarModo = modo;

  // Na home o convite é só para celular que ainda não instalou. Em /sobre-o-site fica sempre à vista.
  if (bloco.dataset.instalar === 'home') {
    bloco.hidden = !isMobileDevice() || dispensado() || (modo === 'pronto' && !instalouAgora);
  }

  bloco.querySelectorAll<HTMLElement>('[data-instalar-so]').forEach((parte) => {
    parte.hidden = !(parte.dataset.instalarSo || '').split(' ').includes(modo);
  });
  if (instalouAgora) {
    const texto = bloco.querySelector<HTMLElement>('[data-instalar-pronto-texto]');
    if (texto) texto.textContent = 'Pronto. Procure o ícone da Semente na tela inicial do celular.';
  }
}

async function copiarLink(): Promise<void> {
  const w = window as JanelaDoSite;
  const link = new URL(document.documentElement.dataset.baseUrl || '/', window.location.origin).href;
  try {
    await navigator.clipboard.writeText(link);
    w.cagpToast?.('Link copiado. Cole no navegador do celular.', 'bi-clipboard-check', 4000);
  } catch {
    // Navegador embutido sem área de transferência: mostra o endereço para a pessoa copiar à mão.
    w.cagpToast?.(link.replace(/^https?:\/\//, ''), 'bi-link-45deg', 8000);
  }
}

function ligar(bloco: HTMLElement, repintar: () => void): void {
  // O carregamento chama montar() duas vezes (o módulo e o astro:page-load): um ouvinte por bloco.
  if (bloco.dataset.instalarLigado) return;
  bloco.dataset.instalarLigado = '1';
  bloco.addEventListener('click', (evento) => {
    const alvo = evento.target instanceof Element ? evento.target : null;
    if (!alvo) return;

    if (alvo.closest('[data-instalar-agora]')) {
      void triggerInstallPrompt().then((res) => {
        if (res.outcome === 'accepted') instalouAgora = true;
        repintar();
        // Recusou ou o aviso falhou: o navegador não oferece de novo, então fica o caminho pelo menu.
        if (res.outcome !== 'accepted') bloco.querySelector<HTMLDetailsElement>('details.cagp-instalar-como')?.setAttribute('open', '');
      });
      return;
    }
    if (alvo.closest('[data-instalar-copiar]')) {
      void copiarLink();
      return;
    }
    if (alvo.closest('[data-instalar-dispensar]')) {
      try {
        localStorage.setItem(CHAVE_DISPENSADO, '1');
      } catch {
        // Sem armazenamento, o bloco some só nesta página.
      }
      bloco.hidden = true;
    }
  });
}

function montar(): void {
  pararDeOuvir?.();
  pararDeOuvir = null;
  const blocos = Array.from(document.querySelectorAll<HTMLElement>('[data-instalar]'));
  if (!blocos.length) return;
  const repintar = () => blocos.forEach(pintar);
  blocos.forEach((bloco) => ligar(bloco, repintar));
  // Chama na hora e de novo quando o aviso do navegador chega (ele pode vir depois do carregamento).
  pararDeOuvir = onInstallPromptChange(repintar);
}

export function setupInstalarNaTela(): void {
  const w = window as JanelaDoSite;
  if (w.__cagpInstalarNaTela) {
    montar();
    return;
  }
  w.__cagpInstalarNaTela = true;
  window.addEventListener('appinstalled', () => {
    instalouAgora = true;
    document.querySelectorAll<HTMLElement>('[data-instalar]').forEach(pintar);
  });
  document.addEventListener('astro:page-load', montar);
  montar();
}
