import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Questionnaire, type QuestionnaireQuestion } from '@/components/ui/questionnaire';
import { TagInput } from '@/components/ui/tag-input';
import { OnboardingWizard, type OnboardingStep } from '@/components/boldkit/blocks/onboarding-flow';
import { asset, route } from '@/lib/paths';
import { bounceSpring, tactileSpring } from '@/lib/motion';

const ONBOARDING_STEPS = [
  {
    step: 1,
    tag: 'PASSO 1 • IDENTIDADE DIGITAL',
    title: 'Folha de NIPs, minhaUFMG & App Siga UFMG',
    color: '#A85300',
    summary: 'Ative seu login institucional @ufmg.br e entenda a diferença entre o portal Web e o App móvel.',
    points: [
      'Primeiro Acesso (Folha NIPs): Após o Registro Acadêmico no DRCA, acesse sistemas.ufmg.br para criar seu login @ufmg.br e senha única (libera Google Workspace e Microsoft 365). Suporte: suporte@dti.ufmg.br.',
      'No Computador (Web): Nunca tente logar no SIGA isolado! Entre pelo portal minhaUFMG (sistemas.ufmg.br) para matrícula semestral, histórico autenticado e trancamento parcial.',
      'No Celular: Use o aplicativo oficial Siga UFMG (Android/iOS) para consultar salas, horários, notas e carteirinha digital.',
      'ATENÇÃO — Desmistificação do SEI: Você NÃO precisa baixar o aplicativo do SEI no celular! Demandas estudantis são protocoladas no CEAG (2º andar da FAFICH) ou por e-mail.',
    ],
    logo: asset('/logos/minhaufmg/logo-minha-ufmg.png'),
  },
  {
    step: 2,
    tag: 'PASSO 2 • CONECTIVIDADE & BIBLIOTECA',
    title: 'Wi-Fi eduroam & Carteirinha da UFMG',
    color: '#5B2A85',
    summary: 'Conecte-se à rede mundial acadêmica em todos os prédios da UFMG e emita sua carteira.',
    points: [
      'Rede Wi-Fi Oficial: Selecione o SSID "eduroam". O usuário deve conter o sufixo completo (ex: seu_login@ufmg.br) e a mesma senha do minhaUFMG (WPA2-Enterprise / PEAP / MSCHAPv2).',
      'Carteira da UFMG: Solicitada no portal minhaUFMG, indispensável para passar nas catracas dos Restaurantes Universitários (RU) com subsídio e fazer empréstimos na Biblioteca Baeta Neves (1º andar da FAFICH).',
    ],
    logo: asset('/logos/siga/siga-ufmg-fundo-branco.webp'),
  },
  {
    step: 3,
    tag: 'PASSO 3 • ASSISTÊNCIA ESTUDANTIL & RU',
    title: 'FUMP (Níveis I, II e III), RUs e Circular Noturno',
    color: '#FE8812',
    summary: 'Garanta alimentação subsidiada/gratuita, moradia, auxílio-transporte e saiba chegar ao jantar.',
    points: [
      'Questionário Socioeconômico FUMP (fump.ufmg.br): Preencha na Área do Aluno selecionando "Estudantes da Graduação" para classificação nos Níveis I (isenção total), II ou III. WhatsApp FUMP: (31) 97537-0115.',
      'Horários dos RUs no Campus Pampulha: Café da manhã no RU Setorial I (06h40–08h15, Níveis I–III); Almoço nos RUs Setorial I e II (11h00–14h00); Jantar no RU Setorial II (17h10–19h30).',
      'Linhas 3 e 4 do Circular Interno Gratuito (Jantar): Reforço noturno parando em frente ao RU Setorial II — Linha 3 (16h40, 17h20, 18h00, 19h05) e Linha 4 (16h20, 17h00, 17h40, 18h35).',
      'Luta do CAGP: A gestão estudantil reivindica junto à PRAE, FUMP e DCE o retorno imediato do jantar no RU Setorial I (ao lado da FAFICH) para atender quem trabalha e chega às 19h.',
    ],
    logo: asset('/logos/fump/03-fump-sinae-logo-colorido-fundo-branco.png'),
  },
  {
    step: 4,
    tag: 'PASSO 4 • ATENDIMENTO & PRAZOS',
    title: 'Secretaria (Sala F-2039) vs. CEAG Noturno (08h–22h)',
    color: '#266264',
    summary: 'Saiba exatamente onde protocolar cada requerimento no 2º andar da FAFICH e não perca prazos.',
    points: [
      'Secretaria de Gestão Pública (Sala F-2039 — 2º andar): Atendimento presencial às quartas-feiras (13h00 às 19h00) com Wander Wenceslau Pereira e Ubirajara Dutra. Tel: (31) 3409-3826 | gestaopublica@ufmg.br.',
      'CEAG FAFICH (2º andar, em frente aos caixas eletrônicos): Plantão contínuo de segunda a sexta-feira, das 08h00 às 22h00, para protocolo geral, atestados médicos, regime especial e declarações.',
      'Prazo de Aproveitamento de Estudos (Res. CEPE 06/2019): Quem cursou disciplinas em outra faculdade deve pedir aproveitamento até o final do 2º período de vínculo!',
    ],
    logo: asset('/logos/ufmg/assinaturas/prograd-ufmg.jpg'),
  },
  {
    step: 5,
    tag: 'PASSO 5 • DIREITOS, INCLUSÃO E RECEPÇÃO SEMENTE',
    title: 'NAI, Nome Social, Saúde Mental (DASE) e Proposta 7 (Recepção)',
    color: '#C4161C',
    summary: 'Acolhimento institucional, acessibilidade pedagógica, canais de proteção discente e integração.',
    points: [
      'Acessibilidade e Inclusão (NAI/UFMG): Adaptação de materiais, Libras e mediação pedagógica — acessibilidade@ufmg.br | (31) 3409-4674.',
      'Direito ao Nome Social (Resolução 09/2015): Garantido em chamadas, carteirinha, e-mail e diploma mediante requerimento simples.',
      'Política Contra o Assédio (Resolução 07/2025) e Proibição de Trote Violento (Resolução 06/2014): Recepção segura e acolhedora com a Chapa Semente (Proposta 7).',
      'Saúde Mental e Escuta (DASE/PRAE): Acolhimento psicológico estudantil pelo e-mail dase@prae.ufmg.br. Emergências no campus: Vigilância (31) 3409-4444 / SAMU 192.',
    ],
    logo: asset('/logos/ufmg/assinaturas/nai-ufmg.png'),
  },
];

