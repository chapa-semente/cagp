import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactSection({ title = "Fale Conosco", onSubmit, className }: { title?: string; onSubmit?: (e: React.FormEvent) => void; className?: string }) {
  return (
    <Card className={cn("max-w-xl mx-auto border-4 border-black shadow-lg bg-white p-6 my-10", className)}>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-3xl font-black font-mono">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Seu Nome Completo" className="border-2 border-black" required />
          <Input type="email" placeholder="Seu E-mail Institucional" className="border-2 border-black" required />
          <Textarea placeholder="Mensagem ou solicitação..." className="border-2 border-black min-h-[120px]" required />
          <Button type="submit" className="w-full bg-cagp-burgundy text-white font-bold border-2 border-black shadow-md">
            Enviar Mensagem
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
