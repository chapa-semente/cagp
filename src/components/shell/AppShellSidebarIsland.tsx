import React, { useState, useEffect, useCallback } from 'react';
import { AXIS_REGISTRY, getAxisByPath } from '@/lib/navigationRegistry';
import { SHORTCUTS_CATALOG, DEFAULT_SHORTCUT_IDS } from '@/lib/shortcutsCatalog';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { resolveCagpIconName } from '@/lib/cagpIcons';
import { asset, route } from '@/lib/paths';
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
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileDrawerOpen((prev) => !prev);
        } else if (window.innerWidth < 1280) {
          setTabletExpanded((prev) => !prev);
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

  const renderSidebarNavigationContent = (isCompact = false) => (
    <div className="flex flex-col justify-between h-full bg-white text-[#16181d] select-none">
      {/* Top Scrollable Area */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar p-3 xl:p-4 gap-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b-3 border-[#16181d]">
          <a
            href={route('/chapa-semente')}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#f4f5f7] transition-all no-underline group min-w-0"
            title="Chapa Semente — Uma realização para o CAGP UFMG"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#16181d] flex items-center justify-center shrink-0 border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all p-1">
              <img
                src={asset('/logos/semente/simbolo_semente_fiel.svg')}
                alt="Chapa Semente"
                className="w-full h-full object-contain"
              />
            </div>
            {!isCompact && (
              <div className="min-w-0 flex-1">
                <span className="font-heading text-sm font-black uppercase tracking-tight text-[#16181d] block leading-none">
                  CHAPA SEM<span>E</span>NT<span className="text-[#FF8811]">E</span>
                </span>
                <div className="flex items-center gap-1 mt-1 truncate">
                  <span className="text-[10px] font-sans text-[#57534E] font-bold truncate">
                    Realização • CAGP
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
              onClick={() => setTabletExpanded(false)}
              className="hidden md:flex xl:hidden w-9 h-9 rounded-xl bg-[#f4f5f7] border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] items-center justify-center cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Recolher barra lateral"
            >
              <CagpIcon name={resolveCagpIconName('bi-chevron-left')} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search / Command Trigger */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className={`w-full rounded-xl bg-[#f4f5f7] hover:bg-[#FFFDF9] border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] text-[#16181d] flex items-center ${
            isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
          } transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
          title="Busca Rápida Global (Ctrl+K)"
        >
          <span className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wide truncate">
            <CagpIcon name="search" className="w-4 h-4 text-[#5B2A86] shrink-0" />
            {!isCompact && <span>Buscar no Superapp...</span>}
          </span>
          {!isCompact && (
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white border-2 border-[#16181d] rounded-md shadow-[1px_1px_0px_#16181d]">
              ⌘K
            </kbd>
          )}
        </button>

        {/* Destaque da Campanha Eleitoral da Chapa Semente */}
        <a
          href={route('/chapa-semente')}
          className={`w-full rounded-xl bg-[#5B2A86] text-white border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] flex items-center ${
            isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
          } transition-all no-underline hover:bg-[#4A216E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
          title="Conheça a Carta-Programa da Chapa Semente"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-5 h-5 rounded-lg bg-[#FF8811] text-[#16181d] flex items-center justify-center font-heading font-black text-xs shrink-0 border border-[#16181d]">
              ★
            </span>
            {!isCompact && (
              <div className="text-left min-w-0">
                <span className="font-heading text-xs font-black uppercase tracking-tight block truncate">
                  Carta-Programa
                </span>
                <span className="text-[10px] font-mono text-[#FFD6A5] block truncate">
                  Eleições 25-26/Nov
                </span>
              </div>
            )}
          </div>
          {!isCompact && (
            <Badge variant="accent" className="text-[9px] px-1.5 py-0 uppercase">
              VOTE
            </Badge>
          )}
        </a>

        {/* 5 Canonical Axes */}
        <div className="space-y-1.5" role="navigation" aria-label="5 Eixos do Curso">
          {!isCompact && (
            <div className="px-1 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#57534E]">
                5 Eixos Canônicos
              </span>
              <span className="text-[10px] font-mono font-bold text-[#5B2A86]">
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
                      <a
                        href={axis.rootHref}
                        className={`flex items-center ${
                          isCompact ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
                        } rounded-xl border-3 transition-all no-underline ${
                          isAxisActive
                            ? 'bg-[#5B2A86] text-white border-[#16181d] shadow-[3px_3px_0px_#16181d] font-extrabold'
                            : 'bg-white hover:bg-[#f4f5f7] text-[#16181d] border-transparent hover:border-[#16181d] font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-black border-2 shrink-0 ${
                              isAxisActive
                                ? 'bg-white text-[#5B2A86] border-[#16181d]'
                                : 'bg-[#f4f5f7] text-[#16181d] border-[#16181d]'
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
                            className={`w-4 h-4 shrink-0 ${
                              isAxisActive ? 'text-[#FF8811]' : 'text-[#57534E]'
                            }`}
                          />
                        )}
                      </a>
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
                  <div className="pl-3 ml-3 border-l-3 border-[#16181d] space-y-1 py-1">
                    {axis.items.map((subItem) => {
                      const isSubActive =
                        currentPath === subItem.href ||
                        (subItem.href !== '/' && currentPath.startsWith(subItem.href));
                      return (
                        <a
                          key={subItem.id}
                          href={subItem.href}
                          onClick={(e) => {
                            if (subItem.href.includes('#campus')) {
                              e.preventDefault();
                              triggerEvent('cagp:open-campus');
                            } else if (subItem.href.includes('#passaporte')) {
                              e.preventDefault();
                              triggerEvent('cagp:open-passport');
                            }
                          }}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all no-underline ${
                            isSubActive
                              ? 'bg-[#FFFDF9] text-[#5B2A86] font-extrabold border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d]'
                              : 'text-[#3F3C38] hover:text-[#16181d] hover:bg-[#f4f5f7] font-semibold'
                          }`}
                        >
                          <span className="truncate">{subItem.shortLabel || subItem.label}</span>
                          {subItem.badge && (
                            <Badge variant="accent" className="text-[9px] px-1.5 py-0">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
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
          <div className="pt-2 border-t-3 border-[#16181d] space-y-2">
            <div className="px-1 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#57534E]">
                Atalhos Rápidos
              </span>
              <button
                type="button"
                onClick={() => triggerEvent('cagp:open-shortcuts')}
                className="text-[10px] font-heading font-extrabold uppercase text-[#5B2A86] hover:underline cursor-pointer"
              >
                Editar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {activeShortcuts.map((sc) => (
                <a
                  key={sc.id}
                  href={sc.href}
                  onClick={(e) => {
                    if (sc.isAction && sc.actionEvent) {
                      e.preventDefault();
                      triggerEvent(sc.actionEvent);
                    }
                  }}
                  className="flex items-center gap-1.5 p-2 rounded-xl bg-[#f4f5f7] hover:bg-[#FFFDF9] border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] text-[11px] font-bold text-[#16181d] no-underline transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none truncate"
                >
                  <CagpIcon
                    name={resolveCagpIconName(sc.icon)}
                    className="w-3.5 h-3.5 text-[#9E2424] shrink-0"
                  />
                  <span className="truncate">{sc.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Anchored Student Passport & Quick Tools */}
      <div className="p-3 border-t-3 border-[#16181d] bg-[#FFFDF9] space-y-2.5 shrink-0">
        {!isCompact ? (
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => triggerEvent('cagp:open-campus')}
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white hover:bg-[#f4f5f7] border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] text-[10px] font-bold text-[#16181d] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Horários do RU Setorial I/II e Circulares 3 e 4"
            >
              <CagpIcon name={resolveCagpIconName('bi-clock-history')} className="w-3.5 h-3.5 text-[#9E2424] mb-0.5" />
              <span>RU &amp; Bus</span>
            </button>
            <button
              type="button"
              onClick={() => triggerEvent('cagp:open-a11y')}
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white hover:bg-[#f4f5f7] border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] text-[10px] font-bold text-[#16181d] cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Acessibilidade e Leitura"
            >
              <CagpIcon name={resolveCagpIconName('bi-universal-access')} className="w-3.5 h-3.5 text-[#5B2A86] mb-0.5" />
              <span>A11y</span>
            </button>
            <a
              href={route('/configuracoes')}
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white hover:bg-[#f4f5f7] border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] text-[10px] font-bold text-[#16181d] no-underline cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              title="Configurações do Superapp"
            >
              <CagpIcon name="sliders" className="w-3.5 h-3.5 text-[#266264] mb-0.5" />
              <span>Ajustes</span>
            </a>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setTabletExpanded(true)}
            className="w-full p-2 rounded-xl bg-white border-2 border-[#16181d] shadow-[2px_2px_0px_#16181d] flex items-center justify-center cursor-pointer"
            title="Expandir Menu Lateral"
          >
            <CagpIcon name="chevron-right" className="w-4 h-4" />
          </button>
        )}

        {/* Student Passport Card Trigger */}
        <button
          type="button"
          onClick={() => triggerEvent('cagp:open-passport')}
          className={`w-full rounded-xl bg-[#5B2A86] text-white border-3 border-[#16181d] shadow-[3px_3px_0px_#16181d] flex items-center ${
            isCompact ? 'justify-center p-2' : 'justify-between p-2.5'
          } cursor-pointer transition-all hover:bg-[#4a216f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
          title="Abrir Passaporte e Carteirinha Discente"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FF8811] text-[#16181d] border-2 border-[#16181d] flex items-center justify-center font-heading font-black text-xs shrink-0">
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
            <Badge variant="accent" className="text-[9px] px-1.5 py-0.5 shrink-0">
              Passaporte
            </Badge>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. Desktop Permanent Sidebar (>= 1280px) */}
      <aside
        aria-label="Navegação Principal Lateral Desktop"
        className="hidden xl:flex flex-col w-[264px] shrink-0 border-r-3 border-[#16181d] bg-white sticky top-0 h-[100dvh] z-30"
      >
        {renderSidebarNavigationContent(false)}
      </aside>

      {/* 2. Tablet Compact Rail (768px - 1279px) */}
      <aside
        aria-label="Navegação Lateral Compacta Tablet"
        className="hidden md:flex xl:hidden flex-col w-[88px] shrink-0 border-r-3 border-[#16181d] bg-white sticky top-0 h-[100dvh] z-30"
      >
        {renderSidebarNavigationContent(true)}
      </aside>

      {/* Tablet Expanded Overlay Drawer */}
      {tabletExpanded && (
        <div className="fixed inset-0 z-50 hidden md:flex xl:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setTabletExpanded(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-[280px] h-full border-r-3 border-[#16181d] bg-white shadow-[8px_0px_0px_#16181d]">
            {renderSidebarNavigationContent(false)}
          </aside>
        </div>
      )}

      {/* 3. Mobile Neobrutalist Vaul Drawer (< 768px) */}
      <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <DrawerContent className="max-h-[88dvh] bg-white border-t-3 border-[#16181d]">
          <DrawerHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9] pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 border-2 border-[#16181d] shadow-[1px_1px_0px_#16181d] flex items-center justify-center shrink-0">
                  <img
                    src={asset('/logos/semente/simbolo_semente_fiel.svg')}
                    alt="Chapa Semente"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <DrawerTitle className="font-heading text-sm font-black uppercase text-[#16181d]">
                    CHAPA SEM<span>E</span>NT<span className="text-[#FF8811]">E</span>
                  </DrawerTitle>
                  <DrawerDescription className="text-xs font-semibold text-[#57534E]">
                    Realização para o CAGP UFMG
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
            {renderSidebarNavigationContent(false)}
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

          <CommandGroup heading="Eleições CAGP 2026 • Chapa Semente">
            <CommandItem
              value="Chapa Semente Carta-Programa Propostas Eleição 2026 4 Eixos"
              onSelect={() => navigateTo(route('/chapa-semente'))}
            >
              <CagpIcon
                name={resolveCagpIconName('bi-flower1')}
                className="w-4 h-4 text-[#FF8811] mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-[#16181d]">
                  Chapa Semente • Carta-Programa Oficial
                </span>
                <span className="text-[11px] text-[#57534E] truncate">
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
                className="w-4 h-4 text-[#5B2A86] mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-[#16181d]">
                  Edital de Eleições CAGP 2026 (Normas &amp; Datas)
                </span>
                <span className="text-[11px] text-[#57534E] truncate">
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
                    className="w-4 h-4 text-[#5B2A86] mr-2"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-heading font-extrabold text-xs uppercase text-[#16181d]">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[#57534E] truncate">
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
                  className="w-5 h-5 object-contain rounded mr-2 border border-[#16181d]"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-heading font-extrabold text-xs text-[#16181d]">
                    {portal.label}
                  </span>
                  <span className="text-[11px] text-[#57534E] truncate">
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
