import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import allCourses from '@/data/curatedEnapCourses.json';
import { getVaultItem, setVaultItem } from '@/lib/storage/studentVault';
import { toast } from 'sonner';
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
    color: 'bg-[#FEF3C7] text-[#1F1F1F] border-[#1F1F1F]',
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
    color: 'bg-[#DCFCE7] text-[#166534] border-[#1F1F1F]',
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
    color: 'bg-[#EFE7F6] text-[#5B2A85] border-[#1F1F1F]',
    desc: 'Encontros com servidores de carreira da União e do Estado de Minas Gerais para debater concursos, desafios e autonomia técnica.',
  },
];

export const CursosCatalogHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHoursFilter, setSelectedHoursFilter] = useState<'all' | 'curto' | 'medio' | 'longo'>('all');
  const [selectedAxis, setSelectedAxis] = useState<string>('all');
  const [savedCourses, setSavedCourses] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(18);

  useEffect(() => {
    try {
      const saved = getVaultItem('cagp_cursos_enap_salvos_v1');
      if (Array.isArray(saved)) {
        setSavedCourses(saved.map((c: any) => c.id));
      }
    } catch (e) {
      console.error('Erro ao ler cursos salvos', e);
    }
  }, []);

  const handleAddCourseTo600h = (course: { id: string; title: string; hours: number; certifier?: string }) => {
    try {
      const currentEnap = getVaultItem('cagp_cursos_enap_salvos_v1') || [];
      const isAlreadySaved = currentEnap.some((c: any) => c.id === course.id);

      if (isAlreadySaved) {
        toast.info(`O curso "${course.title}" já está simulado na sua Calculadora 600h!`);
        return;
      }

      const updatedEnap = [
        ...currentEnap,
        {
          id: course.id,
          title: course.title,
          hours: course.hours,
          category: course.certifier || 'ENAP / EV.G / UFMG',
          addedAt: new Date().toISOString(),
        },
      ];
      setVaultItem('cagp_cursos_enap_salvos_v1', updatedEnap);
      setSavedCourses(updatedEnap.map((c: any) => c.id));

      // Atualiza também os medidores de horas na Calculadora 600h (cagp_calc_ext_aac_v1)
      const currentCalc = getVaultItem('cagp_calc_ext_aac_v1') || {};
      const nextAacCursos = Math.min(90, Number(currentCalc.aac_cursos || 0) + course.hours);
      setVaultItem('cagp_calc_ext_aac_v1', {
        ...currentCalc,
        aac_cursos: nextAacCursos,
      });

      // Adiciona diretamente na lista de certificados AAC do Guardião 120 dias / Calculadora 600h
      const currentAac = getVaultItem('cagp_aac_120d_certs_v1') || [];
      const newCert = {
        id: `curso-${course.id}-${Date.now()}`,
        title: course.title,
        mod: course.certifier ? `Curso Livre (${course.certifier})` : 'Extensão / Cursos Abertos ENAP',
        date: new Date().toISOString().split('T')[0],
        hours: course.hours,
      };
      setVaultItem('cagp_aac_120d_certs_v1', [...currentAac, newCert]);

      toast.success(
        `+${course.hours}h ACG simuladas! "${course.title}" foi enviado para a Calculadora 600h e Alerta 120 Dias.`,
        { duration: 4500 }
      );
    } catch (e) {
      console.error('Erro ao salvar curso na calculadora', e);
      toast.error('Erro ao salvar no cofre discente.');
    }
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
      {/* Cursos Livres Oficiais do CAGP — Proposta 10 da Chapa Semente */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-heading font-black uppercase text-[#5B2A85] tracking-wider">
                Proposta 10 da Chapa Semente • Formação Livre UFMG
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFEEDB] border-2 border-[#1F1F1F] text-xs font-heading font-black uppercase text-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F]">
                Ferramenta Criada pela Chapa Semente
              </span>
            </div>
            <h3 className="text-lg font-heading font-black text-foreground flex items-center gap-2 m-0">
              <i className="bi bi-mortarboard-fill text-primary" aria-hidden="true"></i>
              Cursos Livres & Oficinas do CAGP / UFMG (2026)
            </h3>
          </div>
          <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-white border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F] text-foreground">
            Certificados Válidos para ACG / AAC
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CAGP_COURSES.map((cur) => {
            const isSimulated = savedCourses.includes(cur.id);
            return (
              <motion.div
                key={cur.id}
                whileHover={{ x: -2, y: -3 }}
                transition={tactileSpring}
                className="p-5 rounded-xl border-2 border-[#1F1F1F] bg-white shadow-[3px_3px_0_0_#1F1F1F] hover:shadow-[6px_6px_0px_#1F1F1F] flex flex-col justify-between gap-4 transition-shadow"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className={`text-xs font-heading font-black uppercase px-2.5 py-0.5 rounded-md border-2 ${cur.color} shadow-[2px_2px_0_0_#1F1F1F]`}>
                      {cur.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-black px-2 py-0.5 rounded-md bg-[#1F1F1F] text-[#FFEEDB] border-2 border-[#1F1F1F]">
                      <i className="bi bi-patch-check-fill" aria-hidden="true"></i>
                      <span>VÁLIDO ACG • {cur.hours}H</span>
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-foreground leading-snug m-0">
                    {cur.title}
                  </h4>

                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed m-0">
                    {cur.desc}
                  </p>

                  <div className="mt-3 p-2.5 rounded-lg bg-[#FAF6F0] border-2 border-[#1F1F1F] text-xs font-mono text-foreground space-y-1">
                    <div><strong>Modalidade:</strong> {cur.modality}</div>
                    <div><strong>Ministrantes:</strong> {cur.speaker}</div>
                    <div className="text-[#5B2A85] font-bold"><strong>⚖️ Enquadramento:</strong> {cur.acgGroup}</div>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-black text-[#5B2A85] uppercase">
                      {cur.status}
                    </span>
                    <span className="font-mono font-bold text-[#166534]">
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
                      })
                    }
                    className={`w-full min-h-[44px] py-2 px-3 rounded-xl text-xs font-heading font-black uppercase border-3 border-[#1F1F1F] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSimulated
                        ? 'bg-[#DCFCE7] text-[#166534] shadow-[2px_2px_0_0_#1F1F1F]'
                        : 'bg-[#5B2A85] text-white shadow-[3px_3px_0_0_#1F1F1F] hover:bg-[#48206B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                    }`}
                  >
                    {isSimulated ? (
                      <>
                        <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                        <span>Inscrito / Simulado nas 600h</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lightning-charge-fill text-[#FFEEDB]" aria-hidden="true"></i>
                        <span>Inscrever / Simular +{cur.hours}h ACG</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Catálogo Curado ENAP / EV.G */}
      <div className="p-4 sm:p-6 rounded-xl bg-card border-2 border-[#1F1F1F] shadow-[5px_5px_0px_#1F1F1F] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-3 border-[#1F1F1F]">
          <div>
            <span className="text-xs font-heading font-black uppercase text-[#5B2A85] tracking-wider">
              Escola Virtual de Governo (EV.G / ENAP) • Curadoria Proposta 10
            </span>
            <h3 className="text-lg sm:text-xl font-heading font-black text-foreground flex items-center gap-2 m-0">
              <i className="bi bi-collection-fill text-primary" aria-hidden="true"></i>
              Catálogo de Cursos Gratuitos ENAP / EV.G (1.045+ Cursos)
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
            className="flex items-center gap-2 bg-[#DCFCE7] text-[#166534] border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] px-3.5 py-2 rounded-xl font-mono text-xs font-black shrink-0 self-start sm:self-auto"
          >
            <i className="bi bi-bookmark-check-fill text-[#166534]" aria-hidden="true"></i>
            <span>{savedCourses.length} cursos simulados nas 600h</span>
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
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] rounded-xl focus:outline-none focus:ring-3 focus:ring-[#5B2A85] focus:border-[#5B2A85] min-h-[46px] font-sans"
            />
            <i className="bi bi-search absolute left-3.5 top-3.5 text-[#5B2A85] text-sm font-bold" aria-hidden="true"></i>
          </div>

          <div className="lg:col-span-5 flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 scroll-mask-x scrollbar-none">
            {[
              { id: 'all', label: 'Todas as Horas' },
              { id: 'curto', label: '≤ 20h (Rápidos)' },
              { id: 'medio', label: '21h–40h' },
              { id: 'longo', label: '> 40h (Intensivos)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedHoursFilter(f.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-heading font-black uppercase border-3 border-[#1F1F1F] transition-all shrink-0 cursor-pointer min-h-[44px] ${
                  selectedHoursFilter === f.id
                    ? 'bg-[#5B2A85] text-white shadow-[3px_3px_0px_#1F1F1F]'
                    : 'bg-white hover:bg-[#FAF6F0] text-foreground shadow-[2px_2px_0px_#1F1F1F]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Eixos Rápidos com .scroll-mask-x e 44x44pt */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-mask-x scrollbar-none text-xs">
          <span className="font-heading font-black uppercase text-xs text-muted-foreground mr-1 shrink-0">
            Filtrar Eixo:
          </span>
          {[
            { id: 'all', label: 'Todos os Eixos' },
            { id: 'licitações', label: 'Licitações & Contratos' },
            { id: 'dados', label: 'Governança & Dados' },
            { id: 'pessoas', label: 'Gestão de Pessoas' },
            { id: 'políticas', label: 'Políticas Públicas' },
            { id: 'orçamento', label: 'Orçamento & Finanças' },
          ].map((ax) => (
            <button
              key={ax.id}
              type="button"
              onClick={() => setSelectedAxis(ax.id)}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-heading uppercase font-extrabold border-2 border-[#1F1F1F] cursor-pointer shrink-0 transition-all ${
                selectedAxis === ax.id
                  ? 'bg-[#1F1F1F] text-[#FFEEDB] shadow-[2px_2px_0_0_#5B2A85]'
                  : 'bg-white hover:bg-[#FAF6F0] text-foreground shadow-[2px_2px_0_0_#1F1F1F]'
              }`}
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
            <span className="text-[#5B2A85]">
              Clique em "Simular / Inscrever" para somar na Calculadora 600h
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
                    className={`p-4 rounded-xl border-2 border-[#1F1F1F] bg-white shadow-[3px_3px_0_0_#1F1F1F] hover:shadow-[6px_6px_0px_#1F1F1F] flex flex-col justify-between gap-3 transition-shadow ${
                      isSaved ? 'ring-3 ring-[#166534] bg-[#F0FDF4]' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-heading font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FAF6F0] border-2 border-[#1F1F1F] text-foreground truncate max-w-[165px]">
                          {c.axis}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-black text-[#1F1F1F] px-2 py-0.5 bg-[#FFEEDB] rounded-md border-2 border-[#1F1F1F] shadow-[2px_2px_0_0_#1F1F1F] shrink-0">
                          <i className="bi bi-patch-check-fill text-[#5B2A85]" aria-hidden="true"></i>
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
                        <span className="text-[#166534]">Válido AAC/Ext</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t-2 border-border">
                      <button
                        type="button"
                        onClick={() => handleAddCourseTo600h(c)}
                        className={`w-full py-2 px-3 text-xs font-heading font-black uppercase rounded-xl border-3 border-[#1F1F1F] transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px] ${
                          isSaved
                            ? 'bg-[#DCFCE7] text-[#166534] shadow-[2px_2px_0px_#1F1F1F] font-bold'
                            : 'bg-[#5B2A85] text-white shadow-[3px_3px_0px_#1F1F1F] hover:bg-[#48206B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <i className="bi bi-check-circle-fill text-[#166534]" aria-hidden="true"></i>
                            <span>Simulado nas 600h</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-plus-circle-fill text-[#FFEEDB]" aria-hidden="true"></i>
                            <span>Simular / Inscrever (+{c.hours}h ACG)</span>
                          </>
                        )}
                      </button>

                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full min-h-[40px] rounded-lg border-2 border-[#1F1F1F] bg-[#FAF6F0] hover:bg-[#FFEEDB] text-xs font-heading font-extrabold uppercase text-[#1F1F1F] transition-colors no-underline"
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
                className="px-6 py-3 bg-[#FFEEDB] text-[#1F1F1F] font-heading font-black text-xs uppercase rounded-xl border-3 border-[#1F1F1F] shadow-[3px_3px_0_0_#1F1F1F] hover:bg-[#5B2A85] hover:text-white active:translate-y-[1px] transition-all cursor-pointer min-h-[48px]"
              >
                Carregar Mais Cursos Gratuitos (+18)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
