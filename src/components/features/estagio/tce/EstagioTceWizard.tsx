import React from 'react';
import {
  MultiStepForm,
  useMultiStepForm,
  type MultiStepFormStep,
} from '@/components/ui/multi-step-form';
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
} from '@/components/ui/stepper';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/lib/toast';

interface TceWizardValues {
  concedenteNome: string;
  concedenteTipo: string;
  matricula: string;
  turno: string;
  chSemanal: string;
  possuiSeguro: string;
}

const INITIAL_VALUES: TceWizardValues = {
  concedenteNome: '',
  concedenteTipo: 'publico',
  matricula: '',
  turno: 'noturno',
  chSemanal: '30',
  possuiSeguro: 'sim',
};

const STEPS: MultiStepFormStep<TceWizardValues>[] = [
  {
    id: 'concedente',
    validate: (vals) => {
      if (!vals.concedenteNome.trim()) {
        return { concedenteNome: 'Informe o nome ou órgão da parte concedente' };
      }
      return null;
    },
  },
  {
    id: 'discente',
    validate: (vals) => {
      if (!vals.matricula.trim()) {
        return { matricula: 'Informe sua matrícula da UFMG' };
      }
      return null;
    },
  },
  {
    id: 'plano',
    validate: (vals) => {
      const ch = Number(vals.chSemanal);
      if (isNaN(ch) || ch <= 0 || ch > 30) {
        return { chSemanal: 'A carga horária máxima permitida por lei é 30h semanais' };
      }
      return null;
    },
  },
  {
    id: 'finalizacao',
  },
];

