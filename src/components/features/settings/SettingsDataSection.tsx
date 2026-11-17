// SettingsDataSection.tsx — "Seus dados" em Ajustes. Não guarda nada próprio: cada função tem um dono só
// (backup → Seu perfil; lembretes do RU e do circular → Campus agora) e aqui só existe o atalho.
// A única ação que mora aqui é apagar tudo deste celular.
import React from 'react';
import { toast } from '@/lib/toast';

const open = (event: string) => window.dispatchEvent(new CustomEvent(event));

export const SettingsDataSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const handleReset = () => {
    if (window.confirm('Apagar horas, grade, perfil e preferências deste celular? Não dá para desfazer, a não ser que você tenha copiado seu código em Seu perfil.')) {
      localStorage.clear();
      toast.success('Celular limpo. Recarregando…');
      window.setTimeout(() => window.location.reload(), 900);
    }
  };

  const row =
    'w-full min-h-[56px] px-4 py-3 bg-white hover:bg-muted flex items-center gap-3 text-left cursor-pointer transition-colors duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary';

  return (
    <section aria-labelledby="ajustes-dados" className={compact ? 'space-y-3' : 'bg-white border-2 border-border rounded-xl p-5 sm:p-6 shadow-md space-y-4'}>
      <div>
        <h2 id="ajustes-dados" className="font-heading font-bold text-lg text-foreground m-0">
          Seus dados
        </h2>
        <p className="text-sm text-content-secondary m-0 mt-1">
          Tudo o que você salva fica só neste celular. Nada vai para servidor nenhum.
        </p>
      </div>

      <div className="border-2 border-border rounded-xl overflow-hidden divide-y-2 divide-border">
        <button type="button" className={row} onClick={() => open('cagp:open-passport')}>
          <i className="bi bi-arrow-left-right text-xl text-primary" aria-hidden="true" />
          <span className="flex-1 min-w-0">
            <span className="block font-heading font-bold text-sm text-foreground">Levar pro outro celular</span>
            <span className="block text-sm text-content-secondary">Fica em Seu perfil: copie o código lá.</span>
          </span>
          <i className="bi bi-chevron-right text-muted-foreground" aria-hidden="true" />
        </button>
        <button type="button" className={row} onClick={() => open('cagp:open-campus')}>
          <i className="bi bi-alarm-fill text-xl text-primary" aria-hidden="true" />
          <span className="flex-1 min-w-0">
            <span className="block font-heading font-bold text-sm text-foreground">Lembretes do RU e do circular</span>
            <span className="block text-sm text-content-secondary">Ficam em Campus agora, junto dos horários.</span>
          </span>
          <i className="bi bi-chevron-right text-muted-foreground" aria-hidden="true" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="min-h-[44px] px-4 rounded-xl border-2 border-destructive bg-white text-destructive font-heading font-bold text-xs uppercase tracking-[0.03em] inline-flex items-center gap-2 cursor-pointer hover:bg-destructive-tint transition-colors duration-(--duration-press) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
      >
        <i className="bi bi-trash" aria-hidden="true" />
        Apagar tudo deste celular
      </button>
    </section>
  );
};
