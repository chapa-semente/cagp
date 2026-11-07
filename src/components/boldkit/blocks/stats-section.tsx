import * as React from 'react';
import { cn } from '@/lib/utils';
import { StatCard } from '../ui/stat-card';

export interface StatItem {
  value: string;
  label: string;
  description?: string;
  trend?: string;
}

export function StatsSection({ stats, className }: { stats: StatItem[]; className?: string }) {
  return (
    <section className={cn("py-10 px-4 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      {stats.map((s, idx) => (
        <StatCard key={idx} value={s.value} title={s.label} className="border-3 border-black shadow-md bg-white" />
      ))}
    </section>
  );
}
