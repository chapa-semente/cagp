import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  setVaultItem,
  suggestRoleFromPeriod,
  USER_ROLE_META,
  type UserRole,
} from '../../lib/storage/studentVault';
import { CagpIcon, type CagpIconName } from '../ui/CagpIcon';

const ROLE_OPTIONS: { role: UserRole; icon: CagpIconName }[] = [
  { role: 'calouro', icon: 'checklist' },
  { role: 'veterano', icon: 'curriculo' },
  { role: 'formando', icon: 'curso' },
  { role: 'ingressar', icon: 'door-open' },
];

export const SuperAppWelcomeModal: React.FC = () => {
  const [showTip, setShowTip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    const completed = getVaultItem('cagp_onboarding_completed_v1');
    if (!completed) {
      const timer = setTimeout(() => setShowTip(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpenPicker = () => {
      setSelectedRole(getVaultItem('cagp_user_role_v1'));
      setShowTip(false);
      setIsModalOpen(true);
    };
    window.addEventListener('cagp:open-role-picker', handleOpenPicker);
    return () => window.removeEventListener('cagp:open-role-picker', handleOpenPicker);
  }, []);

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
      {showTip && !isModalOpen && (
        <aside
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-5 right-3 md:right-6 z-[1045] max-w-md w-[calc(100vw-1.5rem)] bg-white border border-[#DFDBD2] rounded-3xl shadow-xl p-4 animate-in slide-in-from-bottom duration-250"
          aria-label="Escolha seu perfil no Super App CAGP"
        >
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8B1E2D] text-white flex items-center justify-center shrink-0">
                <CagpIcon name="hoje" className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-['Oswald'] text-sm font-bold uppercase text-[#0A0A0A] leading-tight m-0">
                  Qual é o seu momento no curso?
                </h2>
                <p className="text-xs text-[#57534E] m-0 mt-0.5">
                  Adaptamos a tela inicial para a sua fase (salvo apenas no seu aparelho).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="w-7 h-7 rounded-full hover:bg-[#F4F1EA] text-[#57534E] flex items-center justify-center cursor-pointer border-0 bg-transparent shrink-0"
              aria-label="Fechar aviso"
            >
              <CagpIcon name="close" className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {ROLE_OPTIONS.map(({ role, icon }) => {
              const meta = USER_ROLE_META[role];
              const isSelected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleConfirmRole(role)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[60px] ${
                    isSelected
                      ? 'bg-[#8B1E2D]/8 border-[#8B1E2D] text-[#8B1E2D]'
                      : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] border-[#DFDBD2] text-[#292524]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold">{meta.label}</span>
                    <CagpIcon name={icon} className="w-4 h-4 shrink-0 text-[#8B1E2D]" />
                  </div>
                  <span className="text-[10px] text-[#57534E] font-medium mt-1 block">
                    {meta.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#57534E] pt-2 border-t border-[#DFDBD2]">
            <span>Zero login • 100% offline</span>
            <button
              type="button"
              onClick={() => {
                setShowTip(false);
                setIsModalOpen(true);
              }}
              className="font-bold text-[#8B1E2D] hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              Ver detalhes dos perfis &rarr;
            </button>
          </div>
        </aside>
      )}

      {/* 2. Modal Completo de Escolha de Perfil Discente */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/65 p-4 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-role-title"
        >
          <div className="w-full max-w-lg bg-white border border-[#DFDBD2] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="onboarding-role-title"
                  className="font-['Oswald'] text-xl font-bold uppercase text-[#0A0A0A] leading-tight m-0"
                >
                  Escolha seu perfil de navegação
                </h2>
                <p className="text-xs text-[#57534E] mt-1 m-0 leading-relaxed">
                  A Home prioriza prazos, checklists e atalhos diferentes para cada momento. Você pode trocar quando quiser no topo da Home ou no Passaporte.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="w-9 h-9 rounded-full bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-[#292524] flex items-center justify-center cursor-pointer shrink-0"
                aria-label="Fechar modal"
              >
                <CagpIcon name="close" className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {ROLE_OPTIONS.map(({ role, icon }) => {
                const meta = USER_ROLE_META[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-[#8B1E2D]/6 border-[#8B1E2D] ring-1 ring-[#8B1E2D]'
                        : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] border-[#DFDBD2]'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#8B1E2D] text-white'
                          : 'bg-white text-[#8B1E2D] border border-[#DFDBD2]'
                      }`}
                    >
                      <CagpIcon name={icon} className="w-5 h-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#0A0A0A]">{meta.label}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-[#DFDBD2] text-[#57534E]">
                          {meta.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] mt-1 mb-0 leading-snug">
                        {meta.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#DFDBD2] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#57534E] font-mono">
                Cofre Local • Sem servidor
              </span>
              <button
                type="button"
                onClick={() => handleConfirmRole(selectedRole)}
                className="min-h-[44px] px-5 py-2.5 bg-[#8B1E2D] hover:bg-[#6E1420] text-white rounded-xl font-['Oswald'] text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Confirmar Perfil</span>
                <CagpIcon name="check" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
