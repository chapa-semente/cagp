import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import allCourses from '@/data/curatedEnapCourses.json';
import { adicionarAtividade, idDoCurso, lerAtividades } from '@/lib/atividades';
import { toast } from '@/lib/toast';
import { tactileSpring, bounceSpring } from '@/lib/motion';

interface Course {
  id: string;
  title: string;
  axis: string;
  certifier: string;
  hours: number;
  summary: string;
  link: string;
}

const CAGP_COURSES = [
  {
    id: 'cagp-cur-1',
    title: 'Oficina Prática: Orçamento Público, PPA e LOA na Prática',
    speaker: 'Professores do DCP/UFMG & Gestores Públicos Egressos',
    hours: 20,
    acgGroup: 'Extensão (Mód. III) + AAC (Grupo I)',
    modality: 'Híbrido (FAFICH/UFMG + Gravação)',
    status: 'Proposta 10 • Inscrição Simulada Aberta',
    tag: 'UFMG / CAGP • Formação Política',
    color: 'bg-warning-tint text-foreground border-border',
    desc: 'Elaboração de emendas, leitura de relatórios orçamentários do SIAFI/SIAFEM e análise das contas da UFMG e de Belo Horizonte.',
  },
  {
    id: 'cagp-cur-2',
    title: 'Laboratório de Análise de Dados no Setor Público com R',
    speaker: 'Pesquisadores do Centro de Estudos Legislativos (CEL/DCP/UFMG)',
    hours: 30,
    acgGroup: 'Extensão (Mód. III) + AAC (Grupo I)',
    modality: 'Online com Tutorias Síncronas na FAFICH',
    status: 'Proposta 10 • Inscrição Simulada Aberta',
    tag: 'UFMG / DCP • Metodologia & Dados',
    color: 'bg-success-tint text-success border-border',
    desc: 'Manipulação de microdados do Censo, PNAD e dados abertos do governo federal para formulação de diagnósticos sociais.',
  },
  {
    id: 'cagp-cur-3',
    title: 'Ciclo de Debates: Carreiras de Estado e Burocracia de Médio Escalão',
    speaker: 'Especialistas em Políticas Públicas e Gestão Governamental (EPPGG)',
    hours: 15,
    acgGroup: 'AAC (Grupo I — Eventos) + Extensão',
    modality: 'Presencial Auditório Baesse / FAFICH UFMG',
    status: 'Confirmado 2026/1 • Chapa Semente',
    tag: 'Carreira & Extensão UFMG',
    color: 'bg-primary-tint text-primary border-border',
    desc: 'Encontros com servidores de carreira da União e do Estado de Minas Gerais para debater concursos, desafios e autonomia técnica.',
  },
];