const CALOURO_QUIZ_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'perfil_turno',
    type: 'single',
    title: 'Qual é o seu regime de dedicação e turno no curso?',
    description: 'Ajuda a calibrar seus prazos de ACG, rotas de circular e auxílios da FUMP.',
    choices: [
      { value: 'trabalhador_noturno', label: 'Estudante Trabalhador (Turno Noturno)', description: 'Trabalho de dia e chego às 19h na FAFICH' },
      { value: 'dedicacao_exclusiva', label: 'Dedicação Exclusiva à Universidade', description: 'Tempo disponível para bolsas, IC e extensão diurna' },
      { value: 'transicao_carreira', label: 'Segunda Graduação / Transição de Carreira', description: 'Já possuo formação prévia e busco concursos/gestão' },
    ],
  },
  {
    id: 'areas_interesse',
    type: 'multiple',
    title: 'Quais áreas da Gestão Pública mais despertam seu interesse?',
    description: 'Selecione as frentes para personalizar suas recomendações curriculares.',
    choices: [
      { value: 'politicas_sociais', label: 'Políticas Sociais & Direitos Humanos', description: 'Saúde, Educação, Assistência e Moradia' },
      { value: 'planejamento_orcamento', label: 'Planejamento, Orçamento & Finanças Públicas', description: 'LOA, LDO, PPA e Responsabilidade Fiscal' },
      { value: 'dados_govtech', label: 'Análise de Dados, GovTech & Inovação', description: 'Indicadores, Evidências e Transformação Digital' },
      { value: 'carreira_pesquisa', label: 'Carreira Acadêmica & Pesquisa em Políticas', description: 'Mestrado, Doutorado e Docência' },
    ],
  },
];

