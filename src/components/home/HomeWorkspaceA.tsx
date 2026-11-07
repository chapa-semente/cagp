import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  setVaultItem,
  USER_ROLE_META,
  type UserRole,
  type VaultData,
} from '../../lib/storage/studentVault';
import { AvatarRenderer } from '../passport/AvatarRenderer';
import { TALENT_CATEGORIES } from '../passport/talentConstants';
import { CagpIcon } from '../ui/CagpIcon';
import { route } from '../../lib/paths';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { StatCard } from '../ui/stat-card';
import { Progress } from '../ui/progress';
import { Sticker } from '../ui/sticker';
import { Marquee, MarqueeItem, MarqueeSeparator } from '../ui/marquee';
import { LayeredCard } from '../ui/layered-card';
import { Topography } from '../boldkit/canvas-effects/Topography';
import { BurstShape, Star4Shape, ShieldShape } from '../boldkit/shapes';

import {
  HomeCampusStatusWidget,
  computeCampusLiveStatus,
  type CampusLiveStatus,
} from '../features/home/HomeCampusStatusWidget';
import { HomeNewsFeed } from '../features/home/HomeNewsFeed';
import { HomeCalouroGuide } from '../features/home/HomeCalouroGuide';
import { HomeAcademicTools } from '../features/home/HomeAcademicTools';

const TALENT_LABEL_MAP: Record<string, string> = Object.fromEntries(
  TALENT_CATEGORIES.map((c) => [c.key, c.label])
);

function getCandangoMilestoneLabel(globalPct: number, extHours: number): string {
  if (globalPct >= 90 || extHours >= 600) return 'Candango Integralizado';
  if (extHours >= 300 || globalPct >= 50) return 'Guardião das 600h';
  if (globalPct >= 15) return 'Percurso em Dia';
  return 'Ingressante FAFICH';
}

