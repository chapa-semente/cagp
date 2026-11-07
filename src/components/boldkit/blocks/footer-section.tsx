import * as React from 'react';
import { cn } from '@/lib/utils';

export function FooterSection({ copyright, links, className }: { copyright: string; links?: { label: string; href: string }[]; className?: string }) {
  return (
    <footer className={cn("border-t-4 border-black bg-cagp-cream py-10 px-6", className)}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-mono font-bold text-black">{copyright}</p>
        {links && (
          <div className="flex gap-6 text-sm font-bold font-mono">
            {links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:underline text-neutral-800">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
