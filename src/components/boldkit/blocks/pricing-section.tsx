import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export function PricingSection({ plans, className }: { plans: PricingPlan[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {plans.map((p, idx) => (
        <Card key={idx} className={cn("border-4 border-black p-6 flex flex-col justify-between", p.highlight ? "bg-cagp-cream shadow-xl border-cagp-burgundy" : "bg-white shadow-md")}>
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-black font-mono">{p.title}</CardTitle>
              <div className="text-3xl font-black font-mono mt-2">{p.price}</div>
              <p className="text-xs text-neutral-600 font-medium mt-1">{p.description}</p>
            </CardHeader>
            <CardContent className="p-0 space-y-2 mb-6">
              {p.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium">
                  <Check className="w-4 h-4 text-cagp-burgundy shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </CardContent>
          </div>
          <CardFooter className="p-0">
            <Button className={cn("w-full font-bold border-2 border-black", p.highlight ? "bg-cagp-burgundy text-white" : "bg-neutral-100 text-black")}>
              Selecionar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
