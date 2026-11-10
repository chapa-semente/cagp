import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import { bounceSpring, tactileSpring } from '@/lib/motion';
import { toast } from 'sonner';

interface Manifestacao {
  id: string;
  protocol: string;
  category: string;
  subject: string;
  message: string;
  isAnonymous: boolean;
  targetDept?: string;
  status: 'registrada' | 'em_analise' | 'encaminhada_colegiado' | 'concluida';
  createdAt: string;
}

const CATEGORIES = [
  {
    id: 'ementas',
    title: 'Ementas Defasadas',
    desc: 'Denuncie bibliografias desatualizadas ou conteúdos fora da realidade do setor público para o Colegiado.',
    icon: 'bi-journal-x',
    badge: 'Prioridade Pedagógica',
    color: 'bg-[#FEF3C7] text-[#854D0E] border-[#CA8A04]',
  },
  {
    id: 'infra',
    title: 'Infraestrutura FAFICH',
    desc: 'Problemas em salas de aula, ar-condicionado, projetores, banheiros e espaços de convivência discente.',
    icon: 'bi-building-gear',
    badge: 'Espaço Físico',
    color: 'bg-[#DCFCE7] text-[#166534] border-[#16A34A]',
  },
  {
    id: 'colegiado',
    title: 'Demandas ao Colegiado',
    desc: 'Dificuldades com prazos de requerimentos, aproveitamento de estudos ou atendimento da secretaria F-2039.',
    icon: 'bi-folder-symlink',
    badge: 'Secretaria & Gestão',
    color: 'bg-[#E0E7FF] text-[#3730A3] border-[#4F46E5]',
  },
  {
    id: 'direitos',
    title: 'Direitos, NAI & Acolhimento',
    desc: 'Garantias para estudantes trabalhadores, suporte à neurodivergência e denúncias de assédio ou descaso.',
    icon: 'bi-shield-check',
    badge: 'Permanência & Direitos',
    color: 'bg-[#FEE2E2] text-[#991B1B] border-[#B91C1C]',
  },
];

const OUVIDORIA_STEPS = [
  { id: 'eixo', title: '1. Eixo & Sigilo', description: 'Escolha o canal e privacidade' },
  { id: 'relato', title: '2. Relato & Fatos', description: 'Descreva a demanda ou denúncia' },
  { id: 'protocolo', title: '3. Revisão & Carimbo', description: 'Confirme e protocole no cofre' },
];

