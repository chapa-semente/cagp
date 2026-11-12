// src/lib/pwa/pwaManager.ts
// Gerenciador Unificado de PWA, Notificações Eleitorais e Compartilhamento Viral da Chapa Semente

import { corpoDoAppInstalado, montarMensagem } from '@/lib/compartilhar';
import { downloadIcs } from '../calendar/icsGenerator';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;
const promptListeners = new Set<(canPrompt: boolean) => void>();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e as BeforeInstallPromptEvent;
    promptListeners.forEach((listener) => listener(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    promptListeners.forEach((listener) => listener(false));
  });
}

/**
 * Registra um callback para quando a disponibilidade do prompt de instalação mudar
 */
export function onInstallPromptChange(callback: (canPrompt: boolean) => void): () => void {
  promptListeners.add(callback);
  callback(deferredInstallPrompt !== null);
  return () => promptListeners.delete(callback);
}

/**
 * Verifica se o aplicativo já está sendo executado em modo Standalone PWA (instalado na Home Screen)
 */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  return isDisplayStandalone || isNavigatorStandalone;
}

/**
 * Detecta se o dispositivo do usuário é iOS (iPhone, iPad, iPod)
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIPhoneOrIPad = /iPad|iPhone|iPod/.test(ua);
  // iPad no iOS 13+ finge ser MacIntel com tela touch
  const isIPadOS = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1;
  return isIPhoneOrIPad || isIPadOS;
}

/**
 * Detecta se o dispositivo é Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent);
}

/**
 * Detecta se o dispositivo é mobile em geral
 */
export function isMobileDevice(): boolean {
  return isIOS() || isAndroid();
}

/**
 * Dispara o prompt nativo de instalação do PWA se disponível (especialmente no Android Chrome)
 */
export async function triggerInstallPrompt(): Promise<{ outcome: 'accepted' | 'dismissed' | 'unavailable' }> {
  if (!deferredInstallPrompt) {
    return { outcome: 'unavailable' };
  }

  try {
    await deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      deferredInstallPrompt = null;
      promptListeners.forEach((listener) => listener(false));
    }
    return { outcome: choice.outcome };
  } catch (err) {
    console.warn('[PWA] Erro ao disparar prompt de instalação:', err);
    return { outcome: 'unavailable' };
  }
}

/**
 * Retorna se o prompt de instalação em 1 toque está pronto para disparo
 */
export function canTriggerInstallPrompt(): boolean {
  return deferredInstallPrompt !== null;
}

/**
 * Solicita permissão para notificações na Web Notification API
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      sendWelcomeNotification();
    }
    return permission;
  } catch (err) {
    console.warn('[PWA] Erro ao solicitar permissão de notificações:', err);
    return 'denied';
  }
}

/**
 * Dispara notificação imediata de confirmação do credenciamento e radar da Chapa Semente
 */
export function sendWelcomeNotification(): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const title = '[SEMENTE] Radar Discente Ativado';
    const options: NotificationOptions = {
      body: 'Pronto: o site funciona sem sinal. A Semente (Chapa 2) vai te lembrar do debate (24/11) e da votacao na sala do CAGP (25 e 26/11, 17h as 22h30).',
      icon: '/imagens/pwa/pwa-192x192.png',
      badge: '/imagens/pwa/badge-96x96.png',
      tag: 'cagp-election-welcome',
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, options);
      }).catch(() => {
        new Notification(title, options);
      });
    } else {
      new Notification(title, options);
    }
  } catch (e) {
    console.warn('[PWA] Erro ao exibir notificação:', e);
  }
}

/**
 * Gera e faz download dos lembretes oficiais de eleição no formato .ics com alarme automático
 */
export function downloadElectionCalendarReminder(type: 'voting' | 'debate' | 'all' = 'voting'): void {
  const votingStart = new Date(2026, 10, 25, 17, 0, 0); // 25/11/2026 17:00

  if (type === 'debate') {
    const debateStart = new Date(2026, 10, 24, 18, 0, 0); // 24/11/2026 18:00
    downloadIcs({
      title: 'Debate das Chapas CAGP 2026 — Chapa 2 (Semente)',
      description: 'Debate entre as chapas ao Centro Acadêmico de Gestão Pública (FAFICH/UFMG), às 18h, organizado pela Junta Eleitoral. Venha conhecer as propostas da Chapa 2, a Semente!',
      location: 'FAFICH / UFMG - local a ser definido pela Junta Eleitoral',
      filename: 'debate-chapas-cagp-2026',
      startDate: debateStart,
      durationMinutes: 120,
    });
    return;
  }

  // Voting Event (Padrão)
  downloadIcs({
    title: 'ELEICOES CAGP UFMG 2026 — Votar na Chapa 2 (Semente)',
    description: 'Eleição da Diretoria do Centro Acadêmico de Gestão Pública (FAFICH/UFMG), das 17h às 22h30. Voto secreto e direto na sala do CAGP. Vote Chapa 2, a Semente!',
    location: 'Sala do CAGP - 1º andar da FAFICH/UFMG, ao lado da entrada da rampa, Campus Pampulha',
    filename: 'eleicoes-cagp-votar-semente',
    startDate: votingStart,
    durationMinutes: 330, // 17h às 22h30
  });
}

/**
 * Convite de quem pôs o site na tela inicial. Voz de colega, sem lista de recursos; a assinatura da
 * chapa muda sozinha com a data (src/lib/compartilhar.ts).
 */
export function getWhatsAppShareData(_customName?: string): { url: string; text: string } {
  const baseUrl = typeof window !== 'undefined'
    ? new URL(document.documentElement.dataset.baseUrl || '/', window.location.origin).href
    : '/';
  const text = montarMensagem({ corpo: corpoDoAppInstalado(), url: baseUrl, tom: 'convite' });
  return { url: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, text };
}