const WizardInner: React.FC = () => {
  const {
    values,
    setValue,
    errors,
    activeStep,
    next,
    back,
    goTo,
    isFirstStep,
    isLastStep,
    canGoNext,
    submit,
  } = useMultiStepForm<TceWizardValues>();

  return (
    <Card className="border-3 border-border shadow-md">
      <CardHeader className="p-4 sm:p-5 border-b-2 border-border bg-background">
        <CardTitle className="text-base sm:text-lg font-heading font-black text-foreground">
          Assistente Interativo de Homologação de TCE
        </CardTitle>
        <p className="text-xs text-muted-foreground font-body mt-0.5 m-0">
          Validação prévia das exigências legais (Lei nº 11.788/2008 & Resolução CEPE 10/2019)
        </p>

        {/* Stepper Visual Canônico */}
        <div className="pt-3">
          <Stepper activeStep={activeStep} onStepChange={goTo}>
            <StepperList className="flex items-center justify-between">
              <StepperItem index={0}>
                <StepperTrigger />
              </StepperItem>
              <StepperSeparator />
              <StepperItem index={1}>
                <StepperTrigger />
              </StepperItem>
              <StepperSeparator />
              <StepperItem index={2}>
                <StepperTrigger />
              </StepperItem>
              <StepperSeparator />
              <StepperItem index={3}>
                <StepperTrigger />
              </StepperItem>
            </StepperList>
          </Stepper>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {/* Step 1: Concedente */}
        {activeStep === 0 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="concedente-nome" className="text-xs font-bold uppercase">
                Razão Social / Nome do Órgão Concedente
              </Label>
              <Input
                id="concedente-nome"
                value={values.concedenteNome}
                onChange={(e) => setValue('concedenteNome', e.target.value)}
                placeholder="Ex: Secretaria de Estado de Planejamento e Gestão (SEPLAG)"
                className="mt-1"
              />
              {errors.concedenteNome && (
                <p className="text-xs text-destructive font-bold mt-1">{errors.concedenteNome}</p>
              )}
            </div>

            <div>
              <Label className="text-xs font-bold uppercase mb-2 block">Tipo da Entidade</Label>
              <RadioGroup
                value={values.concedenteTipo}
                onValueChange={(val) => setValue('concedenteTipo', val)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="publico" id="tipo-publico" />
                  <Label htmlFor="tipo-publico" className="text-xs font-medium cursor-pointer">
                    Órgão Público (Administração Direta/Indireta)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="ong" id="tipo-ong" />
                  <Label htmlFor="tipo-ong" className="text-xs font-medium cursor-pointer">
                    OSCIP / Fundação / Terceiro Setor
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="empresa" id="tipo-empresa" />
                  <Label htmlFor="tipo-empresa" className="text-xs font-medium cursor-pointer">
                    Empresa Privada com Convênio Ativo
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="interna" id="tipo-interna" />
                  <Label htmlFor="tipo-interna" className="text-xs font-medium cursor-pointer">
                    UFMG Interna (Laboratório / Pró-Reitoria)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 2: Matrícula & Turno */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="discente-matrícula" className="text-xs font-bold uppercase">
                Número de Matrícula (SIGA UFMG)
              </Label>
              <Input
                id="discente-matrícula"
                value={values.matricula}
                onChange={(e) => setValue('matricula', e.target.value)}
                placeholder="Ex: 2024012345"
                className="mt-1 font-mono"
              />
              {errors.matricula && (
                <p className="text-xs text-destructive font-bold mt-1">{errors.matricula}</p>
              )}
            </div>

            <div>
              <Label className="text-xs font-bold uppercase mb-2 block">Turno Vinculado</Label>
              <RadioGroup
                value={values.turno}
                onValueChange={(val) => setValue('turno', val)}
                className="flex items-center gap-4"
              >
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="noturno" id="turno-noturno" />
                  <Label htmlFor="turno-noturno" className="text-xs font-medium cursor-pointer">
                    Noturno (Padrão Gestão Pública)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="diurno" id="turno-diurno" />
                  <Label htmlFor="turno-diurno" className="text-xs font-medium cursor-pointer">
                    Diurno (Disciplinas Isoladas)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 3: Carga Horária & Seguro */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ch-semanal" className="text-xs font-bold uppercase">
                Carga Horária Semanal (Máximo 30h)
              </Label>
              <Input
                id="ch-semanal"
                type="number"
                min={1}
                max={30}
                value={values.chSemanal}
                onChange={(e) => setValue('chSemanal', e.target.value)}
                className="mt-1 font-mono max-w-[140px]"
              />
              {errors.chSemanal && (
                <p className="text-xs text-destructive font-bold mt-1">{errors.chSemanal}</p>
              )}
            </div>

            <div>
              <Label className="text-xs font-bold uppercase mb-2 block">
                Seguro Contra Acidentes Pessoais (Obrigatório por Lei)
              </Label>
              <RadioGroup
                value={values.possuiSeguro}
                onValueChange={(val) => setValue('possuiSeguro', val)}
                className="flex items-center gap-4"
              >
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="sim" id="seguro-sim" />
                  <Label htmlFor="seguro-sim" className="text-xs font-medium cursor-pointer">
                    Sim (Fornecido pela Concedente com Apólice)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-border p-2.5 rounded-lg bg-card">
                  <RadioGroupItem value="nao" id="seguro-nao" />
                  <Label htmlFor="seguro-nao" className="text-xs font-medium cursor-pointer text-destructive">
                    Não (Impeditivo Legal)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 4: Finalização & Resumo */}
        {activeStep === 3 && (
          <div className="p-4 bg-background border-2 border-border rounded-xl space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-foreground m-0">
              Resumo da Pré-Homologação
            </h4>
            <ul className="text-xs space-y-1.5 font-body text-muted-foreground m-0 p-0 list-none">
              <li><strong>Concedente:</strong> {values.concedenteNome} ({values.concedenteTipo})</li>
              <li><strong>Discente:</strong> Matrícula {values.matricula} ({values.turno})</li>
              <li><strong>Carga Horária:</strong> {values.chSemanal}h semanais</li>
              <li><strong>Seguro:</strong> {values.possuiSeguro === 'sim' ? 'Regularizado' : 'Pendente'}</li>
            </ul>
            {values.possuiSeguro === 'nao' && (
              <p className="text-xs font-bold text-destructive">
                Atenção: A UFMG não homologa TCEs sem a apólice de seguro contra acidentes pessoais preenchida pela concedente.
              </p>
            )}
          </div>
        )}

        {/* Botões de Ação do Wizard */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={back}
            disabled={isFirstStep}
          >
            <i className="bi bi-arrow-left" aria-hidden="true"></i> Voltar
          </Button>

          {isLastStep ? (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={submit}
              disabled={values.possuiSeguro === 'nao'}
            >
              Homologar Pré-Requisitos
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={next}
              disabled={!canGoNext}
            >
              Avançar <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const EstagioTceWizard: React.FC = () => {
  const handleSubmit = (vals: TceWizardValues) => {
    toast.success('Pré-requisitos do TCE verificados com sucesso!', {
      description: `Órgão: ${vals.concedenteNome}. Envie o documento assinado ao Colegiado.`,
    });
  };

  return (
    <MultiStepForm
      steps={STEPS}
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
    >
      <WizardInner />
    </MultiStepForm>
  );
};
