// src/lib/toast.ts — Um sistema de aviso só: a cápsula do DynamicToast.astro (DESIGN.md › Toast: 1 por vez).
// Mesma forma de chamada que o sonner usava (toast.success / error / info / warning), para as ilhas React.

type ToastOptions = { duration?: number; /** Segunda frase (o que fazer agora). */ description?: string };

const ICONS = {
  success: 'bi-check-circle-fill',
  error: 'bi-exclamation-triangle-fill',
  warning: 'bi-exclamation-triangle',
  info: 'bi-info-circle-fill',
} as const;

function show(message: string, icon: string, options?: ToastOptions) {
  if (typeof window === 'undefined') return;
  const fn = (window as unknown as { cagpToast?: (m: string, i?: string, d?: number) => void }).cagpToast;
  // Erros ficam mais tempo na tela: dá para ler o que fazer.
  const text = options?.description ? `${message} ${options.description}` : message;
  fn?.(text, icon, options?.duration ?? (icon === ICONS.error || options?.description ? 4500 : 2600));
}

export const toast = Object.assign((message: string, options?: ToastOptions) => show(message, ICONS.info, options), {
  success: (message: string, options?: ToastOptions) => show(message, ICONS.success, options),
  error: (message: string, options?: ToastOptions) => show(message, ICONS.error, options),
  warning: (message: string, options?: ToastOptions) => show(message, ICONS.warning, options),
  info: (message: string, options?: ToastOptions) => show(message, ICONS.info, options),
  message: (message: string, options?: ToastOptions) => show(message, ICONS.info, options),
});
