import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getVaultItem,
  setVaultItem,
  suggestRoleFromPeriod,
  USER_ROLE_META,
  type UserRole,
} from '@/lib/storage/studentVault';
import { CagpIcon, type CagpIconName } from '@/components/ui/CagpIcon';
import { Tour, type TourStep } from '@/components/ui/tour';
import { bounceSpring, staggerContainer, staggerItem, tactileSpring } from '@/lib/motion';

const TOUR_STEPS: TourStep[] = [
  {
    target: '#main-content',
    title: 'A Proposta da Chapa Semente Materializada para Você!',
    description: 'Bem-vindo ao SuperApp do CAGP (Proposta 3 do Eixo 1): plataforma estudantil completa entregue antes mesmo da urna para transformar o cotidiano de Gestão Pública na FAFICH/UFMG.',
    placement: 'center',
  },
  {
    target: '#cagp-home-menu-btn, #cagp-mobile-menu-btn, #cagp-desktop-sidebar',
    title: 'Menu & 7 Eixos de Ferramentas Reais',
    description: 'Acesse matriz curricular, calculadora das 600h (ACG/Extensão), gerador de requerimentos, guia de estágio, FUMP e prestação de contas.',
    placement: 'right',
  },
  {
    target: '#cagp-home-spotlight-btn, #cagp-btn-spotlight, #cagp-home-spotlight-mobile-btn, #cagp-sidebar-search-btn',
    title: 'Busca Universal Instantânea (⌘K / Ctrl+K)',
    description: 'Encontre qualquer disciplina, resolução, sala da FAFICH ou proposta da Chapa Semente em milissegundos.',
    placement: 'bottom',
  },
  {
    target: '#cagp-home-passport-btn, #cagp-btn-passport, #cagp-sidebar-passport-btn',
    title: 'Passaporte Discente & Cofre Offline',
    description: 'Acompanhe seu progresso rumo ao diploma, desbloqueie carimbos oficiais e guarde seus dados 100% no seu aparelho.',
    placement: 'bottom',
  },
];

const ROLE_OPTIONS: { role: UserRole; icon: CagpIconName }[] = [
  { role: 'calouro', icon: 'checklist' },
  { role: 'veterano', icon: 'curriculo' },
  { role: 'formando', icon: 'curso' },
  { role: 'ingressar', icon: 'door-open' },
];

