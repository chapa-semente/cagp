import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { PassportCard } from '@/components/features/passport/PassportCard';
import { TalentBankEditor } from '@/components/features/passport/TalentBankEditor';
import {
  getVaultItem,
  setVaultItem,
  USER_ROLE_META,
  type UserRole,
  type VaultData,
} from '@/lib/storage/studentVault';
import { exportVaultBackup, importVaultBackup } from '@/lib/storage/backupVault';

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
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const p = getVaultItem('cagp_student_profile_v1');
      setProfile(p);
      setUserRole(getVaultItem('cagp_user_role_v1'));
      const calcData = getVaultItem('cagp_calc_ext_aac_v1');
      const sum = Object.values(calcData).reduce((a, b) => a + (Number(b) || 0), 0);
      setExtHours(Math.min(600, sum));
      const grade = getVaultItem('cagp_minha_grade_v1');
      setObrigCount(grade.savedCourses ? grade.savedCourses.length : 0);
      setToastMsg(null);
      setBackupInput('');
    }
  }, [isOpen]);

  const handleSaveProfile = () => {
    setVaultItem('cagp_student_profile_v1', profile);
    setToastMsg({ text: 'Perfil discente salvo com sucesso no cofre local!', type: 'success' });
    setActiveTab('passport');
  };

  const handleExport = () => {
    const token = exportVaultBackup();
    navigator.clipboard.writeText(token);
    setToastMsg({ text: 'Token de backup CAGP1 copiado com sucesso!', type: 'success' });
  };

  const handleImport = () => {
    if (!backupInput.trim()) {
      setToastMsg({ text: 'Cole um token válido iniciado por CAGP1:', type: 'error' });
      return;
    }
    const res = importVaultBackup(backupInput.trim());
    if (res.success) {
      setToastMsg({ text: `Backup restaurado! (${res.restoredKeys} chaves sincronizadas)`, type: 'success' });
      setProfile(getVaultItem('cagp_student_profile_v1'));
      setBackupInput('');
    } else {
      setToastMsg({ text: res.error || 'Erro ao restaurar backup.', type: 'error' });
    }
  };

  return (
    <BottomSheet
      id="cagp-passport-sheet"
      isOpen={isOpen}
      onClose={onClose}
      title="Passaporte & Perfil Discente"
      initialDetent="large"
    >
      <div className="space-y-4 text-foreground">
        {/* Controle Segmentado Interno: [Passaporte] [Banco de Talentos] */}
        <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-xl border-3 border-border shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-heading uppercase font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              activeTab === 'passport'
                ? 'bg-primary text-primary-foreground border-3 border-border shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <i className="bi bi-person-vcard text-sm" aria-hidden="true" />
            <span>Passaporte & Carteira</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('talent')}
            className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-heading uppercase font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
              activeTab === 'talent'
                ? 'bg-primary text-primary-foreground border-3 border-border shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <i className="bi bi-briefcase text-sm" aria-hidden="true" />
            <span>Perfil & Talentos</span>
          </button>
        </div>

        {/* Toast Notificação */}
        {toastMsg && (
          <div
            className={`p-2.5 rounded text-xs font-semibold border flex items-center gap-2 ${
              toastMsg.type === 'success'
                ? 'bg-success/10 text-success border-success'
                : 'bg-destructive/10 text-destructive border-destructive'
            }`}
          >
            <i className={`bi ${toastMsg.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`} />
            <span>{toastMsg.text}</span>
          </div>
        )}

        {/* Aba 1: Passaporte & Carteira */}
        {activeTab === 'passport' && (
          <div>
            {/* Seletor de Perfil / Momento no Curso */}
            <div className="p-3.5 bg-white border-3 border-border rounded-xl mb-3 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <strong className="font-heading font-black text-xs uppercase text-foreground">
                  Momento no Curso (Perfil da Home)
                </strong>
                <span className="text-[10px] font-mono text-secondary font-bold">
                  {USER_ROLE_META[userRole].badge}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['calouro', 'veterano', 'formando', 'ingressar'] as UserRole[]).map((r) => {
                  const active = userRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setUserRole(r);
                        setVaultItem('cagp_user_role_v1', r);
                        setToastMsg({
                          text: `Perfil alterado para: ${USER_ROLE_META[r].label}`,
                          type: 'success',
                        });
                      }}
                      className={`min-h-[40px] py-2 px-2 rounded-lg text-xs font-heading font-black uppercase transition-all cursor-pointer border-2 border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                        active
                          ? 'bg-secondary text-white shadow-sm'
                          : 'bg-white text-foreground hover:bg-muted'
                      }`}
                    >
                      {USER_ROLE_META[r].shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            <PassportCard
              profile={profile}
              obrigCount={obrigCount}
              extHours={extHours}
              onEditPhoto={() => setActiveTab('talent')}
              onOpenCampus={() => {
                onClose();
                window.dispatchEvent(new CustomEvent('cagp:open-campus'));
              }}
            />

            {/* Atalho para Configurações do Super App (BUG-12 in-place fix) */}
            <div className="p-3.5 bg-white border-3 border-border shadow-md rounded-xl flex items-center justify-between gap-2 mb-3">
              <div>
                <strong className="block font-heading font-black text-xs uppercase text-foreground">
                  <i className="bi bi-gear-fill text-secondary mr-1" aria-hidden="true" />
                  Configurações do Super App
                </strong>
                <span className="text-[11px] text-gray-600 font-medium">
                  Acessibilidade, alarmes do RU/Circular e portabilidade.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('cagp:open-settings'));
                }}
                className="cagp-btn-secondary text-xs py-1.5 px-3 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              >
                Abrir &rarr;
              </button>
            </div>

            {/* Backup & Restauração Rápida */}
            <div className="bg-muted p-3.5 rounded-xl border-3 border-border shadow-md space-y-2">
              <span className="font-heading font-black text-xs uppercase text-foreground block">
                Cofre Discente Offline (Meu CAGP Sync)
              </span>
              <p className="text-[11px] text-gray-700 font-medium">
                Seus dados acadêmicos ficam protegidos localmente. Exporte seu token Base64 seguro para trocar de aparelho:
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="min-h-[44px] cagp-btn-secondary text-xs py-1.5 px-3 flex-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                >
                  <i className="bi bi-clipboard-check" aria-hidden="true" />
                  <span>Copiar Token CAGP1</span>
                </button>
              </div>
              <div className="pt-1">
                <input
                  type="text"
                  id="cagp-passport-backup-input"
                  name="passportBackupToken"
                  placeholder="Cole o token CAGP1:... para restaurar"
                  value={backupInput}
                  onChange={(e) => setBackupInput(e.target.value)}
                  className="w-full bg-white border-2 border-border p-2.5 text-xs font-mono rounded-lg focus:border-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  className="min-h-[44px] cagp-btn-primary w-full mt-2 text-xs py-2 justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
                >
                  Restaurar do Token
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Aba 2: Perfil & Banco de Talentos */}
        {activeTab === 'talent' && (
          <TalentBankEditor
            profile={profile}
            onChange={(updated) => setProfile(updated)}
            onSave={handleSaveProfile}
          />
        )}
      </div>
    </BottomSheet>
  );
};