export const HomeWorkspaceA: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('calouro');
  const [roleTransitionTick, setRoleTransitionTick] = useState<number>(0);
  const [profile, setProfile] = useState<VaultData<'cagp_student_profile_v1'>>({
    name: 'Estudante de Gestão Pública',
    period: '1º Período',
    pronouns: '',
    semester: '2026/1',
    pathway: '01-01',
    avatarPreset: 'candangos',
    prideChoice: 'none',
    interests: [],
  });
  const [obrigCount, setObrigCount] = useState<number>(0);
  const [extHours, setExtHours] = useState<number>(0);
  const [certs, setCerts] = useState<VaultData<'cagp_aac_120d_certs_v1'>>([]);
  const [calouroChecklist, setCalouroChecklist] = useState<Record<string, boolean>>({});
  const [art41Checklist, setArt41Checklist] = useState<Record<string, boolean>>({});
  const [notifs, setNotifs] = useState<VaultData<'cagp_notifications_prefs_v1'>>({
    ru1815: false,
    circular2230: false,
    aac120d: true,
  });
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [campusStatus, setCampusStatus] = useState<CampusLiveStatus>(() =>
    computeCampusLiveStatus(new Date())
  );

  const loadVaultState = () => {
    if (typeof window === 'undefined') return;
    setUserRole(getVaultItem('cagp_user_role_v1'));
    setProfile(getVaultItem('cagp_student_profile_v1'));

    const calcData = getVaultItem('cagp_calc_ext_aac_v1');
    const sum = Object.values(calcData).reduce((a, b) => a + (Number(b) || 0), 0);
    setExtHours(Math.min(600, sum));

    const grade = getVaultItem('cagp_minha_grade_v1');
    setObrigCount(grade.savedCourses ? grade.savedCourses.length : 0);

    setCerts(getVaultItem('cagp_aac_120d_certs_v1'));
    setCalouroChecklist(getVaultItem('cagp_calouro_checklist_v1'));
    setArt41Checklist(getVaultItem('cagp_art41_checklist_v1'));
    setNotifs(getVaultItem('cagp_notifications_prefs_v1'));
  };

  useEffect(() => {
    loadVaultState();
    setIsOnline(navigator.onLine);

    const onVaultChange = () => loadVaultState();
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('cagp:vault-changed', onVaultChange);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    const timer = window.setInterval(() => {
      setCampusStatus(computeCampusLiveStatus(new Date()));
    }, 30000);

    return () => {
      window.removeEventListener('cagp:vault-changed', onVaultChange);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.clearInterval(timer);
    };
  }, []);

  const handleRoleSwitch = (nextRole: UserRole) => {
    if (nextRole === userRole) return;
    setUserRole(nextRole);
    setVaultItem('cagp_user_role_v1', nextRole);
    setRoleTransitionTick((t) => t + 1);
  };

  const toggleCalouroStep = (stepId: string) => {
    const updated = { ...calouroChecklist, [stepId]: !calouroChecklist[stepId] };
    setCalouroChecklist(updated);
    setVaultItem('cagp_calouro_checklist_v1', updated);
  };

  const toggleArt41Step = (stepId: string) => {
    const updated = { ...art41Checklist, [stepId]: !art41Checklist[stepId] };
    setArt41Checklist(updated);
    setVaultItem('cagp_art41_checklist_v1', updated);
  };

  const toggleNotif = (key: 'ru1815' | 'circular2230' | 'aac120d') => {
    const updated = { ...notifs, [key]: !notifs[key] };
    setNotifs(updated);
    setVaultItem('cagp_notifications_prefs_v1', updated);
  };

  const openPassport = () => window.dispatchEvent(new CustomEvent('cagp:open-passport'));
  const openCampus = () => window.dispatchEvent(new CustomEvent('cagp:open-campus'));
  const openSpotlight = () => window.dispatchEvent(new CustomEvent('cagp:open-spotlight'));
  const openDrawer = () => {
    if (typeof window !== 'undefined' && (window as any).__cagp_toggle_drawer) {
      (window as any).__cagp_toggle_drawer();
    } else {
      window.dispatchEvent(new CustomEvent('cagp:toggle-drawer'));
    }
  };

  const obrigPct = Math.min(100, Math.round((obrigCount / 27) * 100));
  const extPct = Math.min(100, Math.round((extHours / 600) * 100));
  const globalPct = Math.round((obrigPct + extPct) / 2);

  const roleMeta = USER_ROLE_META[userRole];
  const candangoMilestone = getCandangoMilestoneLabel(globalPct, extHours);

  const firstName =
    profile.name === 'Estudante de Gestão Pública'
      ? 'Estudante'
      : profile.name.split(' ')[0] || 'Estudante';

  return (
    <div className="space-y-6 pb-8 font-sans">
      {/* 1. MARQUEE NEOBRUTALISTA DE AVISOS EM TEMPO REAL */}
      <Marquee speed="normal" className="bg-card border-3 border-border shadow-sm">
        <MarqueeItem className="text-xs sm:text-sm">
          <Badge variant="accent" className="mr-1 bg-[#FF8811] text-[#16181d] font-bold">ELEIÇÕES 25 E 26/NOV</Badge>
          <span>Votação direta na sala do CAGP (17h às 22h30) • Vote Chapa Semente</span>
        </MarqueeItem>
        <MarqueeSeparator>✦</MarqueeSeparator>
        <MarqueeItem className="text-xs sm:text-sm">
          <Badge variant="secondary" className="mr-1 bg-[#5B2A86] text-white">CHAPA SEMENTE</Badge>
          <span>Potencial que se transforma em ação • 14 Propostas Estruturadas</span>
        </MarqueeItem>
        <MarqueeSeparator>✦</MarqueeSeparator>
        <MarqueeItem className="text-xs sm:text-sm">
          <Badge variant="default" className="mr-1">CAGP FAFICH</Badge>
          <span>Secretaria F-2039 • CEAG F-2033 (08h às 22h)</span>
        </MarqueeItem>
        <MarqueeSeparator>✦</MarqueeSeparator>
        <MarqueeItem className="text-xs sm:text-sm">
          <Badge variant="accent" className="mr-1">REGRA 120 DIAS</Badge>
          <span>Protocole seus certificados AAC até 120 dias após o evento</span>
        </MarqueeItem>
        <MarqueeSeparator>✦</MarqueeSeparator>
        <MarqueeItem className="text-xs sm:text-sm">
          <Badge variant="teal" className="mr-1">ART. 41 ESTÁGIO</Badge>
          <span>Servidor ou empregado público tem direito a integralização de estágio</span>
        </MarqueeItem>
        <MarqueeSeparator>✦</MarqueeSeparator>
      </Marquee>

      {/* 2. HERO BANNER NEOBRUTALISTA TRI-CAMADA + BOLDKIT TOPOGRAPHY CANVAS */}
      <section
        aria-label="Boas-vindas e Seletor de Perfil"
        className="relative overflow-hidden bg-primary rounded-xl p-5 sm:p-7 text-white border-3 border-border shadow-lg space-y-5"
      >
        {/* Canvas Effect Topography (BoldKit) */}
        <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen" aria-hidden="true">
          <Topography
            lineColor="#FF8811"
            levels={10}
            speed={0.6}
            palette={['#5B2A86', '#4A216E', '#FF8811', '#FFD6A5', '#266264', '#9E2424']}
          />
        </div>

        {/* Shapes Decorativos Vetoriais BoldKit */}
        <BurstShape
          size={84}
          color="#FF8811"
          className="pointer-events-none absolute -right-4 -top-4 opacity-25 hidden sm:block rotate-12"
          aria-hidden="true"
        />
        <Star4Shape
          size={42}
          color="#FF8811"
          className="pointer-events-none absolute right-48 bottom-3 opacity-35 hidden lg:block -rotate-6"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={openDrawer}
                  className="md:hidden bg-white/20 text-white hover:bg-white/30 border-2 border-border"
                  title="Abrir Menu Geral"
                  aria-label="Abrir gaveta de navegação"
                >
                  <CagpIcon name="menu" className="w-5 h-5" />
                </Button>

                <a
                  href={route('/chapa-semente')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#5B2A86] border-2 border-border shadow-xs text-xs font-heading font-black uppercase tracking-wider no-underline hover:bg-[#FFFDF9] transition-all"
                >
                  <span>CHAPA SEMENTE</span>
                  <span className="text-[#FF8811]">✦ PROPOSTAS</span>
                </a>

                <Sticker variant="default" size="sm" rotation="slight">
                  Turno Noturno
                </Sticker>

                <Badge variant="secondary" className="hidden sm:inline-flex bg-[#9E2424] text-white">
                  FAFICH / UFMG • PPC 2020
                </Badge>

                <Badge variant="ufmg" className="hidden md:inline-flex">
                  Os Candangos • 1959
                </Badge>

                {!isOnline && (
                  <Badge variant="warning">
                    Modo Offline Ativo
                  </Badge>
                )}
              </div>

              {/* Ações Rápidas no Mobile */}
              <div className="flex sm:hidden items-center gap-1.5 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={openSpotlight}
                  title="Buscar no app (⌘K)"
                  aria-label="Buscar edital, disciplina ou sala"
                >
                  <CagpIcon name="search" className="w-4 h-4 text-primary" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={openCampus}
                  className="relative"
                  title="Plantão Noturno • RU II & Circular"
                  aria-label="Abrir status do Campus Agora"
                >
                  <CagpIcon name="bell" className="w-4 h-4" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] border border-black absolute top-1.5 right-1.5 animate-pulse" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              {userRole !== 'ingressar' && (
                <div className="md:hidden shrink-0">
                  <AvatarRenderer
                    profile={profile}
                    sizeClass="cagp-avatar-frame--sm"
                    onClick={openPassport}
                    title="Abrir Passaporte Discente"
                  />
                </div>
              )}
              <div className="min-w-0">
                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white m-0 leading-tight drop-shadow-[2px_2px_0_#16181d]">
                  {userRole === 'ingressar'
                    ? 'Gestão Pública • FAFICH / UFMG'
                    : `Olá, ${firstName}!`}
                </h1>
                <p className="text-xs sm:text-sm font-sans text-white/95 font-medium m-0 mt-1.5 leading-snug max-w-2xl">
                  {roleMeta.tagline}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={openSpotlight}
              className="bg-card text-foreground font-heading text-xs px-4 py-2.5 gap-3"
              aria-label="Buscar edital, disciplina ou sala (⌘K)"
            >
              <span className="flex items-center gap-2">
                <CagpIcon name="search" className="w-4 h-4 text-primary" />
                <span>Buscar disciplina, norma, sala...</span>
              </span>
              <kbd className="text-xs font-mono font-bold bg-muted text-foreground px-1.5 py-0.5 rounded border-2 border-border">
                ⌘K
              </kbd>
            </Button>

            <Button
              type="button"
              variant="accent"
              onClick={openPassport}
              className="xl:hidden text-xs px-4 py-2.5"
            >
              <CagpIcon name="passport" className="w-4 h-4" />
              <span>{userRole === 'ingressar' ? 'Perfil' : 'Passaporte'}</span>
            </Button>
          </div>
        </div>

        {/* Seletor Tátil Neobrutalista de Perfil */}
        <div className="relative z-10 pt-4 border-t-2 border-white/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-mono font-bold text-white/95 mr-1 shrink-0 uppercase">
              Meu momento:
            </span>
            {(['calouro', 'veterano', 'formando', 'ingressar'] as UserRole[]).map((r) => {
              const active = userRole === r;
              const meta = USER_ROLE_META[r];
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSwitch(r)}
                  aria-pressed={active}
                  className={`min-h-[42px] px-4 py-1.5 rounded-xl text-xs font-heading font-extrabold uppercase transition-all cursor-pointer shrink-0 border-3 border-border inline-flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                    active
                      ? 'bg-accent text-accent-foreground shadow-sm -translate-y-0.5'
                      : 'bg-black/25 hover:bg-black/40 text-white shadow-none'
                  }`}
                >
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          <Badge variant="dark" className="hidden sm:inline-flex font-mono">
            {roleMeta.periodHint}
          </Badge>
        </div>
      </section>

      {/* 3. FAIXA DE INDICADORES BOLDKIT STATCARDS (KPIs DISCENTES) */}
      {userRole !== 'ingressar' && (
        <section
          aria-label="Indicadores de Integralização PPC 2020"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Integralização Global"
            value={`${globalPct}%`}
            subtitle="3.000 Horas • PPC 2020"
            colorScheme="primary"
            icon={<CagpIcon name="curriculo" className="w-5 h-5" />}
            progress={{ value: globalPct, label: 'Meta Curricular' }}
          />
          <StatCard
            title="Matérias Obrigatórias"
            value={`${obrigCount}/27`}
            subtitle={`Percurso ${profile.pathway || '01-01'}`}
            colorScheme="secondary"
            icon={<CagpIcon name="curso" className="w-5 h-5" />}
            progress={{ value: obrigPct, label: 'Grade Obrigatória' }}
          />
          <StatCard
            title="Extensão & AAC (600h)"
            value={`${extHours}h`}
            subtitle={`Faltam ${Math.max(0, 600 - extHours)}h p/ meta`}
            colorScheme="accent"
            icon={<CagpIcon name="calculator" className="w-5 h-5" />}
            progress={{ value: extPct, label: 'Teto 600 Horas' }}
          />
          <StatCard
            title="Marco Candango"
            value={candangoMilestone}
            subtitle={`${certs.length} certificado(s) no cofre 120d`}
            colorScheme="teal"
            icon={<CagpIcon name="stamp" className="w-5 h-5" />}
          />
        </section>
      )}

      {/* 4. GRID PRINCIPAL 8 + 4 COLUNAS */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Coluna Principal (8 colunas) */}
        <div
          key={`workspace-role-${userRole}`}
          className={`xl:col-span-8 space-y-8 ${
            roleTransitionTick > 0 ? 'cagp-animate-ws-enter' : ''
          }`}
        >
          {userRole === 'ingressar' ? (
            <>
              <HomeNewsFeed />
              <HomeCampusStatusWidget
                status={campusStatus}
                notifs={notifs}
                toggleNotif={toggleNotif}
                openCampus={openCampus}
              />
            </>
          ) : userRole === 'calouro' ? (
            <>
              <HomeCampusStatusWidget
                status={campusStatus}
                notifs={notifs}
                toggleNotif={toggleNotif}
                openCampus={openCampus}
              />
              <HomeCalouroGuide
                checklist={calouroChecklist}
                toggleStep={toggleCalouroStep}
              />
              <HomeNewsFeed />
            </>
          ) : (
            <>
              <HomeCampusStatusWidget
                status={campusStatus}
                notifs={notifs}
                toggleNotif={toggleNotif}
                openCampus={openCampus}
              />
              <HomeAcademicTools
                art41Checklist={art41Checklist}
                toggleArt41Step={toggleArt41Step}
              />
              <HomeNewsFeed />
            </>
          )}
        </div>

        {/* Coluna Direita (4 colunas) Passaporte Neobrutalista com LayeredCard */}
        <aside
          aria-label="Passaporte Discente e Progresso PPC 2020"
          className="xl:col-span-4 space-y-6 xl:sticky xl:top-6"
          id="passaporte"
        >
          {userRole !== 'ingressar' ? (
            <div className="hidden xl:block pb-2 pr-2">
              <LayeredCard layers="single" offset="sm" layerColor="secondary" className="rounded-xl">
                <div className="p-5 space-y-4 rounded-xl bg-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <AvatarRenderer
                        profile={profile}
                        sizeClass="cagp-avatar-frame--md"
                        showCameraBadge
                        onClick={openPassport}
                        title="Editar foto e Passaporte"
                      />
                      <div className="min-w-0">
                        <h2 className="text-base font-heading font-extrabold text-foreground m-0 truncate uppercase">
                          {profile.name}
                        </h2>
                        <p className="text-xs text-muted-foreground font-semibold m-0 mt-0.5 tabular-nums">
                          {profile.period} • Ingresso {profile.semester || '2026/1'}
                        </p>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-primary text-white border-3 border-border shadow-sm flex flex-col items-center justify-center shrink-0 tabular-nums">
                      <span className="text-xs font-heading font-extrabold">{globalPct}%</span>
                      <span className="text-[11px] font-mono">3.000h</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <Badge variant="success">
                      <CagpIcon name="stamp" className="w-3.5 h-3.5" />
                      <span>{profile.period.toUpperCase()} • ATIVO</span>
                    </Badge>
                    <Sticker variant="secondary" size="sm" rotation="slight-right">
                      {candangoMilestone}
                    </Sticker>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5 tabular-nums">
                        <span className="text-foreground">27 Disciplinas Obrigatórias</span>
                        <span className="font-mono text-primary font-extrabold">
                          {obrigCount} / 27 ({obrigPct}%)
                        </span>
                      </div>
                      <Progress value={Math.max(4, obrigPct)} indicatorClassName="bg-primary" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5 tabular-nums">
                        <span className="text-foreground">Extensão &amp; AAC (600h)</span>
                        <span className="font-mono text-[#E07406] font-extrabold">
                          {extHours}h / 600h ({extPct}%)
                        </span>
                      </div>
                      <Progress value={Math.max(4, extPct)} indicatorClassName="bg-accent" />
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-border/20 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-foreground">
                      <ShieldShape size={18} color="#15803D" />
                      <span className="font-bold">Percurso {profile.pathway || '01-01'}</span>
                      <span className="text-muted-foreground font-mono tabular-nums">
                        • {certs.length} cert. 120d
                      </span>
                    </div>
                    <Badge variant="success">Regular</Badge>
                  </div>

                  {profile.interests && profile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {profile.interests.map((key) => (
                        <Badge key={key} variant="outline">
                          {TALENT_LABEL_MAP[key] || key}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={openPassport}
                    className="w-full"
                  >
                    <CagpIcon name="sparkle" className="w-4 h-4 text-accent" />
                    <span>Editar Passaporte &amp; Talentos</span>
                  </Button>
                </div>
              </LayeredCard>
            </div>
          ) : (
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-secondary text-secondary-foreground">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">
                    Raio-X • Gestão Pública UFMG
                  </CardTitle>
                  <Badge variant="accent">PPC 2020</Badge>
                </div>
                <p className="text-xs text-white/90 font-medium m-0 leading-relaxed">
                  Curso sediado na FAFICH (Campus Pampulha) e vinculado ao Departamento de Ciência Política (DCP).
                </p>
              </CardHeader>

              <dl className="grid grid-cols-2 border-b-3 border-border bg-muted/40 divide-x-2 divide-y-2 divide-border text-xs m-0 tabular-nums">
                <div className="p-3.5">
                  <dt className="font-mono text-muted-foreground font-bold uppercase">Turno</dt>
                  <dd className="font-bold text-foreground m-0 mt-0.5">Noturno (19h–22h30)</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-muted-foreground font-bold uppercase">Duração</dt>
                  <dd className="font-bold text-foreground m-0 mt-0.5">10 Semestres</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-muted-foreground font-bold uppercase">Extensão + AAC</dt>
                  <dd className="font-bold text-foreground m-0 mt-0.5">600 Horas</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-muted-foreground font-bold uppercase">Estágio + TCC</dt>
                  <dd className="font-bold text-foreground m-0 mt-0.5">300h + 180h</dd>
                </div>
              </dl>

              <CardContent className="p-4">
                <Button asChild variant="default" className="w-full no-underline">
                  <a
                    href={route('/documentos/ementario-gestao-publica-ufmg.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CagpIcon name="thesis" className="w-4 h-4" />
                    <span>Baixar Ementário Completo (PDF)</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
};