export const SuperAppWelcomeModal: React.FC = () => {
  const [showTip, setShowTip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('calouro');

  useEffect(() => {
    const profile = getVaultItem('cagp_student_profile_v1');
    const savedRole = localStorage.getItem('cagp_user_role_v1');
    if (savedRole) {
      setSelectedRole(getVaultItem('cagp_user_role_v1'));
    } else {
      const suggested = suggestRoleFromPeriod(profile.period || '1º Período');
      setSelectedRole(suggested);
    }

    // Não abre o tour automaticamente no primeiro acesso para evitar
    // colisão com o credenciamento eleitoral e sobreposição de modais.
  }, []);

  useEffect(() => {
    const handleOpenPicker = () => {
      setSelectedRole(getVaultItem('cagp_user_role_v1'));
      setShowTip(false);
      setIsModalOpen(true);
    };
    const handleStartTour = () => {
      setShowTip(false);
      setIsModalOpen(false);
      setIsTourOpen(true);
    };
    window.addEventListener('cagp:open-role-picker', handleOpenPicker);
    window.addEventListener('cagp:start-tour', handleStartTour);
    return () => {
      window.removeEventListener('cagp:open-role-picker', handleOpenPicker);
      window.removeEventListener('cagp:start-tour', handleStartTour);
    };
  }, []);

  const handleTourComplete = () => {
    setIsTourOpen(false);
    setIsModalOpen(true);
  };

  const handleTourSkip = () => {
    setIsTourOpen(false);
    setShowTip(true);
  };

  const handleConfirmRole = (roleToSave: UserRole) => {
    setSelectedRole(roleToSave);
    setVaultItem('cagp_user_role_v1', roleToSave);
    setVaultItem('cagp_onboarding_completed_v1', true);
    setShowTip(false);
    setIsModalOpen(false);
  };

  const handleDismiss = () => {
    setShowTip(false);
    setIsModalOpen(false);
    setVaultItem('cagp_onboarding_completed_v1', true);
  };

  return (
    <>
      {/* 1. Card Flutuante Compacto de Boas-Vindas e Escolha de Perfil */}
      <AnimatePresence>
        {showTip && !isModalOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={bounceSpring}
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-5 right-3 md:right-6 z-[1045] max-w-md w-[calc(100vw-1.5rem)] bg-white border-3 border-border rounded-2xl shadow-lg p-4"
            aria-label="Escolha seu perfil no Super App CAGP"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary text-white border-2 border-border shadow-xs flex items-center justify-center shrink-0">
                  <CagpIcon name="hoje" className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-primary block">
                    Proposta Materializada • Chapa Semente
                  </span>
                  <h2 className="font-heading text-sm font-black text-foreground leading-tight m-0">
                    Qual é o seu momento no curso?
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="w-8 h-8 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground flex items-center justify-center cursor-pointer shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                aria-label="Fechar aviso"
              >
                <CagpIcon name="close" className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {ROLE_OPTIONS.map(({ role, icon }) => {
                const meta = USER_ROLE_META[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleConfirmRole(role)}
                    className={`p-2.5 rounded-xl border-2 border-border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[64px] active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                      isSelected
                        ? 'bg-primary text-white shadow'
                        : 'bg-white hover:bg-muted text-foreground shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-heading font-black uppercase">{meta.label}</span>
                      <CagpIcon name={icon} className={`w-4 h-4 shrink-0 ${isSelected ? 'text-accent' : 'text-primary'}`} />
                    </div>
                    <span className={`text-xs font-mono font-bold mt-1 block ${isSelected ? 'text-white' : 'text-muted-foreground'}`}>
                      {meta.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs pt-2.5 border-t-2 border-border">
              <button
                type="button"
                onClick={() => {
                  setShowTip(false);
                  setIsTourOpen(true);
                }}
                className="font-heading font-black uppercase text-primary hover:underline cursor-pointer bg-transparent border-0 p-0 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                Iniciar Tour Guiado
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTip(false);
                  setIsModalOpen(true);
                }}
                className="font-mono font-bold text-foreground hover:underline cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                Detalhes dos perfis &rarr;
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Modal Completo de Escolha de Perfil Discente (BoldKit + Neobrutalism) */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-3 sm:p-4 select-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-role-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={bounceSpring}
              className="w-full max-w-xl bg-white border-3 border-border rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Faixa Superior Semente */}
              <div className="bg-primary text-white px-5 py-3.5 border-b-3 border-border flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-accent text-foreground font-mono font-bold text-xs uppercase border-2 border-border shadow-xs">
                    Proposta 3 • Eixo 1
                  </span>
                  <span className="font-mono text-xs font-bold uppercase text-white">
                    A Proposta da Chapa Semente Materializada para Você
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-8 h-8 rounded-lg bg-white text-foreground border-2 border-border shadow-xs hover:bg-accent flex items-center justify-center cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                  aria-label="Fechar modal"
                >
                  <CagpIcon name="close" className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
                <div>
                  <h2
                    id="onboarding-role-title"
                    className="font-heading text-xl sm:text-2xl font-black text-foreground leading-tight m-0"
                  >
                    Escolha seu Perfil de Jornada na FAFICH
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 m-0 leading-relaxed font-sans">
                    Personalizamos os atalhos, prazos e ferramentas prioritárias para o seu momento no curso. Seus dados ficam 100% salvos no seu aparelho.
                  </p>
                </div>

                <motion.div
                  variants={staggerContainer(0.06)}
                  initial="hidden"
                  animate="show"
                  className="space-y-2.5"
                >
                  {ROLE_OPTIONS.map(({ role, icon }) => {
                    const meta = USER_ROLE_META[role];
                    const isSelected = selectedRole === role;
                    return (
                      <motion.button
                        key={role}
                        variants={staggerItem}
                        whileHover={{ x: -2, y: -2 }}
                        whileTap={{ x: 2, y: 2 }}
                        transition={tactileSpring}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`w-full p-3.5 rounded-xl border-3 border-border text-left transition-colors cursor-pointer flex items-start gap-3.5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                          isSelected
                            ? 'bg-[#ffffff] shadow-[6px_6px_0_0_var(--color-primary)]'
                            : 'bg-white hover:bg-muted shadow-md'
                        }`}
                      >
                        <span
                          className={`w-11 h-11 rounded-xl border-2 border-border flex items-center justify-center shrink-0 shadow-xs ${
                            isSelected
                              ? 'bg-primary text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <CagpIcon name={icon} className="w-5 h-5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-sm font-heading font-black uppercase text-foreground">
                              {meta.label}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {isSelected && (
                                <span className="px-2 py-0.5 rounded bg-accent text-foreground font-mono font-bold text-xs uppercase border border-border">
                                  SELECIONADO
                                </span>
                              )}
                              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted border border-border text-foreground">
                                {meta.badge}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 mb-0 leading-snug font-sans">
                            {meta.tagline}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <div className="pt-3 border-t-3 border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleConfirmRole(selectedRole);
                      setIsTourOpen(true);
                    }}
                    className="min-h-[44px] px-4 py-2 rounded-xl border-3 border-border bg-card hover:bg-accent text-foreground text-xs font-heading uppercase font-black shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                  >
                    Iniciar Tour Guiado (4 Paradas)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmRole(selectedRole)}
                    className="min-h-[44px] px-5 py-2.5 bg-primary hover:bg-primary-hover text-white border-3 border-border rounded-xl font-heading text-xs uppercase font-black tracking-wider flex items-center justify-center gap-2 shadow-md active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                  >
                    <span>Confirmar Perfil</span>
                    <CagpIcon name="check" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tour Guiado do SuperApp */}
      <Tour
        steps={TOUR_STEPS}
        open={isTourOpen}
        onOpenChange={setIsTourOpen}
        onComplete={handleTourComplete}
        onSkip={handleTourSkip}
        showSkipButton={true}
        showProgress={true}
      />
    </>
  );
};
