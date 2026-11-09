import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import { route } from '@/lib/paths';
import { tactileSpring, bounceSpring, staggerContainer, staggerItem } from '@/lib/motion';
import { toast } from 'sonner';

interface TalentosProfile {
  interestAreas: string[];
  stageStatus:
    | 'buscando_estagio'
    | 'estagiando_nao_obrigatorio'
    | 'estagiando_obrigatorio'
    | 'servidor_art41'
    | 'concluido';
  weeklyHoursAvailable: number;
  lattesUrl: string;
  linkedinUrl: string;
  skills: string[];
  interestedInEmpresaJunior: boolean;
  updatedAt?: string;
}

const AREAS = [
  'Planejamento Governamental',
  'Orçamento & Finanças Públicas',
  'Licitações & Contratos (Lei 14.133)',
  'Gestão de Pessoas no Setor Público',
  'Análise de Dados & Políticas Baseadas em Evidências',
  'Políticas Sociais, Direitos Humanos & Saúde',
  'Educação, Cultura & Cidades Inteligentes',
  'Terceiro Setor, OSCs & Captação de Recursos (MROSC)',
];

const SUGGESTED_SKILLS = [
  'SEI! (Sistema Eletrônico de Informações)',
  'Lei 14.133/2021 (Licitações)',
  'Orçamento Público (PPA/LDO/LOA)',
  'MROSC (Lei 13.019)',
  'Excel / Power BI',
  'R / Python para Dados Públicos',
  'Redação Oficial',
  'Avaliação de Políticas Públicas',
];

const SEMENTE_CAREER_PROPOSALS = [
  {
    num: 'Proposta 09',
    eixo: 'Eixo 3 • Desenvolvimento & Carreira',
    title: 'Parcerias com Órgãos Públicos, OSCs & Egressos',
    desc: 'Realização periódica de painéis, oficinas práticas e seminários conectando estudantes a gestores da SEPLAG, PBH, TCE-MG, ALMG, terceiro setor (OSCs) e egressos do curso.',
    badge: 'Networking Público',
    color: 'bg-primary text-white',
    icon: 'bi-building-check',
  },
  {
    num: 'Proposta 11',
    eixo: 'Eixo 3 • Empreendedorismo Público',
    title: 'Apoio Amplo à Fundação da Empresa Júnior de GP',
    desc: 'Articulação institucional, assessoria jurídica do CA e apoio logístico para fundar e estruturar a Empresa Júnior de Gestão Pública da UFMG — projetos reais de consultoria pública desde o 1º período.',
    badge: 'Empresa Júnior GP',
    color: 'bg-[#134E4A] text-white',
    icon: 'bi-rocket-takeoff-fill',
  },
  {
    num: 'Proposta 12',
    eixo: 'Eixo 4 • Comunicação Ativa',
    title: 'Divulgação Ágil de Vagas, Estágios, Bolsas e Concursos',
    desc: 'Radar permanente de editais de estágio, programas de trainee em gestão pública (Vetores, FJP), bolsas de extensão/IC e concursos com alertas diretos no SuperApp.',
    badge: 'Mural de Vagas Ativo',
    color: 'bg-[#FF8811] text-[#16181d]',
    icon: 'bi-megaphone-fill',
  },
];