export const CursosCatalogHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHoursFilter, setSelectedHoursFilter] = useState<'all' | 'curto' | 'medio' | 'longo'>('all');
  const [selectedAxis, setSelectedAxis] = useState<string>('all');
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // Oficinas de exemplo (Proposta 10) marcadas nesta visita: só demonstração, não entram na lista.
  const [exemplos, setExemplos] = useState<string[]>([]);

  // "Guardar" tem um dono só: a lista de atividades de /meu-curso (src/lib/atividades.ts).
  useEffect(() => {
    const carregar = () => {
      const prefixo = idDoCurso('');
      setSavedCourses(
        lerAtividades()
          .itens.filter((a) => a.id.startsWith(prefixo))
          .map((a) => a.id.slice(prefixo.length)),
      );
    };
    carregar();
    window.addEventListener('cagp:vault-updated', carregar);
    return () => window.removeEventListener('cagp:vault-updated', carregar);
  }, []);

  const handleAddCourseTo600h = (course: { id: string; title: string; hours: number; certifier?: string }, exemplo = false) => {
    if (exemplo) {
      setExemplos((atual) => (atual.includes(course.id) ? atual : [...atual, course.id]));
      toast.info('Esta oficina é um exemplo da Proposta 10. Não entra na sua lista de verdade.');
      return;
    }
    if (savedCourses.includes(course.id)) {
      toast.info('Este curso já está na sua lista, em Meu curso.');
      return;
    }
    // Curso de escola de governo conta como extensão (DCP 193/194). Entra como "Quero fazer":
    // as horas só somam quando a pessoa marcar "Já fiz" no painel, com a data do certificado.
    adicionarAtividade({
      id: idDoCurso(course.id),
      titulo: course.title,
      mod: 'ext_ensino_inter',
      horas: Math.min(300, Math.max(1, Math.round(course.hours))),
      situacao: 'quero',
    });
    toast.success('Guardado em Meu curso como "Quero fazer". Quando terminar, marque "Já fiz" lá.', { duration: 4500 });
  };

  const filteredCourses = useMemo(() => {
    const list = allCourses as Course[];
    const term = searchTerm.toLowerCase().trim();

    return list.filter((c) => {
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.axis.toLowerCase().includes(term) ||
        c.summary.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      if (selectedHoursFilter === 'curto' && c.hours > 20) return false;
      if (selectedHoursFilter === 'medio' && (c.hours <= 20 || c.hours > 40)) return false;
      if (selectedHoursFilter === 'longo' && c.hours <= 40) return false;

      if (selectedAxis !== 'all' && !c.axis.toLowerCase().includes(selectedAxis.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedHoursFilter, selectedAxis]);

  return (
    <div className="space-y-8">
      {/* Catálogo Curado ENAP / EV.G — alvo do tour (parada do Ítalo) */}
      <div data-tour="italo" className="p-4 sm:p-6 rounded-xl bg-card border-2 border-border shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-3 border-border">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-black text-foreground flex items-center gap-2 m-0">
              <i className="bi bi-collection-fill text-primary" aria-hidden="true"></i>
              Cursos gratuitos da ENAP e da EV.G
            </h3>
            <p className="text-xs text-muted-foreground mt-1 m-0">
              Cursos autoinstrucionais gratuitos com certificado oficial do Governo Federal válidos para Extensão e Atividades Complementares (AAC).
            </p>
          </div>

          <motion.div
            key={savedCourses.length}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={bounceSpring}
            className="flex items-center gap-2 bg-success-tint text-success border-3 border-border shadow-md px-3.5 py-2 rounded-xl font-mono text-xs font-black shrink-0 self-start sm:self-auto"
          >
            <i className="bi bi-bookmark-check-fill text-success" aria-hidden="true"></i>
            <span>{savedCourses.length === 1 ? "1 curso" : `${savedCourses.length} cursos`} na sua lista</span>
          </motion.div>
        </div>

        {/* Barra de Filtros e Busca com Foco Roxo Semente (#5B2A85) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-7 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar curso gratuito ENAP por título, ementa ou área (ex: Licitações, Dados, Orçamento)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border-3 border-border shadow-md rounded-xl focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary min-h-[46px] font-sans"
            />
            <i className="bi bi-search absolute left-3.5 top-3.5 text-primary text-sm font-bold" aria-hidden="true"></i>
          </div>

          <div className="lg:col-span-5 flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 scroll-mask-x scrollbar-none">
            {[
              { id: 'all', label: 'Qualquer duração' },
              { id: 'curto', label: 'Até 20h' },
              { id: 'medio', label: '21h a 40h' },
              { id: 'longo', label: 'Mais de 40h' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedHoursFilter(f.id as any)}
                className="cagp-chip"
                aria-pressed={selectedHoursFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Eixos Rápidos com .scroll-mask-x e 44x44pt */}
        <div role="group" aria-label="Área" className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 scroll-mask-x scrollbar-none">
          {[
            { id: 'all', label: 'Todas as áreas' },
            { id: 'licitações', label: 'Licitações e contratos' },
            { id: 'dados', label: 'Governança e dados' },
            { id: 'pessoas', label: 'Gestão de Pessoas' },
            { id: 'políticas', label: 'Políticas Públicas' },
            { id: 'orçamento', label: 'Orçamento e finanças' },
          ].map((ax) => (
            <button
              key={ax.id}
              type="button"
              onClick={() => setSelectedAxis(ax.id)}
              className="cagp-chip"
              aria-pressed={selectedAxis === ax.id}
            >
              {ax.label}
            </button>
          ))}
        </div>

        {/* Grid de Cursos ENAP com Hover Elevado e Badges ACG */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-muted-foreground">
            <span>
              Exibindo {Math.min(visibleCount, filteredCourses.length)} de {filteredCourses.length} cursos gratuitos encontrados
            </span>
            <span className="text-primary">
              Toque em "Guardar na minha lista" pra achar o curso depois em Meu curso
            </span>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredCourses.slice(0, visibleCount).map((c) => {
                const isSaved = savedCourses.includes(c.id);

                return (
                  <motion.div
                    layout
                    key={c.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    whileHover={{ x: -2, y: -3 }}
                    transition={tactileSpring}
                    className={`p-4 rounded-xl border-2 border-border bg-white shadow-md hover:shadow-xl flex flex-col justify-between gap-3 transition-shadow ${
                      isSaved ? 'ring-3 ring-success bg-success-tint' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-heading font-extrabold uppercase px-2 py-1 rounded-md bg-background border-2 border-border text-foreground truncate max-w-[165px]">
                          {c.axis}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-black text-foreground px-2 py-1 bg-accent-tint rounded-md border-2 border-border shadow-sm shrink-0">
                          <i className="bi bi-patch-check-fill text-primary" aria-hidden="true"></i>
                          <span>ACG • {c.hours}h</span>
                        </span>
                      </div>

                      <h4 className="font-heading font-black text-sm text-foreground leading-snug line-clamp-2 m-0">
                        {c.title}
                      </h4>

                      <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed m-0">
                        {c.summary}
                      </p>

                      <div className="flex items-center justify-between text-xs font-mono font-bold text-muted-foreground mt-2.5 pt-2 border-t border-border">
                        <span>Certificador: {c.certifier}</span>
                        <span className="text-success">Válido AAC/Ext</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t-2 border-border">
                      <button
                        type="button"
                        onClick={() => handleAddCourseTo600h(c)}
                        className={`w-full py-2 px-3 text-xs font-heading font-black uppercase rounded-xl border-3 border-border transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                          isSaved
                            ? 'bg-success-tint text-success shadow-sm font-bold'
                            : 'bg-primary text-white shadow-md hover:bg-primary-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <i className="bi bi-check-circle-fill text-success" aria-hidden="true"></i>
                            <span>Na sua lista</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-plus-circle-fill text-accent-tint" aria-hidden="true"></i>
                            <span>Guardar na minha lista ({c.hours}h)</span>
                          </>
                        )}
                      </button>

                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full min-h-[40px] rounded-lg border-2 border-border bg-background hover:bg-accent-tint text-xs font-heading font-extrabold uppercase text-foreground transition-colors no-underline"
                      >
                        <span>Inscrição Gratuita no Portal EV.G</span>
                        <i className="bi bi-box-arrow-up-right text-xs" aria-hidden="true"></i>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {visibleCount < filteredCourses.length && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 18)}
                className="px-6 py-3 bg-accent-tint text-foreground font-heading font-black text-xs uppercase rounded-xl border-3 border-border shadow-md hover:bg-primary hover:text-white active:translate-y-[1px] transition-all cursor-pointer min-h-[48px]"
              >
                Carregar Mais Cursos Gratuitos (+18)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Oficinas da Proposta 10: exemplos (simulado), depois do catálogo real da ENAP */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-1 max-w-[68ch]">
            <h3 className="text-lg font-heading font-bold text-foreground m-0">
              Oficinas que a Semente quer oferecer
            </h3>
            <p className="m-0 text-sm text-content-secondary">
              É a Proposta 10: exemplos do que o CA vai organizar se a chapa ganhar. Ainda não têm inscrição.
            </p>
          </div>
          <span className="cagp-sticker-simulado">Simulado</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAGP_COURSES.map((cur) => {
            const isSimulated = exemplos.includes(cur.id);
            return (
              <motion.div
                key={cur.id}
                whileHover={{ x: -2, y: -3 }}
                transition={tactileSpring}
                className="p-5 rounded-xl border-2 border-border bg-white shadow-md hover:shadow-xl flex flex-col justify-between gap-4 transition-shadow"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className={`text-xs font-heading font-black uppercase px-2.5 py-0.5 rounded-md border-2 ${cur.color} shadow-sm`}>
                      {cur.tag}
                    </span>
                    <span className="cagp-sticker-simulado">Simulado</span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-foreground leading-snug m-0">
                    {cur.title}
                  </h4>

                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed m-0">
                    {cur.desc}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-background border-2 border-border text-xs font-mono text-foreground space-y-1">
                    <div><strong>Modalidade:</strong> {cur.modality}</div>
                    <div><strong>Ministrantes:</strong> {cur.speaker}</div>
                    <div className="text-primary font-bold"><i className="bi bi-balance-scale mr-1" aria-hidden="true" /><strong>Contaria como:</strong> {cur.acgGroup}</div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-black text-primary uppercase">
                      {cur.status}
                    </span>
                    <span className="font-mono font-bold text-success">
                      100% Gratuito
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddCourseTo600h({
                        id: cur.id,
                        title: cur.title,
                        hours: cur.hours,
                        certifier: 'CAGP / DCP UFMG (Proposta 10)',
                      }, true)
                    }
                    className={`w-full min-h-[44px] py-2 px-3 rounded-xl text-xs font-heading font-black uppercase border-3 border-border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSimulated
                        ? 'bg-success-tint text-success shadow-sm'
                        : 'bg-primary text-white shadow-md hover:bg-primary-hover active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                    }`}
                  >
                    {isSimulated ? (
                      <>
                        <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                        <span>Inscrição simulada</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lightning-charge-fill text-accent-tint" aria-hidden="true"></i>
                        <span>Simular inscrição ({cur.hours}h)</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
