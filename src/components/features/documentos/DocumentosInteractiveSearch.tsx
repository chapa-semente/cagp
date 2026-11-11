import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from '@/components/ui/menubar';
import { DatePicker } from '@/components/ui/date-picker';
import { ArrowUpRight, Copy, FileText } from '@/components/ui/icons';
import { asset, route } from '@/lib/paths';
import { compartilhar, urlAbsoluta } from '@/lib/compartilhar';
import maisPedidos from '@/data/documentosMaisPedidos.json';

// Documento que tem endereço curto (/doc/<id>) manda esse endereço, que tem prévia com banner.
const ENDERECO_CURTO = new Map<string, string>(
  maisPedidos.grupos.flatMap((g) => g.documentos.map((d) => [d.arquivo, d.id] as [string, string])),
);

function mandarDocumento(doc: { title: string; pdf: string; slug?: string }) {
  const curto = ENDERECO_CURTO.get(doc.pdf);
  const caminho = curto ? route(`/doc/${curto}`) : doc.slug ? route(`/documentos/${doc.slug}`) : asset(doc.pdf);
  return compartilhar({
    titulo: doc.title,
    corpo: `*${doc.title}*\n${doc.slug && !curto ? 'Dá pra ler no celular, sem baixar o PDF:' : 'PDF pra baixar:'}`,
    url: urlAbsoluta(caminho),
    tom: 'util',
  });
}
import { tactileSpring } from '@/lib/motion';

interface DocEntry {
  title: string;
  category: 'Normativas GP' | 'Formulários' | 'Estágio & TCC' | 'Direitos & UFMG';
  pdf: string;
  slug?: string;
  desc: string;
}

const CANONICAL_DOCS: DocEntry[] = [
  {
    title: 'Regulamento do Curso de Graduação em Gestão Pública (N-20229)',
    category: 'Normativas GP',
    pdf: '/documentos/regulamento-gestao-publica-ufmg.pdf',
    slug: 'regulamento-gestao-publica-ufmg',
    desc: 'Regras de integralização (3.000h), AAC (300h), Extensão (300h), Estágio (300h) e TCC.',
  },
  {
    title: 'Projeto Pedagógico do Curso (PPC 2020)',
    category: 'Normativas GP',
    pdf: '/documentos/ppc-gestao-publica-ufmg.pdf',
    slug: 'ppc-gestao-publica-ufmg',
    desc: 'Concepção pedagógica, perfil do egresso, matriz curricular e eixos formativos.',
  },
  {
    title: 'Ementário Oficial de Disciplinas de Gestão Pública',
    category: 'Normativas GP',
    pdf: '/documentos/ementario-gestao-publica-ufmg.pdf',
    slug: 'ementario-gestao-publica-ufmg',
    desc: 'Ementas e bibliografias de todas as disciplinas obrigatórias e optativas.',
  },
  {
    title: 'Edital de Convocação de Eleições do CAGP 2026',
    category: 'Normativas GP',
    pdf: '/documentos/edital-eleicoes-cagp-2026.pdf',
    slug: 'edital-eleicoes-cagp-2026',
    desc: 'Edital oficial publicado pela Junta Eleitoral para a eleição da Diretoria do CAGP (votação em 25 e 26/11/2026 no CAGP).',
  },
  {
    title: 'Regimento Interno do CAGP (14 de Outubro de 2024)',
    category: 'Normativas GP',
    pdf: '/documentos/regimento-interno-cagp-ufmg.pdf',
    slug: 'regimento-interno-cagp-ufmg',
    desc: 'Estatuto vigente com as 7 Diretorias executivas, Junta Eleitoral e prestação de contas.',
  },
  {
    title: 'Relatório de Percurso — Bacharelado Núcleo Geral',
    category: 'Normativas GP',
    pdf: '/documentos/percurso-bacharelado-nucleo-geral.pdf',
    slug: 'percurso-bacharelado-nucleo-geral',
    desc: 'Matriz curricular padrão de 3.000h com 720h de optativas gerais.',
  },
  {
    title: 'Relatório de Percurso — Formação Complementar Aberta (FCA)',
    category: 'Normativas GP',
    pdf: '/documentos/percurso-bacharelado-nucleo-complementar.pdf',
    slug: 'percurso-bacharelado-nucleo-complementar',
    desc: 'Percurso com 300h em outros cursos da UFMG ou formação transversal (a partir do 5ºP).',
  },
  {
    title: 'Relatório de Percurso — Núcleo Avançado (Pós-Graduação)',
    category: 'Normativas GP',
    pdf: '/documentos/percurso-bacharelado-nucleo-avancado.pdf',
    slug: 'percurso-bacharelado-nucleo-avancado',
    desc: 'Percurso com 45h a 120h em disciplinas de Mestrado/Doutorado (a partir do 7ºP).',
  },
  {
    title: 'Requerimento de Atividade Integralizadora de Crédito (N-20229)',
    category: 'Formulários',
    pdf: '/documentos/requerimento-atividade-integralizadora-credito-v20229.pdf',
    desc: 'Formulário oficial e tabela de códigos DCP108 a DCP208 para AAC e Extensão.',
  },
  {
    title: 'Requerimento de Aproveitamento de Estudos (Colegiado)',
    category: 'Formulários',
    pdf: '/documentos/requerimento-aproveitamento-de-estudos-colegiado.pdf',
    desc: 'Solicitação de dispensa de disciplinas cursadas anteriormente (prazo até o 2º período).',
  },
  {
    title: 'Requerimento de Formação Complementar Aberta (FCA)',
    category: 'Formulários',
    pdf: '/documentos/requerimento-formacao-complementar-aberta-fca.pdf',
    desc: 'Pedido fundamentado para cursar matérias de outros departamentos.',
  },
  {
    title: 'Termo de Aceite de Orientador(a) de TCC',
    category: 'Estágio & TCC',
    pdf: '/documentos/termo-aceite-orientador-tcc.pdf',
    desc: 'Formulário obrigatório para matrícula em DCP 089 e DCP 137.',
  },
  {
    title: 'Resolução GP nº 01/2019 — Regulamento de Estágio Curricular',
    category: 'Estágio & TCC',
    pdf: '/documentos/resolucao-01-2019-estagio-curricular.pdf',
    desc: 'Normas do estágio obrigatório (DCP 135/136), não-obrigatório e dispensa Art. 41.',
  },
  {
    title: 'Portaria PRAE nº 1.286/2026 — Permanência e Assistência Estudantil',
    category: 'Direitos & UFMG',
    pdf: '/documentos/portaria-prae-1286-2026-permanencia-estudantil.pdf',
    desc: 'Diretrizes da política de assistência estudantil, alimentação nos RUs e FUMP.',
  },
  {
    title: 'Resolução UFMG nº 07/2025 — Política Contra o Assédio',
    category: 'Direitos & UFMG',
    pdf: '/documentos/resolucao-ufmg-07-2025-contra-o-assedio.pdf',
    desc: 'Prevenção e enfrentamento ao assédio moral e sexual na UFMG.',
  },
  {
    title: 'Resolução PRAE nº 09/2015 & Requerimento de Nome Social',
    category: 'Direitos & UFMG',
    pdf: '/documentos/requerimento-inclusao-nome-social.pdf',
    desc: 'Garantia do uso do nome social nos registros acadêmicos e carteirinha.',
  },
];

