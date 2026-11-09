import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { asset } from '@/lib/paths';

const MODELOS_ESTAGIO = [
  {
    titulo: '1. Plano de Atividades de Estágio',
    desc: 'Detalhamento das tarefas técnicas a serem desenvolvidas no órgão concedente.',
    pdf: '/documentos/estagio-modelo-plano-de-atividades.pdf',
    docx: '/documentos/estagio-modelo-plano-de-atividades.docx',
    drive: 'https://docs.google.com/document/d/100ECMbDcwXjIUojwU6WwcN0eWN72NIjI/edit',
  },
  {
    titulo: '2. Termo de Compromisso (Com Convênio Prévio)',
    desc: 'Para órgãos públicos, autarquias e instituições já conveniadas à UFMG.',
    pdf: '/documentos/estagio-modelo-termo-de-compromisso-com-convenio.pdf',
    docx: '/documentos/estagio-modelo-termo-de-compromisso-com-convenio.docx',
    drive: 'https://docs.google.com/document/d/1bzFYhmoGkgcEnBwMqSDBlENP-r2ke1X_/edit',
  },
  {
    titulo: '3. Termo de Compromisso (Sem Vínculo Anterior)',
    desc: 'Minuta padrão quando a concedente celebra o instrumento diretamente com a UFMG.',
    pdf: '/documentos/estagio-modelo-termo-de-compromisso-sem-vinculo.pdf',
    docx: '/documentos/estagio-modelo-termo-de-compromisso-sem-vinculo.docx',
    drive: 'https://docs.google.com/document/d/19-Elm9v0ztx3sWgwPsRGB-NuaxoaByI4/edit',
  },
  {
    titulo: '4. Relatório Semestral de Estágio',
    desc: 'Acompanhamento periódico de desempenho assinado pelo supervisor e estagiário.',
    pdf: '/documentos/estagio-modelo-relatorio-semestral.pdf',
    docx: '/documentos/estagio-modelo-relatorio-semestral.docx',
    drive: 'https://docs.google.com/document/d/1SNyHiDvFQocVO5W6FiJIBtomJasQis_d/edit',
  },
  {
    titulo: '5. Relatório Final de Estágio Supervisionado',
    desc: 'Avaliação conclusiva para integralização de DCP 135 (180h) ou DCP 136 (120h).',
    pdf: '/documentos/estagio-modelo-relatorio-final.pdf',
    docx: '/documentos/estagio-modelo-relatorio-final.docx',
    drive: 'https://docs.google.com/document/d/1fB4afw-U3ODnZrkOjk9R5q3-a8qYNtVV/edit',
  },
  {
    titulo: '6. Requerimento de Aproveitamento Servidor (Art. 41)',
    desc: 'Exclusivo para servidores públicos efetivos, comissionados, empregados públicos ou OSC em função correlata.',
    pdf: '/documentos/estagio-requerimento-integralizacao-experiencia-profissional.pdf',
    docx: '/documentos/estagio-requerimento-integralizacao-experiencia-profissional.docx',
    drive: 'https://docs.google.com/document/d/1QJJ8wLISxpztQFH--V2aYm8-509D6_418o14zSfxbe4/edit',
  },
  {
    titulo: '7. Relatório de Atividades — Aproveitamento Servidor (Art. 41)',
    desc: 'Entregue ao final do semestre no Moodle pelos servidores públicos dispensados pelo Art. 41.',
    pdf: '/documentos/estagio-relatorio-atividades-experiencia-profissional.pdf',
    docx: '/documentos/estagio-relatorio-atividades-experiencia-profissional.docx',
    drive: 'https://docs.google.com/document/d/1Uc3oHwEBM9zbf9tJ2q5N80YPQme3niFh/edit',
  },
];

