// scripts/export-content-collections.mjs
// Exporta os dados simulados e JSONs para Markdown com Frontmatter em /conteudo/

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const CONTEUDO_DIR = path.join(ROOT_DIR, 'conteudo');
const NOTICIAS_DIR = path.join(CONTEUDO_DIR, 'noticias');
const DISCIPLINAS_DIR = path.join(CONTEUDO_DIR, 'disciplinas');
const SRC_DISCIPLINAS_DIR = path.join(ROOT_DIR, 'src/content/disciplinas');

fs.mkdirSync(NOTICIAS_DIR, { recursive: true });
fs.mkdirSync(DISCIPLINAS_DIR, { recursive: true });

// 1. Exportar Notícias
const simulatedNewsPath = path.join(ROOT_DIR, 'src/lib/simulatedData.ts');
const simulatedContent = fs.readFileSync(simulatedNewsPath, 'utf8');

// Extrair o array SIMULATED_NEWS avaliando ou parseando
// Como é TypeScript simples, podemos importar dinamicamente ou construir as notícias
const newsItems = [
  {
    id: 'sim-news-assembleia',
    slug: 'assembleia-ru-noturno-bolsas-fafich',
    category: 'assembleia',
    tag: 'Assembleia Geral • CAGP',
    tagColor: 'burgundy',
    title: 'Assembleia discute ampliação do RU Noturno, bolsas e pauta da FAFICH',
    summary: 'Convocação ordinária no Auditório B102 para deliberar sobre permanência no turno noturno, fluxo do Bandejão e representação discente nos colegiados.',
    author: 'Diretoria Executiva & Secretaria-Geral do CAGP',
    readingTime: '4 min de leitura',
    meta: 'Auditório B102 • 18h30',
    dateLabel: 'Pauta demonstrativa • Diretoria CAGP',
    ctaLabel: 'Consultar Estatuto e Governança',
    ctaHref: '/sobre#governanca',
    relatedLinks: [
      { label: 'Estatuto e Governança do CAGP', href: '/sobre#governanca' },
      { label: 'Portal da Transparência do CAGP', href: '/transparencia' },
      { label: 'Diretorias e Gestão Discente', href: '/gestao' }
    ],
    relevantRoles: ['calouro', 'veterano', 'formando', 'ingressar'],
    motif: 'assembleia',
    highlights: [
      'Local e horário: Auditório B102 (FAFICH) às 18h30 em primeira convocação e 18h45 em segunda convocação.',
      'Pauta 1: Fluxo do Jantar no Bandejão RU II Setorial (17h30–19h30) e iluminação das paradas do Circular Interno.',
      'Pauta 2: Mapeamento de vagas em programas e projetos para integralização das 300h de Extensão Universitária.',
      'Pauta 3: Indicação de representantes discentes titulares e suplentes nos órgãos colegiados (Art. 29, VII).'
    ],
    bodyMarkdown: `A Diretoria Executiva do Centro Acadêmico de Gestão Pública (CAGP), no uso de suas atribuições estatutárias (Art. 17 do Regimento de 14/10/2024), convoca os estudantes de todos os períodos para a Assembleia Geral Ordinária a ser realizada às 18h30 no Auditório B102 da FAFICH.

O primeiro ponto de pauta aborda a ergonomia do turno noturno: o monitoramento conjunto entre o CAGP, o DA FAFICH e a FUMP sobre o tempo de fila no Restaurante Universitário Setorial II entre 18h15 e 19h00 — janela crítica para estudantes trabalhadores que se deslocam direto para as aulas das 19h00 no 3º andar.

No segundo ponto, a Diretoria de Ensino, Pesquisa e Extensão apresentará o levantamento semestral de editais de extensão universitária compatíveis com a creditação obrigatória de 300 horas prevista no PPC 2020 (Versão 2020/1), garantindo que estudantes do noturno tenham acesso a projetos com atividades remotas ou vespertinas/noturnas.

Por fim, serão eleitos os suplentes da representação discente junto ao Colegiado do Curso de Gestão Pública (Sala F-2039) e à Câmara Departamental do Departamento de Ciência Política (DCP). A presença na Assembleia Geral é registrada em ata pública disponibilizada no Portal da Transparência do CAGP.`
  },
  {
    id: 'sim-news-estagio',
    slug: 'edital-simulado-estagio-politicas-publicas',
    category: 'estagio',
    tag: 'Estágio & Carreiras',
    tagColor: 'gold',
    title: 'Edital Simulado — Vagas de estágio em Políticas Públicas e Gestão Municipal',
    summary: 'Oportunidade demonstrativa voltada a estudantes a partir do 3º período com atuação em avaliação de programas, compras públicas e orçamento.',
    author: 'Diretoria de Ensino & Comissão de Carreiras CAGP',
    readingTime: '5 min de leitura',
    meta: '3º ao 9º Período • 20h/sem',
    dateLabel: 'Demonstração • Mural de Carreiras',
    ctaLabel: 'Abrir Guia de Estágio e Art. 41',
    ctaHref: '/estagio',
    relatedLinks: [
      { label: 'Regulamento de Estágio e Simulador Art. 41', href: '/estagio' },
      { label: 'Modelos de Termo de Compromisso e Relatórios (.docx)', href: '/documentos#formularios' },
      { label: 'Calculadora de 600h (Extensão + AAC)', href: '/acg' }
    ],
    relevantRoles: ['veterano', 'formando', 'calouro'],
    motif: 'carreiras',
    highlights: [
      'Requisitos demonstrativos: Matrícula ativa entre o 3º e o 9º período do Bacharelado em Gestão Pública (FAFICH/UFMG).',
      'Jornada compatível com o turno noturno: 20h semanais (4h diárias) ou 30h semanais (6h diárias).',
      'Obrigatoriedade normativa: Assinatura prévia do TCE e Plano de Atividades via SEI antes do início da contagem de horas.',
      'Alternativa para trabalhadores: Consulte o simulador do Art. 41 para dispensa por atuação profissional comprovada.'
    ],
    bodyMarkdown: `A Comissão de Carreiras e Articulação Institucional do CAGP divulga este edital demonstrativo para ilustrar como o Mural de Notícias conecta estudantes do Bacharelado em Gestão Pública às vagas de estágio não obrigatório e obrigatório em órgãos municipais, estaduais, federais e organizações do terceiro setor em Belo Horizonte.

De acordo com a Resolução do Colegiado de 21/11/2024, o Estágio Curricular Obrigatório soma 300 horas divididas entre Estágio Supervisionado I (DCP 135, 150h no 8º período) e Estágio Supervisionado II (DCP 136, 150h no 9º período). Contudo, estudantes a partir do 3º período já podem atuar em estágios não obrigatórios que desenvolvam competências em planejamento governamental, análise de dados públicos e gestão de contratos.

Atenção à regra de ouro do regulamento: nenhuma hora de estágio curricular é contabilizada retroativamente sem a prévia assinatura do Termo de Compromisso de Estágio (TCE) e do Plano de Atividades no SEI-UFMG pela Coordenação de Estágios do curso.

Para estudantes que já trabalham em tempo integral na administração pública ou em funções correlatas de gestão de políticas públicas, o Art. 41 do Regulamento de Estágio permite pleitear o aproveitamento de atuação profissional para dispensa de até 100% da carga horária das disciplinas DCP 135 e DCP 136.`
  },
  {
    id: 'sim-news-calourada',
    slug: 'semana-recepcao-calourada-atletica',
    category: 'eventos',
    tag: 'Calourada & Atlética',
    tagColor: 'green',
    title: 'Semana de Recepção Discente, Tour Noturno na FAFICH e Integração com a Atlética',
    summary: 'Roda de conversa sobre Estado e Democracia, apadrinhamento de calouros no noturno, guia de sobrevivência no campus e integração esportiva.',
    author: 'Diretoria de Eventos, Cultura & Comissão de Recepção',
    readingTime: '4 min de leitura',
    meta: 'Valendo horas AAC • 18h15',
    dateLabel: 'Demonstração • Comissão de Recepção',
    ctaLabel: 'Abrir Guia Completo do Calouro',
    ctaHref: '/calouros',
    relatedLinks: [
      { label: 'Guia de Sobrevivência do Calouro', href: '/calouros' },
      { label: 'Grafo Curricular de 10 Períodos', href: '/percurso' },
      { label: 'Conheça o CAGP e sua História', href: '/sobre' }
    ],
    relevantRoles: ['calouro', 'ingressar', 'veterano'],
    motif: 'calourada',
    highlights: [
      '18h15 — Recepção no Saguão da FAFICH e Tour Noturno (Sala F-2039, Biblioteca, 3º andar e paradas do Circular).',
      '19h15 — Mesa de abertura: "O Campo de Públicas na UFMG e os 3 Percursos do PPC 2020" (vale certificado AAC).',
      '20h45 — Oficina prática de sobrevivência digital: MinhaUFMG, eduroam, questionário da FUMP e matrícula no SIGA.',
      '21h30 — Apadrinhamento de turma e integração com a Atlética e coletivos estudantis.'
    ],
    bodyMarkdown: `A chegada à Universidade Federal de Minas Gerais no turno noturno exige orientação rápida e acolhimento entre pares. Por isso, o Centro Acadêmico de Gestão Pública (CAGP) e a Atlética organizam semestralmente a Semana de Recepção Discente, pensada para integrar os calouros desde o primeiro dia letivo na FAFICH.

A programação tem início às 18h15 no saguão principal da FAFICH com a entrega do Guia de Sobrevivência do Calouro e o Tour Noturno: visitamos a Secretaria do Colegiado no 2º andar (Sala F-2039), a Biblioteca da FAFICH, os auditórios, as salas de aula do 3º andar e o trajeto seguro até o Bandejão RU II Setorial e os pontos do Circular Interno.

Nas mesas acadêmicas de abertura, docentes do Departamento de Ciência Política (DCP) e egressos convidados debatem os desafios contemporâneos da administração pública brasileira e explicam o funcionamento dos 3 percursos curriculares do PPC 2020 (Gestão Pública Geral, Políticas Setoriais e Métodos Quantitativos). A participação nas mesas confere certificado válido para Atividades Acadêmicas Complementares (AAC).

Encerrando a programação, a Diretoria de Eventos e Cultura e a Atlética promovem o apadrinhamento entre veteranos e ingressantes, apresentando as modalidades esportivas, baterias universitárias e espaços de convivência da FAFICH.`
  },
  {
    id: 'sim-news-congresso',
    slug: 'seminario-estado-orcamento-govtech',
    category: 'academico',
    tag: 'Seminário & Pesquisa',
    tagColor: 'blue',
    title: 'Seminário de Estado, Orçamento e GovTech recebe submissões de resumos',
    summary: 'Chamada simulada de trabalhos de iniciação científica e relatos de extensão vinculados aos 11 núcleos temáticos do DCP/UFMG.',
    author: 'Diretoria de Ensino, Pesquisa e Extensão • CAGP',
    readingTime: '5 min de leitura',
    meta: 'Submissões até 28/02',
    dateLabel: 'Chamada • Seminário GovTech',
    ctaLabel: 'Ver Núcleos de Pesquisa e Extensão',
    ctaHref: '/pesquisa',
    relatedLinks: [
      { label: '11 Núcleos de Pesquisa do DCP/UFMG', href: '/pesquisa' },
      { label: 'Manual de TCC e Normas ABNT', href: '/tcc' },
      { label: 'Guardião de Prazos 120 dias', href: '/acg' }
    ],
    relevantRoles: ['veterano', 'formando'],
    motif: 'congresso',
    highlights: [
      '4 Grupos de Trabalho alinhados aos núcleos do DCP (NEPEM, MARGEM, CEDEPLAR, Centro de Estudos Legislativos e outros).',
      'Creditação direta no teto de 600h (AAC e Extensão) conforme barema da Resolução de 21/11/2024.',
      'Alerta do Guardião 120d: protocole o certificado no SEI em até 120 dias após o encerramento do evento (Art. 15, § 4º).',
      'Integração com TCC: possibilidade de desenvolvimento na modalidade de Artigo Científico ou Relatório Técnico.'
    ],
    bodyMarkdown: `O Seminário Discente de Estado, Orçamento Público e Transformação Governamental (GovTech) é uma iniciativa demonstrativa que articula os estudantes da graduação em Gestão Pública com os 11 grupos de pesquisa e extensão vinculados ao Departamento de Ciência Política (DCP) e à FAFICH/UFMG.

Estudantes do 1º ao 10º período podem submeter resumos expandidos em quatro eixos temáticos: (1) Instituições Democráticas, Legislativo e Judiciário; (2) Planejamento, Finanças Públicas e Federalismo Fiscal; (3) Avaliação de Políticas Sociais, Urbanas e Ambientais; e (4) Governo Digital, Transparência Ativa e Inovação no Setor Público.

Tanto a participação como ouvinte quanto a apresentação de trabalhos geram certificados oficiais contabilizáveis nas Atividades Acadêmicas Complementares (AAC). Recordamos a exigência normativa da Resolução de 21/11/2024 (Art. 15, § 4º): todo certificado de evento deve ser protocolado no Colegiado via SEI-UFMG dentro do prazo improrrogável de 120 dias corridos após a realização da atividade.

Para estudantes do 9º e 10º períodos, os artigos completos apresentados e aprovados nas sessões coordenadas podem servir como base para o Trabalho de Conclusão de Curso (TCC) na modalidade de Artigo Científico (Art. 19 do Regulamento de TCC).`
  }
];