const CURATED_VACANCIES = [
  {
    id: 'v1',
    agency: 'SEPLAG-MG (Secretaria de Estado de Planejamento e Gestão)',
    role: 'Estágio em Monitoramento de Políticas Públicas e Gestão Estratégica',
    hours: '30h semanais',
    allowance: 'R$ 1.250 + Auxílio Transporte',
    periodReq: 'A partir do 3º período',
    status: 'Inscrições Abertas',
    link: 'https://planejamento.mg.gov.br',
    tag: 'Estadual',
    proposalLink: 'Proposta 12 • Radar de Vagas',
  },
  {
    id: 'v2',
    agency: 'Prefeitura Municipal de Belo Horizonte (PBH)',
    role: 'Estágio em Planejamento Urbano, Orçamento e Descentralização Regional',
    hours: '20h ou 30h semanais',
    allowance: 'R$ 1.100 + Transporte',
    periodReq: 'Do 2º ao 8º período',
    status: 'Banco Contínuo',
    link: 'https://prefeitura.pbh.gov.br',
    tag: 'Municipal',
    proposalLink: 'Proposta 12 • Radar de Vagas',
  },
  {
    id: 'v3',
    agency: 'Tribunal de Contas do Estado de Minas Gerais (TCE-MG)',
    role: 'Apoio à Fiscalização, Controle Externo e Avaliação de Políticas Municipais',
    hours: '30h semanais',
    allowance: 'R$ 1.400 + Benefícios',
    periodReq: 'A partir do 4º período',
    status: 'Edital Semestral',
    link: 'https://tce.mg.gov.br',
    tag: 'Controle',
    proposalLink: 'Proposta 09 & 12 • Órgãos',
  },
  {
    id: 'v4',
    agency: 'Ministério Público de Minas Gerais (MPMG)',
    role: 'Estágio em Centros de Apoio Operacional de Políticas Públicas (CAOP)',
    hours: '30h semanais',
    allowance: 'R$ 1.350 + Seguro + Recesso',
    periodReq: 'A partir do 3º período',
    status: 'Processo Seletivo',
    link: 'https://mpmg.mp.br',
    tag: 'Controle',
    proposalLink: 'Proposta 12 • Radar de Vagas',
  },
  {
    id: 'v5',
    agency: 'Assembleia Legislativa de Minas Gerais (ALMG)',
    role: 'Programa de Estágio em Assessoria Parlamentar e Comissões Temáticas',
    hours: '20h ou 30h semanais',
    allowance: 'R$ 1.480 + Auxílio Transporte',
    periodReq: 'Do 4º ao 8º período',
    status: 'Edital Anual',
    link: 'https://almg.gov.br',
    tag: 'Estadual',
    proposalLink: 'Proposta 09 • Parcerias',
  },
  {
    id: 'v6',
    agency: 'Rede de OSCs & Terceiro Setor de Belo Horizonte (MROSC)',
    role: 'Gestão de Projetos Sociais, Captação de Recursos e Parcerias Públicas',
    hours: '20h semanais',
    allowance: 'R$ 1.050 + Vale Transporte',
    periodReq: 'A partir do 1º período',
    status: 'Parceria Ativa',
    link: 'https://plataformaosc.ipea.gov.br',
    tag: 'OSCs',
    proposalLink: 'Proposta 09 • Terceiro Setor',
  },
];

