import React, { useState } from 'react';
import {
  SIMULATED_NEWS,
  SIMULATION_NOTICE,
  SIMULATION_BADGE_TEXT,
  type NewsCategory,
  type SimulatedNewsItem,
} from '../../../lib/simulatedData';
import { CagpIcon } from '../../ui/CagpIcon';
import { route } from '../../../lib/paths';

function renderNewsArtwork(motif: SimulatedNewsItem['motif']) {
  if (motif === 'assembleia') {
    return (
      <svg viewBox="0 0 320 140" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="140" fill="#8B1E2D" />
        <circle cx="270" cy="30" r="60" fill="#9E2424" />
        <path d="M24 112H296" stroke="#E8A317" strokeWidth="2" strokeOpacity="0.6" />
        <rect x="32" y="42" width="14" height="70" rx="2" fill="#FBF8F3" fillOpacity="0.18" />
        <rect x="58" y="32" width="14" height="80" rx="2" fill="#FBF8F3" fillOpacity="0.26" />
        <rect x="84" y="50" width="14" height="62" rx="2" fill="#FBF8F3" fillOpacity="0.18" />
        <circle
          cx="248"
          cy="72"
          r="26"
          stroke="#E8A317"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 3"
        />
      </svg>
    );
  }
  if (motif === 'carreiras') {
    return (
      <svg viewBox="0 0 320 140" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="140" fill="#1E3F66" />
        <circle cx="265" cy="105" r="70" fill="#005A9C" fillOpacity="0.55" />
        <path
          d="M30 100L95 62L150 80L225 38L285 50"
          stroke="#E8A317"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="95" cy="62" r="4.5" fill="#FFFDF9" />
        <circle cx="150" cy="80" r="4.5" fill="#FFFDF9" />
        <circle cx="225" cy="38" r="5" fill="#E8A317" />
      </svg>
    );
  }
  if (motif === 'calourada') {
    return (
      <svg viewBox="0 0 320 140" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="140" fill="#15803D" />
        <circle cx="60" cy="24" r="55" fill="#166534" />
        <circle cx="255" cy="68" r="34" stroke="#FEF3C7" strokeWidth="2.5" fill="none" />
        <path
          d="M180 108C195 78 230 78 245 108"
          stroke="#FFFDF9"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M225 108C240 78 275 78 290 108"
          stroke="#E8A317"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 140" className="w-full h-full object-cover" aria-hidden="true">
      <rect width="320" height="140" fill="#3B1D24" />
      <circle cx="90" cy="68" r="24" stroke="#E8A317" strokeWidth="2" fill="none" />
      <circle cx="170" cy="44" r="18" stroke="#FFFDF9" strokeWidth="2" fill="none" />
      <circle cx="240" cy="84" r="22" stroke="#E8A317" strokeWidth="2" fill="none" />
      <path
        d="M112 60L154 48M186 52L222 74"
        stroke="#FFFDF9"
        strokeWidth="1.75"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

interface CagpNewsMuralProps {
  items?: SimulatedNewsItem[];
}

export const CagpNewsMural: React.FC<CagpNewsMuralProps> = ({ items = SIMULATED_NEWS }) => {
  const [category, setCategory] = useState<NewsCategory>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredNews = items.filter((item) => {
    const matchesCategory = category === 'todas' ? true : item.category === category;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Navegação da Subseção de Início */}
      <nav
        aria-label="Navegação da Subseção de Início"
        className="bg-white rounded-2xl border border-[#DFDBD2] p-2 flex flex-wrap items-center gap-1.5 shadow-2xs"
      >
        <a
          href={route('/')}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#292524] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors"
        >
          &larr; Voltar ao Início
        </a>
        <a
          href={route('/noticias')}
          aria-current="page"
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#8B1E2D] text-white no-underline shadow-2xs"
        >
          Mural de Notícias
        </a>
        <a
          href={route('/') + '#campus'}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#292524] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors"
        >
          Plantão Noturno • Campus
        </a>
        <a
          href={route('/') + '#passaporte'}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#292524] hover:bg-[#FBF8F3] hover:text-[#8B1E2D] no-underline transition-colors"
        >
          Passaporte Discente
        </a>
      </nav>

      {/* Aviso Obrigatório de Simulação (PRODUCT.md) */}
      <div
        role="note"
        className="p-4 rounded-2xl bg-[#FEF3C7]/85 border border-[#F59E0B]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78350F]"
      >
        <div className="space-y-1">
          <strong className="font-bold text-[#78350F] block">
            Aviso de Simulação — Mural Editorial Demonstrativo
          </strong>
          <p className="m-0 text-[#78350F] leading-relaxed">
            {SIMULATION_NOTICE} Clique em qualquer card ou em <strong>Ler na íntegra</strong> para
            abrir a página exclusiva da notícia com texto completo e referências normativas.
          </p>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase bg-white px-2.5 py-1 rounded-full border border-[#F59E0B]/40 shrink-0 self-start sm:self-center">
          {SIMULATION_BADGE_TEXT}
        </span>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-white rounded-3xl border border-[#DFDBD2] p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'todas', label: 'Todas as Publicações' },
              { id: 'assembleia', label: 'Assembleias & Colegiado' },
              { id: 'estagio', label: 'Estágios & Carreiras' },
              { id: 'eventos', label: 'Calourada & Atlética' },
              { id: 'academico', label: 'Seminários & Congressos' },
            ] as { id: NewsCategory; label: string }[]
          ).map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer border ${
                  active
                    ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                    : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] text-[#292524] border-[#DFDBD2]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar pauta, evento, edital..."
            aria-label="Filtrar notícias do CAGP"
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FBF8F3] border border-[#DFDBD2] text-xs text-[#0A0A0A] placeholder:text-[#78716C]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B1E2D] pointer-events-none">
            <CagpIcon name="search" className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Grid Completo de Notícias (Cada Card Abre a Página Dedicada /noticias/[slug]) */}
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DFDBD2] p-8 text-center space-y-2">
          <p className="text-sm font-bold text-[#0A0A0A] m-0">
            Nenhuma notícia encontrada para este filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('todas');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#8B1E2D] text-white text-xs font-bold cursor-pointer border-0"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNews.map((item) => {
            const badgeClass =
              item.tagColor === 'burgundy'
                ? 'bg-[#8B1E2D] text-white'
                : item.tagColor === 'gold'
                ? 'bg-[#E8A317] text-[#0A0A0A]'
                : item.tagColor === 'green'
                ? 'bg-[#15803D] text-white'
                : 'bg-[#005A9C] text-white';

            const articleHref = route(`/noticias/${item.slug}`);

            return (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#DFDBD2] hover:border-[#8B1E2D]/60 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
              >
                <a
                  href={articleHref}
                  className="no-underline text-inherit flex flex-col flex-1 justify-between"
                >
                  <div>
                    <div className="h-36 relative overflow-hidden">
                      {renderNewsArtwork(item.motif)}
                      <span
                        className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${badgeClass}`}
                      >
                        {item.tag}
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-black/65 text-white px-2 py-0.5 rounded-full">
                        Simulação
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#57534E]">
                        <span>{item.dateLabel}</span>
                        <span>{item.readingTime}</span>
                      </div>

                      <h2 className="font-bold text-sm sm:text-base text-[#0A0A0A] group-hover:text-[#8B1E2D] transition-colors leading-snug m-0">
                        {item.title}
                      </h2>

                      <p className="text-xs text-[#57534E] m-0 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between text-xs">
                    <span className="text-[#57534E] font-medium truncate">{item.meta}</span>
                    <span className="font-bold text-[#8B1E2D] shrink-0 ml-2 inline-flex items-center gap-1">
                      <span>Ler na íntegra</span>
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