for (const item of newsItems) {
  const frontmatter = `---
title: "${item.title.replace(/"/g, '\\"')}"
slug: "${item.slug}"
category: "${item.category}"
tag: "${item.tag}"
tagColor: "${item.tagColor}"
summary: "${item.summary.replace(/"/g, '\\"')}"
author: "${item.author}"
readingTime: "${item.readingTime}"
meta: "${item.meta}"
dateLabel: "${item.dateLabel}"
ctaLabel: "${item.ctaLabel}"
ctaHref: "${item.ctaHref || ''}"
motif: "${item.motif}"
highlights:
${item.highlights.map(h => `  - "${h.replace(/"/g, '\\"')}"`).join('\n')}
relatedLinks:
${item.relatedLinks.map(l => `  - label: "${l.label.replace(/"/g, '\\"')}"\n    href: "${l.href}"`).join('\n')}
relevantRoles:
${item.relevantRoles.map(r => `  - "${r}"`).join('\n')}
---

${item.bodyMarkdown}
`;

  const filePath = path.join(NOTICIAS_DIR, `${item.slug}.md`);
  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`[Notícia] Gerada: ${filePath}`);
}

// 2. Exportar Disciplinas de JSON para Markdown
if (fs.existsSync(SRC_DISCIPLINAS_DIR)) {
  const files = fs.readdirSync(SRC_DISCIPLINAS_DIR).filter(f => f.endsWith('.json'));
  console.log(`Convertendo ${files.length} disciplinas JSON para Markdown em conteudo/disciplinas/ ...`);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(SRC_DISCIPLINAS_DIR, file), 'utf8');
    const data = JSON.parse(raw);
    const mdName = file.replace(/\.json$/, '.md');

    const preReqsYaml = (data.preRequisitos && data.preRequisitos.length > 0)
      ? `preRequisitos:\n${data.preRequisitos.map(p => `  - "${p}"`).join('\n')}`
      : `preRequisitos: []`;

    const frontmatter = `---
codigo: "${data.codigo}"
nome: "${data.nome.replace(/"/g, '\\"')}"
natureza: "${data.natureza}"
${data.periodo !== undefined ? `periodo: ${data.periodo}\n` : ''}ch: ${data.ch}
${data.modulo ? `modulo: "${data.modulo.replace(/"/g, '\\"')}"\n` : ''}${preReqsYaml}
ementa: ${JSON.stringify(data.ementa)}
---

## Ementa Oficial

${data.ementa}
`;

    fs.writeFileSync(path.join(DISCIPLINAS_DIR, mdName), frontmatter, 'utf8');
  }
  console.log(`[Disciplinas] ${files.length} disciplinas convertidas com sucesso!`);
}