export const OuvidoriaInteractiveCenter: React.FC = () => {
  const [manifestacoes, setManifestacoes] = useState<Manifestacao[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ementas');
  const [subject, setSubject] = useState<string>('');
  const [targetDept, setTargetDept] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [lastStamped, setLastStamped] = useState<Manifestacao | null>(null);

  useEffect(() => {
    try {
      const saved = getVaultItem('cagp_ouvidoria_manifestacoes_v1');
      if (Array.isArray(saved)) {
        setManifestacoes(saved as Manifestacao[]);
      }
    } catch (e) {
      console.error('Erro ao ler manifestações', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error('Preencha o assunto e a descrição da sua manifestação.');
      setActiveStep(1);
      return;
    }

    setIsSubmitting(true);

    const now = new Date();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const protocol = `GP-FALACA-${now.getFullYear()}-${randomHex}`;

    const nova: Manifestacao = {
      id: `man-${Date.now()}`,
      protocol,
      category: selectedCategory,
      subject: subject.trim(),
      message: message.trim(),
      isAnonymous,
      targetDept: targetDept.trim() || undefined,
      status: 'registrada',
      createdAt: now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const atualizadas = [nova, ...manifestacoes];
    setManifestacoes(atualizadas);
    setVaultItem('cagp_ouvidoria_manifestacoes_v1', atualizadas);

    setTimeout(() => {
      setIsSubmitting(false);
      setLastStamped(nova);
      setSubject('');
      setTargetDept('');
      setMessage('');
      setActiveStep(2);
      toast.success(`Protocolo Fala com o CA carimbado: ${protocol}`, {
        duration: 5000,
      });
    }, 350);
  };

  const getCategoryMeta = (catId: string) => {
    return CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
  };

  return (
    <div className="space-y-8">
      {/* Selo de Garantia Visual de Sigilo Local */}
      <div className="p-4 rounded-xl bg-[#ECFDF5] border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#166534] text-white border-2 border-[#1F1F1F] flex items-center justify-center shrink-0">
            <i className="bi bi-shield-lock-fill text-lg" aria-hidden="true" />
          </div>
          <div>
            <span className="font-heading font-black text-xs sm:text-sm uppercase text-[#1F1F1F] block">
              Fala com o CA (Proposta 14 Semente) • Sigilo Local Garantido
            </span>
            <p className="text-xs text-[#1F1F1F]/85 m-0 font-medium">
              Nenhum dado sai do seu aparelho sem sua ação expressa. Suas manifestações ficam protegidas no Cofre Discente (<code className="font-mono font-bold">studentVault.ts</code>).
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-lg bg-white border-2 border-[#1F1F1F] font-mono text-xs font-black uppercase text-[#166534] shrink-0 self-start sm:self-center">
          CRIPTOGRAFIA LOCAL ATIVA
        </span>
      </div>

      {/* Formulário Multi-Etapas Animado */}
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {OUVIDORIA_STEPS.map((st, idx) => {
              const isCurrent = activeStep === idx;
              const isDone = activeStep > idx;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setLastStamped(null);
                    setActiveStep(idx);
                  }}
                  className={`min-h-[48px] p-3 rounded-xl border-3 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isCurrent
                      ? 'bg-[#5B2A85] text-white border-[#1F1F1F] shadow-[3px_3px_0_0_#FE8812]'
                      : isDone
                      ? 'bg-[#DCFCE7] text-[#1F1F1F] border-[#1F1F1F]'
                      : 'bg-[#F4F2EC] text-[#1F1F1F] border-[#1F1F1F]/60 hover:bg-white'
                  }`}
                >
                  <span className="w-7 h-7 rounded-lg border-2 border-[#1F1F1F] bg-white text-[#1F1F1F] font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {isDone ? <i className="bi bi-check-lg" aria-hidden="true" /> : idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="font-heading font-black text-xs uppercase block truncate">
                      {st.title}
                    </span>
                    <span className={`text-xs block truncate ${isCurrent ? 'text-white' : 'text-muted-foreground'}`}>
                      {st.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7 rounded-2xl bg-card border-2 border-[#1F1F1F] shadow-[8px_8px_0px_#1F1F1F] space-y-5"
        >
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={tactileSpring}
                className="space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-[#1F1F1F]">
                  <div>
                    <h3 className="text-base sm:text-lg font-heading font-black text-foreground m-0">
                      Etapa 1: Selecione o Eixo da Demanda &amp; Modo de Sigilo
                    </h3>
                    <p className="text-xs text-muted-foreground m-0 mt-0.5">
                      Escolha uma das 4 frentes de atuação do Fala com o CA.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFFBEB] px-3.5 py-2 rounded-xl border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F]">
                    <input
                      type="checkbox"
                      id="sigilo-toggle"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-border focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="sigilo-toggle" className="text-xs font-heading font-black uppercase text-[#1F1F1F] cursor-pointer select-none">
                      {isAnonymous ? 'Modo Sigiloso (Anônimo)' : 'Modo Identificado'}
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-left p-4 rounded-xl border-3 transition-all min-h-[48px] flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#1F1F1F] bg-white shadow-[5px_5px_0px_#1F1F1F] -translate-y-0.5 ring-2 ring-primary'
                            : 'border-[#1F1F1F]/60 bg-background hover:bg-white opacity-95'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-heading font-black uppercase rounded-md border ${cat.color}`}
                            >
                              <i className={`bi ${cat.icon}`}></i>
                              {cat.badge}
                            </span>
                            {isSelected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                            )}
                          </div>
                          <h4 className="font-heading font-extrabold text-sm text-foreground leading-tight">
                            {cat.title}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {cat.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#5B2A85] text-white font-heading font-black text-xs uppercase tracking-wider border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Avançar para o Relato</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={tactileSpring}
                className="space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b-2 border-[#1F1F1F]">
                  <h3 className="text-base sm:text-lg font-heading font-black text-foreground m-0">
                    Etapa 2: Detalhar Manifestação ({getCategoryMeta(selectedCategory).title})
                  </h3>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#F4F2EC] border-2 border-[#1F1F1F]">
                    {isAnonymous ? 'Anônimo no Cofre' : 'Identificado'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="assunto-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                      Assunto Sintético <span className="text-primary">*</span>
                    </label>
                    <input
                      id="assunto-input"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Bibliografia de DCP123 desatualizada desde 2012"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-background border-3 border-[#1F1F1F] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium min-h-[44px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="alvo-input" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                      Disciplina / Departamento / Sala
                    </label>
                    <input
                      id="alvo-input"
                      type="text"
                      value={targetDept}
                      onChange={(e) => setTargetDept(e.target.value)}
                      placeholder="Ex: DCP 123 / Sala 4010"
                      className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-background border-3 border-[#1F1F1F] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="desc-textarea" className="block text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                    Relato Detalhado dos Fatos <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="desc-textarea"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Descreva a situação com clareza. Caso trate de ementa defasada, cite os autores cobrados ou o problema na grade. Caso seja infraestrutura, informe horários e localização precisa."
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-background border-3 border-[#1F1F1F] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all font-normal leading-relaxed resize-y min-h-[120px]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(0)}
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white text-[#1F1F1F] font-heading font-black text-xs uppercase border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] cursor-pointer"
                  >
                    ← Voltar ao Eixo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!subject.trim() || !message.trim()) {
                        toast.error('Preencha o assunto e o relato detalhado antes de revisar.');
                        return;
                      }
                      setActiveStep(2);
                    }}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#5B2A85] text-white font-heading font-black text-xs uppercase tracking-wider border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Revisar &amp; Carimbar Protocolo</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={bounceSpring}
                className="space-y-5"
              >
                {lastStamped ? (
                  <div className="p-6 rounded-2xl bg-[#ECFDF5] border-2 border-[#1F1F1F] shadow-[6px_6px_0_0_#1F1F1F] space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#166534] text-white font-mono text-xs font-black uppercase border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] -rotate-1">
                      <i className="bi bi-patch-check-fill" aria-hidden="true" />
                      <span>PROTOCOLADO NO COFRE • FALA COM O CA</span>
                    </div>
                    <h4 className="font-heading text-xl sm:text-2xl font-black text-[#1F1F1F] m-0">
                      Recibo de Protocolo: {lastStamped.protocol}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1F1F1F]/85 max-w-lg mx-auto m-0 font-medium">
                      Sua manifestação (&ldquo;{lastStamped.subject}&rdquo;) foi carimbada e salva com segurança no seu Cofre Local em {lastStamped.createdAt}.
                    </p>
                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setLastStamped(null);
                          setActiveStep(0);
                        }}
                        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1F1F1F] text-white font-heading font-black text-xs uppercase border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#FE8812] cursor-pointer"
                      >
                        Registrar Nova Manifestação
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#ffffff] border-2 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-mono text-xs font-black uppercase text-[#5B2A85]">
                          Resumo para Protocolo • {getCategoryMeta(selectedCategory).title}
                        </span>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#1F1F1F]">
                          {isAnonymous ? 'Sigilo Anônimo Ativo' : 'Identificado'}
                        </span>
                      </div>
                      <p className="font-heading font-black text-sm text-[#1F1F1F] m-0">
                        {subject || '(Assunto não preenchido)'}
                      </p>
                      {targetDept && (
                        <p className="font-mono text-xs text-muted-foreground m-0">
                          Alvo: {targetDept}
                        </p>
                      )}
                      <p className="text-xs text-[#1F1F1F]/90 leading-relaxed m-0 pt-1 border-t border-[#1F1F1F]/20">
                        {message || '(Relato ainda não preenchido — volte à Etapa 2 para detalhar)'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white text-[#1F1F1F] font-heading font-black text-xs uppercase border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] cursor-pointer"
                      >
                        ← Editar Relato
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FE8812] text-[#1F1F1F] font-heading font-black text-sm uppercase tracking-wider rounded-xl border-3 border-[#1F1F1F] shadow-[5px_5px_0px_#1F1F1F] hover:bg-[#ff9831] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer min-h-[48px] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="bi bi-arrow-repeat animate-spin"></i>
                            Carimbando Protocolo...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-patch-check-fill"></i>
                            Carimbar &amp; Protocolar no Cofre
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Histórico Local de Manifestações */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-heading font-black text-foreground flex items-center gap-2">
            <i className="bi bi-clock-history text-primary"></i>
            Minhas Manifestações Registradas ({manifestacoes.length})
          </h3>
          {manifestacoes.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Deseja limpar o histórico local de manifestações?')) {
                  setManifestacoes([]);
                  setVaultItem('cagp_ouvidoria_manifestacoes_v1', []);
                  toast.info('Histórico de manifestações limpo.');
                }
              }}
              className="text-xs text-muted-foreground hover:text-destructive font-bold underline cursor-pointer"
            >
              Limpar Histórico
            </button>
          )}
        </div>

        {manifestacoes.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border-2 border-dashed border-border bg-background">
            <i className="bi bi-chat-square-quote text-3xl text-muted-foreground/60 mb-2 block"></i>
            <p className="text-sm font-heading font-extrabold text-foreground">
              Nenhuma manifestação protocolada neste navegador
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              Utilize o formulário acima para registrar denúncias de ementas, falhas estruturais ou sugestões à gestão discente.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {manifestacoes.map((item) => {
              const meta = getCategoryMeta(item.category);
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border-2 border-border bg-card shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-muted border border-border text-foreground">
                        {item.protocol}
                      </span>
                      <span className={`text-xs font-heading font-black uppercase px-2 py-0.5 rounded border ${meta.color}`}>
                        {meta.title}
                      </span>
                      {item.isAnonymous && (
                        <span className="text-xs font-mono font-bold text-muted-foreground">
                          • Sigiloso
                        </span>
                      )}
                    </div>
                    <h4 className="font-heading font-extrabold text-sm text-foreground truncate">
                      {item.subject}
                    </h4>
                    {item.targetDept && (
                      <p className="text-xs font-mono text-muted-foreground">
                        Alvo: {item.targetDept}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-right shrink-0">
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.createdAt}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-heading font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <i className="bi bi-check-circle-fill text-xs"></i>
                      {item.status === 'registrada' ? 'Registrada no Cofre' : item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
