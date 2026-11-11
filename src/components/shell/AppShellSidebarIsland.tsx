import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { AXIS_REGISTRY, getAxisByPath, getActiveItemId, getAxisById } from '@/lib/navigationRegistry';
import { navigate } from 'astro:transitions/client';
import maisPedidos from '@/data/documentosMaisPedidos.json';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { resolveCagpIconName } from '@/lib/cagpIcons';
import { asset, route } from '@/lib/paths';
import { tactileSpring, drawerSpring } from '@/lib/motion';
import { getVaultItem, USER_ROLE_META } from '@/lib/storage/studentVault';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';

interface AppShellSidebarIslandProps {
  initialPath?: string;
}

const EXTERNAL_PORTALS = [
  {
    id: 'ext-minhaufmg',
    label: 'Portal minhaUFMG (Web Desktop)',
    desc: 'Matrícula semestral, histórico oficial e trancamento parcial',
    href: 'https://sistemas.ufmg.br',
    logo: asset('/logos/minhaufmg/logo-minha-ufmg.png'),
  },
  {
    id: 'ext-siga',
    label: 'SIGA UFMG (Sistema Acadêmico)',
    desc: 'Diário de classe, notas, integralização curricular e horários',
    href: 'https://sistemas.ufmg.br',
    logo: asset('/logos/siga/siga-ufmg-fundo-azul.webp'),
  },
  {
    id: 'ext-fump',
    label: 'FUMP — Permanência e Assistência Estudantil',
    desc: 'Questionário socioeconômico (Níveis I, II e III), RU e Moradia',
    href: 'https://www.fump.ufmg.br/',
    logo: asset('/logos/fump/03-fump-sinae-logo-colorido-fundo-branco.png'),
  },
  {
    id: 'ext-fafich',
    label: 'Site Oficial Gestão Pública FAFICH/UFMG',
    desc: 'Formulários, editais e comunicados da Coordenação do Curso',
    href: 'https://www.fafich.ufmg.br/gestaopublica',
    logo: asset('/logos/ufmg/aplicacoes/principal-ufmg.jpg'),
  },
];

// Ícones das abas (o eixo Chapa usa o símbolo oficial da Semente, não um ícone).
// Busca por palavras inteiras, sem acento: "tce" acha o TCE, não qualquer item com t-c-e espalhados.
const normalizeSearch = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function wordFilter(value: string, search: string, keywords?: string[]): number {
  const haystack = normalizeSearch(`${value} ${(keywords ?? []).join(' ')}`);
  const terms = normalizeSearch(search).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 1;
  if (!terms.every((t) => haystack.includes(t))) return 0;
  // Peso maior quando o termo aparece no começo (título) do valor.
  return terms.reduce((score, t) => score + (haystack.indexOf(t) < 40 ? 1 : 0.5), 0) / terms.length;
}

const SIDEBAR_ICONS: Record<string, string> = {
  hoje: 'hoje',
  guias: 'guias',
  curso: 'curso',
  mais: 'mais',
};

