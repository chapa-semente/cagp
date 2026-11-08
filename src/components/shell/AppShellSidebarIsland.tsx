import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { AXIS_REGISTRY, getAxisByPath } from '@/lib/navigationRegistry';
import { SHORTCUTS_CATALOG, DEFAULT_SHORTCUT_IDS } from '@/lib/shortcutsCatalog';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { resolveCagpIconName } from '@/lib/cagpIcons';
import { asset, route } from '@/lib/paths';
import { tactileSpring, drawerSpring } from '@/lib/motion';
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

export const AppShellSidebarIsland: React.FC<AppShellSidebarIslandProps> = ({
  initialPath = '/',
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [tabletExpanded, setTabletExpanded] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutIds, setShortcutIds] = useState<string[]>(DEFAULT_SHORTCUT_IDS);
  const [studentName, setStudentName] = useState('Estudante GP');
  const [studentPeriod, setStudentPeriod] = useState('Percurso N-20229');

  const activeAxis = getAxisByPath(currentPath) || AXIS_REGISTRY[0];

  const syncLocalState = useCallback(() => {
    if (typeof window === 'undefined') return;
    setCurrentPath(window.location.pathname);

    try {
      const savedShortcuts = localStorage.getItem('cagp_sidebar_shortcuts_v1');
      if (savedShortcuts) {
        const parsed = JSON.parse(savedShortcuts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setShortcutIds(parsed.slice(0, 6));
        }
      }
    } catch {
      // ignore storage errors
    }

    try {
      const savedPassport = localStorage.getItem('cagp_passport_v1');
      if (savedPassport) {
        const parsed = JSON.parse(savedPassport);
        if (parsed?.name && parsed.name.trim()) {
          setStudentName(parsed.name.trim());
        }
        if (parsed?.period) {
          setStudentPeriod(`${parsed.period}º Período • N-20229`);
        }
      }
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
    window.addEventListener('cagp:open-spotlight', handleOpenSpotlight);
    window.addEventListener('cagp:shortcuts-updated', syncLocalState);
    window.addEventListener('cagp:passport-updated', syncLocalState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      window.removeEventListener('cagp:open-drawer', handleOpenDrawer);
      window.removeEventListener('cagp:open-spotlight', handleOpenSpotlight);
      window.removeEventListener('cagp:shortcuts-updated', syncLocalState);
      window.removeEventListener('cagp:passport-updated', syncLocalState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [syncLocalState]);

  const activeShortcuts = SHORTCUTS_CATALOG.filter((item) =>
    shortcutIds.includes(item.id)
  );

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
    window.location.href = href;
  };

  const renderSidebarNavigationContent = (isCompact = false, layoutScope = 'desktop') => (
    <div className="flex flex-col justify-between h-full bg-white text-foreground select-none">
      {/* Top Scrollable Area */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar p-3 xl:p-4 gap-3.5">
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b-3 border-border">
          <a
            href={route('/chapa-semente')}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-background transition-all no-underline group min-w-0"
            title="Chapa Semente — Proposta Materializada para o CAGP UFMG"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-foreground flex items-center justify-center shrink-0 border-3 border-border shadow-xs group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all p-1">
              <img
                src={asset('/logos/semente/simbolo_semente_fiel.svg')}
                alt="Chapa Semente"
                className="w-full h-full object-contain"
              />
            </div>
            {!isCompact && (
              <div className="min-w-0 flex-1">
                <span className="font-heading text-sm font-black uppercase tracking-tight text-foreground block leading-none">
                  CHAPA SEM<span>E</span>NT<span className="text-accent">E</span>
                </span>
                <div className="flex items-center gap-1 mt-1 truncate">
                  <span className="text-[10px] font-mono text-primary font-bold truncate">
                    Proposta Materializada
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
              className="hidden md:flex w-9 h-9 rounded-xl bg-background hover:bg-card border-3 border-border shadow-xs items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
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
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border-2 border-border rounded-md shadow-[1px_1px_0px_#16181d]">
              ⌘K
            </kbd>
          )}
        </motion.button>

        {/* Destaque Eleitoral Fixo da Chapa Semente */}
        <motion.a
          href={route('/chapa-semente')}
          whileHover={{ x: 4 }}
          whileTap={{ x: 2, y: 2 }}
          transition={tactileSpring}
          className={`w-full rounded-xl bg-primary text-white border-3 border-border shadow-md flex items-center ${
            isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
          } transition-colors no-underline hover:bg-[#4A216E]`}
          title="Proposta Materializada — Vote Semente 25 e 26/11"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-6 h-6 rounded-lg bg-accent text-foreground flex items-center justify-center font-heading font-black text-xs shrink-0 border-2 border-border">
              ★
            </span>
            {!isCompact && (
              <div className="text-left min-w-0">
                <span className="font-heading text-[11px] font-black uppercase tracking-tight block truncate">
                  Proposta Materializada
                </span>
                <span className="text-[10px] font-mono font-bold text-[#FFD6A5] block truncate">
                  Vote Semente • 25 e 26/11
                </span>
              </div>
            )}
          </div>
          {!isCompact && (
            <Badge variant="accent" className="font-mono text-[9px] px-1.5 py-0 uppercase shrink-0">
              14 PROPOSTAS
            </Badge>
          )}
        </motion.a>

        {/* 5 Canonical Axes */}
        <div className="space-y-1.5" role="navigation" aria-label="5 Eixos do Curso">
          {!isCompact && (
            <div className="px-1 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                5 Eixos Canônicos
              </span>
              <span className="text-[10px] font-mono font-bold text-primary">
                N-20229
              </span>
            </div>
          )}

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
                        className={`relative overflow-hidden flex items-center min-h-[44px] ${
                          isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
                        } rounded-xl border-3 transition-colors no-underline ${
                          isAxisActive
                            ? 'text-white border-border shadow-md font-extrabold'
                            : 'bg-white hover:bg-background text-foreground border-border/20 hover:border-border hover:shadow-xs font-bold'
                        }`}
                      >
                        {isAxisActive && (
                          <motion.span
                            layoutId={layoutScope === 'desktop' ? 'sidebar-active-indicator' : `sidebar-active-indicator-${layoutScope}`}
                            transition={tactileSpring}
                            className="absolute inset-0 bg-primary -z-0"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-black border-2 shrink-0 ${
                              isAxisActive
                                ? 'bg-white text-primary border-border'
                                : 'bg-background text-foreground border-border'
                            }`}
                          >
                            {axis.number}
                          </span>
                          {!isCompact && (
                            <span className="font-heading text-xs uppercase tracking-tight truncate">
                              {axis.name}
                            </span>
                          )}
                        </div>
                        {!isCompact && (
                          <CagpIcon
                            name={resolveCagpIconName(axis.icon)}
                            className={`relative z-10 w-4 h-4 shrink-0 ${
                              isAxisActive ? 'text-accent' : 'text-muted-foreground'
                            }`}
                          />
                        )}
                      </motion.a>
                    </TooltipTrigger>
                    {isCompact && (
                      <TooltipContent side="right" className="font-heading font-bold">
                        {axis.number}. {axis.name} — {axis.tagline}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>

                {/* Sub-items for the active axis */}
                {!isCompact && isAxisActive && (
                  <div className="pl-3 ml-3 border-l-3 border-border space-y-1 py-1">
                    {axis.items.map((subItem) => {
                      const isSubActive =
                        currentPath === subItem.href ||
                        (subItem.href !== '/' && currentPath.startsWith(subItem.href));
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
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors no-underline ${
                            isSubActive
                              ? 'bg-card text-primary font-extrabold border-3 border-border shadow-xs'
                              : 'text-[#3F3C38] hover:text-foreground hover:bg-background font-semibold'
                          }`}
                        >
                          <span className="truncate">{subItem.shortLabel || subItem.label}</span>
                          {subItem.badge && (
                            <Badge variant="accent" className="font-mono text-[9px] px-1.5 py-0">
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

        {/* Custom Student Shortcuts */}
        {!isCompact && (
          <div className="pt-2 border-t-3 border-border space-y-2">
            <div className="px-1 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                Atalhos Rápidos
              </span>
              <button
                type="button"
                onClick={() => triggerEvent('cagp:open-shortcuts')}
                className="text-[10px] font-heading font-extrabold uppercase text-primary hover:underline cursor-pointer"
              >
                Editar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {activeShortcuts.map((sc) => (
                <motion.a
                  key={sc.id}
                  href={sc.href}
                  whileHover={{ x: 2, y: -1 }}
                  whileTap={{ x: 2, y: 2 }}
                  transition={tactileSpring}
                  onClick={(e) => {
                    if (sc.isAction && sc.actionEvent) {
                      e.preventDefault();
                      triggerEvent(sc.actionEvent);
                    }
                  }}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-background hover:bg-card border-3 border-border shadow-xs text-[11px] font-bold text-foreground no-underline transition-colors truncate"
                >
                  <CagpIcon
                    name={resolveCagpIconName(sc.icon)}
                    className="w-3.5 h-3.5 text-secondary shrink-0"
                  />
                  <span className="truncate">{sc.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Anchored Student Passport & Quick Tools */}
      <div className="p-3 border-t-3 border-border bg-card space-y-2.5 shrink-0">
        {!isCompact ? (
          <div className="grid grid-cols-4 gap-1">
            <button
              type="button"
              onClick={() => triggerEvent('cagp:open-campus')}
              className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-[10px] font-bold text-foreground cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Horários do RU Setorial I/II e Circulares 3 e 4"
            >
              <CagpIcon name={resolveCagpIconName('bi-clock-history')} className="w-3.5 h-3.5 text-secondary mb-0.5" />
              <span>RU/Bus</span>
            </button>
            <button
              type="button"
              onClick={() => triggerEvent('cagp:open-a11y')}
              className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-[10px] font-bold text-foreground cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Acessibilidade e Leitura"
            >
              <CagpIcon name={resolveCagpIconName('bi-universal-access')} className="w-3.5 h-3.5 text-primary mb-0.5" />
              <span>A11y</span>
            </button>
            <a
              href={route('/configuracoes')}
              className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-[10px] font-bold text-foreground no-underline cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Configurações do Superapp"
            >
              <CagpIcon name="sliders" className="w-3.5 h-3.5 text-[#266264] mb-0.5" />
              <span>Ajustes</span>
            </a>
            <button
              type="button"
              onClick={() => triggerEvent('cagp:start-tour')}
              className="flex flex-col items-center justify-center min-h-[44px] py-1.5 px-0.5 rounded-xl bg-white hover:bg-background border-3 border-border shadow-xs text-[10px] font-bold text-foreground cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Iniciar Tour Guiado do SuperApp"
            >
              <CagpIcon name="compass" className="w-3.5 h-3.5 text-accent mb-0.5" />
              <span>Tour</span>
            </button>
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
            className="w-full min-h-[44px] p-2 rounded-xl bg-white border-3 border-border shadow-xs flex items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
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
          } cursor-pointer transition-colors hover:bg-[#4a216f]`}
          title="Abrir Passaporte e Carteirinha Discente"
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
                <span className="text-[10px] font-mono text-white/85 block truncate">
                  {studentPeriod}
                </span>
              </div>
            )}
          </div>
          {!isCompact && (
            <Badge variant="accent" className="font-mono text-[9px] px-1.5 py-0.5 shrink-0">
              Passaporte
            </Badge>
          )}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Permanent Sidebar (>= 1280px) com mola drawerSpring */}
      <motion.aside
        id="cagp-desktop-sidebar"
        aria-label="Navegação Principal Lateral Desktop"
        initial={false}
        animate={{ width: desktopCollapsed ? 88 : 264 }}
        transition={drawerSpring}
        className="hidden xl:flex flex-col shrink-0 border-r-3 border-[#16181d] bg-white sticky top-0 h-[100dvh] z-30 overflow-x-hidden"
      >
        {renderSidebarNavigationContent(desktopCollapsed, 'desktop')}
      </motion.aside>

      {/* 2. Tablet Compact Rail (768px - 1279px) */}
      <aside
        aria-label="Navegação Lateral Compacta Tablet"
        className="hidden md:flex xl:hidden flex-col w-[88px] shrink-0 border-r-3 border-[#16181d] bg-white sticky top-0 h-[100dvh] z-30 transition-all duration-200"
      >
        {renderSidebarNavigationContent(true, 'tablet-rail')}
      </aside>

      {/* Tablet Expanded Overlay Drawer (z-[1100] acima de CampaignBanner z-[1050]) */}
      {tabletExpanded && (
        <div className="fixed inset-0 z-[1100] hidden md:flex xl:hidden">
          <div
            className="fixed inset-0 bg-black/65 bg-[radial-gradient(#16181d_1px,transparent_1px)] [background-size:12px_12px] transition-opacity duration-200 animate-in fade-in"
            onClick={() => setTabletExpanded(false)}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={drawerSpring}
            className="relative z-10 w-[280px] h-full border-r-3 border-[#16181d] bg-white shadow-[8px_0px_0px_#16181d]"
          >
            {renderSidebarNavigationContent(false, 'tablet-drawer')}
          </motion.aside>
        </div>
      )}

      {/* 3. Mobile Neobrutalist Vaul Drawer (< 768px) */}
      <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <DrawerContent className="z-[1100] max-h-[88dvh] bg-white border-t-3 border-[#16181d]">
          <DrawerHeader className="border-b-3 border-border bg-card pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 border-3 border-border shadow-[1px_1px_0px_#16181d] flex items-center justify-center shrink-0">
                  <img
                    src={asset('/logos/semente/simbolo_semente_fiel.svg')}
                    alt="Chapa Semente"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <DrawerTitle className="font-heading text-sm font-black uppercase text-foreground">
                    CHAPA SEM<span>E</span>NT<span className="text-accent">E</span>
                  </DrawerTitle>
                  <DrawerDescription className="text-xs font-semibold text-muted-foreground">
                    Proposta Materializada • CAGP UFMG
                  </DrawerDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileDrawerOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto max-h-[72dvh]">
            {renderSidebarNavigationContent(false, 'mobile-drawer')}
          </div>
        </DrawerContent>
      </Drawer>

      {/* 4. Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Busca Global CAGP Superapp"
        description="Navegue pelas 20 páginas, ferramentas de cálculo, documentos oficiais e portais da UFMG."
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
                <span className="text-[11px] text-muted-foreground truncate">
                  Plantão noturno, horários de janta no RU e linhas de ônibus interno
                </span>
              </div>
              <CommandShortcut>Painel</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Passaporte Discente Perfil Estudante Cofre de Horas Conquistas Candangos"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-passport');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-person-badge')} className="w-4 h-4 text-primary mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Passaporte Discente • Perfil &amp; Cofre
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  Seu progresso de curso, personalização do avatar e backup do cofre
                </span>
              </div>
              <CommandShortcut>Perfil</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Acessibilidade Alto Contraste Fonte OpenDyslexic Tamanho de Texto Modo Escuro"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-a11y');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-universal-access')} className="w-4 h-4 text-accent mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Painel de Acessibilidade &amp; Preferências
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  Ajustes de alto contraste, fonte para dislexia e tamanho de texto
                </span>
              </div>
              <CommandShortcut>A11y</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Iniciar Tour Guiado do SuperApp Tutorial Ajuda Guia Onboarding Primeiros Passos Walkthrough"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:start-tour');
              }}
            >
              <CagpIcon name="compass" className="w-4 h-4 text-accent mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Iniciar Tour Guiado do SuperApp
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  Tour interativo passo a passo pelas ferramentas discentes
                </span>
              </div>
              <CommandShortcut>Tour</CommandShortcut>
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
                <span className="text-[11px] text-muted-foreground truncate">
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
                <span className="text-[11px] text-muted-foreground truncate">
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
              heading={`Eixo ${axis.number}: ${axis.name} — ${axis.tagline}`}
            >
              {axis.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${axis.name} ${item.label} ${item.description}`}
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
                    <span className="text-[11px] text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </div>
                  <CommandShortcut>Ir</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

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
                  <span className="text-[11px] text-muted-foreground truncate">
                    {portal.desc}
                  </span>
                </div>
                <CommandShortcut>↗</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
