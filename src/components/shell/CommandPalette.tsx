import React, { useState, useEffect } from 'react';
import { AXIS_REGISTRY } from '@/lib/navigationRegistry';
import { navigate } from 'astro:transitions/client';
import maisPedidos from '@/data/documentosMaisPedidos.json';
import { CagpIcon } from '@/components/ui/CagpIcon';
import { resolveCagpIconName } from '@/lib/cagpIcons';
import { asset, route } from '@/lib/paths';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

// CommandPalette.tsx — A busca do site (Ctrl+K, "/" ou o botão de busca).
//
// Era parte do trilho lateral em React. O trilho virou HTML e JS puro (AppSidebar.astro), e a busca
// ficou sozinha aqui para só carregar quando alguém abre: a ilha usa client:sinal="busca", e quem
// dá o sinal é src/scripts/appSidebar.ts (teclas e botões). Depois de montada, ela mesma cuida das
// teclas, e avisa o trilho por window.__cagpPaletteMounted.

const EXTERNAL_PORTALS = [
  {
    id: 'ext-minhaufmg',
    label: 'Portal minhaUFMG (Web Desktop)',
    desc: 'Matrícula semestral, histórico oficial e trancamento parcial',
    href: 'https://sistemas.ufmg.br',
    logo: asset('/logos/minhaufmg/logo-minha-ufmg.png'),
  },
  {
    id: 'ext-siga',
    label: 'SIGA UFMG (Sistema Acadêmico)',
    desc: 'Diário de classe, notas, integralização curricular e horários',
    href: 'https://sistemas.ufmg.br',
    logo: asset('/logos/siga/siga-ufmg-fundo-azul.webp'),
  },
  {
    id: 'ext-fump',
    label: 'FUMP — Permanência e Assistência Estudantil',
    desc: 'Questionário socioeconômico (Níveis I, II e III), RU e Moradia',
    href: 'https://www.fump.ufmg.br/',
    logo: asset('/logos/fump/03-fump-sinae-logo-colorido-fundo-branco.png'),
  },
  {
    id: 'ext-fafich',
    label: 'Site Oficial Gestão Pública FAFICH/UFMG',
    desc: 'Formulários, editais e comunicados da Coordenação do Curso',
    href: 'https://www.fafich.ufmg.br/gestaopublica',
    logo: asset('/logos/ufmg/aplicacoes/principal-ufmg.jpg'),
  },
];

// Busca por palavras inteiras, sem acento: "tce" acha o TCE, não qualquer item com t-c-e espalhados.
const normalizeSearch = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function wordFilter(value: string, search: string, keywords?: string[]): number {
  const haystack = normalizeSearch(`${value} ${(keywords ?? []).join(' ')}`);
  const terms = normalizeSearch(search).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 1;
  if (!terms.every((t) => haystack.includes(t))) return 0;
  // Peso maior quando o termo aparece no começo (título) do valor.
  return terms.reduce((score, t) => score + (haystack.indexOf(t) < 40 ? 1 : 0.5), 0) / terms.length;
}

type PaletteWindow = Window & { __cagpSpotlightPending?: number; __cagpPaletteMounted?: boolean };