export const AppShellSidebarIsland: React.FC<AppShellSidebarIslandProps> = ({
  initialPath = '/',
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [tabletExpanded, setTabletExpanded] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [studentName, setStudentName] = useState('Seu perfil');
  const [studentPeriod, setStudentPeriod] = useState('Toque para escolher sua fase');

  const activeAxis = getAxisByPath(currentPath) || AXIS_REGISTRY[0];

  const syncLocalState = useCallback(() => {
    if (typeof window === 'undefined') return;
    setCurrentPath(window.location.pathname);

    // Mesmo modelo de Seu perfil: nome do perfil salvo e a fase do curso (cagp_user_role_v1).
    try {
      const profile = getVaultItem('cagp_student_profile_v1');
      const name = profile?.name?.trim();
      setStudentName(name && name !== 'Estudante de Gestão Pública' ? name : 'Seu perfil');
      const meta = USER_ROLE_META[getVaultItem('cagp_user_role_v1')];
      if (meta) setStudentPeriod(`${meta.shortLabel} · ${meta.badge}`);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    syncLocalState();

    const handlePageLoad = () => {
      syncLocalState();
      setMobileDrawerOpen(false);
      setTabletExpanded(false);
    };

    const handleOpenDrawer = () => {
      if (window.innerWidth < 768) {
        setMobileDrawerOpen(true);
      } else if (window.innerWidth < 1280) {
        setTabletExpanded((prev) => !prev);
      }
    };

    const handleOpenSpotlight = () => {
      setCommandOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }
      if (e.key === '/' && !commandOpen) {
        const target = e.target as HTMLElement | null;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
        if (!isInput) {
          e.preventDefault();
          setCommandOpen(true);
          return;
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileDrawerOpen((prev) => !prev);
        } else if (window.innerWidth < 1280) {
          setTabletExpanded((prev) => !prev);
        } else {
          setDesktopCollapsed((prev) => !prev);
        }
      }
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    window.addEventListener('cagp:open-drawer', handleOpenDrawer);
    window.addEventListener('cagp:open-sidebar', handleOpenDrawer);
    window.addEventListener('cagp:open-mais', handleOpenDrawer);
    window.addEventListener('cagp:open-spotlight', handleOpenSpotlight);
    window.addEventListener('cagp:passport-updated', syncLocalState);
    window.addEventListener('cagp:vault-updated', syncLocalState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      window.removeEventListener('cagp:open-drawer', handleOpenDrawer);
      window.removeEventListener('cagp:open-sidebar', handleOpenDrawer);
      window.removeEventListener('cagp:open-mais', handleOpenDrawer);
      window.removeEventListener('cagp:open-spotlight', handleOpenSpotlight);
      window.removeEventListener('cagp:passport-updated', syncLocalState);
      window.removeEventListener('cagp:vault-updated', syncLocalState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [syncLocalState]);

  const triggerEvent = (eventName: string) => {
    setMobileDrawerOpen(false);
    setTabletExpanded(false);
    setCommandOpen(false);
    window.dispatchEvent(new CustomEvent(eventName));
  };

  const navigateTo = (href: string) => {
    setMobileDrawerOpen(false);
    setTabletExpanded(false);
    setCommandOpen(false);
    navigate(href);
  };

  const renderSidebarNavigationContent = (isCompact = false, layoutScope = 'desktop') => (
    <div className="flex flex-col justify-between h-full bg-white text-foreground select-none">
      {/* Top Scrollable Area */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar p-3 xl:p-4 gap-3.5">
        {/* Brand Header (no drawer mobile o logo oficial já está no DrawerHeader) */}
        <div className={`${layoutScope === 'mobile-drawer' ? 'hidden' : 'flex'} items-center justify-between gap-2 pb-3 border-b-3 border-border`}>
          <a
            href={route('/chapa-semente')}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-background transition-all no-underline group min-w-0"
            title="Chapa Semente — Proposta Materializada para o CAGP UFMG"
          >
            {isCompact ? (
              <div className="w-10 h-10 rounded-xl bg-white text-foreground flex items-center justify-center shrink-0 border-3 border-border shadow-xs group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all p-1">
                <img
                  src={asset('/logos/semente/semente-simbolo.webp')}
                  alt="Chapa Semente"
                  width={466}
                  height={603}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <img
                  src={asset('/logos/semente/semente-horizontal.webp')}
                  alt="Chapa Gestão Pública Semente"
                  width={768}
                  height={229}
                  className="h-9 w-auto max-w-full block"
                />
                <div className="flex items-center gap-1 mt-1.5 truncate">
                  <span className="text-xs font-heading text-primary font-bold truncate">
                    Gestão Pública · UFMG
                  </span>
                  <img
                    src={asset('/logos/cagp/10_simbolo_transparente_positivo.svg')}
                    alt="CAGP"
                    className="w-3.5 h-3.5 object-contain inline-block shrink-0"
                  />
                </div>
              </div>
            )}
          </a>

          {!isCompact && (
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
                  setDesktopCollapsed(true);
                } else {
                  setTabletExpanded(false);
                }
              }}
              className="hidden md:flex w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-background hover:bg-card border-3 border-border shadow-xs items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
              title="Recolher barra lateral (Ctrl+B)"
            >
              <CagpIcon name={resolveCagpIconName('bi-chevron-left')} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search / Command Trigger */}
        <motion.button
          type="button"
          id="cagp-sidebar-search-btn"
          onClick={() => setCommandOpen(true)}
          whileHover={{ x: 2 }}
          whileTap={{ x: 2, y: 2 }}
          transition={tactileSpring}
          className={`w-full min-h-[44px] rounded-xl bg-background hover:bg-card border-3 border-border shadow-sm text-foreground flex items-center ${
            isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
          } transition-colors cursor-pointer`}
          title="Buscar (⌘K)"
        >
          <span className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wide truncate">
            <CagpIcon name="search" className="w-4 h-4 text-primary shrink-0" />
            {!isCompact && <span>Buscar (⌘K)</span>}
          </span>
          {!isCompact && (
            <kbd className="px-1.5 py-0.5 text-xs font-mono font-bold bg-white border-2 border-border rounded-md shadow-xs">
              ⌘K
            </kbd>
          )}
        </motion.button>

        {/* 5 Canonical Axes */}
        <div className="space-y-1.5" role="navigation" aria-label="Navegação principal">

          {AXIS_REGISTRY.map((axis) => {
            const isAxisActive = activeAxis.id === axis.id;
            return (
              <div key={axis.id} className="space-y-1">
                <TooltipProvider delayDuration={150}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={axis.rootHref}
                        whileHover={{ x: 4 }}
                        whileTap={{ x: 2, y: 2 }}
                        transition={tactileSpring}
                        data-nav-axis={axis.id}
                        className={`cagp-nav-link ${isAxisActive ? 'is-active' : ''} relative overflow-hidden flex items-center min-h-[44px] ${
                          isCompact ? 'justify-center px-1 py-2' : 'justify-between px-3 py-2.5'
                        } rounded-xl border-3 transition-colors no-underline ${
                          isAxisActive
                            ? 'text-white border-border shadow-md font-extrabold'
                            : 'bg-white hover:bg-background text-foreground border-border hover:border-border hover:shadow-xs font-bold'
                        }`}
                      >
                        {isAxisActive && (
                          <motion.span
                            layoutId={layoutScope === 'desktop' ? 'sidebar-active-indicator' : `sidebar-active-indicator-${layoutScope}`}
                            transition={tactileSpring}
                            data-nav-axis={axis.id}
                            className="cagp-nav-fill absolute inset-0 bg-primary -z-0"
                            aria-hidden="true"
                          />
                        )}
                        <div className={`relative z-10 flex min-w-0 ${isCompact ? 'flex-col items-center gap-1' : 'items-center gap-2.5'}`}>
                          <span
                            data-nav-axis={isAxisActive ? undefined : axis.id}
                            className={`cagp-nav-chip w-7 h-7 rounded-lg flex items-center justify-center border-2 shrink-0 ${
                              isAxisActive ? 'bg-white text-foreground border-border' : 'bg-background text-foreground border-border'
                            }`}
                          >
                            {axis.id === 'chapa' ? (
                              <img
                                src={asset('/logos/semente/semente-simbolo.webp')}
                                alt=""
                                width={466}
                                height={603}
                                className="h-5 w-auto"
                              />
                            ) : (
                              <CagpIcon name={resolveCagpIconName(SIDEBAR_ICONS[axis.id] ?? axis.icon)} className="w-4 h-4" />
                            )}
                          </span>
                          <span className={`font-heading uppercase ${isCompact ? 'text-[0.75rem] font-bold tracking-[0.01em] leading-tight text-center whitespace-normal' : 'text-xs tracking-[0.02em] truncate'}`}>
                            {isCompact ? axis.mobileLabel : axis.name}
                          </span>
                        </div>
                      </motion.a>
                    </TooltipTrigger>
                    {isCompact && (
                      <TooltipContent side="right" className="font-heading font-bold">
                        {axis.name} — {axis.tagline}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                {/* Sub-items for the active axis */}
                {!isCompact && isAxisActive && (
                  <div className="pl-3 ml-3 border-l-3 border-border space-y-1 py-1">
                    {axis.items.map((subItem) => {
                      const activeItemId = getActiveItemId(axis, currentPath);
                      const isSubActive = activeItemId === subItem.id;
                      return (
                        <motion.a
                          key={subItem.id}
                          href={subItem.href}
                          whileHover={{ x: 4 }}
                          whileTap={{ x: 2, y: 2 }}
                          transition={tactileSpring}
                          onClick={(e) => {
                            if (subItem.href.includes('#campus')) {
                              e.preventDefault();
                              triggerEvent('cagp:open-campus');
                            } else if (subItem.href.includes('#passaporte')) {
                              e.preventDefault();
                              triggerEvent('cagp:open-passport');
                            }
                          }}
                          className={`flex items-center justify-between px-2.5 py-2 min-h-[44px] rounded-lg text-xs transition-colors no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isSubActive
                              ? 'bg-active text-active-foreground font-bold border-2 border-border shadow-xs'
                              : 'text-content-secondary hover:text-foreground hover:bg-primary-tint font-bold'
                          }`}
                        >
                          <span className="truncate">{subItem.shortLabel || subItem.label}</span>
                          {subItem.badge && (
                            <Badge variant="accent" className="font-mono text-xs px-1.5 py-0.5">
                              {subItem.badge}
                            </Badge>
                          )}
                        </motion.a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Anchored Student Passport & Quick Tools */}
      <div className="p-3 border-t-3 border-border bg-card space-y-2.5 shrink-0">
        {!isCompact ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => triggerEvent('cagp:open-campus')}
              className="flex items-center justify-center gap-2 min-h-[44px] py-2 px-3 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-xs font-heading font-extrabold uppercase tracking-tight text-foreground cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              title="Horários do RU Setorial I/II e Circulares 3 e 4"
            >
              <CagpIcon name={resolveCagpIconName('bi-clock-history')} className="w-4 h-4 text-secondary shrink-0" />
              <span>Campus agora</span>
            </button>
            <a
              href={route('/configuracoes')}
              className="flex items-center justify-center gap-2 min-h-[44px] py-2 px-3 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-xs font-heading font-extrabold uppercase tracking-tight text-foreground no-underline cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              title="Configurações & Acessibilidade do Superapp"
            >
              <CagpIcon name="sliders" className="w-4 h-4 text-secondary shrink-0" />
              <span>Ajustes</span>
            </a>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 1280) {
                setDesktopCollapsed(false);
              } else {
                setTabletExpanded(true);
              }
            }}
            className="w-full min-h-[44px] p-2 rounded-xl bg-white border-3 border-border shadow-xs flex items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            title="Expandir Menu Lateral (Ctrl+B)"
          >
            <CagpIcon name="chevron-right" className="w-4 h-4" />
          </button>
        )}

        {/* Student Passport Card Trigger */}
        <motion.button
          type="button"
          id="cagp-sidebar-passport-btn"
          whileHover={{ x: 2 }}
          whileTap={{ x: 2, y: 2 }}
          transition={tactileSpring}
          onClick={() => triggerEvent('cagp:open-passport')}
          className={`w-full rounded-xl bg-primary text-white border-3 border-border shadow-sm flex items-center ${
            isCompact ? 'justify-center p-2' : 'justify-between p-2.5'
          } cursor-pointer transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:opacity-50 disabled:pointer-events-none`}
          title="Abrir Seu perfil"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-accent text-foreground border-3 border-border flex items-center justify-center font-heading font-black text-xs shrink-0">
              GP
            </div>
            {!isCompact && (
              <div className="text-left min-w-0">
                <span className="font-heading text-xs font-extrabold uppercase block truncate">
                  {studentName}
                </span>
                <span className="text-xs font-mono text-white block truncate">
                  {studentPeriod}
                </span>
              </div>
            )}
          </div>
          {!isCompact && (
            <Badge variant="accent" className="font-mono text-xs px-1.5 py-0.5 shrink-0">
              Perfil
            </Badge>
          )}
        </motion.button>
      </div>
    </div>
  );

  const renderMaisSheetContent = () => {
    const mais = getAxisById('mais');
    if (!mais) return null;
    const groups = mais.groups ?? [];
    return (
      <>
        <button
          type="button"
          onClick={() => triggerEvent('cagp:open-campus')}
          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-secondary-tint border-2 border-border text-left flex items-center gap-3 cursor-pointer"
        >
          <CagpIcon name="clock" className="w-5 h-5 text-secondary shrink-0" />
          <span className="flex flex-col min-w-0">
            <span className="font-heading text-sm font-bold">RU e circular agora</span>
            <span className="text-sm text-muted-foreground">Horários de hoje à noite no campus</span>
          </span>
        </button>

        {groups.map((group) => {
          const items = mais.items.filter((item) => item.group === group.id);
          if (items.length === 0) return null;
          return (
            <section key={group.id} aria-labelledby={`mais-${group.id}`} className="space-y-2">
              <h3 id={`mais-${group.id}`} className="font-heading text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground m-0">
                {group.title}
              </h3>
              <ul className="m-0 p-0 list-none border-2 border-border rounded-xl divide-y-2 divide-border bg-white overflow-hidden">
                {items.map((item) => {
                  const isActive = getActiveItemId(mais, currentPath) === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`min-h-[56px] px-4 py-3 flex items-center gap-3 no-underline text-foreground ${isActive ? 'bg-primary-tint' : 'hover:bg-background'}`}
                      >
                        <CagpIcon name={resolveCagpIconName(item.icon)} className="w-5 h-5 text-primary shrink-0" />
                        <span className="flex flex-col min-w-0 flex-1">
                          <span className="font-heading text-sm font-bold">{item.label}</span>
                          <span className="text-sm text-muted-foreground leading-snug">{item.description}</span>
                        </span>
                        <CagpIcon name="chevron-right" className="w-4 h-4 shrink-0 text-muted-foreground" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* 1. Desktop Permanent Sidebar (>= 1280px) com mola drawerSpring */}
      <motion.aside
        id="cagp-desktop-sidebar"
        aria-label="Navegação Principal Lateral Desktop"
        initial={false}
        animate={{ width: desktopCollapsed ? 88 : 264 }}
        transition={drawerSpring}
        className="cagp-sidebar-rail hidden xl:flex flex-col shrink-0 border-r-3 border-border bg-white sticky top-0 h-[100dvh] z-30 overflow-x-hidden"
      >
        {renderSidebarNavigationContent(desktopCollapsed, 'desktop')}
      </motion.aside>

      {/* 2. Tablet Compact Rail (768px - 1279px) */}
      <aside
        aria-label="Navegação Lateral Compacta Tablet"
        className="cagp-sidebar-rail hidden md:flex xl:hidden flex-col w-[88px] shrink-0 border-r-3 border-border bg-white sticky top-0 h-[100dvh] z-30 transition-all duration-200"
      >
        {renderSidebarNavigationContent(true, 'tablet-rail')}
      </aside>

      {/* Tablet Expanded Overlay Drawer (z-[1100] acima de CampaignBanner z-[1050]) */}
      {tabletExpanded && (
        <div className="fixed inset-0 z-[1100] hidden md:flex xl:hidden">
          <div
            className="fixed inset-0 bg-foreground/70 transition-opacity duration-200 animate-in fade-in"
            onClick={() => setTabletExpanded(false)}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={drawerSpring}
            className="relative z-10 w-[280px] h-full border-r-3 border-border bg-white shadow-[8px_0px_0px_var(--color-border,#1F1F1F)]"
          >
            {renderSidebarNavigationContent(false, 'tablet-drawer')}
          </motion.aside>
        </div>
      )}

      {/* 3. Painel "Mais" do celular (< 768px): abre pela aba Mais da barra inferior */}
      <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <DrawerContent className="z-[1100] max-h-[88dvh] bg-white border-t-3 border-border">
          <DrawerHeader className="border-b-3 border-border bg-card pb-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-left">
                <DrawerTitle className="m-0 font-heading text-lg font-bold">Mais</DrawerTitle>
                <DrawerDescription className="text-sm text-muted-foreground">
                  Carreira, CAGP, ouvidoria e ajustes.
                </DrawerDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setMobileDrawerOpen(false)}>
                Fechar
              </Button>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto max-h-[72dvh] p-4 space-y-5">{renderMaisSheetContent()}</div>
        </DrawerContent>
      </Drawer>

      {/* 4. Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Buscar no site"
        filter={wordFilter}
        description="Busque páginas, guias, documentos e portais da UFMG."
      >
        <CommandInput placeholder="Digite uma página, código DCP, estágio, FUMP, RU ou documento..." />
        <CommandList>
          <CommandEmpty>
            Nenhum resultado encontrado. Tente buscar por &quot;ACG&quot;, &quot;Estágio&quot;, &quot;Calouros&quot; ou &quot;Optativas&quot;.
          </CommandEmpty>

          <CommandGroup heading="Ações Rápidas & Painéis">
            <CommandItem
              value="Status do Campus Agora RU II Restaurante Universitário Ônibus Circular Noturno Plantão"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-campus');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-buildings')} className="w-4 h-4 text-success mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Status do Campus Agora • RU II &amp; Circulares
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Plantão noturno, horários de janta no RU e linhas de ônibus interno
                </span>
              </div>
              <CommandShortcut>Painel</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Seu perfil Passaporte carteirinha fase do curso backup outro celular"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-passport');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-person-badge')} className="w-4 h-4 text-primary mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Seu perfil
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Fase do curso, carteirinha e levar pro outro celular
                </span>
              </div>
              <CommandShortcut>Perfil</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Acessibilidade Alto Contraste Fonte OpenDyslexic Tamanho de Texto Configuracoes Ajustes"
              onSelect={() => {
                setCommandOpen(false);
                navigateTo(route('/configuracoes'));
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-universal-access')} className="w-4 h-4 text-accent mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Painel de Acessibilidade &amp; Preferências
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Ajustes de alto contraste, fonte para dislexia e tamanho de texto
                </span>
              </div>
              <CommandShortcut>A11y</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Eleições CAGP 2026 • Chapa Semente">
            <CommandItem
              value="Chapa Semente Carta-Programa Propostas Eleição 2026 4 Eixos"
              onSelect={() => navigateTo(route('/chapa-semente'))}
            >
              <CagpIcon
                name={resolveCagpIconName('bi-flower1')}
                className="w-4 h-4 text-accent mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Chapa Semente • Carta-Programa Oficial
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Conheça os 4 eixos, compromisso público e propostas de gestão
                </span>
              </div>
              <CommandShortcut>Propostas</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="Edital Eleições CAGP 2026 Junta Eleitoral Votação 25 26 Novembro"
              onSelect={() => navigateTo(route('/gestao') + '#eleicoes')}
            >
              <CagpIcon
                name={resolveCagpIconName('bi-file-earmark-pdf')}
                className="w-4 h-4 text-primary mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Edital de Eleições CAGP 2026 (Normas &amp; Datas)
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Votação em 25 e 26/11 no CAGP, regras e download do edital
                </span>
              </div>
              <CommandShortcut>Edital</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {AXIS_REGISTRY.map((axis) => (
            <CommandGroup
              key={axis.id}
              heading={axis.name}
            >
              {axis.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${axis.name} ${item.label} ${item.description} ${item.keywords ?? ''}`}
                  onSelect={() => {
                    if (item.href.includes('#campus')) {
                      triggerEvent('cagp:open-campus');
                    } else if (item.href.includes('#passaporte')) {
                      triggerEvent('cagp:open-passport');
                    } else {
                      navigateTo(item.href);
                    }
                  }}
                >
                  <CagpIcon
                    name={resolveCagpIconName(item.icon)}
                    className="w-4 h-4 text-primary mr-2"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </div>
                  <CommandShortcut>Ir</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading="Documentos mais pedidos">
            {maisPedidos.grupos.flatMap((grupo) =>
              grupo.documentos.map((doc) => (
                <CommandItem
                  key={doc.id}
                  value={`documento ${doc.nome} ${doc.descricao} ${grupo.titulo}`}
                  onSelect={() => {
                    setCommandOpen(false);
                    window.open(asset(doc.arquivo), '_blank', 'noopener,noreferrer');
                  }}
                >
                  <CagpIcon name="file-text" className="w-4 h-4 text-primary mr-2" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-heading font-bold text-xs text-foreground">{doc.nome}</span>
                    <span className="text-xs text-muted-foreground truncate">{doc.descricao}</span>
                  </div>
                  <CommandShortcut>PDF</CommandShortcut>
                </CommandItem>
              ))
            )}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Portais Oficiais UFMG & Assistência Estudantil">
            {EXTERNAL_PORTALS.map((portal) => (
              <CommandItem
                key={portal.id}
                value={`${portal.label} ${portal.desc}`}
                onSelect={() => {
                  setCommandOpen(false);
                  window.open(portal.href, '_blank', 'noopener,noreferrer');
                }}
              >
                <img
                  src={portal.logo}
                  alt=""
                  className="w-5 h-5 object-contain rounded mr-2 border border-border"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-heading font-extrabold text-xs text-foreground">
                    {portal.label}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {portal.desc}
                  </span>
                </div>
                <CommandShortcut><i className="bi bi-box-arrow-up-right" aria-hidden="true" /></CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