const CATEGORIES = ['Todos', 'Normativas GP', 'Formulários', 'Estágio & TCC', 'Direitos & UFMG'] as const;

export const DocumentosInteractiveSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [filterDate, setFilterDate] = useState<Date | undefined>();

  const filtered = useMemo(() => {
    return CANONICAL_DOCS.filter((doc) => {
      const matchesCat = selectedCat === 'Todos' || doc.category === selectedCat;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.desc.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, selectedCat]);

  return (
    <section className="my-6" aria-label="Busca Instantânea no Acervo de Documentos">
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">
                Buscar documento
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">
                Se o texto no site e o PDF discordarem, vale o PDF oficial.
              </CardDescription>
            </div>
            <div className="w-full sm:w-72">
              <Input
                type="search"
                placeholder="Filtrar por nome, sigla, artigo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div role="group" aria-label="Tipo de documento" className="flex items-center gap-2 overflow-x-auto scroll-mask-x scrollbar-none py-1 px-0.5 pt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className="cagp-chip"
                aria-pressed={selectedCat === cat}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((doc) => (
                <ContextMenu key={doc.pdf}>
                  <ContextMenuTrigger asChild>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={tactileSpring}
                      className="p-4 rounded-xl border-2 border-border bg-white shadow-md hover:shadow-xl hover:translate-x-[-1px] hover:translate-y-[-1px] flex flex-col justify-between gap-3 transition-all cursor-context-menu"
                    >
                      <div className="space-y-1.5">
                        <Badge variant="secondary" className="text-xs">
                          {doc.category}
                        </Badge>
                        <h4 className="font-heading text-xs font-black text-foreground leading-snug">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{doc.desc}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-border/20">
                        <a
                          href={asset(doc.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 min-h-[40px] inline-flex items-center rounded-lg border-3 border-border bg-secondary hover:bg-secondary-hover text-secondary-foreground text-xs font-mono font-bold no-underline shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        >
                          Baixar / Abrir PDF <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        </a>
                        {doc.slug && (
                          <a
                            href={route(`/documentos/${doc.slug}`)}
                            className="px-3 py-1.5 min-h-[40px] inline-flex items-center rounded-lg border-3 border-border bg-white hover:bg-background text-foreground text-xs font-mono font-bold no-underline shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                          >
                            Ler no site <i className="bi bi-arrow-right" aria-hidden="true"></i>
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => mandarDocumento(doc)}
                          aria-label={`Mandar ${doc.title} pra alguém`}
                          className="px-3 py-1.5 min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border-3 border-border bg-white hover:bg-background text-foreground text-xs font-mono font-bold shadow-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        >
                          <i className="bi bi-share" aria-hidden="true"></i> Mandar
                        </button>
                      </div>
                    </motion.div>
                  </ContextMenuTrigger>

                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => window.open(asset(doc.pdf), '_blank')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Abrir PDF Oficial <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                    </ContextMenuItem>
                    {doc.slug && (
                      <ContextMenuItem onClick={() => { window.location.href = route(`/documentos/${doc.slug}`); }}>
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Ver Transcrição Web
                      </ContextMenuItem>
                    )}
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => {
                      const fullUrl = window.location.origin + asset(doc.pdf);
                      navigator.clipboard.writeText(fullUrl);
                      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(15);
                      (window as any).cagpToast?.('Link do PDF copiado para a área de transferência!', 'bi-clipboard-check');
                    }}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar Link Direto
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
