// src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx — Catálogo Interativo das Optativas
import { nomeDisciplina } from '@/lib/nomeDisciplina';
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  getVaultItem,
  setVaultItem,
  type CustomCourse,
} from '../../../../lib/storage/studentVault';
import {
  DataTable,
  type ColumnDef,
  DataTableColumnHeader,
} from '@/components/ui/data-table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { tactileSpring, bounceSpring } from '@/lib/motion';
import { ExpandRegion, ExpandChevron, useExpandSet, useMasonryColumns } from '@/components/ui/expand';

export interface OptativaItem {
  code: string;
  name: string;
  ch: number;
  modulo?: string;
  ementa: string;
}

interface Props {
  optativas: OptativaItem[];
}

// Rótulo curto no chip; o nome completo do departamento vai no title.
const DEPT_FILTERS = [
  { id: 'todos', label: 'Todos', full: 'Todos os departamentos' },
  { id: 'DCP', label: 'DCP', full: 'DCP (Ciência Política)' },
  { id: 'FACE', label: 'FACE', full: 'FACE (ECN, CAD, CIC)' },
  { id: 'FAFICH', label: 'FAFICH', full: 'FAFICH (SOA, HIS, FIL, COM)' },
  { id: 'FAE', label: 'Educação', full: 'FAE (Educação)' },
  { id: 'DIREITO', label: 'Direito', full: 'Direito (DIR, DIP)' },
  { id: 'DEM', label: 'Outros', full: 'DEM, IGC e outros' },
] as const;

function matchesDepartment(code: string, deptFilter: string): boolean {
  if (deptFilter === 'todos') return true;
  const prefix = code.trim().split(/\s+/)[0]?.toUpperCase() || 'DCP';
  if (deptFilter === 'DCP') return prefix === 'DCP';
  if (deptFilter === 'FACE') return ['ECN', 'CAD', 'CIC', 'CEG'].includes(prefix);
  if (deptFilter === 'FAFICH') return ['SOA', 'ANT', 'HIS', 'FIL', 'COM', 'PSI'].includes(prefix);
  if (deptFilter === 'FAE') return ['FAE', 'EDU', 'ADE'].includes(prefix);
  if (deptFilter === 'DIREITO') return ['DIR', 'DIP', 'DPU', 'DPR'].includes(prefix);
  if (deptFilter === 'DEM') return !['DCP', 'ECN', 'CAD', 'CIC', 'CEG', 'SOA', 'ANT', 'HIS', 'FIL', 'COM', 'PSI', 'FAE', 'EDU', 'ADE', 'DIR', 'DIP', 'DPU', 'DPR'].includes(prefix);
  return true;
}

