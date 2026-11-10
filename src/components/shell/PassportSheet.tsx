import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { PassportCard } from '@/components/features/passport/PassportCard';
import { TalentBankEditor } from '@/components/features/passport/TalentBankEditor';
import {
  getVaultItem,
  setVaultItem,
  USER_ROLE_META,
  suggestRoleFromPeriod,
  type UserRole,
  type VaultData,
} from '@/lib/storage/studentVault';
import { exportVaultBackup, importVaultBackup } from '@/lib/storage/backupVault';
import { toast } from '@/lib/toast';

interface PassportSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassportSheet: React.FC<PassportSheetProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'talent'>('passport');
  const [userRole, setUserRole] = useState<UserRole>('calouro');
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
  const [backupInput, setBackupInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProfile(getVaultItem('cagp_student_profile_v1'));
      setUserRole(getVaultItem('cagp_user_role_v1'));
      const calcData = getVaultItem('cagp_calc_ext_aac_v1');
      const sum = Object.values(calcData).reduce((a, b) => a + (Number(b) || 0), 0);
      setExtHours(Math.min(600, sum));
      const grade = getVaultItem('cagp_minha_grade_v1');
      setObrigCount(grade.savedCourses ? grade.savedCourses.length : 0);
      setBackupInput('');
    }
  }, [isOpen]);

  // Um modelo só: "momento no curso" (cagp_user_role_v1). Mudar o período no formulário reposiciona o momento.
  const chooseRole = (r: UserRole, silent = false) => {
    setUserRole(r);
    setVaultItem('cagp_user_role_v1', r);
    if (!silent) toast.success(`Pronto: o site agora fala com quem é ${USER_ROLE_META[r].shortLabel.toLowerCase()}.`);
  };

  const handleProfileChange = (updated: VaultData<'cagp_student_profile_v1'>) => {
    if (updated.period !== profile.period) chooseRole(suggestRoleFromPeriod(updated.period), true);
    setProfile(updated);
  };

  const handleSaveProfile = () => {
    setVaultItem('cagp_student_profile_v1', profile);
    toast.success('Perfil salvo neste celular.');
    setActiveTab('passport');
  };

  const handleExport = async () => {
    const token = exportVaultBackup();
    try {
      await navigator.clipboard.writeText(token);
      toast.success('Código copiado. Cole no outro celular, aqui mesmo em Seu perfil.');
    } catch {
      toast.error('O navegador bloqueou a cópia. Abra o site direto no navegador do celular e tente de novo.');
    }
  };

  const handleImport = () => {
    if (!backupInput.trim()) {
      toast.error('Cole o código que começa com CAGP1: e toque em Trazer.');
      return;
    }
    const res = importVaultBackup(backupInput.trim());
    if (res.success) {
      toast.success(`Tudo de volta: ${res.restoredKeys} itens restaurados.`);
      setProfile(getVaultItem('cagp_student_profile_v1'));
      setUserRole(getVaultItem('cagp_user_role_v1'));
      setBackupInput('');
    } else {
      toast.error(res.error || 'Esse código não funcionou. Confira se copiou ele inteiro.');
    }
  };

  const tabClass = (on: boolean) =>
    `relative min-h-[44px] py-2 px-3 rounded-lg text-xs font-heading uppercase font-bold tracking-[0.03em] cursor-pointer flex items-center justify-center gap-1.5 border-2 transition-[background-color,color,box-shadow,transform] duration-(--duration-press) ease-(--ease-spring-snappy) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:translate-x-px active:translate-y-px ${
      on ? 'bg-active text-active-foreground border-border shadow-xs' : 'border-transparent text-foreground hover:bg-white'
    }`;

  return (
    <BottomSheet
      id="cagp-passport-sheet"
      isOpen={isOpen}
      onClose={onClose}
      title="Seu perfil"
      initialDetent="large"
    >
      <div className="space-y-4 text-foreground">
        <div role="tablist" aria-label="Seu perfil" className="grid grid-cols-2 gap-1.5 bg-muted p-1.5 rounded-xl border-2 border-border">
          <button type="button" role="tab" aria-selected={activeTab === 'passport'} onClick={() => setActiveTab('passport')} className={tabClass(activeTab === 'passport')}>
            <i className="bi bi-person-vcard text-sm" aria-hidden="true" />
            <span>Carteirinha</span>
          </button>
          <button type="button" role="tab" aria-selected={activeTab === 'talent'} onClick={() => setActiveTab('talent')} className={tabClass(activeTab === 'talent')}>
            <i className="bi bi-pencil-square text-sm" aria-hidden="true" />
            <span>Sobre você</span>
          </button>
        </div>

        {activeTab === 'passport' && (
          <div className="space-y-4 cagp-animate-ws-enter">
            {/* Momento no curso: único lugar do site onde se escolhe. O tour pergunta uma vez e grava aqui. */}
            <section aria-labelledby="perfil-momento" className="p-4 bg-white border-2 border-border rounded-xl shadow-md">
              <h3 id="perfil-momento" className="font-heading font-bold text-base text-foreground m-0">
                Em que momento do curso você está?
              </h3>
              <p className="text-sm text-content-secondary m-0 mt-1">
                O site reorganiza atalhos e guias para essa fase.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3" role="radiogroup" aria-labelledby="perfil-momento">
                {(['calouro', 'veterano', 'formando', 'ingressar'] as UserRole[]).map((r) => {
                  const active = userRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => chooseRole(r)}
                      className={`min-h-[52px] py-2 px-3 rounded-lg text-left cursor-pointer border-2 border-border transition-[background-color,color,box-shadow,transform] duration-(--duration-press) ease-(--ease-spring-snappy) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                        active ? 'bg-active text-active-foreground shadow-sm' : 'bg-white text-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="block font-heading font-bold text-xs uppercase tracking-[0.03em]">{USER_ROLE_META[r].shortLabel}</span>
                      <span className={`block text-xs tabular-nums ${active ? 'text-white' : 'text-muted-foreground'}`}>{USER_ROLE_META[r].badge}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <PassportCard
              profile={profile}
              role={userRole}
              obrigCount={obrigCount}
              extHours={extHours}
              onEditPhoto={() => setActiveTab('talent')}
            />

            {/* Backup: dono único. Ajustes só aponta para cá. */}
            <section id="levar-pro-outro-celular" aria-labelledby="perfil-backup" className="bg-muted p-4 rounded-xl border-2 border-border space-y-3">
              <div>
                <h3 id="perfil-backup" className="font-heading font-bold text-base text-foreground m-0">
                  Levar pro outro celular
                </h3>
                <p className="text-sm text-content-secondary m-0 mt-1">
                  Suas horas, grade e perfil ficam só neste aparelho. Copie o código aqui e cole no outro celular, neste mesmo lugar.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExport}
                className="min-h-[44px] cagp-btn-secondary text-xs py-1.5 px-3 w-full justify-center cursor-pointer"
              >
                <i className="bi bi-clipboard-check" aria-hidden="true" />
                <span>Copiar meu código</span>
              </button>
              <label htmlFor="cagp-passport-backup-input" className="block text-sm font-bold text-foreground pt-1">
                Chegou de outro celular? Cole o código:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="cagp-passport-backup-input"
                  name="passportBackupToken"
                  placeholder="CAGP1:…"
                  autoComplete="off"
                  value={backupInput}
                  onChange={(e) => setBackupInput(e.target.value)}
                  className="min-w-0 flex-1 bg-white border-2 border-border px-3 min-h-[44px] text-base rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  className="min-h-[44px] cagp-btn-primary text-xs py-2 px-4 justify-center cursor-pointer shrink-0"
                >
                  Trazer
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'talent' && (
          <div className="cagp-animate-ws-enter">
            <TalentBankEditor profile={profile} onChange={handleProfileChange} onSave={handleSaveProfile} />
          </div>
        )}
      </div>
    </BottomSheet>
  );
};
