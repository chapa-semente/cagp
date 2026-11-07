import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CTASection({ title, subtitle, actionText, onAction, className }: { title: string; subtitle: string; actionText: string; onAction?: () => void; className?: string }) {
  return (
    <section className={cn("py-14 px-4 my-8 max-w-5xl mx-auto bg-cagp-burgundy border-4 border-black shadow-lg text-white text-center space-y-6", className)}>
      <h2 className="text-3xl sm:text-5xl font-black font-mono">{title}</h2>
      <p className="text-lg text-neutral-200 max-w-xl mx-auto font-medium">{subtitle}</p>
      <div>
        <Button onClick={onAction} className="bg-cagp-gold text-black font-black text-lg px-8 py-4 border-3 border-black shadow-md hover:bg-yellow-400">
          {actionText}
        </Button>
      </div>
    </section>
  );
}
