import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { asset } from '@/lib/paths';

export const PercursoNavigationMenu: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border-2 border-border rounded-xl shadow-md mb-4">
      <div className="flex items-center gap-2">
        <span className="font-heading text-xs font-black uppercase text-foreground">
          Atalhos de Percurso:
        </span>
      </div>

      <NavigationMenu className="relative z-20">
        <NavigationMenuList className="flex flex-wrap items-center gap-2">
          {/* Menu 1: Núcleo Geral */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xs min-h-[44px]">
              1. Núcleo Geral
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3 w-80 space-y-2 bg-card border-2 border-border shadow-lg">
              <h4 className="font-heading text-xs font-extrabold text-foreground m-0">
                Núcleo Geral (Ingresso Padrão)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                1.020h destinadas ao bloco de optativas, extensão e AAC. Maior flexibilidade no catálogo DCP e FAFICH.
              </p>
              <NavigationMenuLink
                href={asset('/documentos/percurso-bacharelado-nucleo-geral.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-primary hover:underline block pt-1 border-t border-border"
              >
                Abrir Matriz Oficial (PDF) <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Menu 2: Formação Complementar Aberta (FCA) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xs min-h-[44px]">
              2. FCA Complementar
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3 w-80 space-y-2 bg-card border-2 border-border shadow-lg">
              <h4 className="font-heading text-xs font-extrabold text-foreground m-0">
                Formação Complementar Aberta (FCA)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                Integralize 300h (20 créditos) em outro curso da UFMG (Direito, Economia, Administração) a partir do 5º período.
              </p>
              <NavigationMenuLink
                href={asset('/documentos/percurso-bacharelado-nucleo-complementar.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-primary hover:underline block pt-1 border-t border-border"
              >
                Regulamentação FCA (PDF) <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Menu 3: Núcleo Avançado (Pós-Graduação) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xs min-h-[44px]">
              3. Núcleo Avançado
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-3 w-80 space-y-2 bg-card border-2 border-border shadow-lg">
              <h4 className="font-heading text-xs font-extrabold text-foreground m-0">
                Núcleo Avançado (Pós-Graduação)
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed m-0">
                Curse até 120h diretamente em disciplinas de Mestrado ou Doutorado (PPGCP / Cedeplar) a partir do 7º período.
              </p>
              <NavigationMenuLink
                href={asset('/documentos/ppc-gestao-publica-ufmg.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-bold text-primary hover:underline block pt-1 border-t border-border"
              >
                Diretrizes de Pós no PPC (PDF) <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
