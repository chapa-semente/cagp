import * as React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string;
}

export function FAQSection({ items, title = "Perguntas Frequentes", className }: { items: FaqItem[]; title?: string; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-3xl mx-auto", className)}>
      <h2 className="text-3xl font-black font-mono text-center mb-8">{title}</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {items.map((item, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-3 border-black shadow-sm bg-white px-4">
            <AccordionTrigger className="font-bold text-left hover:no-underline font-mono">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-700 font-medium pt-2 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
