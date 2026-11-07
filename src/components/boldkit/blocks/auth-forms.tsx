import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm({ onSubmit, className }: { onSubmit?: (e: React.FormEvent) => void; className?: string }) {
  return (
    <Card className={cn("max-w-md mx-auto border-4 border-black shadow-lg bg-white p-6 my-8", className)}>
      <CardHeader className="text-center p-0 mb-6">
        <CardTitle className="text-2xl font-black font-mono">Acesso ao Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input type="text" placeholder="Número de Matrícula UFMG" className="border-2 border-black" required />
          <Input type="password" placeholder="Senha do Portal" className="border-2 border-black" required />
          <Button type="submit" className="w-full bg-cagp-burgundy text-white font-bold border-2 border-black shadow-md">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
