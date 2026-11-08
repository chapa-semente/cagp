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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
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

  return (
    <div className="space-y-6 pb-8">
      {/* Navegação da Subseção de Início */}
      <nav
        aria-label="Navegação da Subseção de Início"
        className="bg-white rounded-xl border-3 border-[#16181d] p-2 flex items-center gap-2 shadow-[4px_4px_0_0_#16181d] overflow-x-auto scroll-mask-x no-scrollbar"
      >
        <a
          href={route('/')}
          className="min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-heading font-bold uppercase text-foreground hover:bg-muted hover:text-secondary no-underline transition-colors inline-flex items-center shrink-0 border-2 border-transparent hover:border-[#16181d]"
        >
          &larr; Voltar ao Início
        </a>
        <a
          href={route('/noticias')}
          aria-current="page"
          className="min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-heading font-extrabold uppercase bg-secondary text-white no-underline border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] inline-flex items-center shrink-0"
        >
          Mural de Notícias
        </a>
        <a
          href={route('/') + '#campus'}
          className="min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-heading font-bold uppercase text-foreground hover:bg-muted hover:text-secondary no-underline transition-colors inline-flex items-center shrink-0 border-2 border-transparent hover:border-[#16181d]"
        >
          Plantão Noturno • Campus
        </a>
        <a
          href={route('/') + '#passaporte'}
          className="min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-heading font-bold uppercase text-foreground hover:bg-muted hover:text-secondary no-underline transition-colors inline-flex items-center shrink-0 border-2 border-transparent hover:border-[#16181d]"
        >
          Passaporte Discente
        </a>
      </nav>

      {/* Aviso Obrigatório de Simulação (PRODUCT.md) */}
      <div
        role="note"
        className="p-4 rounded-xl bg-[#FEF3C7] border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#78350F]"
      >
        <div className="space-y-1">
          <strong className="font-heading uppercase font-extrabold text-[#78350F] block">
            Aviso de Simulação — Mural Editorial Demonstrativo
          </strong>
          <p className="m-0 text-foreground font-medium leading-relaxed">
            {SIMULATION_NOTICE} Clique em qualquer card ou em <strong>Ler na íntegra</strong> para
            abrir a página exclusiva da notícia com texto completo e referências normativas.
          </p>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase bg-white text-[#16181d] px-2.5 py-1 rounded-lg border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] shrink-0 self-start sm:self-center">
          {SIMULATION_BADGE_TEXT}
        </span>
      </div>

      {/* Carrossel de Destaques da Semana */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-black uppercase text-foreground flex items-center gap-2">
            <i className="bi bi-stars text-primary" aria-hidden="true" />
            <span>Destaques da Semana no Mural</span>
          </span>
          <span className="text-[11px] font-mono font-bold text-muted-foreground">
            Deslize para navegar
          </span>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full relative px-10"
        >
          <CarouselContent className="-ml-3">
            {items.slice(0, 5).map((featured) => (
              <CarouselItem key={featured.id} className="pl-3 sm:basis-1/2 lg:basis-1/3">
                <a
                  href={route(`/noticias/${featured.slug}`)}
                  className="block no-underline text-inherit bg-card border-3 border-[#16181d] rounded-xl p-3 shadow-[4px_4px_0_0_#16181d] hover:shadow-[6px_6px_0_0_#16181d] transition-all h-full group"
                >
                  <motion.div
                    whileHover={photoCardHover}
                    whileTap={photoCardTap}
                    transition={photoZoomSpring}
                    className="aspect-[16/10] rounded-lg overflow-hidden border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] mb-2.5"
                  >
                    <AspectRatio ratio={16 / 10} className="w-full h-full">
                      {renderNewsArtwork(featured.motif)}
                    </AspectRatio>
                  </motion.div>
                  <span className="text-[10px] font-mono font-bold uppercase text-primary block mb-1">
                    {featured.tag}
                  </span>
                  <h4 className="font-heading text-xs font-extrabold uppercase text-foreground group-hover:text-secondary transition-colors leading-snug line-clamp-2 m-0">
                    {featured.title}
                  </h4>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2" />
          <CarouselNext className="-right-2" />
        </Carousel>
      </div>

      {/* Barra de Filtros com Pílulas Animadas e .scroll-mask-x + Busca */}
      <div className="bg-white rounded-xl border-3 border-[#16181d] p-4 sm:p-5 shadow-[4px_4px_0_0_#16181d] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filtrar por categoria editorial"
          className="flex items-center gap-2 overflow-x-auto scroll-mask-x no-scrollbar py-1 max-w-full"
        >
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
                aria-pressed={active}
                className={`relative min-h-[44px] px-4 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase transition-all cursor-pointer shrink-0 border-3 border-[#16181d] inline-flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                  active
                    ? 'text-white shadow-[3px_3px_0_0_#16181d] -translate-y-0.5'
                    : 'bg-white hover:bg-muted text-foreground shadow-none'
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
            className="w-full min-h-[44px] pl-9 pr-3.5 py-2 rounded-xl bg-white border-3 border-[#16181d] shadow-[2px_2px_0_0_#16181d] text-xs font-medium text-foreground placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
            <CagpIcon name="search" className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Grid Completo de Notícias com Entrada Escalonada (staggerItem) e Capa Ampliada aspect-[16/10] */}
      <AnimatePresence mode="wait">
        {filteredNews.length === 0 ? (
          <motion.div
            key="empty-news-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={tactileSpring}
            className="bg-white rounded-xl border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] p-8 text-center space-y-3"
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
              className="min-h-[44px] px-4 py-2 rounded-xl bg-secondary text-white text-xs font-heading font-extrabold uppercase cursor-pointer border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d]"
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
            {filteredNews.map((item) => {
              const badgeClass =
                item.tagColor === 'burgundy'
                  ? 'bg-secondary text-white'
                  : item.tagColor === 'gold'
                  ? 'bg-[#E8A317] text-foreground'
                  : item.tagColor === 'green'
                  ? 'bg-success text-white'
                  : 'bg-info text-white';

              const articleHref = route(`/noticias/${item.slug}`);

              return (
                <motion.article
                  key={item.id}
                  variants={staggerItem}
                  className="bg-white rounded-2xl overflow-hidden border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#16181d] transition-all flex flex-col justify-between group"
                >
                  <a
                    href={articleHref}
                    className="no-underline text-inherit flex flex-col flex-1 justify-between p-3.5 sm:p-4"
                  >
                    <div>
                      <motion.div
                        whileHover={photoCardHover}
                        whileTap={photoCardTap}
                        transition={photoZoomSpring}
                        className="relative aspect-[16/10] min-h-[200px] rounded-xl overflow-hidden border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d] mb-4"
                      >
                        <AspectRatio ratio={16 / 10} className="w-full h-full">
                          {renderNewsArtwork(item.motif)}
                        </AspectRatio>
                        <span
                          className={`absolute top-2.5 left-2.5 text-[10px] font-heading font-extrabold uppercase px-2.5 py-0.5 rounded-md border-2 border-[#16181d] shadow-[2px_2px_0_0_#16181d] ${badgeClass}`}
                        >
                          {item.tag}
                        </span>
                        <span className="absolute top-2.5 right-2.5 text-[10px] font-mono font-bold bg-[#16181d] text-white px-2 py-0.5 rounded-md border border-white/40">
                          Simulação
                        </span>
                      </motion.div>

                      <div className="space-y-2 px-1">
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono font-bold text-muted-foreground tabular-nums">
                          <span>{item.dateLabel}</span>
                          <span>{item.readingTime}</span>
                        </div>

                        <h2 className="font-heading font-black uppercase text-sm sm:text-base text-[#16181d] group-hover:text-secondary transition-colors leading-snug m-0">
                          {item.title}
                        </h2>

                        <p className="text-xs text-muted-foreground m-0 leading-relaxed">{item.summary}</p>
                      </div>
                    </div>

                    <div className="px-1 pt-3 mt-3 border-t-2 border-[#16181d] flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono font-bold text-[11px] truncate tabular-nums">{item.meta}</span>
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
