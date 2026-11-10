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
import { RadarChart } from '@/components/ui/radar-chart';
import { NativeSelect } from '@/components/ui/native-select';
import { ComparisonTable, type ComparisonRow } from '@/components/boldkit/blocks/comparison-table';
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

const RADAR_DATA = [
  { subject: 'Obrigatórias', geral: 1560, fca: 1560, avancado: 1560 },
  { subject: 'Estágio', geral: 300, fca: 300, avancado: 300 },
  { subject: 'Extensão', geral: 300, fca: 300, avancado: 300 },
  { subject: 'Formação Livre', geral: 120, fca: 120, avancado: 120 },
  { subject: 'FCA Compl.', geral: 0, fca: 300, avancado: 0 },
  { subject: 'Pós-Graduação', geral: 0, fca: 0, avancado: 120 },
  { subject: 'Optativas Livres', geral: 720, fca: 420, avancado: 600 },
];

const RADAR_CONFIG = {
  geral: { label: '01-01 Geral', color: 'var(--primary)' },
  fca: { label: '01-02 FCA Complementar', color: 'var(--accent)' },
  avancado: { label: '01-03 Avançado Pós', color: 'var(--secondary)' },
};

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Disciplinas Obrigatórias (104 créditos)',
    values: ['1.560h', '1.560h', '1.560h'],
  },
  {
    feature: 'Estágio Curricular Supervisionado (DCP 135/136)',
    values: ['300h', '300h', '300h'],
  },
  {
    feature: 'Formação Livre (Fora do PPC na UFMG)',
    values: ['120h', '120h', '120h'],
  },
  {
    feature: 'Formação em Extensão Universitária',
    values: ['300h', '300h', '300h'],
  },
  {
    feature: 'Formação Complementar Aberta (FCA em outro curso)',
    values: [false, '300h (20 cr)', false],
  },
  {
    feature: 'Créditos em Disciplinas de Pós-Graduação (Stricto Sensu)',
    values: [false, false, '45h a 120h'],
  },
  {
    feature: 'Optativas Livres do PPC Gestão Pública',
    values: ['Pelo menos 720h', 'Pelo menos 420h', '600h a 675h'],
  },
  {
    feature: 'Aproveitamento Direto para Mestrado UFMG',
    values: [false, false, true],
  },
  {
    feature: 'Carga Horária Mínima para Integralização',
    values: ['3.000h', '3.000h', '3.000h'],
  },
];

export const PercursosComparativeMatrix: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = React.useState<string>('todos');

  return (
    <section className="space-y-6 my-6" aria-label="Comparativo Oficial dos 3 Percursos Curriculares N-20229">
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant="default">VERSÃO CURRICULAR N-20229 (3.000 HORAS)</Badge>
                <Badge variant="secondary">3 PERCURSOS OFICIAIS DO PPC</Badge>
              </div>
              <CardTitle className="text-xl">
                Matriz Comparativa dos 3 Percursos Curriculares (Geral, FCA e Pós)
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">
                Todo ingressante inicia no Núcleo Geral e pode optar por migrar para a Formação Complementar Aberta (a partir do 5º período) ou para o Núcleo Avançado de Pós-Graduação (a partir do 7º período).
              </CardDescription>
            </div>
            <div className="w-full sm:w-64">
              <span className="text-xs font-mono font-bold uppercase text-muted-foreground block mb-1">
                Destacar Percurso:
              </span>
              <NativeSelect
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                aria-label="Selecionar percurso para destaque"
                className="bg-white"
              >
                <option value="todos">Todos os Percursos</option>
                <option value="geral">1. Núcleo Geral (Padrão)</option>
                <option value="fca">2. Núcleo Complementar (FCA)</option>
                <option value="avancado">3. Núcleo Avançado (Pós-Graduação)</option>
              </NativeSelect>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* 3 Cards Explicativos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border-2 border-border bg-white shadow flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="default">1. NÚCLEO GERAL (INGRESSO PADRÃO)</Badge>
                <h4 className="font-heading text-sm font-black text-foreground">
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

            <div className="p-4 rounded-xl border-2 border-border bg-white shadow flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="secondary">2. NÚCLEO COMPLEMENTAR (FCA)</Badge>
                <h4 className="font-heading text-sm font-black text-foreground">
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

            <div className="p-4 rounded-xl border-2 border-border bg-white shadow flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <Badge variant="teal">3. NÚCLEO AVANÇADO (PÓS-GRADUAÇÃO)</Badge>
                <h4 className="font-heading text-sm font-black text-foreground">
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

          {/* Gráfico Radar Recharts: Comparação Geométrica dos 3 Percursos */}
          <div className="p-4 bg-background border-2 border-border rounded-xl shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-heading text-xs uppercase font-extrabold text-foreground">
                Perfil Geométrico de Distribuição de Carga Horária
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-card border border-border rounded shadow-xs text-muted-foreground">
                Radar Recharts Multi-Eixo
              </span>
            </div>
            <div className="h-[300px] w-full">
              <RadarChart
                data={RADAR_DATA}
                dataKeys={['geral', 'fca', 'avancado']}
                config={RADAR_CONFIG}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* BoldKit Comparison Table dos 3 Percursos */}
          <div className="overflow-x-auto scroll-mask-x scrollbar-none">
            <ComparisonTable
              title="Comparativo das Matrizes Curriculares"
              subtitle="Critérios de integralização e distribuição de créditos por percurso"
              columns={['01-01 Geral', '01-02 FCA Aberta', '01-03 Avançado Pós']}
              rows={COMPARISON_ROWS}
              highlightColumn={selectedTrack === 'fca' ? 1 : selectedTrack === 'avancado' ? 2 : 0}
              className="py-2 px-0"
            />
          </div>

          {/* Tabela Neobrutalista Comparativa */}
          <div className="overflow-x-auto scroll-mask-x scrollbar-none">
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
                    className={row.destaque ? 'bg-card font-black' : ''}
                  >
                    <TableCell className="font-heading text-xs font-extrabold text-foreground">
                      {row.componente}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-secondary">
                      {row.geral}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-primary">
                      {row.fca}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-[#266264]">
                      {row.avancado}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
