import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { bounceSpring, tactileSpring } from '@/lib/motion';
import {
  getVaultItem,
  setVaultItem,
  type StudentCert,
} from '../../../../lib/storage/studentVault';
import { downloadAac120dIcs } from '../../../../lib/ics';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { Dropzone } from '@/components/ui/dropzone';
import { FormItem, FormLabel, FormControl } from '@/components/ui/form';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from '@/components/ui/number-field';

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
    setStatusMessage(`Certificado "${newCert.title}" cadastrado no Alerta 120 Dias!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSimulateUrgentCert = () => {
    const now = new Date();
    const urgentDate = new Date(now.getTime() - 112 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const expiredDate = new Date(now.getTime() - 128 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const sampleCerts: StudentCert[] = [
      {
        id: `cert-urg-${Date.now()}`,
        title: 'Seminário Nacional de Orçamento e Políticas Públicas (FAFICH)',
        mod: 'Eventos & Congressos',
        date: urgentDate,
        hours: 30,
      },
      {
        id: `cert-exp-${Date.now() + 1}`,
        title: 'Congresso Mineiro de Administração Pública (Fora do Prazo)',
        mod: 'Eventos & Congressos',
        date: expiredDate,
        hours: 15,
      },
    ];

    const nextList = [...sampleCerts, ...certs];
    setCerts(nextList);
    setVaultItem('cagp_aac_120d_certs_v1', nextList);
    setStatusMessage('Simulação ativada: confira o carimbo INDEFERIDO nos certificados em risco!');
    setTimeout(() => setStatusMessage(null), 5000);
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
      {/* Alerta Normativo do Art. 15, § 4º com Microcopy Canônico "Alerta 120 Dias" */}
      <div className="p-5 bg-warning-tint border-[3px] border-border rounded-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="w-11 h-11 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0 mt-0.5 border-2 border-border shadow-sm">
            <CagpIcon name="shield" className="w-5 h-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="cagp-stamp-badge is-semente text-xs py-0.5 px-2">
                Ferramenta Criada pela Chapa Semente
              </span>
              <span className="px-2 py-0.5 rounded-md bg-secondary text-white font-mono text-xs font-bold border border-border">
                ART. 15, § 4º • N-20229
              </span>
            </div>
            <h3 className="font-head text-base sm:text-lg font-black text-foreground leading-tight m-0">
              Alerta 120 Dias • Guardião do Prazo Fatal Corrido
            </h3>
            <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed m-0">
              Certificados de atividades complementares (AAC) devem ser protocolados no Colegiado em até <strong>120 dias corridos</strong> após a emissão. Quando um certificado entra na faixa crítica (≤ 30 dias) ou ultrapassa 120 dias, o sistema aplica o <strong>Carimbo Mecânico Rubro (`#9E2424`)</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSimulateUrgentCert}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-head text-xs uppercase font-black tracking-wider border-3 border-border shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <i className="bi bi-PatchExclamationFill bi-exclamation-octagon-fill" aria-hidden="true" />
          <span>Simular Alerta 120 Dias</span>
        </button>
      </div>

      {/* Layout Empilhado em 320px–767px e Lado a Lado em 1024px+ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Formulário de Cadastro de Certificado */}
        <div className="lg:col-span-5 cagp-card p-5 bg-white border-2 border-border rounded-xl h-fit shadow">
          <h4 className="font-head text-sm font-bold text-foreground mb-3 pb-2 border-b-2 border-border flex items-center gap-2">
            <i className="bi bi-plus-circle text-secondary" aria-hidden="true" />
            <span>Cadastrar no Alerta 120 Dias</span>
          </h4>

          {statusMessage && (
            <div className="p-3 mb-3 bg-success-tint border-2 border-secondary rounded-xl text-xs text-secondary font-bold shadow-sm">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleAddCert} className="space-y-3.5 font-body">
            {/* Primitiva Dropzone para carregar certificado */}
            <Dropzone
              variant="compact"
              onFilesAccepted={(files) => {
                if (files.length > 0) {
                  const file = files[0];
                  const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
                  setTitle(cleanName);
                  setStatusMessage(`Arquivo "${file.name}" pronto para cadastro.`);
                }
              }}
              accept={{
                'application/pdf': ['.pdf'],
                'image/*': ['.png', '.jpg', '.jpeg'],
              }}
              maxFiles={1}
              className="rounded-xl bg-card border-2 border-dashed border-border shadow-sm p-4 text-center cursor-pointer hover:bg-background"
            >
              {({ isDragging }) => (
                <div className="space-y-1">
                  <i className="bi bi-file-earmark-arrow-up text-xl text-secondary block" />
                  <span className="text-xs font-head font-bold uppercase text-foreground block">
                    {isDragging ? 'Solte o arquivo aqui' : 'Arrastar Certificado (PDF ou Foto)'}
                  </span>
                  <span className="text-xs text-muted-foreground font-sans block">
                    Preenche o título automaticamente
                  </span>
                </div>
              )}
            </Dropzone>

            <FormItem>
              <FormLabel htmlFor="cert-title" className="block text-xs font-head font-bold text-foreground mb-1">
                Título do Evento ou Curso:
              </FormLabel>
              <FormControl>
                <input
                  id="cert-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: I Seminário de Políticas Públicas UFMG"
                  className="w-full bg-white border-3 border-border px-3.5 py-2.5 rounded-xl text-sm text-foreground placeholder-content-secondary shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
              </FormControl>
            </FormItem>

            <div>
              <label htmlFor="cert-mod" className="block text-xs font-head font-bold text-foreground mb-1">
                Modalidade de AAC:
              </label>
              <select
                id="cert-mod"
                value={mod}
                onChange={(e) => setMod(e.target.value)}
                className="w-full bg-white border-3 border-border px-3.5 py-2.5 rounded-xl text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all cursor-pointer font-medium"
              >
                <option value="Eventos & Congressos">Eventos & Congressos (Teto 60h)</option>
                <option value="Cursos Livres">Cursos Livres de Extensão (Teto 60h)</option>
                <option value="Iniciação Científica">Iniciação Científica / PIBIC (Teto 90h)</option>
                <option value="Monitoria de Graduação">Monitoria de Graduação (Teto 90h)</option>
                <option value="Representação Estudantil">Representação no Colegiado/CAGP (Teto 60h)</option>
                <option value="Outras Atividades">Outras Atividades Aprovadas (Teto 30h)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label htmlFor="cert-date" className="block text-xs font-head font-bold text-foreground mb-1">
                  Data de Emissão:
                </label>
                <input
                  id="cert-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border-3 border-border px-3 py-2 rounded-xl text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all font-mono"
                />
              </div>

              <div>
                <label htmlFor="cert-hours" className="block text-xs font-head font-bold text-foreground mb-1">
                  Horas Declaradas:
                </label>
                <NumberField
                  value={hours}
                  onValueChange={(val) => setHours(val ?? 0)}
                  min={1}
                  max={180}
                  step={5}
                >
                  <NumberFieldContent className="flex items-center border-2 border-border rounded-xl bg-white shadow-sm overflow-hidden h-[42px]">
                    <NumberFieldDecrement className="p-2 bg-muted hover:bg-secondary hover:text-white transition-colors cursor-pointer border-none" />
                    <NumberFieldInput
                      id="cert-hours"
                      className="w-full text-center font-mono font-bold text-xs bg-transparent border-none focus:outline-none"
                    />
                    <NumberFieldIncrement className="p-2 bg-muted hover:bg-secondary hover:text-white transition-colors cursor-pointer border-none" />
                  </NumberFieldContent>
                </NumberField>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[44px] px-4 py-2.5 bg-secondary text-white hover:bg-secondary-hover rounded-xl font-head text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 border-3 border-border shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all mt-4 cursor-pointer"
            >
              <CagpIcon name="shield" className="w-4 h-4 text-white" />
              <span>Ativar Alerta 120 Dias</span>
            </button>
          </form>
        </div>

        {/* Listagem de Certificados Monitorados */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-border flex-wrap gap-2">
            <h4 className="font-head text-base font-bold text-foreground m-0 flex items-center gap-2">
              <CagpIcon name="clock" className="w-4 h-4 text-accent" />
              <span>Certificados no Alerta 120 Dias ({certs.length})</span>
            </h4>
            <span className="text-xs text-foreground font-mono font-bold px-2.5 py-1 bg-white border border-border rounded-md shadow-xs tabular-nums">
              Total: {certs.reduce((acc, c) => acc + c.hours, 0)} horas
            </span>
          </div>

          {certs.length === 0 ? (
            <div className="p-8 text-center bg-white border-2 border-border rounded-xl text-muted-foreground shadow space-y-3">
              <i className="bi bi-folder2-open text-4xl text-muted-foreground block mb-1" aria-hidden="true" />
              <p className="text-sm font-head font-bold uppercase text-foreground m-0">Nenhum certificado cadastrado no Alerta 120 Dias.</p>
              <p className="font-body text-xs text-muted-foreground max-w-sm mx-auto m-0">
                Cadastre seus certificados assim que forem emitidos ou clique abaixo para testar o carimbo mecânico vermelho do Art. 15:
              </p>
              <button
                type="button"
                onClick={handleSimulateUrgentCert}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-secondary text-white font-head text-xs uppercase font-black border-3 border-border shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <i className="bi bi-lightning-charge-fill" aria-hidden="true" />
                <span>Simular Certificado Crítico (Carimbo 120d)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {certs.map((c) => {
                  const daysLeft = getDaysLeft(c.date);
                  const isExpired = daysLeft <= 0;
                  const isUrgent = daysLeft > 0 && daysLeft <= 30;
                  const isCriticalStamp = isExpired || isUrgent;

                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={tactileSpring}
                      className={`p-4 bg-white border-2 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCriticalStamp
                          ? 'border-secondary shadow-lg bg-secondary-tint'
                          : 'border-border shadow'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-foreground text-background text-white font-mono text-xs font-bold border border-border">
                            {c.mod}
                          </span>
                          <span className="font-mono text-xs font-bold text-secondary">{c.hours} horas</span>
                        </div>
                        <h5 className="font-head text-sm font-bold text-foreground truncate m-0">
                          {c.title}
                        </h5>
                        <span className="text-xs text-muted-foreground font-mono">
                          Emitido em: {new Date(c.date).toLocaleDateString('pt-BR')} • Prazo Art. 15: 120 dias corridos
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                        <div className="text-right">
                          {isExpired ? (
                            <motion.span
                              initial={{ scale: 2.2, rotate: -14, opacity: 0 }}
                              animate={{ scale: 1, rotate: -2.5, opacity: 1 }}
                              transition={bounceSpring}
                              className="cagp-stamp-badge is-indeferido text-xs font-mono font-black tracking-wider text-white border-3 border-border bg-secondary rounded-lg inline-flex items-center gap-1.5 py-1.5 px-3 shadow-md"
                            >
                              <i className="bi bi-x-octagon-fill" aria-hidden="true" />
                              <span>PRESCRITO • FORA DOS 120D ({daysLeft}D)</span>
                            </motion.span>
                          ) : isUrgent ? (
                            <motion.span
                              initial={{ scale: 2.2, rotate: 12, opacity: 0 }}
                              animate={{ scale: 1, rotate: 2, opacity: 1 }}
                              transition={bounceSpring}
                              className="cagp-stamp-badge text-xs font-mono font-black tracking-wider text-white border-3 border-border bg-secondary rounded-lg inline-flex items-center gap-1.5 py-1.5 px-3 shadow-md"
                            >
                              <i className="bi bi-alarm-fill" aria-hidden="true" />
                              <span>PRAZO FATAL • RESTAM {daysLeft}D</span>
                            </motion.span>
                          ) : (
                            <span className="cagp-stamp-badge is-feito text-xs font-mono font-bold tracking-wider text-white border-2 border-border bg-teal-700 rounded-md inline-flex items-center gap-1 py-1 px-2.5 shadow-xs">
                              <i className="bi bi-check-circle-fill" aria-hidden="true" />
                              <span>NO PRAZO ({daysLeft}D RESTANTES)</span>
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => downloadAac120dIcs(c.title, new Date(c.date))}
                          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white hover:bg-surface-hover border-3 border-border text-foreground flex items-center justify-center text-sm shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                          title="Baixar lembrete de calendário (.ics)"
                          aria-label="Baixar lembrete de calendário (.ics)"
                        >
                          <CagpIcon name="calendar" className="w-4 h-4 text-secondary" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteCert(c.id)}
                          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white hover:bg-red-50 text-secondary border-3 border-border flex items-center justify-center text-sm shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                          title="Excluir certificado"
                          aria-label="Excluir certificado"
                        >
                          <CagpIcon name="close" className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