export const EstagioDocumentDrawerAndGuide: React.FC = () => {
  return (
    <section className="space-y-6 my-6" aria-label="Central de Minutas, Modelos e Aproveitamento Servidor">
      <Card className="bg-white border-3 border-border shadow-md overflow-hidden">
        <CardHeader className="border-b-2 border-border bg-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="default">RESOLUÇÃO GP Nº 01/2019 &amp; CEPE 02/2009</Badge>
                <Badge variant="secondary">300 HORAS OBRIGATÓRIAS (DCP 135 + DCP 136)</Badge>
              </div>
              <CardTitle className="text-lg sm:text-xl font-heading font-black text-foreground m-0">
                Modelos Oficiais, Formulários Google &amp; Aproveitamento Servidor
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground mt-1 max-w-3xl leading-relaxed">
                Acesse todas as minutas editáveis (.DOCX, .PDF e Google Drive) e os formulários eletrônicos de protocolo do Colegiado.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <a
                href="#modelos-estagio"
                className="min-h-[44px] px-3.5 py-2 rounded-xl border-2 border-border bg-white hover:bg-muted text-foreground text-xs font-heading font-bold uppercase no-underline inline-flex items-center gap-1.5 shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
              >
                <i className="bi bi-file-earmark-text" aria-hidden="true" />
                <span>Ver Matriz na Página ↓</span>
              </a>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    variant="accent"
                    size="default"
                    className="min-h-[44px] font-heading font-bold uppercase text-xs border-2 border-border shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    Abrir Gaveta de Minutas (.DOCX / .PDF)
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85dvh] bg-white border-t-3 border-border">
                  <DrawerHeader className="border-b-2 border-border bg-card p-4 sm:p-5">
                    <DrawerTitle className="font-heading text-base sm:text-lg font-black uppercase text-foreground m-0">
                      7 Modelos Oficiais de Estágio — Colegiado GP FAFICH
                    </DrawerTitle>
                    <DrawerDescription className="text-xs text-muted-foreground mt-0.5">
                      Baixe em Word (.docx), PDF ou abra diretamente no Google Docs oficial do curso.
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="p-4 sm:p-5 overflow-y-auto divide-y divide-border max-h-[68dvh]">
                    {MODELOS_ESTAGIO.map((m) => (
                      <div
                        key={m.titulo}
                        className="py-4 first:pt-1 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        <div className="min-w-0 pr-2">
                          <h4 className="font-heading text-xs sm:text-sm font-black text-foreground m-0 mb-1">
                            {m.titulo}
                          </h4>
                          <p className="text-xs text-muted-foreground m-0 leading-relaxed">{m.desc}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <a
                            href={asset(m.pdf)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-secondary hover:bg-[#851E1E] text-white text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                          >
                            Termo (PDF)
                          </a>
                          <a
                            href={asset(m.docx)}
                            download
                            className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-white hover:bg-muted text-foreground text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                          >
                            Modelo (.DOCX)
                          </a>
                          <a
                            href={m.drive}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-border bg-primary hover:bg-[#4A216E] text-white text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                          >
                            Google Docs ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-6">
          {/* 3 Modalidades — Layout Aplanado Sem Cards Aninhados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-2 border-border bg-background space-y-2">
              <Badge variant="default">OBRIGATÓRIO • 7º E 8º PERÍODOS</Badge>
              <h4 className="font-heading text-sm font-black text-foreground m-0">
                DCP 135 (180h) + DCP 136 (120h)
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed m-0 font-medium">
                Total de <strong>300 horas</strong> dedicadas à prática profissional em órgãos governamentais, autarquias, fundações, terceiro setor ou estatais. Exige matrícula no SIGA e homologação prévia do Termo e Plano.
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-border bg-background space-y-2">
              <Badge variant="secondary">NÃO-OBRIGATÓRIO • 1º AO 10º P</Badge>
              <h4 className="font-heading text-sm font-black text-foreground m-0">
                Até 30h Semanais (6h Diárias)
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed m-0 font-medium">
                Compatível com o turno noturno (19h–22h30), exige seguro contra acidentes pessoais custeado pela concedente e pode render até <strong>60h (4 créditos)</strong> como Vivência Profissional Complementar (DCP 208).
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-[#134E4A]/30 bg-[#F0FDF4] space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border border-border bg-[#134E4A] text-white font-mono text-xs font-bold uppercase">
                TRILHA ESPECIAL • ART. 41
              </span>
              <h4 className="font-heading text-sm font-black text-foreground m-0">
                Aproveitamento Servidor (Art. 41)
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed m-0 font-medium">
                Servidores efetivos, comissionados ou empregados públicos em funções correlatas à Gestão Pública podem solicitar dispensa no início do semestre via Google Forms e entregar o Relatório no Moodle ao final.
              </p>
            </div>
          </div>

          {/* Links Diretos para os 2 Formulários Google Forms Oficiais — Banner Integrado Sem Sombra Concorrente */}
          <div className="p-4 rounded-xl border-2 border-border bg-foreground text-background text-white flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="space-y-0.5">
              <h4 className="font-heading text-sm font-black text-white m-0">
                Formulários Google Forms da Seção de Estágio do Colegiado
              </h4>
              <p className="text-xs text-white m-0">
                Protocolo eletrônico oficial homologado pelo Colegiado de Gestão Pública da UFMG.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button asChild variant="accent" size="sm" className="min-h-[44px] font-heading font-bold uppercase text-xs border border-border active:translate-x-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScnRdWYJDa4yERPesbL4IZ-Atk2uPBE4ihR2ht9ho0mIeumMQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitação Inicial de Estágio ↗
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="min-h-[44px] font-heading font-bold uppercase text-xs border border-border active:translate-x-[1px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdIGMGFzJMsnyLTvkDTDVPQddU37S_OO1ABuQbMv5F3wElKLA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Protocolar Aproveitamento Servidor ↗
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
