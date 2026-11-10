import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { asset } from '@/lib/paths';

const SETE_DIRETORIAS = [
  {
    sigla: 'DIPRE',
    nome: 'I. Diretoria da Presidência',
    artigo: 'Art. 24º, I & Art. 28º',
    cor: '#9E2424',
    composicao: 'Presidente, Vice-Presidente e Assessores (Representantes Legais)',
    atribuicoes:
      'Representar externamente o CAGP, coordenar as unidades administrativas, assinar convênios e elaborar o Planejamento Financeiro junto à DIFI.',
  },
  {
    sigla: 'DIJUR',
    nome: 'II. Diretoria de Assuntos Jurídicos',
    artigo: 'Art. 24º, II & Art. 29º',
    cor: '#5B2A85',
    composicao: 'Diretor(a) Jurídico(a), Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Zelar pelo cumprimento do Regimento Interno, manter a regularidade do CNPJ, redigir atas oficiais e prestar suporte normativo aos discentes.',
  },
  {
    sigla: 'DIFI',
    nome: 'III. Diretoria Financeira',
    artigo: 'Art. 24º, III & Art. 30º',
    cor: '#266264',
    composicao: 'Diretor(a) Financeiro(a), Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Gerir o patrimônio e recursos financeiros, elaborar balancetes conforme o Anexo I e disponibilizar livros contábeis em até 3 dias letivos (Art. 15º, V).',
  },
  {
    sigla: 'DIAC',
    nome: 'IV. Diretoria Acadêmica',
    artigo: 'Art. 24º, IV & Art. 31º',
    cor: '#FE8812',
    composicao: 'Diretor(a) Acadêmico(a), Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Articular melhorias na grade curricular N-20229, dialogar com o Colegiado e NDE, promover debates científicos e orientar discentes sobre normas.',
  },
  {
    sigla: 'DIAP',
    nome: 'V. Diretoria de Articulação e Assuntos Políticos',
    artigo: 'Art. 24º, V & Art. 32º',
    cor: '#C4161C',
    composicao: 'Diretor(a) de Articulação Política, Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Representar os estudantes perante o DA FAFICH, DCE UFMG, ENEAP e FENEAP, liderando pautas de permanência estudantil e restaurante universitário.',
  },
  {
    sigla: 'DICULT',
    nome: 'VI. Diretoria de Cultura',
    artigo: 'Art. 24º, VI & Art. 33º',
    cor: '#5B2A85',
    composicao: 'Diretor(a) de Cultura, Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Promover eventos culturais, integração de calouros, atividades artísticas e gerir a convivência democrática no Espaço do CAGP.',
  },
  {
    sigla: 'DIMAC',
    nome: 'VII. Diretoria de Marketing e Comunicação',
    artigo: 'Art. 24º, VII & Art. 34º',
    cor: '#1F1F1F',
    composicao: 'Diretor(a) de Marketing e Comunicação, Vice-Diretor(a) e Assessores',
    atribuicoes:
      'Gerir a identidade visual oficial, canais digitais, imprensa discente, transparência ativa de editais e divulgação de assembleias.',
  },
];

const COMISSAO_REFORMULACAO_2024 = [
  'Amanda Alves Ribeiro',
  'Fernanda Teixeira Dias Lopes',
  'Gabriel Ferreira Alvarenga',
  'João Lucas de Lima Condé',
  'Nayara Angelina Miranda Cassiano de Oliveira',
  'Nina Queirolo Lage',
  'Thales Cafiero Braga',
];

export const GestaoDiretoriaAndEstatuto: React.FC = () => {
  return (
    <section className="space-y-6 my-6" aria-label="Estrutura Regimental das 7 Diretorias do CAGP">
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-white border-2 border-border shadow p-1.5 flex items-center justify-center shrink-0">
                <img
                  src={asset('/logos/semente/semente-simbolo.webp')}
                  alt="Chapa Semente"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="secondary">CHAPA SEMENTE • GESTÃO ELEITA</Badge>
                  <Badge variant="default">REGIMENTO INTERNO DE 14/10/2024</Badge>
                </div>
                <CardTitle className="text-xl">
                  As 7 Diretorias Regimentais do CAGP (Art. 24º a 34º)
                </CardTitle>
                <CardDescription className="text-xs font-medium text-muted-foreground">
                  Estrutura mínima obrigatória de 8 representantes eleitos, suprapartidária, autônoma e regida pelos princípios da Administração Pública (LIMPE).
                </CardDescription>
              </div>
            </div>

            <Button asChild variant="default" size="sm">
              <a
                href={asset('/documentos/regimento-interno-cagp-ufmg.pdf')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar Regimento 2024 (PDF) ↗
              </a>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Grid das 7 Diretorias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SETE_DIRETORIAS.map((dir) => (
              <div
                key={dir.sigla}
                className="p-4 rounded-xl border-2 border-border bg-white shadow-[3px_3px_0_0_#1F1F1F] flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black text-white border-3 border-border"
                      style={{ backgroundColor: dir.cor }}
                    >
                      {dir.sigla}
                    </span>
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      {dir.artigo}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm font-black text-foreground">
                    {dir.nome}
                  </h4>
                  <p className="text-xs text-[#3F3C38] leading-relaxed">{dir.atribuicoes}</p>
                </div>
                <div className="pt-2 border-t-2 border-border text-xs font-mono font-bold text-primary">
                  {dir.composicao}
                </div>
              </div>
            ))}
          </div>

          {/* Linha Sucessória e Comissão de Reformulação 2024 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border-2 border-border bg-card shadow space-y-2">
              <Badge variant="ufmg">LINHA SUCESSÓRIA &amp; TRANSPARÊNCIA (ART. 15º E 26º)</Badge>
              <h4 className="font-heading text-sm font-black text-foreground">
                Sucessão Presidencial e Direito de Fiscalização
              </h4>
              <p className="text-xs text-[#3F3C38] leading-relaxed">
                Pelo <strong>Art. 26º</strong>, na vacância da Presidência assumem sucessivamente: 1º Vice-Presidência (DIPRE) → 2º Diretoria Jurídica (DIJUR) → 3º Diretoria Financeira (DIFI). Pelo <strong>Art. 15º, V</strong>, todo estudante matriculado tem direito de examinar as contas mediante requerimento, com prazo máximo de <strong>3 dias letivos</strong> para exibição.
              </p>
            </div>

            <div className="p-4 rounded-xl border-2 border-border bg-card shadow space-y-2">
              <Badge variant="teal">HISTÓRICO • REFORMULAÇÃO ESTATUTÁRIA DE 14/10/2024</Badge>
              <h4 className="font-heading text-sm font-black text-foreground">
                Comissão de Reformulação do Regimento Interno
              </h4>
              <p className="text-xs text-muted-foreground">
                Revogou o Estatuto de 30/09/2010 e o Regimento de 04/02/2021. Membros signatários:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMISSAO_REFORMULACAO_2024.map((nome) => (
                  <span
                    key={nome}
                    className="px-2 py-0.5 rounded-md border-3 border-border bg-white text-xs font-heading font-extrabold text-foreground"
                  >
                    {nome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
