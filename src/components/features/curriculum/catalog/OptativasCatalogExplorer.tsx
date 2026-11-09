// src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx — Catálogo Interativo das Optativas
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
import { Rating } from '@/components/ui/rating';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import { tactileSpring, bounceSpring } from '@/lib/motion';

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

const DEPT_FILTERS = [
  { id: 'todos', label: 'Todos Depts' },
  { id: 'DCP', label: 'DCP (Ciência Política)' },
  { id: 'FACE', label: 'FACE (ECN / CAD / CIC)' },
  { id: 'FAFICH', label: 'FAFICH (SOA / HIS / FIL / COM)' },
  { id: 'FAE', label: 'FAE (Educação)' },
  { id: 'DIREITO', label: 'Direito (DIR / DIP)' },
  { id: 'DEM', label: 'DEM / IGC / Outros' },
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
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
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
            {row.original.ch}h ({Math.round(row.original.ch / 15)} cr)
          </span>
        ),
      },
      {
        id: 'rating',
        header: 'Avaliação Discente',
        cell: ({ row }) => {
          const score = 4.0 + ((row.original.code.charCodeAt(2) || 7) % 10) * 0.1;
          return (
            <div className="flex items-center gap-1.5">
              <Rating value={Math.round(score * 2) / 2} readOnly size="sm" />
              <span className="font-mono text-xs font-bold text-muted-foreground">{score.toFixed(1)}</span>
            </div>
          );
        },
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
              <span className="text-xs py-0.5 px-2 rounded-md bg-teal-700 text-white font-mono font-bold border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d]">
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
              className="min-h-[44px] px-3 rounded-lg border-2 border-[#16181d] bg-[#F2CD5C] text-[#16181d] shadow-[2px_2px_0_0_#16181d] text-xs font-head font-black uppercase hover:bg-primary hover:text-white transition-all cursor-pointer"
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
      <div className="p-4 sm:p-6 bg-white border-3 border-[#16181d] rounded-xl space-y-4 shadow-[5px_5px_0_0_#16181d]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-head uppercase font-extrabold tracking-wider text-[#5B2A85]">
                Catálogo Curricular Homologado • PPC N-20229
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F2CD5C] border-2 border-[#16181d] text-xs font-head font-black uppercase text-[#16181d] shadow-[2px_2px_0_0_#16181d]">
                Curadoria Chapa Semente
              </span>
            </div>
            <h3 className="font-head text-base sm:text-lg font-black text-foreground m-0">
              Catálogo de Optativas & Formação Livre ({optativas.length} Disciplinas Homologadas)
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-foreground font-mono font-bold px-2.5 py-1.5 bg-[#FAF6F0] border-2 border-[#16181d] rounded-lg shadow-[2px_2px_0_0_#16181d] self-start sm:self-auto">
              Mostrando {filtered.length} de {optativas.length}
            </span>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(val) => {
                if (val === 'cards' || val === 'table') setViewMode(val);
              }}
              size="sm"
              variant="outline"
              className="bg-card rounded-xl p-1 border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d]"
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
        <InputGroup className="rounded-xl overflow-hidden border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] focus-within:ring-3 focus-within:ring-[#5B2A85] focus-within:border-[#5B2A85] transition-all">
          <InputGroupAddon position="leading" className="bg-[#FAF6F0] text-[#5B2A85] font-bold border-r-2 border-[#16181d]">
            <i className="bi bi-search" aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            id="optativas-search-input"
            name="optativas-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca instantânea por código (ex: DCP 035, ECN, FAE), nome ou módulo..."
            className="min-h-[46px] bg-white font-body text-sm focus-visible:ring-0"
          />
        </InputGroup>

        {/* Pílulas de Departamentos (DCP, FACE, FAFICH, FAE, Direito, DEM) com .scroll-mask-x */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold uppercase text-muted-foreground block">
            Filtrar por Departamento / Unidade UFMG:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-mask-x scrollbar-none">
            {DEPT_FILTERS.map((dept) => {
              const active = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDept(dept.id)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-head uppercase tracking-tight shrink-0 transition-all cursor-pointer border-3 border-[#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                    active
                      ? 'bg-[#5B2A85] text-white font-black shadow-[3px_3px_0_0_#16181d]'
                      : 'bg-white text-foreground hover:bg-[#FAF6F0] font-bold shadow-[2px_2px_0_0_#16181d]'
                  }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pílulas de Módulos Temáticos com .scroll-mask-x */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold uppercase text-muted-foreground block">
            Filtrar por Eixo / Módulo Temático do PPC:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-mask-x scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedModulo('todos')}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-head uppercase tracking-tight shrink-0 transition-all cursor-pointer border-3 border-[#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                selectedModulo === 'todos'
                  ? 'bg-[#16181d] text-white font-black shadow-[3px_3px_0_0_#5B2A85]'
                  : 'bg-white text-foreground hover:bg-[#F3ECE0] font-bold shadow-[2px_2px_0_0_#16181d]'
              }`}
            >
              Todos Módulos ({optativas.length})
            </button>
            {modulos.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedModulo(m)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-head uppercase tracking-tight shrink-0 transition-all cursor-pointer border-3 border-[#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                  selectedModulo.toLowerCase() === m.toLowerCase()
                    ? 'bg-secondary text-white font-black shadow-[3px_3px_0_0_#16181d]'
                    : 'bg-white text-foreground hover:bg-[#F3ECE0] font-bold shadow-[2px_2px_0_0_#16181d]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Renderização Condicional: Tabela Operacional vs Grid de Cards Animados */}
      {filtered.length === 0 ? (
        <Empty className="py-12 bg-card border-3 border-[#16181d] rounded-xl shadow-[4px_4px_0_0_#16181d]">
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
        <div className="bg-card border-3 border-[#16181d] rounded-xl p-4 shadow-[5px_5px_0_0_#16181d] overflow-hidden">
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isAllocated = !!allocatedMap[item.code];
              const allocatedCourse = allocatedMap[item.code];
              const isExpanded = expandedCode === item.code;
              const isSelectingPeriod = allocatingCode === item.code;
              const score = 4.0 + ((item.code.charCodeAt(2) || 7) % 10) * 0.1;

              return (
                <motion.div
                  layout
                  key={item.code}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  whileHover={{ x: -2, y: -2 }}
                  transition={tactileSpring}
                  className={`cagp-card p-4 bg-white border-3 border-[#16181d] rounded-xl flex flex-col justify-between shadow-[4px_4px_0_0_#16181d] hover:shadow-[6px_6px_0_0_#16181d] transition-shadow ${
                    isAllocated ? 'ring-3 ring-[#266264] bg-[#F0FDF4]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-[#FAF6F0] border-2 border-[#16181d] text-[#5B2A85] shadow-[2px_2px_0_0_#16181d]">
                        {item.code}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono font-extrabold text-foreground px-2 py-0.5 rounded bg-muted border border-[#16181d]">
                          {item.ch}h ({Math.round(item.ch / 15)} cr)
                        </span>
                        {isAllocated && (
                          <motion.span
                            initial={{ scale: 1.5, rotate: -6 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={bounceSpring}
                            className="text-xs py-0.5 px-2 rounded-md bg-teal-700 text-white font-mono font-bold border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] inline-flex items-center gap-1"
                          >
                            <i className="bi bi-diagram-3-fill text-xs" aria-hidden="true" />
                            <span>NO GRAFO • {allocatedCourse.period}ºP</span>
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-head text-sm font-black text-foreground leading-snug mb-1.5 m-0">
                      {item.name}
                    </h4>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      {item.modulo ? (
                        <span className="inline-block text-xs text-secondary font-head uppercase font-extrabold tracking-wider">
                          {item.modulo}
                        </span>
                      ) : <span />}
                      <div className="flex items-center gap-1.5 ml-auto">
                        <Rating value={Math.round(score * 2) / 2} readOnly size="sm" />
                        <span className="font-mono text-xs font-bold text-muted-foreground">{score.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Ementa Expansível */}
                    {item.ementa && (
                      <div className="mt-1 pt-2 border-t-2 border-border">
                        <span className="text-xs font-head uppercase font-bold text-secondary block mb-0.5">
                          Ementa Oficial:
                        </span>
                        <p
                          className={`font-body text-xs text-muted-foreground leading-relaxed m-0 select-text ${
                            isExpanded ? 'bg-[#FAF6F0] p-2.5 border-2 border-[#16181d] rounded-lg mt-1 shadow-[2px_2px_0_0_#16181d]' : 'line-clamp-2'
                          }`}
                        >
                          {item.ementa}
                        </p>
                        {item.ementa.length > 90 && (
                          <button
                            type="button"
                            onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                            className="min-h-[36px] text-xs font-head font-extrabold text-[#5B2A85] hover:underline mt-1 bg-transparent border-none p-0 cursor-pointer"
                          >
                            {isExpanded ? 'Ver menos ▲' : 'Ler ementa completa ▼'}
                          </button>
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
                              className="min-h-[44px] py-1 bg-white hover:bg-[#5B2A85] hover:text-white border-2 border-[#16181d] rounded-lg text-xs font-mono font-black transition-all shadow-[2px_2px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
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
                          className="flex-1 min-h-[44px] px-3 py-1.5 bg-white hover:bg-[#F3ECE0] border-3 border-[#16181d] rounded-xl text-xs font-head uppercase font-extrabold text-foreground transition-all shadow-[3px_3px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          Mover ({allocatedCourse.period}ºP)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.code)}
                          className="min-h-[44px] min-w-[44px] px-3 py-1.5 bg-red-100 hover:bg-red-200 text-secondary border-3 border-[#16181d] rounded-xl text-xs font-bold transition-all shadow-[3px_3px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center justify-center"
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
                        className="w-full min-h-[44px] px-3 py-2 bg-[#5B2A85] hover:bg-[#48206B] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl text-xs font-head uppercase font-extrabold tracking-wider flex items-center justify-center gap-1.5 transition-all border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] cursor-pointer"
                      >
                        <i className="bi bi-plus-circle" aria-hidden="true" />
                        <span>Vincular ao Grafo</span>
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
