import React from 'react';
import {
  SIMULATED_NEWS,
  SIMULATION_NOTICE,
  type SimulatedNewsItem,
} from '../../../lib/simulatedData';
import { route } from '../../../lib/paths';

export function renderNewsMotifSvg(motif: SimulatedNewsItem['motif']) {
  if (motif === 'assembleia') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#9E2424" />
        <circle cx="270" cy="25" r="55" fill="#8B1E2D" />
        <path d="M24 96H296" stroke="#0A0A0A" strokeWidth="4" />
        <rect x="32" y="34" width="14" height="62" rx="2" fill="#FFFFFF" fillOpacity="0.4" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="58" y="24" width="14" height="72" rx="2" fill="#FFFFFF" fillOpacity="0.6" stroke="#0A0A0A" strokeWidth="2" />
        <rect x="84" y="42" width="14" height="54" rx="2" fill="#FFFFFF" fillOpacity="0.4" stroke="#0A0A0A" strokeWidth="2" />
        <circle cx="248" cy="64" r="24" stroke="#0A0A0A" strokeWidth="3" fill="#FF8811" />
      </svg>
    );
  }
  if (motif === 'carreiras') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#1E3F66" />
        <circle cx="265" cy="95" r="65" fill="#005A9C" fillOpacity="0.55" />
        <path d="M30 88L95 54L150 70L225 32L285 44" stroke="#0A0A0A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="54" r="6" fill="#FFFDF9" stroke="#0A0A0A" strokeWidth="2" />
        <circle cx="150" cy="70" r="6" fill="#FFFDF9" stroke="#0A0A0A" strokeWidth="2" />
        <circle cx="225" cy="32" r="7" fill="#FF8811" stroke="#0A0A0A" strokeWidth="2" />
      </svg>
    );
  }
  if (motif === 'calourada') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#15803D" />
        <circle cx="60" cy="20" r="50" fill="#166534" />
        <circle cx="255" cy="60" r="32" stroke="#0A0A0A" strokeWidth="3" fill="#FEF08A" />
        <path d="M180 95C195 68 230 68 245 95" stroke="#FFFDF9" strokeWidth="3.5" fill="none" />
        <path d="M225 95C240 68 275 68 290 95" stroke="#FF8811" strokeWidth="3.5" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
      <rect width="320" height="120" fill="#5B2A86" />
      <circle cx="90" cy="60" r="24" stroke="#0A0A0A" strokeWidth="3" fill="#FF8811" />
      <circle cx="170" cy="38" r="18" stroke="#0A0A0A" strokeWidth="3" fill="#FFFFFF" />
      <circle cx="240" cy="74" r="22" stroke="#0A0A0A" strokeWidth="3" fill="#266264" />
    </svg>
  );
}

export const HomeNewsFeed: React.FC = () => {
  const featured = SIMULATED_NEWS.slice(0, 3);

  return (
    <section aria-labelledby="heading-news-mural" className="space-y-3.5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#9E2424] border border-black shrink-0" aria-hidden="true" />
          <h2
            id="heading-news-mural"
            className="font-heading text-base sm:text-lg font-extrabold uppercase text-[#0A0A0A] m-0"
          >
            Mural de Notícias, Eventos & Carreiras
          </h2>
        </div>

        <a
          href={route('/noticias')}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase bg-white hover:bg-muted text-[#0A0A0A] hover:text-[#9E2424] border-[2.5px] border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] no-underline inline-flex items-center gap-1.5 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none tabular-nums"
        >
          <span>Mural completo ({SIMULATED_NEWS.length})</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      {/* Tarja de Transparência Simulação */}
      <div
        role="note"
        className="px-4 py-2.5 rounded-xl bg-[#FEF08A] border-[2.5px] border-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] flex flex-wrap items-center justify-between gap-2 text-xs text-[#0A0A0A]"
      >
        <span className="font-medium">
          <strong>Aviso:</strong> {SIMULATION_NOTICE}
        </span>
        <span className="font-mono text-[11px] font-bold uppercase bg-white px-2 py-0.5 rounded border-2 border-black">
          simulado
        </span>
      </div>

      {/* Grid de Notícias Neobrutalistas */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 snap-x snap-mandatory">
        {featured.map((item) => {
          const badgeClass =
            item.tagColor === 'burgundy'
              ? 'bg-[#9E2424] text-white'
              : item.tagColor === 'gold'
              ? 'bg-[#E8A317] text-[#0A0A0A]'
              : item.tagColor === 'green'
              ? 'bg-[#15803D] text-white'
              : 'bg-[#5B2A86] text-white';

          const articleUrl = route(`/noticias/${item.slug}`);

          return (
            <article
              key={item.id}
              className="w-[285px] md:w-auto shrink-0 snap-start bg-white rounded-xl overflow-hidden border-[3px] border-[#0A0A0A] shadow-[4px_4px_0_0_#0A0A0A] hover:shadow-[6px_6px_0_0_#0A0A0A] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <a
                href={articleUrl}
                className="no-underline text-inherit flex flex-col flex-1 justify-between"
              >
                <div>
                  <div className="h-32 relative overflow-hidden border-b-[3px] border-[#0A0A0A]">
                    {renderNewsMotifSvg(item.motif)}
                    <span
                      className={`absolute top-2.5 left-2.5 text-[11px] font-heading font-extrabold uppercase px-2.5 py-1 rounded-lg border-2 border-black shadow-[1.5px_1.5px_0_0_#0A0A0A] ${badgeClass}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-extrabold text-sm text-[#0A0A0A] group-hover:text-[#9E2424] transition-colors leading-snug m-0">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#57534E] font-medium mt-2 mb-0 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3 pt-2.5 border-t-[2px] border-[#0A0A0A]/15 flex items-center justify-between text-xs bg-white">
                  <span className="text-[#57534E] font-mono text-[11px] font-medium truncate tabular-nums">
                    {item.meta}
                  </span>
                  <span className="font-heading font-bold text-[#9E2424] shrink-0 ml-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ler</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};
