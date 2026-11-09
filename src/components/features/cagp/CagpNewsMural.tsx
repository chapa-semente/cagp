import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SIMULATED_NEWS,
  SIMULATION_NOTICE,
  SIMULATION_BADGE_TEXT,
  type NewsCategory,
  type SimulatedNewsItem,
} from '@/lib/simulatedData';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { route } from '@/lib/paths';
import {
  photoCardHover,
  photoCardTap,
  photoZoomSpring,
  tactileSpring,
  staggerContainer,
  staggerItem,
} from '@/lib/motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  const isDefaultView = category === 'todas' && !searchQuery.trim();
  const leadStory = isDefaultView && filteredNews.length > 0 ? filteredNews[0] : null;
  const gridStories = isDefaultView ? filteredNews.slice(1) : filteredNews;

  return (
    <div className="space-y-6 pb-8 font-sans">
      {/* Barra Superior Discreta: Retorno & Aviso de Simulação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <a
          href={route('/')}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-heading font-extrabold uppercase text-foreground hover:text-primary hover:bg-muted/70 no-underline transition-colors inline-flex items-center gap-1.5 border-2 border-transparent hover:border-border self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Voltar ao Hoje &amp; Campus</span>
        </a>

        <div
          role="note"
          className="px-3.5 py-2 rounded-xl bg-[#FEF08A] border-2 border-border shadow-xs flex items-center justify-between gap-2 text-xs text-foreground"
        >
          <span className="font-medium text-xs">
            <strong>Demonstrativo:</strong> Editais e pautas simuladas para o ecossistema CAGP.
          </span>
          <span className="font-mono text-xs font-bold uppercase bg-white text-foreground px-2 py-0.5 rounded border border-border shrink-0 tabular-nums">
            SIMULAÇÃO
          </span>
        </div>
      </div>

      {/* Destaque Editorial Principal (Lead Story) no Modo Experiência */}
      {leadStory && (
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tactileSpring}
          className="bg-card rounded-2xl overflow-hidden border-3 border-border shadow-md hover:shadow-lg transition-shadow group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden border-b-3 lg:border-b-0 lg:border-r-3 border-border">
              {renderNewsArtwork(leadStory.motif)}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-secondary text-white font-heading font-extrabold text-xs uppercase border-2 border-border shadow-xs tracking-wide">
                Destaque Principal • {leadStory.tag}
              </span>
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-foreground/90 text-white font-mono text-xs font-bold tabular-nums border border-white/30 backdrop-blur-xs">
                {leadStory.readingTime}
              </span>
            </div>

            <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted-foreground tabular-nums">
                  <span>{leadStory.dateLabel}</span>
                  <span>•</span>
                  <span>{leadStory.author}</span>
                </div>

                <h2 className="font-heading font-black uppercase text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight m-0">
                  {leadStory.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground font-medium m-0 leading-relaxed max-w-prose">
                  {leadStory.summary}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-border/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-secondary tabular-nums">
                  {leadStory.meta}
                </span>

                <a
                  href={route(`/noticias/${leadStory.slug}`)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-heading text-xs font-black uppercase tracking-wide no-underline inline-flex items-center gap-2 transition-all shadow-xs hover:translate-x-[1px] hover:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span>Ler Matéria Completa</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      )}

      {/* Barra de Filtros com Pílulas Táteis & Campo de Busca */}
      <div className="bg-card rounded-2xl border-3 border-border p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filtrar por categoria editorial"
          className="flex items-center gap-2 overflow-x-auto scroll-mask-x no-scrollbar py-1 max-w-full"
        >
          {(
            [
              { id: 'todas', label: 'Todas as Pautas' },
              { id: 'assembleia', label: 'Assembleias & FAFICH' },
              { id: 'estagio', label: 'Estágios & Carreiras' },
              { id: 'eventos', label: 'Eventos & Calourada' },
              { id: 'academico', label: 'Seminários & Pesquisa' },
            ] as { id: NewsCategory; label: string }[]
          ).map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={active}
                className={`relative min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase transition-all cursor-pointer shrink-0 border-3 border-border inline-flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  active
                    ? 'text-white shadow-xs -translate-y-0.5'
                    : 'bg-background hover:bg-muted text-foreground shadow-none'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="newsCategoryActivePill"
                    className="absolute inset-0 rounded-[9px] bg-secondary -z-10"
                    transition={tactileSpring}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px] w-full lg:w-72 shrink-0">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar pauta, evento, edital..."
            aria-label="Filtrar notícias do CAGP"
            className="w-full min-h-[44px] pl-9 pr-3.5 py-2 rounded-xl bg-background border-3 border-border shadow-xs text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <CagpIcon name="search" className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Grid de Notícias Escalonadas */}
      <AnimatePresence mode="wait">
        {filteredNews.length === 0 ? (
          <motion.div
            key="empty-news-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={tactileSpring}
            className="bg-card rounded-2xl border-3 border-border shadow-sm p-8 text-center space-y-3"
          >
            <p className="text-sm font-heading font-extrabold uppercase text-foreground m-0">
              Nenhuma notícia encontrada para este filtro.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('todas');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-white text-xs font-heading font-extrabold uppercase cursor-pointer border-3 border-border shadow-xs active:translate-x-0.5 active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Limpar filtros
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`news-grid-${category}-${searchQuery.trim()}`}
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {gridStories.map((item) => {
              const badgeClass =
                item.tagColor === 'burgundy'
                  ? 'bg-secondary text-white'
                  : item.tagColor === 'gold'
                  ? 'bg-accent text-foreground'
                  : item.tagColor === 'green'
                  ? 'bg-success text-white'
                  : 'bg-primary text-white';

              const articleHref = route(`/noticias/${item.slug}`);

              return (
                <motion.article
                  key={item.id}
                  variants={staggerItem}
                  className="bg-card rounded-2xl overflow-hidden border-3 border-border shadow-md hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <a
                    href={articleHref}
                    className="no-underline text-inherit flex flex-col flex-1 justify-between p-3.5 sm:p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <div>
                      <motion.div
                        whileHover={photoCardHover}
                        whileTap={photoCardTap}
                        transition={photoZoomSpring}
                        className="relative aspect-[16/10] min-h-[190px] rounded-xl overflow-hidden border-3 border-border shadow-xs mb-3.5"
                      >
                        <AspectRatio ratio={16 / 10} className="w-full h-full">
                          {renderNewsArtwork(item.motif)}
                        </AspectRatio>
                        <span
                          className={`absolute top-2.5 left-2.5 text-xs font-heading font-extrabold uppercase px-2.5 py-1 rounded-lg border-2 border-border shadow-xs ${badgeClass}`}
                        >
                          {item.tag}
                        </span>
                      </motion.div>

                      <div className="space-y-2 px-1">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono font-bold text-muted-foreground tabular-nums">
                          <span>{item.dateLabel}</span>
                          <span>{item.readingTime}</span>
                        </div>

                        <h3 className="font-heading font-black uppercase text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-snug m-0">
                          {item.title}
                        </h3>

                        <p className="text-xs text-muted-foreground m-0 leading-relaxed font-medium line-clamp-3">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-1 pt-3 mt-3 border-t-2 border-border/20 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono font-bold text-xs truncate tabular-nums">
                        {item.meta}
                      </span>
                      <span className="font-heading font-black uppercase text-secondary shrink-0 ml-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Ler na íntegra</span>
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
