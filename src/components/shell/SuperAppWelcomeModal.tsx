import React, { useState, useEffect } from 'react';
import { getVaultItem, setVaultItem } from '../../lib/storage/studentVault';

export const SuperAppWelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    // Verifica se o estudante já completou o onboarding inicial
    const completed = getVaultItem('cagp_onboarding_completed_v1');
    if (!completed) {
      // Pequeno delay para a página renderizar suavemente
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFinish = () => {
    setIsOpen(false);
    setVaultItem('cagp_onboarding_completed_v1', true);
  };

  if (!isOpen) return null;

  const slides = [
    {
      icon: 'bi-compass-fill',
      iconColor: 'bg-[#8B1E2D]',
      tag: 'Bem-vindo ao Super App Discente',
      title: 'Toda a sua Graduação em um Só Lugar',
      description:
        'Criado pelo Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG) para descomplicar sua rotina acadêmica: matriz curricular de 10 semestres, calculadora de 600h, guardião de prazos e normas oficiais.',
    },
    {
      icon: 'bi-shield-check',
      iconColor: 'bg-[#15803D]',
      tag: 'Privacidade & Custo Zero',
      title: '100% Seguro no seu Próprio Dispositivo',
      description:
        'Não há cadastro, senhas ou servidores remotos. Suas matérias marcadas, certificados e cálculos de horas ficam salvos exclusivamente no armazenamento local seguro do seu navegador e funcionam 100% offline.',
    },
    {
      icon: 'bi-diagram-3-fill',
      iconColor: 'bg-[#005A9C]',
      tag: 'Navegação por Centrais',
      title: 'Pílulas Táteis & Grafo Dinâmico',
      description:
        'Use as pílulas táteis no topo de cada tela para alternar entre simuladores e regras normativas. No Grafo 10P, você pode inclusive adicionar optativas livres de outros departamentos da UFMG!',
    },
  ];

  const current = slides[slide];

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="w-full max-w-md bg-white border-2 border-[#0A0A0A] rounded-2xl shadow-[5px_5px_0px_#0A0A0A] p-6 space-y-5 flex flex-col justify-between">
        <div>
          {/* Header do Card */}
          <div className="flex items-center justify-between mb-4">
            <span className={`w-12 h-12 rounded-xl ${current.iconColor} text-white flex items-center justify-center text-2xl shadow-xs`}>
              <i className={`bi ${current.icon}`} aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={handleFinish}
              className="px-2.5 py-1 text-xs font-['Oswald'] uppercase font-bold text-gray-500 hover:text-[#0A0A0A] hover:bg-[#F7F5F0] rounded border border-transparent hover:border-[#DFDBD2]"
            >
              Pular Introdução
            </button>
          </div>

          <span className="text-[11px] font-['Oswald'] uppercase font-bold tracking-wider text-[#8B1E2D] block mb-1">
            {current.tag}
          </span>
          <h2 id="onboarding-title" className="font-['Oswald'] text-xl font-bold uppercase text-[#0A0A0A] leading-tight mb-2">
            {current.title}
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Indicadores de Progresso & Ações */}
        <div className="pt-4 border-t border-[#DFDBD2] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === slide ? 'w-6 bg-[#0A0A0A]' : 'w-2 bg-[#DFDBD2]'
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-gray-500">
              {slide + 1} de {slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {slide > 0 && (
              <button
                type="button"
                onClick={() => setSlide(slide - 1)}
                className="min-h-[44px] px-4 py-2 bg-[#F7F5F0] hover:bg-[#EAE6DE] border border-[#DFDBD2] rounded-lg text-xs font-['Oswald'] uppercase font-bold text-gray-700 transition-all"
              >
                Voltar
              </button>
            )}

            {slide < slides.length - 1 ? (
              <button
                type="button"
                onClick={() => setSlide(slide + 1)}
                className="flex-1 min-h-[44px] px-5 py-2 bg-[#0A0A0A] text-white hover:bg-[#8B1E2D] rounded-lg font-['Oswald'] text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_#0A0A0A]"
              >
                <span>Próximo Passo</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 min-h-[44px] px-5 py-2 bg-[#8B1E2D] text-white hover:bg-[#0A0A0A] rounded-lg font-['Oswald'] text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_#0A0A0A]"
              >
                <span>Começar a Explorar</span>
                <i className="bi bi-rocket-takeoff-fill" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
