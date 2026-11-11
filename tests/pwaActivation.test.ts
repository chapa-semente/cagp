import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getVaultItem,
  setVaultItem,
  ElectionActivationSchema,
  VaultDefaults,
  type ElectionActivation,
} from '../src/lib/storage/studentVault';
import {
  getWhatsAppShareData,
  isStandalone,
  isIOS,
  isAndroid,
  isMobileDevice,
  onInstallPromptChange,
} from '../src/lib/pwa/pwaManager';

// Regex para detecção de caracteres Unicode de emojis
const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/u;

describe('PWA & Eleições Chapa Semente Activation Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('StudentVault Schema & Persistence', () => {
    it('deve ter valores padrão corretos para cagp_election_activation_v1', () => {
      const defaultData = VaultDefaults.cagp_election_activation_v1;
      expect(defaultData.completed).toBe(false);
      expect(defaultData.installed).toBe(false);
      expect(defaultData.notificationsEnabled).toBe(false);
      expect(defaultData.votedDateChoice).toBe('indeciso');
      expect(defaultData.sementeSupporter).toBe(true);
      expect(defaultData.calendarReminderSaved).toBe(false);
      expect(defaultData.sharedWhatsApp).toBe(false);
    });

    it('deve validar e salvar corretamente o credenciamento completo no vault', () => {
      const activationData: ElectionActivation = {
        completed: true,
        installed: true,
        notificationsEnabled: true,
        votedDateChoice: '25_noite',
        sementeSupporter: true,
        calendarReminderSaved: true,
        completedAt: '2026-11-07T15:00:00.000Z',
        sharedWhatsApp: true,
      };

      const parseResult = ElectionActivationSchema.safeParse(activationData);
      expect(parseResult.success).toBe(true);

      setVaultItem('cagp_election_activation_v1', activationData);
      const retrieved = getVaultItem('cagp_election_activation_v1');

      expect(retrieved.completed).toBe(true);
      expect(retrieved.votedDateChoice).toBe('25_noite');
      expect(retrieved.sementeSupporter).toBe(true);
      expect(retrieved.sharedWhatsApp).toBe(true);
    });
  });

  describe('WhatsApp Viral Mobilization Link (Zero Emojis)', () => {
    it('deve gerar texto institucional e persuasivo SEM nenhum emoji', () => {
      const { url, text } = getWhatsAppShareData('Mariana Silva');

      expect(url).toContain('https://api.whatsapp.com/send?text=');
      expect(text).toContain('Mariana Silva');
      expect(text).toContain('Calculadora de Horas ACG 600h');
      expect(text).toContain('Chapa 2, a Semente — Potencial que se Transforma em Ação');
      expect(text).toContain('25 e 26 de novembro');

      // Asserção estrita de ausência de emojis
      expect(EMOJI_REGEX.test(text)).toBe(false);

      const encodedParam = url.split('text=')[1];
      const decodedParam = decodeURIComponent(encodedParam);
      expect(decodedParam).toBe(text);
    });

    it('deve usar fallback amigável quando nenhum nome for passado e não ter emojis', () => {
      const { text } = getWhatsAppShareData();
      expect(text).toContain('colega de Gestão Pública');
      expect(EMOJI_REGEX.test(text)).toBe(false);
    });
  });

  describe('PWA Platform Detection & Prompt Listener', () => {
    it('deve detectar standalone mode quando matchMedia ou navigator.standalone forem verdadeiros', () => {
      vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        matches: query === '(display-mode: standalone)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      expect(isStandalone()).toBe(true);
    });

    it('deve registrar listener de beforeinstallprompt sem lançar exceção', () => {
      let promptStatus = false;
      const unsubscribe = onInstallPromptChange((available) => {
        promptStatus = available;
      });

      expect(typeof unsubscribe).toBe('function');
      expect(promptStatus).toBe(false);

      unsubscribe();
    });
  });
});
