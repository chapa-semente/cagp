import { describe, it, expect, beforeEach } from 'vitest';
import { crc32, exportVaultBackup, importVaultBackup } from '../src/lib/storage/backupVault';
import {
  getVaultItem,
  setVaultItem,
  VaultDefaults,
  type StudentCert,
} from '../src/lib/storage/studentVault';

describe('Cofre Discente & Backup Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('valida o vetor canônico de teste CRC32 ("123456789" -> "cbf43926")', () => {
    expect(crc32('123456789')).toBe('cbf43926');
  });

  it('retorna os valores padrão para as chaves canônicas quando vazias', () => {
    expect(getVaultItem('cagp_calc_ext_aac_v1')).toEqual(VaultDefaults.cagp_calc_ext_aac_v1);
    expect(getVaultItem('cagp_aac_120d_certs_v1')).toEqual([]);
    expect(getVaultItem('cagp_notifications_prefs_v1').aac120d).toBe(true);
    expect(getVaultItem('cagp_student_profile_v1').name).toBe('Estudante de Gestão Pública');
    expect(getVaultItem('cagp_custom_curriculum_v1')).toEqual({ assignedCourses: [] });
    expect(getVaultItem('cagp_onboarding_completed_v1')).toBe(false);
  });

  it('salva e recupera itens com validação de tipo Zod', () => {
    const cert: StudentCert = {
      id: 'cert-1',
      title: 'Seminário de Gestão Pública',
      mod: 'Eventos',
      date: '2026-03-01',
      hours: 30,
    };
    setVaultItem('cagp_aac_120d_certs_v1', [cert]);
    const stored = getVaultItem('cagp_aac_120d_certs_v1');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Seminário de Gestão Pública');
    expect(stored[0].hours).toBe(30);
  });

  it('isola chaves corrompidas e usa fallback defensivo', () => {
    localStorage.setItem('cagp_notifications_prefs_v1', '{"ru1815": "STRING_INVALIDA"}');
    const safeVal = getVaultItem('cagp_notifications_prefs_v1');
    expect(safeVal).toEqual(VaultDefaults.cagp_notifications_prefs_v1);
  });

  it('exporta backup no formato canônico CAGP1:<base64>.<crc32>', () => {
    const token = exportVaultBackup();
    expect(token.startsWith('CAGP1:')).toBe(true);
    expect(token).toContain('.');
    const parts = token.slice(6).split('.');
    expect(parts).toHaveLength(2);
    expect(parts[1]).toHaveLength(8);
  });

  it('restaura backup válido com sucesso', () => {
    setVaultItem('cagp_calc_ext_aac_v1', { ext_lab_a: 90 });
    const backup = exportVaultBackup();
    localStorage.clear();

    const result = importVaultBackup(backup);
    expect(result.success).toBe(true);
    expect(result.restoredKeys).toBeGreaterThanOrEqual(1);

    const restoredCalc = getVaultItem('cagp_calc_ext_aac_v1');
    expect(restoredCalc).toEqual({ ext_lab_a: 90 });
  });

  it('rejeita backups adulterados por falha de CRC32', () => {
    const backup = exportVaultBackup();
    const lastChar = backup.slice(-1);
    const tampered = backup.slice(0, -1) + (lastChar === '0' ? '1' : '0');
    const result = importVaultBackup(tampered);
    expect(result.success).toBe(false);
    expect(result.error).toContain('CRC32 mismatch');
  });

  it('salva e sincroniza perfil discente e grade curricular com validação Zod', () => {
    setVaultItem('cagp_student_profile_v1', {
      name: 'Gabriela Sathler',
      period: '5º Período',
      pronouns: 'ela/dela',
      semester: '2024/1',
      pathway: '01-01',
      avatarPreset: 'candangos',
      prideChoice: 'lgbt',
      interests: ['pol_pub', 'orcamento'],
    });

    const storedProfile = getVaultItem('cagp_student_profile_v1');
    expect(storedProfile.name).toBe('Gabriela Sathler');
    expect(storedProfile.period).toBe('5º Período');
    expect(storedProfile.pronouns).toBe('ela/dela');
    expect(storedProfile.prideChoice).toBe('lgbt');
    expect(storedProfile.interests).toEqual(['pol_pub', 'orcamento']);

    setVaultItem('cagp_minha_grade_v1', {
      savedCourses: ['DCP 124', 'DCP 032', 'SOA 048', 'ECN 140'],
    });

    const storedGrade = getVaultItem('cagp_minha_grade_v1');
    expect(storedGrade.savedCourses).toHaveLength(4);
    expect(storedGrade.savedCourses).toContain('ECN 140');
  });

  it('salva e valida atalhos customizados discentes no cofre com limites', () => {
    // Padrão
    expect(getVaultItem('cagp_discente_shortcuts_v1')).toEqual([
      'hoje',
      'curso',
      'percurso',
      'documentos',
      'sobre',
    ]);

    // Customizado válido
    setVaultItem('cagp_discente_shortcuts_v1', ['calouros', 'acg', 'estagio', 'campus']);
    expect(getVaultItem('cagp_discente_shortcuts_v1')).toEqual([
      'calouros',
      'acg',
      'estagio',
      'campus',
    ]);
  });
});
