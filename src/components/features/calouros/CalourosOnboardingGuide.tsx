import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { asset } from '@/lib/paths';

const ONBOARDING_STEPS = [
  {
    step: 1,
    tag: 'PASSO 1 • IDENTIDADE DIGITAL',
    title: 'Folha de NIPs, minhaUFMG & App Siga UFMG',
    color: '#9E2424',
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
    color: '#5B2A86',
    summary: 'Conecte-se à rede mundial acadêmica em todos os prédios da UFMG e emita sua carteira.',
    points: [
      'Rede Wi-Fi Oficial: Selecione o SSID "eduroam". O usuário deve conter o sufixo completo (ex: seu_login@ufmg.br) e a mesma senha do minhaUFMG (WPA2-Enterprise / PEAP / MSCHAPv2).',
      'Carteira da UFMG: Solicitada no portal minhaUFMG, indispensável para passar nas catracas dos Restaurantes Universitários (RU) com subsídio e fazer empréstimos na Biblioteca da FAFICH (2º andar).',
    ],
    logo: asset('/logos/siga/siga-ufmg-fundo-branco.webp'),
  },
  {
    step: 3,
    tag: 'PASSO 3 • ASSISTÊNCIA ESTUDANTIL & RU',
    title: 'FUMP (Níveis I, II e III), RUs e Circular Noturno',
    color: '#FF8811',
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
    title: 'Secretaria (Sala 2039) vs. CEAG Noturno (08h–22h)',
    color: '#266264',
    summary: 'Saiba exatamente onde protocolar cada requerimento no 2º andar da FAFICH e não perca prazos.',
    points: [
      'Secretaria de Gestão Pública (Sala 2039 — 2º andar): Atendimento presencial às quartas-feiras (13h00 às 19h00) com Wander Wenceslau Pereira e Ubirajara Dutra. Tel: (31) 3409-3826 | gestaopublica@ufmg.br.',
      'CEAG FAFICH (2º andar, em frente aos caixas eletrônicos): Plantão contínuo de segunda a sexta-feira, das 08h00 às 22h00, para protocolo geral, atestados médicos, regime especial e declarações.',
      'Prazo de Aproveitamento de Estudos (Res. CEPE 06/2019): Quem cursou disciplinas em outra faculdade deve pedir aproveitamento até o final do 2º período de vínculo!',
    ],
    logo: asset('/logos/ufmg/assinaturas/prograd-ufmg.jpg'),
  },
  {
    step: 5,
    tag: 'PASSO 5 • DIREITOS, INCLUSÃO E SAÚDE',
    title: 'NAI, Nome Social, Saúde Mental (DASE) e Contra o Assédio',
    color: '#C4161C',
    summary: 'Acolhimento institucional, acessibilidade pedagógica e canais de proteção discente.',
    points: [
      'Acessibilidade e Inclusão (NAI/UFMG): Adaptação de materiais, Libras e mediação pedagógica — acessibilidade@ufmg.br | (31) 3409-4674.',
      'Direito ao Nome Social (Resolução 09/2015): Garantido em chamadas, carteirinha, e-mail e diploma mediante requerimento simples.',
      'Política Contra o Assédio (Resolução 07/2025) e Proibição de Trote (Resolução 06/2014): Tolerância zero a trotes violentos ou assédio.',
      'Saúde Mental e Escuta (DASE/PRAE): Acolhimento psicológico estudantil pelo e-mail dase@prae.ufmg.br. Emergências no campus: Vigilância (31) 3409-4444 / SAMU 192.',
    ],
    logo: asset('/logos/ufmg/assinaturas/nai-ufmg.png'),
  },
];

export const CalourosOnboardingGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([1]);

  const current = ONBOARDING_STEPS[activeStep];
  const progressPct = Math.round((completed.length / ONBOARDING_STEPS.length) * 100);

  const toggleComplete = (stepNum: number) => {
    setCompleted((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  return (
    <section className="space-y-6 my-6" aria-label="Tour Interativo de Primeiros Passos na UFMG">
      {/* Barra de Progresso do Calouro */}
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-1.5">
                ONBOARDING INTERATIVO • GUIA VIVER UFMG &amp; RECEPÇÃO GP
              </Badge>
              <CardTitle className="text-xl uppercase">
                Trilha dos 5 Primeiros Passos do Ingressante
              </CardTitle>
              <CardDescription className="text-xs font-medium text-[#57534E]">
                Marque cada etapa concluída para dominar os sistemas, restaurantes, ônibus e secretarias da FAFICH.
              </CardDescription>
            </div>
            <div className="min-w-[180px] text-right">
              <span className="font-mono text-xs font-black uppercase text-[#16181d] block mb-1">
                {completed.length} de {ONBOARDING_STEPS.length} Etapas ({progressPct}%)
              </span>
              <Progress value={progressPct} className="h-4" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {ONBOARDING_STEPS.map((item, idx) => {
              const isSelected = idx === activeStep;
              const isDone = completed.includes(item.step);
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border-3 border-[#16181d] text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#16181d] text-white shadow-[4px_4px_0px_#9E2424] -translate-y-0.5'
                      : isDone
                      ? 'bg-[#DCFCE7] text-[#16181d] shadow-[2px_2px_0px_#16181d]'
                      : 'bg-[#f4f5f7] text-[#16181d] hover:bg-white shadow-[2px_2px_0px_#16181d]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-black uppercase">
                      Passo {item.step}
                    </span>
                    {isDone && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-black bg-[#15803D] text-white rounded">
                        OK
                      </span>
                    )}
                  </div>
                  <span className="font-heading text-xs font-extrabold uppercase line-clamp-2 leading-tight">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail Box */}
          <div className="p-5 rounded-xl border-3 border-[#16181d] bg-[#FFFDF9] shadow-[6px_6px_0px_#16181d] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#16181d] pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-xl border-3 border-[#16181d] bg-white p-1.5 flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#16181d]">
                  <img src={current.logo} alt="" className="max-h-10 max-w-full object-contain" />
                </div>
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase text-white border-2 border-[#16181d] mb-1"
                    style={{ backgroundColor: current.color }}
                  >
                    {current.tag}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-[#16181d]">
                    {current.title}
                  </h3>
                  <p className="text-xs text-[#57534E] font-medium">{current.summary}</p>
                </div>
              </div>

              <Button
                variant={completed.includes(current.step) ? 'secondary' : 'default'}
                size="sm"
                onClick={() => toggleComplete(current.step)}
              >
                {completed.includes(current.step) ? '✓ Etapa Concluída' : 'Marcar como Concluída'}
              </Button>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
              {current.points.map((pt, i) => (
                <li
                  key={i}
                  className="p-3.5 rounded-xl border-2 border-[#16181d] bg-white shadow-[2px_2px_0px_#16181d] text-xs text-[#16181d] leading-relaxed font-medium flex gap-2.5"
                >
                  <span className="w-5 h-5 rounded-md bg-[#9E2424] text-white font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              >
                ← Passo Anterior
              </Button>
              <Button
                variant="accent"
                size="sm"
                disabled={activeStep === ONBOARDING_STEPS.length - 1}
                onClick={() =>
                  setActiveStep((prev) => Math.min(ONBOARDING_STEPS.length - 1, prev + 1))
                }
              >
                Próximo Passo →
              </Button>
            </div>
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
