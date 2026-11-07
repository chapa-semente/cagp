import React from 'react';
import { TreeView, type TreeNode } from '@/components/ui/tree-view';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AXIS_REGISTRY } from '@/lib/navigationRegistry';

const SITEMAP_TREE: TreeNode[] = AXIS_REGISTRY.map((axis) => ({
  id: `axis-${axis.id}`,
  label: `Eixo ${axis.number}: ${axis.name} — ${axis.tagline}`,
  children: axis.items.map((item) => ({
    id: item.id,
    label: `${item.label} (${item.href}) — ${item.description}`,
  })),
}));

export const SitemapTreeViewExplorer: React.FC = () => {
  return (
    <section className="my-6" aria-label="Árvore Interativa do Mapa do Site">
      <Card className="bg-white">
        <CardHeader className="border-b-3 border-[#16181d] bg-[#FFFDF9]">
          <Badge variant="secondary" className="mb-1.5 w-fit">
            BOLDKIT TREEVIEW • ARQUITETURA DE INFORMAÇÃO (20 ROTAS)
          </Badge>
          <CardTitle className="text-xl uppercase">
            Árvore Hierárquica Interativa dos 5 Eixos Canônicos
          </CardTitle>
          <CardDescription className="text-xs font-medium text-[#57534E]">
            Expanda ou recolha os nós da árvore (suporte total a navegação por setas do teclado ARIA Tree).
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <TreeView
            data={SITEMAP_TREE}
            defaultExpandedIds={SITEMAP_TREE.map((n) => n.id)}
            className="rounded-xl border-3 border-[#16181d] bg-white p-4 shadow-[4px_4px_0px_#16181d]"
          />
        </CardContent>
      </Card>
    </section>
  );
};