export const CommandPalette: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const w = window as PaletteWindow;
    w.__cagpPaletteMounted = true;
    // O pedido que acordou esta ilha chegou antes de ela existir: abre agora.
    if (w.__cagpSpotlightPending && Date.now() - w.__cagpSpotlightPending < 10000) setCommandOpen(true);
    w.__cagpSpotlightPending = undefined;

    const handleOpenSpotlight = () => setCommandOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }
      if (e.key === '/') {
        const target = e.target as HTMLElement | null;
        const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
        if (!isInput) {
          e.preventDefault();
          setCommandOpen(true);
        }
      }
    };
    window.addEventListener('cagp:open-spotlight', handleOpenSpotlight);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      w.__cagpPaletteMounted = false;
      window.removeEventListener('cagp:open-spotlight', handleOpenSpotlight);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Sair da busca para uma folha ou outra página também fecha a gaveta do trilho (tablet).
  const closeDrawer = () => window.dispatchEvent(new CustomEvent('cagp:close-rail-drawer'));

  const triggerEvent = (eventName: string) => {
    closeDrawer();
    setCommandOpen(false);
    window.dispatchEvent(new CustomEvent(eventName));
  };

  const navigateTo = (href: string) => {
    closeDrawer();
    setCommandOpen(false);
    navigate(href);
  };

  return (
      <CommandDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Buscar no site"
        filter={wordFilter}
        description="Busque páginas, guias, documentos e portais da UFMG."
      >
        <CommandInput placeholder="Digite uma página, código DCP, estágio, FUMP, RU ou documento..." />
        <CommandList>
          <CommandEmpty>
            Nenhum resultado encontrado. Tente buscar por &quot;ACG&quot;, &quot;Estágio&quot;, &quot;Calouros&quot; ou &quot;Optativas&quot;.
          </CommandEmpty>

          <CommandGroup heading="Atalhos">
            <CommandItem
              value="Status do Campus Agora RU II Restaurante Universitário Ônibus Circular Noturno Plantão"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-campus');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-buildings')} className="w-4 h-4 text-success mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Campus agora: RU e ônibus
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Jantar no RU, ônibus internos e lembretes
                </span>
              </div>
              <CommandShortcut>Abrir</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Seu perfil Passaporte carteirinha fase do curso backup outro celular"
              onSelect={() => {
                setCommandOpen(false);
                triggerEvent('cagp:open-passport');
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-person-badge')} className="w-4 h-4 text-primary mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Seu perfil
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Fase do curso, carteirinha e levar pro outro celular
                </span>
              </div>
              <CommandShortcut>Perfil</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Acessibilidade Alto Contraste Fonte OpenDyslexic Tamanho de Texto Configuracoes Ajustes"
              onSelect={() => {
                setCommandOpen(false);
                navigateTo(route('/configuracoes'));
              }}
            >
              <CagpIcon name={resolveCagpIconName('bi-universal-access')} className="w-4 h-4 text-accent mr-2" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Ajustes de leitura
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Ajustes de alto contraste, fonte para dislexia e tamanho de texto
                </span>
              </div>
              <CommandShortcut>Ajustes</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Eleição do CAGP">
            <CommandItem
              value="Chapa 2 Semente Número Carta-Programa Propostas Eleição 2026 4 Eixos"
              onSelect={() => navigateTo(route('/chapa-semente'))}
            >
              <CagpIcon
                name={resolveCagpIconName('bi-flower1')}
                className="w-4 h-4 text-accent mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Chapa 2 · Semente • Carta-Programa Oficial
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Conheça os 4 eixos, compromisso público e propostas de gestão
                </span>
              </div>
              <CommandShortcut>Propostas</CommandShortcut>
            </CommandItem>
            <CommandItem
              value="Edital Eleições CAGP 2026 Junta Eleitoral Votação 25 26 Novembro"
              onSelect={() => navigateTo(route('/gestao') + '#eleicoes')}
            >
              <CagpIcon
                name={resolveCagpIconName('bi-file-earmark-pdf')}
                className="w-4 h-4 text-primary mr-2"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                  Edital de Eleições CAGP 2026 (Normas &amp; Datas)
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  Votação em 25 e 26/11 no CAGP, regras e download do edital
                </span>
              </div>
              <CommandShortcut>Edital</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {AXIS_REGISTRY.map((axis) => (
            <CommandGroup
              key={axis.id}
              heading={axis.name}
            >
              {axis.items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${axis.name} ${item.label} ${item.description} ${item.keywords ?? ''}`}
                  onSelect={() => {
                    if (item.href.includes('#campus')) {
                      triggerEvent('cagp:open-campus');
                    } else if (item.href.includes('#passaporte')) {
                      triggerEvent('cagp:open-passport');
                    } else {
                      navigateTo(item.href);
                    }
                  }}
                >
                  <CagpIcon
                    name={resolveCagpIconName(item.icon)}
                    className="w-4 h-4 text-primary mr-2"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-heading font-extrabold text-xs uppercase text-foreground">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </div>
                  <CommandShortcut>Ir</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading="Documentos mais pedidos">
            {maisPedidos.grupos.flatMap((grupo) =>
              grupo.documentos.map((doc) => (
                <CommandItem
                  key={doc.id}
                  value={`documento ${doc.nome} ${doc.descricao} ${grupo.titulo}`}
                  onSelect={() => {
                    setCommandOpen(false);
                    window.open(asset(doc.arquivo), '_blank', 'noopener,noreferrer');
                  }}
                >
                  <CagpIcon name="file-text" className="w-4 h-4 text-primary mr-2" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-heading font-bold text-xs text-foreground">{doc.nome}</span>
                    <span className="text-xs text-muted-foreground truncate">{doc.descricao}</span>
                  </div>
                  <CommandShortcut>PDF</CommandShortcut>
                </CommandItem>
              ))
            )}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Portais da UFMG">
            {EXTERNAL_PORTALS.map((portal) => (
              <CommandItem
                key={portal.id}
                value={`${portal.label} ${portal.desc}`}
                onSelect={() => {
                  setCommandOpen(false);
                  window.open(portal.href, '_blank', 'noopener,noreferrer');
                }}
              >
                <img
                  src={portal.logo}
                  alt=""
                  className="w-5 h-5 object-contain rounded mr-2 border border-border"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-heading font-extrabold text-xs text-foreground">
                    {portal.label}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {portal.desc}
                  </span>
                </div>
                <CommandShortcut><i className="bi bi-box-arrow-up-right" aria-hidden="true" /></CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
  );
};
