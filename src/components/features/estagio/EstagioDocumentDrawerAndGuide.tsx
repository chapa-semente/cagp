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
      <Card className="bg-white border-3 border-[#16181d] shadow-[4px_4px_0_0_#16181d]">
        <CardHeader className="border-b-3 border-[#16181d] bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant="default">RESOLUÇÃO GP Nº 01/2019 &amp; CEPE 02/2009</Badge>
                <Badge variant="secondary">300 HORAS OBRIGATÓRIAS (DCP 135 + DCP 136)</Badge>
              </div>
              <CardTitle className="text-xl uppercase">
                Modelos Oficiais, Formulários Google &amp; Aproveitamento Servidor
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">
                Acesse todas as minutas editáveis (.DOCX, .PDF e Google Drive) e os formulários eletrônicos de protocolo do Colegiado.
              </CardDescription>
            </div>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="accent" size="default" className="min-h-[44px]">
                  Abrir Gaveta de Minutas (.DOCX / .PDF)
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[85dvh] bg-white border-t-3 border-[#16181d]">
                <DrawerHeader className="border-b-3 border-[#16181d] bg-card">
                  <DrawerTitle className="font-heading text-lg font-black uppercase text-foreground">
                    7 Modelos Oficiais de Estágio — Colegiado GP FAFICH
                  </DrawerTitle>
                  <DrawerDescription className="text-xs text-muted-foreground">
                    Baixe em Word (.docx), PDF ou abra diretamente no Google Docs oficial do curso.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[68dvh]">
                  {MODELOS_ESTAGIO.map((m) => (
                    <div
                      key={m.titulo}
                      className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] flex flex-col justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-heading text-xs font-black uppercase text-foreground">
                          {m.titulo}
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-1">{m.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={asset(m.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-secondary text-white text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-[2px_2px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                        >
                          Termo (PDF)
                        </a>
                        <a
                          href={asset(m.docx)}
                          download
                          className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-white text-foreground text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-[2px_2px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                        >
                          Modelo (.DOCX)
                        </a>
                        <a
                          href={m.drive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-3 py-2 rounded-lg border-2 border-[#16181d] bg-primary text-white text-xs font-mono font-bold no-underline inline-flex items-center justify-center shadow-[2px_2px_0_0_#16181d] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
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
        </CardHeader>

        <CardContent className="pt-6 space-y-5">
          {/* 3 Modalidades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-2">
              <Badge variant="default">OBRIGATÓRIO • 7º E 8º PERÍODOS</Badge>
              <h4 className="font-heading text-sm font-black uppercase text-foreground">
                DCP 135 (180h) + DCP 136 (120h)
              </h4>
              <p className="text-xs text-[#3F3C38] leading-relaxed">
                Total de <strong>300 horas</strong> dedicadas à prática profissional em órgãos governamentais, autarquias, fundações, terceiro setor ou estatais. Exige matrícula no SIGA e homologação prévia do Termo e Plano.
              </p>
            </div>

            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-white shadow-[4px_4px_0_0_#16181d] space-y-2">
              <Badge variant="secondary">NÃO-OBRIGATÓRIO • 1º AO 10º P</Badge>
              <h4 className="font-heading text-sm font-black uppercase text-foreground">
                Até 30h Semanais (6h Diárias)
              </h4>
              <p className="text-xs text-[#3F3C38] leading-relaxed">
                Compatível com o turno noturno (19h–22h30), exige seguro contra acidentes pessoais custeado pela concedente e pode render até <strong>60h (4 créditos)</strong> como Vivência Profissional Complementar (DCP 208).
              </p>
            </div>

            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#F0FDF4] shadow-[4px_4px_0_0_#16181d] space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md border-2 border-[#16181d] bg-[#134E4A] text-white font-mono text-[10px] font-bold uppercase">
                TRILHA ESPECIAL • ART. 41
              </span>
              <h4 className="font-heading text-sm font-black uppercase text-foreground">
                Aproveitamento Servidor (Art. 41)
              </h4>
              <p className="text-xs text-[#3F3C38] leading-relaxed">
                Servidores efetivos, comissionados ou empregados públicos em funções correlatas à Gestão Pública podem solicitar dispensa no início do semestre via Google Forms e entregar o Relatório no Moodle ao final.
              </p>
            </div>
          </div>

          {/* Links Diretos para os 2 Formulários Google Forms Oficiais */}
          <div className="p-4 rounded-xl border-3 border-[#16181d] bg-foreground text-white shadow-[4px_4px_0_0_#16181d] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase text-accent block">
                PROTOCOLO ELETRÔNICO OFICIAL (NÃO ENVIAR PEDIDOS SOLTOS POR E-MAIL)
              </span>
              <h4 className="font-heading text-sm font-black uppercase">
                Formulários Google Forms da Seção de Estágio do Colegiado
              </h4>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button asChild variant="accent" size="sm" className="min-h-[44px]">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScnRdWYJDa4yERPesbL4IZ-Atk2uPBE4ihR2ht9ho0mIeumMQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitação Inicial de Estágio ↗
                </a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="min-h-[44px]">
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
