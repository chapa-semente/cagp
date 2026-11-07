// src/components/features/curriculum/catalog/OptativasCatalogExplorer.tsx — Catálogo Interativo das 68 Optativas
import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  setVaultItem,
  type CustomCourse,
} from '../../../../lib/storage/studentVault';

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

export const OptativasCatalogExplorer: React.FC<Props> = ({ optativas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModulo, setSelectedModulo] = useState<string>('todos');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [allocatedMap, setAllocatedMap] = useState<Record<string, CustomCourse>>({});
  const [allocatingCode, setAllocatingCode] = useState<string | null>(null);

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

    const matchModulo =
      selectedModulo === 'todos' ||
      (o.modulo || 'Geral').toLowerCase() === selectedModulo.toLowerCase();

    return matchSearch && matchModulo;
  });

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
    <div className="cagp-optativas-catalog space-y-6 select-none text-[#0A0A0A]">
      {/* Barra de Busca e Filtros */}
      <div className="p-6 bg-white border-[3px] border-[#0A0A0A] rounded-xl space-y-4 shadow-[4px_4px_0_0_#0A0A0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-head uppercase font-bold tracking-wider text-[#9E2424]">
              Catálogo Curricular Homologado
            </span>
            <h3 className="font-head text-base sm:text-lg font-black uppercase text-[#0A0A0A] m-0">
              68 Disciplinas Optativas do PPC 2020
            </h3>
          </div>
          <span className="text-xs text-[#57534E] font-mono font-bold px-2.5 py-1 bg-white border border-[#0A0A0A] rounded-md shadow-[1px_1px_0_0_#0A0A0A] self-start sm:self-auto">
            Mostrando {filtered.length} de {optativas.length}
          </span>
        </div>

        <div className="relative">
          <i
            className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#57534E] text-sm"
            aria-hidden="true"
          />
          <input
            type="text"
            id="optativas-search-input"
            name="optativas-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código (ex: DCP 035), nome ou módulo..."
            className="w-full min-h-[44px] pl-10 pr-4 py-2.5 bg-white border-2 border-[#0A0A0A] rounded-xl text-sm font-body text-[#0A0A0A] placeholder-[#57534E] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#9E2424] transition-all"
          />
        </div>

        {/* Pílulas de Modulos */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedModulo('todos')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-head uppercase tracking-tight shrink-0 transition-all cursor-pointer border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              selectedModulo === 'todos'
                ? 'bg-[#0A0A0A] text-white font-bold'
                : 'bg-white text-[#0A0A0A] hover:bg-[#F3ECE0]'
            }`}
          >
            Todos ({optativas.length})
          </button>
          {modulos.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedModulo(m)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-head uppercase tracking-tight shrink-0 transition-all cursor-pointer border-2 border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                selectedModulo.toLowerCase() === m.toLowerCase()
                  ? 'bg-[#9E2424] text-white font-bold'
                  : 'bg-white text-[#0A0A0A] hover:bg-[#F3ECE0]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards de Optativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isAllocated = !!allocatedMap[item.code];
          const allocatedCourse = allocatedMap[item.code];
          const isExpanded = expandedCode === item.code;
          const isSelectingPeriod = allocatingCode === item.code;

          return (
            <div
              key={item.code}
              className={`cagp-card p-4 bg-white border-2 border-[#0A0A0A] rounded-xl flex flex-col justify-between shadow-[3px_3px_0_0_#0A0A0A] hover:shadow-[1.5px_1.5px_0_0_#0A0A0A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all ${
                isAllocated ? 'ring-2 ring-[#266264]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-[#0A0A0A] text-[#9E2424] shadow-[1px_1px_0_0_#0A0A0A]">
                    {item.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#57534E]">
                      {item.ch}h ({Math.round(item.ch / 15)} cr)
                    </span>
                    {isAllocated && (
                      <span className="text-[10px] py-0.5 px-2 rounded-md bg-[#266264] text-white font-mono font-bold border border-[#0A0A0A] shadow-[1px_1px_0_0_#0A0A0A] inline-flex items-center gap-1">
                        <i className="bi bi-diagram-3-fill text-[10px]" aria-hidden="true" />
                        <span>NO GRAFO • {allocatedCourse.period}ºP</span>
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-head text-sm font-bold uppercase text-[#0A0A0A] leading-snug mb-1 m-0">
                  {item.name}
                </h4>

                {item.modulo && (
                  <span className="inline-block text-[10px] text-[#57534E] font-head uppercase font-bold tracking-wider mb-2">
                    {item.modulo}
                  </span>
                )}

                {/* Ementa Expansível */}
                {item.ementa && (
                  <div className="mt-1 pt-2 border-t-2 border-[#0A0A0A]/20">
                    <span className="text-[10px] font-head uppercase font-bold text-[#9E2424] block mb-0.5">
                      Ementa Oficial:
                    </span>
                    <p
                      className={`font-body text-xs text-[#292524] leading-relaxed m-0 select-text ${
                        isExpanded ? 'bg-white p-2 border border-[#0A0A0A] rounded-lg mt-1 shadow-xs' : 'line-clamp-2'
                      }`}
                    >
                      {item.ementa}
                    </p>
                    {item.ementa.length > 90 && (
                      <button
                        type="button"
                        onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                        className="text-[11px] font-head font-bold text-[#9E2424] hover:underline mt-1 bg-transparent border-none p-0 cursor-pointer"
                      >
                        {isExpanded ? 'Ver menos ▲' : 'Ler ementa completa ▼'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Ações de Alocação no Grafo */}
              <div className="pt-3 mt-3 border-t-2 border-[#0A0A0A]/20">
                {isSelectingPeriod ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-head uppercase font-bold text-[#0A0A0A] block">
                      Selecione o período letivo:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleAllocate(item, p)}
                          className="min-h-[36px] py-1 bg-white hover:bg-[#9E2424] hover:text-white border border-[#0A0A0A] rounded-lg text-xs font-mono font-bold transition-all shadow-[1px_1px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          {p}ºP
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAllocatingCode(null)}
                      className="w-full text-center text-xs font-head font-bold text-[#57534E] hover:text-[#0A0A0A] py-1 bg-transparent border-none cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : isAllocated ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAllocatingCode(item.code)}
                      className="flex-1 min-h-[40px] px-3 py-1.5 bg-white hover:bg-[#F3ECE0] border-2 border-[#0A0A0A] rounded-xl text-xs font-head uppercase font-bold text-[#0A0A0A] transition-all shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                    >
                      Mover ({allocatedCourse.period}ºP)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.code)}
                      className="min-h-[40px] min-w-[40px] px-3 py-1.5 bg-red-100 hover:bg-red-200 text-[#9E2424] border-2 border-[#0A0A0A] rounded-xl text-xs font-bold transition-all shadow-[2px_2px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer flex items-center justify-center"
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
                    className="w-full min-h-[42px] px-3 py-2 bg-[#0A0A0A] hover:bg-[#9E2424] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-white rounded-xl text-xs font-head uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all border-2 border-[#0A0A0A] shadow-[2.5px_2.5px_0_0_#0A0A0A] cursor-pointer"
                  >
                    <i className="bi bi-plus-circle" aria-hidden="true" />
                    <span>Vincular ao Grafo</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
