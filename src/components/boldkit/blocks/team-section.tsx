import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
}

export function TeamSection({ members, className }: { members: TeamMember[]; className?: string }) {
  return (
    <section className={cn("py-12 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {members.map((m, idx) => (
        <Card key={idx} className="border-3 border-black shadow-md bg-white text-center p-4">
          <div className="w-20 h-20 bg-cagp-burgundy text-white border-2 border-black mx-auto rounded-full flex items-center justify-center font-bold text-xl mb-4">
            {m.name.slice(0, 2).toUpperCase()}
          </div>
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg font-bold font-mono">{m.name}</CardTitle>
            <p className="text-xs font-bold text-cagp-burgundy uppercase">{m.role}</p>
          </CardHeader>
          {m.bio && <CardContent className="p-0 text-xs text-neutral-600 font-medium">{m.bio}</CardContent>}
        </Card>
      ))}
    </section>
  );
}
