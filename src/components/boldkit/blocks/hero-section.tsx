import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface HeroSectionProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: { label: string; onClick?: () => void; href?: string };
  secondaryAction?: { label: string; onClick?: () => void; href?: string };
  className?: string;
}

export function HeroSection({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 px-4 text-center border-b-4 border-black bg-cagp-cream", className)}>
      <div className="max-w-4xl mx-auto space-y-6">
        {badge && (
          <Badge className="px-4 py-1.5 text-sm bg-cagp-gold text-black border-2 border-black font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 mr-1 inline" /> {badge}
          </Badge>
        )}
        <h1 className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-black leading-none">
          {title}{' '}
          {titleHighlight && (
            <span className="bg-cagp-burgundy text-white px-3 py-1 border-3 border-black inline-block shadow-md">
              {titleHighlight}
            </span>
          )}
        </h1>
        <p className="text-lg sm:text-xl text-neutral-800 font-medium max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {primaryAction && (
            <Button
              className="bg-cagp-burgundy text-white font-bold px-6 py-3 border-3 border-black shadow-md hover:translate-x-0.5 hover:translate-y-0.5"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              className="bg-white text-black font-bold px-6 py-3 border-3 border-black shadow-md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
