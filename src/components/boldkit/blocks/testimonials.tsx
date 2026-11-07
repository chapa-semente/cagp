import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface TestimonialItem {
  name: string;
  role: string;
  avatarText: string;
  quote: string;
}

export function TestimonialsSection({ testimonials, className }: { testimonials: TestimonialItem[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <Card key={idx} className="border-3 border-black shadow-md bg-white p-6 space-y-4">
            <CardContent className="p-0 space-y-4">
              <p className="font-medium text-neutral-800 italic">“{item.quote}”</p>
              <div className="flex items-center gap-3 pt-2 border-t-2 border-neutral-200">
                <Avatar className="border-2 border-black w-10 h-10">
                  <AvatarFallback className="bg-cagp-gold font-bold text-black">{item.avatarText}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm leading-none">{item.name}</h4>
                  <p className="text-xs text-neutral-600 font-medium">{item.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
