import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { asset } from '@/lib/paths';

const COMPARATIVO_HORAS = [
  {
    componente: 'Disciplinas Obrigatórias (Núcleo Específico)',
    geral: '1.560h (104 cr)',
    fca: '1.560h (104 cr)',
    avancado: '1.560h (104 cr)',
  },
  {
    componente: 'Estágio Curricular Obrigatório (DCP 135 + DCP 136)',
    geral: '300h (20 cr)',
    fca: '300h (20 cr)',
    avancado: '300h (20 cr)',
  },
  {
    componente: 'Formação Livre (Disciplinas fora do PPC)',
    geral: '120h (8 cr)',
    fca: '120h (8 cr)',
    avancado: '120h (8 cr)',
  },
  {
    componente: 'Formação em Extensão (Laboratórios DCP 195/196 + AAC Ext.)',
    geral: '300h (20 cr)',
    fca: '300h (20 cr)',
    avancado: '300h (20 cr)',
  },
  {
    componente: 'Núcleo Complementar (FCA em outro curso ou Transversal)',
    geral: '0h',
    fca: '300h (20 cr)',
    avancado: '0h',
  },
  {
    componente: 'Núcleo Avançado (Disciplinas de Mestrado ou Doutorado)',
    geral: '0h',
    fca: '0h',
    avancado: '45h a 120h (3 a 8 cr)',
  },
  {
    componente: 'Optativas Gerais do PPC (+ AAC até o limite global de 300h)',
    geral: 'Pelo menos 720h',
    fca: 'Pelo menos 420h',
    avancado: '600h a 675h',
  },
  {
    componente: 'CARGA HORÁRIA TOTAL PARA INTEGRALIZAÇÃO',
    geral: '3.000h (200 cr)',
    fca: '3.000h (200 cr)',
    avancado: '3.000h (200 cr)',
    destaque: true,
  },
];

export const PercursosComparativeMatrix: React.FC = () => {
  return (
    <section className="space-y-6 my-6" aria-label="Comparativo Oficial dos 3 Percursos Curriculares N-20229">
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant="default">VERSÃO CURRICULAR N-20229 (3.000 HORAS)</Badge>
                <Badge variant="secondary">3 PERCURSOS OFICIAIS DO PPC</Badge>
              </div>
              <CardTitle className="text-xl uppercase">
                Matriz Comparativa dos 3 Percursos Curriculares (Geral, FCA e Pós)
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#57534E]">
                Todo ingressante inicia no Núcleo Geral e pode optar por migrar para a Formação Complementar Aberta (a partir do 5º período) ou para o Núcleo Avançado de Pós-Graduação (a partir do 7º período).
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* 3 Cards Explicativos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f5f7] shadow-[3px_3px_0px_#16181d] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="default">1. NÚCLEO GERAL (INGRESSO PADRÃO)</Badge>
                <h4 className="font-heading text-sm font-black uppercase text-[#16181d]">
                  Você entra aqui (e pode permanecer)
                </h4>
                <p className="text-xs text-[#3F3C38] leading-relaxed">
                  Percurso clássico com <strong>1.020h</strong> destinadas ao bloco de optativas, extensão (300h) e AAC, permitindo amplo aprofundamento nas disciplinas eletivas do DCP, FACE e FAFICH.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={asset('/documentos/percurso-bacharelado-nucleo-geral.pdf')} target="_blank" rel="noopener noreferrer">
                  Relatório Núcleo Geral (PDF) ↗
                </a>
              </Button>
            </div>

            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f5f7] shadow-[3px_3px_0px_#16181d] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="secondary">2. NÚCLEO COMPLEMENTAR (FCA)</Badge>
                <h4 className="font-heading text-sm font-black uppercase text-[#16181d]">
                  Migração a partir do 5º Período
                </h4>
                <p className="text-xs text-[#3F3C38] leading-relaxed">
                  Permite integralizar <strong>300h (20 créditos)</strong> em outro curso de graduação da UFMG (Direito, Economia, Administração, Ciências Sociais) ou em Formação Transversal (Res. CEPE 19/2014).
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={asset('/documentos/percurso-bacharelado-nucleo-complementar.pdf')} target="_blank" rel="noopener noreferrer">
                  Relatório FCA Complementar (PDF) ↗
                </a>
              </Button>
            </div>

            <div className="p-4 rounded-xl border-3 border-[#16181d] bg-[#f4f5f7] shadow-[3px_3px_0px_#16181d] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="teal">3. NÚCLEO AVANÇADO (PÓS-GRADUAÇÃO)</Badge>
                <h4 className="font-heading text-sm font-black uppercase text-[#16181d]">
                  Migração a partir do 7º Período
                </h4>
                <p className="text-xs text-[#3F3C38] leading-relaxed">
                  Voltado à carreira acadêmica e pesquisa: permite cursar de <strong>45h a 120h (3 a 8 créditos)</strong> diretamente em disciplinas de Mestrado e Doutorado da UFMG ainda durante a graduação.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href={asset('/documentos/percurso-bacharelado-nucleo-avancado.pdf')} target="_blank" rel="noopener noreferrer">
                  Relatório Núcleo Avançado (PDF) ↗
                </a>
              </Button>
            </div>
          </div>

          {/* Tabela Neobrutalista Comparativa */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Componente Curricular / Grupo SIGA</TableHead>
                <TableHead>1. Núcleo Geral</TableHead>
                <TableHead>2. FCA (Complementar)</TableHead>
                <TableHead>3. Núcleo Avançado (Pós)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARATIVO_HORAS.map((row) => (
                <TableRow
                  key={row.componente}
                  className={row.destaque ? 'bg-[#FFFDF9] font-black' : ''}
                >
                  <TableCell className="font-heading text-xs font-extrabold text-[#16181d]">
                    {row.componente}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-[#9E2424]">
                    {row.geral}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-[#5B2A86]">
                    {row.fca}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-[#266264]">
                    {row.avancado}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};
