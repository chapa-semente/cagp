import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';
import { getVaultItem, setVaultItem, type VaultData } from '@/lib/storage/studentVault';
import { downloadRu1815Ics, downloadCircular2230Ics } from '@/lib/ics';
import { CagpIcon } from '@/components/ui/CagpIcon';

interface CampusSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusSheet: React.FC<CampusSheetProps> = ({ isOpen, onClose }) => {
  const [prefs, setPrefs] = useState<VaultData<'cagp_notifications_prefs_v1'>>({
    ru1815: false,
    circular2230: false,
    aac120d: true,
  });

  useEffect(() => {
    if (isOpen) {
      setPrefs(getVaultItem('cagp_notifications_prefs_v1'));
    }
  }, [isOpen]);

  const togglePref = (key: 'ru1815' | 'circular2230' | 'aac120d') => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    setVaultItem('cagp_notifications_prefs_v1', updated);

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    if (typeof window !== 'undefined' && (window as unknown as { cagpToast?: (msg: string, icon?: string) => void }).cagpToast) {
      const msg = updated[key] ? 'Alerta ativado com sucesso!' : 'Alerta desativado.';
      (window as unknown as { cagpToast: (msg: string, icon?: string) => void }).cagpToast(msg, 'bi-bell-fill');
    }
  };

  const handleTestNotification = () => {
    if (!('Notification' in window)) {
      if (typeof window !== 'undefined' && (window as unknown as { cagpToast?: (msg: string, icon?: string) => void }).cagpToast) {
        (window as unknown as { cagpToast: (msg: string, icon?: string) => void }).cagpToast('Navegador não suporta a Notifications API.', 'bi-exclamation-triangle');
      }
      return;
    }

    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        new Notification('CAGP UFMG — Campus Agora', {
          body: 'Notificações ativadas! Você receberá avisos do RU II (18h15), Circular (22h30) e Guardião 120d.',
          icon: '/logos/cagp/10_simbolo_transparente_positivo.svg',
        });
        if (typeof window !== 'undefined' && (window as unknown as { cagpToast?: (msg: string, icon?: string) => void }).cagpToast) {
          (window as unknown as { cagpToast: (msg: string, icon?: string) => void }).cagpToast('Notificação de teste enviada!', 'bi-check-circle-fill');
        }
      } else {
        if (typeof window !== 'undefined' && (window as unknown as { cagpToast?: (msg: string, icon?: string) => void }).cagpToast) {
          (window as unknown as { cagpToast: (msg: string, icon?: string) => void }).cagpToast('Permissão de notificações não concedida.', 'bi-x-circle');
        }
      }
    });
  };

  return (
    <BottomSheet id="cagp-campus-sheet" isOpen={isOpen} onClose={onClose} title="Status Operacional do Campus & Alertas" initialDetent="large">
      <div className="space-y-4 text-foreground px-1 pb-4 font-sans">
        {/* Banner Informativo */}
        <div className="bg-white border-[2.5px] border-border p-4 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-success border-2 border-border shrink-0" aria-hidden="true" />
            <span className="font-heading text-xs uppercase font-extrabold text-secondary">
              Plantão Noturno • FAFICH & Campus Pampulha
            </span>
          </div>
          <p className="text-xs text-muted-foreground m-0 leading-relaxed font-medium">
            Configure alarmes locais e adicione eventos (.ics) à sua agenda do celular para não perder os horários do bandejão e do ônibus.
          </p>
        </div>

        {/* 1. RU II Setorial */}
        <div className="bg-white p-4 rounded-xl border-[2.5px] border-border shadow space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0 border-2 border-border shadow-xs">
                <CagpIcon name="utensils" className="w-4 h-4" />
              </span>
              <div>
                <span className="font-heading font-extrabold text-sm uppercase text-foreground">RU II Setorial</span>
                <span className="text-xs font-mono bg-success-tint text-success font-bold px-2 py-0.5 rounded border border-border ml-2">
                  Almoço 11h–14h · Jantar 17h30–19h30
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-foreground bg-muted px-2 py-1 rounded border border-border tabular-nums">R$ 5,60</span>
          </div>
          <p className="text-xs text-muted-foreground m-0 leading-snug font-medium">
            Catracas fecham <strong>impreterivelmente às 19h30</strong>. Chegue antes das 18h30 para evitar fila extensa.
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-border">
            <button
              type="button"
              onClick={() => togglePref('ru1815')}
              className={`min-h-[44px] py-2 px-3 text-xs rounded-xl font-heading font-bold uppercase border-2 border-border transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                prefs.ru1815
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-white text-foreground shadow-sm hover:bg-muted'
              }`}
            >
              <CagpIcon name="bell" className="w-3.5 h-3.5" />
              <span>{prefs.ru1815 ? 'Alarme 18h15 Ativo' : 'Ativar Alarme 18h15'}</span>
            </button>
            <button
              type="button"
              onClick={downloadRu1815Ics}
              className="min-h-[44px] py-2 px-3 text-xs rounded-xl font-heading font-bold uppercase bg-white border-2 border-border shadow-sm hover:bg-muted text-foreground transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              title="Baixar evento para Apple / Google Calendar"
            >
              <CagpIcon name="calendar" className="w-3.5 h-3.5 text-secondary" />
              <span>Agenda (.ics)</span>
            </button>
          </div>
        </div>

        {/* 2. Circular Noturno */}
        <div className="bg-white p-4 rounded-xl border-[2.5px] border-border shadow space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-info text-white flex items-center justify-center shrink-0 border-2 border-border shadow-xs">
                <i className="bi bi-bus-front-fill text-base" aria-hidden="true" />
              </span>
              <div>
                <span className="font-heading font-extrabold text-sm uppercase text-foreground">Circular Noturno FAFICH</span>
                <span className="text-xs font-mono bg-info-tint text-info font-bold px-2 py-0.5 rounded border border-border ml-2">
                  17h00 às 22h45
                </span>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-gray-700">Linhas 1, 2, 3 e 4</span>
          </div>
          <p className="text-xs text-muted-foreground m-0 leading-snug font-medium">
            Últimas viagens saindo da Praça de Serviços e FAFICH: <strong>22h15, 22h35 e 22h45</strong>.
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-border">
            <button
              type="button"
              onClick={() => togglePref('circular2230')}
              className={`min-h-[44px] py-2 px-3 text-xs rounded-xl font-heading font-bold uppercase border-2 border-border transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                prefs.circular2230
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-white text-foreground shadow-sm hover:bg-muted'
              }`}
            >
              <i className={`bi ${prefs.circular2230 ? 'bi-bell-fill' : 'bi-bell'}`} />
              <span>{prefs.circular2230 ? 'Alarme 22h30 Ativo' : 'Ativar Alarme 22h30'}</span>
            </button>
            <button
              type="button"
              onClick={downloadCircular2230Ics}
              className="min-h-[44px] py-2 px-3 text-xs rounded-xl font-heading font-bold uppercase bg-white border-2 border-border shadow-sm hover:bg-muted text-foreground transition-all cursor-pointer flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
              title="Baixar evento para Apple / Google Calendar"
            >
              <i className="bi bi-calendar-plus text-xs text-info" />
              <span>Agenda (.ics)</span>
            </button>
          </div>
        </div>

        {/* 3. Guardião de 120 Dias (Art. 15, § 4º) */}
        <div className="bg-white p-4 rounded-xl border-[2.5px] border-border shadow space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-orange-text text-black flex items-center justify-center shrink-0 border-2 border-border shadow-xs">
                <i className="bi bi-shield-exclamation text-base" aria-hidden="true" />
              </span>
              <div>
                <span className="font-heading font-extrabold text-sm uppercase text-foreground">Guardião de 120 Dias AAC</span>
                <span className="text-xs font-mono bg-warning-tint text-warning font-bold px-2 py-0.5 rounded border border-border ml-2">
                  Art. 15, § 4º
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => togglePref('aac120d')}
              className={`min-h-[44px] py-2 px-3 text-xs rounded-xl font-heading font-bold uppercase border-2 border-border transition-all cursor-pointer flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${
                prefs.aac120d
                  ? 'bg-success text-white shadow-sm'
                  : 'bg-white text-gray-700 shadow-sm'
              }`}
            >
              {prefs.aac120d ? 'Monitoramento Ativo' : 'Ativar Monitoramento'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground m-0 leading-snug font-medium">
            Emissão de certificados de Eventos e Anais prescreve em exatamente <strong>120 dias corridos</strong>. O guardião sinaliza quando faltarem menos de 30 dias.
          </p>
        </div>

        {/* 4. Atendimento e Contatos Oficiais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="bg-white p-3 rounded-xl border-2 border-border shadow-sm">
            <span className="font-heading font-extrabold uppercase text-foreground block">
              Secretaria Sala F-2039
            </span>
            <span className="text-gray-600 font-medium block mt-0.5">Norma Guedes · Atendimento 08h às 20h</span>
            <a href="mailto:coordgestaopublica@gmail.com" className="font-mono text-secondary font-bold block mt-1 hover:underline">
              coordgestaopublica@gmail.com
            </a>
          </div>

          <div className="bg-white p-3 rounded-xl border-2 border-border shadow-sm">
            <span className="font-heading font-extrabold uppercase text-foreground block">
              Coordenação &amp; CEAG
            </span>
            <span className="text-gray-600 font-medium block mt-0.5">Profª Isabele Mitozo · Quartas 17h30–19h (F-4067)</span>
            <span className="font-mono text-gray-600 block mt-1">CEAG FAFICH: 08h às 22h</span>
          </div>
        </div>

        {/* Botão de Teste de Notificação Nativa */}
        <button
          type="button"
          onClick={handleTestNotification}
          className="w-full min-h-[44px] py-2.5 bg-white hover:bg-muted text-foreground font-heading text-xs font-bold uppercase rounded-xl border-[2.5px] border-border shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
        >
          <CagpIcon name="bell" className="w-4 h-4 text-secondary" />
          <span>Testar Notificação do Navegador</span>
        </button>
      </div>
    </BottomSheet>
  );
};
