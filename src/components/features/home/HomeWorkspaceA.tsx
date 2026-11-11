// HomeWorkspaceA.tsx — Home (aba Hoje): vitrine da Chapa Semente dentro do sistema, utilidade logo abaixo.
// Ordem: faixa Cartaz (12 rostos, contagem, um CTA laranja) → Hoje à noite (RU e Circular) →
// Resolver agora (atalhos da fase do curso) → seu progresso (só se houver dado) → mural (simulado).
// A moldura é a do app (SuperAppHeader + barra): a home não desenha cabeçalho, ☰ nem sino próprios.
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getVaultItem, USER_ROLE_META, type UserRole } from '@/lib/storage/studentVault';
import { CHAPA_LEADERS } from '@/lib/chapaSementeData';
import { asset, route } from '@/lib/paths';
import { tactileSpring, celebrateSpring } from '@/lib/motion';
import { CagpIcon, type CagpIconName } from '@/components/ui/CagpIcon';
import { MarkerWord } from '@/components/ui/marker-word';
import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee';
import { LeafShape, SemicircleShape, SeedShape } from '@/components/ui/semente-shapes';
import { ChapaSementeTour } from '@/components/features/semente/ChapaSementeTour';
import {
  HomeCampusStatusWidget,
  computeCampusLiveStatus,
  NEUTRAL_CAMPUS_STATUS,
  type CampusLiveStatus,
} from './HomeCampusStatusWidget';
import { HomeNewsFeed } from './HomeNewsFeed';

const ELECTION_DAY = new Date(2026, 10, 25); // 25/11/2026, 00h, horário local

type Shortcut = { id: string; href: string; icon: CagpIconName; title: string; line: string };

/** Atalhos por fase do curso. Máx. 5 por grupo (DESIGN.md › Hub de aba). */
const SHORTCUTS: Record<UserRole, Shortcut[]> = {
  calouro: [
    { id: 'cagp-shortcut-calouro', href: '/calouros', icon: 'checklist', title: 'Guia do calouro', line: 'Os primeiros 30 dias, passo a passo' },
    { id: 'cagp-shortcut-permanencia', href: '/permanencia', icon: 'moon', title: 'FUMP e vida no noturno', line: 'Auxílio, RU e como se virar à noite' },
    { id: 'cagp-shortcut-documentos', href: '/documentos', icon: 'file-text', title: 'Documentos', line: 'Os PDFs que todo mundo pede no grupo' },
    { id: 'cagp-shortcut-curso', href: '/curso', icon: 'map-pin', title: 'Quem atende e onde fica', line: 'Colegiado, secretaria, salas' },
    { id: 'cagp-shortcut-grade', href: '/percurso', icon: 'curriculo', title: 'Grade e percurso', line: 'As disciplinas dos 10 períodos' },
  ],
  veterano: [
    { id: 'cagp-shortcut-cursos', href: '/acg', icon: 'calculator', title: 'Horas 600h', line: 'Quanto falta de extensão e AAC' },
    { id: 'cagp-shortcut-estagio', href: '/estagio', icon: 'briefcase', title: 'Estágio', line: 'TCE, 300h e dispensa pelo Art. 41' },
    { id: 'cagp-shortcut-optativas', href: '/optativas', icon: 'filter', title: 'Optativas', line: 'O que cursar e onde conta' },
    { id: 'cagp-shortcut-enap', href: '/cursos', icon: 'graduation-cap', title: 'Cursos que contam horas', line: 'Gratuitos, com certificado' },
    { id: 'cagp-shortcut-documentos', href: '/documentos', icon: 'file-text', title: 'Documentos', line: 'Os PDFs que todo mundo pede no grupo' },
  ],
  formando: [
    { id: 'cagp-shortcut-formatura', href: '/formatura', icon: 'graduation-cap', title: 'Formatura e colação', line: 'Checklist da reta final' },
    { id: 'cagp-shortcut-tcc', href: '/tcc', icon: 'thesis', title: 'TCC', line: 'Modalidades, prazos e banca' },
    { id: 'cagp-shortcut-estagio', href: '/estagio', icon: 'briefcase', title: 'Estágio', line: 'Fechar as 300h ou pedir dispensa' },
    { id: 'cagp-shortcut-cursos', href: '/acg', icon: 'calculator', title: 'Horas 600h', line: 'Fechar extensão e AAC a tempo' },
    { id: 'cagp-shortcut-documentos', href: '/documentos', icon: 'file-text', title: 'Documentos', line: 'Requerimentos e modelos' },
  ],
  ingressar: [
    { id: 'cagp-shortcut-curso', href: '/curso', icon: 'compass', title: 'Como é o curso', line: 'Noturno, 10 períodos, FAFICH' },
    { id: 'cagp-shortcut-calouro', href: '/calouros', icon: 'checklist', title: 'Guia do calouro', line: 'O que acontece quando você entra' },
    { id: 'cagp-shortcut-pesquisa', href: '/pesquisa', icon: 'sparkle', title: 'Pesquisa e extensão', line: 'Núcleos e bolsas do DCP' },
    { id: 'cagp-shortcut-carreira', href: '/carreira', icon: 'carreira', title: 'Carreira', line: 'Onde quem se forma trabalha' },
    { id: 'cagp-shortcut-transparencia', href: '/sobre', icon: 'cagp', title: 'O CAGP', line: 'Quem representa os estudantes' },
  ],
};

