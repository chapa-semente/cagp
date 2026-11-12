// src/components/features/pwa/PwaCredenciamentoPill.tsx — Botão "Sou Semente" (One Float Rule).
// Só para quem terminou o tour declarando voto. Fica recolhido: um quadrado de 48px com o símbolo
// da Semente, acima da barra inferior. Ao tocar, abre o convite (como votar, chamar a turma no
// WhatsApp, esconder nesta sessão). Some ao rolar para baixo e volta ao rolar para cima.

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, type ElectionActivation } from '@/lib/storage/studentVault';
import { getWhatsAppShareData } from '@/lib/pwa/pwaManager';
import { tactileSpring } from '@/lib/motion';
import { asset, route } from '@/lib/paths';
import { CHAPA_NUMERO } from '@/lib/chapaSementeData';
import { navigate } from 'astro:transitions/client';

export const PwaCredenciamentoPill: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [activation, setActivation] = useState<ElectionActivation | null>(null);
  const [studentName, setStudentName] = useState('Estudante de Gestão Pública');
  const [isDismissed, setIsDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  // Some enquanto o estudante rola para baixo lendo (no celular cobria o conteúdo) e volta ao rolar para cima.
  const [tucked, setTucked] = useState(false);
  // Só aparece a partir da 2ª página vista na sessão: na chegada (geralmente a home)
  // o estudante vê o herói da Chapa sem a pílula cobrindo o primeiro atalho.
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) < 8) return;
        setTucked(y > lastY && y > 160);
        lastY = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const syncState = () => {
    try {
      const act = getVaultItem('cagp_election_activation_v1');
      setActivation(act);
      const profile = getVaultItem('cagp_student_profile_v1');
      if (profile && profile.name) {
        setStudentName(profile.name);
      }
    } catch (e) {
      console.warn('[PWA] Erro ao sincronizar estado da pílula:', e);
    }
  };

  useEffect(() => {
    setMounted(true);
    syncState();
    if (typeof window !== 'undefined') {
      try {
        const dismissed = sessionStorage.getItem('cagp_pill_dismissed_v1');
        if (dismissed === 'true') {
          setIsDismissed(true);
        }
        const views = Number(sessionStorage.getItem('cagp_page_views_v1') || '0') + 1;
        sessionStorage.setItem('cagp_page_views_v1', String(views));
        setEligible(views >= 2);
      } catch {
        // sessionStorage bloqueado: mantém a pílula escondida em vez de cobrir conteúdo
      }
    }
    window.addEventListener('cagp:vault-updated', syncState);
    return () => window.removeEventListener('cagp:vault-updated', syncState);
  }, []);

  // One Float Rule (DESIGN.md › Layout): enquanto a pílula está visível, o "voltar ao topo" some no celular.
  useEffect(() => {
    const root = document.documentElement;
    const supporter = Boolean(activation?.completed && activation?.sementeSupporter);
    const visible = mounted && eligible && supporter && !isDismissed && !tucked;
    if (visible) root.dataset.floatPill = '1';
    else delete root.dataset.floatPill;
    return () => {
      delete root.dataset.floatPill;
    };
  }, [mounted, eligible, activation, isDismissed, tucked]);

  // O credenciamento virou o fechamento do tour obrigatório; a pílula leva a "quando e onde votar".
  const handleOpenCredenciamento = () => {
    setOpen(false);
    navigate(route('/gestao'));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { url } = getWhatsAppShareData(studentName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cagp_pill_dismissed_v1', 'true');
    }
  };

  // Só quem terminou o tour declarando voto vê a pílula (One Float Rule: ninguém mais disputa o rodapé).
  const isCompleted = Boolean(activation?.completed && activation?.sementeSupporter);
  const visible = !isDismissed && eligible && isCompleted;

  // Com a pílula na tela, a página ganha folga no fim (o último botão sobe acima dela)
  // e o "voltar ao topo" cede o lugar (One Float Rule).
  useEffect(() => {
    document.documentElement.classList.toggle('cagp-has-float', visible);
    return () => document.documentElement.classList.remove('cagp-has-float');
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('[aria-label="Chapa Semente: lembrete da votação"]')) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  if (!visible) return null;

  const content = (
    <AnimatePresence>
      <motion.aside
        key="cagp-semente-floating-pill"
        aria-label="Chapa Semente: lembrete da votação"
        initial={{ opacity: 0, y: 16 }}
        animate={tucked && !open ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
        aria-hidden={(tucked && !open) || undefined}
        exit={{ opacity: 0, y: 16 }}
        transition={tactileSpring}
        style={{ position: 'fixed', top: 'auto' }}
        className={`fixed ${tucked && !open ? 'pointer-events-none' : ''} bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:bottom-5 xl:bottom-6 left-3 md:left-[108px] xl:left-[288px] z-[1070] select-none`}
      >
        {/* Recolhida: só o símbolo da Semente. Ao tocar, o convite abre por cima (e fecha com Esc ou toque fora). */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="cagp-semente-convite"
              role="dialog"
              aria-label="Convite da Chapa Semente"
              initial={{ opacity: 0, y: 12, clipPath: 'inset(100% 0 0 0 round 16px)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 16px)' }}
              exit={{ opacity: 0, y: 8, clipPath: 'inset(100% 0 0 0 round 16px)' }}
              transition={tactileSpring}
              className="absolute bottom-[calc(100%+0.75rem)] left-0 w-[min(20rem,calc(100vw-1.5rem))] p-4 rounded-2xl bg-primary text-white border-3 border-border shadow-xl space-y-3"
            >
              <p className="m-0 font-heading font-bold text-lg leading-tight">Você é Semente.</p>
              <p className="m-0 text-sm text-white">Nosso número é o <strong>{CHAPA_NUMERO}</strong>. Votação dia 25 e 26/11, das 17h às 22h30, na sala do CAGP.</p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleOpenCredenciamento}
                  className="min-h-[44px] px-4 rounded-xl bg-accent text-accent-foreground border-2 border-border shadow-sm font-heading font-bold text-sm uppercase tracking-[0.03em] cursor-pointer inline-flex items-center justify-center gap-2 transition-[transform,box-shadow] duration-(--duration-press) ease-(--ease-spring-snappy) active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  Como votar <i className="bi bi-arrow-right" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="min-h-[44px] px-4 rounded-xl bg-white text-foreground border-2 border-border shadow-sm font-heading font-bold text-sm cursor-pointer inline-flex items-center justify-center gap-2 transition-[transform,box-shadow] duration-(--duration-press) ease-(--ease-spring-snappy) active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <i className="bi bi-whatsapp" aria-hidden="true" /> Chamar a turma
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="min-h-[44px] px-2 bg-transparent border-0 text-white text-sm font-bold underline underline-offset-[0.22em] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Esconder por agora
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="cagp-semente-convite"
          aria-label={open ? 'Fechar convite da Chapa Semente' : 'Abrir convite da Chapa Semente'}
          className={`w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center cursor-pointer transition-[transform,box-shadow,background-color] duration-(--duration-press) ease-(--ease-spring-snappy) hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            open ? 'bg-primary shadow-none translate-x-0.5 translate-y-0.5' : 'bg-white shadow-md hover:shadow-lg'
          }`}
        >
          <img
            src={asset(open ? '/logos/semente/semente-simbolo-branco.webp' : '/logos/semente/semente-simbolo.webp')}
            alt=""
            aria-hidden="true"
            width={466}
            height={603}
            className="h-7 w-auto"
          />
        </button>
      </motion.aside>
    </AnimatePresence>
  );

  // No cliente, monta via portal no document.body para garantir isolamento contra transforms;
  // No SSR, renderiza diretamente para garantir presença imediata no HTML inicial.
  if (mounted && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};
