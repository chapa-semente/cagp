import React, { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sticker } from '@/components/ui/sticker';
import { Card, CardContent } from '@/components/ui/card';
import { asset } from '@/lib/paths';

export interface FaqItem {
  id: string;
  q: string;
  badge: string;
  icon: string;
  cat: string;
  a: string;
  links: { label: string; url: string }[];
}

interface Props {
  faqs: FaqItem[];
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'Todas (15)' },
  { id: 'matricula', label: 'Matrícula & Trancamento' },
  { id: 'dispensa', label: 'Dispensa & Aproveitamento' },
  { id: 'modalidades', label: 'Noturno, EaD & Imersão' },
  { id: 'saude', label: 'RAEP & Saúde' },
  { id: 'conclusao', label: 'Formatura & Defesas' },
  { id: 'normas', label: 'Resoluções CEPE/DCN' },
];

export const FaqInteractiveExplorer: React.FC<Props> = ({ faqs }) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((item) => {
      if (selectedCat !== 'all' && item.cat !== selectedCat) {
        if (!(selectedCat === 'conclusao' && (item.cat === 'conclusao' || item.cat === 'defesa'))) {
          return false;
        }
      }
      if (!q) return true;
      return (
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    });
  }, [faqs, query, selectedCat]);

  return (
    <div className="space-y-5">
      {/* Barra de Busca e Filtro por Categorias Neobrutalista */}
      <Card className="bg-card">
        <CardContent className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sticker variant="secondary" size="sm" rotation="slight">
                GUIA REGIMENTAL
              </Sticker>
              <span className="font-heading text-sm font-extrabold uppercase text-foreground">
                Pesquisa Rápida de Normas &amp; Requerimentos
              </span>
            </div>
            <Badge variant="outline" className="font-mono self-start sm:self-auto">
              {filteredFaqs.length} de {faqs.length} tópicos
            </Badge>
          </div>

          <div className="relative">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por trancamento, Art. 41, aproveitamento, exame especial, colação..."
              aria-label="Pesquisar nas dúvidas frequentes"
              className="pr-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <Button
                  key={cat.id}
                  type="button"
                  size="xs"
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => setSelectedCat(cat.id)}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accordion BoldKit Unificado */}
      {filteredFaqs.length > 0 ? (
        <Accordion type="multiple" defaultValue={['trancamento', 'dispensa-estagio']} className="space-y-3">
          {filteredFaqs.map((f) => (
            <AccordionItem key={f.id} value={f.id} id={f.id}>
              <AccordionTrigger>
                <div className="flex flex-wrap items-center justify-between gap-2 w-full pr-2">
                  <span className="flex items-center gap-2.5 text-left">
                    <i className={`bi ${f.icon} text-base shrink-0`} aria-hidden="true" />
                    <span className="leading-snug">{f.q}</span>
                  </span>
                  <Badge variant="accent" className="shrink-0">
                    {f.badge}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed m-0">
                    {f.a}
                  </p>
                  {f.links && f.links.length > 0 && (
                    <div className="pt-3 border-t-2 border-border flex flex-wrap gap-2.5">
                      {f.links.map((link) => (
                        <Button
                          key={link.url}
                          asChild
                          variant="outline"
                          size="sm"
                          className="no-underline font-mono text-xs"
                        >
                          <a href={asset(link.url)} download>
                            <i className="bi bi-file-earmark-pdf text-primary text-sm" aria-hidden="true" />
                            <span>{link.label}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="p-8 text-center space-y-3">
            <p className="font-heading text-base font-extrabold uppercase text-foreground m-0">
              Nenhuma dúvida encontrada para &ldquo;{query}&rdquo;
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setQuery('');
                setSelectedCat('all');
              }}
            >
              Limpar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
