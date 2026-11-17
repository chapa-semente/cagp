// src/lib/pwa/instalacao.ts — Pôr o site na tela inicial: o que o aparelho permite, sem dependência.
//
// O navegador avisa UMA vez por carregamento que dá para instalar (`beforeinstallprompt`, só no
// Chrome/Edge/Samsung do Android e no desktop). Quem guarda esse aviso é um script inline no <head>
// do BaseLayout (`window.__cagpInstalar`): este módulo chega tarde demais para ouvir o evento, porque
// só carrega quando o bloco de instalar ou o tour aparecem. O iPhone nunca manda o aviso: lá a pessoa
// faz pelo menu Compartilhar, e o site só pode explicar o caminho.
//
// Usado pelo bloco "Deixe o site na tela inicial" (src/scripts/instalarNaTela.ts) e pelo tour da
// chapa (via src/lib/pwa/pwaManager.ts, que reexporta daqui).

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type JanelaComInstalacao = Window & { __cagpInstalar?: BeforeInstallPromptEvent | null };

const ouvintes = new Set<(podeInstalar: boolean) => void>();
const janela = (): JanelaComInstalacao | null => (typeof window === 'undefined' ? null : (window as JanelaComInstalacao));
const avisar = () => ouvintes.forEach((fn) => fn(canTriggerInstallPrompt()));

if (typeof window !== 'undefined') {
  // Rede de segurança para onde o script inline do BaseLayout não existe (testes, página avulsa).
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as JanelaComInstalacao).__cagpInstalar = e as BeforeInstallPromptEvent;
    avisar();
  });
  window.addEventListener('appinstalled', () => {
    (window as JanelaComInstalacao).__cagpInstalar = null;
    avisar();
  });
  // Avisos do script inline (o evento original já foi consumido por ele).
  window.addEventListener('cagp:instalar-mudou', avisar);
}

/** O aviso de instalação em um toque está guardado e pronto para disparar? */
export function canTriggerInstallPrompt(): boolean {
  return Boolean(janela()?.__cagpInstalar);
}

/** Chama o retorno agora e a cada vez que o aviso de instalação aparece ou é gasto. */
export function onInstallPromptChange(callback: (canPrompt: boolean) => void): () => void {
  ouvintes.add(callback);
  callback(canTriggerInstallPrompt());
  return () => ouvintes.delete(callback);
}

/** Abre o diálogo de instalar do navegador, se ele ofereceu um. */
export async function triggerInstallPrompt(): Promise<{ outcome: 'accepted' | 'dismissed' | 'unavailable' }> {
  const w = janela();
  const aviso = w?.__cagpInstalar;
  if (!w || !aviso) return { outcome: 'unavailable' };
  try {
    await aviso.prompt();
    const choice = await aviso.userChoice;
    // O aviso só serve uma vez: aceito ou recusado, o navegador não deixa chamar de novo.
    w.__cagpInstalar = null;
    avisar();
    return { outcome: choice.outcome };
  } catch (err) {
    console.warn('[PWA] Erro ao disparar prompt de instalação:', err);
    return { outcome: 'unavailable' };
  }
}

/** O site já está aberto pela tela inicial (como aplicativo)? */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return isDisplayStandalone || isNavigatorStandalone;
}

/** iPhone, iPad ou iPod. */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIPhoneOrIPad = /iPad|iPhone|iPod/.test(ua);
  // iPad no iOS 13+ finge ser MacIntel com tela touch
  const isIPadOS = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return isIPhoneOrIPad || isIPadOS;
}

export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent);
}

export function isMobileDevice(): boolean {
  return isIOS() || isAndroid();
}

/**
 * Navegador embutido de outro aplicativo (Instagram, Facebook, TikTok, uma WebView do Android):
 * dali não existe "adicionar à tela inicial"; a pessoa precisa abrir o site no navegador do celular.
 * O WhatsApp do iPhone abre os links numa folha do Safari que se apresenta igual ao Safari, então
 * esse caso não dá para detectar: o passo a passo do iPhone sempre avisa.
 */
export function isNavegadorEmbutido(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  if (/Instagram|FBAN|FBAV|FB_IAB|Messenger|TikTok|musical_ly|Line\/|Snapchat|Twitter|LinkedInApp/i.test(ua)) return true;
  // WebView do Android: "; wv)" no user agent.
  return /Android/i.test(ua) && /; wv\)/.test(ua);
}

/** O caminho de instalação que vale neste aparelho, agora. */
export type ModoDeInstalar = 'pronto' | 'toque' | 'embutido' | 'ios' | 'android' | 'geral';

export function modoDeInstalar(): ModoDeInstalar {
  if (isStandalone()) return 'pronto';
  if (canTriggerInstallPrompt()) return 'toque';
  if (isNavegadorEmbutido()) return 'embutido';
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'geral';
}
