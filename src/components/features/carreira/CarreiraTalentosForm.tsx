// src/components/features/carreira/CarreiraTalentosForm.tsx — Formulário Completo do Banco de Talentos Discente
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import {
  AREAS,
  SUGGESTED_SKILLS,
  STATUS_LABELS,
  generateTalentosSummary,
  type TalentosProfile,
} from '@/lib/carreiraData';
import { tactileSpring } from '@/lib/motion';
import { toast } from 'sonner';

export const CarreiraTalentosForm: React.FC = () => {
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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = getVaultItem('cagp_carreira_talentos_v1');
    setProfile(saved);
  }, []);

  const saveProfile = (updated: TalentosProfile) => {
    setProfile(updated);
    setVaultItem('cagp_carreira_talentos_v1', {
      ...updated,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleStatusChange = (status: TalentosProfile['stageStatus']) => {
    saveProfile({ ...profile, stageStatus: status });
    toast.success(`Situação atualizada: ${STATUS_LABELS[status]}`);
  };

  const handleHoursChange = (hours: number) => {
    saveProfile({ ...profile, weeklyHoursAvailable: hours });
    toast.success(`Disponibilidade alterada para ${hours}h semanais`);
  };

  const toggleArea = (area: string) => {
    const exists = profile.interestAreas.includes(area);
    const updatedAreas = exists
      ? profile.interestAreas.filter((a) => a !== area)
      : [...profile.interestAreas, area];
    saveProfile({ ...profile, interestAreas: updatedAreas });
  };

  const addSkillString = (skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed || profile.skills.includes(trimmed)) return;
    saveProfile({ ...profile, skills: [...profile.skills, trimmed] });
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkillString(newSkill);
      setNewSkill('');
    }
  };

  const removeSkill = (skillName: string) => {
    saveProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillName),
    });
  };

  const handleSaveUrls = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);
    toast.success('Currículo e competências gravados com sucesso no cofre local!');
  };

  const copySummaryToClipboard = () => {
    const summary = generateTalentosSummary(profile);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      toast.success('Resumo profissional copiado para a área de transferência!');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans select-none text-foreground">
      {/* Formulário Principal */}
      <div className="lg:col-span-8 p-5 sm:p-6 rounded-xl bg-white border-3 border-border shadow-md space-y-6">
        <div className="border-b-2 border-border/80 pb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-heading font-black text-foreground uppercase tracking-tight flex items-center gap-2 m-0">
              <i className="bi bi-person-vcard text-primary text-xl" aria-hidden="true" />
              <span>Cadastrar Currículo no Banco de Talentos GP (Cofre Local)</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 m-0 font-medium">
              Monte seu perfil de competências em Gestão Pública para exportar junto ao Passaporte Estudantil.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-[#f4f0ea] border-2 border-border font-mono text-xs font-bold">
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
                  className={`p-3.5 rounded-xl border-2 border-border text-left transition-all min-h-[56px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white hover:bg-muted text-foreground shadow-xs'
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
                  className={`min-h-[44px] px-3 py-2 rounded-xl border-2 border-border font-mono text-xs font-bold cursor-pointer transition-all tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                    active
                      ? 'bg-[#134E4A] text-white shadow-xs'
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
                  className={`p-3 rounded-xl border-2 border-border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 ${
                    active
                      ? 'bg-[#F0FDF4] text-[#134E4A] font-extrabold shadow-xs'
                      : 'bg-white hover:bg-muted text-foreground font-medium'
                  }`}
                >
                  <span>{area}</span>
                  {active ? (
                    <i className="bi bi-check-circle-fill text-[#134E4A] text-sm shrink-0" aria-hidden="true" />
                  ) : (
                    <i className="bi bi-plus-circle text-muted-foreground text-sm shrink-0" aria-hidden="true" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 4. Links Lattes, LinkedIn e Competências */}
        <form onSubmit={handleSaveUrls} className="space-y-4 pt-4 border-t-2 border-border/80">
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
                className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono min-h-[44px]"
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
                className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-mono min-h-[44px]"
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
                    className={`min-h-[44px] px-3 py-1.5 rounded-lg border-2 border-border font-mono text-xs font-bold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 ${
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
              className="w-full px-3 py-2 text-base sm:text-xs bg-white border-3 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
            />

            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {profile.skills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-border rounded-lg text-xs font-mono font-bold text-foreground shadow-xs"
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
              className="min-h-[44px] px-5 py-2.5 bg-primary text-white font-heading font-black text-xs uppercase tracking-wider rounded-xl border-3 border-border shadow-xs hover:bg-primary/95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer"
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
        className="lg:col-span-4 p-5 rounded-xl border-3 border-border bg-[#f4f0ea] shadow-md space-y-4 sticky top-24"
      >
        <div className="flex items-center justify-between border-b-2 border-border/80 pb-3">
          <div>
            <span className="font-mono text-xs font-black uppercase text-primary block">
              CARTÃO DE TALENTO DISCENTE GP
            </span>
            <h3 className="font-heading text-sm font-black uppercase text-foreground m-0">
              Resumo para Processos Seletivos
            </h3>
          </div>
          <span className="w-9 h-9 rounded-lg bg-primary text-white border-2 border-border flex items-center justify-center shadow-xs">
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
              <div className="px-2.5 py-1.5 rounded-lg bg-[#134E4A] text-white font-mono text-xs font-bold uppercase text-center border border-border">
                ★ Membro Apoiador Empresa Júnior GP
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={copySummaryToClipboard}
          className="min-h-[44px] w-full px-4 py-2.5 rounded-xl border-3 border-border bg-[#FE8812] hover:bg-[#e67600] text-foreground font-heading text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xs active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
        >
          <i className="bi bi-clipboard-check-fill" aria-hidden="true" />
          <span>Copiar Resumo para Currículo</span>
        </button>
      </motion.div>
    </div>
  );
};
