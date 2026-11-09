import React, { useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  TimelineCard,
} from '@/components/ui/timeline';
import { TimePicker } from '@/components/ui/time-picker';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoutineStep {
  timeStr: string;
  hour: number;
  minute: number;
  title: string;
  desc: string;
  badge: string;
  isHighlight?: boolean;
}

const NIGHT_ROUTINE: RoutineStep[] = [
  {
    timeStr: '17:10',
    hour: 17,
    minute: 10,
    title: 'Abertura do Jantar no RU II Setorial',
    desc: 'Início do jantar subsidiado aos fundos da FAFICH (próximo ao ICB, FACE e ECI), conforme Portaria PRAE nº 1.286/2026.',
    badge: '17h10 – 19h30',
  },
  {
    timeStr: '18:00',
    hour: 18,
    minute: 0,
    title: 'Horário de Ouro para Jantar',
    desc: 'Janela de menor fila no RU II. Chegar entre 18h00 e 18h25 garante jantar tranquilo com tempo hábil para retornar à FAFICH.',
    badge: 'Dica Veterana',
    isHighlight: true,
  },
  {
    timeStr: '19:00',
    hour: 19,
    minute: 0,
    title: 'Início das Aulas Noturnas (1º Bloco)',
    desc: 'Início pontual do 1º bloco de aulas nas salas e auditórios da FAFICH (2º e 3º andares).',
    badge: '19h00 – 20h40',
  },
  {
    timeStr: '20:40',
    hour: 20,
    minute: 40,
    title: 'Intervalo & Convivência CAGP',
    desc: 'Intervalo de 20 minutos. Momento de café na cantina da FAFICH, salinha do CAGP e CEAG (aberto até 22h).',
    badge: '20h40 – 21h00',
  },
  {
    timeStr: '21:00',
    hour: 21,
    minute: 0,
    title: 'Segundo Bloco de Aulas',
    desc: 'Continuidade dos seminários de políticas públicas, debates e oficinas de laboratório.',
    badge: '21h00 – 22h30',
  },
  {
    timeStr: '22:30',
    hour: 22,
    minute: 30,
    title: 'Término das Aulas & Encerramento',
    desc: 'Final do turno noturno. Saída em grupos em direção aos pontos de ônibus da FAFICH, Av. Antônio Carlos e portaria Catalão.',
    badge: '22h30',
  },
  {
    timeStr: '22:45',
    hour: 22,
    minute: 45,
    title: 'Último Circular Noturno',
    desc: 'Partida do último ônibus Circular Interno gratuito saindo da FAFICH em direção à Estação Pampulha (MOVE) e portarias.',
    badge: 'Último Carro',
    isHighlight: true,
  },
];

export const CalouroNoturnoPlanner: React.FC = () => {
  // Default to 18:00
  const [selectedTime, setSelectedTime] = useState<Date>(() => {
    const d = new Date();
    d.setHours(18, 0, 0, 0);
    return d;
  });

  const currentMinutes = selectedTime.getHours() * 60 + selectedTime.getMinutes();

  return (
    <div className="space-y-6">
      {/* Seletor Interativo de Horário com TimePicker Neobrutalista */}
      <Card className="border-3 border-border shadow-md">
        <CardHeader className="p-4 sm:p-5 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base sm:text-lg font-heading font-black uppercase text-foreground">
                Simulador de Rotina & Horário de Chegada
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Ajuste o horário previsto da sua chegada ao Campus Pampulha para visualizar o status da sua rotina noturna.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase text-muted-foreground">Horário:</span>
              <TimePicker
                value={selectedTime}
                onChange={(date) => date && setSelectedTime(date)}
                format="24h"
                minuteStep={15}
                placeholder="Selecionar Horário"
                className="min-h-[44px] font-mono font-bold text-sm bg-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 pt-0">
          <div className="p-3 bg-muted/40 rounded-xl border-2 border-border/40 text-xs font-body flex items-center gap-2">
            <i className="bi bi-info-circle-fill text-primary text-base shrink-0" aria-hidden="true" />
            <span>
              {currentMinutes < 17 * 60 + 10 && 'Você chegará antes da abertura do RU II. Dica: passe na biblioteca central ou na salinha do CAGP!'}
              {currentMinutes >= 17 * 60 + 10 && currentMinutes < 18 * 60 + 30 && 'Horário ideal! O RU II está aberto e a fila é fluida para jantar tranquilo.'}
              {currentMinutes >= 18 * 60 + 30 && currentMinutes < 19 * 60 && 'Atenção: fila intensa no RU II! Se puder, jante rapidamente para não perder o início da aula.'}
              {currentMinutes >= 19 * 60 && currentMinutes < 22 * 60 + 30 && 'Turno de aulas em andamento nos blocos da FAFICH.'}
              {currentMinutes >= 22 * 60 + 30 && 'Aulas encerradas. Caminhe em grupo até o ponto do Circular ou Av. Antônio Carlos.'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Linha do Tempo Neobrutalista Canônica */}
      <Timeline orientation="vertical" className="w-full">
        {NIGHT_ROUTINE.map((item, index) => {
          const itemMinutes = item.hour * 60 + item.minute;
          const isPast = currentMinutes > itemMinutes;
          const isCurrent = Math.abs(currentMinutes - itemMinutes) <= 30;
          const status = isPast ? 'completed' : isCurrent ? 'current' : 'upcoming';

          return (
            <TimelineItem key={item.timeStr} status={status}>
              <TimelineHeader>
                <TimelineTime className="font-mono font-bold text-xs">
                  {item.timeStr}
                </TimelineTime>
                <TimelineDot
                  status={status}
                  size="md"
                  className={item.isHighlight ? 'bg-accent text-accent-foreground' : undefined}
                >
                  {status === 'completed' ? (
                    <i className="bi bi-check text-xs font-black text-white" aria-hidden="true" />
                  ) : status === 'current' ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  ) : null}
                </TimelineDot>
                {index < NIGHT_ROUTINE.length - 1 && (
                  <TimelineConnector status={status} />
                )}
              </TimelineHeader>
              <TimelineContent className="pb-6">
                <TimelineCard className={item.isHighlight ? 'border-primary ring-2 ring-primary/20' : undefined}>
                  <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                    <TimelineTitle className="font-heading text-sm font-extrabold uppercase text-foreground m-0">
                      {item.title}
                    </TimelineTitle>
                    <Badge variant={item.isHighlight ? 'accent' : 'outline'} className="text-xs font-mono">
                      {item.badge}
                    </Badge>
                  </div>
                  <TimelineDescription className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </TimelineDescription>
                </TimelineCard>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
};
