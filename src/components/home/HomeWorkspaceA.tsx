import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  setVaultItem,
  USER_ROLE_META,
  type UserRole,
  type VaultData,
} from '../../lib/storage/studentVault';
import {
  SIMULATED_NEWS,
  SIMULATED_INGRESSAR_DATA,
  SIMULATION_NOTICE,
  SIMULATION_BADGE_TEXT,
  type NewsCategory,
  type SimulatedNewsItem,
} from '../../lib/simulatedData';
import { AvatarRenderer } from '../passport/AvatarRenderer';
import { TALENT_CATEGORIES } from '../passport/talentConstants';
import { CagpIcon } from '../ui/CagpIcon';
import { downloadRu1815Ics, downloadCircular2230Ics } from '../../lib/ics';
import { route } from '../../lib/paths';

const TALENT_LABEL_MAP: Record<string, string> = Object.fromEntries(
  TALENT_CATEGORIES.map((c) => [c.key, c.label])
);

const CALOURO_STEPS = [
  {
    id: 'step-minhaufmg',
    title: 'Ativar MinhaUFMG e Carteirinha Digital',
    detail: 'Passaporte acadêmico, e-mail institucional e acesso às catracas do RU II.',
  },
  {
    id: 'step-eduroam',
    title: 'Configurar Wi-Fi eduroam no celular',
    detail: 'Conexão automática nos 4 andares da FAFICH e bibliotecas da UFMG.',
  },
  {
    id: 'step-fump',
    title: 'Questionário Socioeconômico da FUMP',
    detail: 'Classificação nos níveis I a IV para desconto ou isenção no Bandejão.',
  },
  {
    id: 'step-salas',
    title: 'Localizar salas no 3º andar e Colegiado (F-2039)',
    detail: 'Secretaria no 2º andar (Norma Guedes) e salas noturnas no 3º andar.',
  },
  {
    id: 'step-aproveitamento',
    title: 'Conferir prazo de Aproveitamento de Estudos',
    detail: 'Dispensa de disciplinas anteriores encerra no 2º período (Res. CEPE 06/19).',
  },
  {
    id: 'step-cagp',
    title: 'Participar da Recepção Discente do CAGP',
    detail: 'Integração noturna com Os Candangos, apadrinhamento e horas AAC.',
  },
];

const ART41_PREVIEW_STEPS = [
  {
    id: 'art41-vinculo',
    label: 'Atuação comprovada na administração pública ou terceiro setor correlato',
    norm: 'Art. 41, I',
  },
  {
    id: 'art41-tempo',
    label: 'Tempo mínimo exigido pelo Regulamento de Estágio (DCP 135 / DCP 136)',
    norm: '300h equiv.',
  },
  {
    id: 'art41-relatorio',
    label: 'Relatório de atividades profissionais e requerimento assinado no SEI',
    norm: 'Processo SEI',
  },
];

const UFMG_SYSTEMS = [
  { name: 'SIGA UFMG', desc: 'Matrícula e Histórico', href: 'https://siga.ufmg.br', color: '#9E2424' },
  { name: 'MinhaUFMG', desc: 'E-mail e Serviços', href: 'https://minha.ufmg.br', color: '#005A9C' },
  { name: 'Moodle Virtual', desc: 'Salas de Aula', href: 'https://virtual.ufmg.br', color: '#B45309' },
  { name: 'SEI UFMG', desc: 'Processos Oficiais', href: 'https://sei.ufmg.br', color: '#15803D' },
];

function computeCampusLiveStatus(now: Date) {
  const day = now.getDay(); // 0 = Sun, 6 = Sat
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekend = day === 0 || day === 6;

  // RU II Setorial: Almoço 11:00–14:00 (660–840), Jantar 17:30–19:30 (1050–1170) seg-sex
  let ruBadge = 'Jantar 17h30–19h30';
  let ruTone: 'open' | 'warn' | 'closed' = 'warn';
  let ruSub = 'Catracas fecham impreterivelmente às 19h30';

  if (isWeekend) {
    ruBadge = 'Fechado no fim de semana';
    ruTone = 'closed';
    ruSub = 'Retorna segunda-feira (Almoço 11h e Jantar 17h30)';
  } else if (minutes >= 1050 && minutes <= 1170) {
    ruBadge = 'Aberto agora • até 19h30';
    ruTone = 'open';
    ruSub = 'Jantar em andamento no RU II Setorial';
  } else if (minutes >= 660 && minutes <= 840) {
    ruBadge = 'Almoço aberto • até 14h';
    ruTone = 'open';
    ruSub = 'Jantar noturno abre às 17h30';
  } else if (minutes < 1050) {
    ruBadge = 'Abre jantar às 17h30';
    ruTone = 'warn';
    ruSub = 'Chegue até 18h30 para evitar fila extensa';
  } else {
    ruBadge = 'Encerrado hoje (19h30)';
    ruTone = 'closed';
    ruSub = 'Reabre no próximo dia útil';
  }

  // Circular Interno: 06:40–22:45 (400–1365) seg-sex
  let busBadge = 'Saídas até 22h45';
  let busTone: 'open' | 'warn' | 'closed' = 'open';
  let busSub = 'Noturno: 18h50 · 19h10 · 20h40 · 22h15 · 22h35 · 22h45';

  if (isWeekend) {
    busBadge = 'Sem operação interna';
    busTone = 'closed';
    busSub = 'Linhas internas operam em dias letivos (seg–sex)';
  } else if (minutes > 1365) {
    busBadge = 'Encerrado após 22h45';
    busTone = 'closed';
    busSub = 'Último circular noturno já partiu da Praça de Serviços';
  } else if (minutes >= 1320) {
    busBadge = 'Últimas saídas (22h15/35/45)';
    busTone = 'warn';
    busSub = 'Atenção ao horário limite na parada da FAFICH';
  }

  return { ruBadge, ruTone, ruSub, busBadge, busTone, busSub };
}

function getCandangoMilestoneLabel(globalPct: number, extHours: number): string {
  if (globalPct >= 90 || extHours >= 600) return 'Candango Integralizado';
  if (extHours >= 300 || globalPct >= 50) return 'Guardião das 600h';
  if (globalPct >= 15) return 'Percurso em Dia';
  return 'Ingressante FAFICH';
}

