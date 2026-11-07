import * as React from 'react';
import { cn } from '@/lib/utils';

export function LogoCloud({ logos, title, className }: { logos: { name: string; node?: React.ReactNode }[]; title?: string; className?: string }) {
  return (
    <div className={cn("py-8 border-y-3 border-black bg-neutral-100 px-4 text-center", className)}>
      {title && <p className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 mb-6">{title}</p>}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
        {logos.map((logo, idx) => (
          <div key={idx} className="font-black font-mono text-lg text-neutral-800 border-2 border-black bg-white px-4 py-2 shadow-sm">
            {logo.node || logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
