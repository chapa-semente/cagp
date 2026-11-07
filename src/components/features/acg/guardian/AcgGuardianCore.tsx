import React, { useState, useEffect } from 'react';
import {
  getVaultItem,
  setVaultItem,
  type StudentCert,
} from '../../../../lib/storage/studentVault';
import { downloadAac120dIcs } from '../../../../lib/ics';
import { CagpIcon } from '../../../ui/CagpIcon';

export const AcgGuardianCore: React.FC = () => {
  const [certs, setCerts] = useState<StudentCert[]>([]);
  const [title, setTitle] = useState('');
  const [mod, setMod] = useState('Eventos & Congressos');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState(15);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setCerts(getVaultItem('cagp_aac_120d_certs_v1') || []);

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.key === 'cagp_aac_120d_certs_v1') {
        setCerts(custom.detail.value || []);
      }
    };

    window.addEventListener('cagp:vault-updated', handleUpdate);
    return () => window.removeEventListener('cagp:vault-updated', handleUpdate);
  }, []);

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCert: StudentCert = {
      id: `cert-${Date.now()}`,
      title: title.trim(),
      mod,
      date,
      hours: Number(hours) || 0,
    };

    const nextList = [newCert, ...certs];
    setCerts(nextList);
    setVaultItem('cagp_aac_120d_certs_v1', nextList);

    setTitle('');
    setStatusMessage(`Certificado "${newCert.title}" cadastrado com sucesso!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleDeleteCert = (id: string) => {
    const nextList = certs.filter((c) => c.id !== id);
    setCerts(nextList);
    setVaultItem('cagp_aac_120d_certs_v1', nextList);
  };

  const getDaysLeft = (emissionDateStr: string): number => {
    const emission = new Date(emissionDateStr);
    const deadline = new Date(emission.getTime() + 120 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="cagp-guardian-core select-none space-y-6">
      {/* Alerta Normativo do Art. 15, § 4º */}
      <div className="p-5 bg-[#FFFBEB] border-[3px] border-[#FF8811] rounded-xl shadow-[4px_4px_0_0_#FF8811]">
        <div className="flex items-start gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-[#FF8811] text-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5 border-2 border-[#0A0A0A] shadow-[1.5px_1.5px_0_0_#0A0A0A]">
            <CagpIcon name="shield" className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-head text-base uppercase font-black text-[#0A0A0A] leading-tight m-0">
              Guardião do Prazo Fatal de 120 Dias Corridos
            </h3>
            <p className="font-body text-xs text-[#57534E] mt-1 leading-relaxed m-0">
              <strong>Art. 15, § 4º do Regulamento do Curso (Versão N-20229):</strong> Certificados de atividades complementares (AAC) devem ser obrigatoriamente protocolados perante o Colegiado de Gestão Pública em até <strong>120 dias corridos</strong> após a emissão do documento. Após esse prazo, o aproveitamento prescreve e é indeferido pela Coordenação.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Cadastro de Certificado */}
        <div className="lg:col-span-1 cagp-card p-5 bg-white border-2 border-[#0A0A0A] rounded-xl h-fit shadow-[3px_3px_0_0_#0A0A0A]">
          <h4 className="font-head text-sm uppercase font-bold text-[#0A0A0A] mb-3 pb-2 border-b-2 border-[#0A0A0A]/20 flex items-center gap-2">
            <i className="bi bi-plus-circle text-[#9E2424]" aria-hidden="true" />
            <span>Cadastrar Novo Certificado</span>
          </h4>

          {statusMessage && (
            <div className="p-3 mb-3 bg-[#DCFCE7] border-2 border-[#266264] rounded-xl text-xs text-[#266264] font-bold shadow-[2px_2px_0_0_#0A0A0A]">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleAddCert} className="space-y-3.5 font-body">
            <div>
              <label htmlFor="cert-title" className="block text-xs font-head font-bold text-[#0A0A0A] mb-1">
                Título do Evento ou Curso:
              </label>
              <input
                id="cert-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: I Seminário de Políticas Públicas UFMG"
                className="w-full bg-white border-2 border-[#0A0A0A] px-3.5 py-2.5 rounded-xl text-sm text-[#0A0A0A] placeholder-[#57534E] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#9E2424] transition-all"
              />
            </div>

            <div>
              <label htmlFor="cert-mod" className="block text-xs font-head font-bold text-[#0A0A0A] mb-1">
                Modalidade de AAC:
              </label>
              <select
                id="cert-mod"
                value={mod}
                onChange={(e) => setMod(e.target.value)}
                className="w-full bg-white border-2 border-[#0A0A0A] px-3.5 py-2.5 rounded-xl text-sm text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#9E2424] transition-all cursor-pointer font-medium"
              >
                <option value="Eventos & Congressos">Eventos & Congressos (Teto 60h)</option>
                <option value="Cursos Livres">Cursos Livres de Extensão (Teto 60h)</option>
                <option value="Iniciação Científica">Iniciação Científica / PIBIC (Teto 90h)</option>
                <option value="Monitoria de Graduação">Monitoria de Graduação (Teto 90h)</option>
                <option value="Representação Estudantil">Representação no Colegiado/CAGP (Teto 60h)</option>
                <option value="Outras Atividades">Outras Atividades Aprovadas (Teto 30h)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="cert-date" className="block text-xs font-head font-bold text-[#0A0A0A] mb-1">
                  Data de Emissão:
                </label>
                <input
                  id="cert-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2.5 rounded-xl text-sm text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#9E2424] transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="cert-hours" className="block text-xs font-head font-bold text-[#0A0A0A] mb-1">
                  Carga Horária:
                </label>
                <input
                  id="cert-hours"
                  type="number"
                  min="1"
                  max="180"
                  required
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2.5 rounded-xl text-sm text-[#0A0A0A] shadow-[2px_2px_0_0_#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#9E2424] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] px-4 py-2.5 bg-[#9E2424] text-white hover:bg-[#851E1E] rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 border-2 border-[#0A0A0A] shadow-[2.5px_2.5px_0_0_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all mt-4 cursor-pointer"
            >
              <CagpIcon name="shield" className="w-4 h-4 text-white" />
              <span>Adicionar ao Guardião</span>
            </button>
          </form>
        </div>

        {/* Listagem de Certificados Monitorados */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#0A0A0A] flex-wrap gap-2">
            <h4 className="font-head text-base uppercase font-bold text-[#0A0A0A] m-0 flex items-center gap-2">
              <CagpIcon name="clock" className="w-4 h-4 text-[#FF8811]" />
              <span>Certificados Monitorados ({certs.length})</span>
            </h4>
            <span className="text-xs text-[#0A0A0A] font-mono font-bold px-2.5 py-1 bg-white border border-[#0A0A0A] rounded-md shadow-[1px_1px_0_0_#0A0A0A] tabular-nums">
              Total: {certs.reduce((acc, c) => acc + c.hours, 0)} horas
            </span>
          </div>

          {certs.length === 0 ? (
            <div className="p-8 text-center bg-white border-2 border-[#0A0A0A] rounded-xl text-[#57534E] shadow-[3px_3px_0_0_#0A0A0A]">
              <i className="bi bi-folder2-open text-4xl text-[#57534E] block mb-2" aria-hidden="true" />
              <p className="text-sm font-head font-bold uppercase text-[#0A0A0A] m-0">Nenhum certificado cadastrado.</p>
              <p className="font-body text-xs text-[#57534E] mt-1 max-w-sm mx-auto">
                Cadastre seus certificados assim que forem emitidos para receber alertas e nunca perder os 120 dias regimentais.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {certs.map((c) => {
                const daysLeft = getDaysLeft(c.date);
                const isExpired = daysLeft <= 0;
                const isUrgent = daysLeft > 0 && daysLeft <= 20;

                return (
                  <div
                    key={c.id}
                    className="p-4 bg-white border-2 border-[#0A0A0A] rounded-xl shadow-[3px_3px_0_0_#0A0A0A] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#0A0A0A] text-white font-mono text-[10px] font-bold border border-[#0A0A0A]">{c.mod}</span>
                        <span className="font-mono text-xs font-bold text-[#9E2424]">{c.hours} horas</span>
                      </div>
                      <h5 className="font-head text-sm font-bold text-[#0A0A0A] truncate m-0">
                        {c.title}
                      </h5>
                      <span className="text-[11px] text-[#57534E] font-mono">
                        Emitido em: {new Date(c.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        {isExpired ? (
                          <span className="cagp-stamp-badge text-[10px] font-mono font-bold tracking-wider text-white border border-[#0A0A0A] bg-[#9E2424] rounded-md block py-1 px-2.5 shadow-[1px_1px_0_0_#0A0A0A]">
                            EXPIRADO (0D)
                          </span>
                        ) : isUrgent ? (
                          <span className="cagp-stamp-badge text-[10px] font-mono font-bold tracking-wider text-[#0A0A0A] border border-[#0A0A0A] bg-[#FF8811] rounded-md block py-1 px-2.5 shadow-[1px_1px_0_0_#0A0A0A] animate-pulse">
                            URGENTE ({daysLeft}D)
                          </span>
                        ) : (
                          <span className="cagp-stamp-badge is-feito text-[10px] font-mono font-bold tracking-wider text-white border border-[#0A0A0A] bg-[#266264] rounded-md block py-1 px-2.5 shadow-[1px_1px_0_0_#0A0A0A]">
                            NO PRAZO ({daysLeft}D)
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => downloadAac120dIcs(c.title, new Date(c.date))}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-[#F3ECE0] border-2 border-[#0A0A0A] text-[#0A0A0A] flex items-center justify-center text-sm shadow-[1.5px_1.5px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                        title="Baixar lembrete de calendário (.ics)"
                        aria-label="Baixar lembrete de calendário (.ics)"
                      >
                        <CagpIcon name="calendar" className="w-4 h-4 text-[#9E2424]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCert(c.id)}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-red-50 text-[#9E2424] border-2 border-[#0A0A0A] flex items-center justify-center text-sm shadow-[1.5px_1.5px_0_0_#0A0A0A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                        title="Excluir certificado"
                        aria-label="Excluir certificado"
                      >
                        <CagpIcon name="close" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