/** Sempre à mão, para qualquer fase: o que a chapa propôs para o CA. */
const CA_SHORTCUTS: Shortcut[] = [
  { id: 'cagp-shortcut-ouvidoria', href: '/ouvidoria', icon: 'megaphone', title: 'Fala com o CA', line: 'Reclamação, ideia ou denúncia' },
  { id: 'cagp-shortcut-transparencia', href: '/transparencia', icon: 'file-text', title: 'Transparência', line: 'Para onde vai o dinheiro do CA' },
  { id: 'cagp-shortcut-carreira', href: '/carreira', icon: 'carreira', title: 'Carreira e vagas', line: 'Estágios, editais e talentos' },
];

function ShortcutGroup({ title, items, idPrefix }: { title: string; items: Shortcut[]; idPrefix: string }) {
  // Um mesmo id não pode aparecer duas vezes na página: o segundo grupo usa o sufixo.
  return (
    <section aria-labelledby={`${idPrefix}-title`} className="space-y-3">
      <h2 id={`${idPrefix}-title`} className="font-heading font-bold text-lg text-foreground m-0">
        {title}
      </h2>
      <ul className="cagp-reveal-stagger list-none m-0 p-0 bg-white border-2 border-border rounded-xl shadow-md overflow-hidden divide-y-2 divide-border">
        {items.map((s) => (
          <li key={s.href}>
            <a
              href={route(s.href)}
              className="group min-h-[64px] px-4 py-3 flex items-center gap-3 no-underline text-inherit bg-white hover:bg-primary-tint transition-colors duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <span className="w-10 h-10 rounded-xl bg-muted group-hover:bg-white flex items-center justify-center shrink-0 transition-colors duration-(--duration-press)" aria-hidden="true">
                <CagpIcon name={s.icon} className="w-5 h-5 text-primary" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block w-fit font-heading font-bold text-base text-foreground" data-vt-title data-vt-href={route(s.href)}>{s.title}</span>
                <span className="block text-sm text-content-secondary">{s.line}</span>
              </span>
              <CagpIcon
                name="chevron-right"
                className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-(--duration-press) ease-(--ease-spring-snappy) group-hover:translate-x-1"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const HomeWorkspaceA: React.FC = () => {
  const [role, setRole] = useState<UserRole>('calouro');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [campus, setCampus] = useState<CampusLiveStatus>(NEUTRAL_CAMPUS_STATUS);
  const [progress, setProgress] = useState({ ext: 0, obrig: 0 });

  useEffect(() => {
    const load = () => {
      setRole(getVaultItem('cagp_user_role_v1'));
      const calc = getVaultItem('cagp_calc_ext_aac_v1');
      const ext = Math.min(600, Object.values(calc).reduce((a, b) => a + (Number(b) || 0), 0));
      const grade = getVaultItem('cagp_minha_grade_v1');
      setProgress({ ext, obrig: grade.savedCourses ? grade.savedCourses.length : 0 });
    };
    load();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setDaysLeft(Math.round((ELECTION_DAY.getTime() - today.getTime()) / 86_400_000));
    setCampus(computeCampusLiveStatus(new Date()));
    const timer = window.setInterval(() => setCampus(computeCampusLiveStatus(new Date())), 30_000);
    window.addEventListener('cagp:vault-updated', load);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('cagp:vault-updated', load);
    };
  }, []);

  const openCampus = () => window.dispatchEvent(new CustomEvent('cagp:open-campus'));
  const openProfile = () => window.dispatchEvent(new CustomEvent('cagp:open-passport'));

  const countdown =
    daysLeft === null
      ? 'Eleição do CA: 25 e 26/11'
      : daysLeft > 1
        ? `Faltam ${daysLeft} dias pra eleição`
        : daysLeft === 1
          ? 'A eleição é amanhã'
          : daysLeft >= -1
            ? 'Hoje tem eleição no CA'
            : 'A eleição de 2026 já passou';

  const hasProgress = progress.ext > 0 || progress.obrig > 0;
  const extPct = Math.round((progress.ext / 600) * 100);
  const obrigPct = Math.min(100, Math.round((progress.obrig / 27) * 100));

  return (
    <div className="space-y-8 sm:space-y-10 pb-8">
      {/* 1. Faixa Cartaz — a vitrine da chapa (DESIGN.md › Campanha). Um CTA laranja só. */}
      <section
        id="cagp-home-banner-semente"
        aria-labelledby="home-chapa-title"
        className="relative overflow-hidden rounded-2xl border-3 border-border bg-primary text-white shadow-xl"
      >
        <div className="cagp-parallax pointer-events-none absolute -right-8 -top-10 w-36 h-36 sm:w-52 sm:h-52" style={{ ['--parallax-from' as string]: '30px', ['--parallax-to' as string]: '-50px' }} aria-hidden="true">
          <LeafShape color="orange" germinate className="w-full h-full" />
        </div>
        <div className="cagp-parallax pointer-events-none absolute -left-12 bottom-10 w-56 sm:w-72" style={{ ['--parallax-from' as string]: '-20px', ['--parallax-to' as string]: '40px' }} aria-hidden="true">
          <SemicircleShape color="teal" className="w-full h-auto" />
        </div>
        <div className="cagp-parallax pointer-events-none absolute right-[18%] bottom-16 w-8 hidden sm:block" style={{ ['--parallax-from' as string]: '40px', ['--parallax-to' as string]: '-80px' }} aria-hidden="true">
          <SeedShape color="white" className="w-full h-auto" />
        </div>

        <div className="relative z-10 p-5 pb-6 sm:p-8 sm:pb-8 space-y-5">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white text-primary border-2 border-border shadow-sm font-heading font-bold text-xs uppercase tracking-[0.04em] tabular-nums">
            <i className="bi bi-calendar-check" aria-hidden="true" />
            {countdown}
          </span>

          <h1 id="home-chapa-title" className="font-heading font-bold uppercase text-[1.75rem] leading-[1.05] tracking-[0.02em] sm:text-5xl m-0 max-w-[16ch] text-balance">
            Toda mudança começa <MarkerWord onColor className="text-[1.12em] normal-case">pequena</MarkerWord>.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed m-0 max-w-[46ch] text-white">
            A nossa começou com este app, feito por 12 estudantes de GP pra você resolver estágio, 600h e FUMP sem depender de ninguém.
            Dias 25 e 26/11, vote Semente.
          </p>

          <ul className="list-none m-0 p-0 flex flex-wrap gap-1.5 sm:gap-2 max-w-[34rem]" aria-label="Integrantes da Chapa Semente">
            {CHAPA_LEADERS.map((leader, i) => (
              <motion.li
                key={leader.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...tactileSpring, delay: 0.15 + i * 0.035 }}
              >
                <a
                  href={route('/chapa-semente') + '#integrantes'}
                  title={`${leader.name}, ${leader.role}`}
                  className="block w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 border-border overflow-hidden bg-white shadow-sm transition-[transform,box-shadow] duration-(--duration-press) ease-(--ease-spring-snappy) hover:-translate-x-px hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <img
                    src={asset(`/images/chapa/tour/${leader.id}-thumb.webp`)}
                    alt={`${leader.name}, ${leader.role}`}
                    width={96}
                    height={96}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <a
              href={route('/gestao')}
              className="min-h-[48px] px-4 sm:px-5 rounded-xl bg-accent text-accent-foreground border-3 border-border shadow-md font-heading font-bold text-sm uppercase tracking-[0.03em] no-underline inline-flex items-center gap-2 transition-[transform,box-shadow,background-color] duration-(--duration-press) ease-(--ease-spring-snappy) hover:bg-accent-hover hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Como votar
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>
            <a
              href={route('/chapa-semente')}
              className="min-h-[48px] px-4 sm:px-5 rounded-xl bg-white text-foreground border-3 border-border shadow-md font-heading font-bold text-sm uppercase tracking-[0.03em] no-underline inline-flex items-center gap-2 transition-[transform,box-shadow,background-color] duration-(--duration-press) ease-(--ease-spring-snappy) hover:bg-muted hover:-translate-x-px hover:-translate-y-px hover:shadow-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Propostas
            </a>
            <ChapaSementeTour buttonText="Rever o tour" variant="link" />
          </div>
        </div>

        {/* Marquee da campanha: a única faixa que rola sozinha (DESIGN.md › Marquee). */}
        <div className="relative z-10 border-t-3 border-border bg-foreground text-white">
          <Marquee data-impeccable-ignore="marquee" speed="slow" pauseOnHover className="bg-foreground text-white border-0 shadow-none py-2.5">
            {[
              'Vote Semente · 25 e 26/11 · 17h às 22h30 na sala do CAGP',
              'Este app é proposta que já funciona',
              'Toda mudança começa pequena',
              'Leve documento com foto pra votar',
            ].map((t) => (
              <React.Fragment key={t}>
                <MarqueeItem className="text-sm font-heading font-bold uppercase tracking-[0.04em] text-white">{t}</MarqueeItem>
                <MarqueeSeparator><span className="inline-block w-2 h-2 rounded-full bg-accent align-middle" aria-hidden="true" /></MarqueeSeparator>
              </React.Fragment>
            ))}
          </Marquee>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
        <div className="lg:col-span-7 space-y-8">
          {/* 2. Resolver agora — atalhos da fase do curso, que é escolhida só em Seu perfil. */}
          <div className="space-y-2">
            <ShortcutGroup title="Resolver agora" items={SHORTCUTS[role]} idPrefix="home-resolver" />
            <p className="text-sm text-content-secondary m-0">
              Atalhos de quem é <strong className="text-foreground">{USER_ROLE_META[role].shortLabel.toLowerCase()}</strong>.{' '}
              <button type="button" onClick={openProfile} className="text-primary font-bold underline underline-offset-[0.22em] cursor-pointer bg-transparent border-0 p-0 min-h-0">
                Não é sua fase? Troca em Seu perfil
              </button>
            </p>
          </div>

          {/* Um destino por página: tira do CA o que já está em Resolver agora. */}
          <ShortcutGroup
            title="Com o CA"
            items={CA_SHORTCUTS.filter((c) => !SHORTCUTS[role].some((s) => s.href === c.href))}
            idPrefix="home-ca"
          />
        </div>

        <aside className="order-first lg:order-none lg:col-span-5 space-y-8 lg:sticky lg:top-24">
          {/* 3. Hoje à noite — RU e Circular agora; horários completos e lembretes na folha Campus. */}
          <HomeCampusStatusWidget status={campus} openCampus={openCampus} />

          {/* 4. Seu progresso — só aparece com dado salvo. Zero na tela só desanima. */}
          {hasProgress && (
            <section aria-labelledby="home-progresso" className="cagp-reveal-card bg-white border-2 border-border rounded-xl shadow-md p-4 sm:p-5 space-y-4">
              <h2 id="home-progresso" className="font-heading font-bold text-lg text-foreground m-0">
                Seu progresso
              </h2>
              {[
                { label: 'Extensão e AAC', n: progress.ext, unit: 'h', of: 'de 600h', pct: extPct, href: '/acg', bar: 'bg-secondary' },
                { label: 'Obrigatórias', n: progress.obrig, unit: '', of: 'de 27', pct: obrigPct, href: '/percurso', bar: 'bg-primary' },
              ].map((p) => (
                <a key={p.label} href={route(p.href)} className="block no-underline text-inherit group">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-heading font-bold text-sm text-foreground group-hover:text-primary">{p.label}</span>
                    <span className="tabular-nums">
                      <strong className="font-heading text-2xl text-foreground" data-count-to={p.n} data-count-suffix={p.unit}>{`${p.n}${p.unit}`}</strong>{' '}
                      <span className="text-sm text-content-secondary">{p.of}</span>
                    </span>
                  </span>
                  <span className="mt-2 block h-3 rounded-full bg-muted border-2 border-border overflow-hidden" aria-hidden="true">
                    <motion.span
                      className={`block h-full ${p.bar}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max(3, p.pct)}%` }}
                      viewport={{ once: true }}
                      transition={celebrateSpring}
                    />
                  </span>
                </a>
              ))}
            </section>
          )}
        </aside>
      </div>

      {/* 5. Mural — conteúdo simulado, com o aviso dentro do próprio componente. */}
      <HomeNewsFeed />
    </div>
  );
};
