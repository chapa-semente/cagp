import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function OnboardingFlow({ steps, onComplete, className }: { steps: { title: string; content: string }[]; onComplete?: () => void; className?: string }) {
  const [current, setCurrent] = React.useState(0);
  return (
    <Card className={cn("max-w-lg mx-auto border-4 border-black shadow-lg bg-white p-6 my-8", className)}>
      <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-2">
        <span className="font-mono font-bold text-xs uppercase">Etapa {current + 1} de {steps.length}</span>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className={cn("w-3 h-3 border border-black", i === current ? "bg-cagp-burgundy" : "bg-neutral-200")} />
          ))}
        </div>
      </div>
      <CardContent className="p-0 space-y-4">
        <h3 className="text-2xl font-black font-mono">{steps[current].title}</h3>
        <p className="text-neutral-700 font-medium">{steps[current].content}</p>
        <div className="flex justify-between pt-4">
          <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="border-2 border-black">
            Anterior
          </Button>
          {current < steps.length - 1 ? (
            <Button onClick={() => setCurrent(c => c + 1)} className="bg-cagp-burgundy text-white border-2 border-black font-bold">
              Próximo
            </Button>
          ) : (
            <Button onClick={onComplete} className="bg-cagp-gold text-black border-2 border-black font-bold">
              Concluir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