export const CalourosOnboardingGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([1]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [interests, setInterests] = useState<string[]>(['RU Setorial', 'Bolsa FUMP', 'Circular 3/4']);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const current = ONBOARDING_STEPS[activeStep];
  const progressPct = Math.round((completed.length / ONBOARDING_STEPS.length) * 100);

  const toggleComplete = (stepNum: number) => {
    setCompleted((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const wizardSteps: OnboardingStep[] = ONBOARDING_STEPS.map((s) => ({
    id: `step-${s.step}`,
    title: s.title,
    description: s.summary,
    content: (
      <div className="space-y-3 py-2 text-foreground">
        <div className="flex items-center gap-3">
          {s.logo && <img src={s.logo} alt="" className="h-8 object-contain" />}
          <Badge variant="outline" className="text-xs font-mono font-bold uppercase">{s.tag}</Badge>
        </div>
        <ul className="space-y-1.5 text-xs font-sans text-muted-foreground list-disc pl-4">
          {s.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section className="space-y-6 my-4" aria-label="Tour Interativo de Primeiros Passos na UFMG">
      {/* Trilha Interativa dos 5 Primeiros Passos do Ingressante */}
      <Card className="bg-white border-3 border-[#1F1F1F] shadow-[6px_6px_0_0_#1F1F1F]">
        <CardHeader className="border-b-3 border-[#1F1F1F] bg-[#ffffff]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-1.5">
                ONBOARDING INTERATIVO • GUIA VIVER UFMG &amp; RECEPÇÃO GP
              </Badge>
              <CardTitle className="text-xl">
                Trilha dos 5 Primeiros Passos do Ingressante
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#57534E]">
                Marque cada etapa concluída para dominar os sistemas, restaurantes, ônibus e secretarias da FAFICH.
              </CardDescription>
            </div>
            <div className="min-w-[200px] text-right space-y-1">
              <span className="font-mono text-xs font-black uppercase text-[#1F1F1F] block">
                {completed.length} de {ONBOARDING_STEPS.length} Etapas ({progressPct}%)
              </span>
              <div className="w-full bg-[#F4F2EC] border-3 border-[#1F1F1F] rounded-full h-4 overflow-hidden p-0.5 shadow-[2px_2px_0_0_#1F1F1F]">
                <motion.div
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={bounceSpring}
                  className="bg-gradient-to-r from-[#5B2A85] to-[#FE8812] h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Stepper Buttons com 44x44pt Touch Targets */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {ONBOARDING_STEPS.map((item, idx) => {
              const isSelected = idx === activeStep;
              const isDone = completed.includes(item.step);
              return (
                <motion.button
                  key={item.step}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ x: 2, y: 2 }}
                  transition={tactileSpring}
                  onClick={() => setActiveStep(idx)}
                  className={`min-h-[64px] p-3 rounded-xl border-2 border-[#1F1F1F] text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[#1F1F1F] text-white shadow-[3px_3px_0_0_#1F1F1F]'
                      : isDone
                      ? 'bg-[#DCFCE7] text-[#1F1F1F] shadow-[2px_2px_0px_#1F1F1F]'
                      : 'bg-white text-[#1F1F1F] hover:bg-muted shadow-[2px_2px_0px_#1F1F1F]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-black uppercase">
                      Passo {item.step}
                    </span>
                    {isDone && (
                      <span className="px-1.5 py-0.5 text-xs font-mono font-black bg-[#166534] text-white rounded">
                        OK
                      </span>
                    )}
                  </div>
                  <span className="font-heading text-xs font-extrabold uppercase line-clamp-2 leading-tight">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Step Detail Box com Transição Animada */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={tactileSpring}
              className="p-5 rounded-xl border-2 border-[#1F1F1F] bg-[#ffffff] shadow-[6px_6px_0px_#1F1F1F] space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#1F1F1F] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl border-2 border-[#1F1F1F] bg-white p-1.5 flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#1F1F1F]">
                    <img src={current.logo} alt="" className="max-h-10 max-w-full object-contain" />
                  </div>
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-md text-xs font-mono font-black uppercase text-white border-2 border-[#1F1F1F] mb-1"
                      style={{ backgroundColor: current.color }}
                    >
                      {current.tag}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-black text-[#1F1F1F]">
                      {current.title}
                    </h3>
                    <p className="text-xs text-[#57534E] font-medium">{current.summary}</p>
                  </div>
                </div>

                <Button
                  variant={completed.includes(current.step) ? 'secondary' : 'default'}
                  size="sm"
                  onClick={() => toggleComplete(current.step)}
                  className="min-h-[44px] px-4 inline-flex items-center gap-1.5"
                >
                  {completed.includes(current.step) ? (
                    <>
                      <i className="bi bi-check-circle-fill text-sm" aria-hidden="true" />
                      <span>Etapa Carimbada</span>
                    </>
                  ) : (
                    <span>Carimbar como Concluída</span>
                  )}
                </Button>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                {current.points.map((pt, i) => (
                  <li
                    key={i}
                    className="p-3.5 rounded-xl border-2 border-[#1F1F1F] bg-white shadow-[2px_2px_0px_#1F1F1F] text-xs text-[#1F1F1F] leading-relaxed font-medium flex gap-2.5"
                  >
                    <span className="w-6 h-6 rounded-md bg-secondary text-white font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5 border border-[#1F1F1F]">
                      {i + 1}
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="min-h-[44px] px-4"
                >
                  ← Passo Anterior
                </Button>
                <a
                  href={route('/chapa-semente#propostas')}
                  className="text-xs font-mono font-black uppercase text-[#5B2A85] hover:underline py-2 inline-flex items-center gap-1.5"
                >
                  <i className="bi bi-stars text-xs text-[#FE8812]" aria-hidden="true" />
                  <span>Proposta 7 Semente: Recepção de Calouros →</span>
                </a>
                <Button
                  variant="accent"
                  size="sm"
                  disabled={activeStep === ONBOARDING_STEPS.length - 1}
                  onClick={() =>
                    setActiveStep((prev) => Math.min(ONBOARDING_STEPS.length - 1, prev + 1))
                  }
                  className="min-h-[44px] px-4"
                >
                  Próximo Passo →
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Onboarding Wizard BoldKit Compacto */}
          <OnboardingWizard
            steps={wizardSteps}
            className="border-3 border-[#1F1F1F] bg-card shadow-[3px_3px_0_0_#1F1F1F]"
          />

          {/* Filtro Rápido com TagInput */}
          <div className="p-4 bg-[#ffffff] border-2 border-[#1F1F1F] rounded-xl space-y-2 shadow-[3px_3px_0_0_#1F1F1F]">
            <span className="text-xs font-head uppercase font-bold text-[#1F1F1F] block">
              Tópicos de Interesse do Ingressante (TagInput):
            </span>
            <TagInput
              value={interests}
              onChange={setInterests}
              suggestions={['RU Setorial', 'Bolsa FUMP', 'Circular 3/4', 'Biblioteca', 'eduroam', 'CEAG', 'DCP', 'Estágio', 'NAI']}
              placeholder="Adicionar tema de interesse..."
              className="bg-white border-2 border-[#1F1F1F] rounded-xl shadow-xs"
            />
          </div>

          {/* Seção do Quiz do Calouro com Questionnaire */}
          <div className="p-5 bg-card border-2 border-[#1F1F1F] rounded-xl shadow-[3px_3px_0_0_#1F1F1F] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-secondary block">
                  Questionário Interativo
                </span>
                <h4 className="font-head text-base font-extrabold text-foreground m-0">
                  Quiz Diagnóstico: Perfil Discente do Ingressante
                </h4>
                <p className="text-xs text-muted-foreground m-0 font-sans">
                  Responda 2 perguntas para orientar sua rota inicial na UFMG.
                </p>
              </div>
              <Button
                variant={showQuiz ? 'outline' : 'secondary'}
                size="sm"
                onClick={() => setShowQuiz(!showQuiz)}
                className="min-h-[44px] px-4"
              >
                {showQuiz ? 'Ocultar Questionário' : 'Iniciar Quiz do Calouro →'}
              </Button>
            </div>

            {showQuiz && (
              <div className="pt-3 border-t-2 border-border">
                {quizResult ? (
                  <div className="p-4 bg-[#DCFCE7] border-2 border-[#1F1F1F] rounded-xl text-xs font-sans text-[#1F1F1F] space-y-2 shadow-[3px_3px_0_0_#1F1F1F]">
                    <strong className="font-head uppercase block text-[#166534]">
                      Perfil Diagnóstico Identificado:
                    </strong>
                    <p className="m-0 leading-relaxed font-medium">{quizResult}</p>
                    <Button variant="outline" size="sm" onClick={() => setQuizResult(null)} className="mt-2 min-h-[44px]">
                      Refazer Quiz
                    </Button>
                  </div>
                ) : (
                  <Questionnaire
                    questions={CALOURO_QUIZ_QUESTIONS}
                    onSubmit={(answers) => {
                      const turno = answers['perfil_turno'] === 'trabalhador_noturno' ? 'Estudante Trabalhador Noturno' : 'Dedicação Universitária';
                      setQuizResult(`Você se enquadra prioritariamente no perfil de ${turno}! Suas prioridades são: circular noturno, assistência FUMP e planejamento do teto de ACG.`);
                    }}
                    submitLabel="Concluir Diagnóstico"
                    className="max-w-xl mx-auto"
                  />
                )}
              </div>
            )}
          </div>

          {/* Accordion Rápido de Perguntas de Calouros */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-sei">
              <AccordionTrigger>
                Preciso instalar o aplicativo do SEI no meu celular?
              </AccordionTrigger>
              <AccordionContent>
                <strong>Não!</strong> O aplicativo móvel do SEI não é necessário para estudantes da graduação e costuma gerar confusão. Qualquer requerimento acadêmico é feito pelo portal web <strong>minhaUFMG</strong>, por e-mail ao Colegiado ou presencialmente no guichê do <strong>CEAG (2º andar da FAFICH, 08h às 22h)</strong>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-ru">
              <AccordionTrigger>
                Como funciona o jantar no RU e o ônibus circular para o turno noturno?
              </AccordionTrigger>
              <AccordionContent>
                O jantar é servido no <strong>RU Setorial II</strong> das <strong>17h10 às 19h30</strong>. As <strong>Linhas 3 e 4 do Circular Interno gratuito</strong> possuem horários de reforço saindo pela Praça de Serviços/FAFICH até o Setorial II (Linha 3: 16h40, 17h20, 18h00, 19h05 | Linha 4: 16h20, 17h00, 17h40, 18h35). O CAGP segue mobilizado pela reabertura do jantar no Setorial I.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-aproveitamento">
              <AccordionTrigger>
                Já cursei faculdade antes. Até quando posso pedir Aproveitamento de Estudos?
              </AccordionTrigger>
              <AccordionContent>
                Conforme a <strong>Resolução CEPE nº 06/2019</strong>, o pedido de aproveitamento de disciplinas cursadas anteriormente deve ser protocolado impreterivelmente até o final do seu <strong>2º período letivo de vínculo</strong> na UFMG, apresentando histórico oficial e ementas autenticadas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};
