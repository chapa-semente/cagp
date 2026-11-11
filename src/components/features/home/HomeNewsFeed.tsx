import React from 'react';
import { motion } from 'motion/react';
import {
  SIMULATED_NEWS,
  SIMULATION_NOTICE,
  type SimulatedNewsItem,
} from '@/lib/simulatedData';
import { route } from '@/lib/paths';
import {
  photoCardHover,
  photoCardTap,
  photoZoomSpring,
  tactileSpring,
} from '@/lib/motion';

export function renderNewsMotifSvg(motif: SimulatedNewsItem['motif']) {
  if (motif === 'assembleia') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#FE8812" />
        <circle cx="270" cy="25" r="55" fill="#5B2A85" />
        <path d="M24 96H296" stroke="#1F1F1F" strokeWidth="4" />
        <rect x="32" y="34" width="14" height="62" rx="2" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2" />
        <rect x="58" y="24" width="14" height="72" rx="2" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2" />
        <rect x="84" y="42" width="14" height="54" rx="2" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="2" />
        <circle cx="248" cy="64" r="24" stroke="#1F1F1F" strokeWidth="3" fill="#FFFFFF" />
      </svg>
    );
  }
  if (motif === 'carreiras') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#266264" />
        <circle cx="265" cy="95" r="65" fill="#134E4A" />
        <path d="M30 88L95 54L150 70L225 32L285 44" stroke="#1F1F1F" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="54" r="6" fill="#ffffff" stroke="#1F1F1F" strokeWidth="2" />
        <circle cx="150" cy="70" r="6" fill="#ffffff" stroke="#1F1F1F" strokeWidth="2" />
        <circle cx="225" cy="32" r="7" fill="#FE8812" stroke="#1F1F1F" strokeWidth="2" />
      </svg>
    );
  }
  if (motif === 'calourada') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#5B2A85" />
        <circle cx="60" cy="20" r="50" fill="#266264" />
        <circle cx="255" cy="60" r="32" stroke="#1F1F1F" strokeWidth="3" fill="#FFEEDB" />
        <path d="M180 95C195 68 230 68 245 95" stroke="#ffffff" strokeWidth="3.5" fill="none" />
        <path d="M225 95C240 68 275 68 290 95" stroke="#FE8812" strokeWidth="3.5" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
      <rect width="320" height="120" fill="#5B2A85" />
      <circle cx="90" cy="60" r="24" stroke="#1F1F1F" strokeWidth="3" fill="#FE8812" />
      <circle cx="170" cy="38" r="18" stroke="#1F1F1F" strokeWidth="3" fill="#FFFFFF" />
      <circle cx="240" cy="74" r="22" stroke="#1F1F1F" strokeWidth="3" fill="#266264" />
    </svg>
  );
}

export const HomeNewsFeed: React.FC = () => {
  const featured = SIMULATED_NEWS.slice(0, 3);

  return (
    <section
      id="cagp-home-news-feed"
      aria-labelledby="heading-news-mural"
      className="space-y-3.5 font-sans"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-secondary border border-border shrink-0" aria-hidden="true" />
          <h2
            id="heading-news-mural"
            className="font-heading text-base sm:text-lg font-extrabold text-foreground m-0"
          >
            Mural
          </h2>
        </div>

        <a
          href={route('/noticias')}
          className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wide bg-white hover:bg-muted text-foreground hover:text-secondary border-3 border-border shadow-xs no-underline inline-flex items-center gap-1.5 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 tabular-nums"
        >
          <span>Mural completo ({SIMULATED_NEWS.length})</span>
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
      </div>

      {/* Tarja de Transparência Simulação */}
      <div
        role="note"
        className="px-4 py-2.5 rounded-xl bg-warning-tint border-3 border-border shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs text-foreground"
      >
        <span className="font-medium max-w-prose">
          <strong>Aviso:</strong> {SIMULATION_NOTICE}
        </span>
        <span className="font-mono text-xs font-bold uppercase bg-white px-2 py-0.5 rounded border-2 border-border tracking-wider">
          simulado
        </span>
      </div>

      {/* Grid Bento de Notícias Neobrutalistas (1 col 320-639px, 2 cols 640-1023px, 3 cols 1024px+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((item) => {
          const badgeClass =
            item.tagColor === 'burgundy'
              ? 'bg-secondary text-white'
              : item.tagColor === 'gold'
              ? 'bg-orange-text text-white'
              : item.tagColor === 'green'
              ? 'bg-success text-white'
              : 'bg-primary text-white';

          const articleUrl = route(`/noticias/${item.slug}`);

          return (
            <motion.article
              key={item.id}
              data-context-type="news"
              data-context-data={JSON.stringify({ id: item.id, title: item.title, slug: item.slug })}
              whileHover={{ y: -3, x: -2 }}
              whileTap={{ y: 2, x: 2 }}
              transition={tactileSpring}
              className="bg-card rounded-xl overflow-hidden border-3 border-border shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between group cursor-pointer"
            >
              <a
                href={articleUrl}
                className="no-underline text-inherit flex flex-col flex-1 justify-between p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              >
                <div>
                  <motion.div
                    whileHover={photoCardHover}
                    whileTap={photoCardTap}
                    transition={photoZoomSpring}
                    className="aspect-[16/10] relative overflow-hidden rounded-lg border-3 border-border shadow-xs mb-3"
                  >
                    {renderNewsMotifSvg(item.motif)}
                    <span
                      className={`absolute top-2.5 left-2.5 text-xs font-heading font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-lg border-2 border-border shadow-xs ${badgeClass}`}
                    >
                      {item.tag}
                    </span>
                  </motion.div>
                  <div className="px-1 pb-2">
                    <h3 className="font-heading font-extrabold text-sm text-foreground group-hover:text-secondary transition-colors leading-snug m-0">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-2 mb-0 line-clamp-2 leading-relaxed max-w-prose">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-1 pt-2.5 mt-2 border-t-2 border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono text-xs font-bold truncate tabular-nums">
                    {item.meta}
                  </span>
                  <span className="font-heading font-extrabold uppercase tracking-wide text-secondary shrink-0 ml-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ler</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