export const OptativasCatalogExplorer: React.FC<Props> = ({ optativas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('todos');
  const [selectedModulo, setSelectedModulo] = useState<string>('todos');
  const ementas = useExpandSet<string>();
  const cardsGridRef = useMasonryColumns<HTMLDivElement>();
  const [allocatedMap, setAllocatedMap] = useState<Record<string, CustomCourse>>({});
  const [allocatingCode, setAllocatingCode] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const loadAllocated = () => {
    const raw = getVaultItem('cagp_custom_curriculum_v1');
    const list = raw?.assignedCourses || [];
    const map: Record<string, CustomCourse> = {};
    list.forEach((c) => {
      map[c.code] = c;
    });
    setAllocatedMap(map);
  };

  useEffect(() => {
    loadAllocated();
    const handleUpdate = () => loadAllocated();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('cagp:vault-updated', handleUpdate);
    window.addEventListener('cagp-vault-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('cagp:vault-updated', handleUpdate);
      window.removeEventListener('cagp-vault-updated', handleUpdate);
    };
  }, []);

  const modulos = Array.from(
    new Set(optativas.map((o) => o.modulo || 'Geral').filter(Boolean))
  );

  const filtered = optativas.filter((o) => {
    const matchSearch =
      o.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.modulo && o.modulo.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDept = matchesDepartment(o.code, selectedDept);

    const matchModulo =
      selectedModulo === 'todos' ||
      (o.modulo || 'Geral').toLowerCase() === selectedModulo.toLowerCase();

    return matchSearch && matchDept && matchModulo;
  });

  const columns = useMemo<ColumnDef<OptativaItem>[]>(
    () => [
      {
        accessorKey: 'code',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Código" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-border text-secondary shadow-xs">
            {row.getValue('code')}
          </span>
        ),
      },
      {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Disciplina" />,
        cell: ({ row }) => (
          <div>
            <strong className="font-head text-xs uppercase font-extrabold text-foreground block">
              {row.original.name}
            </strong>
            {row.original.modulo && (
              <span className="text-xs text-muted-foreground font-head uppercase font-bold tracking-wider">
                {row.original.modulo}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'ch',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Carga Horária" />,
        cell: ({ row }) => (
          <span className="font-mono text-xs text-foreground font-bold">
            {Number.isFinite(row.original.ch) ? `${row.original.ch}h (${Math.round(row.original.ch / 15)} cr)` : 'Carga a confirmar'}
          </span>
        ),
      },
      {
        id: 'actions',
        header: 'Ação no Grafo',
        cell: ({ row }) => {
          const item = row.original;
          const isAllocated = !!allocatedMap[item.code];
          const allocatedCourse = allocatedMap[item.code];
          return isAllocated ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xs py-0.5 px-2 rounded-md bg-secondary text-white font-mono font-bold border-2 border-border shadow-sm">
                {allocatedCourse.period}ºP
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item.code)}
                className="min-h-[44px] px-2.5 text-xs text-destructive hover:underline font-bold bg-transparent border-none cursor-pointer"
              >
                Remover
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setViewMode('cards');
                setAllocatingCode(item.code);
              }}
              className="min-h-[44px] px-3 rounded-lg border-2 border-border bg-accent-tint text-foreground shadow-sm text-xs font-head font-black uppercase hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              Alocar +
            </button>
          );
        },
      },
    ],
    [allocatedMap]
  );

  const handleAllocate = (course: OptativaItem, period: number) => {
    const raw = getVaultItem('cagp_custom_curriculum_v1');
    const current = raw?.assignedCourses || [];
    const filteredList = current.filter((c) => c.code !== course.code);
    const newCourse: CustomCourse = {
      id: `opt_${course.code.replace(/\s+/g, '_').toLowerCase()}`,
      code: course.code,
      name: course.name,
      dept: course.modulo || course.code.split(' ')[0] || 'DCP',
      ch: course.ch,
      period: period,
      category: 'optativa_catalogo',
    };
    const updated = [...filteredList, newCourse];
    setVaultItem('cagp_custom_curriculum_v1', { assignedCourses: updated });
    setAllocatingCode(null);
  };

  const handleRemove = (code: string) => {
    const raw = getVaultItem('cagp_custom_curriculum_v1');
    const current = raw?.assignedCourses || [];
    const updated = current.filter((c) => c.code !== code);
    setVaultItem('cagp_custom_curriculum_v1', { assignedCourses: updated });
  };

  return (
    <div className="cagp-optativas-catalog space-y-6 select-none text-foreground">
      {/* Barra de Busca e Filtros */}
      <div className="p-4 sm:p-6 bg-white border-2 border-border rounded-xl space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground m-0">
              As {optativas.length} optativas do PPC
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-content-secondary tabular-nums self-start sm:self-auto" aria-live="polite">
              {filtered.length} de {optativas.length}
            </span>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(val) => {
                if (val === 'cards' || val === 'table') setViewMode(val);
              }}
              size="sm"
              variant="outline"
              className="hidden md:flex bg-card rounded-xl p-1 border-2 border-border shadow-sm"
            >
              <ToggleGroupItem value="cards" aria-label="Visualização em Cards" className="min-h-[38px] px-3 font-head font-extrabold uppercase text-xs">
                <i className="bi bi-grid mr-1.5" aria-hidden="true" />
                Cards
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Visualização em Tabela" className="min-h-[38px] px-3 font-head font-extrabold uppercase text-xs">
                <i className="bi bi-table mr-1.5" aria-hidden="true" />
                Tabela
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Busca Instantânea com Foco Roxo Semente (#5B2A85) */}
        <InputGroup className="rounded-xl overflow-hidden border-2 border-border shadow-md focus-within:ring-3 focus-within:ring-primary focus-within:border-primary transition-all">
          <InputGroupAddon position="leading" className="bg-background text-primary font-bold border-r-2 border-border">
            <i className="bi bi-search" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            id="optativas-search-input"
            name="optativas-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Código ou nome (ex.: DCP 035)"
            className="min-h-[46px] bg-white font-body text-sm focus-visible:ring-0"
          />
        </InputGroup>

        {/* Filtros: departamento em chips (uma linha), módulo em seletor nativo (melhor no celular). */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div role="group" aria-label="Departamento" className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto py-1 px-0.5 scroll-mask-x scrollbar-none">
            {DEPT_FILTERS.map((dept) => (
              <button
                key={dept.id}
                type="button"
                title={dept.full}
                aria-pressed={selectedDept === dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className="cagp-chip"
              >
                {dept.label}
              </button>
            ))}
          </div>
          <label className="block sm:w-64 shrink-0">
            <span className="block text-sm font-bold text-foreground mb-1">Módulo</span>
            <select
              value={selectedModulo}
              onChange={(e) => setSelectedModulo(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-xl border-2 border-border bg-white text-base text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <option value="todos">Todos os módulos</option>
              {modulos.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Renderização Condicional: Tabela Operacional vs Grid de Cards Animados */}
      {filtered.length === 0 ? (
        <Empty className="py-12 bg-card border-3 border-border rounded-xl shadow-md">
          <EmptyMedia variant="icon">
            <i className="bi bi-search text-xl" aria-hidden="true" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Nenhuma optativa encontrada</EmptyTitle>
            <EmptyDescription>
              Não encontramos disciplinas para os filtros aplicados. Tente alterar o termo de busca, departamento ou módulo temático.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : viewMode === 'table' ? (
        <div className="bg-card border-2 border-border rounded-xl p-4 shadow-lg overflow-hidden">
          <DataTable
            columns={columns}
            data={filtered}
            filterColumn="name"
            filterPlaceholder="Refinar disciplina na tabela (Foco Roxo Semente)..."
            enablePagination={true}
            pageSizeOptions={[10, 20, 50]}
          />
        </div>
      ) : (
        <motion.div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isAllocated = !!allocatedMap[item.code];
              const allocatedCourse = allocatedMap[item.code];
              // Há códigos repetidos no PPC ("DCP xxx"): a ementa abre pelo par código + nome.
              const ementaKey = `${item.code}-${nomeDisciplina(item.name)}`;
              const ementaId = `ementa-${ementaKey.normalize('NFD').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;
              const isExpanded = ementas.isOpen(ementaKey);
              const isSelectingPeriod = allocatingCode === item.code;

              return (
                <motion.div
                  layout="position"
                  key={ementaKey}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  whileHover={{ x: -2, y: -2 }}
                  transition={tactileSpring}
                  className={`cagp-card p-4 bg-white border-2 border-border rounded-xl flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow ${
                    isAllocated ? 'ring-3 ring-secondary bg-success-tint' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-background border-2 border-border text-primary shadow-sm">
                        {item.code}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {Number.isFinite(item.ch) && (
                          <span className="text-xs font-heading font-bold tabular-nums text-foreground px-2 py-0.5 rounded-md bg-muted">
                            {item.ch}h · {Math.round(item.ch / 15)} créditos
                          </span>
                        )}
                        {isAllocated && (
                          <motion.span
                            initial={{ scale: 1.5, rotate: -6 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={bounceSpring}
                            className="text-xs py-0.5 px-2 rounded-md bg-secondary text-white font-mono font-bold border-2 border-border shadow-sm inline-flex items-center gap-1"
                          >
                            <i className="bi bi-diagram-3-fill text-xs" aria-hidden="true" />
                            <span>NO GRAFO • {allocatedCourse.period}ºP</span>
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-head text-sm font-black text-foreground leading-snug mb-1.5 m-0">
                      {nomeDisciplina(item.name)}
                    </h4>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      {item.modulo ? (
                        <span className="inline-block text-xs text-secondary font-head uppercase font-extrabold tracking-wider">
                          {item.modulo}
                        </span>
                      ) : <span />}
                    </div>

                    {/* Ementa Expansível */}
                    {item.ementa && (
                      <div className="mt-1 pt-2 border-t-2 border-border">
                        <span className="text-xs font-head uppercase font-bold text-secondary block mb-0.5">
                          Ementa Oficial:
                        </span>
                        {item.ementa.length > 90 ? (
                          <>
                            <ExpandRegion
                              id={ementaId}
                              open={isExpanded}
                              peekLines={2}
                              className="font-body text-sm leading-relaxed text-muted-foreground"
                            >
                              <p className="m-0 select-text">{item.ementa}</p>
                            </ExpandRegion>
                            <button
                              type="button"
                              onClick={() => ementas.toggle(ementaKey)}
                              aria-expanded={isExpanded}
                              aria-controls={ementaId}
                              className="min-h-[44px] inline-flex items-center gap-1 text-xs font-head font-extrabold text-primary hover:underline underline-offset-[0.22em] bg-transparent border-none p-0 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Recolher ementa' : 'Ler ementa completa'}</span>
                              <ExpandChevron open={isExpanded} />
                            </button>
                          </>
                        ) : (
                          <p className="font-body text-sm text-muted-foreground leading-relaxed m-0 select-text">
                            {item.ementa}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Ações de Alocação no Grafo */}
                  <div className="pt-3 mt-3 border-t-2 border-border">
                    {isSelectingPeriod ? (
                      <div className="space-y-2">
                        <span className="text-xs font-head uppercase font-extrabold text-foreground block">
                          Selecione o período letivo:
                        </span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => handleAllocate(item, p)}
                              className="min-h-[44px] py-1 bg-white hover:bg-primary hover:text-white border-2 border-border rounded-lg text-xs font-mono font-black transition-all shadow-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                            >
                              {p}ºP
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setAllocatingCode(null)}
                          className="w-full min-h-[40px] text-center text-xs font-head font-bold text-muted-foreground hover:text-foreground py-1 bg-transparent border-none cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : isAllocated ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAllocatingCode(item.code)}
                          className="flex-1 min-h-[44px] px-3 py-1.5 bg-white hover:bg-surface-hover border-3 border-border rounded-xl text-xs font-head uppercase font-extrabold text-foreground transition-all shadow-md active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          Mover ({allocatedCourse.period}ºP)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.code)}
                          className="min-h-[44px] min-w-[44px] px-3 py-1.5 bg-red-100 hover:bg-red-200 text-secondary border-3 border-border rounded-xl text-xs font-bold transition-all shadow-md active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center justify-center"
                          title="Desvincular do Grafo"
                          aria-label="Desvincular do Grafo"
                        >
                          <i className="bi bi-trash" aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAllocatingCode(item.code)}
                        className="w-full min-h-[44px] px-3 py-2 bg-primary hover:bg-primary-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl text-xs font-head uppercase font-extrabold tracking-wider flex items-center justify-center gap-1.5 transition-all border-3 border-border shadow-md cursor-pointer"
                      >
                        <i className="bi bi-plus-circle" aria-hidden="true" />
                        <span>Pôr na minha grade</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
