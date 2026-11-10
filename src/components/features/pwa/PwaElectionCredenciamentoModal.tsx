// src/components/pwa/PwaElectionCredenciamentoModal.tsx
// Modal Fullscreen Neobrutalista e Ultra-Expressivo de Indução PWA & Notificações (Zero Emojis)
// Fiel à Identidade da Chapa Semente: Roxo #5B2A85, Laranja #FE8812, Verde Petróleo #266264, Rubro #9E2424

import React, { useState, useEffect } from 'react';
import { asset } from '@/lib/paths';
import {
  getVaultItem,
  setVaultItem,
  type ElectionActivation,
} from '@/lib/storage/studentVault';
import {
  isIOS,
  isAndroid,
  isStandalone,
  canTriggerInstallPrompt,
  triggerInstallPrompt,
  onInstallPromptChange,
  requestNotificationPermission,
  downloadElectionCalendarReminder,
  getWhatsAppShareData,
} from '@/lib/pwa/pwaManager';
import { Marquee } from '@/components/ui/marquee';

export const PwaElectionCredenciamentoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [isStandaloneApp, setIsStandaloneApp] = useState(false);
  const [canPromptInstall, setCanPromptInstall] = useState(false);

  // Form State
  const [notifState, setNotifState] = useState<'default' | 'granted' | 'denied'>('default');
  const [calendarSaved, setCalendarSaved] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState<ElectionActivation['votedDateChoice']>('25_noite');
  const [studentName, setStudentName] = useState('Estudante de Gestão Pública');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // 1. Detectar Plataforma
    const ios = isIOS();
    const android = isAndroid();
    const standalone = isStandalone();

    setDeviceType(ios ? 'ios' : android ? 'android' : 'desktop');
    setIsStandaloneApp(standalone);

    // 2. Verificar Notificações Atuais
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotifState(Notification.permission);
    }

    // 3. Ouvir prompt de instalação do Android
    const unsubscribePrompt = onInstallPromptChange((available) => {
      setCanPromptInstall(available);
    });

    // 4. Carregar perfil e credenciamento existente
    try {
      const profile = getVaultItem('cagp_student_profile_v1');
      if (profile && profile.name) {
        setStudentName(profile.name);
      }

      const cred = getVaultItem('cagp_election_activation_v1');
      if (cred) {
        setSelectedTurno(cred.votedDateChoice || '25_noite');
        setCalendarSaved(Boolean(cred.calendarReminderSaved));
      }
    } catch (e) {
      console.warn('[PWA] Erro ao carregar estado inicial do credenciamento:', e);
    }

    return () => unsubscribePrompt();
  }, []);

  // Listener para reabrir o modal a qualquer momento
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('cagp:open-credenciamento', handleOpen);
    return () => window.removeEventListener('cagp:open-credenciamento', handleOpen);
  }, []);

  // Bloquear scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleAndroidInstallClick = async () => {
    const res = await triggerInstallPrompt();
    if (res.outcome === 'accepted') {
      setIsStandaloneApp(true);
      handleNextStep();
    }
  };

  const handleRequestNotification = async () => {
    const perm = await requestNotificationPermission();
    setNotifState(perm);
  };

  const handleDownloadCalendar = () => {
    downloadElectionCalendarReminder('voting');
    setCalendarSaved(true);
  };

  const handleShareWhatsApp = () => {
    const { url } = getWhatsAppShareData(studentName);
    window.open(url, '_blank', 'noopener,noreferrer');

    const current = getVaultItem('cagp_election_activation_v1');
    setVaultItem('cagp_election_activation_v1', {
      ...current,
      sharedWhatsApp: true,
    });
  };

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleCompleteActivation = () => {
    const data: ElectionActivation = {
      completed: true,
      installed: isStandaloneApp || deviceType === 'desktop',
      notificationsEnabled: notifState === 'granted',
      votedDateChoice: selectedTurno,
      sementeSupporter: true,
      calendarReminderSaved: calendarSaved,
      completedAt: new Date().toISOString(),
      sharedWhatsApp: true,
    };

    setVaultItem('cagp_election_activation_v1', data);
    setVaultItem('cagp_onboarding_completed_v1', true);

    window.dispatchEvent(new CustomEvent('cagp:vault-updated'));
    if ((window as unknown as { cagpToast?: (msg: string, icon?: string) => void }).cagpToast) {
      (window as unknown as { cagpToast: (msg: string, icon?: string) => void }).cagpToast(
        'Pronto! O app da Chapa Semente está no seu celular.',
        'bi-check2-circle'
      );
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] w-screen h-[100dvh] flex flex-col bg-card text-foreground overflow-hidden select-none animate-in fade-in duration-200"
      style={{
        backgroundImage: 'radial-gradient(#1F1F1F 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="credenciamento-main-heading"
    >
      {/* 1. MICRO-FAIXA TRICOLOR INSTITUCIONAL (Laranja + Rubro + Verde Petróleo) */}
      <div className="h-[6px] w-full flex border-b-2 border-border shrink-0" aria-hidden="true">
        <div className="h-full w-1/3 bg-accent" />
        <div className="h-full w-1/3 bg-secondary" />
        <div className="h-full w-1/3 bg-teal-700" />
      </div>

      {/* 2. TOPBAR DE COMANDO INSTITUCIONAL */}
      <header className="px-3.5 sm:px-6 py-2.5 bg-primary text-white border-b-3 border-border flex items-center justify-between gap-3 shrink-0 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={asset('/logos/semente/semente-simbolo-branco.webp')}
            alt="Chapa Semente"
            width={466}
            height={603}
            className="h-10 w-auto shrink-0"
          />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-xs font-bold bg-white text-primary px-2 py-0.5 rounded-full border border-border shadow-xs">
                Chapa Semente
              </span>
              <span className="hidden sm:inline-flex font-mono text-xs font-bold uppercase bg-teal-700 text-white px-2 py-0.5 rounded border border-border">
                POTENCIAL EM AÇÃO
              </span>
              <span className="hidden md:inline-flex font-mono text-xs font-bold uppercase bg-secondary text-white px-2 py-0.5 rounded border border-border">
                FAFICH • UFMG
              </span>
            </div>
            <h1 id="credenciamento-main-heading" className="font-heading text-xs sm:text-sm font-black uppercase text-white tracking-wide truncate m-0 mt-0.5">
              Instalar o app da Chapa Semente · opcional
            </h1>
          </div>
        </div>

        {/* Indicador de Passo em Badge Neobrutalista + Botão Fechar */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs font-extrabold uppercase px-3 py-1 bg-accent text-foreground border-3 border-border rounded-lg shadow-sm">
            ETAPA {currentStep} DE 4
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-lg bg-white text-foreground border-3 border-border shadow-xs flex items-center justify-center font-heading font-black text-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            title="Fechar e voltar ao site"
            aria-label="Fechar e voltar ao site"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* 3. MARQUEE DINÂMICO CONTÍNUO */}
      <div className="bg-foreground text-background text-[#FFD6A5] border-b-3 border-border shrink-0 overflow-hidden">
        <Marquee speed="normal" bordered={false} className="py-1">
          <span className="mx-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            ELEIÇÕES CAGP 2026: 25 E 26 DE NOVEMBRO
          </span>
          <span className="mx-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-700" />
            VOTAÇÃO NA SALA DO CAGP (17H ÀS 22H30)
          </span>
          <span className="mx-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            DEBATE DAS CHAPAS: 24/NOVEMBRO ÀS 18H
          </span>
          <span className="mx-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD6A5]" />
            SUPER APP DISCENTE 100% CÓDIGO ABERTO
          </span>
        </Marquee>
      </div>

      {/* 4. HUD MECÂNICO DE PROGRESSO (STEPPER COM CARIMBOS DE STATUS) */}
      <div className="bg-background px-3.5 sm:px-6 py-2.5 border-b-3 border-border shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          {[
            { step: 1, title: 'ACESSO OFFLINE', stamp: 'INICIADO' },
            { step: 2, title: 'INSTALAÇÃO', stamp: 'DISPOSITIVO' },
            { step: 3, title: 'RADAR DA URNA', stamp: 'ALERTAS' },
            { step: 4, title: 'LEMBRETE', stamp: 'SEU TURNO' },
          ].map(({ step, title, stamp }) => {
            const isActive = currentStep === step;
            const isCompleted = currentStep > step;
            return (
              <div
                key={step}
                className={`flex-1 p-1.5 sm:p-2 rounded-lg border-3 border-border transition-all flex flex-col items-center justify-center text-center ${
                  isActive
                    ? 'bg-primary text-white shadow'
                    : isCompleted
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-[#78716C]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-full border border-current flex items-center justify-center font-mono text-xs font-bold ${isActive ? 'bg-accent text-foreground' : ''}`}>
                    {isCompleted ? <i className="bi bi-check-lg" aria-hidden="true" /> : step}
                  </span>
                  <span className="font-heading text-xs sm:text-xs font-black uppercase tracking-wide truncate">
                    {title}
                  </span>
                </div>
                <span className={`font-mono text-xs sm:text-xs font-bold uppercase tracking-wider mt-0.5 ${isActive ? 'text-[#FFD6A5]' : isCompleted ? 'text-[#DCFCE7]' : 'text-[#A8A29E]'}`}>
                  {isCompleted ? 'CONCLUÍDO' : isActive ? stamp : 'AGUARDANDO'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CORPO CENTRAL COM VISOR DINÂMICO E SCROLL */}
      <main className="flex-1 overflow-y-auto px-4 py-5 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* ========================================================= */}
          {/* ETAPA 1: APRESENTAÇÃO & SOBERANIA DISCENTE OFFLINE        */}
          {/* ========================================================= */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Card Destaque Hero */}
              <div className="p-4 sm:p-6 rounded-2xl border-4 border-border bg-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-accent" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <div className="space-y-1">
                    <h2 className="font-heading text-lg sm:text-2xl font-black text-foreground m-0 leading-tight">
                      Tenha o site no celular, mesmo sem sinal
                    </h2>
                  </div>

                  <div className="cagp-stamp-badge is-homologado shrink-0 -rotate-2">
                    OPCIONAL
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#44403C] mt-3 leading-relaxed">
                  Instalando, a <strong>calculadora de 600h</strong>, a <strong>grade dos 10 períodos</strong> e o <strong>catálogo de disciplinas</strong> abrem mesmo nos corredores da FAFICH sem sinal. Não é exigência de ninguém: o site também funciona direto no navegador, e você pode fechar esta tela a qualquer momento.
                </p>
              </div>

              {/* Grid Neobrutalista de 3 Pilares com Contraste Marcante */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-xl border-2 border-border bg-card shadow flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-primary text-white border-3 border-border flex items-center justify-center font-bold mb-2">
                      <i className="bi bi-shield-check text-base" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xs font-black text-foreground m-0">
                      Soberania Discente
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 m-0">
                      Zero-Server: seus dados acadêmicos salvos unicamente no seu aparelho com privacidade irrestrita.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary uppercase mt-3 block">
                    SELO DE PRIVACIDADE
                  </span>
                </div>

                <div className="p-4 rounded-xl border-2 border-border bg-card shadow flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-accent text-foreground border-3 border-border flex items-center justify-center font-bold mb-2">
                      <i className="bi bi-wifi-off text-base" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xs font-black text-foreground m-0">
                      100% Anti-Lie-Fi
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 m-0">
                      Cache estático resiliente construído para nunca travar durante aulas e assembleias.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-accent uppercase mt-3 block">
                    OFFLINE VERIFICADO
                  </span>
                </div>

                <div className="p-4 rounded-xl border-2 border-border bg-card shadow flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-teal-700 text-white border-3 border-border flex items-center justify-center font-bold mb-2">
                      <i className="bi bi-code-slash text-base" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xs font-black text-foreground m-0">
                      Código Aberto
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 m-0">
                      Compromisso 3 do Eixo 1: a plataforma será entregue integralmente aos estudantes.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#266264] uppercase mt-3 block">
                    CHAPA SEMENTE
                  </span>
                </div>
              </div>

              {/* Banner de Compromisso Eleitoral */}
              <div className="p-4 rounded-xl border-2 border-border bg-[#EFE7F6] flex items-center gap-3.5 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-primary border-2 border-border p-1.5 shrink-0 flex items-center justify-center shadow-sm">
                  <img
                    src={asset('/logos/semente/semente-simbolo-branco.webp')}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-xs sm:text-sm font-black text-foreground m-0">
                    Eleições CAGP 2026 • Chapa Semente
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 m-0 leading-relaxed">
                    Representação combativa, apartidária e pautada na transparência e permanência. Prossiga para sincronizar seu dispositivo e acessar o radar da votação.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ETAPA 2: MOCKUPS VETORIAIS ANIMADOS DE DISPOSITIVO        */}
          {/* ========================================================= */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
                  Etapa 2 · Instalação (opcional)
                </span>
                <h2 className="font-heading text-lg sm:text-2xl font-black text-foreground m-0">
                  Sincronização &amp; Fixação do Aplicativo
                </h2>
              </div>

              {/* CENÁRIO STANDALONE: JÁ INSTALADO */}
              {isStandaloneApp ? (
                <div className="p-6 rounded-2xl border-4 border-border bg-success-tint text-center space-y-3 shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-success text-white border-2 border-border mx-auto flex items-center justify-center shadow">
                    <i className="bi bi-check2-all text-3xl" aria-hidden="true" />
                  </div>
                  <div className="cagp-stamp-badge is-deferido mx-auto -rotate-1 text-xs">
                    JÁ INSTALADO
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-black text-[#14532D] m-0">
                    Aplicativo Já Instalado na Tela de Início
                  </h3>
                  <p className="text-xs text-[#166534] max-w-md mx-auto m-0 leading-relaxed">
                    Seu aparelho já está operando com cache total e soberania discente. Avance para ativar os avisos da votação.
                  </p>
                </div>
              ) : deviceType === 'ios' ? (
                /* =================================================== */
                /* SIMULADOR VETORIAL IOS / SAFARI                     */
                /* =================================================== */
                <div className="space-y-4">
                  {/* Mockup Esquemático do iPhone / Safari */}
                  <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-[#F8FAFC] shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-border pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black uppercase bg-info text-white px-2 py-0.5 rounded border border-border">
                          Apple iOS / Safari
                        </span>
                        <span className="font-heading text-xs font-black uppercase text-foreground">
                          Barra de Ferramentas Inferior
                        </span>
                      </div>
                      <span className="cagp-stamp-badge is-homologado text-xs">
                        PASSO 1 DE 3
                      </span>
                    </div>

                    {/* Ilustração Vetorial da Barra Inferior do Safari */}
                    <div className="p-3 bg-white border-2 border-border rounded-xl shadow flex items-center justify-between px-6 sm:px-12 relative overflow-hidden">
                      {/* Seta Indicadora Apontando para o Compartilhar */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none">
                        <span className="font-mono text-xs font-black uppercase bg-accent text-foreground px-2 py-0.5 rounded border border-border shadow-xs">
                          TOQUE AQUI
                        </span>
                        <i className="bi bi-arrow-down-short text-xl text-accent -mt-1" aria-hidden="true" />
                      </div>

                      <div className="text-[#94A3B8] text-lg cursor-not-allowed">
                        <i className="bi bi-chevron-left" aria-hidden="true" />
                      </div>
                      <div className="text-[#94A3B8] text-lg cursor-not-allowed">
                        <i className="bi bi-chevron-right" aria-hidden="true" />
                      </div>

                      {/* Botão de Compartilhar em Destaque Absoluto */}
                      <div className="relative my-2">
                        <div className="w-12 h-12 rounded-xl bg-accent text-foreground border-2 border-border flex items-center justify-center font-black text-xl shadow-sm relative z-10 scale-105">
                          <i className="bi bi-box-arrow-up" aria-hidden="true" />
                        </div>
                      </div>

                      <div className="text-[#94A3B8] text-lg cursor-not-allowed">
                        <i className="bi bi-book" aria-hidden="true" />
                      </div>
                      <div className="text-[#94A3B8] text-lg cursor-not-allowed">
                        <i className="bi bi-square" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Lista Sequencial de Instruções */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      <div className="p-2.5 rounded-lg bg-white border-3 border-border shadow-sm">
                        <span className="font-mono text-xs font-black uppercase text-info block">
                          Passo 1
                        </span>
                        <p className="text-xs font-bold text-foreground m-0 mt-0.5">
                          Toque no ícone de Compartilhar na barra do Safari.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border-3 border-border shadow-sm">
                        <span className="font-mono text-xs font-black uppercase text-info block">
                          Passo 2
                        </span>
                        <p className="text-xs font-bold text-foreground m-0 mt-0.5">
                          Role o menu e selecione "Adicionar à Tela de Início".
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border-3 border-border shadow-sm">
                        <span className="font-mono text-xs font-black uppercase text-info block">
                          Passo 3
                        </span>
                        <p className="text-xs font-bold text-foreground m-0 mt-0.5">
                          Confirme em "Adicionar" no canto superior direito.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FEF3C7] border-2 border-warning text-xs font-sans text-[#92400E]">
                    <strong>Por que no iPhone é diferente:</strong> a Apple exige a fixação do WebApp na tela de início para liberar as permissões da Web Push Notification API e o armazenamento offline seguro.
                  </div>
                </div>
              ) : deviceType === 'android' ? (
                /* =================================================== */
                /* SIMULADOR VETORIAL ANDROID CHROME                   */
                /* =================================================== */
                <div className="space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl border-4 border-border bg-white shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-border pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black uppercase bg-success text-white px-2 py-0.5 rounded border border-border">
                          Android OS / Chromium
                        </span>
                        <span className="font-heading text-xs font-black uppercase text-foreground">
                          Instalação Direta em 1 Toque
                        </span>
                      </div>
                      <span className="cagp-stamp-badge is-deferido text-xs">
                        PRONTO PARA INSTALAR
                      </span>
                    </div>

                    {/* Botão de Impacto com Física 3D Neobrutalista */}
                    <button
                      type="button"
                      onClick={handleAndroidInstallClick}
                      className="w-full py-4 px-6 rounded-xl bg-success hover:bg-[#166534] text-white border-3 border-border font-heading font-black text-sm sm:text-base uppercase tracking-wider shadow-[5px_5px_0_0_#1F1F1F] hover:shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer flex items-center justify-center gap-3"
                    >
                      <i className="bi bi-phone-fill text-2xl" aria-hidden="true" />
                      <span>INSTALAR SUPER APP SEMENTE AGORA</span>
                    </button>

                    {/* Fallback de 3 Pontinhos */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border-2 border-border flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border-3 border-border flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                        <i className="bi bi-three-dots-vertical" aria-hidden="true" />
                      </div>
                      <div className="text-xs text-[#475569] leading-snug">
                        <strong>Se o botão não abrir automaticamente:</strong> Toque nos <strong>três pontos verticais</strong> no canto superior do Chrome e clique em <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* =================================================== */
                /* VIEWFINDER TÁTICO DESKTOP / QR CODE                 */
                /* =================================================== */
                <div className="space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl border-4 border-border bg-white shadow-lg space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-border pb-2">
                      <span className="font-mono text-xs font-black uppercase bg-primary text-white px-2 py-0.5 rounded border border-border">
                        Estação Desktop / Computador
                      </span>
                      <span className="cagp-stamp-badge is-homologado text-xs">
                        ACESSO MULTI-DISPOSITIVO
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                      {/* Viewfinder Brutalista com Marcas de Mira Óptica */}
                      <div className="relative p-3 bg-background border-2 border-border rounded-2xl shadow-md flex flex-col items-center">
                        {/* Cantoneiras de Mira Óptica */}
                        <div className="absolute top-1 left-1 text-xs font-mono font-black text-foreground">+</div>
                        <div className="absolute top-1 right-1 text-xs font-mono font-black text-foreground">+</div>
                        <div className="absolute bottom-1 left-1 text-xs font-mono font-black text-foreground">+</div>
                        <div className="absolute bottom-1 right-1 text-xs font-mono font-black text-foreground">+</div>

                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=2&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://cagp-ufmg.github.io')}`}
                          alt="QR Code de Instalação"
                          className="w-32 h-32 object-contain border border-border rounded-lg bg-white"
                          loading="lazy"
                        />
                        <span className="font-mono text-xs font-black uppercase text-foreground mt-2 block">
                          APONTE A CÂMERA DO CELULAR
                        </span>
                      </div>

                      <div className="text-left space-y-2.5 max-w-xs">
                        <h4 className="font-heading text-xs font-black text-foreground m-0">
                          Instale no seu Aparelho Principal
                        </h4>
                        <p className="text-xs text-muted-foreground m-0 leading-relaxed">
                          A votação é presencial, na sala do CAGP, em 25 e 26/11, das 17h às 22h30. Com o app no celular, o horário fica à mão.
                        </p>

                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="py-2 px-3.5 rounded-lg border-3 border-border bg-background hover:bg-[#E7E5E4] font-mono text-xs font-bold text-foreground cursor-pointer inline-flex items-center gap-2 shadow-sm transition-transform active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <i className={`bi ${copiedLink ? 'bi-check-lg text-green-700' : 'bi-link-45deg'}`} aria-hidden="true" />
                          <span>{copiedLink ? 'LINK COPIADO COM SUCESSO' : 'COPIAR LINK DO APLICATIVO'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ETAPA 3: RADAR ELEITORAL & NOTIFICAÇÕES (ZERO EMOJIS)     */}
          {/* ========================================================= */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
                  Etapa 3 · Lembretes
                </span>
                <h2 className="font-heading text-lg sm:text-2xl font-black text-foreground m-0">
                  Datas da eleição e lembretes
                </h2>
              </div>

              {/* Box de Cronograma Normativo Oficial */}
              <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-[#FFFBEB] shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b-2 border-warning pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black uppercase bg-warning text-white px-2 py-0.5 rounded">
                      EDITAL DE 04/11/2026
                    </span>
                    <span className="font-heading text-xs font-black uppercase text-[#92400E]">
                      Calendário de Votação
                    </span>
                  </div>
                  <span className="cagp-stamp-badge is-homologado text-xs">
                    ARTS. 14 E 20
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border-2 border-border shadow-sm">
                    <span className="font-mono text-xs font-bold uppercase text-secondary block">
                      24/11/2026 • 18h00
                    </span>
                    <strong className="font-heading text-xs uppercase font-black text-foreground block mt-0.5">
                      Debate das Chapas Concorrentes
                    </strong>
                    <span className="text-xs text-muted-foreground block mt-1">
                      Local a ser definido pela Junta Eleitoral (Art. 14).
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border-2 border-border shadow-sm">
                    <span className="font-mono text-xs font-bold uppercase text-success block">
                      25 e 26/11/2026 • 17h às 22h30
                    </span>
                    <strong className="font-heading text-xs uppercase font-black text-foreground block mt-0.5">
                      Votação presencial na sala do CAGP
                    </strong>
                    <span className="text-xs text-muted-foreground block mt-1">
                      Voto secreto e direto (Art. 20). Vota quem está matriculado em Gestão Pública.
                    </span>
                  </div>
                </div>
              </div>

              {/* Bloco 1: Permissão de Notificações Web */}
              <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-white shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xs sm:text-sm font-black text-foreground m-0">
                    1. Avisos no celular
                  </h3>
                  {notifState === 'granted' ? (
                    <span className="cagp-stamp-badge is-deferido text-xs">
                      AUTORIZADO
                    </span>
                  ) : (
                    <span className="font-mono text-xs font-bold uppercase bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded border border-border">
                      PENDENTE
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground m-0 leading-relaxed">
                  Se quiser, autorize notificações para a Chapa Semente te lembrar do debate e da votação. Dá para desligar depois nas configurações do navegador.
                </p>

                <button
                  type="button"
                  onClick={handleRequestNotification}
                  disabled={notifState === 'granted'}
                  className={`w-full py-3.5 px-4 rounded-xl border-3 border-border font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                    notifState === 'granted'
                      ? 'bg-success-tint text-success border-success cursor-default'
                      : 'bg-primary hover:bg-[#48206C] text-white shadow-md active:translate-x-0.5 active:translate-y-0.5'
                  }`}
                >
                  <i className={`bi ${notifState === 'granted' ? 'bi-bell-fill' : 'bi-bell'} text-base`} aria-hidden="true" />
                  <span>{notifState === 'granted' ? 'NOTIFICAÇÕES ATIVADAS COM SUCESSO' : 'HABILITAR ALERTAS DA ELEIÇÃO NO DISPOSITIVO'}</span>
                </button>
              </div>

              {/* Bloco 2: Lembrete na Agenda .ics */}
              <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-white shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xs sm:text-sm font-black text-foreground m-0">
                    2. Compromisso na Agenda (.ics)
                  </h3>
                  {calendarSaved && (
                    <span className="cagp-stamp-badge is-deferido text-xs">
                      SALVO NA AGENDA
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground m-0 leading-relaxed">
                  Baixe um lembrete com alarme de 15 minutos para Google Agenda, Apple Calendar ou Outlook.
                </p>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="w-full py-3 px-4 rounded-xl border-3 border-border bg-background hover:bg-[#E7E5E4] font-heading font-black text-xs uppercase text-foreground shadow cursor-pointer flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <i className="bi bi-calendar-check text-base" aria-hidden="true" />
                  <span>EXPORTAR HORÁRIO DE VOTAÇÃO PARA O CALENDÁRIO</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* ETAPA 4: PASSAPORTE & MOBILIZAÇÃO WHATSAPP (ZERO EMOJIS)  */}
          {/* ========================================================= */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary block">
                  Etapa 4 · Seu lembrete
                </span>
                <h2 className="font-heading text-lg sm:text-2xl font-black text-foreground m-0">
                  Quando você pretende votar?
                </h2>
              </div>

              {/* Seletor de Turno de Voto */}
              <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-white shadow-lg space-y-3">
                <label className="font-heading text-xs font-black uppercase text-foreground block">
                  Escolha o turno do lembrete. A votação é na sala do CAGP:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: '25_noite', dia: 'QUA 25/NOV', turno: 'NOITE', horas: '17h às 22h30' },
                    { id: '26_tarde', dia: 'QUI 26/NOV', turno: 'TARDE', horas: '17h às 19h00' },
                    { id: '26_noite', dia: 'QUI 26/NOV', turno: 'NOITE', horas: '19h às 22h30' },
                  ].map(({ id, dia, turno, horas }) => {
                    const isSelected = selectedTurno === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedTurno(id as ElectionActivation['votedDateChoice'])}
                        className={`p-3 rounded-xl border-2 border-border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary text-white shadow-md scale-[1.02]'
                            : 'bg-card text-foreground hover:bg-background shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-black uppercase tracking-wider">
                            {dia}
                          </span>
                          {isSelected && <i className="bi bi-check-circle-fill text-xs text-[#FFD6A5]" aria-hidden="true" />}
                        </div>
                        <span className="font-heading text-sm font-black uppercase block mt-1">
                          TURNO {turno}
                        </span>
                        <span className={`font-mono text-xs block mt-0.5 ${isSelected ? 'text-[#FFD6A5]' : 'text-[#78716C]'}`}>
                          {horas}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grande Carimbo Burocrático Oficial da Chapa Semente */}
              <div className="py-2 flex justify-center">
                <div className="cagp-big-stamp is-semente w-full max-w-md text-center py-4 px-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <img
                      src={asset('/logos/semente/semente-simbolo.webp')}
                      alt=""
                      aria-hidden="true"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="cagp-big-stamp-title tracking-wider">CHAPA SEMENTE 2026</span>
                  </div>
                  <span className="cagp-big-stamp-sub">ELEITOR HOMOLOGADO • FAFICH/UFMG</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-primary mt-2 block border-t border-primary/30 pt-1">
                    POTENCIAL QUE SE TRANSFORMA EM AÇÃO
                  </span>
                </div>
              </div>

              {/* Convocação Viral no WhatsApp (Zero Emojis, Ícone Oficial) */}
              <div className="p-4 sm:p-5 rounded-2xl border-4 border-border bg-success-tint shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b-2 border-success pb-2">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-whatsapp text-success text-lg" aria-hidden="true" />
                    <h3 className="font-heading text-xs sm:text-sm font-black text-[#14532D] m-0">
                      Mobilização da Turma de Gestão Pública
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase bg-success text-white px-2 py-0.5 rounded">
                    CONVITE COLETIVO
                  </span>
                </div>

                <p className="text-xs text-[#166534] m-0 leading-relaxed">
                  Envie o convite formatado com o link de acesso ao Super App para seus grupos de sala da FAFICH e fortaleça a Chapa Semente nas urnas:
                </p>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-foreground border-3 border-border font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-2.5 transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                  <i className="bi bi-whatsapp text-lg" aria-hidden="true" />
                  <span>CONVOCAR COLEGAS DE SALA NO WHATSAPP</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 6. BARRA INFERIOR FIXA DE CONTROLE E AVANÇO */}
      <footer className="p-3.5 sm:p-4 bg-white border-t-3 border-border flex items-center justify-between gap-3 shrink-0 shadow-lg">
        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl border-3 border-border bg-background hover:bg-[#E7E5E4] font-heading font-black text-xs uppercase text-foreground cursor-pointer transition-transform active:translate-x-0.5 active:translate-y-0.5 shadow-sm"
            >
              RETROCEDER
            </button>
          )}

          <span className="hidden sm:inline-block font-mono text-xs font-bold text-[#78716C] px-1">
            TUDO AQUI É OPCIONAL
          </span>
        </div>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="py-3 px-6 rounded-xl bg-primary hover:bg-[#48206C] text-white border-3 border-border font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <span>PROSSEGUIR</span>
            <i className="bi bi-arrow-right text-base" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCompleteActivation}
            className="py-3 px-6 rounded-xl bg-secondary hover:bg-[#721824] text-white border-3 border-border font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer flex items-center gap-2"
          >
            <i className="bi bi-check2-circle text-base" aria-hidden="true" />
            <span>CONCLUIR E VOLTAR AO SITE</span>
          </button>
        )}
      </footer>
    </div>
  );
};