function renderNewsMotifSvg(motif: SimulatedNewsItem['motif']) {
  if (motif === 'assembleia') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#8B1E2D" />
        <circle cx="270" cy="25" r="55" fill="#9E2424" />
        <path d="M24 96H296" stroke="#E8A317" strokeWidth="2" strokeOpacity="0.6" />
        <rect x="32" y="34" width="12" height="62" rx="2" fill="#FBF8F3" fillOpacity="0.18" />
        <rect x="56" y="26" width="12" height="70" rx="2" fill="#FBF8F3" fillOpacity="0.26" />
        <rect x="80" y="42" width="12" height="54" rx="2" fill="#FBF8F3" fillOpacity="0.18" />
        <circle cx="248" cy="64" r="24" stroke="#E8A317" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      </svg>
    );
  }
  if (motif === 'carreiras') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#1E3F66" />
        <circle cx="265" cy="95" r="65" fill="#005A9C" fillOpacity="0.55" />
        <path d="M30 88L95 54L150 70L225 32L285 44" stroke="#E8A317" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="95" cy="54" r="4.5" fill="#FFFDF9" />
        <circle cx="150" cy="70" r="4.5" fill="#FFFDF9" />
        <circle cx="225" cy="32" r="5" fill="#E8A317" />
      </svg>
    );
  }
  if (motif === 'calourada') {
    return (
      <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
        <rect width="320" height="120" fill="#15803D" />
        <circle cx="60" cy="20" r="50" fill="#166534" />
        <circle cx="255" cy="60" r="32" stroke="#FEF3C7" strokeWidth="2.5" fill="none" />
        <path d="M180 95C195 68 230 68 245 95" stroke="#FFFDF9" strokeWidth="2.5" fill="none" />
        <path d="M225 95C240 68 275 68 290 95" stroke="#E8A317" strokeWidth="2.5" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full object-cover" aria-hidden="true">
      <rect width="320" height="120" fill="#3B1D24" />
      <circle cx="90" cy="60" r="22" stroke="#E8A317" strokeWidth="2" fill="none" />
      <circle cx="170" cy="38" r="16" stroke="#FFFDF9" strokeWidth="2" fill="none" />
      <circle cx="240" cy="74" r="20" stroke="#E8A317" strokeWidth="2" fill="none" />
      <path d="M110 53L154 42M185 45L222 65" stroke="#FFFDF9" strokeWidth="1.75" strokeOpacity="0.6" />
    </svg>
  );
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
  const [newsCategory, setNewsCategory] = useState<NewsCategory>('todas');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [campusStatus, setCampusStatus] = useState(() => computeCampusLiveStatus(new Date()));

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
    setCampusStatus(computeCampusLiveStatus(new Date()));

    const onVaultUpdate = () => loadVaultState();
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('cagp:vault-updated', onVaultUpdate);
    window.addEventListener('focus', onVaultUpdate);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    const interval = setInterval(() => {
      setCampusStatus(computeCampusLiveStatus(new Date()));
    }, 60000);

    return () => {
      window.removeEventListener('cagp:vault-updated', onVaultUpdate);
      window.removeEventListener('focus', onVaultUpdate);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(interval);
    };
  }, []);

  const handleRoleSwitch = (newRole: UserRole) => {
    if (newRole === userRole) return;
    setUserRole(newRole);
    setRoleTransitionTick((t) => t + 1);
    setVaultItem('cagp_user_role_v1', newRole);
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
  const calouroDoneCount = CALOURO_STEPS.filter((s) => calouroChecklist[s.id]).length;
  const calouroPct = Math.round((calouroDoneCount / CALOURO_STEPS.length) * 100);
  const art41DoneCount = ART41_PREVIEW_STEPS.filter((s) => art41Checklist[s.id]).length;

  const filteredNews = SIMULATED_NEWS.filter((item) =>
    newsCategory === 'todas' ? true : item.category === newsCategory
  );

  const roleMeta = USER_ROLE_META[userRole];
  const candangoMilestone = getCandangoMilestoneLabel(globalPct, extHours);

  // ============================================================================
  // BLOCO 1: DOSSIÊ PRIORITÁRIO DO PERFIL (Calouro / Veterano / Formando / Ingressar)
  // Pass 1 (distill) + Pass 2 (layout): sem cards aninhados; divisores de 1px em pedra
  // Pass 4 (animate) + Pass 5 (delight): chancela mecânica ao concluir etapas
  // ============================================================================
  const renderRolePrioritySection = () => {
    if (userRole === 'calouro') {
      const allDone = calouroDoneCount === CALOURO_STEPS.length;
      return (
        <section
          aria-labelledby="heading-role-calouro"
          className="bg-white rounded-3xl border border-[#DFDBD2] p-5 sm:p-6 shadow-2xs space-y-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2
                id="heading-role-calouro"
                className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-[#0A0A0A] m-0"
              >
                Primeiros 30 Dias na FAFICH • Dossiê de Ingresso
              </h2>
              <p className="text-xs text-[#57534E] mt-1 m-0">
                Marque cada visto concluído. Seu progresso fica salvo neste dispositivo, sem login.
              </p>
            </div>

            {/* Gesto-Assinatura: O Carimbo reage a cada visto marcado */}
            <span
              key={`calouro-stamp-${calouroDoneCount}`}
              className={`cagp-stamp-badge ${
                allDone ? 'is-deferido' : calouroDoneCount > 0 ? 'is-homologado' : 'is-visto'
              } tabular-nums`}
            >
              <CagpIcon name="stamp" className="w-3.5 h-3.5" />
              <span>
                {allDone
                  ? 'ACOLHIMENTO HOMOLOGADO'
                  : `${calouroDoneCount}/${CALOURO_STEPS.length} VISTOS`}
              </span>
            </span>
          </div>

          {/* Barra de Progresso do Acolhimento */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs tabular-nums">
              <span className="font-medium text-[#292524]">Progresso de ambientação noturna</span>
              <span className="font-mono font-bold text-[#8B1E2D]">{calouroPct}%</span>
            </div>
            <div className="h-2 w-full bg-[#F4F1EA] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-[width,background-color] duration-300 ${
                  allDone ? 'bg-[#15803D] is-pulse-100' : 'bg-[#8B1E2D]'
                }`}
                style={{ width: `${Math.max(4, calouroPct)}%` }}
              />
            </div>
          </div>

          {/* Lista de Vistos em Grid de 2 Colunas (Itens interativos táteis >= 44px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {CALOURO_STEPS.map((step, idx) => {
              const checked = Boolean(calouroChecklist[step.id]);
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => toggleCalouroStep(step.id)}
                  aria-pressed={checked}
                  className={`cagp-touch-spring p-3.5 rounded-2xl border text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    checked
                      ? 'bg-[#F0FDF4] border-[#15803D]/35 text-[#0A0A0A]'
                      : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] border-[#DFDBD2] text-[#0A0A0A]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border text-xs font-mono font-bold transition-colors tabular-nums ${
                      checked
                        ? 'bg-[#15803D] text-white border-[#15803D]'
                        : 'bg-white text-[#57534E] border-[#DFDBD2]'
                    }`}
                  >
                    {checked ? <CagpIcon name="check" className="w-3.5 h-3.5" /> : idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-xs font-bold block leading-snug ${
                        checked ? 'line-through text-[#166534]' : 'text-[#0A0A0A]'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-xs text-[#57534E] block mt-0.5 leading-snug">
                      {step.detail}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Delight: Chancela dos Candangos ao completar 6/6 vistos */}
          {allDone && (
            <div
              role="status"
              className="cagp-seal-unlock pt-3 border-t border-[#DFDBD2] flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
                  <CagpIcon name="stamp" className="w-4 h-4" />
                </span>
                <div>
                  <strong className="text-xs font-bold text-[#166534] block">
                    Chancela dos Candangos • Ambientação Concluída
                  </strong>
                  <span className="text-xs text-[#57534E]">
                    Você já domina a rotina da FAFICH. Próximo passo: planejar seu semestre no Grafo 10P.
                  </span>
                </div>
              </div>
              <a
                href={route('/percurso') + '#grafo'}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Abrir Grafo 10P</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </section>
      );
    }

    if (userRole === 'veterano') {
      return (
        <section
          aria-labelledby="heading-role-veterano"
          className="bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden"
        >
          {/* Faixa Principal: Guardião de 120 Dias (Art. 15, § 4º) */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2
                  id="heading-role-veterano"
                  className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-[#0A0A0A] m-0"
                >
                  Guardião de 120 Dias (AAC) & Integralização
                </h2>
                <p className="text-xs text-[#57534E] mt-1 m-0 max-w-[65ch]">
                  Pelo Art. 15, § 4º, certificados de eventos, seminários e semanas acadêmicas devem ser protocolados em até 120 dias corridos da realização.
                </p>
              </div>

              <span
                key={`vet-stamp-${certs.length}`}
                className={`cagp-stamp-badge ${
                  certs.length > 0 ? 'is-deferido' : 'is-homologado'
                } tabular-nums`}
              >
                <CagpIcon name="stamp" className="w-3.5 h-3.5" />
                <span>
                  {certs.length > 0
                    ? `${certs.length} CERTIFICADO(S) NO COFRE`
                    : 'TRAVA DE 120 DIAS ATIVA'}
                </span>
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-[#292524]">
                <span className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0">
                  <CagpIcon name="clock" className="w-4 h-4" />
                </span>
                <span>
                  {certs.length > 0
                    ? `Você monitora ${certs.length} certificado(s) no cofre local. Confira os prazos antes de submeter no SEI.`
                    : 'Nenhum certificado registrado ainda. Cadastre eventos recentes para não perder horas por decurso de prazo.'}
                </span>
              </div>
              <a
                href={route('/acg') + '#guardiao-120-dias'}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#8B1E2D] hover:bg-[#6E1420] text-white text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Gerenciar prazos de 120 dias</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Faixa Inferior em Duas Colunas Separadas por Filete Pedra (Zero Cards Aninhados) */}
          <div className="border-t border-[#DFDBD2] bg-[#FBF8F3] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#DFDBD2]">
            <a
              href={route('/acg') + '#calculadora'}
              className="p-5 hover:bg-[#F4F1EA] no-underline text-[#0A0A0A] flex flex-col justify-between gap-3 transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#8B1E2D] transition-colors flex items-center gap-2">
                    <CagpIcon name="calculator" className="w-4 h-4 text-[#15803D]" />
                    <span>Calculadora 600h (Extensão + AAC)</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#15803D] tabular-nums">
                    {extHours}h / 600h
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#DFDBD2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E8A317] rounded-full transition-[width] duration-300"
                    style={{ width: `${Math.max(4, extPct)}%` }}
                  />
                </div>
                <p className="text-xs text-[#57534E] m-0">
                  Mínimo de 300h em Extensão universitária e até 300h em AAC com espelho para o SEI.
                </p>
              </div>
              <span className="text-xs font-bold text-[#8B1E2D] inline-flex items-center gap-1">
                <span>Simular horas de integralização</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </a>

            <a
              href={route('/percurso') + '#grafo'}
              className="p-5 hover:bg-[#F4F1EA] no-underline text-[#0A0A0A] flex flex-col justify-between gap-3 transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0A0A0A] group-hover:text-[#8B1E2D] transition-colors flex items-center gap-2">
                    <CagpIcon name="curriculo" className="w-4 h-4 text-[#005A9C]" />
                    <span>Grafo 10P & 68 Optativas</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#005A9C] tabular-nums">
                    {obrigCount} / 27 Obrig.
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#DFDBD2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#005A9C] rounded-full transition-[width] duration-300"
                    style={{ width: `${Math.max(4, obrigPct)}%` }}
                  />
                </div>
                <p className="text-xs text-[#57534E] m-0">
                  Atenção à trava formal entre ECN 140 (Introd. à Economia) e ECN 044 (Economia Brasileira).
                </p>
              </div>
              <span className="text-xs font-bold text-[#8B1E2D] inline-flex items-center gap-1">
                <span>Planejar matrícula no SIGA</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </a>
          </div>
        </section>
      );
    }

    if (userRole === 'formando') {
      const art41AllDone = art41DoneCount === ART41_PREVIEW_STEPS.length;
      return (
        <section
          aria-labelledby="heading-role-formando"
          className="bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden"
        >
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2
                  id="heading-role-formando"
                  className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-[#0A0A0A] m-0"
                >
                  Reta Final • Dispensa de Estágio (Art. 41) & TCC (180h)
                </h2>
                <p className="text-xs text-[#57534E] mt-1 m-0">
                  Verifique a elegibilidade ao aproveitamento profissional (DCP 135/136) e as 4 modalidades de TCC.
                </p>
              </div>

              <span
                key={`art41-stamp-${art41DoneCount}`}
                className={`cagp-stamp-badge ${
                  art41AllDone ? 'is-deferido' : 'is-homologado'
                } tabular-nums`}
              >
                <CagpIcon name="stamp" className="w-3.5 h-3.5" />
                <span>
                  {art41AllDone
                    ? 'APTO AO REQUERIMENTO ART. 41'
                    : `ART. 41 • ${art41DoneCount}/${ART41_PREVIEW_STEPS.length} REQUISITOS`}
                </span>
              </span>
            </div>

            <div className="space-y-2">
              {ART41_PREVIEW_STEPS.map((item) => {
                const checked = Boolean(art41Checklist[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleArt41Step(item.id)}
                    aria-pressed={checked}
                    className={`cagp-touch-spring w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#F0FDF4] border-[#15803D]/35 text-[#0A0A0A]'
                        : 'bg-[#FBF8F3] hover:bg-[#F4F1EA] border-[#DFDBD2] text-[#0A0A0A]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                        checked
                          ? 'bg-[#15803D] text-white border-[#15803D]'
                          : 'bg-white text-[#57534E] border-[#DFDBD2]'
                      }`}
                    >
                      {checked ? <CagpIcon name="check" className="w-3.5 h-3.5" /> : null}
                    </span>
                    <span
                      className={`text-xs font-semibold flex-1 ${
                        checked ? 'line-through text-[#166534]' : 'text-[#0A0A0A]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs font-mono text-[#57534E] shrink-0 tabular-nums">
                      {item.norm}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Delight: Chancela Art. 41 quando todos os 3 requisitos estão marcados */}
            {art41AllDone && (
              <div
                role="status"
                className="cagp-seal-unlock pt-3 border-t border-[#DFDBD2] flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
                    <CagpIcon name="stamp" className="w-4 h-4" />
                  </span>
                  <div>
                    <strong className="text-xs font-bold text-[#166534] block">
                      Requisitos Preliminares do Art. 41 Verificados
                    </strong>
                    <span className="text-xs text-[#57534E]">
                      Gere a minuta de requerimento para protocolar seu processo de dispensa no SEI-UFMG.
                    </span>
                  </div>
                </div>
                <a
                  href={route('/estagio') + '#art41'}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Abrir Simulador Art. 41</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
          </div>

          {/* Barra Inferior de Ações Diretas Separada por Filetes (Zero Cards Aninhados) */}
          <div className="border-t border-[#DFDBD2] bg-[#FBF8F3] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#DFDBD2]">
            <a
              href={route('/estagio') + '#art41'}
              className="p-4 hover:bg-[#F4F1EA] no-underline text-[#0A0A0A] flex items-center justify-between gap-2 transition-colors"
            >
              <div>
                <span className="text-xs font-bold block">Simulador Art. 41</span>
                <span className="text-xs text-[#57534E]">Dispensa DCP 135/136</span>
              </div>
              <CagpIcon name="chevron-right" className="w-4 h-4 text-[#8B1E2D] shrink-0" />
            </a>
            <a
              href={route('/tcc') + '#modalidades'}
              className="p-4 hover:bg-[#F4F1EA] no-underline text-[#0A0A0A] flex items-center justify-between gap-2 transition-colors"
            >
              <div>
                <span className="text-xs font-bold block">4 Modalidades de TCC</span>
                <span className="text-xs text-[#57534E]">Art. 19 • 180 horas</span>
              </div>
              <CagpIcon name="chevron-right" className="w-4 h-4 text-[#8B1E2D] shrink-0" />
            </a>
            <a
              href={route('/documentos') + '#formularios'}
              className="p-4 hover:bg-[#F4F1EA] no-underline text-[#0A0A0A] flex items-center justify-between gap-2 transition-colors"
            >
              <div>
                <span className="text-xs font-bold block">Minutas & Termos SEI</span>
                <span className="text-xs text-[#57534E]">Modelos .docx e .pdf</span>
              </div>
              <CagpIcon name="chevron-right" className="w-4 h-4 text-[#8B1E2D] shrink-0" />
            </a>
          </div>
        </section>
      );
    }

    // Perfil: Quero Ingressar (Sem aninhamento triplo de cards)
    return (
      <section
        aria-labelledby="heading-role-ingressar"
        className="bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden"
      >
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2
                id="heading-role-ingressar"
                className="font-['Oswald'] text-lg sm:text-xl font-bold uppercase text-[#0A0A0A] m-0"
              >
                Por que estudar Gestão Pública na FAFICH / UFMG?
              </h2>
              <p className="text-xs text-[#57534E] mt-1 m-0 max-w-[68ch]">
                Bacharelado noturno gratuito de excelência para liderar políticas públicas, orçamento, cidades e transformação governamental.
              </p>
            </div>
            <span className="cagp-stamp-badge is-deferido tabular-nums">
              <CagpIcon name="stamp" className="w-3.5 h-3.5" />
              <span>NOTA 4 MEC • TURNO NOTURNO</span>
            </span>
          </div>

          {/* 3 Destaques Separados por Filetes Pedra (Sem caixas aninhadas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DFDBD2] border-y border-[#DFDBD2]">
            {SIMULATED_INGRESSAR_DATA.highlights.map((hl, idx) => (
              <div
                key={hl.id}
                className={`py-4 ${
                  idx === 0 ? 'md:pr-5' : idx === 1 ? 'md:px-5' : 'md:pl-5'
                }`}
              >
                <span className="font-['Oswald'] text-xl font-bold text-[#8B1E2D] block tabular-nums">
                  {hl.metric}
                </span>
                <strong className="text-xs font-bold text-[#0A0A0A] block mt-1">{hl.label}</strong>
                <p className="text-xs text-[#57534E] mt-1 mb-0 leading-relaxed">{hl.detail}</p>
              </div>
            ))}
          </div>

          {/* Links Oficiais de Ingresso (Dados Reais UFMG) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={route('/documentos/forma-ingresso-sisu.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#8B1E2D] hover:bg-[#6E1420] text-white text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors"
            >
              <CagpIcon name="thesis" className="w-4 h-4" />
              <span>Edital SiSU / ENEM (PDF)</span>
            </a>
            <a
              href={route('/documentos/forma-ingresso-reopcao.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-[#0A0A0A] text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Reopção de Curso (PDF)</span>
            </a>
            <a
              href={route('/percurso')}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-[#0A0A0A] text-xs font-bold no-underline inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Explorar Grade de 10 Períodos &rarr;</span>
            </a>
          </div>
        </div>

        {/* Faixa Editorial de Relatos Demonstrativos de Carreira (Simulados com Aviso Visível) */}
        <div className="border-t border-[#DFDBD2] bg-[#FBF8F3] p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <strong className="text-xs font-bold text-[#0A0A0A]">
              Áreas de Atuação & Relatos Demonstrativos de Carreira
            </strong>
            <span className="text-xs font-mono font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#B45309]/35 px-2.5 py-0.5 rounded-full">
              {SIMULATION_BADGE_TEXT}
            </span>
          </div>
          <p className="text-xs text-[#57534E] m-0">{SIMULATION_NOTICE}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#DFDBD2]">
            {SIMULATED_INGRESSAR_DATA.testimonials.map((t) => (
              <blockquote key={t.id} className="m-0 space-y-2">
                <p className="text-xs text-[#292524] leading-relaxed m-0">“{t.quote}”</p>
                <footer className="text-xs text-[#57534E] font-medium flex items-center justify-between pt-1">
                  <span>{t.cohortLabel}</span>
                  <span className="font-mono text-xs text-[#8B1E2D]">{t.area}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================================================
  // BLOCO 2: PLANTÃO NOTURNO • CAMPUS AGORA (RU II + Circular + Secretaria)
  // Pass 3 (colorize): estado semântico ao vivo + micro-confirmação nos alarmes
  // ============================================================================
  const campusAnyOpen = campusStatus.ruTone === 'open' || campusStatus.busTone === 'open';
  const campusAnyWarn = campusStatus.ruTone === 'warn' || campusStatus.busTone === 'warn';

  const renderCampusNowSection = () => (
    <section aria-labelledby="heading-campus-now" className="space-y-3" id="campus">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              campusAnyOpen
                ? 'bg-[#15803D] cagp-pulse-indicator'
                : campusAnyWarn
                ? 'bg-[#B45309] cagp-pulse-indicator'
                : 'bg-[#57534E]'
            }`}
            aria-hidden="true"
          />
          <h2
            id="heading-campus-now"
            className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0"
          >
            Plantão Noturno • Campus Agora
          </h2>
        </div>
        <button
          type="button"
          onClick={openCampus}
          className="min-h-[44px] px-3 rounded-full text-xs font-bold text-[#8B1E2D] hover:bg-[#F4F1EA] bg-transparent border-0 cursor-pointer inline-flex items-center gap-1 transition-colors"
        >
          <span>Horários e linhas completas</span>
          <CagpIcon name="chevron-right" className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Bandejão RU II Setorial */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#DFDBD2] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-9 h-9 rounded-2xl bg-[#8B1E2D]/10 text-[#8B1E2D] flex items-center justify-center shrink-0">
                <CagpIcon name="utensils" className="w-5 h-5" />
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full tabular-nums ${
                  campusStatus.ruTone === 'open'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : campusStatus.ruTone === 'warn'
                    ? 'bg-[#FEF3C7] text-[#92400E]'
                    : 'bg-[#F4F1EA] text-[#57534E]'
                }`}
              >
                {campusStatus.ruBadge}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-[#0A0A0A] m-0">Bandejão RU II Setorial</h3>
              <span className="font-mono text-xs font-bold text-[#292524] tabular-nums">
                R$ 5,60
              </span>
            </div>
            <p className="text-xs text-[#57534E] mt-1 mb-0 leading-snug">
              {notifs.ru1815
                ? 'Lembrete 18h15 ativo no cofre • Catraca fecha às 19h30'
                : campusStatus.ruSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => toggleNotif('ru1815')}
              aria-pressed={notifs.ru1815}
              className={`cagp-touch-spring min-h-[44px] px-3 rounded-xl font-mono text-xs font-bold border cursor-pointer inline-flex items-center gap-1.5 transition-colors ${
                notifs.ru1815
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-[#FBF8F3] text-[#292524] border-[#DFDBD2] hover:border-[#8B1E2D]'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span>{notifs.ru1815 ? 'Alarme 18h15 Ativo' : 'Alarme 18h15'}</span>
            </button>
            <button
              type="button"
              onClick={downloadRu1815Ics}
              className="min-h-[44px] px-3 rounded-xl font-mono text-xs font-semibold bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-[#57534E] cursor-pointer inline-flex items-center"
              title="Salvar horário do jantar na agenda (.ics)"
            >
              Agenda .ics
            </button>
          </div>
        </div>

        {/* Card 2: Circular Interno */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#DFDBD2] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-9 h-9 rounded-2xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
                <CagpIcon name="bus" className="w-5 h-5" />
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full tabular-nums ${
                  campusStatus.busTone === 'open'
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : campusStatus.busTone === 'warn'
                    ? 'bg-[#FEF3C7] text-[#92400E]'
                    : 'bg-[#F4F1EA] text-[#57534E]'
                }`}
              >
                {campusStatus.busBadge}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0A0A0A] m-0">Circular Interno • FAFICH</h3>
            <p className="text-xs text-[#57534E] mt-1 mb-0 leading-snug tabular-nums">
              {notifs.circular2230
                ? 'Lembrete 22h30 ativo no cofre • Última saída às 22h45'
                : campusStatus.busSub}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => toggleNotif('circular2230')}
              aria-pressed={notifs.circular2230}
              className={`cagp-touch-spring min-h-[44px] px-3 rounded-xl font-mono text-xs font-bold border cursor-pointer inline-flex items-center gap-1.5 transition-colors ${
                notifs.circular2230
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-[#FBF8F3] text-[#292524] border-[#DFDBD2] hover:border-[#8B1E2D]'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span>{notifs.circular2230 ? 'Alarme 22h30 Ativo' : 'Alarme 22h30'}</span>
            </button>
            <button
              type="button"
              onClick={downloadCircular2230Ics}
              className="min-h-[44px] px-3 rounded-xl font-mono text-xs font-semibold bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-[#57534E] cursor-pointer inline-flex items-center"
              title="Salvar alerta do último circular na agenda (.ics)"
            >
              Agenda .ics
            </button>
          </div>
        </div>

        {/* Card 3: Secretaria do Colegiado & FAFICH */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#DFDBD2] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="w-9 h-9 rounded-2xl bg-[#005A9C]/10 text-[#005A9C] flex items-center justify-center shrink-0">
                <CagpIcon name="building" className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono font-bold bg-[#F4F1EA] text-[#292524] px-2.5 py-0.5 rounded-full tabular-nums">
                Sala F-2039 • 2º Andar
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0A0A0A] m-0">Colegiado DCP & FAFICH</h3>
            <p className="text-xs text-[#57534E] mt-1 mb-0 leading-snug tabular-nums">
              Secretaria: Norma Guedes (08h–20h) • Biblioteca e CEAG abertos no turno noturno até 22h.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[#57534E] truncate">coordgestaopublica@gmail.com</span>
            <a
              href={route('/curso') + '#colegiado'}
              className="min-h-[44px] px-2.5 rounded-xl font-bold text-[#8B1E2D] hover:bg-[#F4F1EA] no-underline shrink-0 inline-flex items-center gap-1 transition-colors"
            >
              <span>Contatos</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // BLOCO 3: MURAL DE NOTÍCIAS DO CAGP (Subseção de Hoje: /noticias e /noticias/[slug])
  // Pass 1 (distill): link único no topo da seção e tarja única de simulação sem duplicar nos cards
  // ============================================================================
  const renderNewsEditorialSection = () => (
    <section aria-labelledby="heading-news-mural" className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E2D] shrink-0" aria-hidden="true" />
          <h2
            id="heading-news-mural"
            className="font-['Oswald'] text-base sm:text-lg font-bold uppercase text-[#0A0A0A] m-0"
          >
            Mural de Notícias, Eventos & Carreiras
          </h2>
        </div>

        <a
          href={route('/noticias')}
          className="min-h-[44px] px-3.5 rounded-full text-xs font-bold bg-white hover:bg-[#F4F1EA] text-[#8B1E2D] border border-[#DFDBD2] no-underline inline-flex items-center gap-1.5 transition-colors tabular-nums"
        >
          <span>Mural completo ({SIMULATED_NEWS.length})</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      {/* Filtros de Categoria (Pílulas Táteis >= 44px) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {(
          [
            { id: 'todas', label: 'Todas as pautas' },
            { id: 'assembleia', label: 'Assembleias' },
            { id: 'estagio', label: 'Estágios & Carreiras' },
            { id: 'eventos', label: 'Calourada & Atlética' },
            { id: 'academico', label: 'Seminários' },
          ] as { id: NewsCategory; label: string }[]
        ).map((cat) => {
          const active = newsCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setNewsCategory(cat.id)}
              aria-pressed={active}
              className={`min-h-[44px] px-3.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap border inline-flex items-center ${
                active
                  ? 'bg-[#8B1E2D] text-white border-[#8B1E2D]'
                  : 'bg-white hover:bg-[#F4F1EA] text-[#292524] border-[#DFDBD2]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Aviso Obrigatório de Conteúdo Simulado (PRODUCT.md) */}
      <div
        role="note"
        className="px-4 py-2.5 rounded-2xl bg-[#FEF3C7]/80 border border-[#B45309]/30 flex flex-wrap items-center justify-between gap-2 text-xs text-[#78350F]"
      >
        <span className="font-medium">
          <strong>Aviso de Simulação:</strong> {SIMULATION_NOTICE}
        </span>
        <span className="font-mono text-xs font-bold uppercase bg-white/85 px-2 py-0.5 rounded-md border border-[#B45309]/30">
          simulated: true
        </span>
      </div>

      {/* Carrossel Horizontal no Mobile (Snap) / Grid de 3 Colunas no Tablet & Desktop (Proposta A) */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-1 snap-x snap-mandatory">
        {filteredNews.slice(0, 3).map((item) => {
          const badgeClass =
            item.tagColor === 'burgundy'
              ? 'bg-[#8B1E2D] text-white'
              : item.tagColor === 'gold'
              ? 'bg-[#E8A317] text-[#0A0A0A]'
              : item.tagColor === 'green'
              ? 'bg-[#15803D] text-white'
              : 'bg-[#005A9C] text-white';

          const articleUrl = route(`/noticias/${item.slug}`);

          return (
            <article
              key={item.id}
              className="w-[285px] md:w-auto shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-[#DFDBD2] hover:border-[#8B1E2D]/50 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <a
                href={articleUrl}
                className="no-underline text-inherit flex flex-col flex-1 justify-between"
              >
                <div>
                  <div className="h-32 relative overflow-hidden">
                    {renderNewsMotifSvg(item.motif)}
                    <span
                      className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs ${badgeClass}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-[#0A0A0A] group-hover:text-[#8B1E2D] transition-colors leading-snug m-0">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-1.5 mb-0 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-3.5 pt-2.5 border-t border-[#F4F1EA] flex items-center justify-between text-xs">
                  <span className="text-[#57534E] font-medium truncate tabular-nums">
                    {item.meta}
                  </span>
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
    </section>
  );

  // Ordenação dinâmica dos módulos da coluna esquerda conforme o perfil selecionado
  const renderOrderedLeftColumn = () => {
    if (userRole === 'veterano') {
      return (
        <>
          {renderCampusNowSection()}
          {renderRolePrioritySection()}
          {renderNewsEditorialSection()}
        </>
      );
    }
    if (userRole === 'ingressar') {
      return (
        <>
          {renderRolePrioritySection()}
          {renderNewsEditorialSection()}
          {renderCampusNowSection()}
        </>
      );
    }
    // calouro & formando
    return (
      <>
        {renderRolePrioritySection()}
        {renderCampusNowSection()}
        {renderNewsEditorialSection()}
      </>
    );
  };

  const firstName =
    profile.name === 'Estudante de Gestão Pública'
      ? 'Estudante'
      : profile.name.split(' ')[0] || 'Estudante';

  return (
    <div className="space-y-8 pb-8">
      {/* ====================================================================
          HEADER BANNER BORDÔ (Proposta A: Mobile, Tablet & Desktop)
          The Tinted-On-Wine Rule: #FFFDF9 e #FCE7EB para contraste >= 7:1
          ==================================================================== */}
      <section
        aria-label="Boas-vindas e Seletor de Perfil"
        className="bg-gradient-to-r from-[#6E1420] via-[#8B1E2D] to-[#7A1826] rounded-[28px] p-4 sm:p-6 text-[#FFFDF9] shadow-sm border border-black/15 space-y-4"
      >
        {/* Linha Superior: Menu Mobile + Identidade + Saudação + Busca Global ⌘K */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2.5">
            {/* Barra de Topo Mobile integrada ao Header Bordô (Substitui a Topbar duplicada) */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={openDrawer}
                  className="md:hidden w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-[#FFFDF9] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  title="Abrir Menu Geral"
                  aria-label="Abrir gaveta de navegação"
                >
                  <CagpIcon name="menu" className="w-5 h-5" />
                </button>
                <span className="bg-[#E8A317] text-[#0A0A0A] text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                  Turno Noturno
                </span>
                <span className="bg-white/15 text-[#FFFDF9] text-xs font-semibold px-2.5 py-0.5 rounded-full tabular-nums hidden sm:inline-block">
                  FAFICH / UFMG • PPC 2020
                </span>
                {!isOnline && (
                  <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
                    Modo Offline Ativo
                  </span>
                )}
              </div>

              {/* Ações Rápidas Compactas no Mobile (< sm) na mesma linha do Menu */}
              <div className="flex sm:hidden items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={openSpotlight}
                  className="w-11 h-11 rounded-full bg-black/25 hover:bg-black/35 border border-white/20 text-[#FFFDF9] flex items-center justify-center transition-colors cursor-pointer"
                  title="Buscar no app (⌘K)"
                  aria-label="Buscar edital, disciplina ou sala"
                >
                  <CagpIcon name="search" className="w-4 h-4 text-[#E8A317]" />
                </button>

                <button
                  type="button"
                  onClick={openCampus}
                  className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-[#FFFDF9] flex items-center justify-center relative transition-colors cursor-pointer"
                  title="Plantão Noturno • RU II & Circular"
                  aria-label="Abrir status do Campus Agora"
                >
                  <CagpIcon name="bell" className="w-4 h-4" />
                  <span className="w-2 h-2 rounded-full bg-[#E8A317] absolute top-2 right-2" />
                </button>

                <button
                  type="button"
                  onClick={openPassport}
                  className="min-h-[44px] bg-[#FFFDF9] hover:bg-[#FBF8F3] text-[#8B1E2D] px-3 py-1.5 rounded-full text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CagpIcon name="passport" className="w-4 h-4" />
                  <span>{userRole === 'ingressar' ? 'Perfil' : 'Passaporte'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                <h1 className="font-['Oswald'] text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#FFFDF9] m-0 leading-tight">
                  {userRole === 'ingressar'
                    ? 'Gestão Pública • FAFICH / UFMG'
                    : `Olá, ${firstName}`}
                </h1>
                <p className="text-xs sm:text-sm text-[#FCE7EB] m-0 mt-0.5 leading-snug">
                  {roleMeta.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Ação Primária do Header para Telas >= sm: Busca Global ⌘K + Passaporte no Tablet */}
          <div className="hidden sm:flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={openSpotlight}
              className="min-h-[44px] bg-black/25 hover:bg-black/35 border border-white/20 rounded-full px-4 py-2 flex items-center justify-between gap-3 text-xs text-[#FFFDF9] transition-colors cursor-pointer"
              aria-label="Buscar edital, disciplina ou sala (⌘K)"
            >
              <span className="flex items-center gap-2">
                <CagpIcon name="search" className="w-4 h-4 text-[#E8A317]" />
                <span className="text-[#FCE7EB]">Buscar disciplina, norma, sala...</span>
              </span>
              <kbd className="text-xs font-mono bg-white/15 text-[#FFFDF9] px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={openPassport}
              className="xl:hidden min-h-[44px] bg-[#FFFDF9] hover:bg-[#FBF8F3] text-[#8B1E2D] px-4 py-2 rounded-full text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CagpIcon name="passport" className="w-4 h-4" />
              <span>{userRole === 'ingressar' ? 'Perfil' : 'Passaporte'}</span>
            </button>
          </div>
        </div>

        {/* Seletor Tátil de Perfil (Personaliza a Home em Tempo Real) */}
        <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-mono text-[#FCE7EB] mr-1 shrink-0">
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
                  className={`cagp-touch-spring min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 border inline-flex items-center ${
                    active
                      ? 'bg-[#FFFDF9] text-[#8B1E2D] border-[#FFFDF9] shadow-2xs'
                      : 'bg-white/12 hover:bg-white/22 text-[#FFFDF9] border-white/15'
                  }`}
                >
                  {meta.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-[#FCE7EB] hidden sm:inline tabular-nums">
            {roleMeta.periodHint}
          </span>
        </div>
      </section>

      {/* ====================================================================
          FAIXA DE PROGRESSO COMPACTA MOBILE & TABLET (< xl)
          Eleva o progresso de integralização (27 Obrigatórias + 600h) para a
          primeira dobra no celular sem duplicar o card completo no rodapé
          ==================================================================== */}
      {userRole !== 'ingressar' && (
        <section
          aria-label="Resumo rápido de integralização PPC 2020"
          className="xl:hidden bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden"
        >
          <div className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-[#8B1E2D]/10 border border-[#8B1E2D]/20 flex flex-col items-center justify-center shrink-0 tabular-nums">
                <span className="text-xs font-extrabold text-[#8B1E2D] leading-none">
                  {globalPct}%
                </span>
                <span className="text-[11px] font-mono text-[#57534E] leading-none mt-0.5">
                  3.000h
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold text-[#0A0A0A] truncate">
                    {profile.period} • Percurso {profile.pathway || '01-01'}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#8B1E2D] bg-[#FBF8F3] border border-[#DFDBD2] px-2 py-0.5 rounded-md tabular-nums">
                    {candangoMilestone}
                  </span>
                </div>
                <p className="text-xs text-[#57534E] m-0 mt-0.5 tabular-nums">
                  {obrigCount}/27 obrigatórias ({obrigPct}%) • {extHours}h/600h Extensão & AAC ({extPct}%)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openPassport}
              className="cagp-touch-spring min-h-[44px] px-3.5 py-2 rounded-xl bg-[#FBF8F3] hover:bg-[#F4F1EA] border border-[#DFDBD2] text-xs font-bold text-[#8B1E2D] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <CagpIcon name="sparkle" className="w-3.5 h-3.5 text-[#E8A317]" />
              <span>Passaporte & Talentos</span>
            </button>
          </div>

          <div className="grid grid-cols-2 divide-x divide-[#DFDBD2] border-t border-[#DFDBD2] bg-[#FBF8F3] px-4 py-2.5 gap-4">
            <div>
              <div className="flex justify-between text-[11px] font-mono text-[#57534E] mb-1 tabular-nums">
                <span>Obrigatórias</span>
                <strong className="text-[#0A0A0A]">{obrigCount}/27</strong>
              </div>
              <div className="h-1.5 w-full bg-[#DFDBD2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8B1E2D] rounded-full transition-[width] duration-300"
                  style={{ width: `${Math.max(4, obrigPct)}%` }}
                />
              </div>
            </div>
            <div className="pl-4">
              <div className="flex justify-between text-[11px] font-mono text-[#57534E] mb-1 tabular-nums">
                <span>600h Ext + AAC</span>
                <strong className="text-[#0A0A0A]">{extHours}h/600h</strong>
              </div>
              <div className="h-1.5 w-full bg-[#DFDBD2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E8A317] rounded-full transition-[width] duration-300"
                  style={{ width: `${Math.max(4, extPct)}%` }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          GRID PRINCIPAL PROPOSTA A: 8 COLUNAS (CONTEÚDO) + 4 COLUNAS (DOSSIÊ)
          ==================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Coluna Principal (8 colunas no Desktop, 12 no Tablet/Mobile) */}
        <div
          key={`workspace-role-${userRole}`}
          className={`xl:col-span-8 space-y-8 ${
            roleTransitionTick > 0 ? 'cagp-animate-ws-enter' : ''
          }`}
        >
          {renderOrderedLeftColumn()}
        </div>

        {/* Coluna Direita Fixa no Desktop: Passaporte Discente & Sistemas (4 colunas) */}
        <aside
          aria-label="Passaporte Discente e Progresso PPC 2020"
          className="xl:col-span-4 space-y-6 xl:sticky xl:top-6"
          id="passaporte"
        >
          {userRole !== 'ingressar' ? (
            <div className="hidden xl:block bg-white rounded-3xl p-5 border border-[#DFDBD2] shadow-2xs space-y-4">
              {/* Topo do Card Passaporte */}
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
                    <h2 className="text-base font-extrabold text-[#0A0A0A] m-0 truncate">
                      {profile.name}
                    </h2>
                    <p className="text-xs text-[#57534E] m-0 mt-0.5 tabular-nums">
                      {profile.period} • Ingresso {profile.semester || '2026/1'}
                    </p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#8B1E2D]/8 border border-[#8B1E2D]/20 flex flex-col items-center justify-center shrink-0 tabular-nums">
                  <span className="text-xs font-extrabold text-[#8B1E2D]">{globalPct}%</span>
                  <span className="text-xs font-mono text-[#57534E]">3.000h</span>
                </div>
              </div>

              {/* Carimbo Institucional de Status (Gesto-Assinatura) + Patente Candanga */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="cagp-stamp-badge is-deferido">
                  <CagpIcon name="stamp" className="w-3.5 h-3.5" />
                  <span>{profile.period.toUpperCase()} • ATIVO</span>
                </span>
                <span className="text-xs font-mono font-semibold text-[#8B1E2D] tabular-nums">
                  {candangoMilestone}
                </span>
              </div>

              {/* Barras de Progresso Limpas com Numerais Tabulares */}
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1 tabular-nums">
                    <span className="text-[#292524]">27 Disciplinas Obrigatórias</span>
                    <span className="font-bold text-[#0A0A0A]">
                      {obrigCount} / 27 ({obrigPct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#F4F1EA] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#8B1E2D] rounded-full transition-[width] duration-300 ${
                        obrigPct === 100 ? 'is-pulse-100' : ''
                      }`}
                      style={{ width: `${Math.max(4, obrigPct)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1 tabular-nums">
                    <span className="text-[#292524]">Extensão & AAC (600h)</span>
                    <span className="font-bold text-[#0A0A0A]">
                      {extHours}h / 600h ({extPct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#F4F1EA] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#E8A317] rounded-full transition-[width] duration-300 ${
                        extPct === 100 ? 'is-pulse-100' : ''
                      }`}
                      style={{ width: `${Math.max(4, extPct)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Linha de Situação PPC 2020 separada por filete (Sem card aninhado) */}
              <div className="pt-3 border-t border-[#DFDBD2] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#292524]">
                  <CagpIcon name="shield" className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span className="font-semibold">Percurso {profile.pathway || '01-01'}</span>
                  <span className="text-[#57534E] font-mono tabular-nums">
                    • {certs.length} cert. 120d
                  </span>
                </div>
                <span className="font-mono font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-md">
                  Regular
                </span>
              </div>

              {/* Áreas de Interesse (Banco de Talentos) */}
              {profile.interests && profile.interests.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {profile.interests.map((key) => (
                    <span
                      key={key}
                      className="text-xs font-semibold bg-[#FBF8F3] border border-[#DFDBD2] text-[#292524] px-2.5 py-0.5 rounded-lg"
                    >
                      {TALENT_LABEL_MAP[key] || key}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Principal do Passaporte */}
              <button
                type="button"
                onClick={openPassport}
                className="cagp-touch-spring w-full min-h-[44px] py-2.5 px-4 bg-[#0A0A0A] hover:bg-[#8B1E2D] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CagpIcon name="sparkle" className="w-4 h-4 text-[#E8A317]" />
                <span>Editar Passaporte & Banco de Talentos</span>
              </button>
            </div>
          ) : (
            /* Coluna Direita quando o perfil é "Quero Ingressar" (Ficha Técnica sem cards aninhados) */
            <div className="bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden">
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-['Oswald'] text-base font-bold uppercase text-[#0A0A0A] m-0">
                    Raio-X • Gestão Pública UFMG
                  </h2>
                  <span className="cagp-stamp-badge is-deferido">PPC 2020</span>
                </div>
                <p className="text-xs text-[#57534E] m-0 leading-relaxed">
                  Curso sediado na FAFICH (Campus Pampulha) e vinculado ao Departamento de Ciência Política (DCP).
                </p>
              </div>

              <dl className="grid grid-cols-2 border-y border-[#DFDBD2] bg-[#FBF8F3] divide-x divide-y divide-[#DFDBD2] text-xs m-0 tabular-nums">
                <div className="p-3.5">
                  <dt className="font-mono text-[#57534E] uppercase">Turno</dt>
                  <dd className="font-bold text-[#0A0A0A] m-0 mt-0.5">Noturno (19h–22h30)</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-[#57534E] uppercase">Duração</dt>
                  <dd className="font-bold text-[#0A0A0A] m-0 mt-0.5">10 Semestres</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-[#57534E] uppercase">Extensão + AAC</dt>
                  <dd className="font-bold text-[#0A0A0A] m-0 mt-0.5">600 Horas</dd>
                </div>
                <div className="p-3.5">
                  <dt className="font-mono text-[#57534E] uppercase">Estágio + TCC</dt>
                  <dd className="font-bold text-[#0A0A0A] m-0 mt-0.5">300h + 180h</dd>
                </div>
              </dl>

              <div className="p-4">
                <a
                  href={route('/documentos/ementario-gestao-publica-ufmg.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] py-2.5 px-4 bg-[#8B1E2D] hover:bg-[#6E1420] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 no-underline transition-colors"
                >
                  <CagpIcon name="thesis" className="w-4 h-4" />
                  <span>Baixar Ementário Completo (PDF)</span>
                </a>
              </div>
            </div>
          )}

          {/* Acesso Rápido aos Sistemas Oficiais da UFMG (Grade Direta com Filetes, Zero Cards Aninhados) */}
          <div className="bg-white rounded-3xl border border-[#DFDBD2] shadow-2xs overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#DFDBD2] flex items-center justify-between">
              <h3 className="font-['Oswald'] text-xs font-bold uppercase text-[#0A0A0A] m-0">
                Sistemas Oficiais UFMG
              </h3>
              <span className="text-xs font-mono text-[#57534E]">Acesso Direto</span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-[#DFDBD2]">
              {UFMG_SYSTEMS.map((sys) => (
                <a
                  key={sys.name}
                  href={sys.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-white hover:bg-[#FBF8F3] no-underline flex items-center justify-between gap-2 transition-colors"
                >
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5 truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: sys.color }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{sys.name}</span>
                    </span>
                    <span className="text-xs text-[#57534E] block truncate mt-0.5">{sys.desc}</span>
                  </div>
                  <CagpIcon name="arrow-up-right" className="w-3.5 h-3.5 text-[#8B1E2D] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
