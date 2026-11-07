import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  className?: string;
}

export function FeatureGrid({ title, subtitle, features, className }: FeatureGridProps) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-10 space-y-2">
          {title && <h2 className="text-3xl sm:text-4xl font-black font-mono">{title}</h2>}
          {subtitle && <p className="text-neutral-700 font-medium max-w-xl mx-auto">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <Card key={idx} className="border-3 border-black shadow-md bg-white hover:-translate-y-1 transition-transform">
            <CardHeader className="space-y-2">
              {feat.icon && <div className="w-12 h-12 bg-cagp-gold border-2 border-black flex items-center justify-center font-bold">{feat.icon}</div>}
              <CardTitle className="text-xl font-bold font-mono">{feat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-700 font-medium text-sm">
                {feat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
