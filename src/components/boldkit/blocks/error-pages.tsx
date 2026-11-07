import * as React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export function ErrorPageBlock({ code = "404", message = "Página não encontrada no campus.", homeHref = "/", className }: { code?: string; message?: string; homeHref?: string; className?: string }) {
  return (
    <div className={cn("min-h-[50vh] flex flex-col items-center justify-center text-center p-6", className)}>
      <div className="bg-cagp-gold border-4 border-black shadow-xl px-8 py-4 mb-6">
        <span className="text-6xl sm:text-8xl font-black font-mono text-black">{code}</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black font-mono mb-4 text-black">{message}</h2>
      <a href={homeHref} className={cn(buttonVariants(), "bg-cagp-burgundy text-white font-bold border-3 border-black shadow-md inline-block")}>
        Retornar ao Início
      </a>
    </div>
  );
}
