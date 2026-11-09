import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { tactileSpring, bounceSpring } from '@/lib/motion';
import { getVaultItem, setVaultItem, type VaultData } from '../../../../lib/storage/studentVault';
import { LinearHud } from '@/components/features/acg/calculator/LinearHud';
import { EXTENSION_ITEMS, AAC_ITEMS, type AcgItemDef } from '@/components/features/acg/calculator/acgCatalog';
import { GaugeChart } from '@/components/boldkit/charts/gauge-chart';
import { Button } from '@/components/ui/button';
import { Sticker } from '@/components/ui/sticker';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const AcgCalculatorCore: React.FC = () => {
  const [data, setData] = useState<VaultData<'cagp_calc_ext_aac_v1'>>({});
  const [openDrawers, setOpenDrawers] = useState<Record<string, boolean>>({});
  const [allDrawersOpen, setAllDrawersOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const getItemValue = (item: AcgItemDef, currentData: Record<string, number>): number => {
    if (currentData[item.key] !== undefined) {
      return Number(currentData[item.key]) || 0;
    }
    if (item.aliases) {
      for (const alias of item.aliases) {
        if (currentData[alias] !== undefined) {
          return Number(currentData[alias]) || 0;
        }
      }
    }
    return 0;
  };

  const loadData = () => {
    const raw = getVaultItem('cagp_calc_ext_aac_v1');
    const sanitized: Record<string, number> = {};

    for (const item of EXTENSION_ITEMS) {
      const v = getItemValue(item, raw);
      sanitized[item.key] = Math.min(item.max, Math.max(0, v));
    }
    for (const item of AAC_ITEMS) {
      const v = getItemValue(item, raw);
      sanitized[item.key] = Math.min(item.max, Math.max(0, v));
    }

    setData(sanitized);
  };

  useEffect(() => {
    loadData();

    const handleVaultUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_calc_ext_aac_v1') {
        const nextVal = custom.detail.value || {};
        setData(nextVal);
      }
    };

    window.addEventListener('cagp:vault-updated', handleVaultUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleVaultUpdate);
  }, []);

  const updateItemHours = (key: string, nextVal: number, max: number) => {
    const clamped = Math.max(0, Math.min(max, nextVal));
    const nextData = { ...data, [key]: clamped };
    setData(nextData);
    setVaultItem('cagp_calc_ext_aac_v1', nextData);
  };

  const handleStep = (item: AcgItemDef, delta: number) => {
    const current = data[item.key] || 0;
    updateItemHours(item.key, current + delta, item.max);
  };

  const handleMaxOut = (item: AcgItemDef) => {
    updateItemHours(item.key, item.max, item.max);
  };

  const toggleDrawer = (key: string) => {
    setOpenDrawers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAllDrawers = () => {
    const nextState = !allDrawersOpen;
    setAllDrawersOpen(nextState);
    const updated: Record<string, boolean> = {};
    [...EXTENSION_ITEMS, ...AAC_ITEMS].forEach((item) => {
      updated[item.key] = nextState;
    });
    setOpenDrawers(updated);
  };

  const executeReset = () => {
    const empty: Record<string, number> = {};
    [...EXTENSION_ITEMS, ...AAC_ITEMS].forEach((it) => {
      empty[it.key] = 0;
    });
    setData(empty);
    setVaultItem('cagp_calc_ext_aac_v1', empty);
  };

  const handlePresetExample = () => {
    const preset: Record<string, number> = {
      ext_lab_a: 90,
      ext_lab_b: 90,
      aac_eventos: 60,
      aac_pesquisa: 60,
      aac_cursos: 60,
    };
    setData(preset);
    setVaultItem('cagp_calc_ext_aac_v1', preset);
  };

  const renderSection = (
    title: string,
    subtitle: string,
    badgeText: string,
    items: AcgItemDef[],
    colorClass: string,
    targetMax: number,
  ) => {
    const sum = items.reduce((acc, it) => acc + (data[it.key] || 0), 0);
    const clampedSum = Math.min(targetMax, sum);
    const pct = Math.min(100, Math.round((clampedSum / targetMax) * 100));

    return (
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-border">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-head text-lg font-black text-foreground m-0">
                {title}
              </h2>
              <span className={`px-2.5 py-1 rounded-md text-xs font-head font-bold text-white border border-border shadow-xs ${colorClass}`}>
                {badgeText}
              </span>
              {clampedSum >= targetMax && (
                <motion.span
                  initial={{ scale: 1.4, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: -2, opacity: 1 }}
                  transition={bounceSpring}
                  className="cagp-stamp-badge is-deferido text-xs py-0.5 px-2 border border-border"
                >
                  <i className="bi bi-award-fill" aria-hidden="true" />
                  <span>300h ATINGIDAS</span>
                </motion.span>
              )}
            </div>
            <p className="font-body text-xs text-muted-foreground mt-0.5 m-0 font-normal">{subtitle}</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm font-bold text-foreground">
              {clampedSum} / {targetMax}h
            </span>
            <span className="font-mono text-xs text-muted-foreground ml-1">({pct}%)</span>
          </div>
        </div>

        {/* Colunas Independentes Empilhadas em 320px-767px e Lado a Lado em 1024px+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Coluna 1 Independente */}
          <div className="flex flex-col gap-3.5 w-full">
            {items
              .filter((_, idx) => idx % 2 === 0)
              .map((item) => renderCard(item))}
          </div>

          {/* Coluna 2 Independente */}
          <div className="flex flex-col gap-3.5 w-full">
            {items
              .filter((_, idx) => idx % 2 === 1)
              .map((item) => renderCard(item))}
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (item: AcgItemDef) => {
    const val = data[item.key] || 0;
    const itemPct = Math.min(100, Math.round((val / item.max) * 100));
    const isDrawerOpen = !!openDrawers[item.key];
    const isMaxed = val >= item.max;

    return (
      <motion.div
        key={item.key}
        layout="position"
        transition={tactileSpring}
        className="cagp-card p-4 bg-white border-3 border-border rounded-xl shadow flex flex-col h-fit transition-all duration-200"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center text-sm text-secondary shrink-0 shadow-xs">
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-mono font-bold uppercase text-muted-foreground">
                  {item.code}
                </span>
                <h3 className="font-head text-sm font-bold text-foreground leading-tight m-0">
                  {item.label}
                </h3>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {isMaxed ? (
                <motion.span
                  key="maxed"
                  initial={{ scale: 1.5, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 1.5, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={bounceSpring}
                  className="cagp-stamp-badge is-teto text-xs py-0.5 px-1.5 shrink-0 border border-border shadow-xs"
                >
                  <i className="bi bi-patch-check-fill" aria-hidden="true" />
                  <span>TETO {item.max}h</span>
                </motion.span>
              ) : (
                <motion.span
                  key="limit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-mono font-bold text-muted-foreground shrink-0"
                >
                  Teto: {item.max}h
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <p className="font-body text-xs text-muted-foreground mb-2.5 leading-relaxed">{item.desc}</p>

          {/* Barra de Progresso do Item com Física de Mola */}
          <div className="w-full h-2.5 bg-[#F3ECE0] border-2 border-border rounded-full overflow-hidden mb-2.5">
            <motion.div
              initial={false}
              animate={{ width: `${itemPct}%` }}
              transition={bounceSpring}
              className={`h-full ${
                isMaxed ? 'bg-teal-700' : 'bg-secondary'
              }`}
            />
          </div>
        </div>

        {/* Controles Táteis Apple HIG */}
        <div>
          <div className="flex items-center justify-between gap-2 pt-2.5 border-t-2 border-border">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStep(item, -item.step)}
                disabled={val <= 0}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white hover:bg-muted border-3 border-border shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-base font-bold text-foreground cursor-pointer transition-all"
                aria-label={`Diminuir ${item.step}h de ${item.label}`}
              >
                <i className="bi bi-dash" aria-hidden="true" />
              </button>

              <div className="w-16 h-11 min-h-[44px] bg-card border-3 border-border rounded-xl shadow-sm flex flex-col items-center justify-center">
                <span className="font-mono text-xs font-black text-foreground leading-none">
                  {val}h
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  /{item.max}h
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleStep(item, item.step)}
                disabled={isMaxed}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white hover:bg-muted border-3 border-border shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-base font-bold text-foreground cursor-pointer transition-all"
                aria-label={`Adicionar ${item.step}h em ${item.label}`}
              >
                <i className="bi bi-plus" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {isMaxed ? (
                <span className="min-h-[44px] text-xs font-mono font-bold text-white bg-teal-700 border-3 border-border px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                  <i className="bi bi-check-circle-fill text-xs" aria-hidden="true" />
                  <span>100%</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMaxOut(item)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-secondary hover:text-white border-3 border-border text-xs font-head uppercase font-bold text-foreground transition-all shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer min-h-[44px] flex items-center gap-1"
                  title={`Preencher teto de ${item.max}h`}
                >
                  <i className="bi bi-arrow-bar-up text-xs" aria-hidden="true" />
                  <span>Teto</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => toggleDrawer(item.key)}
                className={`px-3 py-1.5 rounded-xl border-3 border-border text-xs font-head uppercase font-bold transition-all flex items-center gap-1 min-h-[44px] shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer ${
                  isDrawerOpen
                    ? 'bg-foreground text-background text-white'
                    : 'bg-white text-foreground hover:bg-muted'
                }`}
                aria-expanded={isDrawerOpen}
                aria-controls={`drawer-${item.key}`}
              >
                <span>Regras</span>
                <i
                  className={`bi bi-chevron-${isDrawerOpen ? 'up' : 'down'} text-xs`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Ajuste Fino via Slider Neobrutalista */}
          <div className="mt-3 pt-2.5 border-t-2 border-border">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1.5 font-bold">
              <span>Ajuste Rápido (Slider)</span>
              <span className="text-foreground">{val}h / {item.max}h</span>
            </div>
            <Slider
              value={[val]}
              min={0}
              max={item.max}
              step={item.step || 5}
              onValueChange={([newVal]) => updateItemHours(item.key, newVal, item.max)}
              aria-label={`Ajuste de horas para ${item.label}`}
              className="py-1"
            />
          </div>

          {/* Gaveta Normativa de Regras com Interpolação Fluida 0fr -> 1fr */}
          <div
            id={`drawer-${item.key}`}
            className={`cagp-calc-drawer ${isDrawerOpen ? 'is-open' : ''}`}
            role="region"
            aria-label={`Normas de ${item.label}`}
            aria-hidden={!isDrawerOpen}
          >
            <div className="cagp-calc-drawer-inner">
              <div className="cagp-calc-drawer-grid">
                <div className="cagp-calc-drawer-section is-accepted">
                  <div className="cagp-calc-drawer-header">
                    <i className="bi bi-check-circle-fill text-success" aria-hidden="true" />
                    <span>O que pontua:</span>
                  </div>
                  <ul>
                    {item.accepted.map((acc: string, i: number) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>

                <div className="cagp-calc-drawer-section is-rejected">
                  <div className="cagp-calc-drawer-header">
                    <i className="bi bi-x-circle-fill text-destructive" aria-hidden="true" />
                    <span>O que não pontua:</span>
                  </div>
                  <ul>
                    {item.rejected.map((rej: string, i: number) => (
                      <li key={i}>{rej}</li>
                    ))}
                  </ul>
                </div>

                {item.alertNote && (
                  <div className="cagp-calc-drawer-alert">
                    <i className="bi bi-exclamation-triangle-fill text-warning" aria-hidden="true" />
                    <span>{item.alertNote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const extTotal = EXTENSION_ITEMS.reduce((acc, it) => acc + (data[it.key] || 0), 0);
  const aacTotal = AAC_ITEMS.reduce((acc, it) => acc + (data[it.key] || 0), 0);
  const grandTotal = Math.min(600, extTotal + aacTotal);

  return (
    <div className="cagp-calculator-core select-none space-y-6">
      {/* Alerta Normativo Institucional Resolução Complementar 01/2023 */}
      <Alert variant="info" className="rounded-xl border-3 border-border shadow-sm">
        <i className="bi bi-info-circle-fill text-info text-base" aria-hidden="true" />
        <div>
          <AlertTitle>Diretriz Curricular Resolução Complementar 01/2023</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground font-medium">
            São exigidas no mínimo 300h de Atividades de Extensão e 300h de Atividades Complementares (AAC) para colação de grau. O limite máximo por atividade segue os tetos regimentais.
          </AlertDescription>
        </div>
      </Alert>

      {/* HUD Linear Integrado + Velocímetro BoldKit GaugeChart (Empilhado em 320px-767px, Lado a Lado em 1024px+) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <LinearHud />
        </div>
        <Card className="lg:col-span-5 flex flex-col justify-between border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d]">
          <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-between h-full gap-2">
            <div className="flex items-center justify-between w-full gap-2 flex-wrap">
              <span className="font-heading text-xs font-extrabold uppercase text-foreground">
                Velocímetro Guardião 600h
              </span>
              <div className="flex items-center gap-1.5">
                <span className="cagp-stamp-badge is-semente text-xs py-0.5 px-2">
                  Ferramenta Criada pela Chapa Semente
                </span>
                <Sticker variant="default" size="sm" rotation="slight">
                  PPC 2020
                </Sticker>
              </div>
            </div>
            <GaugeChart
              value={grandTotal}
              min={0}
              max={600}
              size="sm"
              variant="semicircle"
              label={`Extensão (${Math.min(300, extTotal)}h) + AAC (${Math.min(300, aacTotal)}h)`}
              valueFormatter={(v) => `${v}h`}
              zones={[
                { from: 0, to: 200, color: '#9E2424', label: 'Início' },
                { from: 200, to: 450, color: '#FE8812', label: 'Avançando' },
                { from: 450, to: 600, color: '#15803D', label: 'Meta' },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Barra de Ações Rápidas Neobrutalista com Microcopy Canônico */}
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-heading uppercase font-extrabold text-muted-foreground mr-1">
              Ações Rápidas:
            </span>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handlePresetExample}
              title="Preencher com exemplo de percurso balanceado de 360h"
            >
              <i className="bi bi-lightning-charge-fill mr-1.5" aria-hidden="true" />
              Simular Horas (Exemplo 360h)
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={toggleAllDrawers}
            >
              {allDrawersOpen ? 'Recolher Regras' : 'Expandir Regras'}
            </Button>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <i className="bi bi-arrow-counterclockwise mr-1.5" aria-hidden="true" />
                Zerar Horas
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Zerar horas calculadas?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação limpará todas as horas de Extensão e AAC registradas no simulador local. Seus dados no cofre discente serão redefinidos para zero.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={executeReset}>Confirmar e Zerar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Seção 1: Extensão Curricular Obrigatória (300h) */}
      {renderSection(
        '1. Extensão Curricular Obrigatória (300h)',
        'Resolução CEPE 10/2019 • Laboratórios práticos DCP 195/196 e projetos SIEX homologados',
        '300h Exigidas',
        EXTENSION_ITEMS,
        'bg-secondary',
        300,
      )}

      {/* Seção 2: Atividades Acadêmicas Complementares (Até 300h) */}
      {renderSection(
        '2. Atividades Acadêmicas Complementares — AAC (Até 300h)',
        'Regulamento N-20229 Art. 15 • Cursos livres, monitoria, pesquisa, eventos e estágio extracurricular',
        'Até 300h',
        AAC_ITEMS,
        'bg-teal-700',
        300,
      )}
    </div>
  );
};
