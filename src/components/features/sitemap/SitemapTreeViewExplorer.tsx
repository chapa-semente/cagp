import React from 'react';
import { TreeView, type TreeNode } from '@/components/ui/tree-view';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AXIS_REGISTRY } from '@/lib/navigationRegistry';

const SITEMAP_TREE: TreeNode[] = [
  ...AXIS_REGISTRY.map((axis) => ({
    id: `axis-${axis.id}`,
    label: `${axis.name} — ${axis.tagline}`,
    children: axis.items.map((item) => ({
      id: item.id,
      label: `${item.label} (${item.href}) — ${item.description}`,
    })),
  })),
  {
    id: 'axis-leitor-normativo',
    label: 'Leitor Normativo (/documentos/[slug]) & Rotas Utilitárias — 10 Rotas Complementares',
    children: [
      { id: 'doc-ppc', label: 'PPC Gestão Pública 2020 (/documentos/ppc-gestao-publica-ufmg)' },
      { id: 'doc-reg', label: 'Regulamento N-20229 (/documentos/regulamento-gestao-publica-ufmg)' },
      { id: 'doc-cagp', label: 'Regimento Interno CAGP 2024 (/documentos/regimento-interno-cagp-ufmg)' },
      { id: 'doc-p1', label: 'Percurso 01-01 Núcleo Geral (/documentos/percurso-bacharelado-nucleo-geral)' },
      { id: 'doc-p2', label: 'Percurso 01-02 FCA (/documentos/percurso-bacharelado-nucleo-complementar)' },
      { id: 'doc-p3', label: 'Percurso 01-03 Avançado Pós (/documentos/percurso-bacharelado-nucleo-avancado)' },
      { id: 'doc-em', label: 'Ementário Oficial 95 Disciplinas (/documentos/ementario-gestao-publica-ufmg)' },
      { id: 'doc-rec', label: 'Recepção de Ingressantes (/documentos/transcricao-recepcao-ingressantes-2024-2)' },
      { id: 'util-cfg', label: 'Ajustes (/configuracoes)' },
      { id: 'util-map', label: 'Mapa do Site Interativo (/mapa-do-site)' },
    ],
  },
];

export const SitemapTreeViewExplorer: React.FC = () => {
  return (
    <section className="my-6" aria-label="Árvore Interativa do Mapa do Site">
      <Card className="bg-white border-3 border-border shadow-xl">
        <CardHeader className="border-b-3 border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl">
                Todas as páginas, por aba
              </CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">
                Abra uma aba para ver as páginas dela. Funciona com as setas do teclado.
              </CardDescription>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('cagp:open-spotlight'))}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-primary text-white font-mono text-xs font-black uppercase border-2 border-border shadow-[3px_3px_0_0_#FE8812] hover:bg-primary transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Buscar Rota</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-foreground text-xs">⌘K</kbd>
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <TreeView
            data={SITEMAP_TREE}
            defaultExpandedIds={SITEMAP_TREE.map((n) => n.id)}
            className="rounded-xl border-2 border-border bg-white p-4 shadow-md"
          />
        </CardContent>
      </Card>
    </section>
  );
};