export const CarreiraTalentosTab: React.FC = () => {
  const [profile, setProfile] = useState<TalentosProfile>({
    interestAreas: [],
    stageStatus: 'buscando_estagio',
    weeklyHoursAvailable: 30,
    lattesUrl: '',
    linkedinUrl: '',
    skills: [],
    interestedInEmpresaJunior: false,
  });

  const [newSkill, setNewSkill] = useState('');
  const [sphereFilter, setSphereFilter] = useState<string>('Todas');

  useEffect(() => {
    try {
      const saved = getVaultItem('cagp_carreira_talentos_v1');
      if (saved) {
        setProfile((prev) => ({ ...prev, ...saved }));
      }
    } catch (e) {
      console.error('Erro ao ler talento discente', e);
    }
  }, []);

  const persistProfile = (updated: TalentosProfile) => {
    setProfile(updated);
    setVaultItem('cagp_carreira_talentos_v1', updated);
  };

  const toggleArea = (area: string) => {
    const current = profile.interestAreas;
    const next = current.includes(area)
      ? current.filter((a) => a !== area)
      : [...current, area];
    persistProfile({ ...profile, interestAreas: next, updatedAt: new Date().toISOString() });
  };

  const handleStatusChange = (status: TalentosProfile['stageStatus']) => {
    persistProfile({ ...profile, stageStatus: status, updatedAt: new Date().toISOString() });
    toast.success('Momento profissional salvo no seu Cofre Discente!');
  };

  const handleHoursChange = (hours: number) => {
    persistProfile({ ...profile, weeklyHoursAvailable: hours, updatedAt: new Date().toISOString() });
  };

  const toggleEmpresaJunior = () => {
    const nextVal = !profile.interestedInEmpresaJunior;
    persistProfile({
      ...profile,
      interestedInEmpresaJunior: nextVal,
      updatedAt: new Date().toISOString(),
    });
    toast.success(
      nextVal
        ? 'Interesse na Empresa Júnior de GP (Proposta 11) registrado no seu perfil!'
        : 'Preferência da Empresa Júnior atualizada.'
    );
  };

  const handleSaveUrls = (e: React.FormEvent) => {
    e.preventDefault();
    persistProfile({ ...profile, updatedAt: new Date().toISOString() });
    toast.success('Currículo atualizado com sucesso no Banco de Talentos local!');
  };

  const addSkillString = (skillText: string) => {
    const clean = skillText.trim();
    if (!clean) return;
    if (!profile.skills.includes(clean)) {
      const updatedSkills = [...profile.skills, clean];
      persistProfile({ ...profile, skills: updatedSkills, updatedAt: new Date().toISOString() });
    }
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      addSkillString(newSkill);
      setNewSkill('');
    }
  };

  const removeSkill = (s: string) => {
    const updatedSkills = profile.skills.filter((sk) => sk !== s);
    persistProfile({ ...profile, skills: updatedSkills, updatedAt: new Date().toISOString() });
  };

  const copySummaryToClipboard = () => {
    const statusLabel =
      profile.stageStatus === 'servidor_art41'
        ? 'Servidor Público / Elegível ao Aproveitamento Servidor (Art. 41)'
        : profile.stageStatus === 'estagiando_nao_obrigatorio'
        ? 'Em Estágio Não Obrigatório'
        : profile.stageStatus === 'estagiando_obrigatorio'
        ? 'Em Estágio Obrigatório (300h)'
        : 'Disponível para Estágio em Gestão Pública';

    const summary = [
      `PERFIL DISCENTE — BACHARELADO EM GESTÃO PÚBLICA (FAFICH/UFMG)`,
      `Status: ${statusLabel} (${profile.weeklyHoursAvailable}h semanais)`,
      profile.interestAreas.length > 0 ? `Áreas de Atuação: ${profile.interestAreas.join(' • ')}` : '',
      profile.skills.length > 0 ? `Competências Técnicas: ${profile.skills.join(', ')}` : '',
      profile.interestedInEmpresaJunior ? `Interesse Ativo: Fundação da Empresa Júnior de Gestão Pública UFMG` : '',
      profile.lattesUrl ? `Lattes: ${profile.lattesUrl}` : '',
      profile.linkedinUrl ? `LinkedIn: ${profile.linkedinUrl}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      toast.success('Resumo profissional copiado para a área de transferência!');
    }
  };

  const filteredVacancies =
    sphereFilter === 'Todas'
      ? CURATED_VACANCIES
      : CURATED_VACANCIES.filter((v) => v.tag === sphereFilter);

  return (
    <div className="space-y-8 select-none text-foreground">
      {/* Tríade de Propostas da Chapa Semente para Carreira (Propostas 9, 11 e 12) */}
      <div className="p-5 sm:p-6 rounded-xl border-3 border-[#16181d] bg-white shadow-[6px_6px_0_0_#16181d] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-[#16181d] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-[#5B2A86] text-white font-mono text-xs font-bold uppercase border-2 border-[#16181d]">
                Carta-Programa Chapa Semente
              </span>
              <span className="font-mono text-xs font-bold text-secondary">
                Eixos 3 &amp; 4 • Inserção Profissional
              </span>
            </div>
            <h3 className="font-heading text-base sm:text-xl font-black uppercase text-foreground m-0">
              Compromissos de Carreira da Chapa Semente (Propostas 9, 11 e 12)
            </h3>
            <p className="font-sans text-xs text-muted-foreground mt-0.5 m-0">
              Conectamos o curso de Gestão Pública aos melhores órgãos públicos, OSCs e à criação da nossa Empresa Júnior.
            </p>
          </div>
          <a
            href={route('/chapa-semente')}
            className="min-h-[44px] px-4 py-2 rounded-xl border-3 border-[#16181d] bg-[#FF8811] hover:bg-[#e67600] text-[#16181d] font-heading text-xs font-black uppercase no-underline inline-flex items-center justify-center gap-1.5 shrink-0 shadow-[3px_3px_0_0_#16181d] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
          >
            <span>Ver Carta-Programa</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SEMENTE_CAREER_PROPOSALS.map((prop) => (
            <motion.div
              key={prop.num}
              whileHover={{ x: -2, y: -2 }}
              transition={tactileSpring}
              className="p-4 rounded-xl border-2 border-border/80 bg-[#f4f0ea] flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-md border-2 border-[#16181d] font-mono text-xs font-black uppercase shadow-xs ${prop.color}`}>
                    {prop.num}
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground uppercase">
                    {prop.badge}
                  </span>
                </div>
                <h4 className="font-heading text-sm font-black uppercase text-foreground m-0 leading-snug flex items-center gap-2">
                  <i className={`bi ${prop.icon} text-primary`} aria-hidden="true" />
                  <span>{prop.title}</span>
                </h4>
                <p className="font-sans text-xs text-foreground/85 leading-relaxed m-0">
                  {prop.desc}
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-muted-foreground pt-2 border-t-2 border-[#16181d]/15 block">
                {prop.eixo}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Card Interativo Proposta 11: Apoio à Fundação da Empresa Júnior de Gestão Pública */}
        <div className="p-4 rounded-xl border-2 border-[#134E4A]/40 bg-[#F0FDF4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs font-black uppercase text-[#134E4A] block">
              PROPOSTA 11 EM MOBILIZAÇÃO • EMPRESA JÚNIOR DE GESTÃO PÚBLICA UFMG
            </span>
            <h4 className="font-heading text-sm font-black uppercase text-foreground m-0">
              Quer participar da fundação ou diretoria da Empresa Júnior de Gestão Pública?
            </h4>
            <p className="font-sans text-xs text-foreground/80 m-0">
              Marque seu interesse no seu perfil do Banco de Talentos para integrar o Grupo de Trabalho de criação da EJ com apoio do CAGP.
            </p>
          </div>
          <motion.button
            whileHover={{ x: -2, y: -2 }}
            whileTap={{ x: 2, y: 2 }}
            transition={tactileSpring}
            type="button"
            onClick={toggleEmpresaJunior}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl border-3 border-[#16181d] font-heading text-xs font-black uppercase shrink-0 cursor-pointer flex items-center gap-2 shadow-[3px_3px_0_0_#16181d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              profile.interestedInEmpresaJunior
                ? 'bg-[#134E4A] text-white'
                : 'bg-white text-foreground hover:bg-muted'
            }`}
          >
            <i
              className={`bi ${
                profile.interestedInEmpresaJunior ? 'bi-check-circle-fill' : 'bi-rocket-takeoff'
              }`}
              aria-hidden="true"
            />
            <span>
              {profile.interestedInEmpresaJunior
                ? 'Inscrito no GT Empresa Júnior ✓'
                : 'Quero Apoiar a Empresa Júnior'}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mural de Oportunidades Oficiais Recomendadas (Proposta 9 & 12) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-2 m-0">
              <i className="bi bi-briefcase-fill text-primary" aria-hidden="true"></i>
              <span>Radar de Editais de Estágio, Órgãos Públicos &amp; OSCs (Propostas 9 e 12)</span>
            </h3>
            <p className="text-xs text-muted-foreground m-0 mt-0.5">
              Filtre por esfera de atuação governamental ou terceiro setor em Belo Horizonte e Minas Gerais:
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-mask-x">
            {['Todas', 'Estadual', 'Municipal', 'Controle', 'OSCs'].map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSphereFilter(sp)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-xl border-2 border-[#16181d] font-heading text-xs font-extrabold uppercase shrink-0 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 ${
                  sphereFilter === sp
                    ? 'bg-primary text-white shadow-[2px_2px_0_0_#16181d]'
                    : 'bg-white text-foreground hover:bg-muted'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredVacancies.map((v) => (
              <motion.div
                layout
                key={v.id}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ x: -2, y: -2 }}
                transition={tactileSpring}
                className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-[#f4f0ea] border-2 border-[#16181d] text-foreground">
                      {v.tag}
                    </span>
                    <span className="text-xs font-heading font-black uppercase px-2 py-0.5 rounded bg-[#134E4A] text-white border-2 border-[#16181d]">
                      {v.status}
                    </span>
                  </div>
                  <h4 className="font-heading font-black text-sm text-foreground leading-tight m-0">
                    {v.agency}
                  </h4>
                  <p className="text-xs font-medium text-foreground/80 mt-1 mb-0">
                    {v.role}
                  </p>
                  <div className="mt-3 p-2.5 rounded-lg bg-[#f4f0ea] border border-border/80 space-y-1 text-xs font-mono text-foreground tabular-nums">
                    <div className="flex items-center justify-between">
                      <span>Jornada:</span>
                      <strong>{v.hours}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bolsa:</span>
                      <strong>{v.allowance}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Requisito:</span>
                      <strong>{v.periodReq}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block font-mono text-xs font-bold text-primary uppercase">
                    ✦ {v.proposalLink}
                  </span>
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-primary text-white text-xs font-heading font-black uppercase rounded-xl border-3 border-[#16181d] shadow-[3px_3px_0_0_#16181d] hover:bg-primary/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer min-h-[44px] no-underline"
                  >
                    <span>Acessar Portal do Órgão</span>
                    <i className="bi bi-box-arrow-up-right text-xs" aria-hidden="true"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Painel do Discente: Formulário Interativo do Banco de Talentos + Card Colecionável */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-xl bg-white border-3 border-[#16181d] shadow-[6px_6px_0_0_#16181d] space-y-6">
          <div className="border-b-3 border-[#16181d] pb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-heading font-black text-foreground uppercase tracking-tight flex items-center gap-2 m-0">
                <i className="bi bi-person-vcard text-primary text-xl" aria-hidden="true"></i>
                <span>Cadastrar Currículo no Banco de Talentos GP (Cofre Local)</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 m-0">
                Monte seu perfil de competências em Gestão Pública para exportar junto ao Passaporte Estudantil.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[#f4f0ea] border-2 border-[#16181d] font-mono text-xs font-bold">
              100% Privado no Navegador
            </span>
          </div>

          {/* 1. Situação Atual */}
          <div className="space-y-2.5">
            <label className="text-xs font-heading font-black uppercase tracking-wider text-foreground block">
              1. Meu Momento Profissional Atual
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'buscando_estagio', label: 'Buscando Estágio', desc: '1º ao 10º período (Não Obrigatório ou 300h)' },
                { id: 'estagiando_nao_obrigatorio', label: 'Em Estágio Não Obrigatório', desc: 'Jornada até 30h semanais (Lei 11.788)' },
                { id: 'estagiando_obrigatorio', label: 'Em Estágio Obrigatório (300h)', desc: 'Matriculado em DCP 135 ou DCP 136' },
                { id: 'servidor_art41', label: 'Aproveitamento Servidor (Art. 41)', desc: 'Servidor público / OSC elegível à dispensa' },
              ].map((st) => {
                const isSelected = profile.stageStatus === st.id;
                return (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={st.id}
                    type="button"
                    onClick={() => handleStatusChange(st.id as any)}
                    className={`p-3.5 rounded-xl border-3 border-[#16181d] text-left transition-all min-h-[56px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                      isSelected
                        ? 'bg-primary text-white shadow-[3px_3px_0_0_#16181d]'
                        : 'bg-white hover:bg-muted text-foreground shadow-[2px_2px_0_0_#16181d]'
                    }`}
                  >
                    <div className="text-xs font-heading font-extrabold uppercase">{st.label}</div>
                    <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/90' : 'text-muted-foreground'}`}>
                      {st.desc}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 2. Disponibilidade de Carga Horária */}
          <div className="space-y-2.5">
            <label className="text-xs font-heading font-black uppercase tracking-wider text-foreground block">
              2. Disponibilidade Semanal para Estágio / Projetos
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[20, 25, 30].map((hrs) => {
                const active = profile.weeklyHoursAvailable === hrs;
                return (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => handleHoursChange(hrs)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl border-2 border-[#16181d] font-mono text-xs font-bold cursor-pointer transition-all tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                      active
                        ? 'bg-[#134E4A] text-white shadow-[3px_3px_0_0_#16181d]'
                        : 'bg-white text-foreground hover:bg-muted'
                    }`}
                  >
                    {hrs}h semanais
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Áreas de Interesse */}
          <div className="space-y-2.5">
            <label className="text-xs font-heading font-black uppercase tracking-wider text-foreground block">
              3. Áreas de Atuação de Maior Interesse (<span className="tabular-nums">{profile.interestAreas.length}</span> selecionadas)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AREAS.map((area) => {
                const active = profile.interestAreas.includes(area);
                return (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`p-3 rounded-xl border-2 border-[#16181d] text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                      active
                        ? 'bg-[#F0FDF4] text-[#134E4A] font-extrabold shadow-[3px_3px_0_0_#16181d]'
                        : 'bg-white hover:bg-muted text-foreground font-medium'
                    }`}
                  >
                    <span>{area}</span>
                    {active ? (
                      <i className="bi bi-check-circle-fill text-[#134E4A] text-sm shrink-0" aria-hidden="true"></i>
                    ) : (
                      <i className="bi bi-plus-circle text-muted-foreground text-sm shrink-0" aria-hidden="true"></i>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 4. Links Lattes, LinkedIn e Competências */}
          <form onSubmit={handleSaveUrls} className="space-y-4 pt-3 border-t-3 border-[#16181d]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="lattes-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  Link do Currículo Lattes (CNPq)
                </label>
                <input
                  id="lattes-input"
                  type="url"
                  value={profile.lattesUrl}
                  onChange={(e) => setProfile({ ...profile, lattesUrl: e.target.value })}
                  placeholder="http://lattes.cnpq.br/..."
                  className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-[#16181d] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono min-h-[44px]"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="linkedin-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  Perfil do LinkedIn
                </label>
                <input
                  id="linkedin-input"
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-[#16181d] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono min-h-[44px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="skill-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                4. Competências Técnicas &amp; Ferramentas Públicas (Toque nas sugestões ou digite)
              </label>

              {/* Chips Rápidos de Sugestão */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {SUGGESTED_SKILLS.map((sug) => {
                  const hasSkill = profile.skills.includes(sug);
                  return (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => (hasSkill ? removeSkill(sug) : addSkillString(sug))}
                      className={`min-h-[44px] px-3 py-1.5 rounded-lg border-2 border-[#16181d] font-mono text-xs font-bold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 ${
                        hasSkill
                          ? 'bg-[#134E4A] text-white'
                          : 'bg-[#f4f0ea] text-foreground hover:bg-muted'
                      }`}
                    >
                      {hasSkill ? `✓ ${sug}` : `+ ${sug}`}
                    </button>
                  );
                })}
              </div>

              <input
                id="skill-input"
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Digite outra competência e pressione Enter..."
                className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-[#16181d] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
              />

              {profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {profile.skills.map((sk) => (
                    <span
                      key={sk}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-[#16181d] rounded-lg text-xs font-mono font-bold text-foreground shadow-[2px_2px_0_0_#16181d]"
                    >
                      <span>{sk}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(sk)}
                        className="w-7 h-7 rounded bg-secondary hover:bg-secondary/90 text-white inline-flex items-center justify-center cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Remover ${sk}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 bg-primary text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d] hover:bg-primary/95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer"
              >
                Cadastrar Currículo no Cofre
              </button>
            </div>
          </form>
        </div>

        {/* Cartão Colecionável ao Vivo do Talento Discente GP */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={tactileSpring}
          className="lg:col-span-4 p-5 rounded-xl border-3 border-[#16181d] bg-[#f4f0ea] shadow-[6px_6px_0_0_#16181d] space-y-4 sticky top-24"
        >
          <div className="flex items-center justify-between border-b-3 border-[#16181d] pb-3">
            <div>
              <span className="font-mono text-xs font-black uppercase text-primary block">
                CARTÃO DE TALENTO DISCENTE GP
              </span>
              <h4 className="font-heading text-sm font-black uppercase text-foreground m-0">
                Resumo para Processos Seletivos
              </h4>
            </div>
            <span className="w-9 h-9 rounded-lg bg-primary text-white border-2 border-[#16181d] flex items-center justify-center shadow-[2px_2px_0_0_#16181d]">
              <i className="bi bi-stars" aria-hidden="true" />
            </span>
          </div>

          <div className="p-4 rounded-xl border-2 border-border/80 bg-white divide-y divide-border/60 text-xs">
            <div className="pb-2.5 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">Disponibilidade:</span>
              <span className="font-mono font-black text-[#134E4A] tabular-nums">{profile.weeklyHoursAvailable}h / semana</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">Áreas Foco:</span>
              <span className="font-mono font-black text-foreground tabular-nums">{profile.interestAreas.length} áreas</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">Competências:</span>
              <span className="font-mono font-black text-primary tabular-nums">{profile.skills.length} registradas</span>
            </div>
            {profile.interestedInEmpresaJunior && (
              <div className="pt-2.5">
                <div className="px-2.5 py-1.5 rounded-lg bg-[#134E4A] text-white font-mono text-xs font-bold uppercase text-center border border-[#16181d]">
                  ★ Membro Apoiador Empresa Júnior GP
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={copySummaryToClipboard}
            className="min-h-[44px] w-full px-4 py-2.5 rounded-xl border-3 border-[#16181d] bg-[#FF8811] hover:bg-[#e67600] text-[#16181d] font-heading text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_0_#16181d] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
          >
            <i className="bi bi-clipboard-check-fill" aria-hidden="true" />
            <span>Copiar Resumo para Currículo</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
